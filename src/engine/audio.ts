// ── Lightweight Web Audio Sound System ──
// Procedurally generated sounds using Web Audio API — no audio files needed

import type { EventCategory } from '../store/types'

let audioCtx: AudioContext | null = null

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// ── Volume Control ──

let sfxVolume = 0.7
let ambientVolume = 0.3
let masterMuted = false

export function setSfxVolume(vol: number) {
  sfxVolume = Math.max(0, Math.min(1, vol))
}

export function getSfxVolume(): number {
  return sfxVolume
}

export function setAmbientVolume(vol: number) {
  ambientVolume = Math.max(0, Math.min(1, vol))
  if (ambientGain) {
    ambientGain.gain.setTargetAtTime(
      masterMuted ? 0 : ambientVolume * 0.06,
      getContext().currentTime,
      0.1
    )
  }
}

export function getAmbientVolume(): number {
  return ambientVolume
}

export function setMuted(muted: boolean) {
  masterMuted = muted
  if (ambientGain) {
    ambientGain.gain.setTargetAtTime(
      muted ? 0 : ambientVolume * 0.06,
      getContext().currentTime,
      0.1
    )
  }
}

export function isMuted(): boolean {
  return masterMuted
}

function getEffectiveVolume(): number {
  return masterMuted ? 0 : sfxVolume
}

// ── Sound Generators ──

export function playClick() {
  const vol = getEffectiveVolume()
  if (vol === 0) return

  const ctx = getContext()
  const now = ctx.currentTime

  // Quick percussive click — short sine blip
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, now)
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.08)

  gain.gain.setValueAtTime(0.15 * vol, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.1)
}

export function playPurchase() {
  const vol = getEffectiveVolume()
  if (vol === 0) return

  const ctx = getContext()
  const now = ctx.currentTime

  // Ascending two-tone — "upgrade acquired" feel
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()

  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(523, now) // C5
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(659, now + 0.1) // E5

  gain.gain.setValueAtTime(0.12 * vol, now)
  gain.gain.setValueAtTime(0.12 * vol, now + 0.15)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(ctx.destination)

  osc1.start(now)
  osc1.stop(now + 0.12)
  osc2.start(now + 0.1)
  osc2.stop(now + 0.35)
}

// ── Category-Specific Event Sounds ──

export function playEvent() {
  playEventByCategory('opportunity')
}

export function playEventByCategory(category: EventCategory) {
  const vol = getEffectiveVolume()
  if (vol === 0) return

  const ctx = getContext()
  const now = ctx.currentTime

  switch (category) {
    case 'scandal':
    case 'crisis':
      playAlarmSound(ctx, now, vol)
      break
    case 'opportunity':
      playChimeSound(ctx, now, vol)
      break
    case 'absurd':
      playQuirkySound(ctx, now, vol)
      break
    case 'contradiction':
      playTensionSound(ctx, now, vol)
      break
    case 'nobel':
      playNobelSound(ctx, now, vol)
      break
    case 'reality_glitch':
      playGlitchSound(ctx, now, vol)
      break
    default:
      playChimeSound(ctx, now, vol)
  }
}

function playAlarmSound(ctx: AudioContext, now: number, vol: number) {
  // Urgent descending alarm — two sharp notes
  const freqs = [880, 440]
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + i * 0.15

    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, t)

    gain.gain.setValueAtTime(0.08 * vol, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.18)
  })
}

function playChimeSound(ctx: AudioContext, now: number, vol: number) {
  // Pleasant descending arpeggio
  const notes = [880, 659, 523]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + i * 0.12

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, t)

    gain.gain.setValueAtTime(0.1 * vol, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.25)
  })
}

function playQuirkySound(ctx: AudioContext, now: number, vol: number) {
  // Wobbly pitch bend — comical
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(300, now)
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.1)
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.25)

  gain.gain.setValueAtTime(0.12 * vol, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.35)
}

