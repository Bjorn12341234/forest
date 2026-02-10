import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { EXPANSION_TARGETS, type ExpansionTargetData } from '../../data/expansionTargets'
import { formatNumber } from '../../engine/format'
import { GlassCard } from '../ui/GlassCard'
import { playPurchase } from '../../engine/audio'
import { getMapView, VIEW_LABELS, MAP_COMPONENTS } from './MapBackgrounds'
import { CostBadge } from './CostBadge'

// ── Space Expansion Panel (EXPANSION era, phases 10-12) ──

export function SpaceExpansionPanel() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const expansionTargets = useGameStore(s => s.expansionTargets)
  const acquireExpansionTarget = useGameStore(s => s.acquireExpansionTarget)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const mapView = getMapView(phase)
  const MapSVG = MAP_COMPONENTS[mapView]

  const visibleTargets = useMemo(() => {
    return EXPANSION_TARGETS.filter(t => t.unlockPhase <= phase)
  }, [phase])

  const selected = useMemo(() => {
    return visibleTargets.find(t => t.id === selectedId) ?? null
  }, [selectedId, visibleTargets])

  function canAfford(t: ExpansionTargetData): boolean {
    return stammar >= t.cost.stammar && kapital >= t.cost.kapital && lobby >= t.cost.lobby
  }

  function handleBuy(id: string) {
    acquireExpansionTarget(id)
    playPurchase()
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-text-primary">Expansion</h2>
          <p className="text-xs text-text-muted">
            {mapView === 'solar' && 'Interplanetär skogsbruksindustri. Inga människor behövs.'}
            {mapView === 'galaxy' && 'Galaktisk expansion. AI-styrelsen godkänner.'}
            {mapView === 'multiverse' && 'Skogsbruk över alla verkligheter. Entropi är det sista hindret.'}
          </p>
        </div>
        <span className="text-xs text-text-muted uppercase tracking-widest">
          {VIEW_LABELS[mapView]}
        </span>
      </div>

      {/* Map + Targets */}
      <GlassCard padding="sm" className="relative overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '70%' }}>
          <div className="absolute inset-0">
            <MapSVG />
          </div>

          {/* Target Dots */}
          <AnimatePresence>
            {visibleTargets.map((target, i) => {
              const isAcquired = expansionTargets[target.id]?.acquired
              const affordable = canAfford(target)
              const isSelected = selectedId === target.id

              return (
                <motion.button
                  key={target.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute z-10 flex items-center justify-center rounded-full
                    transition-shadow duration-300 cursor-pointer
                    ${isAcquired
                      ? 'bg-accent glow-orange'
                      : affordable
                        ? 'bg-accent/70 hover:bg-accent'
                        : 'bg-text-muted/40'
                    }
                    ${isSelected ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg-secondary' : ''}
                  `}
                  style={{
                    left: `${target.position.x}%`,
                    top: `${target.position.y}%`,
                    width: isAcquired ? 14 : 10,
                    height: isAcquired ? 14 : 10,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedId(isSelected ? null : target.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={target.name}
                >
                  {isAcquired && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Labels */}
          {visibleTargets.map(target => {
            const isAcquired = expansionTargets[target.id]?.acquired
            return (
              <div
                key={`label-${target.id}`}
                className="absolute z-0 pointer-events-none text-center"
                style={{
                  left: `${target.position.x}%`,
                  top: `${target.position.y + 5}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className={`text-xs leading-none font-medium whitespace-nowrap
                  ${isAcquired ? 'text-accent' : 'text-text-muted'}`}>
                  {target.name}
                </span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Selected Target Panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <TargetDetailPanel
              target={selected}
              acquired={expansionTargets[selected.id]?.acquired ?? false}
              affordable={canAfford(selected)}
              stammar={stammar}
              kapital={kapital}
              lobby={lobby}
              onBuy={() => handleBuy(selected.id)}
              onClose={() => setSelectedId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Territorier</span>
          <span className="text-sm text-text-primary font-numbers">
            {Object.values(expansionTargets).filter(t => t.acquired).length} / {visibleTargets.length}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Stammar/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(visibleTargets
              .filter(t => expansionTargets[t.id]?.acquired)
              .reduce((sum, t) => sum + t.production.stammarPerSecond, 0))}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Kapital/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(visibleTargets
              .filter(t => expansionTargets[t.id]?.acquired)
              .reduce((sum, t) => sum + t.production.kapitalPerSecond, 0))}
          </span>
        </GlassCard>
      </div>
    </div>
  )
}

// ── Target Detail Sub-component ──

function TargetDetailPanel({ target, acquired, affordable, stammar, kapital, lobby, onBuy, onClose }: {
  target: ExpansionTargetData
  acquired: boolean
  affordable: boolean
  stammar: number
  kapital: number
  lobby: number
  onBuy: () => void
  onClose: () => void
}) {
  return (
    <GlassCard padding="md" glow={acquired ? 'orange' : affordable ? 'gold' : 'none'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-text-primary">{target.name}</h3>
            {acquired && <span className="text-xs text-accent">Etablerad</span>}
          </div>
          <p className="text-xs text-text-muted leading-relaxed mt-1">{target.description}</p>

          {/* Costs */}
          {!acquired && (
            <div className="flex flex-wrap gap-2 mt-3">
              <CostBadge label="Stammar" cost={target.cost.stammar} current={stammar} />
              <CostBadge label="Kapital" cost={target.cost.kapital} current={kapital} />
              <CostBadge label="Lobby" cost={target.cost.lobby} current={lobby} />
            </div>
          )}

          {/* Production */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
              +{formatNumber(target.production.stammarPerSecond)} stammar/s
            </span>
            <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
              +{formatNumber(target.production.kapitalPerSecond)} kapital/s
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            [X]
          </button>

          {!acquired && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (affordable) onBuy()
              }}
              disabled={!affordable}
              className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all
                ${affordable
                  ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 cursor-pointer'
                  : 'bg-bg-tertiary border-bg-tertiary text-text-muted cursor-not-allowed'
                }`}
            >
              {affordable ? 'Etablera' : 'Otillräckliga resurser'}
            </button>
          )}

          {acquired && (
            <span className="text-xs text-accent glow-text-orange">Aktiv produktion</span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
