import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { exportSave, importSave } from '../engine/save'
import { GlassCard } from './ui/GlassCard'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface SettingsPanelProps {
  onClose: () => void
}

export function useThemeSync() {
  const theme = useGameStore(s => s.settings.theme)
  useEffect(() => {
    // Silva Maximus uses a single brutalist theme, no switching needed
    void theme
  }, [theme])
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const trapRef = useFocusTrap(onClose)
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
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Inställningar"
        className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <GlassCard padding="lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-medium text-text-primary">Inställningar</h2>
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
              <label className="text-xs text-text-secondary">Ljudeffekter</label>
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
              <label className="text-xs text-text-secondary">Bakgrundsljud</label>
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
          <div className="border-t border-black/10 my-4" />

          {/* Save / Export / Import */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => { save(); }}
              className="w-full py-2 rounded-sm text-xs font-medium bg-black/5 border border-black/10
                         text-text-primary hover:bg-black/10 transition-colors cursor-pointer"
            >
              Spara nu
            </button>

            <button
              onClick={handleExport}
              className="w-full py-2 rounded-sm text-xs font-medium bg-black/5 border border-black/10
                         text-text-primary hover:bg-black/10 transition-colors cursor-pointer"
            >
              {copyFeedback ? 'Kopierat!' : 'Exportera sparfil'}
            </button>

            {!showImport ? (
              <button
                onClick={() => setShowImport(true)}
                className="w-full py-2 rounded-sm text-xs font-medium bg-black/5 border border-black/10
                           text-text-primary hover:bg-black/10 transition-colors cursor-pointer"
              >
                Importera sparfil
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Klistra in spardata här..."
                  className="w-full h-16 p-2 rounded-sm bg-black/5 border border-black/10
                             text-xs text-text-primary font-numbers resize-none outline-none
                             focus:border-accent/30"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleImport}
                    className="flex-1 py-1.5 rounded-sm text-xs font-medium cursor-pointer border-none"
                    style={{
                      background: importFeedback === 'error' ? '#CC4433' : importFeedback === 'success' ? '#7DB840' : '#D4730C',
                      color: '#fff',
                    }}
                  >
                    {importFeedback === 'error' ? 'Ogiltig sparfil!' : importFeedback === 'success' ? 'Importerad!' : 'Importera'}
                  </button>
                  <button
                    onClick={() => { setShowImport(false); setImportText('') }}
                    className="px-3 py-1.5 rounded-sm text-xs text-text-muted bg-black/5 border border-black/10
                               hover:bg-black/10 cursor-pointer"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-black/10 my-4" />

          {/* Reset */}
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2 rounded-sm text-xs font-medium bg-red-900/10 border border-red-500/20
                         text-red-600 hover:bg-red-900/20 transition-colors cursor-pointer"
            >
              Nollställ allt
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-red-600 text-center">
                Detta raderar ALL din progress. Är du säker?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-sm text-xs font-bold border-none cursor-pointer"
                  style={{ background: '#CC4433', color: '#fff' }}
                >
                  Ja, nollställ allt
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-sm text-xs text-text-muted bg-black/5 border border-black/10
                             hover:bg-black/10 cursor-pointer"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