function playTensionSound(ctx: AudioContext, now: number, vol: number) {
  // Dissonant minor second — unresolved tension
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()

  osc1.type = 'triangle'
  osc1.frequency.setValueAtTime(440, now) // A4
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(466, now) // Bb4 — semitone clash

  gain.gain.setValueAtTime(0.08 * vol, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(ctx.destination)
  osc1.start(now)
  osc1.stop(now + 0.55)
  osc2.start(now)
  osc2.stop(now + 0.55)
}

function playNobelSound(ctx: AudioContext, now: number, vol: number) {
  // Regal ascending — golden fanfare
  const notes = [392, 494, 587, 784] // G4, B4, D5, G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + i * 0.12

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)

    gain.gain.setValueAtTime(0.1 * vol, t)
    gain.gain.linearRampToValueAtTime(0.08 * vol, t + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.55)
  })
}

function playGlitchSound(ctx: AudioContext, now: number, vol: number) {
  // Digital noise burst — bitcrushed crackle
  const bufferSize = ctx.sampleRate * 0.15
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    // Stepped random noise (bitcrushed feel)
    if (i % 50 === 0) {
      data[i] = (Math.random() * 2 - 1) * 0.8
    } else {
      data[i] = data[i - (i % 50)] ?? 0
    }
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.08 * vol, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

  source.connect(gain)
  gain.connect(ctx.destination)
  source.start(now)
}

export function playAchievement() {
  const vol = getEffectiveVolume()
  if (vol === 0) return

  const ctx = getContext()
  const now = ctx.currentTime

  // Triumphant ascending fanfare
  const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + i * 0.1

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)

    gain.gain.setValueAtTime(0.1 * vol, t)
    gain.gain.linearRampToValueAtTime(0.08 * vol, t + 0.15)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.45)
  })
}

export function playPhaseTransition() {
  const vol = getEffectiveVolume()
  if (vol === 0) return

  const ctx = getContext()
  const now = ctx.currentTime

  // Deep rumble + rising tone — dramatic shift
  const rumble = ctx.createOscillator()
  const rumbleGain = ctx.createGain()
  rumble.type = 'sawtooth'
  rumble.frequency.setValueAtTime(60, now)
  rumble.frequency.linearRampToValueAtTime(80, now + 2)
  rumbleGain.gain.setValueAtTime(0.06 * vol, now)
  rumbleGain.gain.linearRampToValueAtTime(0.1 * vol, now + 1)
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 3)
  rumble.connect(rumbleGain)
  rumbleGain.connect(ctx.destination)
  rumble.start(now)
  rumble.stop(now + 3.5)

  // Rising tone
  const rise = ctx.createOscillator()
  const riseGain = ctx.createGain()
  rise.type = 'sine'
  rise.frequency.setValueAtTime(200, now + 0.5)
  rise.frequency.exponentialRampToValueAtTime(1200, now + 2.5)
  riseGain.gain.setValueAtTime(0.001, now + 0.5)
  riseGain.gain.linearRampToValueAtTime(0.08 * vol, now + 1.5)
  riseGain.gain.exponentialRampToValueAtTime(0.001, now + 3)
  rise.connect(riseGain)
  riseGain.connect(ctx.destination)
  rise.start(now + 0.5)
  rise.stop(now + 3.5)
}

// ── Ambient Audio System ──

// Phase-specific drone frequencies and wave types
const PHASE_DRONES: Record<number, { freq: number; type: OscillatorType; detune: number }> = {
  1: { freq: 55, type: 'sine', detune: 0 },         // A1 — warm hum
  2: { freq: 73.4, type: 'triangle', detune: -5 },   // D2 — slightly tense
  3: { freq: 65.4, type: 'sawtooth', detune: 0 },    // C2 — military gravity
  4: { freq: 82.4, type: 'sine', detune: 7 },         // E2 — spacey
  5: { freq: 49, type: 'sawtooth', detune: -12 },    // G1 — cosmic dread
}

