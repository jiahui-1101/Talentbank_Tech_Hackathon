import { cn } from '../../lib/cn'

const variants = {
  high: 'bg-[var(--color-risk-high-bg)] text-[var(--color-risk-high)] border border-[var(--color-risk-high)] border-opacity-20',
  medium: 'bg-[var(--color-risk-medium-bg)] text-[var(--color-risk-medium)] border border-[var(--color-risk-medium)] border-opacity-20',
  low: 'bg-[var(--color-risk-low-bg)] text-[var(--color-risk-low)] border border-[var(--color-risk-low)] border-opacity-20',
  neutral: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  accent: 'bg-blue-50 text-[var(--color-accent)] border border-[var(--color-accent)] border-opacity-20',
  default: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
}

export default function Badge({ label, variant = 'default' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wide',
        variants[variant] || variants.default,
      )}
    >
      {label}
    </span>
  )
}
