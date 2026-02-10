import { useGameStore } from '../../store/gameStore'
import { formatNumber } from '../../engine/format'
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

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
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
