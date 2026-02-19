import { describe, it, expect } from 'vitest'
import {
  COUNTRIES,
  getCountry,
  getCountriesByPhase,
  computeCountryRewards,
  getCountryMaintenanceMultiplier,
} from './countries'

describe('COUNTRIES data integrity', () => {
  it('has countries defined', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(9)
  })

  it('all countries have required fields', () => {
    for (const country of COUNTRIES) {
      expect(typeof country.id).toBe('string')
      expect(typeof country.name).toBe('string')
      expect(typeof country.description).toBe('string')
      expect([7, 8, 9]).toContain(country.unlockPhase)
      expect(country.invasionCost).toBeDefined()
      expect(country.invasionCost.stammar).toBeGreaterThan(0)
      expect(country.invasionCost.kapital).toBeGreaterThan(0)
      expect(country.invasionCost.lobby).toBeGreaterThan(0)
      expect(country.resistance).toBeGreaterThan(0)
      expect(['environmental', 'political', 'economic']).toContain(country.defenseType)
      expect(country.production).toBeDefined()
      expect(country.maintenanceCost).toBeDefined()
    }
  })

  it('has no duplicate IDs', () => {
    const ids = COUNTRIES.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('maintenance cost is ~5% of kapital production', () => {
    for (const country of COUNTRIES) {
      const ratio = country.maintenanceCost.kapitalPerSecond / country.production.kapitalPerSecond
      expect(ratio).toBeGreaterThanOrEqual(0.04)
      expect(ratio).toBeLessThanOrEqual(0.06)
    }
  })

  it('all countries have a uniqueReward', () => {
    for (const country of COUNTRIES) {
      expect(country.uniqueReward).toBeDefined()
      expect(typeof country.uniqueReward!.label).toBe('string')
    }
  })
})

describe('getCountry', () => {
  it('returns country by ID', () => {
    const country = getCountry('c_finlandia')
    expect(country).toBeDefined()
    expect(country!.name).toBeDefined()
  })

  it('returns undefined for unknown ID', () => {
    expect(getCountry('nonexistent')).toBeUndefined()
  })
})

describe('getCountriesByPhase', () => {
  it('returns countries for phase 7', () => {
    const phase7 = getCountriesByPhase(7)
    expect(phase7.length).toBeGreaterThanOrEqual(2)
    expect(phase7.every(c => c.unlockPhase <= 7)).toBe(true)
  })

  it('returns all countries for phase 9', () => {
    const phase9 = getCountriesByPhase(9)
    expect(phase9.length).toBe(COUNTRIES.length)
  })
})

describe('getCountryMaintenanceMultiplier', () => {
  it('returns 1× for 0 countries', () => {
    expect(getCountryMaintenanceMultiplier(0)).toBe(1)
  })

  it('returns 1× for 1 country', () => {
    expect(getCountryMaintenanceMultiplier(1)).toBe(1)
  })

  it('returns 1.2× for 2 countries', () => {
    expect(getCountryMaintenanceMultiplier(2)).toBeCloseTo(1.2)
  })

  it('returns 2.6× for 9 countries (all)', () => {
    expect(getCountryMaintenanceMultiplier(9)).toBeCloseTo(2.6)
  })
})

describe('computeCountryRewards', () => {
  it('returns neutral values when no countries controlled', () => {
    const rewards = computeCountryRewards({})
    expect(rewards.generatorEfficiency).toBe(1)
    expect(rewards.kapitalMultiplier).toBe(1)
    expect(rewards.stammarMultiplier).toBe(1)
    expect(rewards.lobbyPerSecond).toBe(0)
    expect(rewards.imagePerSecond).toBe(0)
  })

  it('aggregates rewards for controlled countries', () => {
    const countries = {
      c_finlandia: { status: 'controlled' },
      c_norgia: { status: 'controlled' },
      c_amazonia: { status: 'invading' }, // should not count
    }
    const rewards = computeCountryRewards(countries)
    // Should have some multiplier > 1 from controlled countries
    const hasBonus = rewards.generatorEfficiency > 1 ||
      rewards.kapitalMultiplier > 1 ||
      rewards.stammarMultiplier > 1 ||
      rewards.lobbyPerSecond > 0
    expect(hasBonus).toBe(true)
  })
})
