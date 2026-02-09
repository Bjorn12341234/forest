// ── Silva Maximus — Upgrade Registry ──
// Central registry connecting all upgrade data files.

import type { UpgradeData } from '../store/types'
import { PHASE1_UPGRADES } from './phase1/upgrades'

const UPGRADES: UpgradeData[] = [
  ...PHASE1_UPGRADES,
]

export function getUpgradeData(id: string): UpgradeData | undefined {
  return UPGRADES.find(u => u.id === id)
}

export function getUpgradesByPhase(phase: number): UpgradeData[] {
  return UPGRADES.filter(u => u.phase <= phase)
}

export function getUpgradesByTree(tree: string): UpgradeData[] {
  return UPGRADES.filter(u => u.tree === tree)
}

export function getAllUpgrades(): UpgradeData[] {
  return UPGRADES
}
