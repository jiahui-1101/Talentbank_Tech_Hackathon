export function useRiskLevel(score) {
  if (score <= 44) return 'Low'
  if (score <= 74) return 'Medium'
  return 'High'
}
