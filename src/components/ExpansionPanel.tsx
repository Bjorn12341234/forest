import { useGameStore } from '../store/gameStore'
import { getEra } from '../engine/phases'
import { GlassCard } from './ui/GlassCard'
import { CountryPanel } from './expansion/CountryPanel'
import { SpaceExpansionPanel } from './expansion/SpaceExpansionPanel'

export function ExpansionPanel() {
  const phase = useGameStore(s => s.phase)
  const era = getEra(phase)

  if (era === 'INTERNATIONELL' || (era === 'MAKT' && phase >= 6)) {
    return <CountryPanel />
  }
  if (era === 'EXPANSION') {
    return <SpaceExpansionPanel />
  }
  // SVERIGE/early MAKT: show locked message
  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <GlassCard padding="md">
        <p className="text-sm text-text-muted text-center py-8">
          Expansionsmodulen låses upp i fas 7.
        </p>
      </GlassCard>
    </div>
  )
}
