import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const MILESTONES = [25, 50, 75]

interface Props {
  targetId: string
}

export function MegaprojectMechanic({ targetId }: Props) {
  const ts = useGameStore(s => s.expansionTargets[targetId])

  if (!ts?.megaproject) return null
  const mp = ts.megaproject

  // ETA calculation: ~240s total at constant rate
  const progressRate = (1 / 240) * 100 // %/s
  const remaining = 100 - mp.progress
  const etaSeconds = progressRate > 0 ? remaining / progressRate : Infinity

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-text-muted">Megaprojekt</span>

      {/* Progress bar with milestones */}
      <div className="relative w-full h-5 bg-bg-tertiary rounded-sm overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-sm"
          initial={{ width: 0 }}
          animate={{ width: `${mp.progress}%` }}
          transition={{ duration: 0.5 }}
        />
        {/* Milestone markers */}
        {MILESTONES.map((m, i) => (
          <div
            key={m}
            className="absolute top-0 h-full w-px bg-text-muted/30"
            style={{ left: `${m}%` }}
          >
            <span className={`absolute -top-0.5 -translate-x-1/2 text-xs font-numbers
              ${mp.bonusesClaimed > i ? 'text-accent' : 'text-text-muted/50'}`}>
              {mp.bonusesClaimed > i ? '★' : '·'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-numbers text-accent">{mp.progress.toFixed(1)}%</span>
        <span className="text-xs text-text-muted font-numbers">
          {etaSeconds < Infinity ? `~${formatETA(etaSeconds)} kvar` : ''}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">Bidrag:</span>
        <span className="text-xs font-numbers text-accent">
          +{progressRate.toFixed(2)}%/s
        </span>
      </div>

      {/* Milestone bonuses display */}
      <div className="flex gap-2">
        {MILESTONES.map((m, i) => (
          <div key={m} className={`flex-1 text-center text-xs rounded-sm py-1
            ${mp.bonusesClaimed > i
              ? 'bg-accent/10 text-accent'
              : 'bg-bg-tertiary text-text-muted/50'}`}>
            {m}% {mp.bonusesClaimed > i ? '✓' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

function formatETA(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}m ${s}s`
  }
  return `${Math.floor(seconds)}s`
}
