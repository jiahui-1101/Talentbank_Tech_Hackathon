import { cn } from '../../lib/cn'

const variants = {
  high: 'bg-[var(--color-risk-high-bg)] text-[var(--color-risk-high)] border border-[var(--color-risk-high)] border-opacity-20',
  medium: 'bg-[var(--color-risk-medium-bg)] text-[var(--color-risk-medium)] border border-[var(--color-risk-medium)] border-opacity-20',
  low: 'bg-[var(--color-risk-low-bg)] text-[var(--color-risk-low)] border border-[var(--color-risk-low)] border-opacity-20',
  neutral: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  accent: 'bg-[var(--color-accent-light)] text-[#708500] border border-[var(--color-accent)] border-opacity-30',
  default: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
}

export default function Badge({ label, variant = 'default' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.075em]',
        variants[variant] || variants.default,
      )}
    >
      {label}
    </span>
  )
}
