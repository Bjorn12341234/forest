import { useGameStore } from '../../store/gameStore'
import { formatNumber } from '../../engine/format'
import { getOwnerPhase, getOwnerPhaseProgress } from '../../engine/phases'
import { OwnerClickArea } from './OwnerClickArea'
import { OwnerGenerators } from './OwnerGenerators'
import { AnimatedNumber } from '../ui/AnimatedNumber'

export function OwnerDashboard() {
  const skogsvardering = useGameStore(s => s.skogsvardering)
  const inkomst = useGameStore(s => s.inkomst)
  const kunskap = useGameStore(s => s.kunskap)
  const resiliens = useGameStore(s => s.resiliens)
  const biodivOwner = useGameStore(s => s.biodivOwner)
  const realCarbonPos = useGameStore(s => s.realCarbonPos)
  const legacy = useGameStore(s => s.legacy)
  const deadwood = useGameStore(s => s.deadwood)
  const totalSV = useGameStore(s => s.totalSkogsvardering)

  const phaseInfo = getOwnerPhase(totalSV)
  const phaseProgress = getOwnerPhaseProgress(totalSV)

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Owner Phase Indicator */}
      <div className="owner-card p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-owner-accent tracking-wide">
            🌿 Fas {phaseInfo.phase}: {phaseInfo.name}
          </span>
          {phaseProgress.next !== null && (
            <span className="text-[0.65rem] text-owner-text/70 font-numbers">
              {formatNumber(totalSV)} / {formatNumber(phaseProgress.next)}
            </span>
          )}
        </div>
        <div className="w-full h-2 bg-owner-text/8 rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm transition-all duration-700"
            style={{
              width: `${phaseProgress.progress * 100}%`,
              background: 'linear-gradient(90deg, #5E9E6E, #6BAF7B)',
            }}
          />
        </div>
      </div>

      {/* Top Resource Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <OwnerResourceCard label="Skogsvärde" value={skogsvardering} icon="🌲" />
        <OwnerResourceCard label="Inkomst" value={inkomst} format={n => `${formatNumber(n)} tkr`} icon="💰" />
        <OwnerResourceCard label="Skogskunskap" value={kunskap} icon="📚" />
        <OwnerResourceCard
          label="Resiliens"
          value={resiliens}
          icon="🛡️"
          className={resiliens > 50 ? 'text-owner-accent' : resiliens > 20 ? 'text-[#B8860B]' : 'text-[#CC2222]'}
        />
      </div>

      {/* Secondary Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <OwnerMeterCard label="Biologisk mångfald" value={biodivOwner} unit="arter" icon="🦌" />
        <OwnerMeterCard label="Kolinlagring" value={realCarbonPos} unit="ton" icon="🍃" />
        <OwnerMeterCard label="Generationsarv" value={legacy} icon="🏡" />
        <OwnerMeterCard label="Död ved" value={deadwood} unit="m³" icon="🪵" />
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <OwnerClickArea />
        </div>
        <div className="flex flex-col gap-4">
          <OwnerGenerators />
        </div>
      </div>
    </div>
  )
}

function OwnerResourceCard({ label, value, format, className = '', icon }: {
  label: string
  value: number
  format?: (n: number) => string
  className?: string
  icon?: string
}) {
  return (
    <div className="owner-card p-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-owner-text/80 text-xs uppercase tracking-wider flex items-center gap-1">
          {icon && <span className="text-xs">{icon}</span>}
          {label}
        </span>
        <AnimatedNumber
          value={value}
          className={`text-lg text-owner-text ${className}`}
          format={format}
        />
      </div>
    </div>
  )
}

function OwnerMeterCard({ label, value, unit, icon }: {
  label: string
  value: number
  unit?: string
  icon?: string
}) {
  return (
    <div className="owner-card-subtle p-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-owner-text/75 text-[0.65rem] uppercase tracking-wider flex items-center gap-1">
          {icon && <span className="text-[0.6rem]">{icon}</span>}
          {label}
        </span>
        <span className="text-sm font-numbers text-owner-accent font-medium">
          {formatNumber(value)}{unit ? ` ${unit}` : ''}
        </span>
      </div>
    </div>
  )
}
