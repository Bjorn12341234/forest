import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { setSfxVolume, setAmbientVolume, startAmbient, updateDriftAudio } from '../engine/audio'

// Keeps the audio system in sync with the store's volume settings and game state
export function useAudioSync() {
  const sfxVolume = useGameStore(s => s.settings.sfxVolume)
  const musicVolume = useGameStore(s => s.settings.musicVolume)
  const phase = useGameStore(s => s.phase)
  const realityDrift = useGameStore(s => s.realityDrift)

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

  // Update drift audio distortion
  useEffect(() => {
    updateDriftAudio(realityDrift)
  }, [realityDrift])
}
