import type { GameState } from '../store/types'
import { getEra } from './phases'

export type WarningLevel = 0 | 1 | 2 | 3

const WARNING_PRODUCTION_PENALTIES: Record<WarningLevel, number> = {
  0: 1.0,
  1: 0.8,
  2: 0.5,
  3: 0.25,
}

/** Calculate warning level from game state */
export function calculateWarningLevel(state: GameState): WarningLevel {
  const era = getEra(state.phase)

  // In MAKT era, ownerTrust < 15 also triggers warnings
  const ownerTrustWarning = (era === 'MAKT' || era === 'INTERNATIONELL') && state.ownerTrust < 15

  if (state.image < 5 || (ownerTrustWarning && state.ownerTrust < 5)) return 3
  if (state.image < 15 || (ownerTrustWarning && state.ownerTrust < 10)) return 2
  if (state.image < 25 || ownerTrustWarning) return 1
  return 0
}

/** Get production multiplier for current warning level */
export function getWarningPenalty(warningLevel: WarningLevel): number {
  return WARNING_PRODUCTION_PENALTIES[warningLevel]
}

/** Get event delay multiplier (2x at level 2+) */
export function getWarningEventDelayMultiplier(warningLevel: WarningLevel): number {
  if (warningLevel >= 2) return 2.0
  return 1.0
}

/** Get lobby cost multiplier (2x at level 3) */
export function getWarningLobbyCostMultiplier(warningLevel: WarningLevel): number {
  if (warningLevel >= 3) return 2.0
  return 1.0
}

/** Whether events are blocked (level 3) */
export function areEventsBlocked(warningLevel: WarningLevel): boolean {
  return warningLevel >= 3
}
