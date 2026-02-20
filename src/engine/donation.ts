// ── Donation state (localStorage, separate from game save) ──
// Honor system — no verification. Persists across game resets.

const DONATION_KEY = 'silva_maximus_donated'

/** Check if the player has marked themselves as a donor */
export function isDonator(): boolean {
  try {
    return localStorage.getItem(DONATION_KEY) === 'true'
  } catch {
    return false
  }
}

/** Mark the player as a donor */
export function markDonated(): void {
  try {
    localStorage.setItem(DONATION_KEY, 'true')
  } catch {
    // localStorage unavailable — silent fail
  }
}
