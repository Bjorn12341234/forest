import { create } from 'zustand'
import type { GameState, GameActions, Phase, Effect, GameSettings } from './types'
import { saveGame, loadGame } from '../engine/save'
import { calculateUpgradeCost, getKapitalConversionRate, getOwnerTrustModifier } from '../engine/formulas'
import { checkEventTrigger, selectEvent, scheduleNextEvent } from '../engine/events'
import { checkPhaseTransition } from '../engine/phases'
import { PHASE1_EVENTS } from '../data/phase1/events'
import { PHASE2_EVENTS } from '../data/phase2/events'
import { PHASE5_EVENTS } from '../data/phase5/events'
import { getGeneratorData, getGeneratorCost } from '../data/generators'
import { getClickUpgrade, CLICK_UPGRADES } from '../data/clickUpgrades'
import { getUpgradeData } from '../data/upgradeRegistry'
import { getLobbyEarner, getLobbyPurchase, LOBBY_PURCHASES } from '../data/lobbyProjects'
import { getOwnerAction } from '../data/ownerActions'
import { getPRCampaign } from '../data/ownerActions'
import { ANTAGONISTS, checkAntagonistTriggers, getAntagonist } from '../data/antagonists'

export const ALL_EVENTS = [...PHASE1_EVENTS, ...PHASE2_EVENTS, ...PHASE5_EVENTS]

// ── Initial State ──

const now = Date.now()

export const INITIAL_STATE: GameState = {
  phase: 1,
  startedAt: now,
  lastTickAt: now,
  lastSaveAt: now,
  totalPlayTime: 0,

  stammar: 0,
  stammarPerSecond: 0,
  stammarPerClick: 1,
  kapital: 0,
  lobby: 0,
  image: 100,

  realCO2: 0,
  ownerProfit: 0,
  industryProfit: 0,
  biodiversity: 100,
  species: 0,
  samiLand: 0,

  ownerTrust: 50,

  clickCount: 0,
  totalStammar: 0,

  generators: {},
  upgrades: {},
  clickUpgrades: {},
  lobbyProjects: {},
  antagonists: {},

  ownerActionCooldowns: {},

  eventQueue: [],
  eventHistory: [],
  activeEvent: null,
  nextEventAt: now + 120_000,

  achievements: {},

  pendingTransition: null,

  settings: {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    notificationsEnabled: true,
    theme: 'default',
  },
}

// ── Helpers ──

/** Calculate total stammar/s from all generators (base, before lobby modifiers) */
function computeBaseStammarPerSecond(generators: GameState['generators']): number {
  let total = 0
  for (const [id, gen] of Object.entries(generators)) {
    if (gen.count > 0) {
      const data = getGeneratorData(id)
      if (data) {
        total += gen.count * data.baseProduction
      }
    }
  }
  return total
}

/** Get total generator boost multiplier from purchased lobby projects */
function getLobbyGeneratorBoost(lobbyProjects: GameState['lobbyProjects']): number {
  let boost = 1.0
  for (const purchase of LOBBY_PURCHASES) {
    if (lobbyProjects[purchase.id]?.purchased) {
      for (const effect of purchase.effects) {
        if (effect.type === 'generatorBoost') {
          boost += effect.value
        }
      }
    }
  }
  return boost
}

/** Get kapital boost multiplier from purchased lobby projects */
function getLobbyKapitalBoost(lobbyProjects: GameState['lobbyProjects']): number {
  let boost = 1.0
  for (const purchase of LOBBY_PURCHASES) {
    if (lobbyProjects[purchase.id]?.purchased) {
      for (const effect of purchase.effects) {
        if (effect.type === 'kapitalBoost') {
          boost += effect.value
        }
      }
    }
  }
  return boost
}

