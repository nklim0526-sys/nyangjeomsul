const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

const SYSTEM_PROMPT = `너는 신비롭고 귀여운 검정 고양이 점술사야. 사주팔자와 사용자의 현재 심리 상태를 모두 읽고 고민에 답해줘.
답변 구성:
1. 사주에서 읽히는 이 사람의 본질적 기질 한 줄 (예: "넌 원래 물처럼 흐르는 걸 좋아하는 애야")
2. 지금 심리 상태 반영 — 슬라이더 값을 실제로 해석해서 언급 (에너지 낮으면 "지금 많이 방전돼 있구나", 압박감 높으면 "지금 숨이 막히지?")
3. 그 상태에서 이 고민에 대한 핵심 조언 1-2줄
4. 마무리는 고양이답게 짧고 신비롭게
말투: 반말, 따뜻하지만 시크, "냥" 1-2번만 (과하면 안 됨)
길이: 5-7문장`

function buildUserContent({ saju, energy, emotion, pressure, age, situation, worry }) {
  const energyDesc = energy <= 3 ? '방전 상태' : energy <= 6 ? '보통' : '충전됨'
  const emotionDesc = emotion <= 3 ? '불안함' : emotion <= 6 ? '약간 불안' : '평온함'
  const pressureDesc = pressure >= 8 ? '매우 높음' : pressure >= 5 ? '보통' : '여유로움'

  return [
    `사주팔자: ${saju.pillarsStr}`,
    `오행 분포: ${saju.ohaengStr}`,
    `기질 요약: ${saju.traitSummary}`,
    '',
    '현재 상태:',
    `에너지: ${energy}/10 (${energyDesc})`,
    `감정: ${emotion}/10 (${emotionDesc})`,
    `압박감: ${pressure}/10 (${pressureDesc})`,
    age ? `나이: ${age}세` : '',
    situation ? `상황: ${situation}` : '',
    `고민: ${worry}`,
  ]
    .filter((l) => l !== undefined)
    .join('\n')
    .trim()
}

export async function streamCatReading({ saju, state, onToken, onDone, onError }) {
  try {
    const response = await fetch('/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserContent({ saju, ...state }) }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`API ${response.status}: ${err}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (data === '[DONE]' || !data) continue

        try {
          const parsed = JSON.parse(data)
          if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
            onToken(parsed.delta.text)
          } else if (parsed.type === 'message_stop') {
            onDone()
            return
          }
        } catch {}
      }
    }

    onDone()
  } catch (err) {
    onError(err)
  }
}
