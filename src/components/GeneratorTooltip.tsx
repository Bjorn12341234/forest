import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { type GeneratorData, getGeneratorCost, GENERATOR_SYNERGIES } from '../data/generators'
import { formatNumber } from '../engine/format'

interface GeneratorTooltipProps {
  data: GeneratorData
  count: number
}

export function GeneratorTooltip({ data, count }: GeneratorTooltipProps) {
  const generators = useGameStore(s => s.generators)

  // Find synergies this generator participates in
  const synergies = useMemo(() => {
    return GENERATOR_SYNERGIES.filter(syn => {
      const hasA = (generators[syn.genA]?.count ?? 0) > 0
      const hasB = (generators[syn.genB]?.count ?? 0) > 0
      return (syn.genA === data.id || syn.genB === data.id) && hasA && hasB
    })
  }, [data.id, generators])

  const nextCost = getGeneratorCost(data.baseCost, count, data.costScale)
  const totalProd = count * data.baseProduction

  return (
    <div className="flex flex-col gap-1.5 text-xs min-w-[200px]">
      <div className="font-medium text-text-primary text-sm">{data.name}</div>

      {count > 0 && (
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between">
            <span className="text-text-muted">Produktion/st:</span>
            <span className="text-text-secondary font-numbers">{formatNumber(data.baseProduction)} stammar/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Totalt ({count} st):</span>
            <span className="text-accent font-numbers">{formatNumber(totalProd)} stammar/s</span>
          </div>
        </div>
      )}

      {/* Side effects totals */}
      {data.sideEffects && data.sideEffects.length > 0 && count > 0 && (
        <div className="border-t border-bg-tertiary pt-1">
          <span className="text-text-muted">Bieffekter ({count} st):</span>
          {data.sideEffects.map((eff, i) => (
            <div key={i} className="flex justify-between">
              <span className={eff.perSecond > 0 ? 'text-success' : 'text-danger'}>
                {eff.description}
              </span>
              <span className={`font-numbers ${eff.perSecond > 0 ? 'text-success' : 'text-danger'}`}>
                {eff.perSecond > 0 ? '+' : ''}{formatNumber(eff.perSecond * count)}/s
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Synergies */}
      {synergies.length > 0 && (
        <div className="border-t border-bg-tertiary pt-1">
          <span className="text-text-muted">Synergier:</span>
          {synergies.map(syn => (
            <div key={syn.id} className="text-accent">
              {syn.label}
              {syn.effects.stammarMultiplier && ` +${Math.round((syn.effects.stammarMultiplier - 1) * 100)}%`}
              {syn.effects.kapitalMultiplier && ` +${Math.round((syn.effects.kapitalMultiplier - 1) * 100)}% kapital`}
            </div>
          ))}
        </div>
      )}

      {/* Next cost */}
      <div className="border-t border-bg-tertiary pt-1 flex justify-between">
        <span className="text-text-muted">Nästa kostnad:</span>
        <span className="text-text-secondary font-numbers">{formatNumber(nextCost)} stammar</span>
      </div>

      {/* Cost scale hint */}
      {data.costScale && data.costScale > 1.15 && (
        <div className="text-text-muted/60 text-[10px]">
          Kostnadsökning: ×{data.costScale.toFixed(2)} per enhet
        </div>
      )}
    </div>
  )
}
