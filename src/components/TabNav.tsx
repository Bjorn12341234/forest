import { motion } from 'framer-motion'
import { isDonator } from '../engine/donation'

export type Tab = 'dashboard' | 'research' | 'lobby' | 'expansion'

interface TabDef {
  id: Tab
  label: string
  icon: string
  phase: number
}

const TABS: TabDef[] = [
  { id: 'dashboard', label: 'Översikt', icon: '📊', phase: 1 },
  { id: 'research', label: 'Teknik', icon: '🔬', phase: 1 },
  { id: 'lobby', label: 'Makt', icon: '🏛️', phase: 2 },
  { id: 'expansion', label: 'Expansion', icon: '🌍', phase: 6 },
]

interface TabNavProps {
  activeTab: Tab
  currentPhase: number
  onTabChange: (tab: Tab) => void
  onShowDonation?: () => void
}

export function TabNav({ activeTab, currentPhase, onTabChange, onShowDonation }: TabNavProps) {
  const maxVisiblePhase = currentPhase + 1
  const visibleTabs = TABS.filter(t => t.phase <= maxVisiblePhase)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-none border-t border-x-0 border-b-0 border-white/[0.08]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="tablist"
      aria-label="Huvudnavigering"
    >
      <div className="relative flex justify-around items-center h-16 max-w-lg mx-auto">
        {visibleTabs.map(tab => {
          const isActive = activeTab === tab.id
          const isLocked = tab.phase > currentPhase

          return (
            <button
              key={tab.id}
              onClick={() => !isLocked && onTabChange(tab.id)}
              disabled={isLocked}
              role="tab"
              aria-selected={isActive}
              aria-label={isLocked ? `${tab.label} (låst)` : tab.label}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-3 min-w-[44px] min-h-[44px] transition-all duration-200 bg-transparent border-none
                ${isLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`text-xl ${isLocked ? 'grayscale' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-xs font-medium tracking-wide uppercase ${
                isActive ? 'text-accent' : isLocked ? 'text-text-muted' : 'text-text-secondary'
              }`}>
                {isLocked ? '???' : tab.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-px left-2 right-2 h-0.5 bg-accent rounded-full"
                  style={{ boxShadow: '0 0 8px rgba(212, 115, 12, 0.5)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Lock icon for locked tabs */}
              {isLocked && (
                <span className="absolute -top-1 -right-1 text-[0.5rem]">{'🔒'}</span>
              )}
            </button>
          )
        })}

        {/* Support button in nav bar */}
        {onShowDonation && (
          <button
            onClick={onShowDonation}
            className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 px-2 py-1.5 bg-transparent border-none cursor-pointer transition-colors group"
            aria-label="Stöd Naturhänsyn"
            title="Stöd Naturhänsyn"
          >
            <span className="text-sm">🌿</span>
            <span className="text-[0.45rem] tracking-wider text-text-secondary/50 group-hover:text-text-secondary/80 transition-colors whitespace-nowrap" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
              {isDonator() ? 'Naturvän' : 'Stöd'}
            </span>
          </button>
        )}
      </div>
    </nav>
  )
}
