import { describe, it, expect } from 'vitest'
import {
  GENERATORS,
  GENERATOR_SYNERGIES,
  getGeneratorData,
  getGeneratorsByPhase,
  getGeneratorCost,
  getActiveSynergies,
} from './generators'

describe('GENERATORS data integrity', () => {
  it('has generators defined', () => {
    expect(GENERATORS.length).toBeGreaterThanOrEqual(14)
  })

  it('all generators have required fields', () => {
    for (const gen of GENERATORS) {
      expect(gen.id).toBeDefined()
      expect(typeof gen.id).toBe('string')
      expect(gen.name).toBeDefined()
      expect(typeof gen.name).toBe('string')
      expect(gen.baseCost).toBeGreaterThan(0)
      expect(gen.baseProduction).toBeGreaterThan(0)
      expect(gen.unlockPhase).toBeGreaterThanOrEqual(1)
      expect(gen.unlockPhase).toBeLessThanOrEqual(12)
    }
  })

  it('has no duplicate IDs', () => {
    const ids = GENERATORS.map(g => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('costs generally increase with unlockPhase', () => {
    const sorted = [...GENERATORS].sort((a, b) => a.unlockPhase - b.unlockPhase)
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].unlockPhase > sorted[i - 1].unlockPhase) {
        expect(sorted[i].baseCost).toBeGreaterThanOrEqual(sorted[i - 1].baseCost)
      }
    }
  })

  it('side effects reference valid resource types', () => {
    const validResources = new Set(['image', 'lobby', 'biodiversity'])
    for (const gen of GENERATORS) {
      if (gen.sideEffects) {
        for (const effect of gen.sideEffects) {
          expect(validResources.has(effect.resource)).toBe(true)
          expect(typeof effect.perSecond).toBe('number')
          expect(typeof effect.description).toBe('string')
        }
      }
    }
  })
})

describe('GENERATOR_SYNERGIES data integrity', () => {
  it('has synergies defined', () => {
    expect(GENERATOR_SYNERGIES.length).toBeGreaterThanOrEqual(4)
  })

  it('all synergy pairs reference valid generator IDs', () => {
    const genIds = new Set(GENERATORS.map(g => g.id))
    for (const syn of GENERATOR_SYNERGIES) {
      expect(genIds.has(syn.genA)).toBe(true)
      expect(genIds.has(syn.genB)).toBe(true)
    }
  })

  it('no duplicate synergy IDs', () => {
    const ids = GENERATOR_SYNERGIES.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('getGeneratorData', () => {
  it('returns generator by ID', () => {
    const gen = getGeneratorData('gen_virkesuppkopare')
    expect(gen).toBeDefined()
    expect(gen!.name).toBeDefined()
  })

  it('returns undefined for unknown ID', () => {
    expect(getGeneratorData('nonexistent')).toBeUndefined()
  })
})

describe('getGeneratorsByPhase', () => {
  it('returns generators unlocked at phase 1', () => {
    const phase1 = getGeneratorsByPhase(1)
    expect(phase1.length).toBeGreaterThanOrEqual(2)
    expect(phase1.every(g => g.unlockPhase <= 1)).toBe(true)
  })

  it('returns more generators for higher phases', () => {
    const phase1 = getGeneratorsByPhase(1)
    const phase6 = getGeneratorsByPhase(6)
    expect(phase6.length).toBeGreaterThan(phase1.length)
  })
})

describe('getGeneratorCost', () => {
  it('returns base cost at count 0', () => {
    expect(getGeneratorCost(100, 0)).toBe(100)
  })

  it('scales with default 1.15', () => {
    expect(getGeneratorCost(100, 1)).toBe(Math.floor(100 * 1.15))
    expect(getGeneratorCost(100, 10)).toBe(Math.floor(100 * Math.pow(1.15, 10)))
  })

  it('supports custom costScale', () => {
    expect(getGeneratorCost(100, 1, 1.20)).toBe(Math.floor(100 * 1.20))
    expect(getGeneratorCost(100, 5, 1.30)).toBe(Math.floor(100 * Math.pow(1.30, 5)))
  })
})

describe('getActiveSynergies', () => {
  it('returns empty when no generators owned', () => {
    expect(getActiveSynergies({})).toEqual([])
  })

  it('returns synergy when both generators owned', () => {
    const gens = {
      gen_massafabrik: { count: 1 },
      gen_certifiering: { count: 1 },
    }
    const active = getActiveSynergies(gens as Record<string, { count: number }>)
    expect(active.length).toBeGreaterThanOrEqual(1)
    expect(active.some(s => s.genA === 'gen_massafabrik' || s.genB === 'gen_massafabrik')).toBe(true)
  })

  it('does not return synergy when only one generator owned', () => {
    const gens = {
      gen_massafabrik: { count: 1 },
    }
    const active = getActiveSynergies(gens as Record<string, { count: number }>)
    const massaSynergies = active.filter(s =>
      s.genA === 'gen_massafabrik' || s.genB === 'gen_massafabrik'
    )
    expect(massaSynergies).toHaveLength(0)
  })
})
