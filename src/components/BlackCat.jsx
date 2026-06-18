export default function BlackCat({ state }) {
  const isThinking = state === 'thinking'
  const isDone = state === 'done'
  const isIdle = state === 'idle'

  const eyeClass = isThinking || isDone ? 'animate-glow' : isIdle ? 'animate-blink' : ''

  return (
    <div className="relative flex justify-center select-none">
      {/* Background glow so the cat is visible */}
      <div className="absolute inset-0 rounded-full bg-indigo-900/30 blur-2xl scale-75" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-950/50 blur-3xl rounded-full" />

      <svg
        viewBox="0 0 200 245"
        width="180"
        height="198"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        {/* Tail */}
        <path
          d="M 148 198 Q 188 178 182 148 Q 176 124 154 132"
          stroke="#1e1e35"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          className={isIdle ? 'animate-sway' : ''}
          style={{ transformOrigin: '148px 198px' }}
        />

        {/* Body */}
        <ellipse cx="100" cy="188" rx="54" ry="50" fill="#1e1e35" />

        {/* Head */}
        <circle cx="100" cy="103" r="46" fill="#1e1e35" />

        {/* Left ear */}
        <polygon points="70,73 55,40 92,67" fill="#1e1e35" />
        {/* Right ear */}
        <polygon points="130,73 145,40 108,67" fill="#1e1e35" />
        {/* Left inner ear */}
        <polygon points="72,70 61,46 89,66" fill="#2d1a40" />
        {/* Right inner ear */}
        <polygon points="128,70 139,46 111,66" fill="#2d1a40" />

        {/* Left eye base */}
        <ellipse
          cx="83"
          cy="101"
          rx="12"
          ry="14"
          fill="#f59e0b"
          className={eyeClass}
        />
        {/* Left pupil */}
        <ellipse cx="83" cy="101" rx="7" ry="11" fill="#07070f" />
        {/* Left eye shine */}
        <circle cx="86" cy="96" r="2.5" fill="white" opacity="0.85" />

        {/* Right eye base */}
        <ellipse
          cx="117"
          cy="101"
          rx="12"
          ry="14"
          fill="#f59e0b"
          className={eyeClass}
        />
        {/* Right pupil */}
        <ellipse cx="117" cy="101" rx="7" ry="11" fill="#07070f" />
        {/* Right eye shine */}
        <circle cx="120" cy="96" r="2.5" fill="white" opacity="0.85" />

        {/* Nose */}
        <path d="M 98 115 L 100 118 L 102 115 Z" fill="#c084fc" />

        {/* Mouth */}
        <path
          d="M 100 118 Q 96 122 92 120 M 100 118 Q 104 122 108 120"
          stroke="#3a3050"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Whiskers left */}
        <line x1="97" y1="116" x2="62" y2="110" stroke="#2a2040" strokeWidth="1" />
        <line x1="97" y1="119" x2="62" y2="121" stroke="#2a2040" strokeWidth="1" />
        {/* Whiskers right */}
        <line x1="103" y1="116" x2="138" y2="110" stroke="#2a2040" strokeWidth="1" />
        <line x1="103" y1="119" x2="138" y2="121" stroke="#2a2040" strokeWidth="1" />

        {/* Left paw */}
        <ellipse cx="74" cy="231" rx="22" ry="11" fill="#1e1e35" />
        {/* Right paw */}
        <ellipse cx="126" cy="231" rx="22" ry="11" fill="#1e1e35" />

        {/* Paw toe dividers */}
        <line x1="68" y1="222" x2="68" y2="233" stroke="#2e2e4a" strokeWidth="1.5" />
        <line x1="75" y1="221" x2="75" y2="234" stroke="#2e2e4a" strokeWidth="1.5" />
        <line x1="119" y1="222" x2="119" y2="233" stroke="#2e2e4a" strokeWidth="1.5" />
        <line x1="126" y1="221" x2="126" y2="234" stroke="#2e2e4a" strokeWidth="1.5" />

        {/* Chest fur highlight */}
        <ellipse cx="100" cy="165" rx="20" ry="28" fill="#252540" />
      </svg>

      {/* Ambient glow under cat when thinking */}
      {(isThinking || isDone) && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-amber-400/20 blur-xl rounded-full" />
      )}
    </div>
  )
}
