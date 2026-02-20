import { describe, it, expect } from 'vitest'
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
} from './tickHelpers'

describe('computeExpansionTotals', () => {
  it('returns zeros when no targets controlled', () => {
    const totals = computeExpansionTotals({})
    expect(totals.stammarPS).toBe(0)
    expect(totals.kapitalPS).toBe(0)
    expect(totals.kapitalCost).toBe(0)
  })

  it('aggregates controlled target production', () => {
    const totals = computeExpansionTotals({
      exp_manen: { status: 'controlled' },
    })
    expect(totals.stammarPS).toBeGreaterThan(0)
    expect(totals.kapitalPS).toBeGreaterThan(0)
    expect(totals.kapitalCost).toBeGreaterThan(0)
  })

  it('ignores non-controlled targets', () => {
    const totals = computeExpansionTotals({
      exp_manen: { status: 'available' },
    })
    expect(totals.stammarPS).toBe(0)
  })
})

describe('computeCountryTotals', () => {
  it('returns zeros when no countries controlled', () => {
    const totals = computeCountryTotals({})
    expect(totals.stammarPS).toBe(0)
    expect(totals.kapitalCost).toBe(0)
  })

  it('aggregates controlled country production', () => {
    const totals = computeCountryTotals({
      c_finlandia: { status: 'controlled', resistance: 0, controlProgress: 100 },
    })
    expect(totals.stammarPS).toBeGreaterThan(0)
    expect(totals.kapitalPS).toBeGreaterThan(0)
  })

  it('applies maintenance scaling for multiple countries', () => {
    const single = computeCountryTotals({
      c_finlandia: { status: 'controlled', resistance: 0, controlProgress: 100 },
    })
    const double = computeCountryTotals({
      c_finlandia: { status: 'controlled', resistance: 0, controlProgress: 100 },
      c_norgia: { status: 'controlled', resistance: 0, controlProgress: 100 },
    })
    // With 2 countries, maintenance multiplier is 1.2×
    // Finlandia's maintenance in double should be higher than in single
    expect(double.kapitalCost).toBeGreaterThan(single.kapitalCost)
  })

  it('ignores invading countries for production', () => {
    const totals = computeCountryTotals({
      c_finlandia: { status: 'invading', resistance: 30, controlProgress: 25 },
    })
    expect(totals.stammarPS).toBe(0)
  })
})

describe('computeSynergyEffects', () => {
  it('returns neutral multipliers when no generators', () => {
    const effects = computeSynergyEffects({})
    expect(effects.stammarMult).toBe(1)
    expect(effects.kapitalMult).toBe(1)
    expect(effects.imagePS).toBe(0)
  })
})

describe('computeGeneratorSideEffects', () => {
  it('returns zeros when no generators', () => {
    const effects = computeGeneratorSideEffects({}, 1)
    expect(effects.image).toBe(0)
    expect(effects.lobby).toBe(0)
    expect(effects.biodiversity).toBe(0)
  })

  it('computes side effects for generators with them', () => {
    const effects = computeGeneratorSideEffects({
      gen_virkesuppkopare: { count: 10, unlocked: true },
    }, 1)
    // gen_virkesuppkopare has -0.01 image/s per unit
    expect(effects.image).toBeLessThan(0)
  })
})

describe('processCountryInvasions', () => {
  it('returns null when no invasions', () => {
    const result = processCountryInvasions({
      c_finlandia: { status: 'controlled', resistance: 0, controlProgress: 100 },
    }, 1)
    expect(result).toBeNull()
  })

  it('reduces resistance during invasion with pressure', () => {
    const result = processCountryInvasions({
      c_finlandia: {
        status: 'invading',
        resistance: 40,
        controlProgress: 0,
        pressureAllocation: { kapital: 50, lobby: 25, stammar: 25 },
      },
    }, 5)
    expect(result).not.toBeNull()
    expect(result!.c_finlandia.resistance).toBeLessThan(40)
  })

  it('marks country as controlled when resistance hits 0', () => {
    const result = processCountryInvasions({
      c_island: {
        status: 'invading',
        resistance: 0.01, // Nearly zero
        controlProgress: 99,
        pressureAllocation: { kapital: 100, lobby: 100, stammar: 100 },
      },
    }, 100) // Long dt to ensure it crosses 0
    expect(result).not.toBeNull()
    expect(result!.c_island.status).toBe('controlled')
    expect(result!.c_island.controlProgress).toBe(100)
  })
})

