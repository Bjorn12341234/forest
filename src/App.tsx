import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { ALL_EVENTS } from './store/gameStore'
import { getEra } from './engine/phases'
import { useGameLoop } from './hooks/useGameLoop'
import { useAutoSave } from './hooks/useAutoSave'
import { useOfflineCalc } from './hooks/useOfflineCalc'
import type { OfflineResult } from './hooks/useOfflineCalc'
import { useAchievements } from './hooks/useAchievements'
import { useAudioSync } from './hooks/useAudioSync'
import { Dashboard } from './components/Dashboard'
import { ResearchTree } from './components/ResearchTree'
import { LobbyPanel } from './components/LobbyPanel'
import { PhaseTransition } from './components/PhaseTransition'
import { AchievementToastManager, useAchievementToasts } from './components/AchievementToast'
import { AchievementPanel } from './components/AchievementPanel'
import { Ticker } from './components/Ticker'
import { EventModal } from './components/EventModal'
import { OfflineReturnModal } from './components/OfflineReturnModal'
import { SettingsPanel, useThemeSync } from './components/SettingsPanel'
import { TabNav, type Tab } from './components/TabNav'
import { EndScreen } from './components/EndScreen'
import { ExpansionPanel } from './components/ExpansionPanel'
import { CharacterSelect } from './components/CharacterSelect'
import { OwnerDashboard } from './components/owner/OwnerDashboard'
import { KnowledgePanel } from './components/owner/KnowledgePanel'
import { IndustryAttackModal } from './components/owner/IndustryAttackModal'
import { IndustryLureModal } from './components/owner/IndustryLureModal'
import { OwnerTicker } from './components/owner/OwnerTicker'
import { OwnerEndScreen } from './components/owner/OwnerEndScreen'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [offlineReport, setOfflineReport] = useState<OfflineResult | null>(null)
  const [showEndScreen, setShowEndScreen] = useState(false)
  const gameMode = useGameStore(state => state.gameMode)
  const currentPhase = useGameStore(state => state.phase)
  const endgameSeen = useGameStore(state => state.achievements['endgame_seen'])
  const pendingTransition = useGameStore(state => state.pendingTransition)
  const completePhaseTransition = useGameStore(state => state.completePhaseTransition)
  const load = useGameStore(state => state.load)
  const reset = useGameStore(state => state.reset)

  // Achievement toasts
  const { toasts, showToast, dismissToast } = useAchievementToasts()
  useAchievements(showToast)

  // Load save on mount
  useEffect(() => {
    load()
  }, [load])

  // Trigger endscreen at phase 9→10 transition (entering EXPANSION)
  useEffect(() => {
    if (currentPhase >= 10 && !endgameSeen && !showEndScreen) {
      setShowEndScreen(true)
    }
  }, [currentPhase, endgameSeen, showEndScreen])

  // Offline report callback
  const handleOfflineReport = useCallback((report: OfflineResult) => {
    setOfflineReport(report)
    if (report.offlineEvents.length > 0) {
      useGameStore.setState({ eventQueue: report.offlineEvents })
    }
  }, [])

  const handleDismissOffline = useCallback(() => {
    setOfflineReport(null)
    const state = useGameStore.getState()
    if (state.eventQueue.length > 0 && !state.activeEvent) {
      const [next, ...rest] = state.eventQueue
      useGameStore.setState({ activeEvent: next, eventQueue: rest })
    }
  }, [])

  // Stable event pool reference
  const eventPool = useMemo(() => ALL_EVENTS, [])

  // Start engine hooks
  useGameLoop()
  useAutoSave()
  useOfflineCalc(eventPool, handleOfflineReport)
  useAudioSync()
  useThemeSync()

  // Show character select if no game mode chosen
  if (gameMode === null) {
    return <CharacterSelect />
  }

  // Owner (Skogsägare) mode
  if (gameMode === 'owner') {
    return (
      <OwnerApp
        activeTab={activeTab}
        onTabChange={setActiveTab}
        toasts={toasts}
        onDismissToast={dismissToast}
        onReset={() => {
          reset()
          useGameStore.setState({ gameMode: null })
        }}
        showSettings={showSettings}
        onShowSettings={() => setShowSettings(true)}
        onHideSettings={() => setShowSettings(false)}
        showAchievements={showAchievements}
        onShowAchievements={() => setShowAchievements(true)}
        onHideAchievements={() => setShowAchievements(false)}
      />
    )
  }

  return (
    <div className="flex flex-col min-h-dvh bg-bg-primary" data-era={getEra(currentPhase)}>
      {/* News Ticker */}
      <Ticker />

      {/* Achievement Toasts */}
      <AchievementToastManager toasts={toasts} onDismiss={dismissToast} />

      {/* Event Modal */}
      <EventModal />

      {/* Offline Return Modal */}
      <OfflineReturnModal report={offlineReport} onDismiss={handleDismissOffline} />

      {/* Endgame Screen (Milestone at phase 10 — entering EXPANSION) */}
      {showEndScreen && (
        <EndScreen
          onContinue={() => {
            setShowEndScreen(false)
            useGameStore.getState().save()
          }}
          onReset={() => {
            setShowEndScreen(false)
            reset()
          }}
        />
      )}

      {/* Phase Transition Overlay */}
      {pendingTransition && (
        <PhaseTransition
          from={pendingTransition.from}
          to={pendingTransition.to}
          onComplete={completePhaseTransition}
        />
      )}

      {/* Achievement Panel */}
      <AnimatePresence>
        {showAchievements && (
          <AchievementPanel onClose={() => setShowAchievements(false)} />
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'research' && <ResearchTree />}
            {activeTab === 'lobby' && <LobbyPanel />}
            {activeTab === 'expansion' && <ExpansionPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Top-right action buttons */}
      <div className="fixed top-12 right-2 z-40 flex flex-col gap-1.5">
        <button
          onClick={() => setShowSettings(true)}
          className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-lg cursor-pointer border-none active:scale-95 transition-transform"
          title="Installningar"
        >
          &#9881;
        </button>
        <button
          onClick={() => setShowAchievements(true)}
          className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-lg cursor-pointer border-none active:scale-95 transition-transform"
          title="Prestationer"
        >
          &#127942;
        </button>
      </div>

      {/* Bottom Tab Navigation */}
      <TabNav
        activeTab={activeTab}
        currentPhase={currentPhase}
        onTabChange={setActiveTab}
      />
    </div>
  )
}

