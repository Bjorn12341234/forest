import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { EXPANSION_TARGETS, type ExpansionTargetData } from '../data/expansionTargets'
import { COUNTRIES, type CountryDef } from '../data/countries'
import type { CountryState } from '../store/types'
import { formatNumber } from '../engine/format'
import { getEra } from '../engine/phases'
import { GlassCard } from './ui/GlassCard'
import { playPurchase } from '../engine/audio'

// ── Map View Types ──

type MapView = 'countries' | 'solar' | 'galaxy' | 'multiverse'

function getMapView(phase: number): MapView {
  const era = getEra(phase)
  if (era === 'INTERNATIONELL' || (era === 'MAKT' && phase >= 6)) return 'countries'
  if (phase <= 10) return 'solar'
  if (phase <= 11) return 'galaxy'
  return 'multiverse'
}

const VIEW_LABELS: Record<MapView, string> = {
  countries: 'Världskarta',
  solar: 'Solsystemet',
  galaxy: 'Galaxen',
  multiverse: 'Multiversum',
}

// ── SVG Map Backgrounds ──

function WorldMapSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Europe */}
      <path d="M44 14 L52 12 L56 16 L54 22 L50 26 L46 30 L42 28 L40 22 L42 18 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Scandinavia */}
      <path d="M48 6 L52 4 L54 8 L56 14 L52 12 L48 10 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Africa */}
      <path d="M44 34 L54 32 L58 40 L56 52 L52 62 L48 64 L42 56 L40 44 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* North America */}
      <path d="M8 10 L26 8 L30 16 L28 28 L22 34 L14 32 L8 24 L6 16 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* South America */}
      <path d="M22 42 L32 38 L36 48 L34 58 L30 68 L24 70 L20 60 L18 50 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Asia */}
      <path d="M58 10 L82 8 L90 16 L88 28 L80 32 L72 30 L64 26 L58 20 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Southeast Asia / Indonesia */}
      <path d="M72 42 L86 40 L90 48 L84 56 L76 54 L70 48 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Australia */}
      <path d="M76 60 L88 58 L92 64 L88 72 L78 70 L74 66 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.4" />
    </svg>
  )
}

function SolarSystemSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Sun */}
      <circle cx="50" cy="50" r="4" fill="var(--color-accent)" opacity="0.6" />
      <circle cx="50" cy="50" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3">
        <animate attributeName="r" values="4;5;4" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Orbits */}
      {[15, 25, 38, 52, 68].map((r, i) => (
        <circle key={i} cx="50" cy="50" r={r} fill="none"
          stroke="var(--color-text-muted)" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.3" />
      ))}
    </svg>
  )
}

function GalaxySVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Center glow */}
      <circle cx="50" cy="50" r="6" fill="var(--color-accent)" opacity="0.15" />
      <circle cx="50" cy="50" r="3" fill="var(--color-accent)" opacity="0.3" />
      {/* Spiral arms */}
      <path d="M50 50 Q60 40 70 38 Q82 36 88 44" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q40 42 34 34 Q28 24 32 16" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q42 60 34 64 Q22 68 14 60" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q58 58 66 64 Q76 72 84 68" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      {/* Dust dots */}
      {[[62,35],[74,40],[36,30],[28,20],[38,68],[18,56],[70,68],[82,62],
        [56,28],[44,72],[24,48],[76,52]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.5" fill="var(--color-text-muted)" opacity="0.2" />
      ))}
    </svg>
  )
}

function MultiverseSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Parallel universe planes */}
      {[
        { x: 10, y: 10, w: 30, h: 55, label: 'α' },
        { x: 50, y: 5, w: 30, h: 55, label: 'β' },
        { x: 30, y: 25, w: 30, h: 55, label: 'γ' },
      ].map((plane, i) => (
        <g key={i}>
          <rect x={plane.x} y={plane.y} width={plane.w} height={plane.h} rx="1"
            fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)"
            strokeWidth="0.3" strokeDasharray="2 1" opacity={0.3 - i * 0.05}
            transform={`skewY(${-5 + i * 5})`} />
          <text x={plane.x + 2} y={plane.y + 6} fontSize="3"
            fill="var(--color-text-muted)" opacity="0.4">{plane.label}</text>
        </g>
      ))}
      {/* Connecting energy lines */}
      <line x1="35" y1="35" x2="55" y2="30" stroke="var(--color-accent)" strokeWidth="0.2" opacity="0.3" strokeDasharray="1 1" />
      <line x1="55" y1="30" x2="45" y2="50" stroke="var(--color-accent)" strokeWidth="0.2" opacity="0.3" strokeDasharray="1 1" />
    </svg>
  )
}

const MAP_COMPONENTS: Record<MapView, React.FC> = {
  countries: WorldMapSVG,
  solar: SolarSystemSVG,
  galaxy: GalaxySVG,
  multiverse: MultiverseSVG,
}

// ── Status colors for country dots ──

function getCountryDotColor(status: string | undefined): string {
  switch (status) {
    case 'controlled': return 'bg-accent-green glow-orange'
    case 'invading': return 'bg-accent animate-pulse-glow'
    case 'rebelling': return 'bg-danger'
    default: return 'bg-text-muted/40'
  }
}

