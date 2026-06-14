import { cn } from '../../lib/cn'

export default function Card({ children, className, onClick, hover = false, style }) {
  return (
    <div
      className={cn(
        'bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-card)] p-6',
        hover &&
          'transition-all duration-200 cursor-pointer hover:shadow-[var(--shadow-panel)] hover:-translate-y-0.5',
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
