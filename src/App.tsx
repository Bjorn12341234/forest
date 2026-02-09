import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { ALL_EVENTS } from './store/gameStore'
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

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [offlineReport, setOfflineReport] = useState<OfflineResult | null>(null)
  const [showEndScreen, setShowEndScreen] = useState(false)
  const currentPhase = useGameStore(state => state.phase)
  const totalStammar = useGameStore(state => state.totalStammar)
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

  // Trigger endscreen at 10B stammar (phase 7 endgame)
  useEffect(() => {
    if (currentPhase >= 7 && totalStammar >= 10_000_000_000 && !endgameSeen && !showEndScreen) {
      setShowEndScreen(true)
    }
  }, [currentPhase, totalStammar, endgameSeen, showEndScreen])

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

  return (
    <div className="flex flex-col min-h-dvh bg-bg-primary">
      {/* News Ticker */}
      <Ticker />

      {/* Achievement Toasts */}
      <AchievementToastManager toasts={toasts} onDismiss={dismissToast} />

      {/* Event Modal */}
      <EventModal />

      {/* Offline Return Modal */}
      <OfflineReturnModal report={offlineReport} onDismiss={handleDismissOffline} />

      {/* Endgame Screen */}
      {showEndScreen && (
        <EndScreen onReset={() => {
          setShowEndScreen(false)
          reset()
        }} />
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

export default App
