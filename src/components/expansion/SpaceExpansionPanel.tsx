import { useMemo } from 'react'
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
  const entropi = useGameStore(s => s.entropi)
  const expansionTargets = useGameStore(s => s.expansionTargets)
  const buyExpansionTarget = useGameStore(s => s.buyExpansionTarget)

  const mapView = getMapView(phase)
  const MapSVG = MAP_COMPONENTS[mapView]

  const visibleTargets = useMemo(() => {
    return EXPANSION_TARGETS.filter(t => t.unlockPhase <= phase)
  }, [phase])

  function canAfford(t: ExpansionTargetData): boolean {
    return stammar >= t.cost.stammar && kapital >= t.cost.kapital && lobby >= t.cost.lobby
  }

  function handleBuy(id: string) {
    buyExpansionTarget(id)
    playPurchase()
  }

  const controlledCount = Object.values(expansionTargets).filter(t => t.status === 'controlled').length
  const totalStammarPS = visibleTargets
    .filter(t => expansionTargets[t.id]?.status === 'controlled')
    .reduce((sum, t) => sum + t.production.stammarPerSecond, 0)
  const totalKapitalPS = visibleTargets
    .filter(t => expansionTargets[t.id]?.status === 'controlled')
    .reduce((sum, t) => sum + t.production.kapitalPerSecond, 0)

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

      {/* Entropy bar (phase 12) */}
      {phase >= 12 && (
        <GlassCard padding="sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs uppercase tracking-widest text-red-400 font-medium">Entropi</span>
            <span className="text-sm font-numbers text-red-400">{entropi.toFixed(1)}%</span>
          </div>
          <div className="w-full h-4 bg-bg-tertiary rounded-sm overflow-hidden">
            <motion.div
              className="h-full rounded-sm"
              style={{
                width: `${entropi}%`,
                background: entropi > 50
                  ? 'linear-gradient(90deg, #D4730C, #e8a040)'
                  : entropi > 20
                    ? 'linear-gradient(90deg, #dc2626, #D4730C)'
                    : 'linear-gradient(90deg, #7f1d1d, #dc2626)',
              }}
              animate={{ opacity: entropi < 20 ? [0.6, 1, 0.6] : 1 }}
              transition={entropi < 20 ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
            />
          </div>
          <p className="text-xs text-text-muted mt-1.5 italic">
            {entropi > 80
              ? 'Universums energi sinar. Tillväxten fortsätter.'
              : entropi > 50
                ? 'Stjärnor slocknar en efter en. Maskinerna maler vidare.'
                : entropi > 20
                  ? 'Termisk jämvikt närmar sig. Någonting letar i mörkret.'
                  : 'Absolut tystnad. Den sista maskinen söker ett träd att fälla.'}
          </p>
        </GlassCard>
      )}

      {/* Map (decorative) */}
      <GlassCard padding="sm" className="relative overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '70%' }}>
          <div className="absolute inset-0 pointer-events-none">
            <MapSVG />
          </div>

          {/* Target Dots */}
          <AnimatePresence>
            {visibleTargets.map((target, i) => {
              const isControlled = expansionTargets[target.id]?.status === 'controlled'

              return (
                <motion.div
                  key={target.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute z-10 rounded-full
                    ${isControlled ? 'bg-accent glow-orange' : 'bg-text-muted/40'}
                  `}
                  style={{
                    left: `${target.position.x}%`,
                    top: `${target.position.y}%`,
                    width: isControlled ? 24 : 16,
                    height: isControlled ? 24 : 16,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {isControlled && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Labels */}
          {visibleTargets.map(target => {
            const isControlled = expansionTargets[target.id]?.status === 'controlled'
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
                  ${isControlled ? 'text-accent' : 'text-text-muted'}`}>
                  {target.name}
                </span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Target Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleTargets.map(target => {
          const isControlled = expansionTargets[target.id]?.status === 'controlled'
          const affordable = canAfford(target)

          return (
            <GlassCard
              key={target.id}
              padding="md"
              glow={isControlled ? 'orange' : affordable ? 'gold' : 'none'}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-primary">{target.name}</h3>
                  {isControlled && <span className="text-xs text-accent">Kontrollerad</span>}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{target.description}</p>

                {/* Production */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
                    +{formatNumber(target.production.stammarPerSecond)} stammar/s
                  </span>
                  <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
                    +{formatNumber(target.production.kapitalPerSecond)} kapital/s
                  </span>
                </div>

                {/* Maintenance (shown when controlled) */}
                {isControlled && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                      -{formatNumber(target.maintenanceCost.kapitalPerSecond)} kapital/s
                    </span>
                    <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                      -{formatNumber(target.maintenanceCost.lobbyPerSecond)} lobby/s
                    </span>
                  </div>
                )}

                {/* Cost + Buy Button (shown when not controlled) */}
                {!isControlled && (
                  <>
                    <div className="flex flex-wrap gap-1.5">
                      <CostBadge label="Stammar" cost={target.cost.stammar} current={stammar} />
                      <CostBadge label="Kapital" cost={target.cost.kapital} current={kapital} />
                      <CostBadge label="Lobby" cost={target.cost.lobby} current={lobby} />
                    </div>
                    <button
                      onClick={() => affordable && handleBuy(target.id)}
                      disabled={!affordable}
                      className={`w-full px-3 py-2 rounded-sm text-sm font-medium border transition-all
                        ${affordable
                          ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 cursor-pointer'
                          : 'bg-bg-tertiary border-bg-tertiary text-text-muted cursor-not-allowed'
                        }`}
                    >
                      {affordable ? 'Förvärva' : 'Otillräckliga resurser'}
                    </button>
                  </>
                )}
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Territorier</span>
          <span className="text-sm text-text-primary font-numbers">
            {controlledCount} / {visibleTargets.length}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Stammar/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(totalStammarPS)}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Kapital/s</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(totalKapitalPS)}
          </span>
        </GlassCard>
      </div>
    </div>
  )
}
