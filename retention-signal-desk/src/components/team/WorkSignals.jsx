import Card from '../ui/Card'

function getMonthsSince(dateString) {
  const from = new Date(dateString)
  const now = new Date()
  return (
    (now.getFullYear() - from.getFullYear()) * 12 +
    now.getMonth() -
    from.getMonth()
  )
}

function Signal({ label, value, highlight }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)] p-6">
      <div className="section-label">
        {label}
      </div>
      <div
        className={`mt-3 text-3xl font-black sm:text-4xl ${
          highlight
            ? 'text-[var(--color-risk-high)]'
            : 'text-[var(--color-text-primary)]'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export default function WorkSignals({ employee }) {
  const monthsSincePromotion = getMonthsSince(employee.promotionLastDate)

  return (
    <Card>
      <div className="section-label">
        WORK SIGNALS
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Signal label="Active Projects" value={employee.activeProjects} />
        <Signal label="Completion Rate" value={`${employee.completionRate}%`} />
        <Signal label="Recognition (6mo)" value={employee.recognitionCount} />
        <Signal
          label="Months Since Promotion"
          value={monthsSincePromotion}
          highlight={monthsSincePromotion > 12}
        />
      </div>
    </Card>
  )
}
