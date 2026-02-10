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

## Post-Launch Fixes

### PL.1 — Event/Transition Overlap Fix
- [x] Block events from triggering during phase transitions (pendingTransition check in tick)

### PL.2 — Nastlé/NCA Content
- [x] Updated phase 3→4 transition: "Nastlé ringer. De tycker ni har för dåligt rykte... Nastlé. Tänk på det."
- [x] Updated ticker headline: Nastlé bryter med NCA (the irony of Nestlé finding SCA too disreputable)
- [x] New ticker headline: NCA namnbyte till "Nordic Cellulose Association"

---

## Sprint 5: Den Stora Expansionen

### 5A — Foundation
- [x] 5A-1: Balance Pass — event frequency +30-50%, lobby boost cap +100%, tech costs 3-5x, generator costScale
- [x] 5A-2: Phase Type Extension (7→12) — Phase type union, thresholds, transition scripts, Dashboard PHASE_NAMES
- [x] 5A-3: Endgame Rework — Årsredovisning as milestone, evil-corp post-credits, no fourth-wall breaks
- [x] 5A-4: Save Migration v2→v3 — expansionTargets field, migration function

### 5B — Expansion Tab
- [x] 5B-1: Expansion Data & Store — expansionTargets.ts (18 targets), store integration (acquireExpansionTarget, tick production)
- [x] 5B-2: Expansion Panel Component — 4 SVG map views (world/solar/galaxy/multiverse), CSS-positioned dots, target detail panel

### 5C — Event Content Expansion
- [x] 5C-1: Phase 2-4 Events (30 new) — phase2/newEvents.ts (10), phase3/events.ts (20)
- [x] 5C-2: Phase 5-7 Events (20 new) — phase5/newEvents.ts (20)
- [x] 5C-3: Phase 8-12 Events (37 new) — phase8/events.ts (37 events: space, aliens, multiverse, entropy, meta-endgame)

### 5D — Content Expansion
- [x] 5D-1: 6 New Generators (phases 7-12) — Klon-Skog, Planetär Terraformer, Nanoskördare, Dimensionsskördare, Multiverse-Harvester, Entropimotor
- [x] 5D-2: Late Tech Tree (12 upgrades) — phase3/upgrades.ts: Geopolitik (4), Genetik (3), Rymdforskning (5) branches
- [x] 5D-3: 20 New Achievements — kosmisk tier, phases 6-12 achievements
- [x] 5D-4: 25+ New Ticker Headlines — phases 7-12

### 5E — Antagonists, Lobby, Audio
- [x] 5E-1: 5 New Antagonists (phases 6-12) — FN:s Skogsrapportör, Hacktivisterna, Mars-Rebellerna, Tidsgränslösen
- [x] 5E-2: 5 New Lobby Projects (phases 8-12) — 2 earners + 3 purchases
- [x] 5E-3: Audio for phases 8-12 — deep space, digital abstract, final tone

### 5F — Reality Page
- [x] 5F-1: Reality page after endgame — black background, real Swedish forestry facts (9 sections), link to Föreningen Naturhänsyn (naturhansyn.se)

**Notes:** Sprint 5 complete. 25 files changed, +4,218 lines. Extended game from 7→12 phases across 4 eras. Added Expansion tab with territory acquisition maps. 87 new events spanning phases 2-12. Årsredovisning reworked as milestone (game continues). Reality page as true ending with real facts about Swedish forestry + link to Föreningen Naturhänsyn. Save version bumped to 3. Build: 169KB gzipped, TypeScript clean.

---

## Sprint 6: Den M\u00f6rka Expansionen

### 6A \u2014 Era System Restructure
- [x] 6A-1: Era System Foundation \u2014 New Era type (SVERIGE/MAKT/INTERNATIONELL/EXPANSION), ERA_PHASES mapping, getEra() helper, new PHASE_NAMES, TRANSITION_SCRIPTS for all 11 transitions, CountryState + warningLevel in GameState
- [x] 6A-2: Era-Based Event Filtering \u2014 Added maxPhase to GameEvent interface, maxPhase check in isEligible(), tagged all Sweden-specific events (phase 1-6) with maxPhase: 6, renumbered phase8 space events to phases 10-12
- [x] 6A-3: Save Migration v3\u2192v4 \u2014 Added countries: {} and warningLevel: 0, bumped CURRENT_VERSION to 4

### 6B \u2014 Warning System & Country Mechanic
- [x] 6B-1: Warning System \u2014 New engine/warnings.ts with 4 levels (image thresholds: >25/15-25/5-15/<5), production penalties [1.0/0.8/0.5/0.25], ownerTrust trigger in MAKT/INTERNATIONELL eras, integrated into tick() stammarPS multiplier
- [x] 6B-2: Country Takeover Mechanic \u2014 14 countries in data/countries.ts (5 phase 7, 5 phase 8, 4 phase 9), 3 defense types with weakness modifiers (2x effective), invasion via pressure allocation (kapital/lobby/stammar), tick reduces resistance, maintenance costs, production rewards, hidden biodiversity/CO2 costs. Store actions: invadeCountry(), allocatePressure()

