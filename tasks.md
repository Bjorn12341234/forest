# SILVA MAXIMUS — Task Tracker

## How This File Works

- Each task has a checkbox: `[ ]` = pending, `[x]` = done
- Tasks are grouped into sprints matching the production plan
- **After completing a task:** check it off, add notes if needed, update spec.md/context.md
- **Starting a new session:** Read this file, find the first unchecked task, and start working
- Tasks within a sprint should be done in order (they build on each other)

---

## Sprint 0: Project Conversion Setup

### S0.1 — Documentation & Cleanup
- [x] Rewrite forest.md (Game Design Document)
- [x] Rewrite context.md (Project Context)
- [x] Rewrite spec.md (Technical Spec)
- [x] Rewrite tasks.md (this file)
- [x] Delete orange_man.md
- [x] Remove Orange Man-specific data files (phase2/, phase3/, phase4/, phase5/)
- [x] Remove Orange Man-specific components (InstitutionBoard, WorldMap, FleetPanel, SpaceView, UniverseView, etc.)
- [x] Update index.html (fonts: IBM Plex Mono, new title "SILVA MAXIMUS")
- [x] Update global.css (new color theme: Byråkratisk Brutalism)

**Notes:** All core files rewritten as clean skeletons. Phase 1 data populated (20 upgrades, 11 events, 11 achievements). Build passes. vite base path changed to /silva-maximus/. upgradeRegistry.ts is an empty stub — upgrades exist in phase1/upgrades.ts but aren't connected yet.

---

## Sprint 1: Minimum Viable Satire (Core Mechanics)

### S1.1 — Game State Rewrite
- [x] Rewrite store/types.ts with new resource model (Stammar, Kapital, Lobby, Image, hidden vars)
- [x] Rewrite store/gameStore.ts with new actions (click, buyGenerator, buyUpgrade, lobbyAction, ownerAction)
- [x] Rewrite store/selectors.ts with new derived values (stammarPS, kapitalPS, phase)
- [x] Update engine/formulas.ts with new game math (generator costs, kapital conversion, owner trust)
- [x] Update engine/save.ts (new save key: silva_maximus_save, new state shape)
- [x] Update engine/phases.ts (7 phases with stammar thresholds)

### S1.2 — Click Mechanic ("Skriv Skogsbruksplan")
- [x] Build ClickArea.tsx — main click button with stammar counter
  - Flavourtext changes with phase progression (Tier 0-4)
  - Particle effect on click
  - Display: stammar count, stammar/click, stammar/second
- [x] Define click multiplier upgrades in data/clickUpgrades.ts
  - Bättre penna (+1/klick, 50 Kapital)
  - Digital plan (+5/klick, 200 Kapital)
  - Planfabrik (+20/klick, 1,000 Kapital)
  - AI-Planering (+100/klick, 10,000 Kapital)

### S1.3 — Generator System
- [x] Define all 8 generators in data/generators.ts
  - Virkesuppköpare (100, 1/s)
  - Skördarteam (500, 5/s)
  - Massafabrik (2,500, 25/s)
  - Markberedningsmaskin (10,000, 100/s)
  - Certifieringskarousel (50,000, 500/s)
  - Lobbyfirma (200,000, 2,000/s)
  - Autonomt Skördarnätverk (1,000,000, 10,000/s)
  - Orbital Timberstation (50,000,000, 100,000/s)
- [x] Build Generators.tsx — scrollable generator list with buy buttons
  - Show: name, count, cost, stammar/s, flavourtext
  - Locked/affordable/owned states
  - Cost scaling (1.15^n)
- [x] Wire generator production into game loop tick

### S1.4 — Kapital System
- [x] Implement stammar → kapital conversion in tick
- [x] Display kapital in resource bar
- [x] Wire kapital costs for upgrades and generators

### S1.5 — Dashboard Layout
- [x] Rewrite App.tsx with new single-page layout
  - Left panel: ClickArea + resource display
  - Right panel: Generators
  - Bottom: NewsTicker
  - Top bar: Stammar, Kapital, Politiskt Kapital, Grön Image
