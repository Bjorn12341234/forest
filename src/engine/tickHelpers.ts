// ── Tick Helper Functions ──
// Pure computation functions extracted from the game tick for readability and testability.

import { GENERATORS, getActiveSynergies } from '../data/generators'
import { EXPANSION_TARGETS } from '../data/expansionTargets'
import { getCountry, getCountryMaintenanceMultiplier } from '../data/countries'
import { ANTAGONISTS } from '../data/antagonists'
import type { GameState } from '../store/types'

// ── Types ──

export interface ProductionTotals {
  stammarPS: number
  kapitalPS: number
  biodivLoss: number
  co2: number
  kapitalCost: number
  lobbyCost: number
}

export interface SynergyEffects {
  stammarMult: number
  kapitalMult: number
  imagePS: number
}

export interface SideEffects {
  image: number
  lobby: number
  biodiversity: number
}

// ── Expansion targets ──

/** Aggregate production/maintenance from all controlled expansion targets */
export function computeExpansionTotals(
  expansionTargets: GameState['expansionTargets']
): ProductionTotals {
  const totals: ProductionTotals = { stammarPS: 0, kapitalPS: 0, biodivLoss: 0, co2: 0, kapitalCost: 0, lobbyCost: 0 }
  for (const target of EXPANSION_TARGETS) {
    const ts = expansionTargets[target.id]
    if (ts?.status === 'controlled') {
      totals.stammarPS += target.production.stammarPerSecond
      totals.kapitalPS += target.production.kapitalPerSecond
      totals.biodivLoss += target.hiddenCosts.biodiversityLoss
      totals.co2 += target.hiddenCosts.co2Gain
      totals.kapitalCost += target.maintenanceCost.kapitalPerSecond
      totals.lobbyCost += target.maintenanceCost.lobbyPerSecond
    }
  }
  return totals
}

// ── Country totals ──

/** Aggregate production/maintenance from all controlled countries, with maintenance scaling */
export function computeCountryTotals(
  countries: GameState['countries']
): ProductionTotals {
  const totals: ProductionTotals = { stammarPS: 0, kapitalPS: 0, biodivLoss: 0, co2: 0, kapitalCost: 0, lobbyCost: 0 }
  const controlledCount = Object.values(countries).filter(cs => cs.status === 'controlled').length
  const maintenanceMult = getCountryMaintenanceMultiplier(controlledCount)
  for (const [countryId, cs] of Object.entries(countries)) {
    if (cs.status === 'controlled') {
      const def = getCountry(countryId)
      if (def) {
        totals.stammarPS += def.production.stammarPerSecond
        totals.kapitalPS += def.production.kapitalPerSecond
        totals.biodivLoss += def.hiddenCosts.biodiversityLoss
        totals.co2 += def.hiddenCosts.co2Gain
        totals.kapitalCost += def.maintenanceCost.kapitalPerSecond * maintenanceMult
        totals.lobbyCost += def.maintenanceCost.lobbyPerSecond * maintenanceMult
      }
    }
  }
  return totals
}

// ── Synergy effects ──

/** Compute aggregate synergy multipliers from active generator pairs */
export function computeSynergyEffects(
  generators: GameState['generators']
): SynergyEffects {
  const effects: SynergyEffects = { stammarMult: 1, kapitalMult: 1, imagePS: 0 }
  const activeSynergies = getActiveSynergies(generators)
  for (const syn of activeSynergies) {
    if (syn.effects.stammarMultiplier) effects.stammarMult *= syn.effects.stammarMultiplier
    if (syn.effects.kapitalMultiplier) effects.kapitalMult *= syn.effects.kapitalMultiplier
    if (syn.effects.imagePerSecond) effects.imagePS += syn.effects.imagePerSecond
  }
  return effects
}

// ── Generator side effects ──

/** Compute per-tick image/lobby/biodiversity from generator side effects */
export function computeGeneratorSideEffects(
  generators: GameState['generators'],
  dt: number
): SideEffects {
  const effects: SideEffects = { image: 0, lobby: 0, biodiversity: 0 }
  for (const gen of GENERATORS) {
    const gs = generators[gen.id]
    if (!gs || gs.count <= 0 || !gen.sideEffects) continue
    for (const eff of gen.sideEffects) {
      const amount = eff.perSecond * gs.count * dt
      if (eff.resource === 'image') effects.image += amount
      else if (eff.resource === 'lobby') effects.lobby += amount
      else if (eff.resource === 'biodiversity') effects.biodiversity += amount
    }
  }
  return effects
}

