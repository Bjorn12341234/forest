import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { OWNER_GENERATORS, getOwnerGeneratorCost, type OwnerGeneratorData } from '../../data/ownerGenerators'
import { formatNumber } from '../../engine/format'
import { playPurchase } from '../../engine/audio'

export function OwnerGenerators() {
  const skogsvardering = useGameStore(s => s.skogsvardering)
  const ownerGenerators = useGameStore(s => s.ownerGenerators)
  const buyOwnerGenerator = useGameStore(s => s.buyOwnerGenerator)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-medium text-owner-text mb-1">Ekologiska processer</h2>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {OWNER_GENERATORS.map((gen, i) => (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              layout
            >
              <OwnerGeneratorRow
                data={gen}
                count={ownerGenerators[gen.id]?.count ?? 0}
                skogsvardering={skogsvardering}
                onBuy={() => {
                  buyOwnerGenerator(gen.id)
                  playPurchase()
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function OwnerGeneratorRow({ data, count, skogsvardering, onBuy }: {
  data: OwnerGeneratorData
  count: number
  skogsvardering: number
  onBuy: () => void
}) {
  const [showFlash, setShowFlash] = useState(false)
  const cost = getOwnerGeneratorCost(data.baseCost, count, data.costScale)
  const canAfford = skogsvardering >= cost

  const handleBuy = () => {
    if (!canAfford) return
    onBuy()
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 400)
  }

  // Build production label
  const parts: string[] = []
  if (data.svPerSecond > 0) parts.push(`+${formatNumber(data.svPerSecond)} sv/s`)
  if (data.inkomstPerSecond > 0) parts.push(`+${formatNumber(data.inkomstPerSecond)} tkr/s`)
  if (data.bonuses?.biodiv) parts.push(`+biodiv`)
  if (data.bonuses?.resiliens) parts.push(`+resiliens`)
  if (data.bonuses?.kunskap) parts.push(`+kunskap`)
  if (data.bonuses?.legacy) parts.push(`+arv`)
  if (data.bonuses?.deadwood) parts.push(`+död ved`)
  const productionLabel = parts.join(', ')

  return (
    <div
      className={`relative overflow-hidden bg-white/60 border rounded-sm p-3 select-none
        ${canAfford ? 'border-owner-accent/50 cursor-pointer hover:border-owner-accent' : 'border-owner-text/10 opacity-60'}`}
      onClick={handleBuy}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-owner-accent/20 z-10"
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-3">
        {/* Count badge */}
        <div className="flex flex-col items-center flex-shrink-0 w-10">
          <span className="text-lg font-bold text-owner-accent font-numbers">{count}</span>
          <span className="text-xs text-owner-text/40 uppercase">st</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-owner-text">{data.name}</h3>
          <p className="text-xs text-owner-text/50 leading-relaxed mt-0.5">
            {data.description}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-sm font-numbers ${canAfford ? 'text-owner-accent' : 'text-owner-text/40'}`}>
              {formatNumber(cost)} sv
            </span>
            <span className="text-xs text-owner-text/60 font-numbers">
              {productionLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
