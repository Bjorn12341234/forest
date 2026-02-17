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
      <div className="bg-white/50 border border-owner-accent/15 rounded-sm p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-owner-accent">
            Fas {phaseInfo.phase}: {phaseInfo.name}
          </span>
          {phaseProgress.next !== null && (
            <span className="text-[0.65rem] text-owner-text/40 font-numbers">
              {formatNumber(totalSV)} / {formatNumber(phaseProgress.next)}
            </span>
          )}
        </div>
        <div className="w-full h-1.5 bg-owner-text/10 rounded-sm overflow-hidden">
          <div
            className="h-full bg-owner-accent/50 transition-all duration-700"
            style={{ width: `${phaseProgress.progress * 100}%` }}
          />
        </div>
      </div>

      {/* Top Resource Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <OwnerResourceCard label="Skogsvärde" value={skogsvardering} />
        <OwnerResourceCard label="Inkomst" value={inkomst} format={n => `${formatNumber(n)} tkr`} />
        <OwnerResourceCard label="Skogskunskap" value={kunskap} />
        <OwnerResourceCard
          label="Resiliens"
          value={resiliens}
          className={resiliens > 50 ? 'text-owner-accent' : resiliens > 20 ? 'text-[#B8860B]' : 'text-[#CC2222]'}
        />
      </div>

      {/* Secondary Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <OwnerMeterCard label="Biologisk mångfald" value={biodivOwner} unit="arter" />
        <OwnerMeterCard label="Kolinlagring" value={realCarbonPos} unit="ton" />
        <OwnerMeterCard label="Generationsarv" value={legacy} />
        <OwnerMeterCard label="Död ved" value={deadwood} unit="m³" />
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

function OwnerResourceCard({ label, value, format, className = '' }: {
  label: string
  value: number
  format?: (n: number) => string
  className?: string
}) {
  return (
    <div className="bg-white/60 border border-owner-accent/20 rounded-sm p-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-owner-text/60 text-xs uppercase tracking-wider">
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

function OwnerMeterCard({ label, value, unit }: {
  label: string
  value: number
  unit?: string
}) {
  return (
    <div className="bg-white/40 border border-owner-accent/10 rounded-sm p-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-owner-text/40 text-[0.65rem] uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm font-numbers text-owner-accent">
          {formatNumber(value)}{unit ? ` ${unit}` : ''}
        </span>
      </div>
    </div>
  )
}
