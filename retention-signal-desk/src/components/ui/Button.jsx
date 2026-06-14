import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-[#20211f] text-white hover:bg-black px-5 py-3 rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.14)]',
  secondary:
    'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-black/10 px-5 py-3 rounded-full hover:border-black/30 hover:bg-[var(--color-bg-secondary)]',
  ghost:
    'bg-[#f0f1e8] text-[#30312c] hover:bg-[#dfe4dc] px-4 py-2.5 rounded-full',
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
        'inline-flex items-center justify-center gap-2 whitespace-nowrap text-[12px] font-extrabold uppercase tracking-[0.075em] transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50',
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
