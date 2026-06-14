import { useRiskColor } from '../../hooks/useRiskColor'
import Card from '../ui/Card'

export default function RiskScorePanel({ employee }) {
  const riskColor = useRiskColor(employee.riskScore)

  return (
    <Card>
      <div className="flex items-center">
        <div className="section-label">
          CAREER RISK ANALYSIS
        </div>
        <span className="ml-auto text-xs font-semibold text-[var(--color-text-tertiary)] sm:text-sm">
          Updated just now
        </span>
      </div>

      <div className="mt-6 text-center">
        <div className="text-5xl font-black sm:text-6xl" style={{ color: riskColor }}>
          {employee.riskScore}
        </div>
        <div
          className="mt-2 text-sm font-extrabold uppercase tracking-[0.08em] sm:text-base"
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
              <div className="text-base font-bold sm:text-lg">{driver.label}</div>
              <div className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                {driver.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