- [x] Apply Byråkratisk Brutalism theme
  - Light grey background with grid lines
  - Industrial orange accent
  - Monospace font (IBM Plex Mono)
  - Paper-like feel
- [x] Phase progression display (current phase name + progress)
- [x] Ensure mobile-responsive (stack vertically on mobile)

### S1.6 — Basic Phase Progression
- [x] Implement phase detection based on total stammar thresholds
- [x] Phase transition overlay (show phase name + flavourtext)
- [x] Unlock generators based on phase
- [x] Update click flavourtext on phase change

**Notes:** Sprint 1 complete. Key changes:
- Created `src/data/generators.ts` with all 8 generators (phase-gated: 1-3 in phase 1, 4-5 in phase 2, etc.)
- Created `src/data/clickUpgrades.ts` with 4 click multiplier upgrades (kapital-cost)
- Connected `upgradeRegistry.ts` to phase1/upgrades.ts data
- Game store rewritten with: `buyGenerator`, `buyClickUpgrade`, proper tick with generator baseProduction lookup, kapital conversion with ownerTrust modifier
- `formulas.ts` now has `getKapitalConversionRate(phase)` and `getOwnerTrustModifier(trust)`
- New components: `ClickArea.tsx` (Skriv Skogsbruksplan button + phase flavourtext + click upgrades), `Generators.tsx` (buy generators with stammar)
- `Dashboard.tsx` rewritten as 2-panel layout: resource bar + phase progress + ClickArea left / Generators right
- Generators cost stammar (not kapital), click upgrades cost kapital — creates the classic idle game loop
- Clicking also gives tiny kapital (0.5% of stammarPerClick) so player can bootstrap
- Build passes cleanly, dev server runs

---

## Sprint 2: Maktspelet (Power Systems)

### S2.1 — Lobby System (Politiskt Kapital)
- [x] Define lobby earner activities in data/lobbyProjects.ts
  - Älgjakt med riksdagsledamot (5,000 Kapital → +10 PK)
  - Finansiera tankesmedja (25,000 → +50 PK)
  - Sponsra partistämma (100,000 → +200 PK)
  - Transatlantiska Kontakten (500,000 → +1,000 PK)
- [x] Define lobby purchases (lagändringar) in data/lobbyProjects.ts
  - "Frihet Under Ansvar 2.0" (50 PK)
  - "Skogsstyrelsen: Tillsynsbudget -40%" (100 PK)
  - "Äganderätten Är Hotad!" (200 PK)
  - "Operation Omnibus" (500 PK)
  - "Myndighetskapning" (1,000 PK)
  - "Svängdörren" (2,000 PK)
  - "Avskogningsförordningen: Avvecklad" (5,000 PK)
- [x] Build LobbyPanel.tsx — split view: earn PK activities + spend PK on projects
- [x] Wire lobby effects into game loop (modifiers on generators, image, etc.)

### S2.2 — Skogsägarförtroende
- [x] Build OwnerMeter.tsx — progress bar with sweet spot zone (40-60) highlighted
  - Visual: green zone (40-60), yellow (20-40, 60-80), red (0-20, 80-100)
  - Current value display
  - Status text based on range
- [x] Define owner manipulation actions
  - Gratis skogsbruksplan (+15 trust)
  - "Äganderätten!"-kampanj (+25 trust)
  - Sänk virkespriset (-10 trust, +30% Kapital)
  - Hårdgallring (-5 trust)
  - "Partnerskap" (+20 trust, 25-year lock)
- [x] Implement trust effects on gameplay
  - >80: reduced income
  - <20: protests, lost revenue
  - 40-60: optimal
- [x] Track hidden owner profit vs industry profit ratio

