import React from 'react'
import { useGameStore } from '../../store/gameStore'
import { formatNumber } from '../../engine/format'
import { getOwnerPhase, getOwnerPhaseProgress } from '../../engine/phases'
import { OwnerClickArea } from './OwnerClickArea'
import { OwnerGenerators } from './OwnerGenerators'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { OWNER_GENERATORS, computeOwnerMaintenancePS } from '../../data/ownerGenerators'
import { computeKnowledgeModifiers } from '../../data/ownerKnowledgeTree'

const gridColsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
}

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
  const ownerGenerators = useGameStore(s => s.ownerGenerators)
  const ownerKnowledgeUpgrades = useGameStore(s => s.ownerKnowledgeUpgrades)

  const phaseInfo = getOwnerPhase(totalSV)
  const phaseProgress = getOwnerPhaseProgress(totalSV)

  // Compute inkomst rates for display
  const knowledgeMods = computeKnowledgeModifiers(ownerKnowledgeUpgrades)
  let generatorInkomst = 0
  for (const [id, gen] of Object.entries(ownerGenerators)) {
    if (gen.count > 0) {
      const data = OWNER_GENERATORS.find(g => g.id === id)
      if (data) generatorInkomst += gen.count * data.inkomstPerSecond
    }
  }
  const grossInkomstPS = generatorInkomst * (1 + knowledgeMods.inkomstMult)
  const maintenancePS = computeOwnerMaintenancePS(ownerGenerators)
  const netInkomstPS = grossInkomstPS - maintenancePS

  // Primary resource cards — only show when relevant
  const primaryCards: React.ReactElement[] = [
    <OwnerResourceCard key="sv" label="Skogsvärde" value={skogsvardering} icon="🌲" />,
  ]
  if (inkomst > 0 || grossInkomstPS > 0)
    primaryCards.push(
      <OwnerResourceCard
        key="ink"
        label="Inkomst"
        value={inkomst}
        format={n => `${formatNumber(n)} tkr`}
        icon="💰"
        rateLabel={grossInkomstPS > 0 ? (
          maintenancePS > 0
            ? `${netInkomstPS >= 0 ? '+' : ''}${netInkomstPS.toFixed(1)}/s (skötsel −${maintenancePS.toFixed(1)})`
            : `+${grossInkomstPS.toFixed(1)}/s`
        ) : undefined}
        rateNegative={netInkomstPS < 0}
      />
    )
  if (kunskap > 0)
    primaryCards.push(<OwnerResourceCard key="kun" label="Skogskunskap" value={kunskap} icon="📚" />)
  if (resiliens !== 100)
    primaryCards.push(
      <OwnerResourceCard
        key="res"
        label="Resiliens"
        value={resiliens}
        icon="🛡️"
        className={resiliens > 50 ? 'text-owner-accent' : resiliens > 20 ? 'text-[#B8860B]' : 'text-[#CC2222]'}
      />
    )

  // Secondary meters — only show row when at least one > 0
  const secondaryCards: React.ReactElement[] = []
  if (biodivOwner > 0)
    secondaryCards.push(<OwnerMeterCard key="bio" label="Biologisk mångfald" value={biodivOwner} unit="arter" icon="🦌" />)
  if (realCarbonPos > 0)
    secondaryCards.push(<OwnerMeterCard key="col" label="Kolinlagring" value={realCarbonPos} unit="ton" icon="🍃" />)
  if (legacy > 0)
    secondaryCards.push(<OwnerMeterCard key="leg" label="Generationsarv" value={legacy} icon="🏡" />)
  if (deadwood > 0)
    secondaryCards.push(<OwnerMeterCard key="dod" label="Död ved" value={deadwood} unit="m³" icon="🪵" />)

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      {/* Owner Phase Indicator — hidden until 1000 SV */}
      {totalSV >= 1000 && (
        <div
          className="owner-card p-2.5"
          style={phaseProgress.progress > 0.85 && phaseProgress.next !== null ? {
            boxShadow: '0 0 12px rgba(94, 158, 110, 0.3)',
            borderColor: 'rgba(94, 158, 110, 0.4)',
          } : undefined}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-bold text-owner-accent tracking-wide">
              🌿 Fas {phaseInfo.phase}: {phaseInfo.name}
            </span>
            {phaseProgress.next !== null && (
              <span className="text-xs text-owner-text/70 font-numbers">
                {formatNumber(totalSV)} / {formatNumber(phaseProgress.next)}
              </span>
            )}
          </div>
          {phaseProgress.next !== null && (
            <div className="w-full h-2.5 bg-owner-text/8 rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm transition-all duration-700"
                style={{
                  width: `${phaseProgress.progress * 100}%`,
                  background: phaseProgress.progress > 0.85
                    ? 'linear-gradient(90deg, #5E9E6E, #C4A44E)'
                    : 'linear-gradient(90deg, #5E9E6E, #6BAF7B)',
                }}
              />
            </div>
          )}
          {phaseProgress.next === null && (
            <span className="text-xs text-owner-accent/70 italic">Maxfas uppnådd</span>
          )}
        </div>
      )}

      {/* Top Resource Bar — dynamic columns */}
      <div className={`grid ${gridColsClass[primaryCards.length] ?? 'grid-cols-2 sm:grid-cols-4'} gap-2`}>
        {primaryCards}
      </div>

      {/* Secondary Meters — only when at least one is active */}
      {secondaryCards.length > 0 && (
        <div className={`grid ${gridColsClass[secondaryCards.length] ?? 'grid-cols-2 sm:grid-cols-4'} gap-2`}>
          {secondaryCards}
        </div>
      )}

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

function OwnerResourceCard({ label, value, format, className = '', icon, rateLabel, rateNegative }: {
  label: string
  value: number
  format?: (n: number) => string
  className?: string
  icon?: string
  rateLabel?: string
  rateNegative?: boolean
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
        {rateLabel && (
          <span className={`text-[0.6rem] font-numbers ${rateNegative ? 'text-[#CC2222]/80' : 'text-owner-accent/70'}`}>
            {rateLabel}
          </span>
        )}
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