describe('processAntagonistEscalation', () => {
  it('returns null when no active antagonists', () => {
    const result = processAntagonistEscalation({}, Date.now())
    expect(result).toBeNull()
  })

  it('returns null when antagonist active less than 5 min', () => {
    const now = Date.now()
    const result = processAntagonistEscalation({
      ant_skovarnarna: { active: true, countered: false, activatedAt: now - 60_000 },
    }, now)
    expect(result).toBeNull()
  })

  it('escalates antagonist active more than 5 min', () => {
    const now = Date.now()
    const result = processAntagonistEscalation({
      ant_skovarnarna: { active: true, countered: false, activatedAt: now - 6 * 60_000 },
    }, now)
    expect(result).not.toBeNull()
    expect(result!.ant_skovarnarna.escalated).toBe(true)
  })

  it('does not escalate countered antagonists', () => {
    const now = Date.now()
    const result = processAntagonistEscalation({
      ant_skovarnarna: { active: true, countered: true, activatedAt: now - 6 * 60_000 },
    }, now)
    expect(result).toBeNull()
  })
})

describe('computeAntagonistDeltas', () => {
  it('returns zeros when no active antagonists', () => {
    const deltas = computeAntagonistDeltas({}, 1, 1)
    expect(deltas.image).toBe(0)
    expect(deltas.stammar).toBe(0)
    expect(deltas.kapital).toBe(0)
  })

  it('applies image protection factor', () => {
    const full = computeAntagonistDeltas(
      { ant_skovarnarna: { active: true, countered: false } },
      1, 1 // no protection
    )
    const protected_ = computeAntagonistDeltas(
      { ant_skovarnarna: { active: true, countered: false } },
      1, 0.5 // 50% protection
    )
    // Image delta should be halved with 0.5 protection
    if (full.image !== 0) {
      expect(Math.abs(protected_.image)).toBeLessThan(Math.abs(full.image))
    }
  })

  it('doubles effects for escalated antagonists', () => {
    const normal = computeAntagonistDeltas(
      { ant_skovarnarna: { active: true, countered: false, escalated: false } },
      1, 1
    )
    const escalated = computeAntagonistDeltas(
      { ant_skovarnarna: { active: true, countered: false, escalated: true } },
      1, 1
    )
    if (normal.image !== 0) {
      expect(Math.abs(escalated.image)).toBeCloseTo(Math.abs(normal.image) * 2)
    }
  })
})

describe('computeEntropyDrain', () => {
  it('does not change before phase 10', () => {
    expect(computeEntropyDrain(50, 9, 1e12, {}, 1)).toBe(50)
  })

  it('creeps up in phase 10+', () => {
    const result = computeEntropyDrain(50, 10, 1e12, {}, 1)
    expect(result).toBeGreaterThan(50)
  })

  it('caps at 100', () => {
    const result = computeEntropyDrain(99.9, 10, 1e15, {}, 100)
    expect(result).toBe(100)
  })

  it('slows creep with entropy purchases', () => {
    const noSlow = computeEntropyDrain(50, 10, 1e12, {}, 10)
    const withSlow = computeEntropyDrain(50, 10, 1e12, { p1: true, p2: true }, 10)
    expect(withSlow).toBeLessThan(noSlow)
  })

  it('slows creep when in_progress target exists', () => {
    const normal = computeEntropyDrain(50, 10, 1e12, {}, 10)
    const withInProgress = computeEntropyDrain(50, 10, 1e12, {}, 10, true)
    expect(withInProgress).toBeLessThan(normal)
  })
})

describe('computeSpeciesLoss', () => {
  it('returns 0 when no thresholds crossed', () => {
    expect(computeSpeciesLoss(50, 48)).toBe(0)
  })

  it('returns 1 when crossing one threshold', () => {
    expect(computeSpeciesLoss(91, 89)).toBe(1) // crosses 90
  })

  it('returns multiple when crossing several thresholds', () => {
    // 96→84 crosses 95, 90, 85 = 3
    expect(computeSpeciesLoss(96, 84)).toBe(3)
  })

  it('returns 0 when biodiversity increases', () => {
    expect(computeSpeciesLoss(80, 85)).toBe(0)
  })
})