### 6C \u2014 Content Expansion
- [x] 6C-1: Tech Tree Refresh \u2014 32 new upgrades: phase4/upgrades.ts (12: Institutionell Kapning, Narrativkontroll, Juridisk Arsenal), phase7/upgrades.ts (12: Kolonialt Ramverk, Motst\u00e5ndskrossning, Global Logistik), phase10/upgrades.ts (8: Post-Biologisk Teknik, AI Styrelse). Updated upgradeRegistry.ts
- [x] 6C-2: Redistribute Generators \u2014 Reassigned unlockPhases: SVERIGE (1-3) 5 generators, MAKT (4-6) 3 generators (Klon-Skog moved to phase 6), INTERNATIONELL (7-9) 3 NEW generators (Global Skogskoncessioner, Industriell Monokulturfabrik, Automatiserad Avskogning), EXPANSION (10-12) 6 generators. Adjusted baseCosts/production for new positions
- [x] 6C-3: Redistribute Antagonists \u2014 Added maxPhase field, tagged Sweden antagonists (maxPhase 6 or 9), added 5 new: Internationella Milj\u00f6tribunalen (phase 7-9), Lokala Rebellr\u00f6relsen (8-9), Urfolkens Globala Allians (8-9), Den Medvetna Maskinen (10+), Entropins Budb\u00e4rare (12+). Total: 17 antagonists
- [x] 6C-4: INTERNATIONELL Era Events \u2014 22 new events in phase7/events.ts: 8 phase 7 (country resistance, Swedish model export, corruption), 8 phase 8 (Amazonia fires, global boycott, trade wars), 6 phase 9 (last rainforest, biodiversity zero, Earth's invoice)
- [x] 6C-5: EXPANSION Era Events \u2014 Renumbered existing space events from phases 8-9 to 10-12 in phase8/events.ts
- [x] 6C-6: Lobby + News Ticker Updates \u2014 2 new INTERNATIONELL earners, 2 new purchases, moved galactic lobby to phase 10+. Tagged Sweden ticker headlines with maxPhase: 6, added INTERNATIONELL headlines (dark corporate colonialism), rewrote EXPANSION headlines in [SYSTEM]/[PROTOKOLL] machine-language style

### 6D \u2014 UI Rework
- [x] 6D-1: Rework Expansion Tab \u2014 3 views: locked (pre-phase 7), CountryPanel (INTERNATIONELL phases 7-9) with world map, country dots (grey/orange/green/red), resistance bars, pressure allocation sliders, SpaceExpansionPanel (EXPANSION phases 10+). Removed old country expansion targets, renumbered space targets to phase 10+
- [x] 6D-2: Dark Visual Theme \u2014 data-era attribute on root container, CSS custom properties per era: INTERNATIONELL (muted corporate grey #1A1A1A), EXPANSION (black #0A0A0A with deep red/orange accents). Dashboard imports PHASE_NAMES from engine/phases.ts
- [x] 6D-3: EndScreen Updates \u2014 Moved trigger to phase >= 10 (entering EXPANSION), added "L\u00e4nder er\u00f6vrade" stat to \u00c5rsredovisning (step 8 of 10), updated achievements referencing old expansion targets to use country system
- [x] 6D-4: Achievement Fixes \u2014 Updated nordisk_hegemoni, kolonialmakten_2, global_dominans to use countries instead of removed expansion targets. Fixed phase numbers for terraformaren (10), dysonbyggaren (11), ai_overlorden (11), arsredovisningen (10)

### 6E \u2014 Verification
- [x] 6E-1: Build Verification \u2014 TypeScript clean, 182KB gzipped, all imports consistent, save migration working

**Notes:** Sprint 6 complete. 30 files changed, +2,715 lines, -338 lines. Major restructuring: old 4-era system (SVERIGE/V\u00c4RLDEN/UNIVERSUM/BORTOM) replaced with new 4-era system (SVERIGE/MAKT/INTERNATIONELL/EXPANSION). Country takeover mechanic replaces old country-based expansion targets for phases 7-9. Warning system adds strategic tension via image-based production penalties. Era-specific visual themes darken the game progressively. Events filtered by maxPhase prevent immersion-breaking Sweden content in space eras. Save version bumped to 4. Deployed to GitHub Pages.

---

## Post-Sprint 6: UX/Läsbarhet (Tester-feedback)

- [x] PF.1: Öka fontstorlekar, fixa kontrast, ta bort texttrunkering — 17 komponenter uppdaterade efter feedback från testare. Teknik-flikens ljusa bakgrund fixad, EventModal scrollbar på mobil, textfärger ljusare i alla era-teman. Deployed.
- [x] PF.2: Varningsbanderoll vid produktionsstraff — Ny WarningBanner-komponent på Dashboard som visar varning (nivå 1-3) med förklaring och ledtråd ("Köp PR-kampanjer"). Spelaren ser tydligt varför produktion sjunker.
- [x] PF.3: Fix ™-symbol — `\u2122` i JSX renderade bokstavlig text istället för ™. Fixat i LobbyPanel.tsx (2 ställen).
- [x] PF.4: Lättare endgame-ekonomi — EXPANSION-generatorer: costScale sänkt (1.25→1.18, 1.30→1.20, 1.35→1.22), produktion +25%. Kapitalkonvertering fas 10-12 höjd (8%→12%, 9%→15%, 10%→20%).

---

## Sprint 7: Skogsägarvägen — Grund & UI

> **Källa:** `plan_additional_arch.md`
> **OBS:** Inga riktiga företagsnamn i speltext. Parodinamn: Nastly (Nestlé), Husqansen (Husqvarna), Barburr (Barbour), NCA (SCA). FSC redan parodierat i befintligt spel.

### 7A — Foundation

- [x] 7A-1: gameMode State & Character Select
  - Lägg till `gameMode: 'industry' | 'owner' | null` i GameState (null = startskärm)
  - Skapa `CharacterSelect.tsx` — två kort: "SKOGSINDUSTRIN" / "SKOGSÄGAREN" med flavourtext
  - Rendera CharacterSelect när `gameMode === null`, wrappa befintligt spel i `gameMode === 'industry'`
  - gameMode permanent per spelomgång (inget byte mitt i)
  - Verifiera att befintligt industri-spel INTE bryts

- [x] 7A-2: Owner Game State
  - Utöka GameState med owner-resurser: `skogsvardering` (klickresurs), `inkomst` (valuta, tkr), `kunskap` (motståndskraft), `resiliens` (stormtålighet)
  - Synliga mätare: `biodivOwner`, `realCarbonPos`, `legacy`, `deadwood`
  - Owner-specifik state: `ownerGenerators`, `ownerClickUpgrades`, `ownerAttacksResisted: Record<string, boolean>`, `ownerLuresDeclined: number`
  - Alla owner-resurser initieras till 0 (utom resiliens: startvärde ~10, biodivOwner: 5)

- [x] 7A-3: Owner Tick Function
  - Separat tick-logik i game loop baserat på `gameMode`
  - Passiv skogsvärde-ökning (skogen växer av sig själv, +0.5 sv/s bas)
  - Generator-produktion stub (skogsvardering/s + inkomst/s — fylls i 7B)
  - Biodiv ökar med deadwood, resiliens ökar med biodiv-mångfald
  - Legacy ökar långsamt baserat på tid + biodiv + motstånd mot industrin
  - Kolinlagring ökar med stående skog

- [x] 7A-4: Save Migration v4→v5
  - Lägg till `gameMode`, owner-resurser, owner-state i save
  - Migrera befintliga saves: `gameMode: 'industry'` (bakåtkompatibelt)
  - Bumpa CURRENT_VERSION till 5

**Notes:** 7A complete. Key changes:
- Added `GameMode = 'industry' | 'owner' | null` type + all owner fields to `types.ts`
- Added `setGameMode`, `ownerClick` actions to store
- Owner tick function in `gameStore.ts` — separate from industry tick, handles passive growth, biodiv, resiliens, carbon, legacy. Generator hooks stubbed for 7B.
- Created `CharacterSelect.tsx` — two animated cards (Framer Motion), dark background, neutral framing
- `App.tsx` routes: `null` → CharacterSelect, `'owner'` → placeholder owner UI with "Vårda Skog" button, `'industry'` → existing game (untouched)
- Save migration v4→v5: existing saves get `gameMode: 'industry'`, all owner fields default to 0/empty
- Build: 184KB gzipped, TypeScript clean

### 7B — Owner UI

- [x] 7B-1: Owner ClickArea ("Vårda Skog")
  - Ny komponent `OwnerClickArea.tsx` — knappen "Vårda Skog"
  - Klick ökar `skogsvardering` (basbelopp + uppgraderingar)
  - Flavourtext tiers (6 nivåer): "Du går ut i skogen..." → "Dina grannar frågar..."
  - Visa: skogsvärde, skogsvärde/klick, skogsvärde/sekund
  - Varm visuell stil: gröna partiklar istället för orangea

- [x] 7B-2: Owner Click Upgrades
  - Definiera i `src/data/ownerClickUpgrades.ts` (5 st):
    - Skogskunskapskurs (500 Inkomst, +2/klick, +5 Kunskap)
    - Florabok & kikare (1000, +5/klick, +1 Biodiv)
    - Motorsåg — egen, liten (2500, +10/klick) — "Inte en Skördare. En Husqansen 562."
    - Samarbete med biolog (5000, +20/klick, +10 Kunskap)
    - Mentorskap från gammal skogsägare (10000, +50/klick)

- [x] 7B-3: Owner Generators
  - Definiera i `src/data/ownerGenerators.ts` (9 st) med bonuses-system:
    - Naturlig föryngring (100, +1 sv/s)
    - Plockhuggning schema (500, +0.5 ink/s, +2 sv/s)
    - Död-ved-program (1500, +biodiv, +resiliens, +deadwood)
    - Skogsbete (3000, +5 sv/s, +2 ink/s)
    - Premium-virke långsamväxt (8000, +10 ink/s)
    - Skogsturism / Naturupplevelse (15000, +15 ink/s, +5 sv/s)
    - Kolkrediter verkliga (30000, +25 ink/s, +carbon)
    - Skogsägar-kooperativ (75000, +50 ink/s, +kunskap)
    - Arvsskogen (200000, +200 sv/s, +legacy)
  - costScale: 1.12×, bonuses applied in ownerTick
  - Ny `OwnerGenerators.tsx` — varm ton, produktionslabel med alla bonusar

- [x] 7B-4: Owner Dashboard Layout
  - `OwnerDashboard.tsx` — 4 resurskort + 4 mätarkort + 2-panel ClickArea/Generators
  - `OwnerApp` i App.tsx — full app shell med tabs, settings, achievements
  - 2 tabs: Översikt (dashboard) och Kunskap (knowledge panel)
  - Owner-färgtema: bakgrund #F5F0E8, accent #2D6A4F, text #3D2B1F

- [x] 7B-5: Knowledge Panel (ersätter LobbyPanel)
  - `KnowledgePanel.tsx` med kunskapsaktiviteter och tröskelprogression
  - 5 aktiviteter (kostar Inkomst → ger Kunskap), inkl gratis "Maktutredningen"
  - 6 kunskapströsklar (25→1000) visas som checklista med progressbar
  - Biodiversitetsmätare och resiliensmätare

- [x] 7B-6: Resilience Display
  - Resiliens visas i resursfältet med färgkodning: grön (>50), gul (20-50), röd (<20)
  - Resiliens visas även i KnowledgePanel med mätare
  - Ökar passivt via biodiv + generator-bonusar (död-ved-program)

**Notes:** 7B complete. Key changes:
- Created `src/data/ownerGenerators.ts` — 9 generators with bonus system (biodiv, resiliens, carbon, kunskap, legacy, deadwood per tick per unit)
- Created `src/data/ownerClickUpgrades.ts` — 5 upgrades (inkomst-cost, sv/click bonus, one-time kunskap/biodiv bonuses)
- Created `src/data/ownerKnowledge.ts` — 5 knowledge activities + 6 threshold definitions
- Created `src/components/owner/OwnerClickArea.tsx` — green particles, milestone-based flavourtext, warm beige theme
- Created `src/components/owner/OwnerGenerators.tsx` — shows all 9 generators with bonus labels
- Created `src/components/owner/OwnerDashboard.tsx` — 4 resource cards + 4 meter cards + two-panel layout
- Created `src/components/owner/KnowledgePanel.tsx` — knowledge activities, threshold checklist, biodiv/resiliens meters
- Updated `gameStore.ts`: `buyOwnerGenerator`, `buyOwnerClickUpgrade`, `buyKnowledgeActivity` actions; `computeOwnerSVPerClick`; full generator bonus application in ownerTick (biodiv, resiliens, carbon, kunskap, legacy, deadwood)
- `OwnerApp` component in App.tsx with full app shell, 2 tabs (Översikt/Kunskap), action buttons
- Build: 189KB gzipped, TypeScript clean

### 7C — Antagonism, Events & Innehåll

- [x] 7C-1: Industry Attacks (Storbolagets motstånd)
  - Definiera i `src/data/industryAttacks.ts` (8 attacker):
    - "Gratis skogsbruksplan" (500 sv, 25 kunskap att motstå)
    - Virkesuppköparen (2000 sv, 50 kunskap) — "en man i Barburr-jacka"
    - Priskollaps-panik (5000 sv, 75 kunskap) — "Kina-dumpning"
    - "Äganderätten är hotad!"-kampanjen (10000 sv, 100 kunskap)
    - Kontraktsofferten — 25-årskontrakt (20000 sv, 150 kunskap)
    - Svartmålningskampanjen (40000 sv, 200 kunskap)
    - Inspektörens "misstag" (75000 sv, 300 kunskap + 10000 ink)
    - Den Totala Offensiven (150000 sv, 500 kunskap)
  - Ny komponent `IndustryAttackModal.tsx` — pop-up med Motstå/Ge efter
  - Motstå kräver minimum Kunskap (gråas ut om ej tillräckligt)
  - Effekter vid accept: skogsvärde-förlust, kontrollförlust, engångs-inkomst
  - Triggas vid skogsvärde-milstolpar i owner tick

- [x] 7C-2: Industry Lures (Lockelser)
  - Definiera i `src/data/industryLures.ts` (3 st):
    - "Gratis markanalys" — fälla: rekommenderar kalavverkning + contortaplantering
    - "GSC-certifiering" — fälla: kräver industrins skötselplan
    - "EU-bidrag via oss" — fälla: åtgärderna = markberedning + monokultur
  - `IndustryLureModal.tsx` med orange lockelse-design, reveal-mekanik
  - Acceptera = negativ långtidseffekt, Avböj = alternativ med bättre resultat (kostar inkomst)

- [x] 7C-3: Owner Events (11 events)
  - Definiera i `src/data/ownerEvents.ts`:
    - Stormen (15000 sv — resiliens + biodiv + deadwood)
    - Granbarkborren (25000 sv — resiliens + kunskap + deadwood)
    - Japanska turister (30000 sv — +5000 inkomst + legacy)
    - Snickaren ringer (20000 sv — +8000 inkomst)
    - Barnens besök (40000 sv — +50 Legacy + kunskap)
    - Grannens ånger (60000 sv — +30 Kunskap + legacy)
    - Skogsbrand (50000 sv — +20 resiliens + deadwood)
    - Universitetsstudien (100000 sv — +100 Kunskap + 50 Legacy)
    - Kinas massadumpning (8000 sv — +20 Kunskap, du är trygg)
    - SVT i din skog (150000 sv — +200 Kunskap, +100 Legacy)
    - Nastly-brevet (200000 sv — +50000 Inkomst, +50 Legacy)
  - Använder befintligt EventModal och event engine (selectEvent + checkEventTrigger)
  - Triggas i ownerTick med OWNER_EVENTS-pool

- [x] 7C-4: Owner News Ticker
  - Definiera i `src/data/ownerNewsLines.ts` (25 rubriker):
    - Tidiga: morgonpromenad, inspektören ringer, årsringar, contorta, lavskrikan
    - Mellan: SLU-rapport, barkborre, snickaren, biologen, GSC, turister, grannens ånger
    - Sena: priskollapsen, kollagret, SVT, Nastly, 200 skogsägare, forskningen, barnbarnet
    - Endgame: lagändring, deadwood, humle, talltickan, naturen vinner
  - Ny komponent `OwnerTicker.tsx` — grön ton, triggas av totalSkogsvardering
  - Integrerad i OwnerApp

- [x] 7C-5: Owner Achievements (13 st)
  - Tillagda i `src/data/achievements.ts` (ny tier: 'skogsagare'):
    - Första Trädet (1 klick)
    - Tålmodets Väg (100 klick)
    - Naturlig Föryngring (första generatorn)
    - Rötterna Håller (5000 sv)
    - Stående Kapital (50000 sv)
    - Den Tysta Kunskapen (100 kunskap)
    - Artrikedomen (25 biodiv)
    - Stormfast (50 resiliens)
    - Nej Tack (motstå första attacken)
    - Orubblig (motstå 3 attacker)
    - Generationsarv (100 legacy)
    - Nastly Väljer Dig (200000 sv)
    - Helt Ekosystem (alla 9 generatorer)

**Notes:** 7C complete. Key changes:
- Created `src/data/industryAttacks.ts` — 8 attacks with triggerSV, kunskapRequired, accept/resist effects and flavour text
- Created `src/data/industryLures.ts` — 3 lures with offer/trap/decline design, accept = bad, decline = good but costs inkomst
- Created `src/data/ownerEvents.ts` — 11 events using GameEvent structure, all unique, single-choice positive outcomes
- Created `src/data/ownerNewsLines.ts` — 25 owner ticker headlines triggered by totalSkogsvardering milestones
- Created `src/components/owner/IndustryAttackModal.tsx` — red-bordered modal with Motstå (requires kunskap) / Ge efter
- Created `src/components/owner/IndustryLureModal.tsx` — orange-bordered modal with reveal mechanic (first click reveals trap)
- Created `src/components/owner/OwnerTicker.tsx` — green-toned ticker for owner path
- Added 13 owner achievements in `achievements.ts` with new 'skogsagare' tier (color: #2D6A4F)
- Updated `types.ts`: added `activeIndustryAttack`, `activeIndustryLure`, `ownerAttacksSurrendered`, `ownerLuresAccepted`, `resolveIndustryAttack`, `resolveIndustryLure`
- Updated `gameStore.ts`: attack/lure trigger logic in ownerTick, resolve actions, owner events via existing event engine
- Save migration v5→v6: adds new tracking fields
- Build: 197KB gzipped, TypeScript clean

### 7D — Endgame & Polish

- [x] 7D-1: Owner Endgame Screen
  - Ny komponent `OwnerEndScreen.tsx` — triggas vid legacy >= 500
  - 3 steg: reveal (8 sekventiella stats), postcredits (scrollande reflekterande text), reality (8 fakta-sektioner)
  - Stats: totalSV, speltid, legacy, biodiv, resiliens, kol, kunskap, attacker motstådda/överlåtna
  - Knapp: "LÄMNA SKOGEN TILL NÄSTA GENERATION"

- [x] 7D-2: Owner Post-Credits
  - 16 rader reflekterande text om att välja hållbart skogsbruk
  - Reality-sida med 8 sektioner: plockhuggning, industrins narrativ, vad skogsägare egentligen får, död ved, resiliens, kolinlagring, hur man kan hjälpa
  - Länk till naturhansyn.se

- [x] 7D-3: Owner Audio
  - Fågelkvitter som ÖKAR med biodiv (frekvens 800-4000ms baserat på biodiv-nivå)
  - Vind-layer (filtrerat brus med LFO)
  - Bäck-layer (banpassat brus med långsam modulation)
  - startOwnerAmbient(biodiv) i audio.ts, useAudioSync routar till rätt ambient baserat på gameMode

- [x] 7D-4: Balancing Pass
  - Sänkt kunskapskrav för tidiga attacker (10/30/50 istf 25/50/75) — första attacken nu resistbar
  - Höjt triggerSV för attacker (800/3000/8000 istf 500/2000/5000) — mer tid att förbereda
  - Klick-inkomst 3.3× högre (0.01 istf 0.003) — snabbare ekonomisk start
  - Första generatorn ger inkomst (0.1/s) — passiv ekonomi från start
  - Lure-avböjkostnader kraftigt sänkta (500/1500/2500 istf 8000/5000/3000)
  - Legacy-tillväxt ökad: basrate 0.03 (istf 0.01), biodiv-faktor 0.0002 (istf 0.0001)

- [x] 7D-5: Build Verification
  - TypeScript clean (`npx tsc --noEmit` — inga fel)
  - Vite build lyckad: 201KB gzipped
  - Save version 6, migreringar v4→v5→v6 intakta

**Notes:** 7D complete. Sprint 7 (Skogsägarvägen) done. Key changes:
- Created `src/components/owner/OwnerEndScreen.tsx` — 3-stage endscreen (reveal → postcredits → reality) with warm beige/green theme, 8 sequential stat reveals, 16 reflective post-credit lines, 8 reality sections about real Swedish forestry, link to naturhansyn.se
- Updated `src/engine/audio.ts` — `startOwnerAmbient(biodiv)` with wind, birds (frequency tied to biodiv level), brook (bandpass-filtered noise). Owner ambient is the ecological inverse of industry audio: nature sounds increase as you play better
- Updated `src/hooks/useAudioSync.ts` — routes to owner ambient when gameMode === 'owner', updates bird frequency with biodiv changes
- Updated `src/App.tsx` — OwnerEndScreen wired in OwnerApp, triggers at legacy >= 500
- Balancing: early attacks resistable (kunskap gates lowered), click inkomst 3.3× higher, first generator gives inkomst, lure decline costs reduced, legacy growth formula improved
- Build: 201KB gzipped, TypeScript clean, save version 6

---

## Sprint 8: Kvalitetspasset (Report Fixes)

> **Källa:** `report.md` — Holistic Review Report (2026-02-10)
> **Mål:** Åtgärda de viktigaste problemen från rapporten: endgame-innehåll, prestanda, tillgänglighet, UX, kodkvalitet.

### 8A — Performance (Hot Path)

- [x] 8A-1: Map-Based Data Lookups
  - Ersätt `generators` array med `Map<string, GeneratorData>` — `getGeneratorData(id)` gör `.find()` 20×/tick
  - Samma för antagonists (`checkAntagonistTriggers` loopar alla 17 varje tick)
  - Samma för upgrades i upgradeRegistry
  - Behåll array-export för rendering, skapa Map vid module load för lookups

- [x] 8A-2: Cache Lobby Boost
  - `getLobbyGeneratorBoost()` loopar alla 12 purchases varje tick (100ms)
  - Cacha resultatet i store state, uppdatera bara vid `buyLobbyProject`
  - Samma för andra lobby-modifiers (kapitalBoost, imageProtection, etc.)

- [x] 8A-3: Antagonist Phase Short-Circuit
  - `checkAntagonistTriggers()` testar alla 17 villkor varje tick
  - Lägg till early-exit: skippa antagonister med `minPhase > currentPhase` eller `maxPhase < currentPhase`
  - Gruppera antagonister per fas-range för snabbare filtrering

- [x] 8A-4: AnimatedNumber Optimization
  - 40+ AnimatedNumber-instanser renderar varje tick (100ms)
  - Wrappa i `React.memo()` med custom comparator
  - Throttla visuella uppdateringar till max 4/s (250ms) — siffror ändras snabbare men renderar långsammare
  - Behåll exakt värde i state, bara throttla DOM-uppdatering

- [x] 8A-5: Event Pool Caching
  - `selectEvent()` filtrerar alla 80+ events varje trigger
  - Cacha eligible events per fas, invalidera vid fasövergång
  - Minskar filtrering från O(n) per trigger till O(1) cache-lookup

**Notes:** 8A complete. Key changes:
- **8A-1**: Added `Map<string, T>` at module load in 13 data files: generators, antagonists, upgradeRegistry, lobbyProjects (earner+purchase), countries, expansionTargets, ownerGenerators, clickUpgrades, ownerActions (actions+PR), ownerClickUpgrades, ownerKnowledge, industryAttacks, industryLures. All `get*()` functions now use `.get()` instead of `.find()`.
- **8A-2**: Replaced 5 per-tick lobby helper functions (`getLobbyGeneratorBoost`, `getLobbyKapitalBoost`, `getLobbyImageProtection`, `getLobbyDiscount`, `getOwnerTrustFloor`) with single `computeLobbyModifiers()` exported from lobbyProjects.ts. Module-level `lobbyMods` cache in gameStore.ts refreshed only on `buyLobbyProject`, `load`, and `reset`.
- **8A-3**: Pre-grouped antagonists by phase range into `ANTAGONISTS_BY_PHASE` Map (phases 1-12). `checkAntagonistTriggers` now only iterates candidates valid for current phase instead of all 17.
- **8A-4**: `AnimatedNumber` wrapped in `React.memo()`. `useAnimatedNumber` now skips animation restart when rounded value hasn't changed (prevents unnecessary rAF cycles on every 100ms tick).
- **8A-5**: Phase-based event pool cache in events.ts. `selectEvent` pre-filters by phase/maxPhase once (cached), only re-filters on phase change or pool change. `isEligible` no longer redundantly checks phase/maxPhase.
- Build: 201KB gzipped, TypeScript clean, no regressions.

### 8B — Endgame Content (Faser 10–12)

- [x] 8B-1: Expansion Era Events (14 nya)
  - Fas 10 (5 events): Post-Biologisk vändpunkt, Mars Miljöprövning, Kosmisk FSC, Arbetsmiljöverket i omloppsbana, Terraformering samråd
  - Fas 11 (5 events): Dysonsfär-leverans försenad, Alien-delegater vid Almedalen, Intergalaktisk Äganderättsdebatt, Kosmiska Skogsstyrelsen, DN Debatt om entropi
  - Fas 12 (4 events): Universums Sista Styrelsesammanträde, Entropins Utredning, Multiversum-revisionen, Den Sista Skogsbruksplanen
  - All events anchored in Swedish institutions (Länsstyrelsen, Arbetsmiljöverket, Almedalen, DN Debatt, FSC, Riksrevisionen) applied at cosmic scale
  - Three-act structure: post-biological → galactic institutions → paperwork outlives universe

- [x] 8B-2: Nya Antagonister (3 st, faser 10–12)
  - Kosmiska Länsstyrelsen (fas 10–11, -200 Mkr/s) — byråkratiska avgifter, counter: 50K lobby
  - Den Galaktiska Fackföreningen (fas 11, -10M stammar/s) — arbetsnedläggning, counter: 5B kapital
  - Multiversum-Revisorerna (fas 11–12, -0.5 Image/s, -500 Mkr/s) — revision, counter: 100K lobby
  - Fills the phase 11 antagonist gap (previously zero antagonists there)

- [x] 8B-3: Endgame Narrative Arc
  - New file: `src/data/phase10/events.ts` (PHASE10_NEW_EVENTS)
  - Registered in gameStore.ts ALL_EVENTS array
  - Satirical throughline: Swedish bureaucracy is eternal and universal
  - Events complement (don't replace) existing phase8/events.ts cosmic events

### 8C — UX-förbättringar

- [x] 8C-1: Country Auto-Allocate
  - Ny toggle-knapp i CountryPanel: "Auto-fördela tryck"
  - När aktiv: fördela jämnt över alla vektorer, med dubbelt på svaghetsvektorn
  - Spelaren kan fortfarande manuellt justera — auto stängs av vid manuell ändring
  - Minskar tråkig repetition vid land #5–14

- [x] 8C-2: Species Counter på Dashboard
  - Ny liten mätare i resursfältet (visas från fas 3+)
  - Visar "Arter: X kvar" med subtil animation vid förlust
  - Röd puls-effekt när arter försvinner — gör ekologisk kostnad synlig under spelet
  - Industry path only (owner path har redan biodiv-mätare)

- [x] 8C-3: Event Frequency Tuning
  - Minska event-frekvens i faser 7–12: nuvarande 50–90s → 90–150s
  - Under aktiv country invasion: pausa bakgrunds-events (för mycket avbrott)
  - Fas 10–12: events var 120–180s (mer andrum med nya events från 8B)

- [x] 8C-4: Mobile Dashboard Density
  - Mobil: kollapsa resurskort till kompakt single-row (ikoner + siffror, ingen label)
  - Expanderbar med tap — visa full info on demand
  - Säkerställ att generatorer och klick-area syns utan scroll

**Notes:** 8C complete. Key changes:
- **8C-1**: Added `autoAllocate` toggle state in CountryPanel. Toggle button ("⚡ Auto-tryck") visible when invasions active. When on: distributes pressure with base 25 per vector, 2x (50) on weakness vector. Manual slider change disables auto mode. New invasions auto-allocate if toggle active. Uses `useEffect` to apply to all invading countries on toggle.
- **8C-2**: New `SpeciesCard` component in Dashboard, visible from phase 3+. Shows estimated remaining species (~250K × biodiversity%). Red pulse animation when species lost counter increases. Color progression: green → yellow → red based on species lost. Desktop: 5th column in resource bar. Mobile: shown in compact bar as 🦉 icon.
- **8C-3**: Event frequency for phases 7-9 increased from 50-90s to 90-150s. Phases 10-12 increased from 35-75s to 120-180s. Added invasion pause: events skip while any country has `status === 'invading'`, preventing interruptions during active invasions.
- **8C-4**: Mobile (< sm breakpoint) now shows compact single-row resource bar with emoji icons (🪵💰🌿🏛️🦉) + numbers. Tappable to expand full resource cards. Desktop resource bar unchanged. Generators and click area now visible without scrolling on mobile.
- Build: 206KB gzipped, TypeScript clean, no state changes (no save migration needed).

### 8D — Tillgänglighet (Accessibility)

- [ ] 8D-1: Focus Traps i Modals
  - EventModal, SettingsPanel, AchievementPanel, IndustryAttackModal, IndustryLureModal
  - Implementera keyboard focus trap (Tab/Shift+Tab cyklar inom modal)
  - Escape stänger modal
  - Returnera fokus till trigger-element vid stängning

- [ ] 8D-2: Färgkontrast
  - `text-text-muted` (#B0B0B0) på `bg-bg-secondary` (#2A2A2A) = 4.2:1 — behöver 4.5:1
  - Ljusa upp muted-text till ~#BABABA eller mörkna bakgrund
  - Verifiera alla era-themes (INTERNATIONELL grå, EXPANSION svart) möter AA
  - Testa med Chrome DevTools contrast checker

- [ ] 8D-3: ARIA Labels
  - Settings-knapp (⚙️), achievement-knapp, ljud-toggle — lägg till `aria-label`
  - Generator-köpknappar: `aria-label="Köp {generator.name} för {cost} stammar"`
  - Tab-navigation: `role="tablist"`, `role="tab"`, `aria-selected`
  - Resurskort: `aria-live="polite"` för dynamiska värden

- [ ] 8D-4: Tap Targets
  - Bottom nav tabs: öka från ~32px till 44px minimum (WCAG 2.5.8)
  - Achievement tier-tabs: samma
  - Alla knappar i LobbyPanel/OwnerMeter: verifiera 44×44px touch area
  - Använd padding snarare än storlek om visuell design ska bevaras

- [ ] 8D-5: Prefers-Reduced-Motion
  - Wrappa ticker-animation, puls-glow, spring-animationer i `@media (prefers-reduced-motion: reduce)`
  - Framer Motion: global `MotionConfig` med `reducedMotion="user"`
  - Fallback: visa statisk text istället för rullande ticker

### 8E — Kodkvalitet

- [ ] 8E-1: Splitta ExpansionPanel.tsx (808 rader)
  - Extrahera `CountryPanel.tsx` — landsval, karta, invasion-UI
  - Extrahera `PressureSliders.tsx` — tryckfördelnings-sliders
  - Extrahera `SpaceTargetPanel.tsx` — EXPANSION fas 10+ targets
  - `ExpansionPanel.tsx` blir tunn wrapper som routar till rätt sub-panel baserat på era

- [ ] 8E-2: Owner Theme CSS Variables
  - Flytta hardcoded `#2D6A4F`, `#F5F0E8`, `#3D2B1F` till CSS custom properties i global.css
  - Definiera under `[data-mode="owner"]` eller dedikerat `@theme` block
  - Uppdatera alla owner-komponenter att använda variablerna
  - Gör det möjligt att justera owner-tema på ett ställe

- [ ] 8E-3: Error Boundaries
  - Wrappa EventModal, AchievementPanel, ExpansionPanel i React error boundaries
  - Fallback-UI: "Något gick fel — stäng och försök igen"
  - Logga felinfo till console för debugging
  - Förhindra att malformerad event/achievement-data kraschar hela appen

### 8F — Verifiering

- [ ] 8F-1: Build & Test
  - TypeScript clean (`npx tsc --noEmit`)
  - Vite build lyckad
  - Verifiera save migration (v6 intakt, inga nya state-fält kräver migration)
  - Snabb playtest: fas 1–3 (performance), fas 7 (auto-allocate), fas 10+ (nya events)
  - Lighthouse accessibility audit (sikta 90+)
  - Deploy till GitHub Pages

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
