import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { formatNumber } from '../engine/format'
import { ClickArea } from './ClickArea'
import { Generators } from './Generators'
import { GlassCard } from './ui/GlassCard'
import { AnimatedNumber } from './ui/AnimatedNumber'
import { WarningBanner } from './WarningBanner'

import { PHASE_NAMES } from '../engine/phases'

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

  const [mobileExpanded, setMobileExpanded] = useState(false)

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
