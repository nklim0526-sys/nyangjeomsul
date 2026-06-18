import { useMemo } from 'react'

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 4}s`,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--twinkle-dur': star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  )
}
