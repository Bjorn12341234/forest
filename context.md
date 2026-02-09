# SILVA MAXIMUS — Context & Session Protocol

> This file is the onboarding doc for any new Claude Code session.

---

## Vision

Silva Maximus is a satirical incremental/idle game about the Swedish forestry industrial complex, in the tradition of Universal Paperclips. The player is "Massaindustrin AB" — clicking to write forestry plans, buying generators, lobbying politicians, manipulating forest owners, and escalating to absurd scale. The tone is black humor and satire grounded in real Swedish forestry politics. The game is entirely in Swedish.

The hidden point: every upgrade that looks positive has a hidden cost revealed gradually. By endgame, the player sees a clinical "receipt" showing the real damage — CO2 emissions the reports hid, the 1:12 profit ratio between forest owners and industry, the species wiped out, the Sami reindeer grazing land destroyed.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript | Type safety |
| UI | React 18+ | Component-based |
| Build | Vite | Fast dev |
| State | Zustand | Lightweight game state |
| Styling | Tailwind CSS v4 + CSS custom utilities | Utility + custom animations |
| Animations | Framer Motion | Smooth transitions |
| Save System | localStorage + JSON export/import | Simple, already built and working |

---

## Architecture Principles

1. **Game loop on 100ms tick** — 10 ticks/second via `setInterval`, calculates resource deltas, checks event triggers
2. **Single Zustand store** — `src/store/gameStore.ts` holds all game state; components subscribe to slices
3. **Phases are config-driven** — data files define generators, upgrades, events, achievements; the engine is generic
4. **Events are declarative** — trigger conditions and choices defined in data, engine evaluates
5. **Offline calc is simple** — elapsed time * production rate, capped
6. **Auto-save every 30 seconds** — to localStorage

---

## Key Design Constraints

- **All text in Swedish** — UI labels, flavour text, events, achievements, everything
- **No real company/person names** — fictional but recognizable parodies (see forest.md section 14)
- **Mobile-first layout** — responsive, works on phone screens
- **Visual theme: "Byråkratisk Brutalism"** — light grey background with grid lines, monospace font, industrial orange accent

### Note on localStorage

plan.md says "ALDRIG localStorage/sessionStorage". However, the existing codebase uses Zustand with localStorage for saves (`src/engine/save.ts`). The save system is already built and working. **We keep the existing save system.** This is an intentional deviation from plan.md.

---

## Visual Design Direction: "Byråkratisk Brutalism"

