import { useEffect, useState } from 'react'

function getColor(score) {
  if (score >= 0.7) return 'var(--color-risk-low)'
  if (score >= 0.4) return 'var(--color-risk-medium)'
  return 'var(--color-risk-high)'
}

export default function AvailabilityRing({ score, size = 44 }) {
  const [offset, setOffset] = useState(null)
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 4
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    setOffset(circumference)
    const frame = requestAnimationFrame(() =>
      setOffset(circumference * (1 - score)),
    )
    return () => cancelAnimationFrame(frame)
  }, [circumference, score])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="text-[var(--color-text-primary)]">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--color-border-subtle)" strokeWidth="3" />
      <circle
        cx={cx} cy={cy} r={radius} fill="none" stroke={getColor(score)}
        strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference}
        strokeDashoffset={offset ?? circumference}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
      />
      <text x={cx} y={cy} className="text-xs font-bold" fill="currentColor" textAnchor="middle" dominantBaseline="central">
        {Math.round(score * 100)}%
      </text>
    </svg>
  )
}
