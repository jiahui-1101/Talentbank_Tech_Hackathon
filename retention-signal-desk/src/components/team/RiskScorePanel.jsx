import { useEffect, useState } from 'react'
import { useRiskColor } from '../../hooks/useRiskColor'
import Card from '../ui/Card'

export default function RiskScorePanel({ employee }) {
  const [score, setScore] = useState(0)
  const riskColor = useRiskColor(employee.riskScore)

  useEffect(() => {
    setScore(0)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + 2, employee.riskScore)
      setScore(current)
      if (current >= employee.riskScore) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [employee.riskScore])

  return (
    <Card>
      <div className="flex items-center">
        <div className="section-label">
          CAREER RISK ANALYSIS
        </div>
        <span className="mono ml-auto text-sm text-[var(--color-text-tertiary)]">
          Updated just now
        </span>
      </div>

      <div className="mt-6 text-center">
        <div className="mono text-6xl font-black" style={{ color: riskColor }}>
          {score}
        </div>
        <div
          className="mono mt-2 text-lg font-bold uppercase"
          style={{ color: riskColor }}
        >
          {employee.riskLevel}
        </div>
      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${employee.riskScore}%`, backgroundColor: riskColor }}
        />
      </div>

      <div className="mt-7">
        {employee.riskDrivers.map((driver) => (
          <div
            key={driver.label}
            className="flex items-start gap-4 border-b border-[var(--color-border-subtle)] py-4 last:border-0"
          >
            <span
              className="mt-2 h-3 w-3 flex-shrink-0 rounded-full"
              style={{ backgroundColor: riskColor }}
            />
            <div>
              <div className="text-lg font-bold">{driver.label}</div>
              <div className="mt-1 text-base leading-6 text-[var(--color-text-secondary)]">
                {driver.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