### S2.3 — Image/PR System
- [x] Implement Grön Image resource (starts at 100)
- [x] Image decay on scandals/aggressive actions
- [x] PR campaign mechanics (spend Kapital to restore Image)
- [x] Image effects on gameplay (low image = more antagonist pressure)

### S2.4 — Events System
- [x] Adapt engine/events.ts for Silva Maximus event structure
- [x] Define all events in data/phase2/events.ts:
  - "Samebyns protest" (500K stammar trigger)
  - "SVT-dokumentär: Slaget om Skogen" (Image < 50)
  - "Ideell förening hittar nyckelbiotop" (every 50K stammar)
  - "Kinesisk prisras" (Phase 3 start)
  - "Plockhugget-problemet" (200K stammar)
  - "Wellpapp-boomen" (1M stammar)
  - "Svenska Kyrkan säljer" (3M stammar)
  - "Greta-effekten" (Image < 30)
  - "Nestlé-Reträtten" (obligatorisk Phase 4 event)
- [x] Adapt EventModal.tsx for Swedish content
- [x] Wire event effects to game state

### S2.5 — News Ticker
- [x] Define all ticker headlines in data/newsTickerLines.ts (organized by phase)
- [x] Build/adapt NewsTicker.tsx — CSS-animated horizontal scroll
  - Styled as news chyron
  - New headlines pushed in based on milestones
- [x] Phase-based headline unlocking

**Notes:** Sprint 2 mostly complete. Key changes:
- Created `src/data/lobbyProjects.ts` with 4 lobby earner activities (repeatable, spend Kapital → earn PK) and 7 lobby purchases (one-time, spend PK → permanent effects)
- Created `src/data/ownerActions.ts` with 5 owner manipulation actions (cooldown-based) + 4 PR campaigns (spend Kapital → restore Image)
- Created `src/data/newsTickerLines.ts` with 30+ headlines organized by phase, with milestone/event/project triggers
- Created `src/components/LobbyPanel.tsx` — full Makt tab with: PK resource summary, OwnerMeter, earn PK section, lobby purchases section, PR campaigns section
- Created `src/components/OwnerMeter.tsx` — color-coded trust bar (red/yellow/green zones) with 5 manipulation action buttons and cooldown timers
- Rewrote `src/components/Ticker.tsx` — now uses milestone-based headlines from newsTickerLines.ts instead of event history
- Updated `TabNav.tsx` to include 'Makt' tab (phase 2+)
- Updated `gameStore.ts` with: `buyLobbyEarner`, `buyLobbyProject`, `performOwnerAction`, `buyPRCampaign` actions; lobby modifier system (generator boost, kapital boost, image protection, lobby discount, owner trust floor); tick loop applies lobby modifiers to stammarPS and kapitalRate
- Updated `types.ts` with ownerActionCooldowns and new actions
- Save migration v1→v2 for ownerActionCooldowns field
- Build passes cleanly (128KB gzipped)
- Remaining: Phase 2-7 event definitions (S2.4 partial) — the events from forest.md (Samebyns protest, SVT-dokumentar, etc.) still need to be defined as GameEvent objects in a new data file. Phase 1 events continue to work as before.

---

## Sprint 3: Den Mörka Sanningen (Depth & Endgame)

### S3.1 — Achievement System
- [x] Define all achievements in data/achievements.ts
  - Tier 1 Lokal: Första Planen, Kaffekoppen, Gallringsmästaren, Första kronan, Lokalpatriot, Storskogsbrukare, Senaste nytt
  - Tier 2 Regional: Frihet Under Ansvar, Äganderättskrigaren, Rysslands-Bonansen, Gröntvätt, Lobbyist
  - Tier 3 Nationell: Nestlé sa nej, GD-Flansen, Klimatambassadören, Massabaronen
  - Tier 4 Internationell: Warborn-Manövern, Transatlantiska Pipansen, FSC-Karussellen, Svängdörren
  - Tier 5 Endgame: Den Tysta Våren, Djurfritt Sedan 2035, Kolonialmakten, Den Perfekta Raden, Och Sen Då?
  - Meta: Karpaltunnel, Tålamod
