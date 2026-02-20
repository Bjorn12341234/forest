import { useGameStore } from '../../store/gameStore'

const METERS = [
  { key: 'atmosphere' as const, label: 'Atmosfär', color: 'text-blue-400', bg: 'bg-blue-400' },
  { key: 'soil' as const, label: 'Jordmån', color: 'text-amber-500', bg: 'bg-amber-500' },
  { key: 'water' as const, label: 'Vatten', color: 'text-cyan-400', bg: 'bg-cyan-400' },
]

interface Props {
  targetId: string
}

export function TerraformMechanic({ targetId }: Props) {
  const ts = useGameStore(s => s.expansionTargets[targetId])
  const setTerraformAllocation = useGameStore(s => s.setTerraformAllocation)

  if (!ts?.terraform) return null
  const tf = ts.terraform

  function handleAllocation(meter: 'atmosphere' | 'soil' | 'water', value: number) {
    const newAlloc = { ...tf.allocation, [meter]: value }
    setTerraformAllocation(targetId, newAlloc)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-text-muted">Terraformering</span>

      {METERS.map(m => (
        <div key={m.key} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs ${m.color}`}>{m.label}</span>
            <span className="text-xs font-numbers text-text-muted">{tf[m.key].toFixed(1)}%</span>
          </div>
          {/* Meter bar */}
          <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
            <div
              className={`h-full ${m.bg} rounded-sm transition-all duration-300`}
              style={{ width: `${tf[m.key]}%` }}
            />
          </div>
          {/* Allocation slider */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted w-12">Allok.</span>
            <input
              type="range"
              min={0}
              max={100}
              value={tf.allocation[m.key]}
              onChange={(e) => handleAllocation(m.key, Number(e.target.value))}
              className="flex-1 h-1.5 accent-accent"
            />
            <span className="text-xs text-text-muted font-numbers w-8 text-right">{tf.allocation[m.key]}</span>
          </div>
        </div>
      ))}

      <p className="text-xs text-text-muted italic">
        Allokering normaliseras till 100. Ej-allokerade meter dräneras −0.3%/s.
      </p>
    </div>
  )
}
