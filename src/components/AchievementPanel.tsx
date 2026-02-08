import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { ACHIEVEMENTS } from '../data/achievements'
import type { AchievementCategory } from '../data/achievements'
import { GlassCard } from './ui/GlassCard'

interface AchievementPanelProps {
  onClose: () => void
}

type ViewMode = 'all' | 1 | 2 | 3 | 4 | 5 | 'meta'

const CATEGORY_COLORS: Record<AchievementCategory, string> = {
  milestone: '#88CC44',
  strategy: '#4488CC',
  irony: '#FFD700',
  meta: '#CC44FF',
}

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  milestone: 'Milestone',
  strategy: 'Strategy',
  irony: 'Irony',
  meta: 'Meta',
}

export function AchievementPanel({ onClose }: AchievementPanelProps) {
  const achievements = useGameStore(s => s.achievements)
  const phase = useGameStore(s => s.phase)
  const [viewMode, setViewMode] = useState<ViewMode>('all')

  const visible = ACHIEVEMENTS.filter(a => a.phase <= phase)
  const unlocked = visible.filter(a => achievements[a.id])

  // Filter by view mode
  const filtered = viewMode === 'all'
    ? visible
    : viewMode === 'meta'
      ? visible.filter(a => a.category === 'meta')
      : visible.filter(a => a.phase === viewMode && a.category !== 'meta')

  // Available phase tabs
  const phaseTabs: ViewMode[] = ['all']
  for (let p = 1; p <= phase; p++) {
    phaseTabs.push(p as ViewMode)
  }
  phaseTabs.push('meta')

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-md max-h-[85vh] flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <GlassCard padding="lg" className="flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h2 className="text-lg font-medium text-text-primary">Achievements</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-numbers text-text-secondary">
                {unlocked.length}/{visible.length}
              </span>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors text-lg bg-transparent border-none cursor-pointer"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Phase tabs */}
          <div className="flex gap-1 mb-3 overflow-x-auto flex-shrink-0 pb-1">
            {phaseTabs.map(tab => {
              const isActive = viewMode === tab
              const tabAchievements = tab === 'all'
                ? visible
                : tab === 'meta'
                  ? visible.filter(a => a.category === 'meta')
                  : visible.filter(a => a.phase === tab && a.category !== 'meta')
              const tabUnlocked = tabAchievements.filter(a => achievements[a.id]).length
              const tabTotal = tabAchievements.length
              const allDone = tabTotal > 0 && tabUnlocked === tabTotal

              return (
                <button
                  key={String(tab)}
                  onClick={() => setViewMode(tab)}
                  className={`px-2.5 py-1.5 rounded-md text-[0.65rem] font-medium whitespace-nowrap
                    border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-white/10 border-orange-accent/30 text-text-primary'
                      : 'bg-transparent border-white/5 text-text-muted hover:text-text-secondary hover:border-white/10'
                  }`}
                >
                  {tab === 'all' ? 'All' : tab === 'meta' ? 'Meta' : `P${tab}`}
                  <span className="ml-1 font-numbers opacity-60">
                    {tabUnlocked}/{tabTotal}
                  </span>
                  {allDone && <span className="ml-0.5">&#10003;</span>}
                </button>
              )
            })}
          </div>

          {/* Achievement list */}
          <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
            {filtered.map(a => {
              const isUnlocked = achievements[a.id]
              const cat = a.category ?? 'milestone'
              const catColor = CATEGORY_COLORS[cat]

              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isUnlocked
                      ? 'bg-white/[0.04]'
                      : 'bg-white/[0.02] opacity-50'
                  }`}
                  style={isUnlocked ? {
                    border: '1px solid rgba(255, 215, 0, 0.15)',
                  } : {
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <span className={`text-xl flex-shrink-0 ${isUnlocked ? '' : 'grayscale'}`}>
                    {isUnlocked ? a.icon : '🔒'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                        {isUnlocked ? a.name : '???'}
                      </p>
                      <span
                        className="text-[0.5rem] uppercase tracking-wider px-1 py-0.5 rounded"
                        style={{
                          color: catColor,
                          background: `${catColor}15`,
                          border: `1px solid ${catColor}25`,
                        }}
                      >
                        {CATEGORY_LABELS[cat]}
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-text-muted line-clamp-1">
                      {isUnlocked ? a.description : 'Keep playing to unlock'}
                    </p>
                  </div>
                  {isUnlocked && (
                    <span className="text-[0.55rem] uppercase tracking-wider text-nobel-gold font-medium flex-shrink-0">
                      Done
                    </span>
                  )}
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="text-center text-text-muted text-sm py-8">
                No achievements in this category yet.
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
