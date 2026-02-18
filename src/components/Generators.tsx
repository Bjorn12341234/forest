import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { GENERATORS, getGeneratorCost, getActiveSynergies, type GeneratorData } from '../data/generators'
import { formatNumber } from '../engine/format'
import { GlassCard } from './ui/GlassCard'
import { playPurchase } from '../engine/audio'

export function Generators() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const generators = useGameStore(s => s.generators)
  const buyGenerator = useGameStore(s => s.buyGenerator)

  // Only show generators for current phase
  const visibleGenerators = useMemo(() => {
    return GENERATORS.filter(g => {
      if (g.unlockPhase > phase) return false
      // Show locked generators one phase ahead as teasers
      return true
    })
  }, [phase])

  // Also show the next locked generator as a teaser
  const nextLocked = useMemo(() => {
    return GENERATORS.find(g => g.unlockPhase === phase + 1)
  }, [phase])

  // Active synergies
  const activeSynergies = useMemo(() => {
    return getActiveSynergies(generators)
  }, [generators])

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-medium text-text-primary mb-1">Byggnader</h2>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {visibleGenerators.map((gen, i) => (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              layout
            >
              <GeneratorRow
                data={gen}
                count={generators[gen.id]?.count ?? 0}
                stammar={stammar}
                onBuy={() => {
                  buyGenerator(gen.id)
                  playPurchase()
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Teaser for next locked generator */}
        {nextLocked && (
          <GlassCard padding="sm" className="opacity-30 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <div className="flex-1">
                <span className="text-sm font-medium text-text-muted">???</span>
                <p className="text-xs text-text-muted/50">Nästa fas</p>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Active synergies */}
      {activeSynergies.length > 0 && (
        <div className="mt-2">
          <h3 className="text-xs font-medium text-text-muted mb-1">Aktiva synergier</h3>
          <div className="flex flex-wrap gap-1">
            {activeSynergies.map(syn => (
              <span key={syn.id} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded border border-accent/20">
                {syn.label}
                {syn.effects.stammarMultiplier && ` +${Math.round((syn.effects.stammarMultiplier - 1) * 100)}% stammar`}
                {syn.effects.kapitalMultiplier && ` +${Math.round((syn.effects.kapitalMultiplier - 1) * 100)}% kapital`}
              </span>
            ))}
          </div>
        </div>
      )}

      {visibleGenerators.length === 0 && (
        <div className="text-center text-text-muted text-sm py-4">
          Samla stammar for att lasa upp byggnader...
        </div>
      )}
    </div>
  )
}

interface GeneratorRowProps {
  data: GeneratorData
  count: number
  stammar: number
  onBuy: () => void
}

function GeneratorRow({ data, count, stammar, onBuy }: GeneratorRowProps) {
  const [showFlash, setShowFlash] = useState(false)
  const cost = getGeneratorCost(data.baseCost, count, data.costScale)
  const canAfford = stammar >= cost
  const totalProduction = count * data.baseProduction

  const handleBuy = () => {
    if (!canAfford) return
    onBuy()
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 400)
  }

  return (
    <GlassCard
      padding="sm"
      hover={canAfford}
      glow={canAfford ? 'orange' : 'none'}
      className={`relative overflow-hidden cursor-pointer select-none ${!canAfford ? 'opacity-60' : ''}`}
      onClick={handleBuy}
      whileTap={canAfford ? { scale: 0.97 } : undefined}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-accent/30 z-10"
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-3">
        {/* Count badge */}
        <div className="flex flex-col items-center flex-shrink-0 w-10">
          <span className="text-lg font-bold text-accent font-numbers">{count}</span>
          <span className="text-xs text-text-muted uppercase">st</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-text-primary">{data.name}</h3>
          <p className="text-xs text-text-muted leading-relaxed mt-0.5">
            {data.description}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-sm font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
              {formatNumber(cost)} stammar
            </span>
            <span className="text-xs text-text-secondary font-numbers">
              +{formatNumber(data.baseProduction)}/s
              {count > 0 && (
                <span className="text-text-muted ml-1">
                  (tot: {formatNumber(totalProduction)}/s)
                </span>
              )}
            </span>
          </div>
          {/* Side effects */}
          {data.sideEffects && data.sideEffects.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {data.sideEffects.map((eff, i) => (
                <span key={i} className={`text-xs px-1.5 py-0.5 rounded ${
                  eff.perSecond > 0
                    ? 'text-success bg-success/10'
                    : 'text-danger bg-danger/10'
                }`}>
                  {eff.description}/st
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
