# SILVA MAXIMUS — Technical Specification

> Technical source of truth. For game design details, see `forest.md`.

---

## 1. Game State Schema

All game state lives in a single Zustand store (`src/store/gameStore.ts`).

```typescript
interface GameState {
  // Meta
  phase: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  startedAt: number;          // timestamp
  lastTickAt: number;         // timestamp
  lastSaveAt: number;         // timestamp
  totalPlayTime: number;      // seconds

  // Primary Resources
  stammar: number;            // current stammar (spendable on generators)
  stammarPerSecond: number;   // computed each tick from generators
  stammarPerClick: number;    // base (1) + click upgrades + tech tree effects
  kapital: number;            // currency, spendable (from stammar conversion)
  lobby: number;              // Politiskt Kapital
  image: number;              // Grön Image™, 0-100, starts at 100

  // Hidden Resources (not shown in UI until endgame/reveal)
  realCO2: number;            // actual net CO2 emissions
  ownerProfit: number;        // what forest owners actually received
  industryProfit: number;     // what industry actually earned
  biodiversity: number;       // 0-100%, starts at 100
  species: number;            // species lost count
  samiLand: number;           // reindeer grazing land lost (km²)

  // Skogsägarförtroende
  ownerTrust: number;         // 0-100, starts at 50

  // Tracking
  clickCount: number;
  totalStammar: number;       // lifetime total for phase thresholds (never decreases)

  // Generators — keyed by generator ID
  generators: Record<string, GeneratorState>;

  // Tech tree upgrades — keyed by upgrade ID
  upgrades: Record<string, UpgradeState>;

  // Click upgrades — keyed by click upgrade ID
  clickUpgrades: Record<string, boolean>;

  // Lobby projects — keyed by project ID
  lobbyProjects: Record<string, LobbyProjectState>;

  // Antagonists
  antagonists: Record<string, AntagonistState>;

  // Expansion targets
  expansionTargets: Record<string, ExpansionTargetState>;

  // Events
  eventQueue: GameEvent[];
  eventHistory: string[];     // IDs of resolved events
  activeEvent: GameEvent | null;
  nextEventAt: number;        // timestamp for next event check

  // Achievements
  achievements: Record<string, boolean>;

  // Phase transition
  pendingTransition: { from: Phase; to: Phase } | null;

  // Settings
  settings: {
    musicVolume: number;
    sfxVolume: number;
    notificationsEnabled: boolean;
    theme: string;
  };
}

interface GeneratorState {
  count: number;
  unlocked: boolean;
}

interface UpgradeState {
  purchased: boolean;
  count: number;
  unlocked: boolean;
}

interface LobbyProjectState {
  purchased: boolean;
  count: number;              // for repeatable lobby earner activities
  unlocked: boolean;
}

interface AntagonistState {
  active: boolean;
  countered: boolean;
}

interface ExpansionTargetState {
  acquired: boolean;
  acquiredAt: number;        // timestamp
}

interface GameEvent {
  id: string;
  phase: number;
  headline: string;           // Swedish
  context: string;            // Swedish flavourtext
  choices: EventChoice[];
  conditions?: EventCondition[];
  cooldown?: number;          // min seconds between firings
  unique?: boolean;           // fire only once
}

interface EventChoice {
  label: string;              // Swedish
  effects: Effect[];
  description?: string;       // hint text
}

interface Effect {
  resource: string;           // e.g. 'stammar', 'kapital', 'image', 'lobby'
  amount: number;
  type: 'add' | 'multiply' | 'set';
  duration?: number;          // temporary effect in seconds
}

interface EventCondition {
  resource: string;
  operator: '>' | '<' | '>=' | '<=' | '==';
  value: number;
}
```

---

## 2. Game Loop

Core tick runs every **100ms** (10 ticks per second) in `src/engine/gameLoop.ts`.

```
Each tick:
  1. Calculate deltaTime since lastTick
  2. Apply generator production:
     - stammar += stammarPerSecond * dt
  3. Apply kapital generation:
     - kapital += stammar_generated_this_tick * kapitalConversionRate
  4. Update hidden variables:
     - realCO2 += co2_per_stam * stammar_generated
     - ownerProfit += owner_share * kapital_generated
     - industryProfit += industry_share * kapital_generated
     - biodiversity -= biodiv_loss_rate * stammar_generated
  5. Apply antagonist effects:
     - If active and not countered, apply per-tick penalties
  6. Apply lobby project modifiers
  7. Check event triggers:
     - Threshold-based (totalStammar hits value)
     - Condition-based (image < X, phase == Y)
     - Phase-based (phase transition events)
  8. Check phase transition conditions
  9. Check achievement conditions (every 10 ticks)
  10. Update computed values (stammarPerSecond, multipliers)
  11. Update lastTickAt
```

