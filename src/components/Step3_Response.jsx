import { useState, useRef, useEffect } from 'react'

export default function Step3_Response({ currentText, isStreaming, streamError, onFollowUp, onStartOver }) {
  const [followUp, setFollowUp] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    const trimmed = followUp.trim()
    if (!trimmed || isStreaming) return
    setFollowUp('')
    onFollowUp(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (!isStreaming && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isStreaming])

  return (
    <div className="w-full mt-3 space-y-3 animate-fadeIn">
      {/* Speech bubble */}
      <div className="relative bg-[#1a1a2e] border border-purple-500/30 rounded-2xl p-6 bubble-tail">
        {isStreaming && !currentText && (
          <div className="flex gap-1.5 items-center py-1">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {streamError && (
          <div className="space-y-1">
            <p className="text-red-400 text-sm">고양이가 잠시 자리를 비웠어...</p>
            <p className="text-red-300/70 text-xs break-all">{streamError}</p>
          </div>
        )}

        {currentText && (
          <p className="font-serif text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {currentText}
            {isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-cursor align-middle" />
            )}
          </p>
        )}
      </div>

      {/* Follow-up input */}
      {!streamError && (
        <div className="bg-[#1a1a2e]/60 border border-purple-500/20 rounded-2xl p-4 space-y-3">
          <textarea
            ref={textareaRef}
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder={isStreaming ? '고양이가 생각하는 중...' : '이어서 물어봐... (Enter로 전송)'}
            className="w-full bg-[#0d0d1f] border border-purple-500/20 rounded-xl p-3 text-gray-200 text-sm resize-none h-16 focus:outline-none focus:border-purple-400/50 placeholder:text-gray-600 transition-colors disabled:opacity-40"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSend}
              disabled={!followUp.trim() || isStreaming}
              className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              보내기
            </button>
            <button
              onClick={onStartOver}
              disabled={isStreaming}
              className="btn-secondary px-4 disabled:opacity-40"
            >
              처음부터
            </button>
          </div>
        </div>
      )}

      {streamError && (
        <button onClick={onStartOver} className="btn-secondary w-full">
          처음부터
        </button>
      )}
    </div>
  )
}
