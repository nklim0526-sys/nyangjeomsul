import { useEffect, useState, useRef } from 'react'
import { streamCatReading } from '../lib/api'

export default function Step3_Response({ saju, stateData, onDone, onRetry }) {
  const [text, setText] = useState('')
  const [streaming, setStreaming] = useState(true)
  const [error, setError] = useState(null)
  const calledRef = useRef(false)

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    streamCatReading({
      saju,
      state: stateData,
      onToken: (token) => setText((prev) => prev + token),
      onDone: () => {
        setStreaming(false)
        onDone()
      },
      onError: (err) => {
        setError(err.message)
        setStreaming(false)
      },
    })
  }, [])

  if (error) {
    return (
      <div className="w-full mt-3 animate-fadeIn">
        <div className="bg-[#1a1a2e]/70 border border-red-500/30 rounded-2xl p-6 text-center space-y-3">
          <p className="text-red-400 text-sm">고양이가 잠시 자리를 비웠어...</p>
          <p className="text-gray-600 text-xs">{error}</p>
          <button onClick={onRetry} className="btn-secondary">다시 물어보기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mt-3 animate-fadeIn">
      {/* Speech bubble */}
      <div className="relative bg-[#1a1a2e] border border-purple-500/30 rounded-2xl p-6 bubble-tail">
        {streaming && !text && (
          <div className="flex gap-1.5 items-center py-1">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {text && (
          <p className="font-serif text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {text}
            {streaming && (
              <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-cursor align-middle" />
            )}
          </p>
        )}
      </div>

      {/* Retry button */}
      {!streaming && (
        <div className="mt-4 space-y-2 animate-fadeIn">
          <button onClick={onRetry} className="btn-secondary w-full">
            다시 물어보기
          </button>
          <p className="text-center text-gray-600 text-xs">새로운 고민을 입력하거나 다시 물어볼 수 있어</p>
        </div>
      )}
    </div>
  )
}
