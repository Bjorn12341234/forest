// ── Silva Maximus — Game Math ──
// Cost scaling, conversion rates, trust effects.

// ── Upgrade/Generator Cost Scaling ──
export function calculateUpgradeCost(baseCost: number, count: number): number {
  return Math.floor(baseCost * Math.pow(1.15, count))
}

// ── Kapital Conversion Rate ──
// Base rate scales slightly with phase
const KAPITAL_BASE_RATE: Record<number, number> = {
  1: 0.01,
  2: 0.015,
  3: 0.02,
  4: 0.025,
  5: 0.03,
  6: 0.04,
  7: 0.05,
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
const EVENT_FREQUENCY: Record<number, [number, number]> = {
  1: [120, 200],
  2: [90, 150],
  3: [70, 120],
  4: [60, 100],
  5: [50, 90],
  6: [45, 80],
  7: [40, 70],
}

export function getNextEventDelay(phase: number): number {
  const [min, max] = EVENT_FREQUENCY[phase] ?? [120, 180]
  return (min + Math.random() * (max - min)) * 1000
}

// ── Offline Progression ──
export function calculateOfflineRate(): number {
  return 0.1 // 10% of active rate
}
