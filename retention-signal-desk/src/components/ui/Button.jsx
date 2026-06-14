import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] px-4 py-2.5 rounded-[var(--radius-md)] font-mono font-bold text-xs uppercase tracking-[0.1em] shadow-[0_3px_12px_rgba(23,72,200,0.25)]',
  secondary:
    'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)] px-4 py-2.5 rounded-[var(--radius-md)] font-mono font-bold text-xs uppercase tracking-[0.1em] hover:border-[var(--color-accent)]',
  ghost:
    'bg-transparent text-[var(--color-accent)] underline-offset-2 hover:underline px-2 py-1.5 font-mono font-bold text-xs uppercase tracking-[0.08em]',
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className,
  icon: Icon,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant] || variants.primary,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
    </button>
  )
}
