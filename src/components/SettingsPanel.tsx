import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { exportSave, importSave } from '../engine/save'
import { GlassCard } from './ui/GlassCard'

interface SettingsPanelProps {
  onClose: () => void
}

const THEMES = [
  { id: 'default', name: 'Default', color: '#FF6600' },
  { id: 'gold', name: 'Gold Plated', color: '#FFD700' },
  { id: 'warroom', name: 'War Room', color: '#44CC44' },
  { id: 'void', name: 'Void', color: '#9933FF' },
  { id: 'terminal', name: 'Terminal', color: '#00FF00' },
]

function applyTheme(themeId: string) {
  const root = document.documentElement
  // Remove all theme classes
  root.classList.remove('theme-gold', 'theme-warroom', 'theme-void', 'theme-terminal')
  // Apply new theme
  if (themeId !== 'default') {
    root.classList.add(`theme-${themeId}`)
  }
}

export function useThemeSync() {
  const theme = useGameStore(s => s.settings.theme)
  useEffect(() => {
    applyTheme(theme)
  }, [theme])
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const settings = useGameStore(s => s.settings)
  const updateSettings = useGameStore(s => s.updateSettings)
  const save = useGameStore(s => s.save)
  const reset = useGameStore(s => s.reset)
  const [importText, setImportText] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [importFeedback, setImportFeedback] = useState<'success' | 'error' | null>(null)

  const handleExport = () => {
    const state = useGameStore.getState()
    const encoded = exportSave(state)
    navigator.clipboard.writeText(encoded).then(() => {
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    })
  }

  const handleImport = () => {
    if (!importText.trim()) return
    const state = importSave(importText.trim())
    if (state) {
      useGameStore.setState({ ...state, lastTickAt: Date.now() })
      setImportFeedback('success')
      setTimeout(() => {
        setImportFeedback(null)
        setShowImport(false)
        setImportText('')
      }, 1500)
    } else {
      setImportFeedback('error')
      setTimeout(() => setImportFeedback(null), 2000)
    }
  }

  const handleReset = () => {
    reset()
    setShowResetConfirm(false)
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <GlassCard padding="lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-medium text-text-primary">Settings</h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors text-lg bg-transparent border-none cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* SFX Volume */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-text-secondary">SFX Volume</label>
              <span className="text-xs font-numbers text-text-muted">
                {Math.round(settings.sfxVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => updateSettings({ sfxVolume: Number(e.target.value) })}
              className="w-full accent-orange-500 h-1.5"
            />
          </div>

          {/* Ambient Volume */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-text-secondary">Ambient Volume</label>
              <span className="text-xs font-numbers text-text-muted">
                {Math.round(settings.musicVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.musicVolume}
              onChange={(e) => updateSettings({ musicVolume: Number(e.target.value) })}
              className="w-full accent-orange-500 h-1.5"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-4" />

          {/* Theme Selector */}
          <div className="mb-4">
            <label className="text-xs text-text-secondary mb-2 block">Theme</label>
            <div className="grid grid-cols-5 gap-1.5">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => updateSettings({ theme: theme.id })}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[0.6rem]
                    border cursor-pointer transition-all ${
                    settings.theme === theme.id
                      ? 'bg-white/10 border-white/20'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: theme.color,
                      boxShadow: settings.theme === theme.id
                        ? `0 0 8px ${theme.color}60`
                        : 'none',
                    }}
                  />
                  <span className="text-text-muted">{theme.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-4" />

          {/* Save / Export / Import */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => { save(); }}
              className="w-full py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10
                         text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
            >
              Save Now
            </button>

            <button
              onClick={handleExport}
              className="w-full py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10
                         text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copyFeedback ? 'Copied to clipboard!' : 'Export Save'}
            </button>

            {!showImport ? (
              <button
                onClick={() => setShowImport(true)}
                className="w-full py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10
                           text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
              >
                Import Save
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste save data here..."
                  className="w-full h-16 p-2 rounded-lg bg-black/30 border border-white/10
                             text-xs text-text-primary font-numbers resize-none outline-none
                             focus:border-orange-accent/30"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleImport}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-none"
                    style={{
                      background: importFeedback === 'error' ? '#CC4433' : importFeedback === 'success' ? '#33CC66' : '#FF6600',
                      color: '#fff',
                    }}
                  >
                    {importFeedback === 'error' ? 'Invalid save!' : importFeedback === 'success' ? 'Imported!' : 'Import'}
                  </button>
                  <button
                    onClick={() => { setShowImport(false); setImportText('') }}
                    className="px-3 py-1.5 rounded-lg text-xs text-text-muted bg-white/5 border border-white/10
                               hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-4" />

          {/* Reset */}
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2 rounded-lg text-xs font-medium bg-red-900/20 border border-red-500/20
                         text-red-400 hover:bg-red-900/30 transition-colors cursor-pointer"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-red-400 text-center">
                This will delete ALL progress. Are you sure?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-lg text-xs font-bold border-none cursor-pointer"
                  style={{ background: '#CC4433', color: '#fff' }}
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-lg text-xs text-text-muted bg-white/5 border border-white/10
                             hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
