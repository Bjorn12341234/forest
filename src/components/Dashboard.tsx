import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { formatNumber } from '../engine/format'
import { ClickArea } from './ClickArea'
import { Generators } from './Generators'
import { GlassCard } from './ui/GlassCard'
import { AnimatedNumber } from './ui/AnimatedNumber'
import { WarningBanner } from './WarningBanner'

import { PHASE_NAMES } from '../engine/phases'

// ── Entropy purchases data (industry path, phase 10+) ──
const ENTROPY_PURCHASES = [
  { id: 'entropy_slow_1', name: 'Byråkratisk Fördröjning', description: 'Lobby saktar ned entropins framfart. −40% ökning.', resource: 'lobby' as const, cost: 50_000 },
  { id: 'entropy_slow_2', name: 'Tidskristallisering', description: 'Kapital investerat i temporal stabilisering. −40% ökning.', resource: 'kapital' as const, cost: 500_000_000_000 },
  { id: 'entropy_slow_3', name: 'Entropikommitténs Utredning', description: 'En utredning tar alltid tid. −40% ökning.', resource: 'lobby' as const, cost: 200_000 },
]

const PHASE_THRESHOLDS: Record<number, number> = {
  1: 10_000,
  2: 100_000,
  3: 1_000_000,
  4: 10_000_000,
  5: 100_000_000,
  6: 1_000_000_000,
  7: 10_000_000_000,
  8: 100_000_000_000,
  9: 1_000_000_000_000,
  10: 10_000_000_000_000,
  11: 100_000_000_000_000,
  12: Infinity,
}

