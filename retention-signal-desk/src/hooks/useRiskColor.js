export function useRiskColor(score) {
  if (score <= 44) return 'var(--color-risk-low)'
  if (score <= 74) return 'var(--color-risk-medium)'
  return 'var(--color-risk-high)'
}
