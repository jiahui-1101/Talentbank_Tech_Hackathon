import Card from '../ui/Card'

export default function SuggestedActions({ actions }) {
  return (
    <Card>
      <div className="flex items-center">
        <div className="section-label">
          RECOMMENDED ACTIONS
        </div>
        <span className="ml-3 h-3 w-3 rounded-full bg-[var(--color-risk-low)] animate-pulse" />
      </div>

      <div className="mt-6">
        {actions.map((action, index) => (
          <div
            key={action}
            className="flex items-start gap-4 border-b border-[var(--color-border-subtle)] py-5 last:border-0"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-base font-bold text-white">
              {index + 1}
            </div>
            <div className="flex-1 text-lg font-semibold leading-7 text-[var(--color-text-primary)]">
              {action}
            </div>
            <div className="h-6 w-6 flex-shrink-0 rounded border-2 border-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </Card>
  )
}
