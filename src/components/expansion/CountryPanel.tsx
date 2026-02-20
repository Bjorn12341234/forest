import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { COUNTRIES, type CountryDef, getCountryMaintenanceMultiplier } from '../../data/countries'
import type { CountryState } from '../../store/types'
import { formatNumber } from '../../engine/format'
import { GlassCard } from '../ui/GlassCard'
import { playPurchase } from '../../engine/audio'
import { WorldMapSVG, VIEW_LABELS } from './MapBackgrounds'
import { CostBadge } from './CostBadge'

// ── Status colors for country dots ──

function getCountryDotColor(status: string | undefined): string {
  switch (status) {
    case 'controlled': return 'bg-accent-green glow-orange'
    case 'invading': return 'bg-accent animate-pulse-glow'
    case 'rebelling': return 'bg-danger'
    default: return 'bg-text-muted/40'
  }
}

// ── Country Invasion Panel (INTERNATIONELL era) ──

export function CountryPanel() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const countries = useGameStore(s => s.countries)
  const invadeCountry = useGameStore(s => s.invadeCountry)
  const allocatePressure = useGameStore(s => s.allocatePressure)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [autoAllocate, setAutoAllocate] = useState(false)

  // Auto-allocate: distribute pressure with 2x on weakness vector
  const applyAutoAllocate = useCallback((countryId: string) => {
    const def = COUNTRIES.find(c => c.id === countryId)
    if (!def) return
    // Weakness vectors get double weight, equal base of 25
    const base = 25
    const weakKapital = def.defenseType === 'economic' ? base * 2 : base
    const weakLobby = def.defenseType === 'environmental' ? base * 2 : base
    const weakStammar = def.defenseType === 'political' ? base * 2 : base
    allocatePressure(countryId, 'kapital', weakKapital)
    allocatePressure(countryId, 'lobby', weakLobby)
    allocatePressure(countryId, 'stammar', weakStammar)
  }, [allocatePressure])

  // Apply auto-allocate to all invading countries when toggled on
  useEffect(() => {
    if (!autoAllocate) return
    for (const [id, cs] of Object.entries(countries)) {
      if (cs.status === 'invading') {
        applyAutoAllocate(id)
      }
    }
  }, [autoAllocate, countries, applyAutoAllocate])

  // Manual allocation turns off auto mode
  const handleManualAllocate = useCallback((countryId: string, vector: 'kapital' | 'lobby' | 'stammar', amount: number) => {
    setAutoAllocate(false)
    allocatePressure(countryId, vector, amount)
  }, [allocatePressure])

  const visibleCountries = useMemo(() => {
    return COUNTRIES.filter(c => c.unlockPhase <= phase)
  }, [phase])

  const controlledCount = useMemo(() => {
    return Object.values(countries).filter(cs => cs.status === 'controlled').length
  }, [countries])
  const maintenanceMult = getCountryMaintenanceMultiplier(controlledCount)

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
    if (autoAllocate) {
      // Small delay to let store update, then auto-allocate
      setTimeout(() => applyAutoAllocate(id), 50)
    }
  }

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
        <div className="flex items-center gap-3">
          {invadingCount > 0 && (
            <button
              onClick={() => setAutoAllocate(!autoAllocate)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium border transition-all cursor-pointer
                ${autoAllocate
                  ? 'bg-accent/20 border-accent/40 text-accent'
                  : 'bg-bg-tertiary border-bg-tertiary text-text-muted hover:text-text-secondary hover:border-text-muted/30'
                }`}
            >
              {autoAllocate ? '⚡ Auto-tryck PÅ' : '⚡ Auto-tryck'}
            </button>
          )}
          <span className="text-xs text-text-muted uppercase tracking-widest">
            {VIEW_LABELS.countries}
          </span>
        </div>
      </div>

      {/* World Map + Country Dots */}
      <GlassCard padding="sm" className="relative overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56%' }}>
          <div className="absolute inset-0 pointer-events-none">
            <WorldMapSVG />
          </div>

          {/* Phase 6 hint — no countries yet */}
          {visibleCountries.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-sm text-text-muted text-center px-8">
                Länderna låses upp i nästa fas. Fortsätt producera stammar.
              </p>
            </div>
          )}

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
                    width: isControlled ? 28 : isInvading ? 26 : 24,
                    height: isControlled ? 28 : isInvading ? 26 : 24,
                    x: '-50%',
                    y: '-50%',
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
              maintenanceMult={maintenanceMult}
              onInvade={() => handleInvade(selected.id)}
              onAllocate={(vector, amount) => handleManualAllocate(selected.id, vector, amount)}
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

function CountryDetailPanel({ country, countryState, affordable, stammar, kapital, lobby, maintenanceMult, onInvade, onAllocate, onClose }: {
  country: CountryDef
  countryState: CountryState | undefined
  affordable: boolean
  stammar: number
  kapital: number
  lobby: number
  maintenanceMult: number
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

          {/* Unique reward (always visible) */}
          {country.uniqueReward && (
            <div className="mt-2">
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                status === 'controlled'
                  ? 'bg-accent-green/15 text-accent-green font-medium'
                  : 'bg-bg-tertiary text-text-secondary'
              }`}>
                {status === 'controlled' ? '✓ ' : '★ '}{country.uniqueReward.label}: {country.uniqueReward.description}
              </span>
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
                -{formatNumber(country.maintenanceCost.kapitalPerSecond * maintenanceMult)} kapital/s underhåll{maintenanceMult > 1 ? ` (×${maintenanceMult.toFixed(1)})` : ''}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Stäng landdetaljer"
            className="text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
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
