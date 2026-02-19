import '@testing-library/jest-dom'

// Mock localStorage for save tests
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    get length() { return Object.keys(store).length },
    key: (index: number) => Object.keys(store)[index] ?? null,
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

// Mock Web Audio API (game uses AudioContext)
class MockOscillatorNode {
  type = 'sine'
  frequency = { value: 440, setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }
  connect() { return this }
  start() {}
  stop() {}
  disconnect() {}
  addEventListener() {}
}

class MockGainNode {
  gain = { value: 1, setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }
  connect() { return this }
  disconnect() {}
}

class MockBiquadFilterNode {
  type = 'lowpass'
  frequency = { value: 350, setValueAtTime: () => {}, linearRampToValueAtTime: () => {} }
  Q = { value: 1 }
  connect() { return this }
  disconnect() {}
}

class MockAudioContext {
  currentTime = 0
  state = 'running'
  destination = {}
  createOscillator() { return new MockOscillatorNode() }
  createGain() { return new MockGainNode() }
  createBiquadFilter() { return new MockBiquadFilterNode() }
  createBufferSource() {
    return { buffer: null, connect() { return this }, start() {}, stop() {}, disconnect() {}, loop: false, playbackRate: { value: 1 } }
  }
  createBuffer() { return { getChannelData: () => new Float32Array(44100) } }
  resume() { return Promise.resolve() }
  close() { return Promise.resolve() }
}

Object.defineProperty(globalThis, 'AudioContext', { value: MockAudioContext })
Object.defineProperty(globalThis, 'webkitAudioContext', { value: MockAudioContext })
