import { useRiskColor } from '../../hooks/useRiskColor'
import { cn } from '../../lib/cn'

const sizes = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-xl',
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return `${first}${last}`.toUpperCase()
}

export default function Avatar({ name, score, size = 'md' }) {
  const riskColor = useRiskColor(score)
  const hasScore = typeof score === 'number'

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] font-semibold text-[var(--color-text-primary)]',
        sizes[size] || sizes.md,
      )}
      style={hasScore ? { boxShadow: `0 0 0 2px ${riskColor}` } : undefined}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}
