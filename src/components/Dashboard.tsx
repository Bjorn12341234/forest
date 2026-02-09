import { useGameStore } from '../store/gameStore'
import { formatNumber } from '../engine/format'
import { ClickArea } from './ClickArea'
import { Generators } from './Generators'
import { GlassCard } from './ui/GlassCard'
import { AnimatedNumber } from './ui/AnimatedNumber'

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

  const phaseName = PHASE_NAMES[phase] ?? `Fas ${phase}`
  const nextThreshold = PHASE_THRESHOLDS[phase] ?? Infinity
  const progress = nextThreshold === Infinity ? 1 : Math.min(1, totalStammar / nextThreshold)

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Top Resource Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <ResourceCard label="Stammar" value={stammar} format={formatNumber} />
        <ResourceCard label="Kapital" value={kapital} format={n => `${formatNumber(n)} Mkr`} />
        <ResourceCard label="Grön Image™" value={image} className="text-accent-green" />
        {phase >= 2 && (
          <ResourceCard label="Politiskt Kapital" value={lobby} />
        )}
      </div>

      {/* Phase Progress */}
      <GlassCard padding="sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-text-primary">
            Fas {phase}: {phaseName}
          </span>
          {nextThreshold !== Infinity && (
            <span className="text-[0.6rem] text-text-muted font-numbers">
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
      <div className="flex flex-col gap-0.5">
        <span className="text-text-muted text-[0.6rem] uppercase tracking-wider">
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