---

## 3. Formula Reference

### Stammar per Second
```
stammarPS = sum(generator.count * generator.baseProduction for each generator)
           * lobbyModifiers
           * antagonistPenalties
```

### Generator Cost Scaling
```
cost(n) = baseCost * costScale^n
```
Where `costScale` defaults to 1.15 but varies per generator (1.20 for phase 7+, 1.25-1.35 for phase 8+).
Where `n` = number of that generator already owned.

### Kapital Conversion
```
kapitalPerSecond = stammarPerSecond * conversionRate * ownerTrustModifier
```
- `conversionRate`: phase 1: 0.01, 2: 0.015, 3: 0.02, 4: 0.025, 5: 0.03, 6: 0.04, 7: 0.05, 8: 0.06, 9: 0.07, 10: 0.08, 11: 0.09, 12: 0.10
- `ownerTrustModifier`:
  - Trust 40-60 (sweet spot): 1.0
  - Trust >80: 0.6 (owners keep more)
  - Trust <20: 0.7 (owners sell to competitors)
  - Trust 20-40 or 60-80: 0.85

### Owner Trust Effects
```
if ownerTrust > 80: kapital income -40%
if ownerTrust < 20: kapital income -30%, random protest events
if ownerTrust 40-60: optimal, no penalty
```

### Image Effects
```
if image < 20: antagonist spawn rate +100%, event severity +50%
if image < 50: PR cost to recover +50%
if image > 80: lobby activities cost -20%
```

### Hidden Variable Accumulation (per tick)
```
realCO2 += stammar_generated * 0.05 * (1 + markberedning_multiplier)
ownerProfit += kapital_generated * 0.08      // ~8% to owners
industryProfit += kapital_generated * 0.92   // ~92% to industry
biodiversity -= stammar_generated * 0.0001
species += (biodiversity drops below threshold) ? 1 : 0
samiLand += (northern zone generators) * 0.01
```

### Offline Progression
```
offline_stammar = stammarPerSecond * elapsed_seconds * 0.1
```
Base offline rate = 10%. Capped at 24 hours.

---

## 4. Save System

### Format
JSON in `localStorage` under key `silva_maximus_save`.

### Auto-save triggers
- Every 30 seconds
- Phase transition
- Event resolution
- Tab becoming hidden (`visibilitychange`)
- Manual save button

### Export/Import
Base64-encoded JSON string. Copy/paste for backup.

### Schema Versioning
```typescript
interface SaveFile {
  version: 3;
  savedAt: number;
  state: GameState;
}
```
Migration functions: `migrate_v1_to_v2(state)`, etc.
Migration v2→v3: adds `expansionTargets: {}` to state.

---

## 5. Event Engine

### Event Scheduling
Each phase defines frequency range. After event resolves, next scheduled:
```
nextEventIn = random(minFrequency, maxFrequency)
```

| Phase | Min (sec) | Max (sec) |
|---|---|---|
| 1 | 90 | 150 |
| 2 | 60 | 100 |
| 3 | 40 | 75 |
| 4 | 30 | 55 |
| 5 | 20 | 40 |
| 6 | 15 | 30 |
| 7 | 10 | 20 |
| 8 | 50 | 90 |
| 9 | 40 | 70 |
| 10 | 30 | 55 |
| 11 | 25 | 45 |
| 12 | 20 | 35 |

Event frequencies were increased ~30-50% across all phases as part of balance pass.

### Event Selection
1. Filter by: phase, conditions met, not on cooldown, not unique+already-fired
2. Weight by priority (obligatory events first, then threshold, then random)
3. Random weighted selection from eligible pool

### Event Resolution
Player picks choice → effects applied → event added to history → next scheduled.

---

## 6. Phase Transitions

### Thresholds (based on totalStammar)
| Transition | Condition |
|---|---|
| 1 → 2 | totalStammar >= 10,000 |
| 2 → 3 | totalStammar >= 100,000 |
| 3 → 4 | totalStammar >= 1,000,000 |
| 4 → 5 | totalStammar >= 10,000,000 |
| 5 → 6 | totalStammar >= 100,000,000 |
| 6 → 7 | totalStammar >= 1,000,000,000 |
| 7 → 8 | totalStammar >= 10,000,000,000 |
| 8 → 9 | totalStammar >= 100,000,000,000 |
| 9 → 10 | totalStammar >= 1,000,000,000,000 |
| 10 → 11 | totalStammar >= 10,000,000,000,000 |
| 11 → 12 | totalStammar >= 100,000,000,000,000 |

