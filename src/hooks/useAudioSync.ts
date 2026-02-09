import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { setSfxVolume, setAmbientVolume, startAmbient } from '../engine/audio'

// Keeps the audio system in sync with the store's volume settings and game state
export function useAudioSync() {
  const sfxVolume = useGameStore(s => s.settings.sfxVolume)
  const musicVolume = useGameStore(s => s.settings.musicVolume)
  const phase = useGameStore(s => s.phase)

  useEffect(() => {
    setSfxVolume(sfxVolume)
  }, [sfxVolume])

  useEffect(() => {
    setAmbientVolume(musicVolume)
  }, [musicVolume])

  // Start/switch ambient drone when phase changes
  useEffect(() => {
    startAmbient(phase)
  }, [phase])
}
