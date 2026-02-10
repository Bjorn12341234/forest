import { formatNumber } from '../../engine/format'

export function CostBadge({ label, cost, current }: { label: string; cost: number; current: number }) {
  const enough = current >= cost
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-numbers
      ${enough ? 'text-accent bg-accent/10' : 'text-danger bg-danger/10'}`}>
      {label}: {formatNumber(cost)}
    </span>
  )
}