/** Get image loss reduction factor from lobby projects (1.0 = no reduction) */
function getLobbyImageProtection(lobbyProjects: GameState['lobbyProjects']): number {
  let reduction = 0
  for (const purchase of LOBBY_PURCHASES) {
    if (lobbyProjects[purchase.id]?.purchased) {
      for (const effect of purchase.effects) {
        if (effect.type === 'imageLossReduction' || effect.type === 'imageDecayReduction') {
          reduction += effect.value
        }
      }
    }
  }
  return Math.max(0, 1 - reduction)
}

/** Get lobby cost discount from purchased lobby projects */
function getLobbyDiscount(lobbyProjects: GameState['lobbyProjects']): number {
  let discount = 0
  for (const purchase of LOBBY_PURCHASES) {
    if (lobbyProjects[purchase.id]?.purchased) {
      for (const effect of purchase.effects) {
        if (effect.type === 'lobbyDiscount') {
          discount += effect.value
        }
      }
    }
  }
  return Math.min(0.5, discount) // cap at 50% discount
}

/** Get owner trust minimum from lobby projects */
function getOwnerTrustFloor(lobbyProjects: GameState['lobbyProjects']): number {
  for (const purchase of LOBBY_PURCHASES) {
    if (lobbyProjects[purchase.id]?.purchased) {
      for (const effect of purchase.effects) {
        if (effect.type === 'ownerTrustLock') {
          return 40 // "Aganderatten" locks trust floor at 40
        }
      }
    }
  }
  return 0
}

/** Calculate stammarPerClick from base + click upgrades + tech tree upgrades */
function computeStammarPerClick(
  clickUpgrades: GameState['clickUpgrades'],
  upgrades: GameState['upgrades']
): number {
  let base = 1 // always at least 1

  // Add click upgrade bonuses
  for (const cu of CLICK_UPGRADES) {
    if (clickUpgrades[cu.id]) {
      base += cu.stammarPerClickBonus
    }
  }

  // Add tech tree upgrade effects that boost stammarPerClick
  for (const [id, state] of Object.entries(upgrades)) {
    if (state.purchased || state.count > 0) {
      const data = getUpgradeData(id)
      if (data?.effects) {
        for (const eff of data.effects) {
          if (eff.type === 'stammarPerClick') {
            base += eff.value
          }
        }
      }
    }
  }

  return base
}

// ── Store ──

export type GameStore = GameState & GameActions

