import { create } from 'zustand'
import type { GameState, GameActions, Phase, Effect, GameSettings } from './types'
import { saveGame, loadGame, backupSave, loadBackup, deleteSave } from '../engine/save'
import { calculateUpgradeCost, getKapitalConversionRate, getOwnerTrustModifier } from '../engine/formulas'
import { checkEventTrigger, selectEvent, scheduleNextEvent } from '../engine/events'
import { checkPhaseTransition, getOwnerPhase } from '../engine/phases'
import { PHASE1_EVENTS } from '../data/phase1/events'
import { PHASE2_EVENTS } from '../data/phase2/events'
import { PHASE2_NEW_EVENTS } from '../data/phase2/newEvents'
import { PHASE3_EVENTS } from '../data/phase3/events'
import { PHASE5_EVENTS } from '../data/phase5/events'
import { PHASE5_NEW_EVENTS } from '../data/phase5/newEvents'
import { PHASE7_EVENTS } from '../data/phase7/events'
import { COUNTRY_EVENTS } from '../data/phase7/countryEvents'
import { PHASE8_EVENTS } from '../data/phase8/events'
import { PHASE10_NEW_EVENTS } from '../data/phase10/events'
import { getGeneratorData, getGeneratorCost } from '../data/generators'
import { getClickUpgrade, CLICK_UPGRADES } from '../data/clickUpgrades'
import { getUpgradeData } from '../data/upgradeRegistry'
import { getLobbyEarner, getLobbyPurchase, computeLobbyModifiers, type LobbyModifiers } from '../data/lobbyProjects'
import { getOwnerAction } from '../data/ownerActions'
import { getPRCampaign } from '../data/ownerActions'
import { checkAntagonistTriggers, getAntagonist, getScaledCounterCost } from '../data/antagonists'
import { getExpansionTarget, EXPANSION_TARGETS } from '../data/expansionTargets'
import { calculateWarningLevel, getWarningPenalty } from '../engine/warnings'
import { getCountry, computeCountryRewards } from '../data/countries'
import {
  computeExpansionTotals,
  computeCountryTotals,
  computeSynergyEffects,
  computeGeneratorSideEffects,
  processCountryInvasions,
  processAntagonistEscalation,
  computeAntagonistDeltas,
  computeEntropyDrain,
  computeSpeciesLoss,
  processExpansionMechanics,
} from '../engine/tickHelpers'
import { getOwnerGeneratorData, getOwnerGeneratorCost } from '../data/ownerGenerators'
import { OWNER_CLICK_UPGRADES, getOwnerClickUpgrade } from '../data/ownerClickUpgrades'
import { getKnowledgeActivity } from '../data/ownerKnowledge'
import { computeKnowledgeModifiers, getOwnerKnowledgeUpgrade, type KnowledgeModifiers } from '../data/ownerKnowledgeTree'
import { INDUSTRY_ATTACKS, getIndustryAttack } from '../data/industryAttacks'
import { INDUSTRY_LURES, getIndustryLure } from '../data/industryLures'
import { OWNER_EVENTS } from '../data/ownerEvents'

export const ALL_EVENTS = [
  ...PHASE1_EVENTS,
  ...PHASE2_EVENTS,
  ...PHASE2_NEW_EVENTS,
  ...PHASE3_EVENTS,
  ...PHASE5_EVENTS,
  ...PHASE5_NEW_EVENTS,
  ...PHASE7_EVENTS,
  ...COUNTRY_EVENTS,
  ...PHASE8_EVENTS,
  ...PHASE10_NEW_EVENTS,
]

// ── Initial State ──

const now = Date.now()

