import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { ANTAGONISTS, type AntagonistDef } from '../data/antagonists'
import { formatNumber } from '../engine/format'
import { GlassCard } from './ui/GlassCard'
import { playPurchase } from '../engine/audio'

export function AntagonistPanel() {
  const antagonists = useGameStore(s => s.antagonists)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const counterAntagonist = useGameStore(s => s.counterAntagonist)

  const activeAntagonists = useMemo(() => {
    return ANTAGONISTS.filter(a => antagonists[a.id]?.active)
  }, [antagonists])

  if (activeAntagonists.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-medium text-danger">Motståndare</h2>
      <p className="text-xs text-text-muted -mt-2">
        Krafter som motverkar industrin. Neutralisera dem — eller lid konsekvenserna.
      </p>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {activeAntagonists.map((ant, i) => (
            <motion.div
              key={ant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <AntagonistRow
                data={ant}
                countered={antagonists[ant.id]?.countered ?? false}
                kapital={kapital}
                lobby={lobby}
                onCounter={() => {
                  counterAntagonist(ant.id)
                  playPurchase()
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function AntagonistRow({ data, countered, kapital, lobby, onCounter }: {
  data: AntagonistDef
  countered: boolean
  kapital: number
  lobby: number
  onCounter: () => void
}) {
  const costResource = data.counterCost.resource
  const currentResource = costResource === 'kapital' ? kapital : lobby
  const canAfford = !countered && currentResource >= data.counterCost.amount
  const costLabel = costResource === 'kapital'
    ? `${formatNumber(data.counterCost.amount)} Mkr`
    : `${formatNumber(data.counterCost.amount)} PK`

  return (
    <GlassCard
      padding="sm"
      glow={countered ? 'none' : 'red'}
      className={countered ? 'opacity-60' : ''}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0 mt-0.5">{data.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${countered ? 'text-text-muted line-through' : 'text-danger'}`}>
              {data.name}
            </span>
            {countered && <span className="text-xs text-success">Neutraliserad</span>}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">{data.description}</p>

          {/* Tick effects */}
          {!countered && (
            <div className="flex flex-wrap gap-1 mt-1">
              {data.tickEffects.map((eff, i) => (
                <span key={i} className="text-xs text-danger bg-danger/10 px-1.5 py-0.5 rounded">
                  {eff.description}
                </span>
              ))}
            </div>
          )}

          {/* Counter button */}
          {!countered && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (canAfford) onCounter()
              }}
              disabled={!canAfford}
              className={`mt-2 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all
                ${canAfford
                  ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 cursor-pointer'
                  : 'bg-bg-tertiary border-bg-tertiary text-text-muted cursor-not-allowed'
                }`}
            >
              {data.counterLabel} — {costLabel}
            </button>
          )}
          {!countered && (
            <p className="text-xs text-text-muted/60 mt-1 italic">{data.counterDescription}</p>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
