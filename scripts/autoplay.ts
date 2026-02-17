#!/usr/bin/env npx tsx
// ── Silva Maximus — Headless Autoplay Balanstest ──
// Simulates a full industry-path playthrough (phases 1-12 + entropy drain)
// with an AI purchase strategy. Measures phase timing and evaluates balance.
//
// Usage: npx tsx scripts/autoplay.ts

// ── Polyfill localStorage for Node ──
const storage = new Map<string, string>()
;(globalThis as Record<string, unknown>).localStorage = {
  getItem: (k: string) => storage.get(k) ?? null,
  setItem: (k: string, v: string) => storage.set(k, v),
  removeItem: (k: string) => storage.delete(k),
  clear: () => storage.clear(),
  get length() { return storage.size },
  key: (i: number) => [...storage.keys()][i] ?? null,
}

// ── Imports (after polyfill) ──
import { useGameStore } from '../src/store/gameStore'
import { GENERATORS, getGeneratorCost } from '../src/data/generators'
import { CLICK_UPGRADES } from '../src/data/clickUpgrades'
import { getAllUpgrades } from '../src/data/upgradeRegistry'
import { LOBBY_EARNERS, LOBBY_PURCHASES, computeLobbyModifiers } from '../src/data/lobbyProjects'
import { COUNTRIES } from '../src/data/countries'
import { EXPANSION_TARGETS } from '../src/data/expansionTargets'
import { ANTAGONISTS } from '../src/data/antagonists'
import { PHASE_NAMES } from '../src/engine/phases'
import { calculateUpgradeCost } from '../src/engine/formulas'
import type { Phase } from '../src/store/types'

// ── Formatting helpers ──

function fmtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

function fmtNum(n: number): string {
  if (n < 0) return '-' + fmtNum(-n)
  if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Q'
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T'
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return Math.floor(n).toString()
}

// ── Phase timing records ──

interface PhaseRecord {
  phase: number
  name: string
  startTime: number   // simulated seconds when phase began
  endTime: number     // simulated seconds when phase ended
  stammarPS: number   // stammar/s at transition
  kapital: number
  lobby: number
  image: number
  generators: number  // total generator count
  totalStammar: number
}

// ── AI Purchase Strategy ──

