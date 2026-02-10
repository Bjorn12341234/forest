import { getEra } from '../../engine/phases'

// ── Map View Types ──

export type MapView = 'countries' | 'solar' | 'galaxy' | 'multiverse'

export function getMapView(phase: number): MapView {
  const era = getEra(phase)
  if (era === 'INTERNATIONELL' || (era === 'MAKT' && phase >= 6)) return 'countries'
  if (phase <= 10) return 'solar'
  if (phase <= 11) return 'galaxy'
  return 'multiverse'
}

export const VIEW_LABELS: Record<MapView, string> = {
  countries: 'Världskarta',
  solar: 'Solsystemet',
  galaxy: 'Galaxen',
  multiverse: 'Multiversum',
}

// ── SVG Map Backgrounds ──

export function WorldMapSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Europe */}
      <path d="M44 14 L52 12 L56 16 L54 22 L50 26 L46 30 L42 28 L40 22 L42 18 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Scandinavia */}
      <path d="M48 6 L52 4 L54 8 L56 14 L52 12 L48 10 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Africa */}
      <path d="M44 34 L54 32 L58 40 L56 52 L52 62 L48 64 L42 56 L40 44 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* North America */}
      <path d="M8 10 L26 8 L30 16 L28 28 L22 34 L14 32 L8 24 L6 16 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* South America */}
      <path d="M22 42 L32 38 L36 48 L34 58 L30 68 L24 70 L20 60 L18 50 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Asia */}
      <path d="M58 10 L82 8 L90 16 L88 28 L80 32 L72 30 L64 26 L58 20 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Southeast Asia / Indonesia */}
      <path d="M72 42 L86 40 L90 48 L84 56 L76 54 L70 48 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.5" />
      {/* Australia */}
      <path d="M76 60 L88 58 L92 64 L88 72 L78 70 L74 66 Z"
        fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)" strokeWidth="0.3" opacity="0.4" />
    </svg>
  )
}

function SolarSystemSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Sun */}
      <circle cx="50" cy="50" r="4" fill="var(--color-accent)" opacity="0.6" />
      <circle cx="50" cy="50" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3">
        <animate attributeName="r" values="4;5;4" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Orbits */}
      {[15, 25, 38, 52, 68].map((r, i) => (
        <circle key={i} cx="50" cy="50" r={r} fill="none"
          stroke="var(--color-text-muted)" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.3" />
      ))}
    </svg>
  )
}

function GalaxySVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Center glow */}
      <circle cx="50" cy="50" r="6" fill="var(--color-accent)" opacity="0.15" />
      <circle cx="50" cy="50" r="3" fill="var(--color-accent)" opacity="0.3" />
      {/* Spiral arms */}
      <path d="M50 50 Q60 40 70 38 Q82 36 88 44" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q40 42 34 34 Q28 24 32 16" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q42 60 34 64 Q22 68 14 60" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      <path d="M50 50 Q58 58 66 64 Q76 72 84 68" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.3" />
      {/* Dust dots */}
      {[[62,35],[74,40],[36,30],[28,20],[38,68],[18,56],[70,68],[82,62],
        [56,28],[44,72],[24,48],[76,52]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.5" fill="var(--color-text-muted)" opacity="0.2" />
      ))}
    </svg>
  )
}

function MultiverseSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Parallel universe planes */}
      {[
        { x: 10, y: 10, w: 30, h: 55, label: 'α' },
        { x: 50, y: 5, w: 30, h: 55, label: 'β' },
        { x: 30, y: 25, w: 30, h: 55, label: 'γ' },
      ].map((plane, i) => (
        <g key={i}>
          <rect x={plane.x} y={plane.y} width={plane.w} height={plane.h} rx="1"
            fill="var(--color-bg-tertiary)" stroke="var(--color-text-muted)"
            strokeWidth="0.3" strokeDasharray="2 1" opacity={0.3 - i * 0.05}
            transform={`skewY(${-5 + i * 5})`} />
          <text x={plane.x + 2} y={plane.y + 6} fontSize="3"
            fill="var(--color-text-muted)" opacity="0.4">{plane.label}</text>
        </g>
      ))}
      {/* Connecting energy lines */}
      <line x1="35" y1="35" x2="55" y2="30" stroke="var(--color-accent)" strokeWidth="0.2" opacity="0.3" strokeDasharray="1 1" />
      <line x1="55" y1="30" x2="45" y2="50" stroke="var(--color-accent)" strokeWidth="0.2" opacity="0.3" strokeDasharray="1 1" />
    </svg>
  )
}

export const MAP_COMPONENTS: Record<MapView, React.FC> = {
  countries: WorldMapSVG,
  solar: SolarSystemSVG,
  galaxy: GalaxySVG,
  multiverse: MultiverseSVG,
}
