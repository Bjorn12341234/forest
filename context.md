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

## Current Status: All 7 Sprints Complete — Deployed

**Live at:** https://bjorn12341234.github.io/forest/

### What's working
- **Sprint 1 — Core mechanics:** click → stammar → generators → kapital, 8 generators (phase-gated), 4 click upgrades, 20 tech tree upgrades, phase transitions
- **Sprint 2 — Power systems:** Lobby system (4 earners + 7 purchases), OwnerMeter with 5 manipulation actions, PR campaigns (4 image-restore options), News ticker (30+ milestone-based headlines), Events (11 phase 1 + 12 phase 2-4), 3 tabs (Översikt, Teknik, Makt)
- **Sprint 3 — Depth & endgame:** 28 achievements in 6 tiers, 7 antagonists with condition triggers and countermeasures, hidden variables (realCO2, ownerProfit, biodiversity, species, samiLand), EndScreen "Årsredovisning" with sequential reveal and post-credits
- **Sprint 4 — Polish & ship:** Multi-layered ambient soundscapes per phase (Web Audio API), generator balancing pass, 12 new events (phases 5-7), ~15 new ticker headlines, PWA (manifest, service worker, icons), mobile touch targets, safe area insets, GitHub Actions deploy
- **Sprint 5 — Den Stora Expansionen:** Extended to 12 phases across 4 eras (Sverige→Världen→Universum→Bortom). Expansion tab with stylized maps (world→solar system→galaxy→multiverse) and 18 acquirable targets. 87 new events for phases 2-12. 6 new generators. 12 new tech tree upgrades. 20 new achievements. 5 new antagonists, 5 new lobby projects, 25+ ticker headlines. Audio for phases 8-12. Årsredovisning reworked as milestone. Reality page with real facts + link to naturhansyn.se. Save migration v2→v3.
- **Sprint 6 — Den Mörka Expansionen:** New 4-era system (SVERIGE/MAKT/INTERNATIONELL/EXPANSION). Country takeover mechanic (14 countries, phases 7-9). Warning system (image-based production penalties). Era-specific visual themes. 32+ new tech upgrades. 22 INTERNATIONELL events. Redistributed generators/antagonists/lobby across eras. Save migration v3→v4.
- **Sprint 7 — Skogsägarvägen:** Dual-path architecture (industry/owner). Owner path: CharacterSelect screen, owner resources (skogsvardering, inkomst, kunskap, resiliens, biodiv, carbon, legacy, deadwood), 9 owner generators with bonus system, 5 click upgrades, knowledge panel. Industry attacks (8 attacks at SV milestones, require kunskap to resist), industry lures (3 traps with reveal mechanic). 11 owner events, 25 owner ticker headlines, 13 owner achievements. OwnerEndScreen (triggers at legacy >= 500, 3-stage reveal). Owner ambient audio (wind, birds tied to biodiv, brook). Balancing pass. Save migration v4→v5→v6.
- **Post-launch fixes:** Events blocked during phase transitions, Nastlé/NCA satirical references, UX readability pass, warning banner, easier endgame economy

---

## Project Structure

