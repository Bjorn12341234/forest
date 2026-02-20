import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

interface Props {
  targetId: string
}

export function RiftMechanic({ targetId }: Props) {
  const ts = useGameStore(s => s.expansionTargets[targetId])
  const setSacrificePercent = useGameStore(s => s.setSacrificePercent)

  if (!ts?.rift) return null
  const rf = ts.rift

  // ETA: progress = sacrifice * 0.5 per second
  const progressRate = rf.sacrificePercent * 0.5
  const remaining = 100 - rf.progress
  const etaSeconds = progressRate > 0 ? remaining / progressRate : Infinity

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-text-muted">Dimensionsreva</span>

      {/* Progress bar */}
      <div className="w-full h-3 bg-bg-tertiary rounded-sm overflow-hidden">
        <motion.div
          className="h-full rounded-sm"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #c084fc)' }}
          initial={{ width: 0 }}
          animate={{ width: `${rf.progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-numbers text-purple-400">{rf.progress.toFixed(1)}%</span>
        <span className="text-xs text-text-muted font-numbers">
          {etaSeconds < Infinity && etaSeconds < 99999 ? `~${formatETA(etaSeconds)} kvar` : 'Ställ in offring'}
        </span>
      </div>

      {/* Sacrifice slider */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Offring</span>
          <span className="text-xs font-numbers text-red-400">{rf.sacrificePercent}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={50}
          value={rf.sacrificePercent}
          onChange={(e) => setSacrificePercent(targetId, Number(e.target.value))}
          className="w-full h-1.5 accent-purple-400"
        />
        <p className="text-xs text-text-muted italic">
          Offrar {rf.sacrificePercent}% av detta måls produktionskapacitet permanent.
          {rf.sacrificePercent > 0 && ` Framsteg: +${(rf.sacrificePercent * 0.5).toFixed(1)}%/s`}
        </p>
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