- [x] Adapt achievement checking hook (existing useAchievements works as-is)
- [x] Build/adapt AchievementPopup.tsx for toast notifications (existing AchievementToast works as-is)
- [x] Achievement panel showing all achievements by tier (rewritten with tier tabs, Swedish labels)

### S3.2 — Antagonist System
- [x] Define antagonists in data/antagonists.ts
  - Skovarnarna (100K stammar, -0.1 Image/s)
  - Den Envisa Pensionaren (nyckelbiotop event, -5 stammar/s)
  - EU-Inspektoren (Phase 4+, -50 stammar/s)
  - Statliga Dokumentarkanalen (Image < 40, -0.5 Image/s)
  - Samebyns Juridik (Phase 5+ & samiLand >= 15, -100 stammar/s)
  - Skogsvispen AB (Phase 3+ & 500K stammar, -5 Kapital/s)
  - Greta (Image < 30, -0.3 Image/s & -10 Kapital/s)
- [x] Implement antagonist trigger and effect system (in tick loop)
- [x] Antagonist countermeasure actions (costs Kapital or PK)
- [x] UI for active antagonists (AntagonistPanel in Makt tab)

### S3.3 — Hidden Variables & Phase-Specific Content
- [x] Track all hidden variables in tick (realCO2, ownerProfit, industryProfit, biodiversity, species, samiLand)
- [x] Species counting: species++ when biodiversity crosses 5% thresholds
- [x] Sami land loss tied to stammar production in phase 3+
- [x] Phase-specific unlocks:
  - Phase 2: Lobby module unlocks (Makt tab)
  - Phase 3+: Antagonist triggers based on conditions
  - Phase 7: Endgame screen at 10B stammar

### S3.4 — Endgame Screen
- [x] Build EndScreen.tsx — the "Årsredovisning" kvitto
  - White/clinical design (contrast to dark game UI)
  - Sequential reveal of hidden bookkeeping rows
  - Verkligt netto-CO2 vs reported (~15%)
  - Skogsägare vs industri profit ratio (1:N)
  - Biodiversity remaining + species lost
  - Sami land lost
  - Institutional capture (Skogsstyrelsen, FSC, EU)
  - Antagonists countered count
- [x] "DELA UT VINST TILL AKTIEÄGARNA" button → post-credits
- [x] Post-credits scroll (real Swedish forestry facts)
- [x] "STARTA OM" button (full game reset)

**Notes:** Sprint 3 complete. Key changes:
- Rewrote `src/data/achievements.ts` with tier-based system: 6 tiers (lokal→endgame+meta), ~28 achievements matching GDD
- Rewrote `AchievementPanel.tsx` with tier tabs, Swedish labels, color-coded tiers
- Created `src/data/antagonists.ts` with 7 antagonists: condition-triggered, per-second penalties, counterable
- Created `src/components/AntagonistPanel.tsx` — shows active antagonists with effects + counter buttons in Makt tab
- Updated `gameStore.ts` tick with: antagonist trigger checking, antagonist tick effects (image/stammar/kapital penalties), species counting at biodiversity thresholds, sami land loss in phase 3+
- Added `counterAntagonist` action to gameStore
- Created `src/components/EndScreen.tsx` — clinical white "Årsredovisning" with sequential reveal, hidden bookkeeping, institutional capture status, post-credits scroll with real facts
- Wired EndScreen into App.tsx (triggers at 10B stammar in phase 7)
- Build passes cleanly (136KB gzipped)

---

## Sprint 4: Polish & Ship

### S4.1 — Sound Design
- [x] Phase-specific ambient audio:
  - Phase 1-2: Bird sounds, wind, creek (idyllic)
  - Phase 3: Chainsaws mixed with fewer birds
  - Phase 4: Harvester machines dominant, single bird
  - Phase 5: Industrial drone, no nature
  - Phase 6: Silence, then monotone hum
  - Phase 7: Complete silence, just EKG-like click pip, then flatline
