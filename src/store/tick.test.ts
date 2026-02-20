import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore, INITIAL_STATE } from './gameStore'
import type { Phase } from './types'

function resetStore(overrides: Record<string, unknown> = {}) {
  useGameStore.setState({ ...INITIAL_STATE, ...overrides })
}

function getState() {
  return useGameStore.getState()
}

// Simulate a tick with a specific dt (in seconds)
function tickFor(seconds: number) {
  const state = getState()
  const now = state.lastTickAt + seconds * 1000
  getState().tick(now)
}

beforeEach(() => {
  localStorage.clear()
  resetStore()
})

describe('industry tick', () => {
  describe('stammar production', () => {
    it('produces stammar from generators', () => {
      resetStore({
        gameMode: 'industry',
        generators: {
          gen_virkesuppkopare: { count: 5, unlocked: true },
        },
        // Push nextEventAt far into future to avoid event interference
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      expect(getState().stammar).toBeGreaterThan(0)
      expect(getState().totalStammar).toBeGreaterThan(0)
    })

    it('accumulates stammar over multiple ticks', () => {
      resetStore({
        gameMode: 'industry',
        generators: {
          gen_virkesuppkopare: { count: 1, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      const after1 = getState().stammar
      tickFor(1)
      const after2 = getState().stammar
      expect(after2).toBeGreaterThan(after1)
    })
  })

  describe('kapital conversion', () => {
    it('converts stammar to kapital', () => {
      resetStore({
        gameMode: 'industry',
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      expect(getState().kapital).toBeGreaterThan(0)
    })
  })

  describe('warning penalties', () => {
    it('applies production penalty at low image', () => {
      // Level 2: image < 15, 50% production
      resetStore({
        gameMode: 'industry',
        image: 10,
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      const lowImageStammar = getState().stammar

      resetStore({
        gameMode: 'industry',
        image: 50,
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      const normalImageStammar = getState().stammar

      // Low image should produce significantly less
      expect(lowImageStammar).toBeLessThan(normalImageStammar)
    })

    it('updates warningLevel in state', () => {
      resetStore({
        gameMode: 'industry',
        image: 3, // level 3
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      expect(getState().warningLevel).toBe(3)
    })
  })

  describe('antagonist effects', () => {
    it('applies antagonist tick penalties', () => {
      resetStore({
        gameMode: 'industry',
        image: 50,
        antagonists: {
          ant_skovarnarna: { active: true, countered: false, activatedAt: Date.now() },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(5) // 5 seconds with image drain
      // Skovarnarna drains image — should be less than 50
      expect(getState().image).toBeLessThan(50)
    })

    it('does not apply effects from countered antagonists', () => {
      resetStore({
        gameMode: 'industry',
        image: 50,
        antagonists: {
          ant_skovarnarna: { active: true, countered: true, activatedAt: Date.now() },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(5)
      expect(getState().image).toBe(50) // no drain
    })
  })

  describe('generator side effects', () => {
    it('applies image drain from virkesuppkopare', () => {
      resetStore({
        gameMode: 'industry',
        image: 50,
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(10)
      // gen_virkesuppkopare has -0.01 image/s per unit = -0.1/s total
      expect(getState().image).toBeLessThan(50)
    })
  })

  describe('entropy', () => {
    it('entropy creeps up in phase 10+', () => {
      resetStore({
        gameMode: 'industry',
        phase: 10 as Phase,
        entropi: 50,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(10)
      expect(getState().entropi).toBeGreaterThan(50)
    })

    it('does not change entropy before phase 10', () => {
      resetStore({
        gameMode: 'industry',
        phase: 9 as Phase,
        entropi: 50,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(10)
      expect(getState().entropi).toBe(50)
    })
  })

  describe('phase transitions', () => {
    it('triggers phase transition at threshold', () => {
      // checkPhaseTransition reads state.totalStammar (pre-tick value)
      // so we set totalStammar already at/above threshold
      resetStore({
        gameMode: 'industry',
        phase: 1 as Phase,
        totalStammar: 10_000, // at threshold
        stammar: 10_000,
        generators: {},
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      const state = getState()
      expect(state.pendingTransition !== null || state.phase > 1).toBe(true)
    })
  })

  describe('golden multiplier', () => {
    it('applies golden multiplier during active window', () => {
      const now = Date.now()
      resetStore({
        gameMode: 'industry',
        goldenMultiplierUntil: now + 30_000, // 30s from now
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: now + 999_999_999,
        lastTickAt: now,
      })
      getState().tick(now + 1000)
      const goldenStammar = getState().stammar

      // Compare to non-golden
      resetStore({
        gameMode: 'industry',
        goldenMultiplierUntil: 0,
        generators: {
          gen_virkesuppkopare: { count: 10, unlocked: true },
        },
        nextEventAt: now + 999_999_999,
        lastTickAt: now,
      })
      getState().tick(now + 1000)
      const normalStammar = getState().stammar

      expect(goldenStammar).toBeGreaterThan(normalStammar)
    })
  })

  describe('country invasion tick', () => {
    it('reduces resistance during invasion', () => {
      resetStore({
        gameMode: 'industry',
        phase: 7 as Phase,
        countries: {
          c_finlandia: {
            status: 'invading',
            resistance: 50,
            controlProgress: 0,
            pressureAllocation: { kapital: 50, lobby: 25, stammar: 25 },
          },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(5)
      const cs = getState().countries.c_finlandia
      // Resistance should decrease with pressure
      expect(cs.resistance).toBeLessThan(50)
    })
  })
})

describe('owner tick', () => {
  describe('passive growth', () => {
    it('adds sv from passive growth', () => {
      resetStore({
        gameMode: 'owner',
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(2)
      // Passive growth is 0.5 sv/s, so 2 seconds = ~1 sv
      expect(getState().skogsvardering).toBeGreaterThan(0)
      expect(getState().totalSkogsvardering).toBeGreaterThan(0)
    })
  })

  describe('generator bonuses', () => {
    it('produces sv from owner generators', () => {
      resetStore({
        gameMode: 'owner',
        ownerGenerators: {
          ogen_foryngring: { count: 5, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      // Should have more than just passive growth
      expect(getState().skogsvardering).toBeGreaterThan(0.5)
    })

    it('produces inkomst from generators with inkomst/s', () => {
      resetStore({
        gameMode: 'owner',
        ownerGenerators: {
          ogen_plockhuggning: { count: 3, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(2)
      expect(getState().inkomst).toBeGreaterThan(0)
    })

    it('produces biodiv from dod-ved-program', () => {
      resetStore({
        gameMode: 'owner',
        ownerGenerators: {
          ogen_dodved: { count: 2, unlocked: true },
        },
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(5)
      expect(getState().biodivOwner).toBeGreaterThan(5) // starts at 5
      expect(getState().deadwood).toBeGreaterThan(0)
    })
  })

  describe('resiliens', () => {
    it('increases resiliens over time with biodiv', () => {
      resetStore({
        gameMode: 'owner',
        biodivOwner: 30,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(10)
      expect(getState().resiliens).toBeGreaterThan(10) // starts at 10
    })
  })

  describe('legacy', () => {
    it('increases legacy over time', () => {
      resetStore({
        gameMode: 'owner',
        biodivOwner: 20,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(30) // legacy grows slowly
      expect(getState().legacy).toBeGreaterThan(0)
    })
  })

  describe('carbon', () => {
    it('increases carbon with standing forest', () => {
      resetStore({
        gameMode: 'owner',
        skogsvardering: 1000,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(5)
      expect(getState().realCarbonPos).toBeGreaterThan(0)
    })
  })

  describe('owner phase', () => {
    it('updates ownerPhase based on totalSkogsvardering', () => {
      resetStore({
        gameMode: 'owner',
        totalSkogsvardering: 60_000,
        nextEventAt: Date.now() + 999_999_999,
      })
      tickFor(1)
      expect(getState().ownerPhase).toBe(2)
    })
  })
})
