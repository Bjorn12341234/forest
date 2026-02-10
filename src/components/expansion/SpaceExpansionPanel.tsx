import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { EXPANSION_TARGETS, DEFENSE_TYPE_LABELS, PRESSURE_VECTOR_LABELS, type ExpansionTargetData } from '../../data/expansionTargets'
import { formatNumber } from '../../engine/format'
import { GlassCard } from '../ui/GlassCard'
import { playPurchase } from '../../engine/audio'
import { getMapView, VIEW_LABELS, MAP_COMPONENTS } from './MapBackgrounds'
import { CostBadge } from './CostBadge'
import type { ExpansionTargetState } from '../../store/types'

// ── Space Expansion Panel (EXPANSION era, phases 10-12) ──

export function SpaceExpansionPanel() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const expansionTargets = useGameStore(s => s.expansionTargets)
  const startCosmicInvasion = useGameStore(s => s.startCosmicInvasion)
  const allocateCosmicPressure = useGameStore(s => s.allocateCosmicPressure)

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

  function handleInvade(id: string) {
    startCosmicInvasion(id)
    playPurchase()
  }

  function getTargetStatus(id: string) {
    const ts = expansionTargets[id]
    if (!ts) return 'available'
    return ts.status
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
              const status = getTargetStatus(target.id)
              const isControlled = status === 'controlled'
              const isConquering = status === 'conquering'
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
                    ${isControlled
                      ? 'bg-accent glow-orange'
                      : isConquering
                        ? 'bg-yellow-500/70'
                        : affordable
                          ? 'bg-accent/70 hover:bg-accent'
                          : 'bg-text-muted/40'
                    }
                    ${isSelected ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg-secondary' : ''}
                  `}
                  style={{
                    left: `${target.position.x}%`,
                    top: `${target.position.y}%`,
                    width: isControlled ? 14 : 10,
                    height: isControlled ? 14 : 10,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedId(isSelected ? null : target.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={target.name}
                >
                  {isControlled && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {isConquering && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-500"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Labels */}
          {visibleTargets.map(target => {
            const status = getTargetStatus(target.id)
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
                  ${status === 'controlled' ? 'text-accent' : status === 'conquering' ? 'text-yellow-400' : 'text-text-muted'}`}>
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
              targetState={expansionTargets[selected.id]}
              affordable={canAfford(selected)}
              stammar={stammar}
              kapital={kapital}
              lobby={lobby}
              onInvade={() => handleInvade(selected.id)}
              onAllocate={(vector, amount) => allocateCosmicPressure(selected.id, vector, amount)}
              onAutoAllocate={() => {
                const def = selected
                // Auto-allocate: 2x on weakness
                const weaknessMap = { gravitational: 'energi', bureaucratic: 'resurser', existential: 'byrakrati' } as const
                const weakness = weaknessMap[def.defenseType]
                const vectors = ['energi', 'byrakrati', 'resurser'] as const
                for (const v of vectors) {
                  allocateCosmicPressure(selected.id, v, v === weakness ? 10 : 5)
                }
              }}
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
            {Object.values(expansionTargets).filter(t => t.status === 'controlled').length} / {visibleTargets.length}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Stammar/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(visibleTargets
              .filter(t => expansionTargets[t.id]?.status === 'controlled')
              .reduce((sum, t) => sum + t.production.stammarPerSecond, 0))}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Kapital/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(visibleTargets
              .filter(t => expansionTargets[t.id]?.status === 'controlled')
              .reduce((sum, t) => sum + t.production.kapitalPerSecond, 0))}
          </span>
        </GlassCard>
      </div>
    </div>
  )
}

// ── Target Detail Sub-component ──

