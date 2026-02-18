import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { getUpgradesByPhase, getUpgradeData } from '../data/upgradeRegistry'
import type { UpgradeData } from '../store/types'
import { UpgradeCard } from './UpgradeCard'

export function UpgradeList() {
  const phase = useGameStore(s => s.phase)
  const upgrades = useGameStore(s => s.upgrades)
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const clickCount = useGameStore(s => s.clickCount)
  const purchaseUpgrade = useGameStore(s => s.purchaseUpgrade)

  const resourceMap = useMemo(() => ({
    stammar,
    kapital,
    lobby,
    clickCount,
  }), [stammar, kapital, lobby, clickCount])

  const visibleUpgrades = useMemo(() => {
    const allUpgrades = getUpgradesByPhase(phase)
    return allUpgrades.filter(data => isVisible(data, upgrades, resourceMap))
  }, [phase, upgrades, resourceMap])

  // Group by tree
  const grouped = useMemo(() => {
    const groups: Record<string, UpgradeData[]> = {}
    for (const u of visibleUpgrades) {
      if (!groups[u.tree]) groups[u.tree] = []
      groups[u.tree].push(u)
    }
    return groups
  }, [visibleUpgrades])

  const canAfford = (data: UpgradeData): boolean => {
    const count = upgrades[data.id]?.count ?? 0
    if (count >= data.maxCount) return false
    // Check exclusive lock
    if (data.exclusiveWith) {
      const otherState = upgrades[data.exclusiveWith]
      if (otherState?.purchased || (otherState?.count ?? 0) > 0) return false
    }
    const cost = data.baseCost * Math.pow(1.15, count)
    const resource = resourceMap[data.costResource as keyof typeof resourceMap] ?? 0
    return resource >= cost
  }

  const isLocked = (data: UpgradeData): boolean => {
    if (!data.exclusiveWith) return false
    const otherState = upgrades[data.exclusiveWith]
    return (otherState?.purchased || (otherState?.count ?? 0) > 0)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {Object.entries(grouped).map(([tree, treeUpgrades]) => (
        <div key={tree}>
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2 px-1">
            {tree}
          </h2>
          <div className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {treeUpgrades.map((data, i) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  layout
                >
                  <UpgradeCard
                    data={data}
                    state={upgrades[data.id]}
                    canAfford={canAfford(data)}
                    locked={isLocked(data)}
                    onPurchase={() => purchaseUpgrade(data.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {visibleUpgrades.length === 0 && (
        <div className="text-center text-text-muted text-sm py-8">
          Fortsätt avverka för att låsa upp uppgraderingar...
        </div>
      )}
    </div>
  )
}

function isVisible(
  data: UpgradeData,
  upgrades: Record<string, { purchased: boolean; count: number; unlocked: boolean }>,
  resources: { stammar: number; kapital: number; lobby: number; clickCount: number }
): boolean {
  const state = upgrades[data.id]
  if (state?.purchased) return true

  // If exclusively locked and other was purchased, hide (unless already purchased)
  if (data.exclusiveWith) {
    const otherState = upgrades[data.exclusiveWith]
    if (otherState?.purchased || (otherState?.count ?? 0) > 0) {
      // Show as locked briefly, then hide
      return true // Show locked state so player sees what they missed
    }
  }

  if (data.prerequisites && data.prerequisites.length > 0) {
    // Check if these are fork prerequisites (any prereq is part of a fork pair)
    const hasForkPrereqs = data.prerequisites.some(prereqId => {
      const prereqData = getUpgradeData(prereqId)
      return prereqData?.exclusiveWith != null
    })

    if (hasForkPrereqs) {
      // Fork prerequisites: need ANY one (since player can only buy one)
      const anyMet = data.prerequisites.some(prereqId => {
        const prereq = upgrades[prereqId]
        return prereq?.purchased || (prereq?.count ?? 0) > 0
      })
      if (!anyMet) return false
    } else {
      // Normal prerequisites: need ALL
      for (const prereqId of data.prerequisites) {
        const prereq = upgrades[prereqId]
        if (!prereq?.purchased && (prereq?.count ?? 0) === 0) return false
      }
    }
  }

  if (data.unlockAt) {
    const current = resources[data.unlockAt.resource as keyof typeof resources] ?? 0
    if (current < data.unlockAt.threshold) return false
  }

  if (!data.prerequisites && !data.unlockAt) return true

  return true
}
