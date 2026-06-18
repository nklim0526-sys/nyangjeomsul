import {
  calculateFourPillars,
  getHeavenlyStemElement,
  getEarthlyBranchElement,
} from 'manseryeok'

export const SIJIN_LIST = [
  { label: '자시 (23:00~01:00)', value: '자시', hour: 23 },
  { label: '축시 (01:00~03:00)', value: '축시', hour: 1 },
  { label: '인시 (03:00~05:00)', value: '인시', hour: 3 },
  { label: '묘시 (05:00~07:00)', value: '묘시', hour: 5 },
  { label: '진시 (07:00~09:00)', value: '진시', hour: 7 },
  { label: '사시 (09:00~11:00)', value: '사시', hour: 9 },
  { label: '오시 (11:00~13:00)', value: '오시', hour: 11 },
  { label: '미시 (13:00~15:00)', value: '미시', hour: 13 },
  { label: '신시 (15:00~17:00)', value: '신시', hour: 15 },
  { label: '유시 (17:00~19:00)', value: '유시', hour: 17 },
  { label: '술시 (19:00~21:00)', value: '술시', hour: 19 },
  { label: '해시 (21:00~23:00)', value: '해시', hour: 21 },
  { label: '모름', value: '', hour: null },
]

const OHAENG_TRAITS = {
  목: '뻗어나가는 기운이 강하고 창의적. 고집이 세고 새로움을 좋아함',
  화: '열정적이고 표현욕이 강함. 감정 기복이 있고 빠르게 타오름',
  토: '안정을 추구하고 신중함. 중심을 잡는 힘이 있지만 변화를 싫어함',
  금: '원칙적이고 결단력 있음. 완벽주의 성향, 차갑게 보일 수 있음',
  수: '직관적이고 유연함. 지혜롭지만 불안감을 쉽게 느낌',
}

export function computeSaju(year, month, day, sijin) {
  const sijinInfo = SIJIN_LIST.find((s) => s.value === sijin)
  const hour = sijinInfo?.hour ?? 12
  const minute = 0

  const result = calculateFourPillars({ year, month, day, hour, minute })

  const pillars = [result.year, result.month, result.day, result.hour]
  const count = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }

  for (const pillar of pillars) {
    count[getHeavenlyStemElement(pillar.heavenlyStem)]++
    count[getEarthlyBranchElement(pillar.earthlyBranch)]++
  }

  const maxCount = Math.max(...Object.values(count))
  const dominant = Object.entries(count)
    .filter(([, v]) => v === maxCount)
    .map(([k]) => k)

  const traitSummary = dominant.map((el) => `${el}(${OHAENG_TRAITS[el]})`).join(', ')

  const pillarsStr = [
    `년주 ${result.yearString}(${result.yearHanja})`,
    `월주 ${result.monthString}(${result.monthHanja})`,
    `일주 ${result.dayString}(${result.dayHanja})`,
    sijin ? `시주 ${result.hourString}(${result.hourHanja})` : '시주 미상',
  ].join(' / ')

  const ohaengStr = Object.entries(count)
    .map(([el, n]) => `${el}${n}`)
    .join(' ')

  return { pillarsStr, ohaengStr, traitSummary, dominant, count, raw: result }
}
