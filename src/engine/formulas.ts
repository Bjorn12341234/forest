// ── Silva Maximus — Game Math ──
// Cost scaling, conversion rates, trust effects.

// ── Upgrade/Generator Cost Scaling ──
export function calculateUpgradeCost(baseCost: number, count: number): number {
  return Math.floor(baseCost * Math.pow(1.15, count))
}

// ── Kapital Conversion Rate ──
// Base rate scales slightly with phase
const KAPITAL_BASE_RATE: Record<number, number> = {
  1: 0.02,
  2: 0.03,
  3: 0.04,
  4: 0.06,
  5: 0.08,
  6: 0.10,
  7: 0.12,
  8: 0.14,
  9: 0.16,
  10: 0.20,
  11: 0.25,
  12: 0.30,
}

export function getKapitalConversionRate(phase: number): number {
  return KAPITAL_BASE_RATE[phase] ?? 0.01
}

// ── Owner Trust Modifier ──
// Affects kapital income based on skogsägarförtroende
export function getOwnerTrustModifier(trust: number): number {
  if (trust >= 40 && trust <= 60) return 1.0    // sweet spot
  if (trust > 80) return 0.6                     // owners keep more
  if (trust < 20) return 0.7                     // owners sell to competitors
  return 0.85                                     // 20-40 or 60-80
}

// ── Event Frequency ──
// Sprint 12: phases 1-6 reduced ~40% for ~4-5 events/hour early, ~3-4/hour mid
// Phases 7+ unchanged (already tuned in Sprint 8)
const EVENT_FREQUENCY: Record<number, [number, number]> = {
  1: [95, 155],
  2: [75, 120],
  3: [55, 90],
  4: [50, 80],
  5: [45, 75],
  6: [40, 65],
  7: [90, 150],
  8: [100, 150],
  9: [100, 150],
  10: [80, 140],
  11: [80, 140],
  12: [80, 130],
}

export function getNextEventDelay(phase: number): number {
  const [min, max] = EVENT_FREQUENCY[phase] ?? [120, 180]
  return (min + Math.random() * (max - min)) * 1000
}

// ── Offline Progression ──
export function calculateOfflineRate(): number {
  return 0.1 // 10% of active rate
}
