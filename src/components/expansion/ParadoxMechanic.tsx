import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const WAVE_INFO = [
  { label: 'Våg 1: Produktionskollaps', penalty: 'Produktion ×0.5', color: 'text-yellow-400' },
  { label: 'Våg 2: Underhållsexplosion', penalty: 'Underhåll ×2', color: 'text-orange-400' },
  { label: 'Våg 3: Total Paradox', penalty: 'Produktion ×0.25 + Underhåll ×1.5', color: 'text-red-400' },
]

interface Props {
  targetId: string
}

export function ParadoxMechanic({ targetId }: Props) {
  const ts = useGameStore(s => s.expansionTargets[targetId])

  if (!ts?.paradox) return null
  const px = ts.paradox

  return (
    <div className={`flex flex-col gap-2 ${px.currentWave < 3 ? 'border border-red-500/30 rounded-sm p-2' : ''}`}>
      <span className="text-xs uppercase tracking-widest text-text-muted">Paradoxvågor</span>

      {/* Wave indicators */}
      <div className="flex gap-1">
        {WAVE_INFO.map((_w, i) => {
          const completed = px.currentWave > i
          const active = px.currentWave === i
          return (
            <div
              key={i}
              className={`flex-1 text-center text-xs py-1.5 rounded-sm transition-all
                ${completed ? 'bg-accent/15 text-accent' :
                  active ? 'bg-red-500/15 text-red-400 font-medium' :
                  'bg-bg-tertiary text-text-muted/40'}`}
            >
              {completed ? '✓' : i + 1}
            </div>
          )
        })}
      </div>

      {/* Active wave info */}
      {px.currentWave < 3 && (
        <>
          <div className={`text-xs font-medium ${WAVE_INFO[px.currentWave].color}`}>
            {WAVE_INFO[px.currentWave].label}
          </div>
          <p className="text-xs text-red-400/80">
            Straff: {WAVE_INFO[px.currentWave].penalty}
          </p>

          {/* Wave progress bar */}
          <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
            <motion.div
              className="h-full rounded-sm bg-red-500"
              animate={{
                width: `${px.waveProgress * 100}%`,
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                width: { duration: 0.3 },
                opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          </div>
          <span className="text-xs font-numbers text-text-muted">
            {(px.waveProgress * 100).toFixed(0)}% — håll ut...
          </span>
        </>
      )}
    </div>
  )
}
