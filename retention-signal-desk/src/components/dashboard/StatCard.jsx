import { useEffect, useState } from 'react'
import Card from '../ui/Card'

function CountUp({ value, className = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let step = 0
    const timer = setInterval(() => {
      step += 1
      setCount(Math.round((value * step) / 30))
      if (step >= 30) clearInterval(timer)
    }, 20)
    return () => clearInterval(timer)
  }, [value])

  return <div className={`mono mt-2 text-4xl font-black ${className}`}>{count}</div>
}

export default function StatCard({ label, value, subtitle, className }) {
  return (
    <Card>
      <div className="section-label">
        {label}
      </div>
      <CountUp value={value} className={className} />
      <div className="mt-1 text-[11px] font-semibold text-[var(--color-text-secondary)]">
        {subtitle}
      </div>
    </Card>
  )
}
