import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { setSfxVolume, setAmbientVolume, startAmbient, startOwnerAmbient } from '../engine/audio'

// Keeps the audio system in sync with the store's volume settings and game state
export function useAudioSync() {
  const sfxVolume = useGameStore(s => s.settings.sfxVolume)
  const musicVolume = useGameStore(s => s.settings.musicVolume)
  const phase = useGameStore(s => s.phase)
  const gameMode = useGameStore(s => s.gameMode)
  const biodiv = useGameStore(s => s.biodivOwner)

  useEffect(() => {
    setSfxVolume(sfxVolume)
  }, [sfxVolume])

  useEffect(() => {
    setAmbientVolume(musicVolume)
  }, [musicVolume])

  // Start/switch ambient drone when phase changes or game mode is set
  useEffect(() => {
    if (gameMode === 'owner') {
      startOwnerAmbient(biodiv)
    } else if (gameMode === 'industry') {
      startAmbient(phase)
    }
  }, [phase, gameMode])

  // Update bird frequency when biodiv changes significantly (owner mode)
  useEffect(() => {
    if (gameMode === 'owner') {
      startOwnerAmbient(biodiv)
    }
  }, [Math.floor(biodiv / 5)]) // Only update every 5 biodiv points
}
