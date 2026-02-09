// ── Lightweight Web Audio Sound System ──
// Procedurally generated sounds using Web Audio API — no audio files needed
// Phase-specific ambient soundscapes: nature → industrial → silence → flatline

type EventCategory = string

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
  if (ambientMasterGain) {
    ambientMasterGain.gain.setTargetAtTime(
      masterMuted ? 0 : ambientVolume * 0.08,
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
  if (ambientMasterGain) {
    ambientMasterGain.gain.setTargetAtTime(
      muted ? 0 : ambientVolume * 0.08,
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

  // In Phase 7, click becomes an EKG pip
  if (currentAmbientPhase >= 7) {
    playEKGPip(ctx, now, vol)
    return
  }

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

function playEKGPip(ctx: AudioContext, now: number, vol: number) {
  // Short, clinical beep — like a heart monitor
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(1000, now)

  gain.gain.setValueAtTime(0.18 * vol, now)
  gain.gain.setValueAtTime(0.18 * vol, now + 0.06)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.15)
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
// Multi-layered soundscapes that evolve from idyllic nature to industrial silence

// Phase-specific drone frequencies and wave types
const PHASE_DRONES: Record<number, { freq: number; type: OscillatorType; detune: number }> = {
  1: { freq: 55, type: 'sine', detune: 0 },         // A1 — warm hum
  2: { freq: 73.4, type: 'triangle', detune: -5 },   // D2 — slightly tense
  3: { freq: 65.4, type: 'sawtooth', detune: 0 },    // C2 — military gravity
  4: { freq: 82.4, type: 'sine', detune: 7 },         // E2 — spacey
  5: { freq: 49, type: 'sawtooth', detune: -12 },    // G1 — cosmic dread
  6: { freq: 40, type: 'sine', detune: 0 },           // Sub-bass — barely audible hum
  7: { freq: 0, type: 'sine', detune: 0 },            // Silence — no drone
}

// Ambient layer nodes (cleaned up on phase change)
let ambientMasterGain: GainNode | null = null
let ambientNodes: AudioNode[] = []
let currentAmbientPhase = 0
let birdInterval: ReturnType<typeof setInterval> | null = null
let ekgInterval: ReturnType<typeof setInterval> | null = null

function cleanupAmbientNodes() {
  // Stop all tracked oscillator/source nodes
  for (const node of ambientNodes) {
    try {
      if (node instanceof OscillatorNode) node.stop()
      else if (node instanceof AudioBufferSourceNode) node.stop()
    } catch { /* already stopped */ }
  }
  ambientNodes = []

  if (birdInterval) {
    clearInterval(birdInterval)
    birdInterval = null
  }
  if (ekgInterval) {
    clearInterval(ekgInterval)
    ekgInterval = null
  }
}

export function startAmbient(phase: number) {
  if (phase === currentAmbientPhase && ambientMasterGain) return
  stopAmbient()

  const ctx = getContext()
  const now = ctx.currentTime

  // Master gain for all ambient layers
  ambientMasterGain = ctx.createGain()
  ambientMasterGain.gain.setValueAtTime(0, now)
  ambientMasterGain.gain.linearRampToValueAtTime(
    masterMuted ? 0 : ambientVolume * 0.08,
    now + 2
  )
  ambientMasterGain.connect(ctx.destination)

  currentAmbientPhase = phase

  // Build phase-specific soundscape
  const drone = PHASE_DRONES[phase] ?? PHASE_DRONES[1]

  if (phase <= 6 && drone.freq > 0) {
    createDroneLayer(ctx, now, drone)
  }

  if (phase <= 2) {
    createWindLayer(ctx, now, 1.0)
    createBirdLayer(ctx, phase <= 1 ? 2500 : 3500)
  } else if (phase === 3) {
    createWindLayer(ctx, now, 0.5)
    createBirdLayer(ctx, 6000) // Fewer birds
    createChainsawLayer(ctx, now, 0.4)
  } else if (phase === 4) {
    createWindLayer(ctx, now, 0.2)
    createBirdLayer(ctx, 12000) // Rare single bird
    createIndustrialLayer(ctx, now, 0.6)
  } else if (phase === 5) {
    createIndustrialLayer(ctx, now, 1.0)
  } else if (phase === 6) {
    // Near silence — just the faint sub-bass drone (already created above)
    // Plus a very quiet high-pitched whine
    createWhineLayer(ctx, now)
  } else if (phase >= 7) {
    // Complete silence with periodic EKG beep
    createEKGAmbient(ctx)
  }
}

export function stopAmbient() {
  const ctx = audioCtx
  if (!ctx) return
  const now = ctx.currentTime

  if (ambientMasterGain) {
    ambientMasterGain.gain.setTargetAtTime(0, now, 0.5)
  }
  // Stop nodes after fade out
  setTimeout(() => {
    cleanupAmbientNodes()
    ambientMasterGain = null
  }, 2000)
  currentAmbientPhase = 0
}

// ── Ambient Layers ──

function createDroneLayer(ctx: AudioContext, now: number, drone: { freq: number; type: OscillatorType; detune: number }) {
  if (!ambientMasterGain) return

  // Primary drone oscillator
  const osc = ctx.createOscillator()
  osc.type = drone.type
  osc.frequency.setValueAtTime(drone.freq, now)
  osc.detune.setValueAtTime(drone.detune, now)

  const droneGain = ctx.createGain()
  droneGain.gain.setValueAtTime(0.6, now) // Relative to master
  osc.connect(droneGain)
  droneGain.connect(ambientMasterGain)
  osc.start(now)
  ambientNodes.push(osc)

  // Harmonic layer — 5th harmonic, quieter
  const harmonic = ctx.createOscillator()
  harmonic.type = 'sine'
  harmonic.frequency.setValueAtTime(drone.freq * 3, now)
  const hGain = ctx.createGain()
  hGain.gain.setValueAtTime(0.15, now)
  harmonic.connect(hGain)
  hGain.connect(ambientMasterGain)
  harmonic.start(now)
  ambientNodes.push(harmonic)
}

function createWindLayer(ctx: AudioContext, now: number, intensity: number) {
  if (!ambientMasterGain) return

  // Wind = white noise → low-pass filter with slow LFO modulation
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true

  // Low-pass filter for wind character
  const lpf = ctx.createBiquadFilter()
  lpf.type = 'lowpass'
  lpf.frequency.setValueAtTime(400, now)
  lpf.Q.setValueAtTime(1, now)

  // LFO to modulate filter frequency (wind gusts)
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.setValueAtTime(0.15, now) // Very slow
  const lfoGain = ctx.createGain()
  lfoGain.gain.setValueAtTime(200, now)
  lfo.connect(lfoGain)
  lfoGain.connect(lpf.frequency)
  lfo.start(now)
  ambientNodes.push(lfo)

  const windGain = ctx.createGain()
  windGain.gain.setValueAtTime(0.25 * intensity, now)

  source.connect(lpf)
  lpf.connect(windGain)
  windGain.connect(ambientMasterGain)
  source.start(now)
  ambientNodes.push(source)
}

function createBirdLayer(ctx: AudioContext, intervalMs: number) {
  if (!ambientMasterGain) return

  // Periodic bird chirps — synthesized with rapid frequency sweeps
  const chirp = () => {
    if (!ambientMasterGain || masterMuted) return

    const now = ctx.currentTime
    // Randomize timing slightly
    const delay = Math.random() * 0.3

    // 2-3 note chirp
    const noteCount = 2 + Math.floor(Math.random() * 2)
    for (let i = 0; i < noteCount; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const t = now + delay + i * 0.08

      osc.type = 'sine'
      const baseFreq = 2000 + Math.random() * 2000
      osc.frequency.setValueAtTime(baseFreq, t)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * (0.7 + Math.random() * 0.6), t + 0.06)

      gain.gain.setValueAtTime(0.12, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07)

      osc.connect(gain)
      gain.connect(ambientMasterGain!)
      osc.start(t)
      osc.stop(t + 0.1)
    }
  }

  // Random jitter on interval
  birdInterval = setInterval(() => {
    chirp()
  }, intervalMs + Math.random() * intervalMs * 0.5)

  // First chirp after short delay
  setTimeout(chirp, 1000)
}

function createChainsawLayer(ctx: AudioContext, now: number, intensity: number) {
  if (!ambientMasterGain) return

  // Chainsaw = distorted sawtooth at ~100Hz with grinding overtones
  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(95, now)

  // Waveshaper for distortion
  const shaper = ctx.createWaveShaper()
  const curve = new Float32Array(256)
  for (let i = 0; i < 256; i++) {
    const x = (i / 128) - 1
    curve[i] = Math.tanh(x * 3) // Soft clipping
  }
  shaper.curve = curve

  // Band-pass to shape the chainsaw character
  const bpf = ctx.createBiquadFilter()
  bpf.type = 'bandpass'
  bpf.frequency.setValueAtTime(800, now)
  bpf.Q.setValueAtTime(0.8, now)

  // LFO for revving effect
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.setValueAtTime(2, now) // Engine rhythm
  const lfoGain = ctx.createGain()
  lfoGain.gain.setValueAtTime(20, now)
  lfo.connect(lfoGain)
  lfoGain.connect(osc.frequency)
  lfo.start(now)
  ambientNodes.push(lfo)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.12 * intensity, now)

  osc.connect(shaper)
  shaper.connect(bpf)
  bpf.connect(gain)
  gain.connect(ambientMasterGain)
  osc.start(now)
  ambientNodes.push(osc)
}

function createIndustrialLayer(ctx: AudioContext, now: number, intensity: number) {
  if (!ambientMasterGain) return

  // Heavy industrial drone = multiple detuned sawtooth oscillators + mechanical rhythm

  // Low rumble base
  const rumble = ctx.createOscillator()
  rumble.type = 'sawtooth'
  rumble.frequency.setValueAtTime(40, now)
  const rumbleGain = ctx.createGain()
  rumbleGain.gain.setValueAtTime(0.3 * intensity, now)
  rumble.connect(rumbleGain)
  rumbleGain.connect(ambientMasterGain)
  rumble.start(now)
  ambientNodes.push(rumble)

  // Detuned mid-range grind
  const grind = ctx.createOscillator()
  grind.type = 'sawtooth'
  grind.frequency.setValueAtTime(120, now)
  grind.detune.setValueAtTime(-15, now)
  const grindFilter = ctx.createBiquadFilter()
  grindFilter.type = 'lowpass'
  grindFilter.frequency.setValueAtTime(600, now)
  const grindGain = ctx.createGain()
  grindGain.gain.setValueAtTime(0.15 * intensity, now)
  grind.connect(grindFilter)
  grindFilter.connect(grindGain)
  grindGain.connect(ambientMasterGain)
  grind.start(now)
  ambientNodes.push(grind)

  // Mechanical clicking rhythm (noise bursts)
  const bufferSize = ctx.sampleRate * 2
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  const clickRate = Math.floor(ctx.sampleRate / 4) // 4Hz mechanical pulse
  for (let i = 0; i < bufferSize; i++) {
    if (i % clickRate < 200) {
      data[i] = (Math.random() * 2 - 1) * 0.5
    } else {
      data[i] = 0
    }
  }
  const clickSource = ctx.createBufferSource()
  clickSource.buffer = buffer
  clickSource.loop = true
  const clickGain = ctx.createGain()
  clickGain.gain.setValueAtTime(0.08 * intensity, now)
  const clickFilter = ctx.createBiquadFilter()
  clickFilter.type = 'highpass'
  clickFilter.frequency.setValueAtTime(2000, now)
  clickSource.connect(clickFilter)
  clickFilter.connect(clickGain)
  clickGain.connect(ambientMasterGain)
  clickSource.start(now)
  ambientNodes.push(clickSource)
}

function createWhineLayer(ctx: AudioContext, now: number) {
  if (!ambientMasterGain) return

  // Phase 6: Faint high-pitched whine — tinnitus of a dead forest
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(4200, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.03, now) // Very quiet

  osc.connect(gain)
  gain.connect(ambientMasterGain)
  osc.start(now)
  ambientNodes.push(osc)
}

function createEKGAmbient(ctx: AudioContext) {
  if (!ambientMasterGain) return

  // Phase 7: Periodic EKG beep every 1.5 seconds — then nothing
  ekgInterval = setInterval(() => {
    if (!ambientMasterGain || masterMuted) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1000, now)

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.setValueAtTime(0.15, now + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(ambientMasterGain!)
    osc.start(now)
    osc.stop(now + 0.15)
  }, 1500)
}
