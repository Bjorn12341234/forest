import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { playGoldenAppear, playGoldenClick } from '../engine/audio'

/**
 * Gyllene Tillfället — random golden clickable appearing every 45-90s of active play.
 * Click = 30s of 3× production multiplier (5× in phase 7+).
 * Only appears when tab is focused.
 * Owner variant: "Skogens Gåva" — green/gold.
 */
export function GoldenOpportunity() {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const gameMode = useGameStore(s => s.gameMode)
  const phase = useGameStore(s => s.phase)
  const activeEvent = useGameStore(s => s.activeEvent)
  const activeAttack = useGameStore(s => s.activeIndustryAttack)
  const activeLure = useGameStore(s => s.activeIndustryLure)
  const pendingTransition = useGameStore(s => s.pendingTransition)
  const activateGoldenMultiplier = useGameStore(s => s.activateGoldenMultiplier)
  const goldenMultiplierUntil = useGameStore(s => s.goldenMultiplierUntil)

  const isOwner = gameMode === 'owner'
  const hasModal = activeEvent || activeAttack || activeLure || pendingTransition
  const multiplier = (isOwner || phase < 7) ? 3 : 5

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    // Phase 7+: less frequent (60-120s), else 45-90s
    const minDelay = phase >= 7 ? 60_000 : 45_000
    const maxDelay = phase >= 7 ? 120_000 : 90_000
    const delay = minDelay + Math.random() * (maxDelay - minDelay)

    timerRef.current = setTimeout(() => {
      // Only appear if tab is focused and no modal is active
      if (document.hasFocus() && !hasModal) {
        // Random position (avoid edges)
        setPosition({
          x: 15 + Math.random() * 70,
          y: 20 + Math.random() * 50,
        })
        setVisible(true)
        playGoldenAppear()

        // Disappear after 8-10s if not clicked
        const hideDuration = 8000 + Math.random() * 2000
        hideTimerRef.current = setTimeout(() => {
          setVisible(false)
          scheduleNext()
        }, hideDuration)
      } else {
        // Try again in 10s
        timerRef.current = setTimeout(() => scheduleNext(), 10_000)
      }
    }, delay)
  }, [phase, hasModal])

  useEffect(() => {
    if (!gameMode) return
    // Don't schedule if golden multiplier already active
    if (goldenMultiplierUntil > Date.now()) return

    scheduleNext()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [gameMode, scheduleNext, goldenMultiplierUntil])

  const handleClick = useCallback(() => {
    setVisible(false)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    playGoldenClick()

    // Activate 30s production multiplier
    activateGoldenMultiplier(30_000, multiplier)

    // Schedule next after current bonus expires
    setTimeout(() => scheduleNext(), 35_000)
  }, [activateGoldenMultiplier, multiplier, scheduleNext])

  // Also apply the bonus to owner path: add kapital/sv bonus on click
  const handleOwnerClick = useCallback(() => {
    setVisible(false)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    playGoldenClick()

    // Grant immediate bonus + multiplier
    const state = useGameStore.getState()
    const svBonus = state.skogsvarderingPerSecond * 10
    const kunskapBonus = 15
    useGameStore.setState({
      skogsvardering: state.skogsvardering + svBonus,
      totalSkogsvardering: state.totalSkogsvardering + svBonus,
      kunskap: state.kunskap + kunskapBonus,
    })
    activateGoldenMultiplier(30_000, multiplier)
    setTimeout(() => scheduleNext(), 35_000)
  }, [activateGoldenMultiplier, multiplier, scheduleNext])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.button
        className="fixed z-[80] cursor-pointer border-none bg-transparent p-0"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0.7, 1],
          scale: [0, 1.2, 1, 1.05, 1],
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.6 }}
        onClick={isOwner ? handleOwnerClick : handleClick}
        aria-label={isOwner ? 'Skogens Gåva — klicka för bonus' : 'Gyllene Tillfället — klicka för bonus'}
      >
        <motion.div
          className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: isOwner
              ? 'radial-gradient(circle, rgba(var(--color-owner-accent-rgb), 0.9), rgba(180, 160, 60, 0.7))'
              : 'radial-gradient(circle, rgba(255, 215, 0, 0.9), rgba(212, 115, 12, 0.7))',
            boxShadow: isOwner
              ? '0 0 30px rgba(var(--color-owner-accent-rgb), 0.6), 0 0 60px rgba(180, 160, 60, 0.3)'
              : '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(212, 115, 12, 0.3)',
          }}
        >
          <span className="text-2xl md:text-3xl" role="img" aria-hidden>
            {isOwner ? '🌳' : '🌟'}
          </span>
        </motion.div>
        {/* Label below */}
        <motion.p
          className="text-[0.6rem] text-center mt-1 font-bold tracking-wider whitespace-nowrap"
          style={{ color: isOwner ? 'var(--color-owner-accent)' : '#FFD700' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isOwner ? 'SKOGENS GÅVA' : 'GYLLENE TILLFÄLLET'}
        </motion.p>
      </motion.button>
    </AnimatePresence>
  )
}

/** Small indicator showing when golden multiplier is active */
export function GoldenMultiplierIndicator() {
  const goldenUntil = useGameStore(s => s.goldenMultiplierUntil)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    if (goldenUntil <= Date.now()) {
      setRemaining(0)
      return
    }
    const interval = setInterval(() => {
      const left = Math.max(0, Math.ceil((goldenUntil - Date.now()) / 1000))
      setRemaining(left)
    }, 250)
    return () => clearInterval(interval)
  }, [goldenUntil])

  if (remaining <= 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed top-14 left-2 z-[70] rounded-lg px-3 py-1.5 text-xs font-bold tracking-wider"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(212, 115, 12, 0.8))',
        color: '#000',
        boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
      }}
    >
      ⚡ BONUS ×{useGameStore.getState().phase >= 7 ? 5 : 3} — {remaining}s
    </motion.div>
  )
}