### Transition Sequence
1. Pause game tick
2. Show transition overlay (phase name + flavourtext)
3. Unlock new systems/generators for the phase
4. Update click flavourtext tier
5. Initialize new phase state
6. Resume tick
7. Auto-save

### Phase Unlocks
| Phase | Systems Unlocked |
|---|---|
| 1 | Click, first 3 generators, click upgrades |
| 2 | Lobby module (Makt tab), skogsägarförtroende, generators 4-5 |
| 3 | Image/PR system, international lobby, generator 6 (Lobbyfirma) |
| 4 | Nestlé event chain, Sami conflict, antagonists |
| 5 | Maktutredning, Svängdörren, generator 7 (Autonomt Skördarnätverk) |
| 6 | Generator 8 (Orbital Timberstation), Den Tysta Våren, Expansion tab |
| 7 | Post-Biologisk Skogsbruk, generators 9-10 (Klon-Skog, Planetär Terraformer) |
| 8 | Årsredovisning milestone at 10B, Terraforming content |
| 9-10 | Cosmic generators (Nanoskördare, Dimensionsskördare) |
| 11-12 | Multiverse generators + meta-endgame |

---

## 7. Component Architecture

### Layout
```
App.tsx
├── TopBar (stammar, kapital, lobby, image counters)
├── MainContent
│   ├── LeftPanel
│   │   ├── ClickArea.tsx (main button + stammar display)
│   │   └── OwnerMeter.tsx (skogsägarförtroende, phase 2+)
│   └── RightPanel
│       ├── TabNav.tsx (4 tabs: Produktion, Makt, Expansion, Fakta)
│       ├── Generators.tsx (scrollable generator list)
│       ├── LobbyPanel.tsx (earn/spend PK, phase 2+)
│       └── ExpansionPanel.tsx (Expansion tab: territory map + acquisition, phase 6+)
├── NewsTicker.tsx (bottom ticker bar)
├── EventModal.tsx (overlay when event fires)
├── AchievementPopup.tsx (toast notification)
└── EndScreen.tsx (årsredovisning milestone + reality page)
```

### Rendering Strategy
- **TopBar** always renders (resource counters)
- **Generators** always renders (main interaction)
- **LobbyPanel** renders when phase >= 2
- **ExpansionPanel** renders when phase >= 6
- **OwnerMeter** renders when phase >= 2
- **EventModal** renders when `activeEvent !== null`
- **EndScreen** renders as milestone at 10B totalStammar
- **Numbers** use formatting utility (see below)
- **Ticker** is CSS animation, content from milestone triggers

### Number Formatting
```
< 1,000:       exact (742)
< 1,000,000:   with spaces (1 247 892) [Swedish format]
< 1B:          suffix (247,3M)
>= 1B:         suffix (4,7 miljarder)
```
Note: Swedish number format uses space as thousands separator and comma as decimal.

---

## 8. Visual Theme Implementation

### Color Tokens (CSS Custom Properties)
```css
--bg-primary: #F0F0F0;       /* Main background */
--bg-secondary: #E0E0E0;     /* Cards, panels */
--bg-grid: #D0D0D0;          /* Grid lines */
--accent: #D4730C;            /* Industrial orange */
--accent-green: #7DB840;      /* Ironic "hållbarhet" */
--text-primary: #2C2C2C;      /* Main text */
--text-secondary: #666666;    /* Labels, hints */
--danger: #CC2222;            /* Warnings, scandals */
--endgame-bg: #FFFFFF;        /* Endgame screen */
```

### Typography
```css
--font-primary: 'IBM Plex Mono', 'Courier New', monospace;
--font-display: 2.5rem;      /* Large numbers (stammar counter) */
--font-heading: 1.5rem;      /* Section headings */
--font-body: 1rem;            /* Normal text */
--font-label: 0.75rem;       /* Labels, hints */
--font-ticker: 0.875rem;     /* News ticker */
```

### Grid Background
Subtle millimeterpapper effect using CSS:
```css
background-image:
  linear-gradient(var(--bg-grid) 1px, transparent 1px),
  linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px);
background-size: 20px 20px;
```

