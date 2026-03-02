import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getOwnerTransitionScript, type TransitionLine } from '../../engine/phases'
import { playOwnerPhaseUp } from '../../engine/audio'

interface OwnerPhaseTransitionProps {
  from: number
  to: number
  onComplete: () => void
}

export function OwnerPhaseTransition({ from, to, onComplete }: OwnerPhaseTransitionProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)
  const [showBurst, setShowBurst] = useState(false)
  const script = getOwnerTransitionScript(from, to)

  // Play transition sound on mount
  useEffect(() => {
    const fanfareTimer = setTimeout(() => playOwnerPhaseUp(), 600)
    const burstTimer = setTimeout(() => setShowBurst(true), 1000)
    return () => {
      clearTimeout(fanfareTimer)
      clearTimeout(burstTimer)
    }
  }, [])

  // Reveal lines one by one based on their delay
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    script.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => Math.max(prev, i + 1))
      }, line.delay + 1200)
      timers.push(timer)
    })

    // After all lines shown, wait then fade out (4s total)
    const lastDelay = script[script.length - 1]?.delay ?? 0
    const completeTimer = setTimeout(() => {
      setFadingOut(true)
    }, lastDelay + 4000)
    timers.push(completeTimer)

    return () => timers.forEach(clearTimeout)
  }, [script])

  const handleFadeOutComplete = useCallback(() => {
    if (fadingOut) {
      setShowOverlay(false)
      onComplete()
    }
  }, [fadingOut, onComplete])

  const getLineStyle = (style?: TransitionLine['style']) => {
    switch (style) {
      case 'bold':
        return 'text-xl md:text-3xl font-bold tracking-wide'
      case 'accent':
        return 'text-lg md:text-2xl font-bold tracking-widest uppercase'
      case 'dim':
        return 'text-base md:text-lg italic'
      default:
        return 'text-base md:text-lg'
    }
  }

  const getLineColor = (style?: TransitionLine['style']) => {
    switch (style) {
      case 'bold':
        return '#E0D5BF' // parchment
      case 'accent':
        return '#C4A44E' // gold
      case 'dim':
        return 'rgba(224, 213, 191, 0.6)'
      default:
        return 'rgba(224, 213, 191, 0.85)'
    }
  }

  // Green/gold particle colors for owner theme
  const particleColor = { r: 94, g: 158, b: 110 }
  const goldColor = { r: 196, g: 164, b: 78 }

  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const isGold = i % 3 === 0
      const color = isGold ? goldColor : particleColor
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.3,
        color,
      }
    }), [])

  const burstParticles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2
      const speed = 120 + Math.random() * 160
      const isGold = i % 4 === 0
      const color = isGold ? goldColor : particleColor
      return {
        id: i,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3,
        duration: 0.8 + Math.random() * 0.5,
        color,
      }
    }), [])

  if (!showOverlay) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ background: '#0D1A0D' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: fadingOut ? 0 : 1 }}
        transition={{ duration: fadingOut ? 1.2 : 1.2 }}
        onAnimationComplete={handleFadeOutComplete}
      >
        {/* Subtle glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0.12) 0%, transparent 70%)`,
          }}
        />

        {/* Floating ambient particles */}
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
                background: `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`,
                boxShadow: `0 0 6px rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.4)`,
              }}
              animate={{
                y: [0, -30, 0],
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

        {/* Burst particles from center */}
        {showBurst && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {burstParticles.map(p => (
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
                  background: `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`,
                  boxShadow: `0 0 8px rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3 }}
                transition={{ duration: p.duration, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}

        {/* Text lines */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-8 max-w-md text-center">
          {script.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={getLineStyle(line.style)}
              style={{ color: getLineColor(line.style) }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Phase indicator at bottom */}
        <motion.p
          className="absolute bottom-8 text-sm tracking-wider"
          style={{ color: 'rgba(94, 158, 110, 0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          FAS {from} → FAS {to}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
