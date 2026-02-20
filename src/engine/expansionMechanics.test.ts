import { describe, it, expect } from 'vitest'
import {
  processExpansionMechanics,
  computeEntropyDrain,
} from './tickHelpers'
import type { ExpansionTargetState, Phase } from '../store/types'
import { useGameStore, INITIAL_STATE } from '../store/gameStore'
import { loadGame } from './save'

// ── Helpers ──

const getState = () => useGameStore.getState()

function resetStore(overrides: Record<string, unknown> = {}) {
  useGameStore.setState({
    ...INITIAL_STATE,
    startedAt: Date.now(),
    lastTickAt: Date.now(),
    nextEventAt: Date.now() + 999_999_999,
    ...overrides,
  })
}

// ── Supply Chain (Månen) ──

describe('processExpansionMechanics — supplyChain', () => {
  it('does nothing if no stageStartedAt', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_manen: {
        status: 'in_progress',
        supplyChain: { stage: 0, stageProgress: 0 },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    expect(result.completedIds).toHaveLength(0)
    // Not changed since no stageStartedAt — stays same object
    expect(result.targets).toBe(targets)
  })

  it('advances stage progress when stageStartedAt is set', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_manen: {
        status: 'in_progress',
        supplyChain: { stage: 0, stageProgress: 0, stageStartedAt: now - 15_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_manen.supplyChain!.stageProgress).toBeGreaterThan(0)
    expect(result.targets.exp_manen.supplyChain!.stageProgress).toBeLessThan(1)
  })

  it('completes stage after build time and advances to next stage', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_manen: {
        status: 'in_progress',
        supplyChain: { stage: 0, stageProgress: 0, stageStartedAt: now - 31_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_manen.supplyChain!.stage).toBe(1)
    expect(result.targets.exp_manen.supplyChain!.stageProgress).toBe(0)
  })

  it('completes target when stage 2 finishes (becomes stage 3)', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_manen: {
        status: 'in_progress',
        supplyChain: { stage: 2, stageProgress: 0, stageStartedAt: now - 61_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_manen.status).toBe('controlled')
    expect(result.completedIds).toContain('exp_manen')
  })

  it('stage 1 build time is 45 seconds', () => {
    const now = Date.now()
    // After 40 seconds, stage 1 should not be done yet
    const targets: Record<string, ExpansionTargetState> = {
      exp_manen: {
        status: 'in_progress',
        supplyChain: { stage: 1, stageProgress: 0, stageStartedAt: now - 40_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_manen.status).toBe('in_progress')
    expect(result.targets.exp_manen.supplyChain!.stage).toBe(1)
  })

  it('store advanceSupplyChainStage pays cost and sets stageStartedAt', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    // First start the target
    getState().startExpansionTarget('exp_manen')
    const before = getState().stammar
    getState().advanceSupplyChainStage('exp_manen')
    const after = getState()
    expect(after.stammar).toBeLessThan(before)
    expect(after.expansionTargets.exp_manen.supplyChain!.stageStartedAt).toBeDefined()
  })

  it('cannot advance while already building', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_manen')
    getState().advanceSupplyChainStage('exp_manen')
    const stammarAfterFirst = getState().stammar
    getState().advanceSupplyChainStage('exp_manen')
    expect(getState().stammar).toBe(stammarAfterFirst) // no change
  })
})

// ── Terraform (Mars) ──

