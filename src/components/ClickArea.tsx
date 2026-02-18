import { useRef, useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { formatNumber } from '../engine/format'
import { ParticleCanvas, type ParticleCanvasHandle } from './ui/ParticleCanvas'
import { AnimatedNumber } from './ui/AnimatedNumber'
import { playClick } from '../engine/audio'
import { CLICK_UPGRADES } from '../data/clickUpgrades'
import { GlassCard } from './ui/GlassCard'

// Flavourtext changes with phase progression
const CLICK_FLAVOUR: Record<number, string> = {
  1: 'Du skriver en skogsbruksplan åt en pensionerad lärare i Ångermanland. Gratis, såklart.',
  2: 'Du rekommenderar "föryngringsavverkning" — det låter ju bättre än "kalavverkning".',
  3: 'Planen föreslår gallring. Av det fina virket. Skrapet lämnar du kvar. Ägaren märker inget.',
  4: 'Avverkningsanmälan inskickad. Skogsstyrelsen hinner inte granska. Perfekt.',
  5: 'Planen skrivs nu av en AI. Ägaren får ett mail. Skördaren är redan på plats.',
  6: 'Det finns inga ägare kvar att skriva planer åt. AI:n optimerar ändå. Av gammal vana.',
  7: 'Klick. Pip. Stammar räknas. Universum är en produktionsskog. Du är ett nummer.',
}

export function ClickArea() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<ParticleCanvasHandle>(null)

  const stammar = useGameStore(s => s.stammar)
  const stammarPerClick = useGameStore(s => s.stammarPerClick)
  const stammarPerSecond = useGameStore(s => s.stammarPerSecond)
  const kapital = useGameStore(s => s.kapital)
  const phase = useGameStore(s => s.phase)
  const clickUpgrades = useGameStore(s => s.clickUpgrades)
  const click = useGameStore(s => s.click)
  const buyClickUpgrade = useGameStore(s => s.buyClickUpgrade)

  const flavour = CLICK_FLAVOUR[phase] ?? CLICK_FLAVOUR[1]

  // Click streak tracking
  const [streak, setStreak] = useState(0)
  const [streakBonus, setStreakBonus] = useState(0) // 0, 0.5, or 1.0
  const lastClickRef = useRef(0)
  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    const timeSinceLast = now - lastClickRef.current
    lastClickRef.current = now

    // Track streak (clicks within 500ms)
    const newStreak = timeSinceLast <= 500 ? streak + 1 : 1
    setStreak(newStreak)

    // Apply streak bonus
    if (newStreak >= 25 && streakBonus < 1.0) {
      setStreakBonus(1.0)
      // Grant bonus: extra stammar from streak
      const bonusStammar = stammarPerClick * 1.0
      useGameStore.setState(s => ({
        stammar: s.stammar + bonusStammar,
        totalStammar: s.totalStammar + bonusStammar,
      }))
      // Burst particles
      if (particlesRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        particlesRef.current.emit(rect.width / 2, rect.height / 2, 24)
      }
      // Reset bonus after 5s
      if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
      streakTimerRef.current = setTimeout(() => {
        setStreakBonus(0)
        setStreak(0)
      }, 5000)
    } else if (newStreak >= 10 && streakBonus < 0.5) {
      setStreakBonus(0.5)
      const bonusStammar = stammarPerClick * 0.5
      useGameStore.setState(s => ({
        stammar: s.stammar + bonusStammar,
        totalStammar: s.totalStammar + bonusStammar,
      }))
      if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
      streakTimerRef.current = setTimeout(() => {
        setStreakBonus(0)
        setStreak(0)
      }, 5000)
    }

    click()
    playClick()

    if (particlesRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      particlesRef.current.emit(x, y, 12)
    }
  }, [click, streak, streakBonus, stammarPerClick])

  // Click upgrades that are visible (affordable or purchased)
  const visibleClickUpgrades = useMemo(() => {
    return CLICK_UPGRADES.filter(cu => {
      if (clickUpgrades[cu.id]) return true // already purchased, show it
      // Show if player has at least 30% of the cost (teaser)
      return kapital >= cu.cost * 0.3
    })
  }, [clickUpgrades, kapital])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stammar Counter */}
      <div className="text-center">
        <div className="text-text-secondary text-sm uppercase tracking-wider mb-1">Stammar</div>
        <AnimatedNumber
          value={stammar}
          className="font-display text-text-primary"
        />
        <div className="flex gap-4 justify-center mt-1">
          <span className="text-text-muted text-sm">
            +{formatNumber(stammarPerClick)}/klick
            {streakBonus > 0 && (
              <span className="text-accent ml-1">(+{Math.round(streakBonus * 100)}%)</span>
            )}
          </span>
          {stammarPerSecond > 0 && (
            <span className="text-text-muted text-sm">
              {formatNumber(stammarPerSecond)}/s
            </span>
          )}
        </div>
      </div>

      {/* Main Click Button */}
      <div ref={containerRef} className="relative my-2">
        <ParticleCanvas ref={particlesRef} />

        <motion.button
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleClick}
          className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full cursor-pointer select-none
                     border-2 bg-bg-secondary
                     flex items-center justify-center
                     hover:border-text-primary transition-all duration-200"
          style={{
            borderColor: streakBonus > 0
              ? `rgba(212, 115, 12, ${0.5 + streakBonus * 0.5})`
              : undefined,
            boxShadow: streakBonus > 0
              ? `0 0 ${20 + streakBonus * 20}px rgba(212, 115, 12, ${0.2 + streakBonus * 0.3})`
              : undefined,
          }}
        >
          <div className="absolute inset-2 rounded-full border border-text-secondary/30" />
          <span className="text-text-primary font-bold text-sm sm:text-base text-center leading-tight px-4">
            SKRIV{'\n'}SKOGSBRUKS-{'\n'}PLAN
          </span>
        </motion.button>
      </div>

      {/* Flavourtext */}
      <p className="text-text-muted text-sm italic text-center max-w-sm leading-relaxed px-2">
        {flavour}
      </p>

      {/* Click Upgrades */}
      {visibleClickUpgrades.length > 0 && (
        <div className="w-full mt-2">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">
            Klick-uppgraderingar
          </h3>
          <div className="flex flex-col gap-1.5">
            {visibleClickUpgrades.map(cu => {
              const purchased = clickUpgrades[cu.id]
              const canAfford = !purchased && kapital >= cu.cost
              return (
                <GlassCard
                  key={cu.id}
                  padding="sm"
                  hover={canAfford}
                  glow={purchased ? 'green' : canAfford ? 'orange' : 'none'}
                  className={`cursor-pointer select-none ${!canAfford && !purchased ? 'opacity-50' : ''}`}
                  onClick={() => canAfford && buyClickUpgrade(cu.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg flex-shrink-0">{cu.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary">{cu.name}</span>
                        {purchased && <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{cu.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {purchased ? (
                        <span className="text-xs text-success">Köpt</span>
                      ) : (
                        <span className={`text-sm font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
                          {formatNumber(cu.cost)} Mkr
                        </span>
                      )}
                      <div className="text-xs text-text-secondary">+{cu.stammarPerClickBonus}/klick</div>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