function TargetDetailPanel({ target, targetState, affordable, stammar, kapital, lobby, onInvade, onAllocate, onAutoAllocate, onClose }: {
  target: ExpansionTargetData
  targetState: ExpansionTargetState | undefined
  affordable: boolean
  stammar: number
  kapital: number
  lobby: number
  onInvade: () => void
  onAllocate: (vector: 'energi' | 'byrakrati' | 'resurser', amount: number) => void
  onAutoAllocate: () => void
  onClose: () => void
}) {
  const status = targetState?.status ?? 'available'
  const isControlled = status === 'controlled'
  const isConquering = status === 'conquering'

  return (
    <GlassCard padding="md" glow={isControlled ? 'orange' : isConquering ? 'gold' : affordable ? 'gold' : 'none'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-text-primary">{target.name}</h3>
            {isControlled && <span className="text-xs text-accent">Kontrollerad</span>}
            {isConquering && <span className="text-xs text-yellow-400">Invaderar...</span>}
          </div>
          <p className="text-xs text-text-muted leading-relaxed mt-1">{target.description}</p>

          {/* Defense type */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-text-muted">
              Försvar: <span className="text-text-primary">{DEFENSE_TYPE_LABELS[target.defenseType]}</span>
            </span>
            <span className="text-xs text-text-muted">
              Styrka: <span className="text-text-primary">{target.defenseStrength}</span>
            </span>
          </div>

          {/* Costs — show when not yet invading */}
          {!isConquering && !isControlled && (
            <div className="flex flex-wrap gap-2 mt-3">
              <CostBadge label="Stammar" cost={target.cost.stammar} current={stammar} />
              <CostBadge label="Kapital" cost={target.cost.kapital} current={kapital} />
              <CostBadge label="Lobby" cost={target.cost.lobby} current={lobby} />
            </div>
          )}

          {/* Resistance bar — show when conquering */}
          {isConquering && targetState && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-muted">Motstånd</span>
                <span className="text-xs text-text-primary font-numbers">
                  {targetState.resistance.toFixed(1)} / {target.resistance}
                </span>
              </div>
              <div className="w-full h-3 bg-bg-tertiary rounded-sm overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${targetState.controlProgress}%` }}
                />
              </div>
              <div className="text-xs text-accent font-numbers text-right mt-0.5">
                {targetState.controlProgress.toFixed(1)}%
              </div>
            </div>
          )}

          {/* Pressure sliders — show when conquering */}
          {isConquering && targetState && (
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted uppercase tracking-wider">Tryck</span>
                <button
                  onClick={onAutoAllocate}
                  className="text-xs text-accent hover:text-accent/80 cursor-pointer"
                >
                  ⚡ Auto-tryck
                </button>
              </div>
              {(['energi', 'byrakrati', 'resurser'] as const).map(vector => {
                const value = targetState.pressureAllocation[vector]
                const isWeak = (
                  (target.defenseType === 'gravitational' && vector === 'energi') ||
                  (target.defenseType === 'bureaucratic' && vector === 'resurser') ||
                  (target.defenseType === 'existential' && vector === 'byrakrati')
                )
                return (
                  <div key={vector} className="flex items-center gap-2">
                    <span className={`text-xs w-20 ${isWeak ? 'text-accent font-medium' : 'text-text-muted'}`}>
                      {PRESSURE_VECTOR_LABELS[vector]}
                      {isWeak && ' 2×'}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={value}
                      onChange={(e) => onAllocate(vector, Number(e.target.value))}
                      className="flex-1 h-1.5 accent-accent"
                    />
                    <span className="text-xs text-text-primary font-numbers w-6 text-right">{value}</span>
                  </div>
                )
              })}
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

          {/* Maintenance cost — show when controlled */}
          {isControlled && (
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                -{formatNumber(target.maintenanceCost.kapitalPerSecond)} kapital/s
              </span>
              <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                -{formatNumber(target.maintenanceCost.lobbyPerSecond)} lobby/s
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            [X]
          </button>

          {!isConquering && !isControlled && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (affordable) onInvade()
              }}
              disabled={!affordable}
              className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all
                ${affordable
                  ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 cursor-pointer'
                  : 'bg-bg-tertiary border-bg-tertiary text-text-muted cursor-not-allowed'
                }`}
            >
              {affordable ? 'Invadera' : 'Otillräckliga resurser'}
            </button>
          )}

          {isControlled && (
            <span className="text-xs text-accent glow-text-orange">Aktiv produktion</span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