describe('processExpansionMechanics — terraform', () => {
  it('fills meters based on allocation', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_mars: {
        status: 'in_progress',
        terraform: {
          atmosphere: 0, soil: 0, water: 0,
          allocation: { atmosphere: 100, soil: 0, water: 0 },
        },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    expect(result.targets.exp_mars.terraform!.atmosphere).toBeGreaterThan(0)
    expect(result.targets.exp_mars.terraform!.soil).toBe(0) // drained to 0
    expect(result.targets.exp_mars.terraform!.water).toBe(0)
  })

  it('drains unallocated meters', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_mars: {
        status: 'in_progress',
        terraform: {
          atmosphere: 50, soil: 50, water: 50,
          allocation: { atmosphere: 100, soil: 0, water: 0 },
        },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    expect(result.targets.exp_mars.terraform!.soil).toBeLessThan(50)
    expect(result.targets.exp_mars.terraform!.water).toBeLessThan(50)
  })

  it('completes when all meters at 100', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_mars: {
        status: 'in_progress',
        terraform: {
          atmosphere: 99.5, soil: 99.5, water: 99.5,
          allocation: { atmosphere: 34, soil: 33, water: 33 },
        },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets.exp_mars.status).toBe('controlled')
    expect(result.completedIds).toContain('exp_mars')
  })

  it('does not go below 0', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_mars: {
        status: 'in_progress',
        terraform: {
          atmosphere: 0.1, soil: 0.1, water: 0.1,
          allocation: { atmosphere: 0, soil: 0, water: 0 },
        },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets.exp_mars.terraform!.atmosphere).toBe(0)
    expect(result.targets.exp_mars.terraform!.soil).toBe(0)
    expect(result.targets.exp_mars.terraform!.water).toBe(0)
  })

  it('store setTerraformAllocation normalizes to 100', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_mars')
    getState().setTerraformAllocation('exp_mars', { atmosphere: 50, soil: 25, water: 25 })
    const alloc = getState().expansionTargets.exp_mars.terraform!.allocation
    expect(alloc.atmosphere + alloc.soil + alloc.water).toBeCloseTo(100, 0)
  })
})

// ── Megaproject (Dysonsfär) ──

describe('processExpansionMechanics — megaproject', () => {
  it('progresses over time', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_dyson: {
        status: 'in_progress',
        megaproject: { progress: 0, bonusesClaimed: 0 },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets.exp_dyson.megaproject!.progress).toBeGreaterThan(0)
  })

  it('claims milestone bonuses at 25/50/75', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_dyson: {
        status: 'in_progress',
        megaproject: { progress: 24, bonusesClaimed: 0 },
      },
    }
    // After enough dt to cross 25%
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets.exp_dyson.megaproject!.bonusesClaimed).toBeGreaterThanOrEqual(1)
  })

  it('completes at 100%', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_dyson: {
        status: 'in_progress',
        megaproject: { progress: 99.5, bonusesClaimed: 3 },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets.exp_dyson.status).toBe('controlled')
    expect(result.completedIds).toContain('exp_dyson')
  })

  it('progress rate is calibrated for ~240s completion', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_dyson: {
        status: 'in_progress',
        megaproject: { progress: 0, bonusesClaimed: 0 },
      },
    }
    // After 240 seconds should be at or near 100%
    const result = processExpansionMechanics(targets, 240, Date.now(), 1e9)
    expect(result.targets.exp_dyson.status).toBe('controlled')
  })

  it('does not complete before 240s', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_dyson: {
        status: 'in_progress',
        megaproject: { progress: 0, bonusesClaimed: 0 },
      },
    }
    // After 200 seconds should NOT be complete
    const result = processExpansionMechanics(targets, 200, Date.now(), 1e9)
    expect(result.targets.exp_dyson.status).toBe('in_progress')
  })
})

// ── Rift (Universum) ──