- **Background:** Light grey (#F0F0F0) with subtle grid lines (like millimeterpapper/skogsbruksplan)
- **Accent 1:** Industrial orange (#D4730C) — buttons, numbers, progress bars
- **Accent 2:** "Falsk grön" (#7DB840) — used ironically for "hållbarhets" elements
- **Text:** Dark grey (#2C2C2C), monospace font (IBM Plex Mono / Courier)
- **Warning/Scandal:** Red (#CC2222)
- **Endgame:** White background, black text, clinical

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F0F0F0` | Main background |
| `--bg-secondary` | `#E0E0E0` | Cards, panels |
| `--bg-grid` | `#D0D0D0` | Grid lines |
| `--accent` | `#D4730C` | Industrial orange, buttons |
| `--accent-green` | `#7DB840` | Ironic "hållbarhet" elements |
| `--text-primary` | `#2C2C2C` | Main text |
| `--text-secondary` | `#666666` | Labels, hints |
| `--danger` | `#CC2222` | Warnings, scandals |
| `--endgame-bg` | `#FFFFFF` | Endgame screen |

---

## Current Sprint Status: Sprint 1 Complete

### What's working
- Core idle loop: click → stammar → generators → kapital
- 8 generators (phase-gated), 4 click upgrades, 20 tech tree upgrades, 11 events, 11 achievements
- 2-panel dashboard layout (ClickArea + Generators), resource bar, phase progress
- Kapital conversion with ownerTrust modifier
- Phase transitions with overlay
- Events system, achievements, offline progression, auto-save

### Next: Sprint 2 — Maktspelet (Power Systems)
- Lobby system (Politiskt Kapital)
- Skogsägarförtroende meter (OwnerMeter)
- Image/PR system
- More events
- News ticker

---

## Project Structure

```
forest/
├── forest.md             # Game Design Document (source of truth)
├── context.md            # This file
├── spec.md               # Technical spec
├── tasks.md              # Sprint tasks
├── plan.md               # Original planning document (reference only)
├── index.html            # Entry HTML (IBM Plex Mono fonts)
├── package.json          # Vite, React, TS, Zustand, Framer Motion, Tailwind
├── src/
│   ├── App.tsx           # Root component — tab nav, overlays, engine hooks
│   ├── store/
│   │   ├── types.ts      # GameState, GeneratorState, actions, etc.
│   │   ├── gameStore.ts  # Zustand store + all actions (tick, click, buy, etc.)
│   │   └── selectors.ts  # Selector hooks (useStammarPS, useKapital, etc.)
│   ├── engine/
│   │   ├── formulas.ts   # Cost scaling, kapital conversion, ownerTrust modifier
│   │   ├── format.ts     # Number formatting
│   │   ├── events.ts     # Event engine (scheduling, selection, resolution)
│   │   ├── phases.ts     # Phase thresholds + transition scripts
│   │   ├── audio.ts      # Sound effects (click, purchase, achievement)
│   │   ├── save.ts       # localStorage save/load (key: silva_maximus_save)
│   │   └── offline.ts    # Offline progression calculation
│   ├── data/
│   │   ├── generators.ts     # 8 generator definitions (phase-gated)
│   │   ├── clickUpgrades.ts  # 4 click multiplier upgrades (kapital-cost)
│   │   ├── upgradeRegistry.ts # Central registry connecting all upgrade data
│   │   ├── achievements.ts   # All achievements by tier
│   │   └── phase1/
│   │       ├── upgrades.ts   # 20 tech tree upgrades (4 trees)
│   │       └── events.ts     # 11 phase 1 events
│   ├── components/
│   │   ├── ClickArea.tsx      # "Skriv Skogsbruksplan" button + click upgrades
│   │   ├── Generators.tsx     # Generator list with buy buttons
│   │   ├── Dashboard.tsx      # Main game view (resources + ClickArea + Generators)
│   │   ├── ResearchTree.tsx   # Tech tree (Avverkning branch)
│   │   ├── EventModal.tsx     # Event popup with choices
│   │   ├── Ticker.tsx         # News ticker (event headlines)
│   │   ├── MainButton.tsx     # Generic click button (legacy, used by ClickArea)
│   │   ├── UpgradeList.tsx    # Tech tree upgrade cards
│   │   ├── UpgradeCard.tsx    # Individual upgrade card
│   │   ├── PhaseTransition.tsx # Phase transition overlay
│   │   ├── AchievementToast.tsx # Toast notification manager
│   │   ├── AchievementPanel.tsx # Full achievement list panel
│   │   ├── OfflineReturnModal.tsx # Offline progress report
│   │   ├── SettingsPanel.tsx  # Settings (volume, theme, save/load)
│   │   ├── TabNav.tsx         # Bottom tab navigation
│   │   └── ui/
│   │       ├── GlassCard.tsx      # Brutalist card component
│   │       ├── AnimatedNumber.tsx  # Smooth number counter
│   │       └── ParticleCanvas.tsx  # Click particle effect
│   ├── hooks/
│   │   ├── useGameLoop.ts    # 100ms interval tick
│   │   ├── useAutoSave.ts    # 30-second auto-save
│   │   ├── useAchievements.ts # Achievement condition checking
│   │   ├── useOfflineCalc.ts # Offline progression on mount
│   │   ├── useAudioSync.ts   # Audio state sync
│   │   └── useAnimatedNumber.ts # Number animation hook
│   └── styles/
│       └── global.css        # Byråkratisk Brutalism theme (Tailwind v4)
```

---

## Game Phases (Summary)

| Phase | Name | Stammar Range | Key Unlock |
|---|---|---|---|
| 1 | Lokalpatriot | 0 – 10,000 | Lobby module |
| 2 | Den Goda Grannen | 10k – 100k | PR/Image system |
| 3 | Massabaronen | 100k – 1M | International lobby |
| 4 | PR-Katastrofen | 1M – 10M | Sami conflict event |
| 5 | Det Skogsindustriella Komplexet | 10M – 100M | Endgame module |
| 6 | Post-Biologisk Skogsbruk | 100M – 1B | Terraforming/Expansion |
| 7 | UNIVERSUM AB | 1B+ | Endgame receipt |

---

## Primary Resources

| Resource | Internal Name | UI Label | Description |
|---|---|---|---|
| Click output | `stammar` | Stammar | Base resource. Each click = stems felled. |
| Currency | `kapital` | Kapital (Mkr) | Generated from selling stammar. Buys everything. |
| Influence | `lobby` | Politiskt Kapital | Earned via lobby actions. Required for laws. |
| PR | `image` | Grön Image™ | Public perception. Starts at 100. Drops on scandal. |

### Hidden Resources (revealed in endgame)

| Hidden Resource | Internal Name | Revealed In |
|---|---|---|
| Real net CO2 emissions | `realCO2` | Endgame |
| Forest owner actual profit | `ownerProfit` | Endgame |
| Biodiversity | `biodiversity` | Gradual |
| Species count | `species` | Endgame |
| Sami reindeer grazing land | `samiLand` | Mid-game |

---

## Session Continuity Protocol

### Starting a New Session

Say: **"Read the md files and proceed"** (or similar).

Claude Code will:
1. Read `context.md` (this file) — understand the project
2. Read `tasks.md` — find the next unchecked task
3. Read `spec.md` — understand the technical approach
4. Read `forest.md` if needed — check game design details
5. Start coding the next task

### After Completing a Coding Task

1. Check off the task in `tasks.md` (change `[ ]` to `[x]`)
2. Update `spec.md` if technical decisions changed
3. Update `context.md` if project structure changed
4. Note any blockers in `tasks.md`
5. Commit the code

### Rules

- `forest.md` is the **game design source of truth**
- `tasks.md` is the **work tracker**
- `spec.md` is the **technical source of truth**
- `context.md` is the **onboarding doc** (this file)
- `plan.md` is the **original planning reference** (read-only, may conflict with later decisions)
- When in doubt, ask the user

---

*"Frihet under ansvar. Ansvar under oss."*
— Silva Maximus AB:s inofficiella motto