### Card Style (Byråkratisk Brutalism)
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--bg-grid);
  border-radius: 2px;          /* Minimal rounding — brutalist */
  box-shadow: 2px 2px 0 var(--bg-grid);
  padding: 1rem;
}
```

---

## 9. Animation Catalog

| Element | Animation | Implementation |
|---|---|---|
| Click button press | Scale 0.95 → bounce | Framer Motion `whileTap` |
| Click particles | Dots burst outward | Canvas overlay, 10-15 particles |
| Number counters | Smooth count-up | Custom hook `useAnimatedNumber` |
| Generator purchase | Flash + floating "+1" | CSS keyframes |
| Event modal | Scale from 0.8 + fade | Framer Motion animate |
| Phase transition | Fade overlay + typewriter text | Multi-step Framer Motion |
| Achievement toast | Slide from top | Framer Motion + auto-dismiss |
| Ticker scroll | Continuous marquee | CSS `@keyframes marquee` |
| Owner meter | Animated fill width | CSS transition |

---

## 10. Mobile Considerations

- Stack layout vertically on small screens (< 768px)
- Min touch target: 44x44px
- Click button: large, centered, satisfying tap feedback
- Event modals: full-screen on mobile
- Safe area insets for notch devices
- Generator list scrollable within panel

---

## 11. Performance Budget

- Initial bundle: < 500KB gzipped
- Tick computation: < 5ms (leave 95ms for rendering)
- Batch DOM updates with `requestAnimationFrame`
- Achievement checks every 10 ticks (not every tick)
- Event data loaded per-phase (code-split if needed)

---

## 12. File Structure (as of Sprint 4 — shipped)

See `context.md` for full project structure.

### Store Actions (implemented)
- `tick(now)` — main game loop: generator production, kapital conversion, hidden vars, antagonist effects, lobby modifiers, event/phase checks
- `click()` — add stammarPerClick to stammar + tiny kapital
- `buyGenerator(id)` — spend stammar to buy a generator
- `buyClickUpgrade(id)` — spend kapital to buy a click multiplier
- `purchaseUpgrade(id)` — spend resource to buy a tech tree upgrade
- `buyLobbyEarner(id)` — spend kapital to earn Politiskt Kapital
- `buyLobbyProject(id)` — spend PK for permanent law/policy effects
- `buyPRCampaign(id)` — spend kapital to restore Grön Image
- `performOwnerAction(id)` — manipulate skogsägarförtroende (cooldown-based)
- `counterAntagonist(id)` — spend kapital/PK to counter an active antagonist
- `resolveEvent(choiceIndex)` — apply event choice effects
- `save()` / `load()` / `reset()` — persistence
- `completePhaseTransition()` — advance to next phase

### Key Implementation Details
- Generators cost **stammar** (not kapital) — creates the idle loop
- Click also gives tiny kapital (0.5% of stammarPerClick) to bootstrap the economy
- `clickUpgrades` is a separate `Record<string, boolean>` from tech tree `upgrades`
- Lobby earners are repeatable (purchased=false), lobby purchases are one-time (purchased=true)
- Owner actions have cooldown timers in `ownerActionCooldowns: Record<string, number>`
- Antagonists triggered by conditions in tick, countered via action (costs kapital or PK)
- Lobby modifiers applied in tick: generatorBoost, kapitalBoost, imageLossReduction, lobbyDiscount, ownerTrustLock
- Lobby generator boost capped at +100% (max 2.0x multiplier)
- Hidden variables accumulate every tick: realCO2, ownerProfit, biodiversity, species, samiLand
- Expansion targets produce stammar/s + kapital/s in tick, with hidden biodiversity + CO2 costs
- EndScreen triggers as milestone at 10B; game continues to phase 12
- Reality page shows real Swedish forestry facts + link to Föreningen Naturhänsyn after endgame
- Save version: 3 (v2→v3 adds expansionTargets)
- Audio: fully procedural via Web Audio API, no audio files
- Kapital conversion rate scales with phase (0.01 → 0.10) and is modified by ownerTrust

---

## 13. Key Deviations from plan.md

| plan.md says | We do instead | Why |
|---|---|---|
| "ALDRIG localStorage" | Zustand + localStorage saves | Save system already built and working from Orange Man codebase |
| "useState/useReducer" | Zustand store | Already built, more suitable for game state |
| "Single-file .jsx" | Component-based app structure | Already structured this way, better maintainability |
| No mention of Framer Motion | Framer Motion for animations | Already in codebase, works well |

---

*"Frihet under ansvar. Ansvar under oss."*
— Silva Maximus AB:s inofficiella motto
