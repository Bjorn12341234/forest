import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export function WelcomeToast() {
  const gameMode = useGameStore(s => s.gameMode)
  const totalStammar = useGameStore(s => s.totalStammar)
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const tutorialSeen = useGameStore(s => s.achievements['tutorial_seen'])
  const [visible, setVisible] = useState(false)

  const isNewGame = gameMode === 'industry' ? totalStammar === 0 : totalSV === 0

  useEffect(() => {
    if (!gameMode || tutorialSeen || !isNewGame) return
    // Show after a short delay
    const showTimer = setTimeout(() => setVisible(true), 800)
    // Auto-dismiss after 7s
    const hideTimer = setTimeout(() => {
      setVisible(false)
      useGameStore.setState(s => ({
        achievements: { ...s.achievements, tutorial_seen: true },
      }))
    }, 7800)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [gameMode, tutorialSeen, isNewGame])

  if (!gameMode || tutorialSeen || !isNewGame) return null

  const message = gameMode === 'industry'
    ? 'Klicka på knappen för att skriva skogsbruksplaner. Ju fler planer, desto fler stammar.'
    : 'Klicka på skogen för att vårda den. Skogsvärderingen stiger med tiden.'

  const isOwner = gameMode === 'owner'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-14 left-1/2 z-50 -translate-x-1/2 px-4 py-2.5 rounded-lg max-w-sm text-center text-sm"
          style={{
            background: isOwner
              ? 'rgba(13, 26, 13, 0.9)'
              : 'rgba(30, 30, 30, 0.9)',
            border: isOwner
              ? '1px solid rgba(94, 158, 110, 0.3)'
              : '1px solid rgba(212, 115, 12, 0.3)',
            color: isOwner ? '#E0D5BF' : '#E0E0E0',
            backdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