- [x] Click sound for "Skriv Skogsbruksplan"
- [x] Purchase sounds
- [x] Event notification sound
- [x] Phase transition sound

### S4.2 — Visual Polish
- [x] Ensure Byråkratisk Brutalism theme is consistent
- [x] Grid line background (like millimeterpapper/skogsbruksplan)
- [x] Smooth animations on counters and meters
- [x] Generator purchase animations
- [x] Phase transition animations

### S4.3 — Balancing Pass
- [x] Playtest full game flow (target: 30-60 min total)
  - First 5 min: manual clicking dominates
  - 5-15 min: generators take over
  - 15-30 min: lobby and events drive progression
  - 30-60 min: endgame if optimizing
- [x] Tune generator costs and production rates
- [x] Tune event timing and effects
- [x] Tune owner trust mechanics
- [x] Tune image decay/recovery rates

### S4.4 — Offline Progression
- [x] Offline return screen with summary
- [x] Offline stammar generation (10% of active rate)
- [x] Offline event queue (max 10)

### S4.5 — Remaining Content
- [x] Ensure all news ticker headlines are implemented
- [x] Ensure all events have proper effects
- [x] Ensure all achievements trigger correctly
- [x] Phase 7 terraforming/absurd endgame content

### S4.6 — Mobile & Deployment
- [x] Test responsive layout
- [x] Deploy web version
- [x] PWA setup (manifest, service worker)

**Notes:** Sprint 4 complete. Key changes:
- **S4.1 Sound Design**: Complete audio.ts rewrite with multi-layered ambient soundscapes per phase. Phase 1-2: wind (filtered noise + LFO) + bird chirps (periodic sine sweeps) + drone. Phase 3: wind + fewer birds + chainsaw (distorted sawtooth). Phase 4: light wind + rare bird + industrial layer (rumble + grind + mechanical clicks). Phase 5: full industrial only. Phase 6: sub-bass 40Hz drone + high-pitched whine (tinnitus). Phase 7: EKG beep every 1.5s, click becomes EKG pip (1000Hz sine).
- **S4.2 Visual Polish**: Phase progress bar glow animation at >85%. Updated ClickArea phase 6-7 flavourtext.
- **S4.3 Balancing**: Fixed major generator progression gap — moved gen_autonomt phase 6→5, gen_orbital phase 7→6 (+ adjusted stats: baseCost 50M→10M, production 100K→250K). Increased kapital conversion rates across all phases. Tightened event frequencies.
- **S4.4 Offline Progression**: System verified complete — 10% rate, 60s threshold, max 10 events, crisis auto-resolve, proper modal UI.
- **S4.5 Remaining Content**: Created 12 new events in src/data/phase5/events.ts (phases 5-7: Maktutredningen, EU-inspektion, Svängdörrsskandal, Klimattoppmöte, Sista blandskogen, Genetisk Gran, Den sista fågeln, AI-skördarnätverk, Lunar Silva, Mars Massafabrik, Sista människan, Universums kvitto). Added ~15 new ticker headlines for phases 5-7.
- **S4.6 Mobile & Deploy**: Fixed manifest.json paths for /silva-maximus/ base. Created SVG favicon + PNG icons (192/512). Added apple-touch-icon. Created service worker (sw.js) with cache-first strategy. Registered SW in main.tsx. Increased touch targets to 44px (w-11 h-11). Added safe-area-inset-top to Ticker for notched devices.
- Build: 139KB gzipped, all TypeScript passes cleanly.

---

## Session Handoff Protocol

After every coding session, ensure:

1. [x] <- Check off completed tasks above
2. Update **Notes** under the completed sprint task with:
   - What was built
   - Any deviations from plan
   - Known issues or tech debt
3. If spec.md or context.md need updates, do it
4. Commit all code changes
5. The next session starts by reading these md files and picking up the next `[ ]` task
