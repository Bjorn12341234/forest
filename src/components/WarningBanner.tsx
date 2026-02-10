import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { WarningLevel } from '../engine/warnings'

const WARNING_CONFIG: Record<Exclude<WarningLevel, 0>, { label: string; penalty: string; hint: string; color: string }> = {
  1: {
    label: 'Varning: Sjunkande anseende',
    penalty: '−20% produktion',
    hint: 'Köp PR-kampanjer i Lobby-fliken för att höja Grön Image™.',
    color: 'bg-amber-800/80 border-amber-600/50 text-amber-200',
  },
  2: {
    label: 'Kris: Allmänheten protesterar',
    penalty: '−50% produktion',
    hint: 'Grön Image™ är kritiskt låg! Köp PR-kampanjer i Lobby-fliken.',
    color: 'bg-orange-900/80 border-orange-600/50 text-orange-200',
  },
  3: {
    label: 'Nödläge: Bojkott & skandal',
    penalty: '−75% produktion',
    hint: 'All produktion nästan stoppad. Köp PR-kampanjer NU!',
    color: 'bg-red-950/80 border-red-700/50 text-red-200',
  },
}

export function WarningBanner() {
  const warningLevel = useGameStore(s => s.warningLevel)

  return (
    <AnimatePresence>
      {warningLevel > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`rounded-md border px-3 py-2 ${WARNING_CONFIG[warningLevel as Exclude<WarningLevel, 0>].color}`}>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>{warningLevel >= 3 ? '🚨' : warningLevel >= 2 ? '⚠️' : '⚡'}</span>
              <span>{WARNING_CONFIG[warningLevel as Exclude<WarningLevel, 0>].label}</span>
              <span className="ml-auto font-numbers text-xs opacity-80">
                {WARNING_CONFIG[warningLevel as Exclude<WarningLevel, 0>].penalty}
              </span>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {WARNING_CONFIG[warningLevel as Exclude<WarningLevel, 0>].hint}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