export const useGameStore = create<GameStore>()((set, get) => ({
  ...INITIAL_STATE,

  tick: (now: number) => {
    const state = get()
    const dt = (now - state.lastTickAt) / 1000

    if (dt <= 0 || dt > 60) return

    const newTotalPlayTime = state.totalPlayTime + dt

    // Calculate stammar from generators with lobby boost
    const baseStammarPS = computeBaseStammarPerSecond(state.generators)
    const lobbyBoost = getLobbyGeneratorBoost(state.lobbyProjects)
    const stammarPS = baseStammarPS * lobbyBoost

    // Calculate kapital conversion with ownerTrust modifier + lobby kapital boost
    const conversionRate = getKapitalConversionRate(state.phase)
    const trustModifier = getOwnerTrustModifier(state.ownerTrust)
    const kapitalBoost = getLobbyKapitalBoost(state.lobbyProjects)
    const kapitalRate = stammarPS * conversionRate * trustModifier * kapitalBoost

    const stammarGained = stammarPS * dt
    const kapitalGained = kapitalRate * dt

    // Update hidden variables
    const co2Gain = stammarGained * 0.05
    const ownerShare = kapitalGained * 0.08
    const industryShare = kapitalGained * 0.92
    const biodivLoss = stammarGained * 0.0001

    const updates: Partial<GameState> = {
      stammar: state.stammar + stammarGained,
      stammarPerSecond: stammarPS,
      totalStammar: state.totalStammar + stammarGained,
      kapital: state.kapital + kapitalGained,
      realCO2: state.realCO2 + co2Gain,
      ownerProfit: state.ownerProfit + ownerShare,
      industryProfit: state.industryProfit + industryShare,
      biodiversity: Math.max(0, state.biodiversity - biodivLoss),
      totalPlayTime: newTotalPlayTime,
      lastTickAt: now,
    }

    // Check phase transition
    if (!state.pendingTransition) {
      const nextPhase = checkPhaseTransition(state)
      if (nextPhase !== null) {
        updates.pendingTransition = { from: state.phase, to: nextPhase }
      }
    }

    // Check event triggers
    if (checkEventTrigger(state, now)) {
      const event = selectEvent(state, ALL_EVENTS)
      if (event) {
        updates.activeEvent = event
        updates.nextEventAt = scheduleNextEvent(state.phase, now)
      } else {
        updates.nextEventAt = now + 30_000
      }
    }

    // ── Antagonist system ──
    // Check for newly triggered antagonists
    const currentState = { ...state, ...updates } as GameState
    const newlyTriggered = checkAntagonistTriggers(currentState)
    if (newlyTriggered.length > 0) {
      const newAntagonists = { ...state.antagonists }
      for (const id of newlyTriggered) {
        newAntagonists[id] = { active: true, countered: false }
      }
      updates.antagonists = newAntagonists
    }

    // Apply tick effects from active, uncountered antagonists
    const imageProtection = getLobbyImageProtection(state.lobbyProjects)
    for (const ant of ANTAGONISTS) {
      const antState = (updates.antagonists ?? state.antagonists)[ant.id]
      if (!antState?.active || antState.countered) continue
      for (const eff of ant.tickEffects) {
        const amount = eff.perSecond * dt
        if (eff.resource === 'image') {
          updates.image = Math.max(0, Math.min(100, (updates.image ?? state.image) + amount * imageProtection))
        } else if (eff.resource === 'stammar') {
          // Don't let antagonists make stammar go negative
          updates.stammar = Math.max(0, (updates.stammar ?? state.stammar) + amount)
        } else if (eff.resource === 'kapital') {
          updates.kapital = Math.max(0, (updates.kapital ?? state.kapital) + amount)
        }
      }
    }

    // Species counting: lose species when biodiversity drops past thresholds
    const newBiodiv = updates.biodiversity ?? state.biodiversity
    const oldBiodiv = state.biodiversity
    const speciesThresholds = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5]
    let speciesGain = 0
    for (const threshold of speciesThresholds) {
      if (oldBiodiv > threshold && newBiodiv <= threshold) {
        speciesGain++
      }
    }
    if (speciesGain > 0) {
      updates.species = (state.species ?? 0) + speciesGain
    }

    // Sami land loss tied to stammar production in later phases
    if (state.phase >= 3) {
      const samiRate = stammarPS * 0.00002
      updates.samiLand = (updates.samiLand ?? state.samiLand) + samiRate * dt
    }

    set(updates as Partial<GameStore>)
  },

  click: () => {
    set(state => ({
      stammar: state.stammar + state.stammarPerClick,
      totalStammar: state.totalStammar + state.stammarPerClick,
      clickCount: state.clickCount + 1,
      // Small kapital per click too (like selling the plan)
      kapital: state.kapital + state.stammarPerClick * 0.005,
    }))
  },

  buyGenerator: (id: string) => {
    const state = get()
    const data = getGeneratorData(id)
    if (!data) return

    const current = state.generators[id]
    const count = current?.count ?? 0
    const cost = getGeneratorCost(data.baseCost, count)

    if (state.stammar < cost) return

    set({
      stammar: state.stammar - cost,
      generators: {
        ...state.generators,
        [id]: {
          count: count + 1,
          unlocked: true,
        },
      },
    } as Partial<GameStore>)
  },

  buyClickUpgrade: (id: string) => {
    const state = get()
    const data = getClickUpgrade(id)
    if (!data) return
    if (state.clickUpgrades[id]) return // already purchased

    if (state.kapital < data.cost) return

    const newClickUpgrades = { ...state.clickUpgrades, [id]: true }
    const newStammarPerClick = computeStammarPerClick(newClickUpgrades, state.upgrades)

    set({
      kapital: state.kapital - data.cost,
      clickUpgrades: newClickUpgrades,
      stammarPerClick: newStammarPerClick,
    } as Partial<GameStore>)
  },

  purchaseUpgrade: (id: string) => {
    const state = get()
    const data = getUpgradeData(id)
    if (!data) return

    const currentUpgrade = state.upgrades[id]
    const count = currentUpgrade?.count ?? 0
    if (count >= data.maxCount) return

    const cost = calculateUpgradeCost(data.baseCost, count)
    const resource = data.costResource as keyof GameState
    const current = state[resource]
    if (typeof current !== 'number' || current < cost) return

    const newUpgrades = {
      ...state.upgrades,
      [id]: {
        purchased: count + 1 >= data.maxCount,
        count: count + 1,
        unlocked: true,
      },
    }

    // Recalculate stammarPerClick in case this upgrade has click effects
    const newStammarPerClick = computeStammarPerClick(state.clickUpgrades, newUpgrades)

    set({
      [resource]: current - cost,
      upgrades: newUpgrades,
      stammarPerClick: newStammarPerClick,
    } as Partial<GameStore>)
  },

  unlockUpgrade: (id: string) => {
    set(state => ({
      upgrades: {
        ...state.upgrades,
        [id]: { ...(state.upgrades[id] ?? { purchased: false, count: 0, unlocked: false }), unlocked: true },
      },
    }))
  },

  buyLobbyEarner: (id: string) => {
    const state = get()
    const data = getLobbyEarner(id)
    if (!data) return
    if (data.unlockPhase > state.phase) return

    // Apply lobby discount from purchased projects
    const discount = getLobbyDiscount(state.lobbyProjects)
    const cost = Math.floor(data.cost * (1 - discount))

    if (state.kapital < cost) return

    const current = state.lobbyProjects[id]
    set({
      kapital: state.kapital - cost,
      lobby: state.lobby + data.pkReward,
      lobbyProjects: {
        ...state.lobbyProjects,
        [id]: {
          purchased: false, // earners are repeatable, not "purchased"
          count: (current?.count ?? 0) + 1,
          unlocked: true,
        },
      },
    } as Partial<GameStore>)
  },

  buyLobbyProject: (id: string) => {
    const state = get()
    const data = getLobbyPurchase(id)
    if (!data) return
    if (data.unlockPhase > state.phase) return
    if (state.lobbyProjects[id]?.purchased) return // already purchased (one-time)

    if (state.lobby < data.cost) return

    set({
      lobby: state.lobby - data.cost,
      lobbyProjects: {
        ...state.lobbyProjects,
        [id]: {
          purchased: true,
          count: 1,
          unlocked: true,
        },
      },
    } as Partial<GameStore>)
  },

  performOwnerAction: (id: string) => {
    const state = get()
    const data = getOwnerAction(id)
    if (!data) return

    // Check cooldown
    const cooldownUntil = state.ownerActionCooldowns[id] ?? 0
    if (Date.now() < cooldownUntil) return

    // Check cost
    const costResource = data.costResource as keyof GameState
    const currentResource = state[costResource]
    if (typeof currentResource !== 'number' || currentResource < data.cost) return

    // Apply trust change with floor from lobby projects
    const trustFloor = getOwnerTrustFloor(state.lobbyProjects)
    let newTrust = Math.max(0, Math.min(100, state.ownerTrust + data.trustChange))
    newTrust = Math.max(trustFloor, newTrust)

    const updates: Partial<GameState> = {
      [costResource]: currentResource - data.cost,
      ownerTrust: newTrust,
      ownerActionCooldowns: {
        ...state.ownerActionCooldowns,
        [id]: Date.now() + data.cooldownSeconds * 1000,
      },
    }

    // Apply side effects
    for (const effect of data.sideEffects) {
      const key = effect.resource as keyof GameState
      const val = state[key]
      if (typeof val !== 'number') continue

      if (effect.type === 'add') {
        updates[key as 'stammar' | 'kapital' | 'image' | 'lobby'] = val + effect.amount
      } else if (effect.type === 'multiply') {
        updates[key as 'stammar' | 'kapital' | 'image' | 'lobby'] = val * effect.amount
      }
    }

    // Clamp image to 0-100
    if (typeof updates.image === 'number') {
      updates.image = Math.max(0, Math.min(100, updates.image))
    }

    set(updates as Partial<GameStore>)
  },

  buyPRCampaign: (id: string) => {
    const state = get()
    const data = getPRCampaign(id)
    if (!data) return

    if (state.kapital < data.cost) return

    // Apply image protection modifier (less effective recovery if image is very low)
    const newImage = Math.min(100, state.image + data.imageGain)

    set({
      kapital: state.kapital - data.cost,
      image: newImage,
    } as Partial<GameStore>)
  },

  counterAntagonist: (id: string) => {
    const state = get()
    const ant = getAntagonist(id)
    if (!ant) return

    const antState = state.antagonists[id]
    if (!antState?.active || antState.countered) return

    // Check cost
    const costResource = ant.counterCost.resource as keyof GameState
    const current = state[costResource]
    if (typeof current !== 'number' || current < ant.counterCost.amount) return

    set({
      [costResource]: current - ant.counterCost.amount,
      antagonists: {
        ...state.antagonists,
        [id]: { active: true, countered: true },
      },
    } as Partial<GameStore>)
  },

  resolveEvent: (choiceIndex: number) => {
    const state = get()
    if (!state.activeEvent) return

    const choice = state.activeEvent.choices[choiceIndex]
    if (!choice) return

    // Apply image protection from lobby projects
    const imageProtection = getLobbyImageProtection(state.lobbyProjects)

    for (const effect of choice.effects) {
      // Apply lobby image protection to image losses
      if (effect.resource === 'image' && effect.type === 'add' && effect.amount < 0) {
        get().applyEffect({
          ...effect,
          amount: Math.round(effect.amount * imageProtection),
        })
      } else {
        get().applyEffect(effect)
      }
    }

    set(state => {
      const [next, ...rest] = state.eventQueue
      return {
        eventHistory: [...state.eventHistory, state.activeEvent!.id],
        activeEvent: next ?? null,
        eventQueue: next ? rest : state.eventQueue,
      }
    })
  },

  dismissEvent: () => {
    set(state => {
      const [next, ...rest] = state.eventQueue
      return {
        activeEvent: next ?? null,
        eventQueue: next ? rest : state.eventQueue,
      }
    })
  },

  save: () => {
    const state = get()
    saveGame(state)
    set({ lastSaveAt: Date.now() })
  },

  load: () => {
    const saved = loadGame()
    if (saved) {
      set({ ...saved, lastTickAt: Date.now() })
      return true
    }
    return false
  },

  reset: () => {
    const now = Date.now()
    set({
      ...INITIAL_STATE,
      startedAt: now,
      lastTickAt: now,
      lastSaveAt: now,
      nextEventAt: now + 120_000,
      pendingTransition: null,
    })
  },

  setPhase: (phase: Phase) => {
    set({ phase })
  },

  triggerPhaseTransition: (from: Phase, to: Phase) => {
    set({ pendingTransition: { from, to } })
  },

  completePhaseTransition: () => {
    const state = get()
    const transition = state.pendingTransition
    if (!transition) return

    const updates: Partial<GameState> = {
      phase: transition.to,
      pendingTransition: null,
    }

    set(updates as Partial<GameStore>)
    get().save()
  },

  updateSettings: (updates: Partial<GameSettings>) => {
    set(state => ({
      settings: { ...state.settings, ...updates },
    }))
  },

  applyEffect: (effect: Effect) => {
    set(state => {
      const key = effect.resource as keyof GameState
      const current = state[key]
      if (typeof current !== 'number') return state

      let newValue: number
      switch (effect.type) {
        case 'add':
          newValue = current + effect.amount
          break
        case 'multiply':
          newValue = current * effect.amount
          break
        case 'set':
          newValue = effect.amount
          break
      }

      return { [key]: newValue } as Partial<GameState>
    })
  },
}))