// ── Owner (Skogsägare) App Shell ──

type OwnerTab = 'dashboard' | 'knowledge'

function OwnerApp({ activeTab, onTabChange, toasts, onDismissToast, onReset, showSettings, onShowSettings, onHideSettings, showAchievements, onShowAchievements, onHideAchievements }: {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  toasts: ReturnType<typeof useAchievementToasts>['toasts']
  onDismissToast: (id: number) => void
  onReset: () => void
  showSettings: boolean
  onShowSettings: () => void
  onHideSettings: () => void
  showAchievements: boolean
  onShowAchievements: () => void
  onHideAchievements: () => void
}) {
  const ownerTab = (activeTab === 'lobby' ? 'knowledge' : 'dashboard') as OwnerTab
  const [showOwnerEnd, setShowOwnerEnd] = useState(false)
  const legacy = useGameStore(s => s.legacy)
  const ownerEndSeen = useGameStore(s => s.achievements['owner_endgame_seen'])

  // Trigger owner endscreen at legacy >= 500
  useEffect(() => {
    if (legacy >= 500 && !ownerEndSeen && !showOwnerEnd) {
      setShowOwnerEnd(true)
    }
  }, [legacy, ownerEndSeen, showOwnerEnd])

  if (showOwnerEnd) {
    return (
      <OwnerEndScreen
        onContinue={() => {
          setShowOwnerEnd(false)
          useGameStore.getState().save()
        }}
        onReset={() => {
          setShowOwnerEnd(false)
          onReset()
        }}
      />
    )
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#F5F0E8]" data-mode="owner">
      {/* Owner News Ticker */}
      <OwnerTicker />

      {/* Achievement Toasts */}
      <AchievementToastManager toasts={toasts} onDismiss={onDismissToast} />

      {/* Event Modal (owner events) */}
      <EventModal />

      {/* Industry Attack Modal */}
      <IndustryAttackModal />

      {/* Industry Lure Modal */}
      <IndustryLureModal />

      {/* Achievement Panel */}
      <AnimatePresence>
        {showAchievements && (
          <AchievementPanel onClose={onHideAchievements} />
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel onClose={onHideSettings} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={ownerTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {ownerTab === 'dashboard' && <OwnerDashboard />}
            {ownerTab === 'knowledge' && <KnowledgePanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Top-right action buttons */}
      <div className="fixed top-12 right-2 z-40 flex flex-col gap-1.5">
        <button
          onClick={onShowSettings}
          className="w-11 h-11 rounded-full bg-white/60 border border-[#2D6A4F]/20 flex items-center justify-center text-lg cursor-pointer active:scale-95 transition-transform"
          title="Inställningar"
        >
          &#9881;
        </button>
        <button
          onClick={onShowAchievements}
          className="w-11 h-11 rounded-full bg-white/60 border border-[#2D6A4F]/20 flex items-center justify-center text-lg cursor-pointer active:scale-95 transition-transform"
          title="Prestationer"
        >
          &#127942;
        </button>
        <button
          onClick={onReset}
          className="w-11 h-11 rounded-full bg-white/60 border border-[#2D6A4F]/20 flex items-center justify-center text-xs cursor-pointer active:scale-95 transition-transform text-[#3D2B1F]/40"
          title="Tillbaka till start"
        >
          &#8634;
        </button>
      </div>

      {/* Bottom Tab Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 border-t border-[#2D6A4F]/10 backdrop-blur-sm"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <OwnerTabButton
            active={ownerTab === 'dashboard'}
            label="Översikt"
            icon={'🌲'}
            onClick={() => onTabChange('dashboard')}
          />
          <OwnerTabButton
            active={ownerTab === 'knowledge'}
            label="Kunskap"
            icon={'📖'}
            onClick={() => onTabChange('lobby')}
          />
        </div>
      </nav>
    </div>
  )
}

function OwnerTabButton({ active, label, icon, onClick }: {
  active: boolean
  label: string
  icon: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-0.5 px-3 py-2 bg-transparent border-none cursor-pointer"
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-xs font-medium tracking-wide uppercase ${
        active ? 'text-[#2D6A4F]' : 'text-[#3D2B1F]/40'
      }`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="owner-tab-indicator"
          className="absolute -top-px left-2 right-2 h-0.5 bg-[#2D6A4F] rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

export default App
