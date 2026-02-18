// ── Silva Maximus — Upgrade Registry ──
// Central registry connecting all upgrade data files.

import type { UpgradeData } from '../store/types'
import { PHASE1_UPGRADES } from './phase1/upgrades'
import { PHASE3_UPGRADES } from './phase3/upgrades'
import { PHASE4_UPGRADES } from './phase4/upgrades'
import { PHASE7_UPGRADES } from './phase7/upgrades'
import { PHASE10_UPGRADES } from './phase10/upgrades'
import { FORK_UPGRADES } from './forkUpgrades'

const UPGRADES: UpgradeData[] = [
  ...PHASE1_UPGRADES,
  ...PHASE3_UPGRADES,
  ...PHASE4_UPGRADES,
  ...FORK_UPGRADES,
  ...PHASE7_UPGRADES,
  ...PHASE10_UPGRADES,
]

// Map for O(1) lookups
const UPGRADE_MAP = new Map<string, UpgradeData>(
  UPGRADES.map(u => [u.id, u])
)

export function getUpgradeData(id: string): UpgradeData | undefined {
  return UPGRADE_MAP.get(id)
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
