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
            className="flex items-start gap-3 border-b border-[var(--color-border-subtle)] py-4 last:border-0 sm:gap-4 sm:py-5"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#47cfc0] text-sm font-extrabold text-[#123d39]">
              {index + 1}
            </div>
            <div className="flex-1 text-sm font-bold leading-6 text-[var(--color-text-primary)] sm:text-base">
              {action}
            </div>
            <div className="h-6 w-6 flex-shrink-0 rounded border-2 border-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </Card>
  )
}
