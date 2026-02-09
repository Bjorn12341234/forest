import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { ACHIEVEMENTS, TIER_LABELS, TIER_COLORS } from '../data/achievements'
import type { AchievementTier } from '../data/achievements'
import { GlassCard } from './ui/GlassCard'

interface AchievementPanelProps {
  onClose: () => void
}

type ViewMode = 'all' | AchievementTier

const TIER_ORDER: AchievementTier[] = ['lokal', 'regional', 'nationell', 'internationell', 'endgame', 'meta']

export function AchievementPanel({ onClose }: AchievementPanelProps) {
  const achievements = useGameStore(s => s.achievements)
  const phase = useGameStore(s => s.phase)
  const [viewMode, setViewMode] = useState<ViewMode>('all')

  const visible = ACHIEVEMENTS.filter(a => a.phase <= phase)
  const unlocked = visible.filter(a => achievements[a.id])

  const filtered = viewMode === 'all'
    ? visible
    : visible.filter(a => a.tier === viewMode)

  // Only show tier tabs that have visible achievements
  const visibleTiers = TIER_ORDER.filter(tier =>
    visible.some(a => a.tier === tier)
  )

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
            <h2 className="text-lg font-medium text-text-primary">Prestationer</h2>
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

          {/* Tier tabs */}
          <div className="flex gap-1 mb-3 overflow-x-auto flex-shrink-0 pb-1">
            <TierTab
              label="Alla"
              isActive={viewMode === 'all'}
              color="#D4730C"
              count={unlocked.length}
              total={visible.length}
              onClick={() => setViewMode('all')}
            />
            {visibleTiers.map(tier => {
              const tierAchievements = visible.filter(a => a.tier === tier)
              const tierUnlocked = tierAchievements.filter(a => achievements[a.id]).length
              return (
                <TierTab
                  key={tier}
                  label={TIER_LABELS[tier]}
                  isActive={viewMode === tier}
                  color={TIER_COLORS[tier]}
                  count={tierUnlocked}
                  total={tierAchievements.length}
                  onClick={() => setViewMode(tier)}
                />
              )
            })}
          </div>

          {/* Achievement list */}
          <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
            {filtered.map(a => {
              const isUnlocked = achievements[a.id]
              const tierColor = TIER_COLORS[a.tier]

              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 p-3 rounded-sm transition-all ${
                    isUnlocked
                      ? 'bg-bg-secondary'
                      : 'bg-bg-secondary/50 opacity-50'
                  }`}
                  style={isUnlocked ? {
                    border: `1px solid ${tierColor}30`,
                    boxShadow: `0 0 8px ${tierColor}10`,
                  } : {
                    border: '1px solid var(--color-bg-tertiary)',
                  }}
                >
                  <span className={`text-xl flex-shrink-0 ${isUnlocked ? '' : 'grayscale'}`}>
                    {isUnlocked ? a.icon : '\ud83d\udd12'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-sm font-medium ${isUnlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                        {isUnlocked ? a.name : '???'}
                      </p>
                      <span
                        className="text-[0.5rem] uppercase tracking-wider px-1 py-0.5 rounded"
                        style={{
                          color: tierColor,
                          background: `${tierColor}15`,
                          border: `1px solid ${tierColor}25`,
                        }}
                      >
                        {TIER_LABELS[a.tier].split(': ')[1] ?? a.tier}
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-text-muted line-clamp-1">
                      {isUnlocked ? a.description : 'Fortsatt spela for att lasa upp'}
                    </p>
                  </div>
                  {isUnlocked && (
                    <span className="text-[0.55rem] uppercase tracking-wider font-medium flex-shrink-0" style={{ color: tierColor }}>
                      Klar
                    </span>
                  )}
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="text-center text-text-muted text-sm py-8">
                Inga prestationer i denna kategori annu.
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

function TierTab({ label, isActive, color, count, total, onClick }: {
  label: string
  isActive: boolean
  color: string
  count: number
  total: number
  onClick: () => void
}) {
  const allDone = total > 0 && count === total
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-sm text-[0.6rem] font-medium whitespace-nowrap
        border cursor-pointer transition-all ${
        isActive
          ? 'bg-bg-secondary text-text-primary'
          : 'bg-transparent text-text-muted hover:text-text-secondary'
      }`}
      style={isActive ? {
        borderColor: `${color}40`,
        boxShadow: `0 0 8px ${color}15`,
      } : {
        borderColor: 'var(--color-bg-tertiary)',
      }}
    >
      {label}
      <span className="ml-1 font-numbers opacity-60">
        {count}/{total}
      </span>
      {allDone && <span className="ml-0.5">&#10003;</span>}
    </button>
  )
}
