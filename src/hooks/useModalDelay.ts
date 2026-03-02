import { useState, useEffect } from 'react'

/**
 * Returns `true` once the delay has elapsed since mount.
 * Used to prevent accidental clicks on modal choice buttons.
 */
export function useModalDelay(ms: number): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), ms)
    return () => clearTimeout(timer)
  }, [ms])

  return ready
}