```
forest/
├── forest.md             # Game Design Document (source of truth)
├── context.md            # This file
├── spec.md               # Technical spec
├── tasks.md              # Sprint tasks
├── plan.md               # Original planning document (reference only)
├── index.html            # Entry HTML (IBM Plex Mono fonts, PWA meta tags)
├── package.json          # Vite, React, TS, Zustand, Framer Motion, Tailwind
├── vite.config.ts        # base: '/forest/'
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions: build + deploy to Pages
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service worker (cache-first)
│   ├── icon.svg          # SVG favicon
│   ├── icon-192.png      # PWA icon 192x192
│   └── icon-512.png      # PWA icon 512x512
├── src/
│   ├── App.tsx           # Root component — tab nav, overlays, engine hooks
│   ├── main.tsx          # Entry point + service worker registration
│   ├── store/
│   │   ├── types.ts      # GameState, GeneratorState, actions, etc.
│   │   ├── gameStore.ts  # Zustand store + all actions (tick, click, buy, lobby, etc.)
│   │   └── selectors.ts  # Selector hooks
│   ├── engine/
│   │   ├── formulas.ts   # Cost scaling, kapital conversion, ownerTrust, event timing
│   │   ├── format.ts     # Number formatting (Swedish)
│   │   ├── events.ts     # Event engine (scheduling, selection, resolution)
│   │   ├── phases.ts     # Phase thresholds + transition scripts
│   │   ├── audio.ts      # Procedural audio (Web Audio API): ambient soundscapes + SFX
│   │   ├── warnings.ts   # Warning system (4 levels, image-based production penalties)
│   │   ├── save.ts       # localStorage save/load (key: silva_maximus_save, version 6)
│   │   └── offline.ts    # Offline progression (10% rate, max 10 events)
│   ├── data/
│   │   ├── generators.ts     # 20 generators (phase-gated, costScale per generator)
│   │   ├── clickUpgrades.ts  # 4 click multiplier upgrades
│   │   ├── upgradeRegistry.ts # Central registry for tech tree upgrades
│   │   ├── achievements.ts   # 61 achievements in 8 tiers (incl. skogsagare)
│   │   ├── antagonists.ts    # 17 antagonists with triggers + countermeasures
│   │   ├── lobbyProjects.ts  # 8 lobby earners + 12 one-time purchases
│   │   ├── ownerActions.ts   # 5 owner actions + 4 PR campaigns
│   │   ├── newsTickerLines.ts # 80+ headlines organized by phase
│   │   ├── countries.ts      # 14 countries (INTERNATIONELL phases 7-9)
│   │   ├── expansionTargets.ts  # 8 expansion targets (EXPANSION phases 10-12)
│   │   ├── ownerGenerators.ts   # 9 owner generators with bonus system
│   │   ├── ownerClickUpgrades.ts # 5 owner click upgrades
│   │   ├── ownerKnowledge.ts    # 5 knowledge activities + 6 thresholds
│   │   ├── ownerEvents.ts       # 11 owner path events
│   │   ├── ownerNewsLines.ts    # 25 owner ticker headlines
│   │   ├── industryAttacks.ts   # 8 industry attacks on owner (SV milestones)
│   │   ├── industryLures.ts     # 3 industry lures (trap mechanic)
│   │   ├── phase1/
│   │   │   ├── upgrades.ts   # Tech tree upgrades
│   │   │   └── events.ts     # Phase 1 events
│   │   ├── phase2/
│   │   │   ├── events.ts     # Phase 2-4 events
│   │   │   └── newEvents.ts   # Phase 2-3 new events (Sprint 5)
│   │   ├── phase3/
│   │   │   ├── upgrades.ts   # Tech tree: Geopolitik, Genetik, Rymdforskning branches
│   │   │   └── events.ts     # Phase 3-4 events
│   │   ├── phase5/
│   │   │   ├── events.ts     # Phase 5-7 events
│   │   │   └── newEvents.ts   # Phase 5-7 new events (Sprint 5)
│   │   ├── phase7/
│   │   │   ├── upgrades.ts   # INTERNATIONELL tech upgrades (12)
│   │   │   └── events.ts     # INTERNATIONELL events (22)
│   │   ├── phase8/
│   │   │   └── events.ts     # EXPANSION events (phases 10-12)
│   │   └── phase10/
│   │       └── upgrades.ts   # EXPANSION tech upgrades (8)
│   ├── components/
│   │   ├── ClickArea.tsx      # "Skriv Skogsbruksplan" button + click upgrades
│   │   ├── Generators.tsx     # Generator list with buy buttons
│   │   ├── Dashboard.tsx      # Main game view (resources + ClickArea + Generators)
│   │   ├── ResearchTree.tsx   # Tech tree (Avverkning branch)
│   │   ├── LobbyPanel.tsx     # Makt tab: earn PK, spend PK, PR campaigns
│   │   ├── OwnerMeter.tsx     # Skogsägarförtroende bar + manipulation actions
│   │   ├── AntagonistPanel.tsx # Active antagonists + counter buttons
│   │   ├── ExpansionPanel.tsx  # Expansion tab: territory map (phase 6+)
│   │   ├── EndScreen.tsx      # Industry endgame "Årsredovisning" + post-credits + reality page
│   │   ├── EventModal.tsx     # Event popup with choices
│   │   ├── Ticker.tsx         # Industry news ticker (milestone-based headlines)
│   │   ├── CharacterSelect.tsx # Game mode selection (industry/owner)
│   │   ├── owner/
│   │   │   ├── OwnerDashboard.tsx   # Owner main view (resources + generators)
│   │   │   ├── OwnerClickArea.tsx   # "Vårda Skog" click button
│   │   │   ├── OwnerGenerators.tsx  # Owner generator list
│   │   │   ├── KnowledgePanel.tsx   # Knowledge activities + thresholds
│   │   │   ├── OwnerTicker.tsx      # Owner news ticker (green tone)
│   │   │   ├── OwnerEndScreen.tsx   # Owner endgame (3-stage reveal)
│   │   │   ├── IndustryAttackModal.tsx  # Attack resist/surrender modal
│   │   │   └── IndustryLureModal.tsx    # Lure accept/decline modal
│   │   ├── UpgradeList.tsx    # Tech tree upgrade cards
│   │   ├── PhaseTransition.tsx # Phase transition overlay
│   │   ├── AchievementToast.tsx # Toast notification manager
│   │   ├── AchievementPanel.tsx # Full achievement list by tier
│   │   ├── OfflineReturnModal.tsx # Offline progress report
│   │   ├── SettingsPanel.tsx  # Settings (volume, theme, save/load/export)
│   │   ├── TabNav.tsx         # Bottom tab navigation (4 tabs)
│   │   └── ui/
│   │       ├── GlassCard.tsx      # Brutalist card component
│   │       ├── AnimatedNumber.tsx  # Smooth number counter
│   │       └── ParticleCanvas.tsx  # Click particle effect
│   ├── hooks/
│   │   ├── useGameLoop.ts    # 100ms interval tick
│   │   ├── useAutoSave.ts    # 30-second auto-save
│   │   ├── useAchievements.ts # Achievement condition checking
│   │   ├── useOfflineCalc.ts # Offline progression on mount
│   │   └── useAudioSync.ts   # Audio state sync (ambient + phase changes)
│   └── styles/
│       └── global.css        # Byråkratisk Brutalism theme (Tailwind v4)
```