// ── Main Component ──

export function ExpansionPanel() {
  const phase = useGameStore(s => s.phase)
  const era = getEra(phase)

  if (era === 'INTERNATIONELL' || (era === 'MAKT' && phase >= 6)) {
    return <CountryPanel />
  }
  if (era === 'EXPANSION') {
    return <SpaceExpansionPanel />
  }
  // SVERIGE/early MAKT: show locked message
  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <GlassCard padding="md">
        <p className="text-sm text-text-muted text-center py-8">
          Expansionsmodulen låses upp i fas 7.
        </p>
      </GlassCard>
    </div>
  )
}

// ── Country Invasion Panel (INTERNATIONELL era) ──

function CountryPanel() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const countries = useGameStore(s => s.countries)
  const invadeCountry = useGameStore(s => s.invadeCountry)
  const allocatePressure = useGameStore(s => s.allocatePressure)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visibleCountries = useMemo(() => {
    return COUNTRIES.filter(c => c.unlockPhase <= phase)
  }, [phase])

  const selected = useMemo(() => {
    return visibleCountries.find(c => c.id === selectedId) ?? null
  }, [selectedId, visibleCountries])

  function canAffordInvasion(c: CountryDef): boolean {
    return stammar >= c.invasionCost.stammar &&
      kapital >= c.invasionCost.kapital &&
      lobby >= c.invasionCost.lobby
  }

  function handleInvade(id: string) {
    invadeCountry(id)
    playPurchase()
  }

  const controlledCount = Object.values(countries).filter(c => c.status === 'controlled').length
  const invadingCount = Object.values(countries).filter(c => c.status === 'invading').length

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-text-primary">Internationell Expansion</h2>
          <p className="text-xs text-text-muted">
            Exportera den svenska modellen. Krossa motstånd med kapital, lobby och stammar.
          </p>
        </div>
        <span className="text-xs text-text-muted uppercase tracking-widest">
          {VIEW_LABELS.countries}
        </span>
      </div>

      {/* World Map + Country Dots */}
      <GlassCard padding="sm" className="relative overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56%' }}>
          <div className="absolute inset-0">
            <WorldMapSVG />
          </div>

          {/* Country Dots */}
          <AnimatePresence>
            {visibleCountries.map((country, i) => {
              const cs = countries[country.id]
              const status = cs?.status
              const isControlled = status === 'controlled'
              const isInvading = status === 'invading'
              const isSelected = selectedId === country.id

              return (
                <motion.button
                  key={country.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                  className={`absolute z-10 flex items-center justify-center rounded-full
                    transition-shadow duration-300 cursor-pointer
                    ${getCountryDotColor(status)}
                    ${!status && canAffordInvasion(country) ? 'bg-accent/70 hover:bg-accent' : ''}
                    ${isSelected ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg-secondary' : ''}
                  `}
                  style={{
                    left: `${country.position.x}%`,
                    top: `${country.position.y}%`,
                    width: isControlled ? 14 : isInvading ? 12 : 10,
                    height: isControlled ? 14 : isInvading ? 12 : 10,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedId(isSelected ? null : country.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={country.name}
                >
                  {isInvading && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {isControlled && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent-green"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Labels */}
          {visibleCountries.map(country => {
            const cs = countries[country.id]
            const isControlled = cs?.status === 'controlled'
            const isInvading = cs?.status === 'invading'
            return (
              <div
                key={`label-${country.id}`}
                className="absolute z-0 pointer-events-none text-center"
                style={{
                  left: `${country.position.x}%`,
                  top: `${country.position.y + 5}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className={`text-xs leading-none font-medium whitespace-nowrap
                  ${isControlled ? 'text-accent-green' : isInvading ? 'text-accent' : 'text-text-muted'}`}>
                  {country.name}
                </span>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Selected Country Detail */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <CountryDetailPanel
              country={selected}
              countryState={countries[selected.id]}
              affordable={canAffordInvasion(selected)}
              stammar={stammar}
              kapital={kapital}
              lobby={lobby}
              onInvade={() => handleInvade(selected.id)}
              onAllocate={(vector, amount) => allocatePressure(selected.id, vector, amount)}
              onClose={() => setSelectedId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Kontrollerade</span>
          <span className="text-sm text-accent-green font-numbers">
            {controlledCount} / {visibleCountries.length}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Invasioner</span>
          <span className="text-sm text-accent font-numbers">
            {invadingCount}
          </span>
        </GlassCard>
        <GlassCard padding="sm">
          <span className="text-xs text-text-muted uppercase tracking-wider block">Produktion</span>
          <span className="text-sm text-accent font-numbers">
            +{formatNumber(Object.entries(countries)
              .filter(([, cs]) => cs.status === 'controlled')
              .reduce((sum, [id]) => {
                const def = COUNTRIES.find(c => c.id === id)
                return sum + (def?.production.stammarPerSecond ?? 0)
              }, 0))}/s
          </span>
        </GlassCard>
      </div>
    </div>
  )
}

// ── Country Detail Panel ──

function CountryDetailPanel({ country, countryState, affordable, stammar, kapital, lobby, onInvade, onAllocate, onClose }: {
  country: CountryDef
  countryState: CountryState | undefined
  affordable: boolean
  stammar: number
  kapital: number
  lobby: number
  onInvade: () => void
  onAllocate: (vector: 'kapital' | 'lobby' | 'stammar', amount: number) => void
  onClose: () => void
}) {
  const status = countryState?.status
  const resistance = countryState?.resistance ?? country.resistance
  const pa = countryState?.pressureAllocation ?? { kapital: 0, lobby: 0, stammar: 0 }

  const defenseLabel: Record<string, string> = {
    environmental: 'Miljö',
    political: 'Politisk',
    economic: 'Ekonomisk',
  }

  const weaknessLabel: Record<string, string> = {
    environmental: 'Lobby (2x)',
    political: 'Stammar (2x)',
    economic: 'Kapital (2x)',
  }

  return (
    <GlassCard padding="md" glow={status === 'controlled' ? 'orange' : status === 'invading' ? 'gold' : 'none'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-text-primary">{country.name}</h3>
            {status === 'controlled' && <span className="text-xs text-accent-green">Kontrollerad</span>}
            {status === 'invading' && <span className="text-xs text-accent">Invasion pågår</span>}
            {status === 'rebelling' && <span className="text-xs text-danger">Uppror!</span>}
          </div>
          <p className="text-xs text-text-muted leading-relaxed mt-1">{country.description}</p>

          {/* Defense info */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs px-1.5 py-0.5 rounded bg-bg-tertiary text-text-secondary">
              Försvar: {defenseLabel[country.defenseType]} ({country.defenseStrength}/10)
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-bg-tertiary text-accent">
              Svaghet: {weaknessLabel[country.defenseType]}
            </span>
          </div>

          {/* Resistance bar (when invading) */}
          {status === 'invading' && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-muted">Motstånd</span>
                <span className="text-xs text-text-secondary font-numbers">{resistance.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
                <div
                  className="h-full bg-danger transition-all duration-300"
                  style={{ width: `${resistance}%` }}
                />
              </div>
            </div>
          )}

          {/* Pressure Allocation (when invading) */}
          {status === 'invading' && (
            <div className="mt-3 flex flex-col gap-2">
              <span className="text-xs text-text-muted uppercase tracking-wider">Allokera tryck</span>
              <PressureSlider
                label="Kapital"
                value={pa.kapital}
                isWeak={country.defenseType === 'economic'}
                onChange={(v) => onAllocate('kapital', v)}
              />
              <PressureSlider
                label="Lobby"
                value={pa.lobby}
                isWeak={country.defenseType === 'environmental'}
                onChange={(v) => onAllocate('lobby', v)}
              />
              <PressureSlider
                label="Stammar"
                value={pa.stammar}
                isWeak={country.defenseType === 'political'}
                onChange={(v) => onAllocate('stammar', v)}
              />
            </div>
          )}

          {/* Costs to invade */}
          {!status && (
            <div className="flex flex-wrap gap-2 mt-3">
              <CostBadge label="Stammar" cost={country.invasionCost.stammar} current={stammar} />
              <CostBadge label="Kapital" cost={country.invasionCost.kapital} current={kapital} />
              <CostBadge label="Lobby" cost={country.invasionCost.lobby} current={lobby} />
            </div>
          )}

          {/* Production (when controlled) */}
          {status === 'controlled' && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
                +{formatNumber(country.production.stammarPerSecond)} stammar/s
              </span>
              <span className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
                +{formatNumber(country.production.kapitalPerSecond)} kapital/s
              </span>
              <span className="text-xs text-danger bg-danger/10 px-1.5 py-0.5 rounded">
                -{formatNumber(country.maintenanceCost.kapitalPerSecond)} kapital/s underhåll
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

          {!status && (
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

          {status === 'controlled' && (
            <span className="text-xs text-accent-green glow-text-orange">Aktiv produktion</span>
          )}

          {status === 'invading' && (
            <span className="text-xs text-accent">Motstånd: {resistance.toFixed(0)}%</span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

// ── Pressure Slider ──

function PressureSlider({ label, value, isWeak, onChange }: {
  label: string
  value: number
  isWeak: boolean
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs w-16 ${isWeak ? 'text-accent font-bold' : 'text-text-secondary'}`}>
        {label}{isWeak ? ' ★' : ''}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 accent-accent"
      />
      <span className="text-xs text-text-muted font-numbers w-8 text-right">{value}</span>
    </div>
  )
}

// ── Space Expansion Panel (EXPANSION era, phases 10-12) ──

function SpaceExpansionPanel() {
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

// ── Cost Badge ──

function CostBadge({ label, cost, current }: { label: string; cost: number; current: number }) {
  const enough = current >= cost
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-numbers
      ${enough ? 'text-accent bg-accent/10' : 'text-danger bg-danger/10'}`}>
      {label}: {formatNumber(cost)}
    </span>
  )
}