export const INITIAL_STATE: GameState = {
  gameMode: null,
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
  expansionTargets: {},

  ownerActionCooldowns: {},
  countries: {},
  warningLevel: 0,
  entropi: 100,

  eventQueue: [],
  eventHistory: [],
  activeEvent: null,
  nextEventAt: now + 120_000,
  lastEventFiredAt: {},

  achievements: {},

  pendingTransition: null,

  settings: {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    notificationsEnabled: true,
    theme: 'default',
  },

  // Owner (Skogsägare) path
  skogsvardering: 0,
  skogsvarderingPerSecond: 0,
  skogsvarderingPerClick: 1,
  inkomst: 0,
  kunskap: 0,
  resiliens: 10,

  biodivOwner: 5,
  realCarbonPos: 0,
  legacy: 0,
  deadwood: 0,

  ownerClickCount: 0,
  totalSkogsvardering: 0,

  ownerGenerators: {},
  ownerClickUpgrades: {},

  ownerAttacksResisted: {},
  ownerAttacksSurrendered: {},
  ownerLuresDeclined: 0,
  ownerLuresAccepted: {},

  activeIndustryAttack: null,
  activeIndustryLure: null,

  ownerKnowledgeUpgrades: {},

  lastKnowledgeActivityAt: 0,
  ownerPhase: 1,

  // Sprint 10: Game Feel
  entropyPurchases: {},
  milestonesSeen: {},
  epilogChosen: false,
  gameSpeed: 1,
  goldenMultiplierUntil: 0,
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

// ── Cached lobby modifiers (recomputed on buyLobbyProject/load/reset) ──
let lobbyMods: LobbyModifiers = computeLobbyModifiers({})

function refreshLobbyModifiers(lobbyProjects: GameState['lobbyProjects']) {
  lobbyMods = computeLobbyModifiers(lobbyProjects)
}

// ── Cached upgrade modifiers (recomputed on purchaseUpgrade/load/reset) ──
interface UpgradeModifiers {
  gpsMultiplier: number
  flatStammarPS: number
  flatKapitalPS: number
}

let upgradeMods: UpgradeModifiers = { gpsMultiplier: 1, flatStammarPS: 0, flatKapitalPS: 0 }

function refreshUpgradeModifiers(upgrades: GameState['upgrades']) {
  let mult = 1
  let stamPS = 0
  let kapPS = 0

  for (const [id, state] of Object.entries(upgrades)) {
    if (state.purchased || state.count > 0) {
      const data = getUpgradeData(id)
      if (data?.effects) {
        const count = state.count || 1
        for (const eff of data.effects) {
          if (eff.type === 'gpsMultiplier') mult *= eff.value
          else if (eff.type === 'stammarPerSecond') stamPS += eff.value * count
          else if (eff.type === 'kapitalPerSecond') kapPS += eff.value * count
        }
      }
    }
  }

  upgradeMods = { gpsMultiplier: mult, flatStammarPS: stamPS, flatKapitalPS: kapPS }
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

// ── Cached knowledge modifiers (recomputed on purchaseOwnerKnowledge/load/reset) ──
let knowledgeMods: KnowledgeModifiers = computeKnowledgeModifiers({})

// Cooldown between industry attacks/lures (module-level, not saved)
let lastAttackResolvedAt = 0

// Golden opportunity multiplier value (set when activated, applied in tick)
let goldenMultiplierValue = 3

function refreshKnowledgeModifiers(upgrades: Record<string, boolean>) {
  knowledgeMods = computeKnowledgeModifiers(upgrades)
}

// ── Owner (Skogsägare) Helpers ──

/** Calculate total skogsvardering/s from all owner generators */
function computeOwnerSkogsvarderingPS(generators: GameState['ownerGenerators']): number {
  let total = 0
  for (const [id, gen] of Object.entries(generators)) {
    if (gen.count > 0) {
      const data = getOwnerGeneratorData(id)
      if (data) total += gen.count * data.svPerSecond
    }
  }
  return total
}

/** Calculate total inkomst/s from all owner generators */
function computeOwnerInkomstPS(generators: GameState['ownerGenerators']): number {
  let total = 0
  for (const [id, gen] of Object.entries(generators)) {
    if (gen.count > 0) {
      const data = getOwnerGeneratorData(id)
      if (data) total += gen.count * data.inkomstPerSecond
    }
  }
  return total
}

/** Calculate skogsvarderingPerClick from base + owner click upgrades */
function computeOwnerSVPerClick(ownerClickUpgrades: GameState['ownerClickUpgrades']): number {
  let base = 1
  for (const cu of OWNER_CLICK_UPGRADES) {
    if (ownerClickUpgrades[cu.id]) {
      base += cu.svPerClickBonus
    }
  }
  return base
}

/** Owner path tick — separate from industry tick */
function ownerTick(
  state: GameState,
  dt: number,
  now: number,
  set: (updates: Partial<GameStore>) => void
) {
  const newTotalPlayTime = state.totalPlayTime + dt

  // Passive forest growth: the forest grows on its own (+0.5 sv/s base)
  const passiveGrowth = 0.5
  const generatorSV = computeOwnerSkogsvarderingPS(state.ownerGenerators)
  const baseSVPS = passiveGrowth + generatorSV
  const totalSVPS = baseSVPS * (1 + knowledgeMods.svPerSecondMult)

  const generatorInkomst = computeOwnerInkomstPS(state.ownerGenerators)
  const totalInkomstPS = generatorInkomst * (1 + knowledgeMods.inkomstMult)

  const svGained = totalSVPS * dt
  const inkomstGained = totalInkomstPS * dt

  // Apply generator bonuses
  let genBiodiv = 0
  let genResiliens = 0
  let genCarbon = 0
  let genKunskap = 0
  let genLegacy = 0
  let genDeadwood = 0
  for (const [id, gen] of Object.entries(state.ownerGenerators)) {
    if (gen.count > 0) {
      const data = getOwnerGeneratorData(id)
      if (data?.bonuses) {
        const c = gen.count
        if (data.bonuses.biodiv) genBiodiv += data.bonuses.biodiv * c
        if (data.bonuses.resiliens) genResiliens += data.bonuses.resiliens * c
        if (data.bonuses.carbon) genCarbon += data.bonuses.carbon * c
        if (data.bonuses.kunskap) genKunskap += data.bonuses.kunskap * c
        if (data.bonuses.legacy) genLegacy += data.bonuses.legacy * c
        if (data.bonuses.deadwood) genDeadwood += data.bonuses.deadwood * c
      }
    }
  }

  // Biodiversity: base from deadwood + resilience + generator bonuses + knowledge tree
  const biodivGrowth = (state.deadwood * 0.001 + state.resiliens * 0.0005 + genBiodiv + knowledgeMods.biodivRate) * dt
  // Resilience: base from biodiv + generator bonuses + knowledge tree
  const resiliensGrowth = (state.biodivOwner * 0.0002 + genResiliens + knowledgeMods.resiliensRate) * dt
  // Carbon storage: base from standing forest + generator bonuses
  const carbonGrowth = (totalSVPS * 0.01 + genCarbon) * dt
  // Deadwood: grows from generators
  const deadwoodGrowth = genDeadwood * dt
  // Kunskap: passive observation + generators (kooperativ)
  const kunskapGrowth = (0.05 + genKunskap) * dt
  // Legacy: base from time + biodiv + resistance + generator bonuses + knowledge tree
  const resistedCount = Object.values(state.ownerAttacksResisted).filter(Boolean).length
  const legacyGrowth = (0.15 + state.biodivOwner * 0.0003 + resistedCount * 0.02 + genLegacy + knowledgeMods.legacyRate) * dt

  const newTotalSV = state.totalSkogsvardering + svGained

  const updates: Partial<GameState> = {
    skogsvardering: state.skogsvardering + svGained,
    skogsvarderingPerSecond: totalSVPS,
    totalSkogsvardering: newTotalSV,
    inkomst: state.inkomst + inkomstGained,
    kunskap: state.kunskap + kunskapGrowth,
    biodivOwner: state.biodivOwner + biodivGrowth,
    resiliens: Math.min(100, state.resiliens + resiliensGrowth),
    realCarbonPos: state.realCarbonPos + carbonGrowth,
    legacy: state.legacy + legacyGrowth,
    deadwood: state.deadwood + deadwoodGrowth,
    totalPlayTime: newTotalPlayTime,
    lastTickAt: now,
  }

  // ── Industry attack triggers (min 45s cooldown between attacks/lures) ──
  if (!state.activeIndustryAttack && !state.activeIndustryLure && !state.activeEvent
    && now - lastAttackResolvedAt >= 45_000) {
    for (const atk of INDUSTRY_ATTACKS) {
      if (state.ownerAttacksResisted[atk.id] || state.ownerAttacksSurrendered[atk.id]) continue
      if (newTotalSV >= atk.triggerSV) {
        updates.activeIndustryAttack = atk.id
        break
      }
    }

    // Industry lure triggers (only if no attack is showing)
    if (!updates.activeIndustryAttack) {
      for (const lure of INDUSTRY_LURES) {
        if (state.ownerLuresAccepted[lure.id]) continue
        // Check if already declined (track by counting - simplified: use lure id in attacksResisted)
        if (state.ownerAttacksResisted[lure.id]) continue
        if (newTotalSV >= lure.triggerSV) {
          updates.activeIndustryLure = lure.id
          break
        }
      }
    }
  }

  // ── Owner phase transitions ──
  const ownerPhaseInfo = getOwnerPhase(newTotalSV)
  if (ownerPhaseInfo.phase !== state.ownerPhase) {
    updates.ownerPhase = ownerPhaseInfo.phase
  }

  // ── Owner event triggers ──
  if (!updates.activeIndustryAttack && !updates.activeIndustryLure
    && !state.activeIndustryAttack && !state.activeIndustryLure
    && !state.activeEvent && checkEventTrigger(state, now)) {
    const event = selectEvent(state, OWNER_EVENTS)
    if (event) {
      updates.activeEvent = event
      updates.nextEventAt = scheduleNextEvent(1, now)
    } else {
      updates.nextEventAt = now + 30_000
    }
  }

  set(updates as Partial<GameStore>)
}

// ── Store ──

export type GameStore = GameState & GameActions

export const useGameStore = create<GameStore>()((set, get) => ({
  ...INITIAL_STATE,

  tick: (now: number) => {
    const state = get()
    const rawDt = (now - state.lastTickAt) / 1000

    if (rawDt <= 0 || rawDt > 60) return

    // Apply game speed multiplier (fast-forward)
    const dt = rawDt * state.gameSpeed

    // Skip tick if no game mode selected yet
    if (!state.gameMode) {
      set({ lastTickAt: now })
      return
    }

    // Route to owner tick if in owner mode
    if (state.gameMode === 'owner') {
      ownerTick(state, dt, now, set)
      return
    }

    const newTotalPlayTime = state.totalPlayTime + dt

    // Calculate warning level and apply penalties
    const warningLevel = calculateWarningLevel(state)
    const warningPenalty = getWarningPenalty(warningLevel)

    // Calculate stammar from generators with lobby boost, upgrade multipliers, warning penalty, synergies, and country rewards
    const baseStammarPS = computeBaseStammarPerSecond(state.generators)
    const lobbyBoost = lobbyMods.generatorBoost

    // Calculate country unique rewards
    const countryRewards = computeCountryRewards(state.countries)

    // Calculate synergy multipliers
    const synergies = computeSynergyEffects(state.generators)

    const stammarPS = (baseStammarPS * lobbyBoost * upgradeMods.gpsMultiplier * synergies.stammarMult * countryRewards.generatorEfficiency * countryRewards.stammarMultiplier + upgradeMods.flatStammarPS) * warningPenalty

    // Aggregate expansion target and country production/maintenance
    const expansion = computeExpansionTotals(state.expansionTargets)
    const country = computeCountryTotals(state.countries)

    // Calculate kapital conversion with ownerTrust modifier + lobby kapital boost
    const conversionRate = getKapitalConversionRate(state.phase)
    const trustModifier = getOwnerTrustModifier(state.ownerTrust)
    const kapitalBoost = lobbyMods.kapitalBoost
    // Apply golden opportunity multiplier if active
    const goldenMult = (state.goldenMultiplierUntil > now) ? goldenMultiplierValue : 1
    const totalStammarPS = (stammarPS + expansion.stammarPS + country.stammarPS) * goldenMult
    const kapitalRate = stammarPS * goldenMult * conversionRate * trustModifier * kapitalBoost * synergies.kapitalMult * countryRewards.kapitalMultiplier + upgradeMods.flatKapitalPS + expansion.kapitalPS + country.kapitalPS - country.kapitalCost - expansion.kapitalCost

    const stammarGained = totalStammarPS * dt
    const kapitalGained = kapitalRate * dt

    // Generator side effects (image/lobby/biodiversity)
    const sideEffects = computeGeneratorSideEffects(state.generators, dt)
    const totalSideImage = sideEffects.image + synergies.imagePS * dt + countryRewards.imagePerSecond * dt

    // Update hidden variables (include expansion + country hidden costs)
    const co2Gain = stammarGained * 0.05 + expansion.co2 * dt + country.co2 * dt
    const ownerShare = kapitalGained * 0.08
    const industryShare = kapitalGained * 0.92
    const biodivLoss = stammarGained * 0.0001 + expansion.biodivLoss * dt + country.biodivLoss * dt - sideEffects.biodiversity

    const updates: Partial<GameState> = {
      stammar: state.stammar + stammarGained,
      stammarPerSecond: totalStammarPS,
      totalStammar: state.totalStammar + stammarGained,
      kapital: state.kapital + kapitalGained,
      lobby: Math.max(0, state.lobby - (country.lobbyCost + expansion.lobbyCost) * dt + countryRewards.lobbyPerSecond * dt),
      warningLevel,
      realCO2: state.realCO2 + co2Gain,
      ownerProfit: state.ownerProfit + ownerShare,
      industryProfit: state.industryProfit + industryShare,
      biodiversity: Math.max(0, state.biodiversity - biodivLoss),
      totalPlayTime: newTotalPlayTime,
      lastTickAt: now,
    }

    // Apply generator side effects to updates
    if (totalSideImage !== 0) {
      updates.image = Math.max(0, Math.min(100, (updates.image ?? state.image) + totalSideImage))
    }
    if (sideEffects.lobby !== 0) {
      updates.lobby = Math.max(0, (updates.lobby ?? state.lobby) + sideEffects.lobby)
    }

    // Check phase transition
    if (!state.pendingTransition) {
      const nextPhase = checkPhaseTransition(state)
      if (nextPhase !== null) {
        updates.pendingTransition = { from: state.phase, to: nextPhase }
      }
    }

    // Check event triggers (skip during phase transitions and active invasions)
    const hasActiveInvasion = Object.values(state.countries).some(cs => cs.status === 'invading')
    if (!updates.pendingTransition && !state.pendingTransition && !hasActiveInvasion && checkEventTrigger(state, now)) {
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
    const antagonistsNeedUpdate = newlyTriggered.length > 0
    const newAntagonists = antagonistsNeedUpdate ? { ...state.antagonists } : state.antagonists

    if (antagonistsNeedUpdate) {
      for (const id of newlyTriggered) {
        newAntagonists[id] = { active: true, countered: false, activatedAt: now }
      }
      updates.antagonists = newAntagonists
    }

    // Check for antagonist escalation (active >5 min)
    const antagonistSource = updates.antagonists ?? state.antagonists
    const escalatedAnts = processAntagonistEscalation(antagonistSource, now)
    if (escalatedAnts) updates.antagonists = escalatedAnts

    // Apply tick effects from active antagonists
    const activeAnts = updates.antagonists ?? state.antagonists
    const antDeltas = computeAntagonistDeltas(activeAnts, dt, lobbyMods.imageProtection)
    if (antDeltas.image !== 0) {
      updates.image = Math.max(0, Math.min(100, (updates.image ?? state.image) + antDeltas.image))
    }
    if (antDeltas.stammar !== 0) {
      updates.stammar = Math.max(0, (updates.stammar ?? state.stammar) + antDeltas.stammar)
    }
    if (antDeltas.kapital !== 0) {
      updates.kapital = Math.max(0, (updates.kapital ?? state.kapital) + antDeltas.kapital)
    }

    // Country invasion tick
    const updatedCountries = processCountryInvasions(state.countries, dt)
    if (updatedCountries) updates.countries = updatedCountries

    // Expansion mechanics tick (in-progress targets)
    const expMechanics = processExpansionMechanics(
      updates.expansionTargets ?? state.expansionTargets,
      dt,
      now,
      totalStammarPS,
    )
    if (expMechanics.targets !== (updates.expansionTargets ?? state.expansionTargets)) {
      updates.expansionTargets = expMechanics.targets
    }
    // Apply entropy reduction for completed targets
    let entropyDrop = 0
    for (const completedId of expMechanics.completedIds) {
      const targetDef = EXPANSION_TARGETS.find(t => t.id === completedId)
      if (targetDef) entropyDrop += targetDef.entropyReduction
    }

    // Entropy creep (phase 10+)
    const hasInProgressTarget = Object.values(updates.expansionTargets ?? state.expansionTargets)
      .some(ts => ts.status === 'in_progress')
    let newEntropi = computeEntropyDrain(state.entropi, state.phase, totalStammarPS, state.entropyPurchases, dt, hasInProgressTarget)
    // Apply entropy drops from completed targets
    if (entropyDrop > 0) {
      newEntropi = Math.max(0, newEntropi - entropyDrop)
    }
    if (newEntropi !== state.entropi) updates.entropi = newEntropi

    // Species counting
    const newBiodiv = updates.biodiversity ?? state.biodiversity
    const speciesGain = computeSpeciesLoss(state.biodiversity, newBiodiv)
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

  ownerClick: () => {
    set(state => {
      const effectiveSVPerClick = state.skogsvarderingPerClick * (1 + knowledgeMods.svPerClickMult)
      return {
        skogsvardering: state.skogsvardering + effectiveSVPerClick,
        totalSkogsvardering: state.totalSkogsvardering + effectiveSVPerClick,
        ownerClickCount: state.ownerClickCount + 1,
        // Small inkomst per click (selling carefully selected timber)
        inkomst: state.inkomst + effectiveSVPerClick * 0.01,
      }
    })
  },

  setGameMode: (mode: 'industry' | 'owner') => {
    set({ gameMode: mode })
    get().save()
  },

  buyOwnerGenerator: (id: string) => {
    const state = get()
    const data = getOwnerGeneratorData(id)
    if (!data) return

    const current = state.ownerGenerators[id]
    const count = current?.count ?? 0
    const cost = getOwnerGeneratorCost(data.baseCost, count, data.costScale)

    if (state.skogsvardering < cost) return

    set({
      skogsvardering: state.skogsvardering - cost,
      ownerGenerators: {
        ...state.ownerGenerators,
        [id]: { count: count + 1, unlocked: true },
      },
    } as Partial<GameStore>)
  },

  buyOwnerClickUpgrade: (id: string) => {
    const state = get()
    const data = getOwnerClickUpgrade(id)
    if (!data) return
    if (state.ownerClickUpgrades[id]) return

    if (state.inkomst < data.cost) return

    const newUpgrades = { ...state.ownerClickUpgrades, [id]: true }
    const newSVPerClick = computeOwnerSVPerClick(newUpgrades)

    const updates: Partial<GameState> = {
      inkomst: state.inkomst - data.cost,
      ownerClickUpgrades: newUpgrades,
      skogsvarderingPerClick: newSVPerClick,
    }

    // Apply one-time bonuses
    if (data.bonuses?.kunskap) {
      updates.kunskap = state.kunskap + data.bonuses.kunskap
    }
    if (data.bonuses?.biodiv) {
      updates.biodivOwner = state.biodivOwner + data.bonuses.biodiv
    }

    set(updates as Partial<GameStore>)
  },

  buyKnowledgeActivity: (id: string) => {
    const state = get()
    const data = getKnowledgeActivity(id)
    if (!data) return

    if (state.inkomst < data.cost) return

    // 15-second global cooldown between knowledge activity purchases
    const now = Date.now()
    if (now - state.lastKnowledgeActivityAt < 15_000) return

    set({
      inkomst: state.inkomst - data.cost,
      kunskap: state.kunskap + data.kunskapReward,
      lastKnowledgeActivityAt: now,
    } as Partial<GameStore>)
  },

  purchaseOwnerKnowledge: (id: string) => {
    const state = get()
    if (state.ownerKnowledgeUpgrades[id]) return // already purchased

    const upgrade = getOwnerKnowledgeUpgrade(id)
    if (!upgrade) return

    // Check kunskap cost
    if (state.kunskap < upgrade.cost) return

    // Check svRequired gate
    if (upgrade.svRequired && state.totalSkogsvardering < upgrade.svRequired) return

    // Check prerequisites
    for (const prereq of upgrade.prerequisites) {
      if (!state.ownerKnowledgeUpgrades[prereq]) return
    }

    const newUpgrades = { ...state.ownerKnowledgeUpgrades, [id]: true }
    refreshKnowledgeModifiers(newUpgrades)

    set({
      kunskap: state.kunskap - upgrade.cost,
      ownerKnowledgeUpgrades: newUpgrades,
    } as Partial<GameStore>)
  },

  resolveIndustryAttack: (accept: boolean) => {
    const state = get()
    const attackId = state.activeIndustryAttack
    if (!attackId) return

    const atk = getIndustryAttack(attackId)
    if (!atk) return

    lastAttackResolvedAt = state.lastTickAt

    if (accept) {
      // Player surrenders to the attack
      const updates: Partial<GameState> = {
        activeIndustryAttack: null,
        ownerAttacksSurrendered: { ...state.ownerAttacksSurrendered, [attackId]: true },
      }
      if (atk.acceptEffects.skogsvardering) {
        updates.skogsvardering = state.skogsvardering * atk.acceptEffects.skogsvardering
      }
      // Sprint 12: accept inkomst = max(fixedBonus, 5% of totalSV) — always tempting
      const scaledInkomst = Math.max(atk.acceptEffects.inkomstBonus ?? 0, state.totalSkogsvardering * 0.05)
      if (scaledInkomst > 0) {
        updates.inkomst = (updates.inkomst ?? state.inkomst) + scaledInkomst
      }
      if (atk.acceptEffects.resiliensPenalty) {
        updates.resiliens = Math.max(0, state.resiliens - atk.acceptEffects.resiliensPenalty)
      }
      if (atk.acceptEffects.legacyPenalty) {
        updates.legacy = state.legacy - atk.acceptEffects.legacyPenalty
      }
      set(updates as Partial<GameStore>)
    } else {
      // Player resists (requires kunskap, optionally inkomst)
      // Apply attack resistance from knowledge tree
      const effectiveKunskapReq = Math.floor(atk.kunskapRequired * (1 - knowledgeMods.attackResistance))
      if (state.kunskap < effectiveKunskapReq) return
      if (atk.extraCostResource === 'inkomst' && atk.extraCostAmount && state.inkomst < atk.extraCostAmount) return

      const updates: Partial<GameState> = {
        activeIndustryAttack: null,
        ownerAttacksResisted: { ...state.ownerAttacksResisted, [attackId]: true },
        kunskap: state.kunskap + 10, // you learn from standing your ground
        legacy: state.legacy + 25, // bonus legacy for standing firm
      }
      if (atk.extraCostResource === 'inkomst' && atk.extraCostAmount) {
        updates.inkomst = state.inkomst - atk.extraCostAmount
      }
      set(updates as Partial<GameStore>)
    }
  },

  resolveIndustryLure: (accept: boolean) => {
    const state = get()
    const lureId = state.activeIndustryLure
    if (!lureId) return

    const lure = getIndustryLure(lureId)
    if (!lure) return

    lastAttackResolvedAt = state.lastTickAt

    if (accept) {
      // Player fell for the trap
      const updates: Partial<GameState> = {
        activeIndustryLure: null,
        ownerLuresAccepted: { ...state.ownerLuresAccepted, [lureId]: true },
      }
      if (lure.acceptEffects.skogsvardering) {
        updates.skogsvardering = state.skogsvardering * lure.acceptEffects.skogsvardering
      }
      if (lure.acceptEffects.resiliensPenalty) {
        updates.resiliens = Math.max(0, state.resiliens - lure.acceptEffects.resiliensPenalty)
      }
      if (lure.acceptEffects.biodivPenalty) {
        updates.biodivOwner = Math.max(0, state.biodivOwner - lure.acceptEffects.biodivPenalty)
      }
      set(updates as Partial<GameStore>)
    } else {
      // Player declined — costs inkomst but gains kunskap/biodiv
      const updates: Partial<GameState> = {
        activeIndustryLure: null,
        ownerLuresDeclined: state.ownerLuresDeclined + 1,
        ownerAttacksResisted: { ...state.ownerAttacksResisted, [lureId]: true },
      }
      if (lure.declineEffects.inkomstCost) {
        const effectiveCost = Math.floor(lure.declineEffects.inkomstCost * (1 - knowledgeMods.lureCostReduction))
        if (state.inkomst < effectiveCost) return // can't afford to decline
        updates.inkomst = state.inkomst - effectiveCost
      }
      if (lure.declineEffects.kunskapGain) {
        updates.kunskap = state.kunskap + lure.declineEffects.kunskapGain
      }
      if (lure.declineEffects.biodivGain) {
        updates.biodivOwner = state.biodivOwner + lure.declineEffects.biodivGain
      }
      set(updates as Partial<GameStore>)
    }
  },

  buyGenerator: (id: string) => {
    const state = get()
    const data = getGeneratorData(id)
    if (!data) return

    const current = state.generators[id]
    const count = current?.count ?? 0
    const cost = getGeneratorCost(data.baseCost, count, data.costScale)

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

    // Check mutually exclusive lock — if the other fork was already purchased, block
    if (data.exclusiveWith) {
      const otherState = state.upgrades[data.exclusiveWith]
      if (otherState?.purchased || (otherState?.count ?? 0) > 0) return
    }

    // Check prerequisites — for fork upgrades, need ANY prerequisite (not all)
    if (data.prerequisites && data.prerequisites.length > 0) {
      const hasForkPrereqs = data.prerequisites.some(prereqId => {
        const prereqData = getUpgradeData(prereqId)
        return prereqData?.exclusiveWith != null // this prereq is part of a fork pair
      })

      if (hasForkPrereqs) {
        // For fork prerequisites: need at least ONE
        const anyMet = data.prerequisites.some(prereqId => {
          const ps = state.upgrades[prereqId]
          return ps?.purchased || (ps?.count ?? 0) > 0
        })
        if (!anyMet) return
      } else {
        // Normal prerequisites: need ALL
        const allMet = data.prerequisites.every(prereqId => {
          const ps = state.upgrades[prereqId]
          return ps?.purchased || (ps?.count ?? 0) > 0
        })
        if (!allMet) return
      }
    }

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
    refreshUpgradeModifiers(newUpgrades)

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
    const discount = lobbyMods.lobbyDiscount
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

    const newLobbyProjects = {
      ...state.lobbyProjects,
      [id]: {
        purchased: true,
        count: 1,
        unlocked: true,
      },
    }
    refreshLobbyModifiers(newLobbyProjects)
    set({
      lobby: state.lobby - data.cost,
      lobbyProjects: newLobbyProjects,
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
    const trustFloor = lobbyMods.ownerTrustFloor
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

    // Calculate scaled cost based on current income
    const scaledAmount = getScaledCounterCost(ant.counterCost, state.stammarPerSecond)
    // Escalated antagonists cost 50% more
    const escalated = antState.escalated ?? false
    const finalAmount = escalated ? Math.floor(scaledAmount * 1.5) : scaledAmount

    const costResource = ant.counterCost.resource as keyof GameState
    const current = state[costResource]
    if (typeof current !== 'number' || current < finalAmount) return

    set({
      [costResource]: current - finalAmount,
      antagonists: {
        ...state.antagonists,
        [id]: { ...antState, countered: true },
      },
    } as Partial<GameStore>)
  },

  startExpansionTarget: (id: string) => {
    const state = get()
    const target = getExpansionTarget(id)
    if (!target) return
    if (target.unlockPhase > state.phase) return
    const existing = state.expansionTargets[id]
    if (existing?.status === 'controlled' || existing?.status === 'in_progress') return

    // Check costs
    if (state.stammar < target.cost.stammar) return
    if (state.kapital < target.cost.kapital) return
    if (state.lobby < target.cost.lobby) return

    // Initialize mechanic sub-state
    let mechanicState: Partial<import('./types').ExpansionTargetState> = {}
    switch (target.mechanicType) {
      case 'supplyChain':
        mechanicState = { supplyChain: { stage: 0, stageProgress: 0 } }
        break
      case 'terraform':
        mechanicState = { terraform: { atmosphere: 0, soil: 0, water: 0, allocation: { atmosphere: 33, soil: 33, water: 34 } } }
        break
      case 'megaproject':
        mechanicState = { megaproject: { progress: 0, bonusesClaimed: 0 } }
        break
      case 'rift':
        mechanicState = { rift: { sacrificePercent: 0, progress: 0 } }
        break
      case 'paradox':
        mechanicState = { paradox: { currentWave: 0, waveProgress: 0, waveStartedAt: Date.now() } }
        break
    }

    set({
      stammar: state.stammar - target.cost.stammar,
      kapital: state.kapital - target.cost.kapital,
      lobby: state.lobby - target.cost.lobby,
      expansionTargets: {
        ...state.expansionTargets,
        [id]: { status: 'in_progress' as const, ...mechanicState },
      },
    } as Partial<GameStore>)
  },

  buyExpansionTarget: (id: string) => {
    // Alias for backwards compatibility
    get().startExpansionTarget(id)
  },

  advanceSupplyChainStage: (id: string) => {
    const state = get()
    const target = getExpansionTarget(id)
    if (!target || target.mechanicType !== 'supplyChain') return
    const ts = state.expansionTargets[id]
    if (!ts || ts.status !== 'in_progress' || !ts.supplyChain) return
    const sc = ts.supplyChain
    // Can't advance if already building (stageStartedAt set and not complete)
    if (sc.stageStartedAt) return
    if (sc.stage >= 3) return

    // Check stage cost
    const stageCost = target.stageCosts?.[sc.stage]
    if (!stageCost) return
    if (state.stammar < stageCost.stammar || state.kapital < stageCost.kapital) return

    set({
      stammar: state.stammar - stageCost.stammar,
      kapital: state.kapital - stageCost.kapital,
      expansionTargets: {
        ...state.expansionTargets,
        [id]: {
          ...ts,
          supplyChain: { ...sc, stageStartedAt: Date.now(), stageProgress: 0 },
        },
      },
    } as Partial<GameStore>)
  },

  setTerraformAllocation: (id: string, alloc: { atmosphere: number; soil: number; water: number }) => {
    const state = get()
    const ts = state.expansionTargets[id]
    if (!ts || ts.status !== 'in_progress' || !ts.terraform) return

    // Clamp and normalize to sum = 100
    const total = alloc.atmosphere + alloc.soil + alloc.water
    const norm = total > 0 ? 100 / total : 0
    const clamped = {
      atmosphere: Math.max(0, Math.round(alloc.atmosphere * norm)),
      soil: Math.max(0, Math.round(alloc.soil * norm)),
      water: Math.max(0, Math.round(alloc.water * norm)),
    }

    set({
      expansionTargets: {
        ...state.expansionTargets,
        [id]: {
          ...ts,
          terraform: { ...ts.terraform, allocation: clamped },
        },
      },
    } as Partial<GameStore>)
  },

  setSacrificePercent: (id: string, percent: number) => {
    const state = get()
    const ts = state.expansionTargets[id]
    if (!ts || ts.status !== 'in_progress' || !ts.rift) return

    const clamped = Math.max(0, Math.min(50, percent))
    set({
      expansionTargets: {
        ...state.expansionTargets,
        [id]: {
          ...ts,
          rift: { ...ts.rift, sacrificePercent: clamped },
        },
      },
    } as Partial<GameStore>)
  },

  invadeCountry: (id: string) => {
    const state = get()
    const def = getCountry(id)
    if (!def) return
    if (def.unlockPhase > state.phase) return
    if (state.countries[id]) return // already invading/controlled

    if (state.stammar < def.invasionCost.stammar) return
    if (state.kapital < def.invasionCost.kapital) return
    if (state.lobby < def.invasionCost.lobby) return

    set({
      stammar: state.stammar - def.invasionCost.stammar,
      kapital: state.kapital - def.invasionCost.kapital,
      lobby: state.lobby - def.invasionCost.lobby,
      countries: {
        ...state.countries,
        [id]: {
          status: 'invading',
          resistance: def.resistance,
          controlProgress: 0,
          pressureAllocation: { kapital: 0, lobby: 0, stammar: 0 },
        },
      },
    } as Partial<GameStore>)
  },

  allocatePressure: (id: string, vector: 'kapital' | 'lobby' | 'stammar', amount: number) => {
    const state = get()
    const cs = state.countries[id]
    if (!cs || cs.status !== 'invading') return

    set({
      countries: {
        ...state.countries,
        [id]: {
          ...cs,
          pressureAllocation: {
            ...cs.pressureAllocation,
            [vector]: Math.max(0, amount),
          },
        },
      },
    } as Partial<GameStore>)
  },

  buyEntropyPurchase: (id: string) => {
    const state = get()
    if (state.entropyPurchases[id]) return
    if (state.phase < 10) return

    const costs: Record<string, { resource: 'kapital' | 'lobby'; amount: number }> = {
      entropy_slow_1: { resource: 'lobby', amount: 50_000 },
      entropy_slow_2: { resource: 'kapital', amount: 500_000_000_000 },
      entropy_slow_3: { resource: 'lobby', amount: 200_000 },
    }
    const cost = costs[id]
    if (!cost) return

    const current = state[cost.resource]
    if (typeof current !== 'number' || current < cost.amount) return

    set({
      [cost.resource]: current - cost.amount,
      entropyPurchases: { ...state.entropyPurchases, [id]: true },
    } as Partial<GameStore>)
  },

  setGameSpeed: (speed: number) => {
    set({ gameSpeed: Math.max(1, Math.min(5, speed)) })
  },

  activateGoldenMultiplier: (durationMs: number, multiplier: number) => {
    goldenMultiplierValue = multiplier
    set({ goldenMultiplierUntil: Date.now() + durationMs })
  },

  markMilestoneSeen: (key: string) => {
    set(state => ({
      milestonesSeen: { ...state.milestonesSeen, [key]: true },
    }))
  },

  resolveEvent: (choiceIndex: number) => {
    const state = get()
    if (!state.activeEvent) return

    const choice = state.activeEvent.choices[choiceIndex]
    if (!choice) return

    // Apply image protection from lobby projects
    const imageProtection = lobbyMods.imageProtection

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
      const eventId = state.activeEvent!.id
      const isReplayable = state.activeEvent!.replayable
      return {
        eventHistory: state.eventHistory.includes(eventId)
          ? state.eventHistory
          : [...state.eventHistory, eventId],
        lastEventFiredAt: isReplayable
          ? { ...state.lastEventFiredAt, [eventId]: Date.now() }
          : state.lastEventFiredAt,
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
      refreshLobbyModifiers(saved.lobbyProjects ?? {})
      refreshUpgradeModifiers(saved.upgrades ?? {})
      refreshKnowledgeModifiers(saved.ownerKnowledgeUpgrades ?? {})
      set({ ...saved, lastTickAt: Date.now() })
      return true
    }
    return false
  },

  loadFromBackup: () => {
    const saved = loadBackup()
    if (saved) {
      refreshLobbyModifiers(saved.lobbyProjects ?? {})
      refreshUpgradeModifiers(saved.upgrades ?? {})
      refreshKnowledgeModifiers(saved.ownerKnowledgeUpgrades ?? {})
      set({ ...saved, lastTickAt: Date.now() })
      // Also restore as main save so autosave continues from here
      saveGame(saved)
      return true
    }
    return false
  },

  reset: () => {
    // Backup current save before resetting (so player can recover)
    backupSave()
    deleteSave()
    refreshLobbyModifiers({})
    refreshUpgradeModifiers({})
    refreshKnowledgeModifiers({})
    const now = Date.now()
    set({
      ...INITIAL_STATE,
      startedAt: now,
      lastTickAt: now,
      lastSaveAt: now,
      nextEventAt: now + 120_000,
      pendingTransition: null,
      expansionTargets: {},
      countries: {},
      warningLevel: 0,
      // Reset owner state
      ownerGenerators: {},
      ownerClickUpgrades: {},
      ownerAttacksResisted: {},
      ownerAttacksSurrendered: {},
      ownerLuresDeclined: 0,
      ownerLuresAccepted: {},
      activeIndustryAttack: null,
      activeIndustryLure: null,
      ownerKnowledgeUpgrades: {},
      lastKnowledgeActivityAt: 0,
      ownerPhase: 1,
      entropyPurchases: {},
      milestonesSeen: {},
      epilogChosen: false,
      gameSpeed: 1,
      goldenMultiplierUntil: 0,
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
