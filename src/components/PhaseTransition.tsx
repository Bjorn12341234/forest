import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Phase } from '../store/types'
import { getTransitionScript, getEra, type TransitionLine } from '../engine/phases'
import { playPhaseTransition, playPhaseUp, playEraChange } from '../engine/audio'
import { useGameStore } from '../store/gameStore'

interface PhaseTransitionProps {
  from: Phase
  to: Phase
  onComplete: () => void
}

export function PhaseTransition({ from, to, onComplete }: PhaseTransitionProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showOverlay, setShowOverlay] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  const script = getTransitionScript(from, to)
  const gameMode = useGameStore(s => s.gameMode)

  // Detect era change
  const isEraChange = getEra(from) !== getEra(to)
  const isOwner = gameMode === 'owner'

  // Play transition sounds on mount
  useEffect(() => {
    playPhaseTransition()
    // Short delay then play fanfare
    const fanfareTimer = setTimeout(() => {
      if (isEraChange) {
        playEraChange()
      } else {
        playPhaseUp()
      }
    }, 800)
    // Trigger particle burst after initial fade-in
    const burstTimer = setTimeout(() => setShowBurst(true), 1200)
    return () => {
      clearTimeout(fanfareTimer)
      clearTimeout(burstTimer)
    }
  }, [isEraChange])

  // Reveal lines one by one based on their delay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    script.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => Math.max(prev, i + 1))
      }, line.delay + 1500)
      timers.push(timer)
    })

    // After all lines shown, wait then fade out
    const lastDelay = script[script.length - 1]?.delay ?? 0
    const lingerTime = isEraChange ? 5500 : 4500
    const completeTimer = setTimeout(() => {
      setFadingOut(true)
    }, lastDelay + lingerTime)
    timers.push(completeTimer)

    return () => timers.forEach(clearTimeout)
  }, [script, isEraChange])

  const handleFadeOutComplete = useCallback(() => {
    if (fadingOut) {
      setShowOverlay(false)
      onComplete()
    }
  }, [fadingOut, onComplete])

  const getLineStyle = (style?: TransitionLine['style']) => {
    switch (style) {
      case 'bold':
        return isEraChange
          ? 'text-2xl md:text-4xl font-bold text-text-primary tracking-wide'
          : 'text-xl md:text-2xl font-bold text-text-primary tracking-wide'
      case 'accent':
        return isEraChange
          ? 'text-2xl md:text-4xl font-bold text-accent tracking-widest uppercase'
          : 'text-xl md:text-2xl font-bold text-accent tracking-widest uppercase'
      case 'dim':
        return 'text-base md:text-lg text-text-muted italic'
      default:
        return 'text-base md:text-lg text-text-secondary'
    }
  }

  if (!showOverlay) return null

  const particleColor = isOwner
    ? { r: 45, g: 106, b: 79 }   // owner green
    : { r: 255, g: 102, b: 0 }    // industry orange

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ background: '#000' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: fadingOut ? 0 : 1 }}
        transition={{ duration: fadingOut ? 1.5 : 1.5 }}
        onAnimationComplete={handleFadeOutComplete}
      >
        {/* Screen pulse on era change */}
        {isEraChange && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.5, delay: 1.2, ease: 'easeInOut' }}
          />
        )}

        {/* Subtle glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${isEraChange ? 0.15 : 0.08}) 0%, transparent 70%)`,
          }}
        />

        {/* Floating ambient particles */}
        <TransitionParticles color={particleColor} count={isEraChange ? 30 : 20} />

        {/* Burst particles from center */}
        {showBurst && (
          <BurstParticles color={particleColor} count={isEraChange ? 48 : 24} />
        )}

        {/* Era change badge */}
        {isEraChange && visibleLines > 0 && (
          <motion.div
            className="absolute top-[15%] z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
              style={{ color: `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0.6)` }}>
              {getEra(to)}
            </span>
          </motion.div>
        )}

        {/* Text lines */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-8 max-w-md text-center">
          {script.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isEraChange ? 1.0 : 0.8, ease: 'easeOut' }}
              className={getLineStyle(line.style)}
            >
              {line.style === 'accent' ? (
                <span className="glow-text-orange">{line.text}</span>
              ) : (
                line.text
              )}
            </motion.p>
          ))}
        </div>

        {/* Skip hint */}
        <motion.p
          className="absolute bottom-8 text-sm text-text-muted/40 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          FAS {from} → FAS {to}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}

// Floating ambient particles
function TransitionParticles({ color, count }: { color: { r: number; g: number; b: number }; count: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
    })), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
            boxShadow: `0 0 6px rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Burst particles radiating outward from center
function BurstParticles({ color, count }: { color: { r: number; g: number; b: number }; count: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const speed = 150 + Math.random() * 200
      return {
        id: i,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        duration: 0.8 + Math.random() * 0.6,
      }
    }), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '500px' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`,
            boxShadow: `0 0 8px rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3 }}
          transition={{
            duration: p.duration,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
