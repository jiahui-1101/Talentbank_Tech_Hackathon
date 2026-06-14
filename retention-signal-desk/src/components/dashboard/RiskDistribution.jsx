export default function RiskDistribution({ counts, total }) {
  const segments = [
    ['Low', counts.Low, 'bg-[var(--color-risk-low)] rounded-l-full'],
    ['Medium', counts.Medium, 'bg-[var(--color-risk-medium)]'],
    ['High', counts.High, 'bg-[var(--color-risk-high)] rounded-r-full'],
  ]

  return (
    <section>
      <div className="section-label mb-3">
        RISK OVERVIEW
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
        {segments.map(([level, count, color]) => (
          <div
            key={level}
            className={`h-full origin-left animate-[riskGrow_700ms_cubic-bezier(0.2,0.8,0.2,1)_both] ${color}`}
            style={{ width: `${(count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-sm text-[var(--color-text-secondary)]">
        {segments.map(([level, count, color]) => (
          <div key={level} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <span>
              {count} {level}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
