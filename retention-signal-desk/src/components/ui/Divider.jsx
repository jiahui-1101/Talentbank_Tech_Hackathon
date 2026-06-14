export default function Divider({ label }) {
  if (!label) {
    return <hr className="border-[var(--color-border-subtle)]" />
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>
  )
}
