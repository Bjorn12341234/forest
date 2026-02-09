import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { OWNER_ACTIONS, type OwnerActionData } from '../data/ownerActions'
import { formatNumber } from '../engine/format'
import { GlassCard } from './ui/GlassCard'
import { playPurchase } from '../engine/audio'

const TRUST_ZONES = [
  { min: 0, max: 20, color: '#CC2222', label: 'Uppror' },
  { min: 20, max: 40, color: '#E8A832', label: 'Skeptiska' },
  { min: 40, max: 60, color: '#7DB840', label: 'Optimalt' },
  { min: 60, max: 80, color: '#E8A832', label: 'For nojda' },
  { min: 80, max: 100, color: '#CC2222', label: 'Behaller virket' },
]

function getTrustStatus(trust: number): { color: string; label: string } {
  for (const zone of TRUST_ZONES) {
    if (trust >= zone.min && trust < zone.max) return zone
  }
  return TRUST_ZONES[TRUST_ZONES.length - 1]
}

export function OwnerMeter() {
  const ownerTrust = useGameStore(s => s.ownerTrust)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const ownerActionCooldowns = useGameStore(s => s.ownerActionCooldowns)
  const performOwnerAction = useGameStore(s => s.performOwnerAction)

  const status = getTrustStatus(ownerTrust)

  return (
    <GlassCard padding="sm">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Skogsägarförtroende</span>
          <span className="text-sm font-numbers" style={{ color: status.color }}>
            {Math.round(ownerTrust)} — {status.label}
          </span>
        </div>

        {/* Trust Bar */}
        <div className="relative w-full h-4 rounded-sm overflow-hidden bg-bg-tertiary">
          {/* Zone backgrounds */}
          <div className="absolute inset-0 flex">
            <div className="w-[20%] bg-danger/15" />
            <div className="w-[20%] bg-accent/10" />
            <div className="w-[20%] bg-accent-green/20 border-x border-accent-green/30" />
            <div className="w-[20%] bg-accent/10" />
            <div className="w-[20%] bg-danger/15" />
          </div>

          {/* Sweet spot label */}
          <div className="absolute top-0 left-[40%] w-[20%] h-full flex items-center justify-center">
            <span className="text-[0.6rem] text-accent-green/70 font-medium uppercase tracking-wider">Sweet spot</span>
          </div>

          {/* Trust indicator */}
          <div
            className="absolute top-0 h-full w-1 rounded-full transition-all duration-300"
            style={{
              left: `${Math.min(99, Math.max(1, ownerTrust))}%`,
              background: status.color,
              boxShadow: `0 0 6px ${status.color}88`,
            }}
          />
        </div>

        {/* Owner Actions */}
        <div className="flex flex-col gap-1.5 mt-1">
          <span className="text-xs text-text-muted uppercase tracking-wider">Manipulationsåtgärder</span>
          {OWNER_ACTIONS.map(action => (
            <OwnerActionRow
              key={action.id}
              data={action}
              kapital={kapital}
              lobby={lobby}
              cooldownUntil={ownerActionCooldowns[action.id] ?? 0}
              onPerform={() => {
                performOwnerAction(action.id)
                playPurchase()
              }}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

function OwnerActionRow({ data, kapital, lobby, cooldownUntil, onPerform }: {
  data: OwnerActionData
  kapital: number
  lobby: number
  cooldownUntil: number
  onPerform: () => void
}) {
  const [now, setNow] = useState(Date.now())

  // Update every second if on cooldown
  useEffect(() => {
    if (cooldownUntil <= Date.now()) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [cooldownUntil])

  const onCooldown = now < cooldownUntil
  const cooldownRemaining = onCooldown ? Math.ceil((cooldownUntil - now) / 1000) : 0

  const resource = data.costResource === 'kapital' ? kapital : lobby
  const canAfford = data.cost === 0 || resource >= data.cost
  const canUse = canAfford && !onCooldown

  const trustChangeText = data.trustChange > 0
    ? `+${data.trustChange}`
    : `${data.trustChange}`
  const trustColor = data.trustChange > 0 ? 'text-accent-green' : 'text-danger'

  const handleClick = useCallback(() => {
    if (canUse) onPerform()
  }, [canUse, onPerform])

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-sm border transition-all duration-150 cursor-pointer select-none
        ${canUse ? 'border-accent/20 hover:border-accent/40 bg-bg-secondary' : 'border-bg-tertiary bg-bg-secondary/50 opacity-50'}`}
      onClick={handleClick}
    >
      <span className="text-base flex-shrink-0">{data.icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-text-primary block">{data.name}</span>
        <p className="text-xs text-text-muted leading-relaxed">{data.description}</p>
        {data.sideEffects.length > 0 && (
          <div className="flex gap-1 mt-0.5">
            {data.sideEffects.map((eff, i) => (
              <span key={i} className="text-xs text-text-secondary">{eff.description}</span>
            ))}
          </div>
        )}
      </div>
      <div className="text-right flex-shrink-0 flex flex-col items-end gap-0.5">
        <span className={`text-xs font-numbers ${trustColor}`}>{trustChangeText} förtroende</span>
        {onCooldown ? (
          <span className="text-xs text-text-muted font-numbers">{cooldownRemaining}s</span>
        ) : data.cost > 0 ? (
          <span className={`text-xs font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
            {formatNumber(data.cost)} {data.costResource === 'kapital' ? 'Mkr' : 'PK'}
          </span>
        ) : (
          <span className="text-xs text-text-muted">Gratis</span>
        )}
      </div>
    </div>
  )
}