---

## Game Phases (Summary)

| Era | Phase | Name | Stammar Range | Key Unlock |
|---|---|---|---|---|
| SVERIGE | 1 | Lokalpatriot | 0 – 10K | Lobby module |
| SVERIGE | 2 | Den Goda Grannen | 10K – 100K | PR/Image system |
| SVERIGE | 3 | Massabaronen | 100K – 1M | International lobby |
| MAKT | 4 | PR-Katastrofen | 1M – 10M | Sami conflict event |
| MAKT | 5 | Det Skogsindustriella Komplexet | 10M – 100M | Warning system |
| MAKT | 6 | Global Skogskonglomerat | 100M – 1B | Expansion tab |
| INTERNATIONELL | 7 | Kolonialt Skogsbruk | 1B – 10B | Country takeover |
| INTERNATIONELL | 8 | Planetär Exploatering | 10B – 100B | Global dominance |
| INTERNATIONELL | 9 | Jordens Sista Skog | 100B – 1T | Årsredovisning milestone |
| EXPANSION | 10 | Terraforming AB | 1T – 10T | Space expansion |
| EXPANSION | 11 | Kosmisk Industrialisering | 10T – 100T | Multiverse |
| EXPANSION | 12 | Entropins Slut | 100T+ | Reality page |

---

## Primary Resources

| Resource | Internal Name | UI Label | Description |
|---|---|---|---|
| Click output | `stammar` | Stammar | Base resource. Each click = stems felled. |
| Currency | `kapital` | Kapital (Mkr) | Generated from selling stammar. Buys everything. |
| Influence | `lobby` | Politiskt Kapital | Earned via lobby actions. Required for laws. |
| PR | `image` | Grön Image™ | Public perception. Starts at 100. Drops on scandal. |

### Owner Path Resources (Skogsägarvägen)

| Resource | Internal Name | Description |
|---|---|---|
| Forest value | `skogsvardering` | Base resource from clicking "Vårda Skog" + generators |
| Income | `inkomst` | Currency (tkr). Buys click upgrades, knowledge, generators |
| Knowledge | `kunskap` | Required to resist industry attacks |
| Resilience | `resiliens` | Storm/pest resistance. Grows via biodiv + generators |
| Biodiversity | `biodivOwner` | Grows via deadwood + generators |
| Carbon | `realCarbonPos` | Grows with standing forest |
| Legacy | `legacy` | Endgame trigger (>= 500). Grows over time + biodiv + resistance |
| Deadwood | `deadwood` | Feeds biodiversity. From generators (död-ved-program) |

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