export function Dashboard() {
  const phase = useGameStore(s => s.phase)
  const stammar = useGameStore(s => s.stammar)
  const totalStammar = useGameStore(s => s.totalStammar)
  const kapital = useGameStore(s => s.kapital)
  const image = useGameStore(s => s.image)
  const lobby = useGameStore(s => s.lobby)
  const species = useGameStore(s => s.species)
  const biodiversity = useGameStore(s => s.biodiversity)
  const gameSpeed = useGameStore(s => s.gameSpeed)
  const setGameSpeed = useGameStore(s => s.setGameSpeed)
  const activeEvent = useGameStore(s => s.activeEvent)
  const pendingTransition = useGameStore(s => s.pendingTransition)
  const entropi = useGameStore(s => s.entropi)
  const entropyPurchases = useGameStore(s => s.entropyPurchases)
  const buyEntropyPurchase = useGameStore(s => s.buyEntropyPurchase)
  const [mobileExpanded, setMobileExpanded] = useState(false)

  // Auto-disable fast-forward during events/transitions
  useEffect(() => {
    if ((activeEvent || pendingTransition) && gameSpeed > 1) {
      setGameSpeed(1)
    }
  }, [activeEvent, pendingTransition, gameSpeed, setGameSpeed])

  const toggleFastForward = useCallback(() => {
    setGameSpeed(gameSpeed > 1 ? 1 : 5)
  }, [gameSpeed, setGameSpeed])

  const expansionTargets = useGameStore(s => s.expansionTargets)

  // Calculate entropy creep rate and ETA (phase 10+)
  const hasInProgressTarget = Object.values(expansionTargets).some(t => t.status === 'in_progress')
  const entropyCreepRate = phase >= 10
    ? (() => {
        const baseCreep = 0.5
        const inProgressMult = hasInProgressTarget ? 0.3 : 1
        const purchaseCount = Object.values(entropyPurchases).filter(Boolean).length
        return baseCreep * inProgressMult * Math.pow(0.6, purchaseCount)
      })()
    : 0
  const entropyETA = entropyCreepRate > 0 && entropi < 100
    ? Math.ceil((100 - entropi) / entropyCreepRate)
    : Infinity

  const phaseName = PHASE_NAMES[phase] ?? `Fas ${phase}`
  const nextThreshold = PHASE_THRESHOLDS[phase] ?? Infinity
  const progress = nextThreshold === Infinity ? 1 : Math.min(1, totalStammar / nextThreshold)

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Mobile Compact Resource Bar (visible on small screens) */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full cursor-pointer"
        >
          <GlassCard padding="sm">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-wrap min-w-0">
                <span className="text-xs font-numbers text-text-primary whitespace-nowrap">
                  🪵 {formatNumber(stammar)}
                </span>
                <span className="text-xs font-numbers text-text-primary whitespace-nowrap">
                  💰 {formatNumber(kapital)}
                </span>
                <span className="text-xs font-numbers text-accent-green whitespace-nowrap">
                  🌿 {Math.round(image)}
                </span>
                {phase >= 2 && (
                  <span className="text-xs font-numbers text-text-primary whitespace-nowrap">
                    🏛️ {formatNumber(lobby)}
                  </span>
                )}
                {phase >= 3 && species > 0 && (
                  <span className="text-xs font-numbers text-danger whitespace-nowrap">
                    🦉 −{species}
                  </span>
                )}
              </div>
              <span className="text-xs text-text-muted flex-shrink-0">
                {mobileExpanded ? '▲' : '▼'}
              </span>
            </div>
          </GlassCard>
        </button>
        {mobileExpanded && (
          <div className={`grid gap-2 mt-2 ${phase >= 3 ? 'grid-cols-2' : 'grid-cols-2'}`}>
            <ResourceCard label="Stammar" value={stammar} format={formatNumber} />
            <ResourceCard label="Kapital" value={kapital} format={n => `${formatNumber(n)} Mkr`} />
            <ResourceCard label="Grön Image™" value={image} className="text-accent-green" />
            {phase >= 2 && (
              <ResourceCard label="Politiskt Kapital" value={lobby} />
            )}
            {phase >= 3 && (
              <SpeciesCard species={species} biodiversity={biodiversity} />
            )}
          </div>
        )}
      </div>

      {/* Desktop Resource Bar (hidden on small screens) */}
      <div className={`hidden sm:grid gap-2 ${phase >= 3 ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
        <ResourceCard label="Stammar" value={stammar} format={formatNumber} />
        <ResourceCard label="Kapital" value={kapital} format={n => `${formatNumber(n)} Mkr`} />
        <ResourceCard label="Grön Image™" value={image} className="text-accent-green" />
        {phase >= 2 && (
          <ResourceCard label="Politiskt Kapital" value={lobby} />
        )}
        {phase >= 3 && (
          <SpeciesCard species={species} biodiversity={biodiversity} />
        )}
      </div>

      {/* Warning Banner */}
      <WarningBanner />

      {/* Phase Progress */}
      <GlassCard padding="sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-text-primary">
            Fas {phase}: {phaseName}
          </span>
          {nextThreshold !== Infinity && (
            <span className="text-xs text-text-muted font-numbers">
              {formatNumber(totalStammar)} / {formatNumber(nextThreshold)}
            </span>
          )}
        </div>
        <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
          <div
            className={`h-full bg-accent transition-all duration-300 ease-out ${progress > 0.85 ? 'animate-pulse-glow' : ''}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </GlassCard>

      {/* Fast-Forward Button (phase 7+) */}
      {phase >= 7 && (
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFastForward}
            disabled={!!activeEvent || !!pendingTransition}
            className={`px-4 py-2 rounded-sm text-sm font-medium tracking-wider cursor-pointer border transition-all min-h-[44px]
              ${gameSpeed > 1
                ? 'bg-accent/20 border-accent text-accent'
                : 'glass-card border-text-muted/20 text-text-muted hover:text-text-primary'
              }
              ${(activeEvent || pendingTransition) ? 'opacity-40 cursor-not-allowed' : ''}`}
            aria-label={gameSpeed > 1 ? 'Stäng av tidsskift' : 'Aktivera tidsskift (5× hastighet)'}
          >
            ⏩ Tidsskift {gameSpeed > 1 ? `(${gameSpeed}×)` : ''}
          </button>
          {gameSpeed > 1 && (
            <span className="text-xs text-accent animate-pulse">Snabbspolar...</span>
          )}
        </div>
      )}

      {/* Entropy Display (phase 10+) */}
      {phase >= 10 && (
        <GlassCard padding="sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">
                Entropi: {entropi.toFixed(1)}%
              </span>
              <span className="text-xs text-text-muted font-numbers">
                +{entropyCreepRate.toFixed(3)}/s
                {entropyETA < Infinity && ` — full om ~${formatTime(entropyETA)}`}
              </span>
            </div>
            <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
              <div
                className="h-full bg-danger/80 transition-all duration-300"
                style={{ width: `${entropi}%` }}
              />
            </div>
            {/* Entropy-slowing purchases */}
            <div className="flex flex-col gap-1 mt-1">
              {ENTROPY_PURCHASES.map(ep => {
                const bought = entropyPurchases[ep.id]
                const resourceVal = ep.resource === 'lobby' ? lobby : kapital
                const canAfford = !bought && resourceVal >= ep.cost
                return (
                  <button
                    key={ep.id}
                    onClick={() => canAfford && buyEntropyPurchase(ep.id)}
                    disabled={bought || !canAfford}
                    className={`text-left px-3 py-2 rounded-sm text-xs border cursor-pointer transition-all min-h-[44px]
                      ${bought
                        ? 'border-success/30 bg-success/5 text-success'
                        : canAfford
                          ? 'border-accent/30 hover:border-accent text-text-secondary'
                          : 'border-text-muted/10 text-text-muted/50 cursor-not-allowed'
                      }`}
                  >
                    <span className="font-medium">{ep.name}</span>
                    {bought ? ' ✓' : ` — ${formatNumber(ep.cost)} ${ep.resource === 'lobby' ? 'PK' : 'Mkr'}`}
                    <br />
                    <span className="text-text-muted">{ep.description}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel: Click Area */}
        <div className="flex flex-col gap-4">
          <ClickArea />
        </div>

        {/* Right Panel: Generators */}
        <div className="flex flex-col gap-4">
          <Generators />
        </div>
      </div>
    </div>
  )
}

interface ResourceCardProps {
  label: string
  value: number
  format?: (n: number) => string
  className?: string
}

function ResourceCard({ label, value, format, className = '' }: ResourceCardProps) {
  return (
    <GlassCard padding="sm">
      <div className="flex flex-col gap-0.5" role="status" aria-live="polite" aria-label={label}>
        <span className="text-text-muted text-xs uppercase tracking-wider">
          {label}
        </span>
        <AnimatedNumber
          value={value}
          className={`text-lg text-text-primary ${className}`}
          format={format}
        />
      </div>
    </GlassCard>
  )
}

function formatTime(seconds: number): string {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return `${h}h ${m}m`
  }
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}m ${s}s`
}

function SpeciesCard({ species, biodiversity }: { species: number; biodiversity: number }) {
  const [pulse, setPulse] = useState(false)
  const prevSpecies = useRef(species)

  useEffect(() => {
    if (species > prevSpecies.current) {
      setPulse(true)
      const timer = setTimeout(() => setPulse(false), 1000)
      prevSpecies.current = species
      return () => clearTimeout(timer)
    }
    prevSpecies.current = species
  }, [species])

  // Biodiversity remaining as rough species estimate (100% = ~250 000, sweden baseline)
  const remaining = Math.max(0, Math.round((biodiversity / 100) * 250))

  return (
    <GlassCard padding="sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-text-muted text-xs uppercase tracking-wider">
          Arter
        </span>
        <span className={`text-lg font-numbers transition-colors duration-300
          ${pulse ? 'text-danger' : species > 10 ? 'text-danger' : species > 0 ? 'text-yellow-400' : 'text-text-primary'}`}>
          {remaining > 0 ? `~${formatNumber(remaining * 1000)}` : '???'}
          {species > 0 && (
            <span className={`text-xs ml-1 ${pulse ? 'animate-pulse text-danger' : 'text-danger/70'}`}>
              −{species}
            </span>
          )}
        </span>
      </div>
    </GlassCard>
  )
}