// ── Country invasion ──

/** Process invasion progress for all invading countries, returns updated countries if changed */
export function processCountryInvasions(
  countries: GameState['countries'],
  dt: number
): GameState['countries'] | null {
  let changed = false
  const updated = { ...countries }
  for (const [countryId, cs] of Object.entries(updated)) {
    if (cs.status !== 'invading') continue
    const def = getCountry(countryId)
    if (!def) continue

    const pa = cs.pressureAllocation ?? { kapital: 0, lobby: 0, stammar: 0 }
    const kapitalMod = def.defenseType === 'political' ? 2 : 1
    const lobbyMod = def.defenseType === 'environmental' ? 2 : 1
    const stammarMod = def.defenseType === 'economic' ? 2 : 1

    const totalPressure = (pa.kapital * kapitalMod + pa.lobby * lobbyMod + pa.stammar * stammarMod) / def.defenseStrength
    const resistanceReduction = totalPressure * dt * 0.1

    if (resistanceReduction > 0) {
      const newResistance = Math.max(0, cs.resistance - resistanceReduction)
      if (newResistance <= 0) {
        updated[countryId] = { ...cs, status: 'controlled', resistance: 0, controlProgress: 100 }
      } else {
        updated[countryId] = { ...cs, resistance: newResistance, controlProgress: ((def.resistance - newResistance) / def.resistance) * 100 }
      }
      changed = true
    }
  }
  return changed ? updated : null
}

// ── Antagonist escalation ──

/** Check for antagonist escalation (active >5 min) and return updated antagonists if changed */
export function processAntagonistEscalation(
  antagonists: GameState['antagonists'],
  now: number
): GameState['antagonists'] | null {
  const ESCALATION_TIME_MS = 5 * 60 * 1000
  let changed = false
  let updated = antagonists
  for (const ant of ANTAGONISTS) {
    const antState = antagonists[ant.id]
    if (!antState?.active || antState.countered || antState.escalated) continue
    if (antState.activatedAt && (now - antState.activatedAt) >= ESCALATION_TIME_MS) {
      if (!changed) {
        updated = { ...antagonists }
        changed = true
      }
      updated[ant.id] = { ...antState, escalated: true }
    }
  }
  return changed ? updated : null
}

// ── Antagonist tick effects ──

export interface AntagonistDeltas {
  image: number
  stammar: number
  kapital: number
}

/** Compute resource deltas from active antagonist effects */
export function computeAntagonistDeltas(
  antagonists: GameState['antagonists'],
  dt: number,
  imageProtection: number
): AntagonistDeltas {
  const deltas: AntagonistDeltas = { image: 0, stammar: 0, kapital: 0 }
  for (const ant of ANTAGONISTS) {
    const antState = antagonists[ant.id]
    if (!antState?.active || antState.countered) continue
    const escalationMult = antState.escalated ? 2 : 1
    for (const eff of ant.tickEffects) {
      const amount = eff.perSecond * dt * escalationMult
      if (eff.resource === 'image') deltas.image += amount * imageProtection
      else if (eff.resource === 'stammar') deltas.stammar += amount
      else if (eff.resource === 'kapital') deltas.kapital += amount
    }
  }
  return deltas
}

// ── Entropy ──

/** Calculate new entropy value for phase 12+ */
export function computeEntropyDrain(
  entropi: number,
  phase: number,
  totalStammarPS: number,
  entropyPurchases: Record<string, boolean>,
  dt: number
): number {
  if (phase < 12 || entropi <= 0) return entropi
  const baseDrain = Math.min(0.5, totalStammarPS / 1e10)
  const purchaseCount = Object.values(entropyPurchases).filter(Boolean).length
  const entropySlowFactor = Math.pow(0.7, purchaseCount)
  const drainPerSecond = baseDrain * entropySlowFactor
  return Math.max(0, entropi - drainPerSecond * dt)
}

// ── Species ──

/** Count species lost when biodiversity crosses thresholds */
export function computeSpeciesLoss(oldBiodiv: number, newBiodiv: number): number {
  const thresholds = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5]
  let count = 0
  for (const threshold of thresholds) {
    if (oldBiodiv > threshold && newBiodiv <= threshold) count++
  }
  return count
}
