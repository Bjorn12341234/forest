import { useGameStore } from './gameStore'

// ── Selector hooks ──

export function useStammarPS(): number {
  return useGameStore(state => state.stammarPerSecond)
}

export function usePhase() {
  return useGameStore(state => state.phase)
}

export function useStammar() {
  return useGameStore(state => state.stammar)
}

export function useTotalStammar() {
  return useGameStore(state => state.totalStammar)
}

export function useKapital() {
  return useGameStore(state => state.kapital)
}

export function useLobby() {
  return useGameStore(state => state.lobby)
}

export function useImage() {
  return useGameStore(state => state.image)
}

export function useOwnerTrust() {
  return useGameStore(state => state.ownerTrust)
}

export function useSettings() {
  return useGameStore(state => state.settings)
}

export function useActiveEvent() {
  return useGameStore(state => state.activeEvent)
}

export function useUpgrade(id: string) {
  return useGameStore(state => state.upgrades[id])
}

export function useGenerator(id: string) {
  return useGameStore(state => state.generators[id])
}

// Backwards compatibility alias
export const useGPS = useStammarPS
