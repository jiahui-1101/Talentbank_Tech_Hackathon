import { useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'

const riskStyles = {
  High: 'bg-[var(--color-risk-high)]',
  Medium: 'bg-[var(--color-risk-medium)]',
  Low: 'bg-[var(--color-risk-low)]',
}

export default function EmployeeCard({ employee, index }) {
  const navigate = useNavigate()

  return (
    <button
      className="animate-slide-up w-full rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-white p-6 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-panel)]"
      style={{ animationDelay: `${index * 24}ms` }}
      onClick={() => navigate(`/team/${employee.id}`)}
    >
      <div className="flex items-start gap-4">
        <Avatar name={employee.name} score={employee.riskScore} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="section-label">Zone {employee.department}</div>
          <div className="mt-2 truncate text-lg font-black">{employee.name}</div>
          <div className="mt-1 truncate text-base font-semibold text-[var(--color-text-secondary)]">
            {employee.role}
          </div>
        </div>
        <Badge label={employee.riskLevel} variant={employee.riskLevel.toLowerCase()} />
      </div>
      <div className="mt-7 flex items-end justify-between gap-4">
        <div>
          <div className="mono text-4xl font-black text-[var(--color-text-primary)]">{employee.riskScore}</div>
          <div className="section-label mt-1">Risk Score</div>
        </div>
      </div>

      <div className="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] px-4 py-3 text-base font-bold leading-6 text-[var(--color-text-secondary)]">
        {employee.riskDrivers[0]?.label}
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
        <div className={`h-full rounded-full ${riskStyles[employee.riskLevel]}`} style={{ width: `${employee.riskScore}%` }} />
      </div>
      <div className="mt-5 text-base font-black text-[var(--color-accent)]">→ Tap to drill into risk profile</div>
    </button>
  )
}