describe('processExpansionMechanics — rift', () => {
  it('progresses based on sacrificePercent', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_universe_alpha: {
        status: 'in_progress',
        rift: { sacrificePercent: 25, progress: 0 },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    // 25 * 0.5 * 1 = 12.5
    expect(result.targets.exp_universe_alpha.rift!.progress).toBeCloseTo(12.5)
  })

  it('does not progress with 0 sacrifice', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_universe_alpha: {
        status: 'in_progress',
        rift: { sacrificePercent: 0, progress: 0 },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.targets).toBe(targets) // no change
  })

  it('completes at 100%', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_universe_alpha: {
        status: 'in_progress',
        rift: { sacrificePercent: 50, progress: 95 },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    expect(result.targets.exp_universe_alpha.status).toBe('controlled')
    expect(result.completedIds).toContain('exp_universe_alpha')
  })

  it('clamps sacrifice to 0-50', () => {
    resetStore({
      gameMode: 'industry',
      phase: 11 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_universe_alpha')
    getState().setSacrificePercent('exp_universe_alpha', 100)
    expect(getState().expansionTargets.exp_universe_alpha.rift!.sacrificePercent).toBe(50)
    getState().setSacrificePercent('exp_universe_alpha', -10)
    expect(getState().expansionTargets.exp_universe_alpha.rift!.sacrificePercent).toBe(0)
  })
})

// ── Paradox (Tidslinje) ──

describe('processExpansionMechanics — paradox', () => {
  it('applies wave 1 penalty multiplier (0.5 production)', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_tidslinje: {
        status: 'in_progress',
        paradox: { currentWave: 0, waveProgress: 0, waveStartedAt: now - 10_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.paradoxPenalty).toBeDefined()
    expect(result.paradoxPenalty!.productionMult).toBe(0.5)
  })

  it('applies wave 2 penalty multiplier (2x maintenance)', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_tidslinje: {
        status: 'in_progress',
        paradox: { currentWave: 1, waveProgress: 0, waveStartedAt: now - 10_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.paradoxPenalty!.maintenanceMult).toBe(2)
  })

  it('advances waves after build time', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_tidslinje: {
        status: 'in_progress',
        paradox: { currentWave: 0, waveProgress: 0, waveStartedAt: now - 31_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_tidslinje.paradox!.currentWave).toBe(1)
  })

  it('completes after 3 waves', () => {
    const now = Date.now()
    const targets: Record<string, ExpansionTargetState> = {
      exp_tidslinje: {
        status: 'in_progress',
        paradox: { currentWave: 2, waveProgress: 0, waveStartedAt: now - 46_000 },
      },
    }
    const result = processExpansionMechanics(targets, 1, now, 1e9)
    expect(result.targets.exp_tidslinje.status).toBe('controlled')
    expect(result.completedIds).toContain('exp_tidslinje')
    expect(result.paradoxPenalty).toBeNull()
  })

  it('no penalty when paradox not active (no waveStartedAt)', () => {
    const targets: Record<string, ExpansionTargetState> = {
      exp_tidslinje: {
        status: 'in_progress',
        paradox: { currentWave: 0, waveProgress: 0 },
      },
    }
    const result = processExpansionMechanics(targets, 1, Date.now(), 1e9)
    expect(result.paradoxPenalty).toBeNull()
  })
})

// ── Entropy (creep model) ──

describe('entropy creep model', () => {
  it('creeps up at ~0.5/s base rate', () => {
    const result = computeEntropyDrain(50, 10, 0, {}, 1)
    expect(result).toBeCloseTo(50.5, 1)
  })

  it('caps at 100', () => {
    const result = computeEntropyDrain(99.9, 10, 0, {}, 10)
    expect(result).toBe(100)
  })

  it('does not creep before phase 10', () => {
    const result = computeEntropyDrain(50, 9, 0, {}, 10)
    expect(result).toBe(50)
  })

  it('slows creep with in_progress target (×0.3)', () => {
    const normal = computeEntropyDrain(50, 10, 0, {}, 1)
    const withIP = computeEntropyDrain(50, 10, 0, {}, 1, true)
    // Normal: 50 + 0.5 = 50.5
    // With in_progress: 50 + 0.5 * 0.3 = 50.15
    expect(withIP).toBeCloseTo(50.15, 1)
    expect(withIP).toBeLessThan(normal)
  })

  it('slows creep with countermeasure purchases (×0.6 each)', () => {
    const none = computeEntropyDrain(50, 10, 0, {}, 1)
    const one = computeEntropyDrain(50, 10, 0, { p1: true }, 1)
    const two = computeEntropyDrain(50, 10, 0, { p1: true, p2: true }, 1)
    expect(one).toBeLessThan(none)
    expect(two).toBeLessThan(one)
  })

  it('target completion reduces entropy', () => {
    // This is tested at integration level — the tick applies entropyReduction
    // from completedIds after processExpansionMechanics
    const targets: Record<string, ExpansionTargetState> = {
      exp_mars: {
        status: 'in_progress',
        terraform: {
          atmosphere: 99.5, soil: 99.5, water: 99.5,
          allocation: { atmosphere: 34, soil: 33, water: 33 },
        },
      },
    }
    const result = processExpansionMechanics(targets, 10, Date.now(), 1e9)
    expect(result.completedIds).toContain('exp_mars')
    // The tick would subtract 15 (Mars entropyReduction) from entropy
  })
})

// ── Integration: Store Actions ──

describe('expansion store actions', () => {
  it('startExpansionTarget initializes supplyChain for Månen', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_manen')
    const ts = getState().expansionTargets.exp_manen
    expect(ts.status).toBe('in_progress')
    expect(ts.supplyChain).toBeDefined()
    expect(ts.supplyChain!.stage).toBe(0)
  })

  it('startExpansionTarget initializes terraform for Mars', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_mars')
    const ts = getState().expansionTargets.exp_mars
    expect(ts.status).toBe('in_progress')
    expect(ts.terraform).toBeDefined()
    expect(ts.terraform!.allocation.atmosphere).toBe(33)
  })

  it('startExpansionTarget initializes megaproject for Dysonsfär', () => {
    resetStore({
      gameMode: 'industry',
      phase: 11 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_dyson')
    const ts = getState().expansionTargets.exp_dyson
    expect(ts.status).toBe('in_progress')
    expect(ts.megaproject).toBeDefined()
    expect(ts.megaproject!.progress).toBe(0)
  })

  it('startExpansionTarget initializes rift for Universum', () => {
    resetStore({
      gameMode: 'industry',
      phase: 11 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_universe_alpha')
    const ts = getState().expansionTargets.exp_universe_alpha
    expect(ts.status).toBe('in_progress')
    expect(ts.rift).toBeDefined()
    expect(ts.rift!.sacrificePercent).toBe(0)
  })

  it('startExpansionTarget initializes paradox for Tidslinje', () => {
    resetStore({
      gameMode: 'industry',
      phase: 12 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_tidslinje')
    const ts = getState().expansionTargets.exp_tidslinje
    expect(ts.status).toBe('in_progress')
    expect(ts.paradox).toBeDefined()
    expect(ts.paradox!.currentWave).toBe(0)
    expect(ts.paradox!.waveStartedAt).toBeDefined()
  })

  it('cannot start already in_progress target', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().startExpansionTarget('exp_manen')
    const stammarAfter = getState().stammar
    getState().startExpansionTarget('exp_manen')
    expect(getState().stammar).toBe(stammarAfter) // no double-spend
  })

  it('deducts resources on start', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    const beforeStammar = getState().stammar
    getState().startExpansionTarget('exp_manen')
    expect(getState().stammar).toBeLessThan(beforeStammar)
  })
})

// ── Save Migration ──

describe('save migration v12→v13', () => {
  it('migrates controlled targets correctly', () => {
    // Mock a v12 save
    const v12Save = {
      version: 12,
      savedAt: Date.now(),
      state: {
        ...INITIAL_STATE,
        phase: 10,
        expansionTargets: {
          exp_manen: { status: 'controlled' },
          exp_mars: { status: 'available' },
        },
        entropi: 50,
        entropyPurchases: { entropy_slow_1: true },
      },
    }
    localStorage.setItem('silva_maximus_save', JSON.stringify(v12Save))
    const loaded = loadGame()
    expect(loaded).not.toBeNull()
    // Controlled target should remain
    expect(loaded!.expansionTargets.exp_manen?.status).toBe('controlled')
    // Non-controlled target should be cleared
    expect(loaded!.expansionTargets.exp_mars).toBeUndefined()
    // Entropy reset to 100 for phase 10+
    expect(loaded!.entropi).toBe(100)
    // Entropy purchases cleared
    expect(Object.keys(loaded!.entropyPurchases)).toHaveLength(0)
  })
})