let ambientOsc: OscillatorNode | null = null
let ambientOsc2: OscillatorNode | null = null
let ambientGain: GainNode | null = null
let currentAmbientPhase = 0

export function startAmbient(phase: number) {
  if (phase === currentAmbientPhase && ambientOsc) return
  stopAmbient()

  const ctx = getContext()
  const now = ctx.currentTime
  const drone = PHASE_DRONES[phase] ?? PHASE_DRONES[1]

  ambientGain = ctx.createGain()
  ambientGain.gain.setValueAtTime(0, now)
  ambientGain.gain.linearRampToValueAtTime(
    masterMuted ? 0 : ambientVolume * 0.06,
    now + 2
  )
  ambientGain.connect(ctx.destination)

  // Primary drone
  ambientOsc = ctx.createOscillator()
  ambientOsc.type = drone.type
  ambientOsc.frequency.setValueAtTime(drone.freq, now)
  ambientOsc.detune.setValueAtTime(drone.detune, now)
  ambientOsc.connect(ambientGain)
  ambientOsc.start(now)

  // Harmonic layer — octave + fifth above, quieter
  ambientOsc2 = ctx.createOscillator()
  ambientOsc2.type = 'sine'
  ambientOsc2.frequency.setValueAtTime(drone.freq * 3, now) // 5th harmonic
  const harmonicGain = ctx.createGain()
  harmonicGain.gain.setValueAtTime(0.3, now)
  ambientOsc2.connect(harmonicGain)
  harmonicGain.connect(ambientGain)
  ambientOsc2.start(now)

  currentAmbientPhase = phase
}

export function stopAmbient() {
  const ctx = audioCtx
  if (!ctx) return
  const now = ctx.currentTime

  if (ambientGain) {
    ambientGain.gain.setTargetAtTime(0, now, 0.5)
  }
  // Stop oscillators after fade out
  setTimeout(() => {
    ambientOsc?.stop()
    ambientOsc2?.stop()
    ambientOsc = null
    ambientOsc2 = null
    ambientGain = null
  }, 2000)
  currentAmbientPhase = 0
}

// ── Reality Drift Audio Distortion ──

let driftNoiseSource: AudioBufferSourceNode | null = null
let driftNoiseGain: GainNode | null = null

export function updateDriftAudio(driftPercent: number) {
  if (masterMuted || driftPercent < 20) {
    stopDriftAudio()
    return
  }

  const ctx = getContext()
  const now = ctx.currentTime
  const intensity = Math.min(1, (driftPercent - 20) / 80) // 0 at 20%, 1 at 100%

  // Start noise if not running
  if (!driftNoiseSource) {
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    driftNoiseSource = ctx.createBufferSource()
    driftNoiseSource.buffer = buffer
    driftNoiseSource.loop = true

    driftNoiseGain = ctx.createGain()
    driftNoiseGain.gain.setValueAtTime(0, now)

    // Bandpass filter for colored noise
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, now)
    filter.Q.setValueAtTime(0.5, now)

    driftNoiseSource.connect(filter)
    filter.connect(driftNoiseGain)
    driftNoiseGain.connect(ctx.destination)
    driftNoiseSource.start(now)
  }

  // Scale noise volume with drift intensity
  if (driftNoiseGain) {
    const targetVol = intensity * 0.04 * sfxVolume
    driftNoiseGain.gain.setTargetAtTime(targetVol, now, 0.5)
  }

  // Detune the ambient drone proportionally to drift
  if (ambientOsc) {
    const drone = PHASE_DRONES[currentAmbientPhase] ?? PHASE_DRONES[1]
    const detuneAmount = drone.detune + intensity * 50
    ambientOsc.detune.setTargetAtTime(detuneAmount, now, 0.3)
  }
}

export function stopDriftAudio() {
  if (driftNoiseSource) {
    try { driftNoiseSource.stop() } catch { /* already stopped */ }
    driftNoiseSource = null
    driftNoiseGain = null
  }
}
