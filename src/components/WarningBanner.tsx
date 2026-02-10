import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { WarningLevel } from '../engine/warnings'

const WARNING_CONFIG: Record<Exclude<WarningLevel, 0>, {
  label: string
  penalty: string
  hint: string
  color: string
  animation: string
  icon: string
}> = {
  1: {
    label: 'Varning: Sjunkande anseende',
    penalty: '−20% produktion',
    hint: 'Köp PR-kampanjer i Lobby-fliken för att höja Grön Image™.',
    color: 'bg-amber-800/80 border-amber-600/50 text-amber-200',
    animation: '',
    icon: '⚡',
  },
  2: {
    label: '⚠️ KRIS: Allmänheten protesterar',
    penalty: '−50% produktion',
    hint: 'Grön Image™ är kritiskt låg! Köp PR-kampanjer i Lobby-fliken.',
    color: 'bg-orange-900/90 border-orange-500 text-orange-100',
    animation: 'animate-warning-pulse',
    icon: '⚠️',
  },
  3: {
    label: '🚨 NÖDLÄGE: Bojkott & skandal',
    penalty: '−75% produktion',
    hint: 'All produktion nästan stoppad. Köp PR-kampanjer i Lobby-fliken NU!',
    color: 'bg-red-950 border-red-600 text-red-100',
    animation: 'animate-warning-blink',
    icon: '🚨',
  },
}

export function WarningBanner() {
  const warningLevel = useGameStore(s => s.warningLevel)

  if (warningLevel === 0) return null
  const config = WARNING_CONFIG[warningLevel as Exclude<WarningLevel, 0>]

  return (
    <AnimatePresence>
      <motion.div
        key={warningLevel}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`rounded-md border-2 px-3 py-2 ${config.color} ${config.animation}`}>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-base">{config.label}</span>
            <span className="ml-auto font-numbers text-sm font-bold">
              {config.penalty}
            </span>
          </div>
          <p className="text-sm mt-1 font-medium">
            {config.hint}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
