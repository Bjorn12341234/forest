import { useRef, useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { formatNumber } from '../../engine/format'
import { ParticleCanvas, type ParticleCanvasHandle } from '../ui/ParticleCanvas'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { playClick } from '../../engine/audio'
import { OWNER_CLICK_UPGRADES } from '../../data/ownerClickUpgrades'

// Flavourtext changes with skogsvardering milestones
const CLICK_FLAVOUR: [number, string][] = [
  [100_000, 'Dina grannar ser din skog. De frågar hur du gör. Du visar dem.'],
  [50_000, 'En biolog från universitetet vill studera din skog. Du säger ja.'],
  [10_000, 'Du hittar en lavskrika. Du vet vad det betyder. Din skog lever.'],
  [2_000, 'Du plockhugger tre granar som trängs. De kvarvarande träden tackar dig med tillväxt.'],
  [500, 'Du identifierar en 200-årig tall. Du bestämmer dig för att låta den stå.'],
  [0, 'Du går ut i skogen din farfar planterade. Du lär dig namnen på träden.'],
]

function getFlavour(totalSV: number): string {
  for (const [threshold, text] of CLICK_FLAVOUR) {
    if (totalSV >= threshold) return text
  }
  return CLICK_FLAVOUR[CLICK_FLAVOUR.length - 1][1]
}

export function OwnerClickArea() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<ParticleCanvasHandle>(null)

  const skogsvardering = useGameStore(s => s.skogsvardering)
  const svPerClick = useGameStore(s => s.skogsvarderingPerClick)
  const svPerSecond = useGameStore(s => s.skogsvarderingPerSecond)
  const inkomst = useGameStore(s => s.inkomst)
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const ownerClickUpgrades = useGameStore(s => s.ownerClickUpgrades)
  const ownerClick = useGameStore(s => s.ownerClick)
  const buyOwnerClickUpgrade = useGameStore(s => s.buyOwnerClickUpgrade)

  const flavour = getFlavour(totalSV)

  // Click streak tracking
  const [streak, setStreak] = useState(0)
  const [streakBonus, setStreakBonus] = useState(0)
  const lastClickRef = useRef(0)
  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    const timeSinceLast = now - lastClickRef.current
    lastClickRef.current = now

    const newStreak = timeSinceLast <= 500 ? streak + 1 : 1
    setStreak(newStreak)

    if (newStreak >= 25 && streakBonus < 1.0) {
      setStreakBonus(1.0)
      const bonus = svPerClick * 1.0
      useGameStore.setState(s => ({
        skogsvardering: s.skogsvardering + bonus,
        totalSkogsvardering: s.totalSkogsvardering + bonus,
      }))
      if (particlesRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        particlesRef.current.emit(rect.width / 2, rect.height / 2, 24, '#2D6A4F')
      }
      if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
      streakTimerRef.current = setTimeout(() => { setStreakBonus(0); setStreak(0) }, 5000)
    } else if (newStreak >= 10 && streakBonus < 0.5) {
      setStreakBonus(0.5)
      const bonus = svPerClick * 0.5
      useGameStore.setState(s => ({
        skogsvardering: s.skogsvardering + bonus,
        totalSkogsvardering: s.totalSkogsvardering + bonus,
      }))
      if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
      streakTimerRef.current = setTimeout(() => { setStreakBonus(0); setStreak(0) }, 5000)
    }

    ownerClick()
    playClick()

    if (particlesRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      particlesRef.current.emit(x, y, 8, '#2D6A4F')
    }
  }, [ownerClick, streak, streakBonus, svPerClick])

  const visibleUpgrades = useMemo(() => {
    return OWNER_CLICK_UPGRADES.filter(cu => {
      if (ownerClickUpgrades[cu.id]) return true
      return inkomst >= cu.cost * 0.3
    })
  }, [ownerClickUpgrades, inkomst])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Skogsvärde Counter */}
      <div className="text-center">
        <div className="text-owner-text/60 text-sm uppercase tracking-wider mb-1">Skogsvärde</div>
        <AnimatedNumber
          value={skogsvardering}
          className="font-display text-owner-accent"
        />
        <div className="flex gap-4 justify-center mt-1">
          <span className="text-owner-text/50 text-sm">
            +{formatNumber(svPerClick)}/klick
            {streakBonus > 0 && (
              <span className="text-owner-accent ml-1">(+{Math.round(streakBonus * 100)}%)</span>
            )}
          </span>
          {svPerSecond > 0 && (
            <span className="text-owner-text/50 text-sm">
              {formatNumber(svPerSecond)}/s
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
                     border-2 bg-owner-accent/10
                     flex items-center justify-center
                     hover:border-owner-accent transition-all duration-200"
          style={{
            borderColor: streakBonus > 0
              ? `rgba(45, 106, 79, ${0.5 + streakBonus * 0.5})`
              : undefined,
            boxShadow: streakBonus > 0
              ? `0 0 ${20 + streakBonus * 20}px rgba(45, 106, 79, ${0.2 + streakBonus * 0.3})`
              : undefined,
          }}
        >
          <div className="absolute inset-2 rounded-full border border-owner-accent/20" />
          <span className="text-owner-accent font-bold text-sm sm:text-base text-center leading-tight px-4">
            VÅRDA{'\n'}SKOG
          </span>
        </motion.button>
      </div>

      {/* Flavourtext */}
      <p className="text-owner-text/50 text-sm italic text-center max-w-sm leading-relaxed px-2">
        {flavour}
      </p>

      {/* Click Upgrades */}
      {visibleUpgrades.length > 0 && (
        <div className="w-full mt-2">
          <h3 className="text-sm font-medium text-owner-text/70 uppercase tracking-wider mb-2">
            Klick-uppgraderingar
          </h3>
          <div className="flex flex-col gap-1.5">
            {visibleUpgrades.map(cu => {
              const purchased = ownerClickUpgrades[cu.id]
              const canAfford = !purchased && inkomst >= cu.cost
              return (
                <div
                  key={cu.id}
                  className={`bg-white/60 border rounded-sm p-3 select-none
                    ${purchased ? 'border-owner-accent/30' : canAfford ? 'border-owner-accent/50 cursor-pointer hover:border-owner-accent' : 'border-owner-text/10 opacity-50'}`}
                  onClick={() => canAfford && buyOwnerClickUpgrade(cu.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg flex-shrink-0">{cu.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-owner-text">{cu.name}</span>
                        {purchased && <span className="w-2 h-2 rounded-full bg-owner-accent flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-owner-text/50 leading-relaxed">{cu.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {purchased ? (
                        <span className="text-xs text-owner-accent">Köpt</span>
                      ) : (
                        <span className={`text-sm font-numbers ${canAfford ? 'text-owner-accent' : 'text-owner-text/40'}`}>
                          {formatNumber(cu.cost)} tkr
                        </span>
                      )}
                      <div className="text-xs text-owner-text/50">+{cu.svPerClickBonus}/klick</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