function runPurchaseStrategy(store: typeof useGameStore): void {
  // Re-read state fresh before each action group (state mutates after each buy)
  const getS = () => store.getState()

  // 1. Counter active antagonists (highest priority — stop resource drain)
  for (const ant of ANTAGONISTS) {
    const s = getS()
    const as_ = s.antagonists[ant.id]
    if (as_?.active && !as_.countered) {
      const res = ant.counterCost.resource as 'kapital' | 'lobby'
      if ((s[res] as number) >= ant.counterCost.amount) {
        getS().counterAntagonist(ant.id)
      }
    }
  }

  // 2. Buy generators — buy multiple per tick (up to 5), best efficiency first
  for (let i = 0; i < 5; i++) {
    const s = getS()
    const availableGens = GENERATORS.filter(g => g.unlockPhase <= s.phase)
    const genChoices = availableGens
      .map(g => {
        const count = s.generators[g.id]?.count ?? 0
        const cost = getGeneratorCost(g.baseCost, count, g.costScale ?? 1.15)
        return { gen: g, cost, efficiency: g.baseProduction / cost }
      })
      .filter(c => c.cost <= s.stammar)
      .sort((a, b) => b.efficiency - a.efficiency)

    if (genChoices.length > 0) {
      getS().buyGenerator(genChoices[0].gen.id)
    } else {
      break
    }
  }

  // 3. Buy click upgrades when affordable
  for (const cu of CLICK_UPGRADES) {
    const s = getS()
    if (!s.clickUpgrades[cu.id] && s.kapital >= cu.cost) {
      getS().buyClickUpgrade(cu.id)
    }
  }

  // 4. Buy tech upgrades — buy multiple per tick (up to 3)
  for (let i = 0; i < 3; i++) {
    const s = getS()
    const allUpgrades = getAllUpgrades().filter(u => u.phase <= s.phase)
    const affordableUpgrades = allUpgrades
      .map(u => {
        const count = s.upgrades[u.id]?.count ?? 0
        if (count >= u.maxCount) return null
        const cost = calculateUpgradeCost(u.baseCost, count)
        const res = u.costResource as 'kapital' | 'stammar' | 'lobby'
        if ((s[res] as number) < cost) return null
        return { upgrade: u, cost }
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => a.cost - b.cost)

    if (affordableUpgrades.length > 0) {
      getS().purchaseUpgrade(affordableUpgrades[0].upgrade.id)
    } else {
      break
    }
  }

  // 5. Buy lobby earners — spend kapital to get PK (buy multiple)
  for (let i = 0; i < 3; i++) {
    const s = getS()
    const lobbyMods = computeLobbyModifiers(s.lobbyProjects)
    const availableEarners = LOBBY_EARNERS
      .filter(e => e.unlockPhase <= s.phase)
      .sort((a, b) => (b.pkReward / b.cost) - (a.pkReward / a.cost))

    let bought = false
    for (const earner of availableEarners) {
      const discount = lobbyMods.lobbyDiscount
      const cost = Math.floor(earner.cost * (1 - discount))
      if (s.kapital * 0.3 >= cost) {
        getS().buyLobbyEarner(earner.id)
        bought = true
        break
      }
    }
    if (!bought) break
  }

  // 6. Buy lobby purchases — spend PK for permanent effects (buy all affordable)
  for (let i = 0; i < 5; i++) {
    const s = getS()
    const availablePurchases = LOBBY_PURCHASES
      .filter(p => p.unlockPhase <= s.phase && !s.lobbyProjects[p.id]?.purchased)
      .sort((a, b) => a.cost - b.cost)

    let bought = false
    for (const purchase of availablePurchases) {
      if (s.lobby >= purchase.cost) {
        getS().buyLobbyProject(purchase.id)
        bought = true
        break
      }
    }
    if (!bought) break
  }

  // 7. Phases 7-9: Invade countries
  {
    const s = getS()
    if (s.phase >= 7 && s.phase <= 9) {
      const availableCountries = COUNTRIES
        .filter(c => c.unlockPhase <= s.phase && !s.countries[c.id])
        .sort((a, b) => a.resistance - b.resistance)

      for (const country of availableCountries) {
        const ic = country.invasionCost
        const cs = getS()
        if (cs.stammar >= ic.stammar && cs.kapital >= ic.kapital && cs.lobby >= ic.lobby) {
          getS().invadeCountry(country.id)
          break
        }
      }

      // Allocate max pressure on invading countries
      for (const country of COUNTRIES) {
        const cs = getS().countries[country.id]
        if (cs?.status === 'invading') {
          let bestVector: 'kapital' | 'lobby' | 'stammar' = 'kapital'
          if (country.defenseType === 'environmental') bestVector = 'lobby'
          else if (country.defenseType === 'economic') bestVector = 'stammar'
          else if (country.defenseType === 'political') bestVector = 'kapital'

          getS().allocatePressure(country.id, bestVector, 100)
          const others = (['kapital', 'lobby', 'stammar'] as const).filter(v => v !== bestVector)
          for (const v of others) {
            getS().allocatePressure(country.id, v, 30)
          }
        }
      }
    }
  }

  // 8. Phases 10-12: Buy expansion targets
  {
    const s = getS()
    if (s.phase >= 10) {
      const availableTargets = EXPANSION_TARGETS
        .filter(t => t.unlockPhase <= s.phase && s.expansionTargets[t.id]?.status !== 'controlled')
        .sort((a, b) => a.cost.stammar - b.cost.stammar)

      for (const target of availableTargets) {
        const cs = getS()
        if (cs.stammar >= target.cost.stammar &&
            cs.kapital >= target.cost.kapital &&
            cs.lobby >= target.cost.lobby) {
          getS().buyExpansionTarget(target.id)
          break
        }
      }
    }
  }
}

// ── Main Simulation ──

function runAutoplay(): void {
  console.log('')
  console.log('═══════════════════════════════════════════════════════════════════')
  console.log('  SILVA MAXIMUS — AUTOPLAY BALANSRAPPORT')
  console.log('═══════════════════════════════════════════════════════════════════')
  console.log('')

  const store = useGameStore
  const startTimestamp = Date.now()

  // Initialize game in industry mode
  store.getState().setGameMode('industry')

  // Set lastTickAt to our start timestamp
  store.setState({ lastTickAt: startTimestamp })

  const phaseRecords: PhaseRecord[] = []
  let simTime = 0
  const tickInterval = 0.1 // 100ms in seconds
  let tickCount = 0
  let currentPhase = 1
  let phaseStartTime = 0
  let deadSpotTicks = 0 // ticks since last purchase
  let maxDeadSpot = 0
  let deadSpotPhase = 0
  let lastPurchaseCheck = ''

  // Safety: max 100 hours simulated time
  // (entropy drain needs very high stammar/s — may be a balance issue)
  const MAX_SIM_TIME = 100 * 3600

  // Progress tracking
  let lastProgressPhase = 0
  let lastProgressPct = -1

  while (simTime < MAX_SIM_TIME) {
    simTime += tickInterval
    tickCount++
    const now = startTimestamp + simTime * 1000

    // Run the game tick
    store.getState().tick(now)

    const s = store.getState()

    // Auto-dismiss events (pick choice 0)
    if (s.activeEvent) {
      store.getState().resolveEvent(0)
    }

    // Track phase transitions
    if (s.pendingTransition) {
      const fromPhase = s.pendingTransition.from
      const toPhase = s.pendingTransition.to

      // Record the completed phase
      phaseRecords.push({
        phase: fromPhase,
        name: PHASE_NAMES[fromPhase as Phase] ?? `Fas ${fromPhase}`,
        startTime: phaseStartTime,
        endTime: simTime,
        stammarPS: s.stammarPerSecond,
        kapital: s.kapital,
        lobby: s.lobby,
        image: s.image,
        generators: Object.values(s.generators).reduce((sum, g) => sum + g.count, 0),
        totalStammar: s.totalStammar,
      })

      // Print progress
      const dur = simTime - phaseStartTime
      console.log(`  ✓ Fas ${fromPhase} → ${toPhase} @ ${fmtTime(simTime)} (${fmtTime(dur)}, ${fmtNum(s.stammarPerSecond)}/s)`)

      phaseStartTime = simTime
      currentPhase = toPhase

      store.getState().completePhaseTransition()
    }

    // Progress indicator for long phases
    if (s.phase !== lastProgressPhase) {
      lastProgressPhase = s.phase
      lastProgressPct = -1
    }

    // Track dead spots — check if anything was purchasable
    const purchaseSnapshot = JSON.stringify({
      gens: Object.values(s.generators).reduce((sum, g) => sum + g.count, 0),
      ups: Object.values(s.upgrades).reduce((sum, u) => sum + u.count, 0),
    })
    if (purchaseSnapshot === lastPurchaseCheck) {
      deadSpotTicks++
      const deadSpotSeconds = deadSpotTicks * tickInterval
      if (deadSpotSeconds > maxDeadSpot) {
        maxDeadSpot = deadSpotSeconds
        deadSpotPhase = s.phase
      }
    } else {
      deadSpotTicks = 0
      lastPurchaseCheck = purchaseSnapshot
    }

    // AI strategy: run every 10 ticks (1 game-second)
    if (tickCount % 10 === 0) {
      runPurchaseStrategy(store)
    }

    // Click: 5 per game-second = every 2 ticks
    if (tickCount % 2 === 0) {
      store.getState().click()
    }

    // Check end conditions
    if (s.phase >= 12 && s.entropi <= 0) {
      // Record final phase
      phaseRecords.push({
        phase: 12,
        name: PHASE_NAMES[12],
        startTime: phaseStartTime,
        endTime: simTime,
        stammarPS: s.stammarPerSecond,
        kapital: s.kapital,
        lobby: s.lobby,
        image: s.image,
        generators: Object.values(s.generators).reduce((sum, g) => sum + g.count, 0),
        totalStammar: s.totalStammar,
      })
      console.log(`  ✓ Entropi → 0% @ ${fmtTime(simTime)} (${fmtTime(simTime - phaseStartTime)})`)
      break
    }

    // Phase 12 progress — report every 10 simulated minutes
    if (s.phase === 12 && tickCount % 6000 === 0) {
      const elapsed = simTime - phaseStartTime
      process.stdout.write(`  ... Fas 12: entropi ${s.entropi.toFixed(1)}%, ${fmtNum(s.stammarPerSecond)}/s, ${fmtTime(elapsed)} elapsed\n`)

      // Early exit if entropy is barely moving (drain rate too low)
      const drainPerSecond = Math.min(0.5, s.stammarPerSecond / 1e10)
      const remainingSeconds = drainPerSecond > 0 ? s.entropi / drainPerSecond : Infinity
      if (remainingSeconds > 3600 * 24) {
        console.log(`  ⚠ Entropi-drän för långsam: ${drainPerSecond.toFixed(6)}/s`)
        console.log(`    Uppskattad tid kvar: ${fmtTime(remainingSeconds)}`)
        console.log(`    Behöver ~${fmtNum(5e13)} stammar/s för max drän, har ${fmtNum(s.stammarPerSecond)}/s`)
        console.log(`    Avbryter fas 12 — detta är ett balansproblem.`)

        phaseRecords.push({
          phase: 12,
          name: PHASE_NAMES[12],
          startTime: phaseStartTime,
          endTime: simTime,
          stammarPS: s.stammarPerSecond,
          kapital: s.kapital,
          lobby: s.lobby,
          image: s.image,
          generators: Object.values(s.generators).reduce((sum, g) => sum + g.count, 0),
          totalStammar: s.totalStammar,
        })
        break
      }
    }
  }

  if (simTime >= MAX_SIM_TIME) {
    console.log(`  ⚠ Timeout efter ${fmtTime(MAX_SIM_TIME)} simulerad tid!`)
    const s = store.getState()
    console.log(`    Fas: ${s.phase}, totalStammar: ${fmtNum(s.totalStammar)}, entropi: ${s.entropi.toFixed(1)}%`)
    // Record whatever phase we're stuck in
    phaseRecords.push({
      phase: s.phase,
      name: PHASE_NAMES[s.phase as Phase] ?? `Fas ${s.phase}`,
      startTime: phaseStartTime,
      endTime: simTime,
      stammarPS: s.stammarPerSecond,
      kapital: s.kapital,
      lobby: s.lobby,
      image: s.image,
      generators: Object.values(s.generators).reduce((sum, g) => sum + g.count, 0),
      totalStammar: s.totalStammar,
    })
  }

  // ── Print Results Table ──

  console.log('')
  console.log('═══════════════════════════════════════════════════════════════════')
  console.log('')
  console.log('Fas  Namn                               Tid         Stammar/s       Kapital      Lobby    Gen')
  console.log('───  ─────────────────────────────────  ──────────  ──────────────  ───────────  ───────  ────')

  for (const r of phaseRecords) {
    const dur = r.endTime - r.startTime
    const fasStr = r.phase.toString().padStart(2)
    const namnStr = r.name.padEnd(33)
    const tidStr = fmtTime(dur).padStart(10)
    const spsStr = (fmtNum(r.stammarPS) + '/s').padStart(14)
    const kapStr = fmtNum(r.kapital).padStart(11)
    const lobStr = fmtNum(r.lobby).padStart(7)
    const genStr = r.generators.toString().padStart(4)
    console.log(`${fasStr}   ${namnStr} ${tidStr}  ${spsStr}  ${kapStr}  ${lobStr}  ${genStr}`)
  }

  const totalTime = phaseRecords.length > 0 ? phaseRecords[phaseRecords.length - 1].endTime : simTime
  console.log('')
  console.log(`Total speltid: ${fmtTime(totalTime)}`)

  // ── Balance Analysis ──

  console.log('')
  console.log('═══ BALANSANALYS ═══')
  console.log('')

  const warnings: string[] = []

  for (const r of phaseRecords) {
    const dur = r.endTime - r.startTime
    const durMin = dur / 60

    let verdict: string
    if (durMin < 0.5) {
      verdict = `⚡ ${fmtTime(dur)} — VÄLDIGT KORT (< 30s, fas kanske onödig?)`
      warnings.push(`Fas ${r.phase} är mycket kort (${fmtTime(dur)})`)
    } else if (durMin < 2) {
      verdict = `✓ ${fmtTime(dur)} — snabbt (bra tempo)`
    } else if (durMin <= 15) {
      verdict = `✓ ${fmtTime(dur)} — rimligt`
    } else if (durMin <= 30) {
      verdict = `⚠ ${fmtTime(dur)} — LÅNG (potentiell grind-vägg)`
      warnings.push(`Fas ${r.phase} tar ${fmtTime(dur)} — potentiell grind`)
    } else {
      verdict = `🛑 ${fmtTime(dur)} — EXTREMT LÅNG (allvarlig grind-vägg!)`
      warnings.push(`Fas ${r.phase} tar ${fmtTime(dur)} — ALLVARLIG grind!`)
    }

    console.log(`  Fas ${r.phase.toString().padStart(2)}: ${verdict}`)
  }

  // Phase duration ratios
  console.log('')
  console.log('Fas-kvot (tid[n+1] / tid[n]):')
  const ratios: string[] = []
  for (let i = 1; i < phaseRecords.length; i++) {
    const prev = phaseRecords[i - 1]
    const curr = phaseRecords[i]
    const prevDur = prev.endTime - prev.startTime
    const currDur = curr.endTime - curr.startTime
    const ratio = prevDur > 0 ? currDur / prevDur : 0
    const ratioStr = ratio.toFixed(1) + 'x'
    const flag = ratio > 3 ? ' ⚠' : ''
    ratios.push(`${prev.phase}→${curr.phase}: ${ratioStr}${flag}`)

    if (ratio > 3) {
      warnings.push(`Fas ${prev.phase}→${curr.phase}: ${ratioStr} kvot (stor ökning)`)
    }
  }
  console.log('  ' + ratios.join('  '))

  // Stammar/s progression
  console.log('')
  console.log('Stammar/s-progression:')
  for (let i = 1; i < phaseRecords.length; i++) {
    const prev = phaseRecords[i - 1]
    const curr = phaseRecords[i]
    const ratio = prev.stammarPS > 0 ? curr.stammarPS / prev.stammarPS : 0
    if (ratio < 2 && ratio > 0) {
      console.log(`  ⚠ Fas ${prev.phase}→${curr.phase}: stammar/s ökade bara ${ratio.toFixed(1)}x (borde minst 2x)`)
      warnings.push(`Fas ${prev.phase}→${curr.phase}: svag stammar/s-tillväxt (${ratio.toFixed(1)}x)`)
    }
  }

  // Dead spot report
  if (maxDeadSpot > 60) {
    console.log('')
    console.log(`⚠ Längsta dödpunkt: ${fmtTime(maxDeadSpot)} utan köp (fas ${deadSpotPhase})`)
    warnings.push(`${fmtTime(maxDeadSpot)} utan köp i fas ${deadSpotPhase}`)
  }

  // Summary
  if (warnings.length > 0) {
    console.log('')
    console.log('═══ VARNINGAR ═══')
    for (const w of warnings) {
      console.log(`  ⚠ ${w}`)
    }
  } else {
    console.log('')
    console.log('✓ Inga balansproblem hittade!')
  }

  const finalState = store.getState()
  console.log('')
  console.log('═══ SLUTSTATUS ═══')
  console.log(`  Fas: ${finalState.phase}`)
  console.log(`  totalStammar: ${fmtNum(finalState.totalStammar)}`)
  console.log(`  Entropi: ${finalState.entropi.toFixed(1)}%`)
  console.log(`  Klick: ${finalState.clickCount}`)
  console.log(`  Biodiversitet: ${finalState.biodiversity.toFixed(1)}`)
  console.log(`  Image: ${finalState.image.toFixed(1)}`)
  console.log(`  Achievements: ${Object.values(finalState.achievements).filter(Boolean).length}`)
  console.log('')
}

runAutoplay()
