import { useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { formatNumber } from '../../engine/format'
import { ParticleCanvas, type ParticleCanvasHandle } from '../ui/ParticleCanvas'
import { AnimatedNumber } from '../ui/AnimatedNumber'
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

  const handleClick = useCallback((e: React.MouseEvent) => {
    ownerClick()

    if (particlesRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      particlesRef.current.emit(x, y, 8, '#2D6A4F')
    }
  }, [ownerClick])

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
        <div className="text-[#3D2B1F]/60 text-sm uppercase tracking-wider mb-1">Skogsvärde</div>
        <AnimatedNumber
          value={skogsvardering}
          className="font-display text-[#2D6A4F]"
        />
        <div className="flex gap-4 justify-center mt-1">
          <span className="text-[#3D2B1F]/50 text-sm">
            +{formatNumber(svPerClick)}/klick
          </span>
          {svPerSecond > 0 && (
            <span className="text-[#3D2B1F]/50 text-sm">
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
                     border-2 border-[#2D6A4F]/40 bg-[#2D6A4F]/10
                     flex items-center justify-center
                     hover:border-[#2D6A4F] transition-colors"
        >
          <div className="absolute inset-2 rounded-full border border-[#2D6A4F]/20" />
          <span className="text-[#2D6A4F] font-bold text-sm sm:text-base text-center leading-tight px-4">
            VÅRDA{'\n'}SKOG
          </span>
        </motion.button>
      </div>

      {/* Flavourtext */}
      <p className="text-[#3D2B1F]/50 text-sm italic text-center max-w-sm leading-relaxed px-2">
        {flavour}
      </p>

      {/* Click Upgrades */}
      {visibleUpgrades.length > 0 && (
        <div className="w-full mt-2">
          <h3 className="text-sm font-medium text-[#3D2B1F]/70 uppercase tracking-wider mb-2">
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
                    ${purchased ? 'border-[#2D6A4F]/30' : canAfford ? 'border-[#2D6A4F]/50 cursor-pointer hover:border-[#2D6A4F]' : 'border-[#3D2B1F]/10 opacity-50'}`}
                  onClick={() => canAfford && buyOwnerClickUpgrade(cu.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg flex-shrink-0">{cu.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#3D2B1F]">{cu.name}</span>
                        {purchased && <span className="w-2 h-2 rounded-full bg-[#2D6A4F] flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-[#3D2B1F]/50 leading-relaxed">{cu.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {purchased ? (
                        <span className="text-xs text-[#2D6A4F]">Köpt</span>
                      ) : (
                        <span className={`text-sm font-numbers ${canAfford ? 'text-[#2D6A4F]' : 'text-[#3D2B1F]/40'}`}>
                          {formatNumber(cu.cost)} tkr
                        </span>
                      )}
                      <div className="text-xs text-[#3D2B1F]/50">+{cu.svPerClickBonus}/klick</div>
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
