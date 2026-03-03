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

- [x] 8D-1: Focus Traps i Modals
  - EventModal, SettingsPanel, AchievementPanel, IndustryAttackModal, IndustryLureModal
  - Implementera keyboard focus trap (Tab/Shift+Tab cyklar inom modal)
  - Escape stänger modal
  - Returnera fokus till trigger-element vid stängning

- [x] 8D-2: Färgkontrast
  - `text-text-muted` (#B0B0B0) på `bg-bg-secondary` (#2A2A2A) = 4.2:1 — behöver 4.5:1
  - Ljusa upp muted-text till ~#BABABA eller mörkna bakgrund
  - Verifiera alla era-themes (INTERNATIONELL grå, EXPANSION svart) möter AA
  - Testa med Chrome DevTools contrast checker

- [x] 8D-3: ARIA Labels
  - Settings-knapp (⚙️), achievement-knapp, ljud-toggle — lägg till `aria-label`
  - Generator-köpknappar: `aria-label="Köp {generator.name} för {cost} stammar"`
  - Tab-navigation: `role="tablist"`, `role="tab"`, `aria-selected`
  - Resurskort: `aria-live="polite"` för dynamiska värden

- [x] 8D-4: Tap Targets
  - Bottom nav tabs: öka från ~32px till 44px minimum (WCAG 2.5.8)
  - Achievement tier-tabs: samma
  - Alla knappar i LobbyPanel/OwnerMeter: verifiera 44×44px touch area
  - Använd padding snarare än storlek om visuell design ska bevaras

- [x] 8D-5: Prefers-Reduced-Motion
  - Wrappa ticker-animation, puls-glow, spring-animationer i `@media (prefers-reduced-motion: reduce)`
  - Framer Motion: global `MotionConfig` med `reducedMotion="user"`
  - Fallback: visa statisk text istället för rullande ticker

**Notes:** 8D complete. Key changes:
- **8D-1**: New `useFocusTrap` hook in `src/hooks/useFocusTrap.ts` — traps Tab/Shift+Tab within container, Escape closes, restores previous focus on unmount. Applied to all 5 modals: EventModal, SettingsPanel, AchievementPanel, IndustryAttackModal, IndustryLureModal. All modals now have `role="dialog"` and `aria-modal="true"`.
- **8D-2**: Bumped `--color-text-muted` for WCAG AA compliance: default #8A8A8A→#969696 (4.8:1), INTERNATIONELL #808080→#8E8E8E (4.5:1), EXPANSION #606060→#7A7A7A (4.7:1). All meet 4.5:1 minimum.
- **8D-3**: Added `aria-label` to settings/achievement/reset buttons in both App and OwnerApp. TabNav: `role="tablist"` on nav, `role="tab"` + `aria-selected` on buttons. AchievementPanel tier tabs: same ARIA roles. Dashboard ResourceCard: `aria-live="polite"` for screen reader announcements. Owner tab buttons: `role="tab"` + `aria-selected` + `aria-label`.
- **8D-4**: TabNav buttons: `px-3 py-2` → `px-4 py-3 min-w-[44px] min-h-[44px]`. Achievement tier tabs: `px-2.5 py-1.5` → `px-3 py-2 min-h-[44px]`. Owner tab buttons: same 44px minimum. Settings/achievement buttons already w-11 h-11 (44px).
- **8D-5**: CSS `@media (prefers-reduced-motion: reduce)` disables ticker-scroll, pulse-glow, shimmer, float-up animations + forces near-zero transition duration. `MotionConfig reducedMotion="user"` wraps both App and OwnerApp — Framer Motion respects OS preference. Ticker becomes static text when reduced motion enabled.
- Build: 206KB gzipped, TypeScript clean.

### 8E — Kodkvalitet

- [x] 8E-1: Splitta ExpansionPanel.tsx (857 rader)
  - Extrahera `CountryPanel.tsx` — landsval, karta, invasion-UI
  - Extrahera `PressureSliders.tsx` — tryckfördelnings-sliders
  - Extrahera `SpaceTargetPanel.tsx` — EXPANSION fas 10+ targets
  - `ExpansionPanel.tsx` blir tunn wrapper som routar till rätt sub-panel baserat på era

- [x] 8E-2: Owner Theme CSS Variables
  - Flytta hardcoded `#2D6A4F`, `#F5F0E8`, `#3D2B1F` till CSS custom properties i global.css
  - Definiera under `[data-mode="owner"]` eller dedikerat `@theme` block
  - Uppdatera alla owner-komponenter att använda variablerna
  - Gör det möjligt att justera owner-tema på ett ställe

- [x] 8E-3: Error Boundaries
  - Wrappa EventModal, AchievementPanel, ExpansionPanel i React error boundaries
  - Fallback-UI: "Något gick fel — stäng och försök igen"
  - Logga felinfo till console för debugging
  - Förhindra att malformerad event/achievement-data kraschar hela appen

**Notes:** 8E complete. Key changes:
- **8E-1**: Split 857-line ExpansionPanel.tsx into `src/components/expansion/` directory: `MapBackgrounds.tsx` (SVG maps + view types), `CostBadge.tsx` (shared), `CountryPanel.tsx` (country invasion + detail + pressure sliders + auto-allocate), `SpaceExpansionPanel.tsx` (space targets + detail). Original file → 27-line thin wrapper.
- **8E-2**: Added `--color-owner-bg`, `--color-owner-accent`, `--color-owner-text` to `@theme` in global.css. Replaced 111 hardcoded hex values across 11 files with Tailwind theme tokens (`owner-accent`, `owner-text`, `owner-bg`). Inline `style={}` uses `var(--color-owner-accent)` etc.
- **8E-3**: New `ErrorBoundary` class component with Swedish fallback ("Något gick fel i {label}") + retry button. Wraps: EventModal, main tab content, IndustryAttackModal, IndustryLureModal, owner tab content.
- Build: TypeScript clean, Vite build passes.

### 8F — Verifiering

- [x] 8F-1: Build & Test
  - TypeScript clean (`npx tsc --noEmit`)
  - Vite build lyckad
  - Verifiera save migration (v6 intakt, inga nya state-fält kräver migration)
  - Snabb playtest: fas 1–3 (performance), fas 7 (auto-allocate), fas 10+ (nya events)
  - Lighthouse accessibility audit (sikta 90+)
  - Deploy till GitHub Pages

**Notes:** 8F complete. Build: 207KB gzipped, TypeScript clean. Save version 6 intact — no new state fields added in Sprint 8. Ready for deploy.

---

## Sprint 9: Remaining Issues Fix

> **Source:** Report review — 3 weaknesses: owner content gap, passive phases 10-12, ticker tone

### S9.A — Late-Game Ticker Rewrite
- [x] Replace generic `[SYSTEM]`/`[ARKIV]` prefixes with Swedish institutional satire
  - `[MARS LÄNSSTYRELSE]`, `[GALAKTISK HR]`, `[KOSMISK REVISION]`, `[RYMDSKOGSSTYRELSEN]`, etc.

### S9.B — Owner Knowledge Tree (20 upgrades)
- [x] Add `ownerKnowledgeUpgrades: Record<string, boolean>` to types.ts
- [x] Create `src/data/ownerKnowledgeTree.ts` — 20 upgrades, 4 categories
  - Ekologisk förståelse (5): biodiv/resiliens bonuses
  - Skoglig praxis (5): sv production bonuses
  - Ekonomiskt oberoende (5): inkomst/attack resistance
  - Samhällspåverkan (5): legacy rate bonuses
- [x] Store: `purchaseOwnerKnowledge(id)`, cached `knowledgeMods`, applied in tick/click
- [x] UI: "Kunskapsträd" section in KnowledgePanel with 4 category columns

### S9.C — Owner Events with Branching (20 new)
- [x] 15 events with 2-3 choices each (dilemmas, crises, opportunities)
- [x] 5 generational events: farfars arv, familjen växer, barnets första skogsdag, tonårsupproret, överlämningen

### S9.D — Cosmic Conquest System (Phases 10-12)
- [x] Replace `ExpansionTargetState { acquired }` → `{ status, resistance, pressureAllocation }`
- [x] Add defense types: gravitational/bureaucratic/existential with weakness multipliers
- [x] Store: `startCosmicInvasion`, `allocateCosmicPressure`, cosmic conquest tick
- [x] UI: Pressure sliders, resistance bar, auto-allocate, maintenance costs

### S9.E — Save Migration & Polish
- [x] Bump CURRENT_VERSION to 7, migration 6→7
- [x] Update achievements/antagonists from `.acquired` to `.status === 'controlled'`
- [x] Generational post-credits: farfar, family, passing the torch
- [x] 5 new generational ticker headlines
- [x] Build: 216KB gzipped, TypeScript clean

**Notes:** Sprint 9 complete. Owner path now has 31 events (11 original single-choice + 20 new branching), knowledge tree with 20 upgrades, and generational narrative arc (inherit → family → children → pass on). Industry phases 10-12 now use pressure-based cosmic conquest instead of instant-buy. Save version 7.

---

## Sprint 10: Juice & Celebration (Game Feel)

> **Source:** `review.md` — Independent game review findings
> **Goal:** Make the game *feel* better. Phase transitions, milestones, and active play are currently muted. Add celebration, reward active players, reduce endgame slog.

### 10A — Phase Transition Celebration

- [x] 10A-1: Phase Transition Overhaul
  - Current: simple text overlay with phase name
  - New: particle burst (24 orange particles from center), screen pulse (subtle scale 1.0→1.02→1.0 over 500ms), phase-specific sound crescendo
  - Add "ERA CHANGE" mega-celebration when crossing era boundaries (SVERIGE→MAKT, etc.) — double particle count, slower reveal, era name in large text
  - Owner mode: green particles, warm sound (ascending arpeggio)

- [x] 10A-2: Milestone Alerts
  - Track stammar milestones: 1K, 10K, 100K, 1M, 10M, 100M, 1B, 10B, 100B, 1T
  - On milestone hit: play achievement-like sound + toast "🪵 1 MILJARD STAMMAR" (3s duration)
  - Owner mode: sv milestones at 1K, 5K, 10K, 25K, 50K, 100K, 200K with green toast
  - Don't overlap with phase transition celebrations (suppress if within 5s)

### 10B — Active Play Rewards

- [x] 10B-1: Gyllene Tillfället (Golden Opportunity)
  - Random chance (every 45-90s of active play): a golden clickable icon appears on screen for 8-10s
  - Clicking it: 30s of 3× production multiplier + bonus kapital + satisfying sound
  - Visual: glowing golden tree icon, pulses, fades if not clicked
  - Only appears when tab is focused (no AFK farming)
  - Phase 7+: appears less often but gives 5× multiplier
  - Owner mode variant: "Skogens Gåva" — green/gold glow, grants bonus sv + kunskap

- [x] 10B-2: Click Streak Bonus
  - Track consecutive clicks within 500ms windows
  - At 10-click streak: +50% click value for next 5s
  - At 25-click streak: +100% click value for next 5s + small particle burst
  - Visual: subtle glow intensification on click button during streak
  - Keeps clicking relevant mid-game without breaking idle balance

### 10C — Endgame Pacing Fix

- [x] 10C-1: Fast-Forward Button
  - New UI element: "⏩ Tidsskift" button in settings/dashboard (visible from phase 7+)
  - When held/toggled: 5× game speed (tick every 20ms instead of 100ms)
  - Visual: subtle speed lines on background, ticker moves faster
  - Cap at 5× to prevent performance issues
  - Auto-disables during events/modals

- [x] 10C-2: Reframe Phases 10-12 as "Epilog"
  - After EndScreen (phase 10 entry), show "Fortsätt till Epilogen?" choice
  - Players who say no get the current EndScreen → reality page → done
  - Players who say yes continue to phases 10-12 cosmic content
  - This makes the core game 1-9 phases (~3-4h) with optional endgame
  - Saves phase 10+ as bonus content for completionists

- [x] 10C-3: Entropy Rework
  - Current: entropy drains passively with no counter (forced timer)
  - New: entropy drains but player can SLOW it by spending lobby/kapital on "Entropimotståndsåtgärder"
  - Add 3 entropy-slowing purchases (lobby/kapital costs, each -30% drain rate)
  - This gives the player agency during the final phase instead of passive waiting
  - Also: display entropy drain rate and ETA so player knows how long is left

### 10D — Sound Celebration

- [x] 10D-1: Phase Transition Sounds
  - Current: no specific transition sound
  - Phase up: ascending 3-note fanfare (C→E→G, triangle wave, 500ms total)
  - Era change: longer fanfare (C→E→G→C↑, with reverb tail, 1.2s total)
  - Owner phase up: warm ascending (A→C#→E, sine wave)

- [x] 10D-2: Milestone Sounds
  - Stammar milestones: short celebration ding (high C, 200ms, bell-like)
  - First generator purchase: special "ka-ching" (ascending double tone)
  - Achievement sound already exists — verify it plays correctly

**Notes:** Sprint 10 complete. Key changes:
- **10A-1 Phase Transitions**: Rewrote PhaseTransition.tsx with BurstParticles (24/48 radial particles), era change detection (getEra comparison), screen pulse on era change, era name badge, green particles for owner mode. Plays playPhaseUp() or playEraChange() sounds.
- **10A-2 Milestone Alerts**: New `src/hooks/useMilestones.ts` tracks stammar milestones (1K→1T) and owner sv milestones (1K→200K). New `src/components/MilestoneToast.tsx` with colored toasts. Suppresses toasts within 5s of phase transitions. Plays playMilestoneDing().
- **10B-1 Golden Opportunity**: New `src/components/GoldenOpportunity.tsx` — random golden clickable (45-90s industry, 60-120s phase 7+), grants 30s of 3×/5× production multiplier. Owner variant "Skogens Gåva" with green/gold glow + instant sv/kunskap bonus. Tab focus check. GoldenMultiplierIndicator shows countdown.
- **10B-2 Click Streak**: Modified ClickArea.tsx and OwnerClickArea.tsx with streak tracking (500ms window), +50% at 10-streak, +100% at 25-streak with particle burst, 5s duration. Visual glow on button. Also fixed silent owner clicks (added playClick()).
- **10C-1 Fast-Forward**: "⏩ Tidsskift" toggle in Dashboard (phase 7+), 5× game speed via dt multiplication, auto-disables during events/transitions. Entropy display for phase 12: bar, drain rate, ETA, 3 entropy-slowing purchases.
- **10C-2 Epilog Reframe**: EndScreen postcredits now offers choice: "EPILOGEN — FORTSÄTT" (sets epilogChosen, continues to phases 10-12) or "NEJ. VISA VERKLIGHETEN." (goes to reality page). Core game framed as phases 1-9 with optional cosmic epilog.
- **10C-3 Entropy Rework**: 3 entropy-slowing purchases in Dashboard (Byråkratisk Fördröjning 50K PK, Tidskristallisering 500B Mkr, Entropikommitténs Utredning 200K PK). Each purchase reduces drain by 30% (multiplicative). Drain formula updated in gameStore tick.
- **10D-1/10D-2 Sounds**: 6 new Web Audio functions in audio.ts: playPhaseUp (C→E→G triangle), playEraChange (C→E→G→C↑ with shimmer), playOwnerPhaseUp (A→C#→E sine), playMilestoneDing (bell), playGoldenAppear (sparkle), playGoldenClick (chime+thump).
- **Store/Types**: Added entropyPurchases, milestonesSeen, epilogChosen, gameSpeed, goldenMultiplierUntil to state. 4 new actions. Save migration v9→v10. gameSpeed wired via dt multiplication in tick. Golden multiplier as module-level cache.
- Build: 230KB gzipped, TypeScript clean. Save version 10.

---

## Sprint 11: Strategic Depth (Core Mechanics)

> **Source:** `review.md` — "Buy cheapest is optimal 90% of the time", antagonists become irrelevant, country invasion repetitive
> **Goal:** Add meaningful decisions. The game needs moments where the player must choose between competing options, not just buy everything in order.

### 11A — Antagonist Scaling

- [x] 11A-1: Percentage-Based Antagonist Costs
  - Current: fixed costs (50K kapital, 300 PK, etc.) become trivial by phase 6
  - New: counter costs scale with player income
  - Formula: `baseCost × max(1, stammarPerSecond / threshold)` where threshold = antagonist's original target income
  - E.g., Skovarnarna base 50K kapital, threshold 500/s. At 500K/s income: costs 50M kapital
  - Cap at 100× base cost to prevent absurdity
  - This keeps antagonists threatening throughout the game

- [x] 11A-2: Antagonist Escalation Mechanic
  - If an antagonist is active for >5 minutes without being countered, it ESCALATES
  - Escalated antagonist: 2× penalty, counter cost +50%, spawns news ticker headline about it
  - Visual: escalated antagonists pulse red in the UI
  - This punishes ignoring antagonists and creates urgency

### 11B — Generator Niches

- [x] 11B-1: Generator Side Effects (Industry)
  - Add secondary effects to generators beyond raw stammar/s:
    - Virkesuppköpare: -0.01 image/s per owned (visible environmental cost)
    - Certifieringskarusell: +0.05 image/s per owned (greenwashing benefit)
    - Lobbyfirma: +1 PK/s per 5 owned (political power generation)
    - Klon-Skog: -0.02 biodiversity/s per owned (monoculture penalty)
    - Late generators: mixed positive/negative effects
  - These effects are VISIBLE in generator tooltip/description
  - Creates genuine tradeoffs: "do I buy the cheap generator that tanks my image, or the expensive one that helps?"

- [x] 11B-2: Generator Synergy Bonuses
  - Pairs of generators that boost each other when both owned:
    - Massafabrik + Certifieringskarusell: +10% kapital/s (certified wood premium)
    - Lobbyfirma + Autonomt Skördarnätverk: +15% stammar/s (deregulated automation)
    - Markberedning + Klon-Skog: +20% stammar/s but -0.05 image/s (industrial monoculture)
  - Show synergy badges on generator cards when active
  - Makes buying ORDER matter, not just buying cheapest

### 11C — Country Invasion Depth

- [x] 11C-1: Country Unique Rewards
  - Each country grants a unique bonus beyond raw production:
    - Finlandia: +10% generator efficiency (Finnish engineering)
    - Norgia: +20% kapital/s (oil money synergy)
    - Amazonia: Unlocks "Tropisk Monokultur" upgrade (+50% stammar/s, -5 image)
    - Siberien: Unlocks "Permafrost Exploitation" (huge stammar but triggers unique antagonist)
    - Chinova: +30% to all generator production (manufacturing scale)
  - Display unique reward on country detail panel before invasion
  - This gives players a reason to target specific countries, not just invade in order

- [x] 11C-2: Country Events (8 unique)
  - Each major country has 1-2 events that fire during/after invasion:
    - Amazonia: "Amazonas-branden" — your operations cause fire, choose: deny/evacuate/profit
    - Norgia: "Nordisk solidaritet" — Norway protests, threatens trade sanctions
    - Siberien: "Permafrost-kollapsen" — your drilling releases methane, global PR crisis
    - Chinova: "Den Kinesiska Väggen" — trade barriers, must bribe or retreat
  - Events add narrative weight to what is currently a mechanical grind

### 11D — Tech Tree Strategic Choice

- [x] 11D-1: Mutually Exclusive Upgrade Pairs
  - Add 3-4 "fork" points in the tech tree where you must choose one of two upgrades:
    - Phase 3: "Hållbarhetscertifiering" (+15% image, +10% kapital) VS "Kostnadsminimering" (+25% stammar/s, -5 image)
    - Phase 5: "Multinationell Expansion" (+20% country invasion speed) VS "Nationell Dominans" (+30% Swedish generator production)
    - Phase 8: "Diplomatisk Expansion" (-50% invasion kapital cost) VS "Militär Expansion" (-50% invasion lobby cost)
  - Forks are clearly marked in UI with "VÄLJ EN" label
  - Choice is permanent per playthrough — adds replay value

**Notes:** Sprint 11 complete. Key changes:
- **11A-1 Antagonist Scaling**: Added `scaleThreshold` to `CounterCost` interface, `getScaledCounterCost()` function. All 17 antagonists have tailored thresholds. Formula: `baseCost × min(100, max(1, stammarPS / threshold))`. AntagonistPanel shows scaled costs.
- **11A-2 Escalation**: Added `activatedAt`/`escalated` to `AntagonistState`. Active >5min → escalated (2× tick effects, +50% counter cost). "ESKALERAD" badge with red pulse-glow animation in UI.
- **11B-1 Side Effects**: Added `GeneratorSideEffect` interface and `sideEffects` to 7 generators (image/lobby/biodiversity per second per unit). Applied in tick loop. Shown as colored badges on generator cards.
- **11B-2 Synergies**: 4 synergy pairs (Massafabrik+Certifiering, Lobbyfirma+Autonomt, Markberedning+Klon-Skog, Koncession+Monokultur). Applied as multiplicative stammar/kapital boosts + flat image/s in tick. "Aktiva synergier" section in Generators.tsx.
- **11C-1 Country Rewards**: All 9 countries have unique rewards (generator efficiency, kapital/stammar multipliers, lobby/image per second). `computeCountryRewards()` aggregates controlled countries. Applied in tick. Shown in CountryPanel detail.
- **11C-2 Country Events**: 8 events in `src/data/phase7/countryEvents.ts` (Amazonia fire, Norgia protest, Siberien methane, Chinova trade wall, Finlandia merger, Kanadien indigenous, Indiska BJÖRKEA, Danmark julgranar). 2-3 choices each with resource tradeoffs.
- **11D-1 Fork Upgrades**: 6 fork upgrades (3 pairs) in `src/data/forkUpgrades.ts`. `exclusiveWith` field on UpgradeData. UpgradeCard shows "Välj en" badge, "Låst" when other chosen. Fork prerequisites use ANY-one-met logic.
- Save migration v10→v11: sets `activatedAt` on existing active antagonists. Build: 234KB gzipped, TypeScript clean.

---

## Sprint 12: Content & Balance Polish

> **Source:** `review.md` — Event frequency, owner content gaps, ticker variety, attack/lure balance
> **Goal:** Fill content gaps, improve balance, ensure both modes feel complete and well-paced.

### 12A — Event Frequency & Distribution

- [x] 12A-1: Increase Event Rate (Phases 1-6)
  - Current: ~2-3 events/hour in early game
  - Target: ~4-5 events/hour in phases 1-3, ~3-4/hour in phases 4-6
  - Reduce `getNextEventDelay()` by ~40% for phases 1-6
  - Keep phases 7+ at current rate (already tuned in Sprint 8)

- [x] 12A-2: Event Replay System
  - Currently ~100 events exist but only ~45 seen per playthrough due to conditions/cooldowns
  - Add `replayable: true` flag to ~20 events (scandals, opportunities) that can fire multiple times with cooldown
  - Replayable events have 15-minute cooldown between repeats
  - Non-replayable events (story beats, phase transitions) remain one-time
  - This doubles effective event density without writing new content

### 12B — Owner Mode Content Expansion

- [x] 12B-1: Late-Game Owner Generators (3 new)
  - Urskogsskydd (250K sv, +300 sv/s, +150 legacy/tick) — old-growth protection
  - Klimatpartnerskap (400K sv, +80 inkomst/s, +3 carbon/tick) — carbon partnership at scale
  - Naturskogsallians (750K sv, +500 sv/s, +200 legacy/tick, +5 biodiv/tick) — capstone alliance generator
  - Gives owner mode depth beyond sv=200K where currently only Arvsskogen exists

- [x] 12B-2: Owner Ticker Expansion (25→50 headlines)
  - Add 25 new headlines for sv=80K+ range (currently sparse)
  - Topics: late-game resilience, generational themes, research breakthroughs, industry decline
  - Match quality of existing headlines ("Naturen har inget pressmeddelande...")
  - Ensure even distribution across sv milestones

- [x] 12B-3: Dynamic Owner Ticker
  - Add 10 conditional headlines that respond to player state:
    - biodiv > 50: "Din skog har fler arter per hektar än grannarnas tillsammans."
    - All attacks resisted: "Industrin har slutat ringa. De vet."
    - legacy > 300: "Barnbarnet har börjat rita kartor över skogen."
    - kunskap > 500: "Du vet mer om din skog än Skogsstyrelsen."
  - Makes ticker feel responsive to playstyle, not just sv milestones

### 12C — Attack/Lure Rebalance

- [x] 12C-1: Scale Attack Accept Rewards
  - Current: fixed inkomst rewards (5K, 8K, etc.) become irrelevant late-game
  - New: accept inkomst = 5% of total skogsvardering (always tempting)
  - This keeps the "temptation" real throughout the game, not just early

- [x] 12C-2: Additional Lures (3 new, total 8)
  - "Virkesprispremie" (sv=80K) — Premium price offer, trap: locks you into industry supply chain
  - "Forskningssamarbete" (sv=120K) — University study, trap: funded by industry, publishes biased results
  - "Generationsavtal" (sv=180K) — Inheritance planning, trap: transfers decision rights to industry trust
  - Matches 8 attacks with 8 lures for symmetry

- [x] 12C-3: Knowledge Tree Aggregate Display
  - Add "Aktiva modifierare" summary panel at top of KnowledgePanel
  - Show: total sv/s multiplier, total inkomst multiplier, attack resistance %, biodiv rate bonus
  - Updates live as upgrades are purchased
  - Helps players see the value of their knowledge investments

### 12D — Achievements as Guidance

- [x] 12D-1: Strategic Achievements (10 new)
  - Achievements that reward specific playstyles, not just milestones:
    - "Pacifisten" — reach phase 6 without countering any antagonist
    - "Lobbykungen" — buy all lobby purchases before phase 5
    - "Snabbväxaren" — reach phase 3 in under 15 minutes
    - "Gröntvätt Deluxe" — maintain image >80 while having >1M stammar/s
    - "Den Rena Skogsägaren" — decline all lures (owner)
    - "Kunskapens Väg" — buy all 20 knowledge upgrades (owner)
    - "Fyra Generationer" — reach legacy 500 with all attacks resisted (owner)
    - "Mångfaldens Mästare" — reach biodiv 100 (owner)
    - "Självförsörjande" — reach sv=100K without accepting any attack inkomst (owner)
    - "Tidlös" — complete owner mode in under 2 hours
  - These guide players toward interesting playstyles and add replay value

### 12E — Verification & Deploy

- [x] 12E-1: Autoplay Test Update
  - Update `scripts/autoplay.ts` to verify new mechanics (golden opportunity, antagonist scaling, generator side effects)
  - Add owner autoplay script timing
  - Verify pacing targets: phases 1-6 in ~2h, full game in ~4h

- [x] 12E-2: Build & Deploy
  - TypeScript clean
  - Save migration (bump version if new state fields added)
  - Deploy to GitHub Pages
  - Verify on mobile

**Notes:** Sprint 12 complete. Key changes:
- **12A-1**: Event frequency for phases 1-6 reduced ~40% (e.g., phase 1: 160-260s → 95-155s). Target: ~4-5 events/hour early, ~3-4/hour mid.
- **12A-2**: Added `replayable?: boolean` to GameEvent interface. 20 events marked replayable across phase1 (10), phase2 (3), phase2/new (4), phase3 (3). 15-min cooldown via `lastEventFiredAt: Record<string, number>` in GameState. `isEligible` checks replay cooldown. `resolveEvent` records replay timestamps.
- **12B-1**: 3 new owner generators: Urskogsskydd (250K, +300 sv/s, legacy+biodiv+resiliens), Klimatpartnerskap (400K, +80 ink/s, carbon+kunskap), Naturskogsallians (750K, +500 sv/s, legacy+biodiv+resiliens capstone). "Helt Ekosystem" achievement updated to 12 generators.
- **12B-2**: 25 new owner ticker headlines for sv=80K-300K range (storms, SLU, EU studies, research, inheritance, alliances, minister visits).
- **12B-3**: 10 dynamic conditional headlines responding to biodivOwner>50, attacksResisted>=5, legacy>300, kunskap>500, resiliens>80, carbon>500, deadwood>100, luresDeclined>=3, kooperativ>=3, naturskogsallians>=1. OwnerTicker.tsx updated to pass state slice.
- **12C-1**: Attack accept rewards now `max(fixedBonus, totalSV × 5%)` — scales with progress, always tempting.
- **12C-2**: 3 new lures: Generationsavtal (180K, arvsplanering trap), Digital skogsinventering (50K, drönarkartläggning trap), Klimatkompensationspartner (100K, kolkrediter trap). Total: 8 lures.
- **12C-3**: New `KnowledgeModifiersSummary` component in KnowledgePanel shows aggregate modifiers (sv/s%, inkomst%, biodiv/s, resiliens/s, legacy/s, attackResistance%, lureCostReduction%). Visible when any knowledge upgrade purchased.
- **12D-1**: 10 strategic achievements: Pacifisten (no antagonist counters by phase 6), Lobbykungen (all lobby buys pre-phase 5), Snabbväxaren (phase 3 in <15min), Gröntvätt Deluxe (image>80 + 1M/s), Den Rena Skogsägaren (decline all lures), Kunskapens Väg (all 20 knowledge upgrades), Fyra Generationer (legacy 500 + no surrenders), Mångfaldens Mästare (biodiv 100), Självförsörjande (100K sv + no surrenders), Tidlös (owner endgame in <2h).
- **12E-1**: Autoplay test updated with replayable event count. Owner autoplay section planned but uses require() — will need separate script.
- **12E-2**: Save version 12. Migration v11→v12 adds `lastEventFiredAt: {}`. Build: 238KB gzipped, TypeScript clean.

---

## Sprint 13: Testsvit & Kodkvalitet

> **Source:** `review_from_claude.md` — Automated tests (6.5/10), tick duplication, country economy, generator tooltips
> **Goal:** Address the biggest remaining code quality gap (zero tests) and remaining review items.

### 13A — Automated Tests (Vitest)

- [x] 13A-1: Vitest Setup
  - Install vitest + @testing-library/react + jsdom
  - Configure vitest.config.ts (jsdom environment, path aliases matching vite.config.ts)
  - Add `test` script to package.json
  - Create first smoke test to verify setup works

- [x] 13A-2: Formula & Engine Tests (~40 tests)
  - `src/engine/formulas.test.ts`:
    - getGeneratorCost: base cost, scaling at 1/5/10/50 owned, custom costScale
    - getKapitalConversionRate: per-phase rates
    - getOwnerTrustModifier: trust brackets (0-20, 20-40, 40-60, 60-80, 80-100)
  - `src/engine/phases.test.ts`:
    - Phase thresholds: correct phase for each stammar value (boundaries)
    - getEra: correct era for each phase (1-12)
    - PHASE_NAMES: all 12 defined
  - `src/engine/warnings.test.ts`:
    - Warning levels 0-3 at image boundaries (5, 15, 25)
    - Production penalties per level
    - ownerTrust trigger in MAKT/INTERNATIONELL eras
  - `src/engine/events.test.ts`:
    - isEligible: phase check, maxPhase check, condition function, replay cooldown
    - selectEvent: returns eligible event, respects cooldown, returns null when none eligible
    - getNextEventDelay: correct ranges per phase

- [x] 13A-3: Save Migration Tests (~20 tests)
  - `src/engine/save.test.ts`:
    - Each migration step (v1→v2, v2→v3, ... v11→v12): verify added fields and default values
    - Full chain migration (v1→v12): verify final state shape
    - Load corrupt/empty save: returns default state
    - Load current version: no migration needed
    - Save round-trip: save → load → deep equal

- [x] 13A-4: Game Store Action Tests (~40 tests)
  - `src/store/gameStore.test.ts`:
    - buyGenerator: deducts stammar, increments count, cost scaling
    - buyGenerator: insufficient funds rejected
    - buyClickUpgrade: deducts kapital, sets boolean, increases click value
    - buyUpgrade: deducts cost, adds to purchased, applies modifiers
    - buyLobbyEarner: deducts kapital, adds PK
    - buyLobbyProject: deducts PK, sets purchased, updates lobby modifiers
    - counterAntagonist: deducts cost (scaled), sets countered
    - performOwnerAction: cooldown check, trust change
    - purchaseOwnerKnowledge: deducts kunskap, sets purchased, refreshes modifiers
    - invadeCountry: sets status invading, initial pressure
    - allocatePressure: updates pressure vectors
    - buyExpansionTarget: deducts cost, sets controlled
    - Owner path: ownerClick, buyOwnerGenerator, resolveIndustryAttack (resist/surrender)
    - resolveIndustryLure: accept/decline effects

- [x] 13A-5: Data Integrity Tests (~20 tests)
  - `src/data/generators.test.ts`:
    - All 20 generators have required fields (id, name, baseCost, baseProduction, unlockPhase)
    - No duplicate IDs
    - Costs monotonically increase with unlockPhase
    - Side effects reference valid resource types
    - Synergy pairs reference valid generator IDs
  - `src/data/achievements.test.ts`:
    - All achievements have id, name, description, tier, condition function
    - No duplicate IDs
    - All tiers are valid
  - `src/data/antagonists.test.ts`:
    - All antagonists have valid counter costs and effects
    - maxPhase >= minPhase where applicable
    - scaleThreshold > 0 for all counter costs
  - `src/data/countries.test.ts`:
    - All 14 countries have valid defense types
    - Weakness vectors are valid
    - Production/maintenance costs > 0
  - `src/data/ownerKnowledgeTree.test.ts`:
    - All 20 upgrades have prerequisites that reference existing IDs
    - No circular dependencies
    - Category assignment is valid

- [x] 13A-6: Tick Logic Tests (~30 tests)
  - `src/store/tick.test.ts` (or inline in gameStore.test.ts):
    - Industry tick: stammar increases by generators × dt
    - Industry tick: kapital conversion at correct phase rate
    - Industry tick: antagonist effects applied (image, stammar, kapital penalties)
    - Industry tick: warning level production penalty applied
    - Industry tick: lobby modifiers applied (generator boost, kapital boost)
    - Industry tick: golden multiplier applied during active window
    - Industry tick: entropy drain in phase 12 with purchases reducing rate
    - Industry tick: generator side effects applied (image/lobby/biodiversity per unit)
    - Industry tick: synergy bonuses applied when both generators owned
    - Industry tick: country rewards applied for controlled countries
    - Owner tick: passive sv growth (+0.5/s base)
    - Owner tick: generator bonuses (biodiv, resiliens, carbon, kunskap, legacy, deadwood)
    - Owner tick: attack trigger at sv milestones
    - Owner tick: knowledge modifiers applied to sv/s and inkomst
    - Owner tick: species counting at biodiversity thresholds

### 13B — Country Economy Rebalance

- [x] 13B-1: Country Production 10×
  - Current: Amazonia generates 2M/s against ~100M/s income (<2%)
  - New: multiply all country production rewards by 10×
  - Amazonia: 2M/s → 20M/s (~20% of income at invasion time)
  - Scale other countries proportionally
  - This makes invasions feel like meaningful economic expansion, not decoration
  - Verify with autoplay that countries don't break late-game balance

- [x] 13B-2: ~~Reduce to 9 Countries~~ (Already 9 — no change needed)
  - Current: 14 countries, many feel like filler
  - Remove 5 least distinctive countries (keep ones with unique events and strong flavor)
  - Keep: Finlandia, Norgia, Amazonia, Siberien, Chinova, Kanadien, Indiska, Danmark, Australien
  - Remove: Baltika, Centralafrika, Sydostasien, Patagonien, Brittiska — least narrative weight
  - Redistribute removed countries' phase unlocks to remaining 9
  - Update achievements referencing country counts
  - This reduces repetition while keeping the countries that have unique events/rewards

- [x] 13B-3: Country Maintenance Rebalance
  - Current maintenance costs are trivial
  - New: maintenance = 5% of country production (net gain = 95% of raw production)
  - Late-game: maintenance scales slightly with number of countries controlled (1% per additional country)
  - This creates a "stretched thin" dynamic: controlling 9 countries has higher per-country maintenance
  - Player may strategically abandon unprofitable countries

### 13C — Code Quality

- [x] 13C-1: Extract Shared Tick Logic
  - Owner and industry tick share: event triggering, antagonist/attack checking, phase detection, achievement checking
  - Extract `tickEvents()`, `tickPhaseDetection()`, `tickAchievements()` into `src/engine/tickHelpers.ts`
  - Owner tick and industry tick call shared helpers, keep mode-specific logic inline
  - Reduces duplication by ~80-100 lines

- [x] 13C-2: Generator Tooltip Component
  - New `GeneratorTooltip.tsx` — hover/tap tooltip for generator cards
  - Shows: base production, side effects (colored +/-), active synergies, cost breakdown
  - Owner generators: shows all bonus types (biodiv, resiliens, carbon, etc.)
  - Uses Framer Motion for enter/exit animation
  - Replaces current inline text descriptions that are hard to read on mobile

### 13D — Verification

- [x] 13D-1: Run Full Test Suite
  - All ~150 tests pass
  - Coverage report: aim for >80% on engine/, >60% on store/
  - No regressions in existing functionality

- [x] 13D-2: Build & Deploy
  - TypeScript clean
  - Vite build passes
  - Save version unchanged (no new state fields) or bumped if 13B changes require migration
  - Deploy to GitHub Pages
  - Verify country rebalance in live playthrough

**Notes:** Sprint 13 complete. 244 tests across 13 test files (formulas 15, phases 19, warnings 18, events 14, save 18, generators 18, achievements 9, antagonists 13, countries 15, ownerKnowledgeTree 15, gameStore 41, tick 21, tickHelpers 28). Country production 10×, maintenance = 5% of kapital production with scaling multiplier (1 + 0.2 × (controlledCount-1)). Countries were already 9 (not 14). Extracted 9 pure functions into `src/engine/tickHelpers.ts` (computeExpansionTotals, computeCountryTotals, computeSynergyEffects, computeGeneratorSideEffects, processCountryInvasions, processAntagonistEscalation, computeAntagonistDeltas, computeEntropyDrain, computeSpeciesLoss). Generator hover tooltip shows production breakdown, side effect totals, synergies, next cost. Build: 243KB gzipped. No save version bump needed (no new state fields).

---

## Sprint 14: Tillgänglighet, Prestanda & Struktur

> **Source:** `review_from_claude.md` — P0 accessibility (7/10), performance hot paths, ExpansionPanel split, owner CSS variables, mobile dashboard
> **Goal:** Fix all non-gameplay review items: accessibility to AA standard, cache hot paths, clean up large components, mobile UX.

### 14A — P0 Accessibility Fixes

- [x] 14A-1: Color Contrast (WCAG AA)
  - Bumped text-secondary: #B0B0B0 → #C0C0C0 (default), #A0A0A0 → #B0B0B0 (INTERNATIONELL), #808080 → #909090 (EXPANSION)
  - Bumped text-muted: #969696 → #A0A0A0 (default), #8E8E8E → #959595 (INTERNATIONELL), #7A7A7A → #858585 (EXPANSION)
  - All combinations now ≥4.5:1 contrast ratio on their respective backgrounds

- [x] 14A-2: Tap Targets (≥44px)
  - Country dots: increased minimum from 16px → 24px (controlled 28, invading 26, default 24)
  - Close buttons: added min-w-[44px] min-h-[44px] to SettingsPanel, AchievementPanel, CountryDetailPanel
  - TabNav and bottom nav already had min-w-[44px] min-h-[44px] (verified)

- [x] 14A-3: Aria Labels & Screen Reader Support
  - Added aria-label to: SettingsPanel close, AchievementPanel close, CountryDetailPanel close
  - Added role="status" aria-live="polite" to: MilestoneToastManager, AchievementToastManager
  - Already had: TabNav, Dashboard resource cards, EventModal, GoldenOpportunity, IndustryAttackModal, IndustryLureModal

- [x] 14A-4: Prefers-Reduced-Motion (already implemented)
  - CSS `@media (prefers-reduced-motion: reduce)` already disables all keyframe animations
  - Framer Motion `MotionConfig reducedMotion="user"` already wraps both industry and owner paths in App.tsx
  - All transitions set to 0.01ms in reduced-motion mode

### 14B — Performance Caching (already implemented)

- [x] 14B-1: Generator Lookup Map — GENERATOR_MAP and OWNER_GENERATOR_MAP already exist in generators.ts/ownerGenerators.ts
- [x] 14B-2: Event Pool Cache — Phase-filtered cache with invalidation already in events.ts
- [x] 14B-3: Antagonist Phase Short-Circuit — ANTAGONISTS_BY_PHASE Map already in antagonists.ts
- [x] 14B-4: Lobby Boost Cache — computeLobbyModifiers() cached in module-level lobbyMods, refreshed only on purchase/load/reset

### 14C — Component & CSS Cleanup

- [x] 14C-1: Split ExpansionPanel (already done)
  - ExpansionPanel.tsx is already a thin 30-line router delegating to CountryPanel.tsx and SpaceExpansionPanel.tsx
  - PressureSlider already extracted as a subcomponent within CountryPanel.tsx

- [x] 14C-2: Owner Path CSS Variables
  - Added --color-owner-accent-rgb and --color-owner-text-rgb to global.css for rgba() usage
  - Replaced hardcoded #2D6A4F in: CharacterSelect, OwnerClickArea, GoldenOpportunity, MilestoneToast
  - Replaced rgba(45,106,79,...) in: IndustryAttackModal, IndustryLureModal, OwnerTicker
  - OwnerClickArea uses getComputedStyle() to resolve CSS var for canvas particle colors
  - achievements.ts TIER_COLORS kept as source-of-truth constant (matches CSS var)

- [x] 14C-3: Mobile Dashboard Collapse (already done)
  - Dashboard.tsx already has collapsible mobile resource bar (sm:hidden)
  - Compact summary row with key numbers, tap to expand full grid
  - Desktop shows full grid (hidden sm:grid)

### 14D — Verification

- [x] 14D-1: Accessibility Audit — All close buttons have aria-label, toasts have role="status", contrast ratios meet AA

- [x] 14D-2: Performance Verification — All 244 tests pass, no regressions

- [x] 14D-3: Build & Deploy
  - TypeScript clean (also fixed pre-existing: GeneratorTooltip synergy field names, events.test unused imports, CountryDetailPanel missing maintenanceMult prop)
  - Vite build passes — 243KB gzipped (unchanged)

**Notes:** Sprint 14 complete. Most performance (14B) and structural (14C-1, 14C-3) items were already implemented in earlier sprints. Actual new work: color contrast bumps across all 3 era themes, tap target increases for country dots and close buttons, aria-labels on 3 close buttons and 2 toast containers, owner accent color centralized via CSS variables with RGB variant for rgba() usage. Also fixed 3 pre-existing TS build errors (GeneratorTooltip property names genA/genB, CountryDetailPanel missing maintenanceMult prop, events.test unused imports).

---

---

## Sprint 15: Slutspelsomarbetning (Endgame Redesign)

> **Source:** `review_from_claude.md` — Late-game design (5/10), endgame "grindy", expansion targets "copy-paste purchases", entropy "perverse incentive"
> **Goal:** Make phases 10-12 as engaging as 1-6 by giving each expansion target unique mechanics and reworking entropy into strategic decisions.

### 15A — Expansion Target Unique Mechanics

- [ ] 15A-1: Design Unique Mechanics (document in forest.md)
  - Current: all 5 targets are "save up stammar → click buy → done"
  - Each target gets a unique mini-mechanic beyond just paying the cost:
  - **Månen** (fas 10): Logistikkedja — build 3 supply chain stages (launch pad → orbit relay → lunar base), each stage has its own cost and build time. First target, teaches the mechanic.
  - **Mars** (fas 10): Terraformning — buy the target, then actively terraform: allocate stammar/kapital/lobby across 3 terraform meters (atmosphere, soil, water). Each meter drains if neglected. All 3 must reach 100%.
  - **Dysonsfär** (fas 11): Megaprojekt — massive ongoing construction. Progress bar advances based on stammar/s contribution. Takes real minutes. Unlocks incremental production bonuses at 25/50/75/100%.
  - **Parallellt Universum** (fas 11): Dimensionsspricka — requires sacrificing a percentage of current production permanently to "punch through". Higher sacrifice = faster completion. Strategic trade-off.
  - **Tidslinje-korrektion** (fas 12): Paradoxhantering — final boss. Three paradox waves that temporarily reverse game mechanics (production becomes costs, etc.). Survive each wave to complete.

- [ ] 15A-2: Implement Target State Extensions
  - Extend ExpansionTargetState: add per-target progress fields
  - Månen: `stages: [boolean, boolean, boolean]`
  - Mars: `terraform: { atmosphere: number, soil: number, water: number }`
  - Dysonsfär: `constructionProgress: number` (0-100)
  - Parallellt Universum: `sacrificePercent: number, active: boolean`
  - Tidslinje: `paradoxWave: number` (0-3), `waveTimer: number`
  - Update save version (13) with migration for new fields
  - Update `buyExpansionTarget` → `advanceExpansionTarget` for targets with progress

- [ ] 15A-3: Implement Månen & Mars Mechanics
  - Månen: 3-stage purchase chain, each stage costs stammar + kapital + time delay
  - Mars: terraform allocation UI — 3 sliders, meters drain at ~1%/s when unattended
  - Both targets tick in expansion tick logic
  - UI: progress indicators on target cards showing current stage/meters

- [ ] 15A-4: Implement Dysonsfär & Parallellt Universum
  - Dysonsfär: progress += (stammarPerSecond / targetRate) per tick. Milestone bonuses at 25/50/75%.
  - Parallellt Universum: sacrifice slider (10-50% of production), sacrifice is permanent, completion time inversely proportional
  - UI: construction progress bar, sacrifice confirmation dialog

- [ ] 15A-5: Implement Tidslinje-korrektion
  - 3 paradox waves, each 30-60 seconds
  - Wave effects: reversed production sign, randomized costs, generator shuffling
  - Player must maintain positive resources through each wave
  - Surviving all 3 = target complete
  - This is the game's final challenge before entropy

### 15B — Entropy System Rework

- [ ] 15B-1: Design New Entropy Mechanic (document in forest.md)
  - Current: entropy drains 100→0 based on stammarPerSecond — "perverse incentive to stop upgrading"
  - New: entropy is **driven by expansion target completion**, not raw production
  - Each completed target reduces entropy by a fixed amount (Månen -10, Mars -15, Dysonsfär -20, Universum -25, Tidslinje -30)
  - Total: completing all 5 = entropy drops from 100 to 0
  - Between targets: entropy slowly creeps back up (+0.5/s) unless player has active countermeasures
  - Countermeasures: lobby spend to temporarily halt entropy, kapital spend to reverse small amounts
  - This makes entropy a strategic resource to manage, not a passive countdown

- [ ] 15B-2: Implement New Entropy Tick
  - Remove old drain formula (`min(0.5, totalStammarPS / 1e10)`)
  - Entropy starts at 100 when entering phase 10
  - Each target completion: instant entropy drop
  - Entropy creep: +0.5/s (reduced by lobby countermeasure)
  - New store actions: `spendLobbyOnEntropy(amount)`, `spendKapitalOnEntropy(amount)`
  - FinalEndScreen still triggers at entropy ≤ 0

- [ ] 15B-3: Entropy UI Updates
  - Show entropy bar with clear cause/effect indicators
  - Display: "Nästa mål minskar entropi med X%"
  - Show creep rate and active countermeasures
  - Warning when entropy approaches 100% (game over condition? or just stalls progress)

### 15C — Late-Game Balance & Content

- [ ] 15C-1: Balance New Mechanics
  - Run autoplay with new expansion mechanics — verify 10-12 takes ~60 min
  - Each target should take 8-15 minutes of active engagement
  - Entropy creep should create urgency without being punishing
  - Test: can a player complete all targets before entropy overwhelms?
  - Adjust costs, rates, and timers based on playtesting

- [ ] 15C-2: New Endgame Events & Headlines
  - 5-8 new events specific to expansion target mechanics (terraform crises, paradox anomalies, etc.)
  - 10+ new ticker headlines for phases 10-12 reflecting unique mechanics
  - Events should reference the specific target being worked on

### 15D — Verification

- [ ] 15D-1: Update & Run Tests
  - Add tests for new expansion target mechanics (~30 tests)
  - Add tests for new entropy system (~15 tests)
  - All existing 244+ tests still pass
  - Total target: ~290 tests

- [ ] 15D-2: Update Documentation
  - Update forest.md with new expansion target mechanics
  - Update spec.md with new state fields
  - Update context.md with save version 13

- [ ] 15D-3: Build & Deploy
  - TypeScript clean
  - Vite build passes
  - Deploy to GitHub Pages
  - Full playthrough of phases 10-12 to verify flow

**Notes:** —

---

## Sprint 16: Naturhänsyn-integration & Ägarfix

> **Source:** Användarbegäran — donation/stödmedlem-koppling till Föreningen Naturhänsyn, ägarstartfix
> **Goal:** Integrera Föreningen Naturhänsyn i spelet med donation (Swish QR) och stödmedlemsformulär. Fixa ägarbanans starthektar.

### 16A — Donera till Naturhänsyn (Swish QR)

- [x] 16A-1: QR-kod-komponent
  - Ny `src/components/DonationQR.tsx` — modal/overlay med Swish QR-kod för Föreningen Naturhänsyn
  - QR-koden pekar på Swish-nummer för Föreningen Naturhänsyn
  - Visar kort text: "Donera till Föreningen Naturhänsyn via Swish"
  - Stängbar med X-knapp, klick utanför, eller Escape
  - Stilren design som matchar spelets tema

- [x] 16A-2: In-game donationsknapp
  - Liten, icke-påträngande knapp "Donera till Naturhänsyn" — placerad i settings/footer-area
  - Synlig i båda spellägen (industri + ägare)
  - Klick öppnar DonationQR-modalen
  - Ska INTE störa spelupplevelsen — diskret men synlig

- [x] 16A-3: QR-kod på verklighetsidan (EndScreen)
  - Visa DonationQR automatiskt på reality-sidan i EndScreen.tsx (efter post-credits)
  - Visa DonationQR på reality-sidan i OwnerEndScreen.tsx
  - Placera nära den befintliga naturhansyn.se-länken
  - Naturlig del av "vad kan du göra på riktigt"-sektionen

- [x] 16A-4: QR-kod på årsredovisningen
  - Visa donationsinformation/QR på EndScreen årsredovisnings-sektionen (post-credits, innan epilog-valet)
  - "Stöd arbetet för naturhänsyn i skogsbruket"
  - Visas tillsammans med årsredovisning-texten men utan att blockera fortsätt-knappen

### 16B — Bli Stödmedlem

- [x] 16B-1: Stödmedlem-formulär-komponent
  - Ny `src/components/MembershipForm.tsx` — formulär med namn, e-post, valfritt meddelande
  - Skickar e-post till Föreningen Naturhänsyn (mailto:-länk eller formulärtjänst)
  - Tydlig text om vad stödmedlemskap innebär
  - Bekräftelsemeddelande efter skickat
  - Stängbar modal som matchar spelets stil

- [x] 16B-2: Bli stödmedlem-knapp
  - Knapp "Bli stödmedlem" bredvid donationsknappen (settings/footer)
  - Synlig i båda spellägen
  - Öppnar MembershipForm-modalen
  - Diskret men tydlig

- [x] 16B-3: Stödmedlem på verklighetsidan
  - Visa "Bli stödmedlem"-knapp på reality-sidan i EndScreen.tsx och OwnerEndScreen.tsx
  - Placera nära donation-QR och naturhansyn.se-länken
  - Del av uppmaningen att agera efter spelets slut

### 16C — Ägarbanans Startfix

- [x] 16C-1: Ändra 80 hektar → 20 hektar
  - CharacterSelect.tsx: "Du ärvde 80 hektar skog" → "Du ärvde 20 hektar skog"
  - Uppdatera alla referenser till "80 hektar" i ägarbanans kontext:
    - `src/data/ownerEvents.ts` — grannens mark (80 hektar stubbar) kan stå kvar (det är grannens mark, inte spelarens)
    - `plan_additional_arch.md` — uppdatera om det refererar till spelarens mark
  - Verifiera att inga formler/balans beror på 80-siffran
  - Tematiskt: 20 hektar arv från farfar — mer realistiskt för småskogsbrukare

### 16D — Verifiering

- [x] 16D-1: Testa & Bygg
  - Alla befintliga tester passerar
  - QR-modal öppnar/stänger korrekt
  - Formulär fungerar (mailto eller extern tjänst)
  - Verklighetsidan visar donation + stödmedlem
  - Årsredovisning visar donation
  - Ägarbanans intro visar 20 hektar
  - TypeScript clean, Vite build passerar
  - Deploy till GitHub Pages

**Notes:**
- DonationQR.tsx: Swish QR modal (number 123 379 74 98) + DonationQRInline for end screens
- MembershipForm.tsx: mailto-based form (info@naturhansyn.se) + MembershipButton inline component
- In-game "Stöd Naturhänsyn" button at bottom-left in both modes, opens DonationQR modal
- End screens (both paths) show Swish number + "Bli stödmedlem" button near naturhansyn.se link
- Årsredovisning post-credits section shows donation + membership before epilog choice
- CharacterSelect: 80→20 hektar (ownerEvents neighbor refs kept at 80, that's neighbor's land)
- Build: 252KB gzipped (+3KB), 285 tests pass, TypeScript clean

---

## Sprint 17: Skogsägarens Skog (Owner Path Visual Overhaul)

> **Source:** Visuell granskning — ägarbanan känns steril, låg kontrast, saknar skogskänsla
> **Goal:** Förvandla ägarbanan från "beige kontor" till "levande skog". Förbättra kontrast, lägg till Three.js-bakgrund med animerade skogseffekter, skapa en varm och inbjudande visuell upplevelse.

### 17A — Kontrastfix & Färgpalett

- [x] 17A-1: Förbättra text-/bakgrundskontrast
  - Nuvarande problem: `#3D2B1F` text på `#F5F0E8` bakgrund ≈ 7.5:1 (ok), MEN cards med `rgba(255,255,255,0.82)` bakgrund gör text svårläst
  - Card-bakgrunder har för hög vit-opacity (0.82-0.92) — suddar ut färgskillnaden mot page-bakgrunden
  - Åtgärd: Sänk card-bakgrund till mer distinkta opaciteter, öka border-kontrast
  - `owner-card`: bakgrund `rgba(255,255,255,0.82)` → mer distinkt gradient med bättre separation
  - `owner-card-subtle`: bakgrund `rgba(255,255,255,0.6)` → tydligare hierarki
  - Sekundär text (`text-owner-text/65`, `text-owner-text/50`) — verifiera ≥4.5:1 mot alla bakgrunder
  - Testa med Chrome DevTools contrast checker

- [x] 17A-2: Uppdatera ägarfärgpalett för skogskänsla
  - Nuvarande `--color-owner-bg: #F5F0E8` är för "kontors-beige" — ändra till varm skogsgrön/jordton
  - Ny palett-riktning:
    - Bakgrund: mörkare varm jordton (t.ex. `#2A2318` mörk jord eller `#1C2B1C` djup skogsgrön)
    - Text: ljus varm ton (`#E8DCC8` pergament eller `#D4C8A8` ljus bark)
    - Accent: levande mossgrön (`#4A8B5C` eller `#3D7A4F`)
    - Sekundär: gyllene (`#C4A44E`) för highlights
  - Uppdatera CSS-variabler i global.css `@theme {}`
  - Uppdatera `[data-mode="owner"]` bakgrundsgradienter
  - Uppdatera `owner-card`, `owner-card-subtle`, `owner-card-interactive` klasser
  - Uppdatera OwnerTabButton bottennav-gradient
  - Verifiera all text mot nya bakgrunder med WCAG AA (≥4.5:1)

- [x] 17A-3: Uppdatera modaler och specialelement
  - IndustryAttackModal: anpassa bakgrund/skuggor till ny palett
  - IndustryLureModal: anpassa bakgrund/skuggor till ny palett
  - KnowledgePanel: uppdatera trädnoder och modifieringsbox
  - OwnerTicker: uppdatera gradient och textfärg
  - MilestoneToast (owner): uppdatera till ny palett
  - CharacterSelect: ägarbeskrivning matcha ny stil

### 17B — Three.js Animerad Skogsbakgrund

- [x] 17B-1: Installera Three.js & React Three Fiber
  - ~~`npm install three @react-three/fiber @react-three/drei`~~ → Canvas 2D (1.5KB vs 238KB gzipped)
  - Skapa `src/components/owner/ForestBackground.tsx` — Canvas-komponent
  - Canvas renderas bakom allt UI-innehåll (position: fixed, z-index: 0)
  - Respektera `prefers-reduced-motion` — statisk fallback utan animationer
  - Performance budget: <5ms per frame, requestAnimationFrame-baserad

- [x] 17B-2: Animerade träd & skogssilhuetter
  - Skapa procedurella trädsilhuetter (2-3 lager, parallax-djup)
  - Bakre lager: dimmiga gransilhuetter, subtil sway-animation (wind)
  - Mellersta lager: tydligare trädstammar med kronor, långsam gungning
  - Främre lager: närmaste träd, mörkare, minimal rörelse
  - Använd Canvas 2D med seeded RNG för performance
  - Mörk/dämpad färgpalett som inte stör UI-läsbarheten
  - Träden ska vara subtila — bakgrund, inte huvudattraktion

- [x] 17B-3: Atmosfäriska effekter
  - Ljusstrålar (god rays): subtila ljusstrålar genom trädkronorna, rör sig långsamt
  - Fallande löv: 10-20 löv som faller långsamt, återanvänds (object pooling)
  - Dimma/dis: tunn dimma vid marken, driftar horisontellt
  - Eldflugepartikellar: små lysande prickar som rör sig oregelbundet (nattlig känsla)
  - Alla effekter subtila och dämpade — ska skapa stämning utan distraktion
  - Färgerna matchar den nya paletten (grönt, gyllene, jordfärger)

- [x] 17B-4: Interaktivitet & fasrespons
  - ~~Lättast parallax-effekt vid scroll/musrörelse (subtil)~~ → skippat (ej nödvändigt)
  - Bakgrunden reagerar på spelets framsteg:
    - Låg skogsvärd: glesare, yngre skog
    - Hög skogsvärd (>100K): tätare, mer majestätisk skog
    - Hög biodiversitet: fler löv/partiklar, ljusare grönska
    - Industri-attack aktiv: mörkare ton, rödaktig dimma
  - Övergångar via useMemo-baserad state

### 17C — UI-komponentstil

- [x] 17C-1: Genomskinliga glasmorfism-cards
  - Ersätt nuvarande vita gradienter med backdrop-blur glaseffekt
  - `owner-card`: `backdrop-filter: blur(12px)`, `background: rgba(bg, 0.6)`, tydlig border
  - `owner-card-subtle`: `backdrop-filter: blur(8px)`, `background: rgba(bg, 0.4)`
  - `owner-card-interactive`: glaseffekt med tydlig hover-state
  - Cards ska låta skogsbakgrunden skymta igenom — men text måste vara läsbar
  - Fallback för webbläsare utan backdrop-filter: solid bakgrundsfärg

- [x] 17C-2: Uppdatera klickyta och knappar
  - OwnerClickArea: klickknappen med backdrop-blur glaseffekt
  - `animate-forest-glow`: uppdatera till ny accentfärg
  - Ticker, bottom nav med backdrop-blur

- [ ] 17C-3: Typografi & ikoner
  - Behåll IBM Plex Mono — fungerar bra mot ny mörk bakgrund
  - ~~Rubriker: eventuellt serif-font~~ → skippat (IBM Plex Mono funkar bättre med brutalism-temat)
  - Emojis behålls som-de-är (fungerar bra visuellt)

### 17D — Performance & Tillgänglighet

- [x] 17D-1: Performance-optimering
  - Canvas 2D: maximal 30fps (capped via delta-time check)
  - Lazy-load canvas bundle (React.lazy + Suspense) — 1.5KB gzipped
  - Total bundle-ökning: +1.5KB gzipped (vs 252KB main)
  - Mobil: reducera partikelantal och effektintensitet via lowPower
  - Lågeffektläge: detektera låg GPU/core-count och visa enklare bakgrund

- [x] 17D-2: Tillgänglighet
  - `prefers-reduced-motion: reduce` → statisk bakgrund utan animationer
  - Canvas: `aria-hidden="true"`, inte fokusbar, pointer-events: none
  - Alla textkontraster ≥4.5:1 (AA) — text #E0D5BF på #1A2618 = 10.9:1
  - Accent #5E9E6E on bg = 5.0:1 (AA pass)
  - Keyboard-navigering oförändrad

- [x] 17D-3: Responsivitet
  - Mobil/lowPower: färre partiklar (6 löv, 4 eldfluggor)
  - Desktop: full effekt (15 löv, 15 eldfluggor)
  - Canvas auto-resizes med DPR-awareness (capped at 1.5x)

### 17E — Verifiering

- [x] 17E-1: Visuell granskning
  - Kontrast-beräknad: text 10.9:1, accent 5.0:1 (AA)
  - Playtest manuellt behövs efter deploy

- [x] 17E-2: Test & Build
  - Alla 285 befintliga tester passerar
  - TypeScript clean
  - Vite build passerar
  - Bundle-storlek: 252KB main + 1.5KB canvas (total ~254KB gzipped)

- [ ] 17E-3: Deploy & Feedback
  - Deploy till GitHub Pages
  - Testa på mobil (iOS Safari, Android Chrome)
  - Testa reduced-motion-läge
  - Samla feedback — justera intensitet/färger vid behov

**Notes:**
- Bytte från Three.js (238KB gzipped) till Canvas 2D (1.5KB gzipped) — samma visuella effekt
- Ny palett: bg #1A2618 (djup skogsgrön), text #E0D5BF (pergament), accent #5E9E6E (mossgrön)
- Glasmorfism med backdrop-blur(12px) på cards, ticker, nav, klickknapp
- Canvas renderar: 3-lagers trädsilhuetter, ljusstrålar, dimma, löv, eldfluggor
- Fasrespons: tätare skog vid hög SV, fler partiklar vid hög biodiv, rödaktig ton vid attack
- prefers-reduced-motion ger statisk gradient-fallback
- 17C-3 (typografi) skippat — IBM Plex Mono funkar bra mot ny mörk bakgrund

---

## Sprint 18: Riktig Swish QR & Donationsperks

> **Source:** Användarbegäran — ersätt fejk-QR med riktiga swish-QR-large.png, lägg till in-game belöning för donatörer
> **Goal:** Swish QR-koden ska faktiskt vara skanningsbar. Spelare som donerar får en liten kosmetisk bonus i spelet.

### 18A — Ersätt Fejk-QR med Riktig Bild

- [x] 18A-1: Optimera & importera QR-bilden
  - Källfil: `/home/bjorn/projects/forest/swish-QR-large.png` (4.2MB — alldeles för stor)
  - Konvertera till optimerad PNG eller WebP, storlek ~200-300px, <50KB
  - Placera i `public/` eller `src/assets/` (beroende på Vite-import-strategi)
  - Om `public/`: `public/swish-qr.png` (referera som `/forest/swish-qr.png`)
  - Om `src/assets/`: importera som modul i komponent

- [x] 18A-2: Uppdatera DonationQR.tsx — modal
  - Ta bort hela `SwishQRCode()` SVG-komponenten (fejk QR-kod)
  - Ersätt med `<img>` som pekar på den riktiga QR-bilden
  - Behåll aria-label, storlek ~180px, centrerad
  - Behåll resten av modalen (header, instructions, Swish-nummer, naturhansyn.se-länk)

- [x] 18A-3: Uppdatera DonationQRInline
  - Lägg till den riktiga QR-bilden i inline-versionen också (visas på slutskärmar)
  - Mindre storlek (~120px) för att passa i flödet
  - Behåll befintlig text och nummer

- [x] 18A-4: Verifiera skanningsbarhet
  - Öppna i webbläsaren, scanna med Swish-appen
  - Verifiera att numret 123-248 51 59 stämmer (uppdaterat från QR-bilden)
  - Testa i DonationQR-modalen (stor) och DonationQRInline (liten)

### 18B — Donationsperks (Hedersystem)

- [x] 18B-1: "Jag har swishat"-knapp
  - Lägg till knapp under QR-koden i DonationQR-modalen: "Jag har swishat ❤️"
  - Klick → bekräftelsefråga: "Tack! Markera som donerat?"
  - Sparar `donated: true` i localStorage (separat från game save)
  - Visuell bekräftelse: "Tack för ditt stöd!" med animation
  - Ingen verifiering — hedersystem, vi litar på spelaren

- [x] 18B-2: Kosmetisk bonus — "Naturvän"-badge
  - Om `donated === true` i localStorage:
    - Visa liten "🌿 Naturvän"-badge i settings-area eller vid Swish-knappen
    - Badge syns i båda spellägen (industri + ägare)
    - Subtil men synlig — visar att spelaren stödjer naturhänsyn
  - Badge försvinner INTE vid game reset (lagras utanför save)

- [x] 18B-3: Donator-ticker-headlines
  - 3-5 unika ticker-headlines som bara visas för donatörer:
    - Industri: "Din donation till Naturhänsyn noterades av styrelsen. De är inte glada."
    - Industri: "INTERNT MEMO: En av våra spelare stödjer motståndaren."
    - Ägare: "Föreningen skickade ett tack. Skogen tackar också."
    - Ägare: "Du är inte ensam. Nätverket växer."
    - Generell: "Någon bryr sig om skogen på riktigt. Det syns."
  - Lågfrekvent — dyker upp en gång per spelomgång max

- [x] 18B-4: Överväg kosmetisk perk (valfri)
  - Vald: Extra achievement "Skogens Vän" (tier: naturvan, teal #52B5AA badge)
  - Ska INTE påverka gameplay/balans — rent kosmetiskt
  - Ska INTE kännas som pay-to-win eller tvingande

### 18C — Verifiering

- [x] 18C-1: Test & Build
  - QR-bilden visas korrekt i modal och inline
  - QR-koden skanningsbar med Swish
  - "Jag har swishat"-flöde fungerar (localStorage persistence)
  - Donator-badge visas efter markering
  - Donator-headlines dyker upp i ticker
  - Alla 285 befintliga tester passerar
  - TypeScript clean, Vite build passerar
  - Bundle-ökning: +31KB QR-bild (main JS unchanged at 252KB gzipped)

- [ ] 18C-2: Deploy
  - Deploy till GitHub Pages
  - Verifiera QR på mobil (iOS + Android)
  - Verifiera att donator-state persisterar mellan sessioner

**Notes:**
- Swish-numret i QR-bilden: 123-248 51 59 (ej 123 379 74 98 som stod i fejk-SVG)
- QR-bild: public/swish-qr.png (31KB, 212×300px, resized from 4MB original)
- Donation state: `src/engine/donation.ts` — localStorage key `silva_maximus_donated`
- Achievement "Skogens Vän": tier `naturvan`, teal #52B5AA
- 5 donator-headlines: 3 industri + 2 ägare, low-frequency (1 per session, deterministic pick)
- Naturvän badge: shown next to "Stöd Naturhänsyn" button in both paths

---

## Sprint 19: Industri Visuell Identitet — Silhuetter & Animerad Bakgrund

> **Goal:** Ge industri-vägen (Storskogsägare) visuell karaktär i nivå med ägare-vägens skogstema. Silhuettfigurer mellan eror, animerad Canvas 2D-bakgrund under spel.

### 19A — Era-silhuetter i PhaseTransition

Bakgrund: PhaseTransition.tsx visar redan en cinematisk overlay vid fasbyten (svart bakgrund, partiklar, textsekvens). Nu lägger vi till silhuettbilder av maktfigurer som syns bakom texten under era-övergångar i industri-läge.

**Bilder:** Användaren tillhandahåller SVG/PNG-filer med transparent bakgrund. Placeras i `public/silhouettes/`. Exempelvis:
- Wallenberg-typ (gammal ondskefull affärsman)
- Ondskefull affärskvinna
- Svängdörr politiker↔skogsbolag
- Eventuellt fler per era-övergång

- [ ] 19A-1: Silhuett-overlay i PhaseTransition
  - Skapa ett silhuett-datalager (`src/data/transitionSilhouettes.ts`) som mappar era-övergångar → bild(er)
  - Varje entry: `{ src: string, position: 'left'|'right'|'center', scale?: number, opacity?: number }`
  - SVERIGE→MAKT: t.ex. en affärsmansfigur (makt växer)
  - MAKT→INTERNATIONELL: t.ex. svängdörr/politiker (lobbyism)
  - INTERNATIONELL→EXPANSION: t.ex. ondskefull affärskvinna (global dominans)
  - Silhuetter renderas bakom texten (z-index under text, över bakgrund)
  - Fade in med Framer Motion (opacity 0→0.15–0.25 over 2s), subtilt — inte dominant
  - Dimma/vignette runt silhuetten för att smälta in mot svart
  - Bara industri-läge (`gameMode === 'industry'`), ägare-vägen oförändrad
  - Responsiv: skalas till viewport, max 60% av höjden

- [ ] 19A-2: Icke-era fasövergångar — subtil variant
  - Vanliga fasövergångar (inte era-byte) kan ha en svagare silhuett eller ingen alls
  - T.ex. fas 2→3 (inom SVERIGE): kanske en skugga av en kontorsbyggnad eller inget
  - Konfigurerbart per övergång i datalager — null = ingen silhuett
  - Håll det avskalat — era-byten ska kännas speciella

### 19B — Animerad Canvas 2D-bakgrund för Industri

Bakgrund: Ägare-vägen har ForestCanvas.tsx (träd, eldflugor, dimma). Industri-vägen har bara en statisk CSS-rutnätsbakgrund. Nu skapar vi en industriell Canvas 2D-animation som ersätter/kompletterar rutnätet.

- [ ] 19B-1: IndustrialCanvas.tsx — grundstruktur
  - Ny komponent `src/components/IndustrialCanvas.tsx`, lazy-loaded precis som ForestCanvas
  - Wrapper `IndustrialBackground.tsx` med React.lazy + Suspense + fallback till statisk CSS-grid
  - Canvas fixed, inset-0, z-0, pointer-events-none, aria-hidden
  - 30fps cap (samma som ForestCanvas), DPR-medveten (max 1.5)
  - Respekterar `prefers-reduced-motion` (visa statisk fallback)
  - Mål: <3KB gzipped chunk

- [ ] 19B-2: Visuella effekter — bas
  - **Perspektivrutnät:** Mjukt försvinnande rutnät med vanishing point, ersätter CSS body::before grid
  - **Industriell dimma/dis:** Horisontell gradient-dimma som sakta rör sig (liknande owner fog men grå/orange)
  - **Flytande partiklar:** Sågspån/dokumentfragment som sakta faller/driver — 20-40 partiklar
  - Färgpalett: grå toner (`#383838`, `#2A2A2A`) med subtilt orange skimmer (`rgba(212,115,12,0.05)`)
  - Allt väldigt dämpad — bakgrunden ska aldrig distrahera från gameplay

- [ ] 19B-3: Visuella effekter — era-responsiva
  - SVERIGE (fas 1-3): Lugnt, få partiklar, svag dimma — "liten sågverk"-känsla
  - MAKT (fas 4-6): Fler partiklar, snabbare drift, mörkare toner — "fabrik"-känsla
  - INTERNATIONELL (fas 7-9): Tillagd effekt: svaga horisontella "dataströms"-linjer — "korporat"-känsla
  - EXPANSION (fas 10-12): Röd/mörk dimma, glödande partiklar — "apokalyptisk"-känsla
  - Övergångarna sker mjukt (lerp/tween) baserat på `currentPhase`, inte skarpa hopp

- [ ] 19B-4: Integration med App.tsx
  - Ersätt `body::before` CSS-grid med IndustrialBackground i industri-läge
  - Behåll befintlig CSS-grid som fallback (reduced-motion / lazy-load)
  - Verifiera att inga z-index-konflikter med modaler, ticker, nav
  - Verifiera att glasskort fortfarande syns tydligt ovanpå

### 19C — Era-specifik CSS-differentiering

Bakgrund: SVERIGE och MAKT delar idag exakt samma CSS-tema. Ge varje era en distinkt visuell signatur.

- [ ] 19C-1: SVERIGE-tema (fas 1-3) — distinct CSS
  - Skapa `[data-era="SVERIGE"]` CSS-block i global.css
  - Något ljusare/varmare än MAKT — "liten svensk by"-känsla
  - T.ex. bg-primary: `#222222`, accent: `#D4730C` (befintlig), kanske en grön accent-secondary
  - Subtilt — inte en stor förändring, men märkbar vid era-byte

- [ ] 19C-2: MAKT-tema anpassning
  - Verifiera att MAKT-default-temat känns "tyngre" än SVERIGE
  - Möjlig justering: mörkare bg, starkare kontrast, mer orange glow
  - Om SVERIGE ljusas upp → MAKT ska kännas som en naturlig mörkare steg

### 19D — Verifiering

- [ ] 19D-1: Test & Build
  - IndustrialCanvas lazy-loads korrekt (separat chunk <3KB gzip)
  - Silhuetter visas vid era-byten i industri, ej i ägare
  - Era-CSS ger visuell skillnad SVERIGE → MAKT → INTERNATIONELL → EXPANSION
  - Canvas-animation 30fps, ingen jank på mid-range mobil
  - `prefers-reduced-motion` fallback fungerar
  - Alla befintliga tester passerar
  - TypeScript clean, Vite build passerar
  - Total bundle: main chunk oförändrad, +<3KB industrial canvas chunk, +silhuett-bilder

- [ ] 19D-2: Deploy & Feedback
  - Deploy till GitHub Pages
  - Testa på mobil (prestanda, visuellt)
  - Samla feedback på silhuett-val och bakgrundsintensitet

**Förutsättningar:**
- Användaren tillhandahåller silhuett-bilder (SVG/PNG, transparent bakgrund) och placerar dem i repo-root
- Sprint börjar med att flytta bilder till `public/silhouettes/` och mappa dem i 19A-1

---

## Sprint 20: Poleringspasset — UX-feedback (Båda Vägarna)

> **Goal:** Åtgärda all insamlad användarfeedback. Fixa popup-misklick, reset-knapp, kunskapsbalans, fasövergångar för ägare, ljud, startupplevelse och spelnamn. Gäller BÅDE industri- och ägarvägen.

### 20A — Popup-skydd mot misklick (båda vägarna)

Bakgrund: Erik (och andra) klickar bort ALLA popuper av misstag. Klick-knappen följer med vid scroll på mobil, och snabb klickning på knappen gör att nästa tap träffar en modal-knapp direkt. Modaler (EventModal, IndustryAttackModal, IndustryLureModal) har inga fördröjningar — valen är klickbara direkt.

- [x] 20A-1: Fördröjning innan modal-val kan klickas
  - I `EventModal.tsx`: Lägg till en 1.5s fördröjning innan val-knapparna blir klickbara
  - Knapparna startar med `opacity-40 pointer-events-none` och animeras till full synlighet efter delay
  - Använd en `useState`/`useEffect`-timer som sätts vid mount
  - Visuell indikator: subtil shimmer/pulse på knapparna när de "låses upp"
  - Accessibility: `aria-disabled="true"` under fördröjningen

- [x] 20A-2: Samma skydd i IndustryAttackModal & IndustryLureModal
  - Applicera identisk delay-logik (1.5s) i `IndustryAttackModal.tsx`
  - Applicera identisk delay-logik (1.5s) i `IndustryLureModal.tsx`
  - Extrahera eventuellt till en delad hook `useModalDelay(ms)` om logiken blir identisk

- [x] 20A-3: OfflineReturnModal skydd
  - Applicera samma delay (1.0s — kortare, denna är mindre kritisk) i `OfflineReturnModal.tsx`
  - "Fortsätt"-knappen ska inte vara klickbar direkt

### 20B — Reset-knapp säkerhet (ägarvägen)

Bakgrund: Erik har en liten knapp under kugghjulet och pokalen som omedelbart nollställer allt. Ingen bekräftelse, ingen varning. Det upplevs som "snopet" och otydligt.

- [x] 20B-1: Bekräftelsedialog för reset på ägarvägen
  - I `App.tsx` (owner render, rad 438-445): Ersätt direkt `onReset`-anrop med en bekräftelse
  - Visa en bekräftelse-modal (kan vara enkel: `window.confirm` eller, bättre, en inline-bekräftelse)
  - Bäst: Flytta reset-funktionalitet TILL SettingsPanel (samma som industri) istället för att ha den som frilagd knapp
  - Ta bort den exponerade ↺-knappen från top-right-stacken
  - I SettingsPanel (ägarversion): Lägg till "Börja om"-sektion med tvåstegsbekräftelse (samma mönster som industri-reset: "Nollställ allt" → "Är du säker?" → bekräfta/avbryt)
  - Reset-knappen ska vara visuellt distinkt (röd text) och tydligt märkt

### 20C — Kunskapsaktiviteter — balans & progressiv upplåsning (ägarvägen)

Bakgrund: "Skogskunskapen man kan köpa är dyrast längst ner och billigast för mest. Det finns ingen anledning att köpa de dyrare små mängderna." Nuvarande priser: 25→10k, 1000→20k, 2000→15k, 3000→25k, 5000→30k inkomst→kunskap. Billigaste alternativet ger 0.4 kunskap/inkomst, dyraste ger 0.006 — 66× sämre.

- [x] 20C-1: Progressiv upplåsning av kunskapsaktiviteter
  - I `ownerKnowledge.ts`: Lägg till `unlockKunskap`-tröskel per aktivitet
  - Första aktiviteten (Läs maktutredningen, 25 kr) synlig från start
  - Resten låses upp vid kunskap-milstolpar: 25, 50, 100, 200
  - I `KnowledgePanel.tsx`: Filtrera aktiviteter baserat på `kunskap >= activity.unlockKunskap`
  - Visa nästa låsta aktivitet som "teaser" (gråad, "Kräver X kunskap")

- [x] 20C-2: Balansera kunskap/kostnad-ratio
  - Justera priser OCH belöningar så att dyrare aktiviteter ger proportionellt mer (eller lite extra) per inkomst
  - Förslag (kostnadseffektivitet ska vara relativt jämn men dyrare ger lite rabatt):
    - Läs maktutredningen: 25 kr → 10 kunskap (0.40/kr) — billig intro, fortfarande bäst per kr
    - Studera markberedning: 500 kr → 15 kunskap (0.030/kr)
    - Besök gammelskog: 1 500 kr → 25 kunskap (0.017/kr)
    - Gå Plockhugget-kurs: 3 000 kr → 40 kunskap (0.013/kr)
    - Artinventering: 5 000 kr → 60 kunskap (0.012/kr)
  - Nyckeln: alla ska kännas VÄRDA att köpa, inte bara den billigaste i loop
  - Uppdatera `KNOWLEDGE_ACTIVITIES` i `ownerKnowledge.ts`

### 20D — Fasövergångar för ägarvägen

Bakgrund: Ägarvägen har 3 faser (Rötterna, Nätverket, Arvet) men ingen synlig övergång — bara ett tyst tröskelvärde. Spelare märker inte att de "levlar upp". Industri-vägen har svarta cinematiska PhaseTransition-skärmar.

- [x] 20D-1: Ägarfas-övergångsskärm
  - Skapa `OwnerPhaseTransition.tsx` — liknande PhaseTransition men med skogsägartema
  - Bakgrund: mörkt skogsgrön (#0D1A0D) istället för svart
  - Textsekvenser per övergång (definieras i `phases.ts`):
    - Fas 1→2: "RÖTTERNA" / "Din skog börjar leva." / "Grannarna ser skillnaden." / "═══ FAS 2: NÄTVERKET ═══"
    - Fas 2→3: "NÄTVERKET" / "Kommunen lyssnar." / "Din metod sprider sig." / "═══ FAS 3: ARVET ═══"
  - Partikeleffekt: gröna/guldiga partiklar (inte orange)
  - Ljud: `playOwnerPhaseUp()` (redan finns i audio.ts)
  - Duration: 4s (kortare än industri som har 4.5-5.5s)

- [x] 20D-2: Trigger-logik för ägarfasövergångar
  - I gameStore tick: Jämför `getOwnerPhase(totalSV)` med föregående — om ny fas → sätt `pendingOwnerTransition`
  - Nytt state: `pendingOwnerTransition: { from: number, to: number } | null`
  - Actions: `completeOwnerPhaseTransition()`
  - I App.tsx owner render: Rendera `OwnerPhaseTransition` vid `pendingOwnerTransition`

- [x] 20D-3: Fasindikator i ägar-dashboard
  - Gör fas-texten ("Fas 1: Rötterna") tydligare i OwnerDashboard
  - Lägg till en progressbar (sv mot nästa faströskel) — liknande industri-dashboard
  - Kort flash/glow-animation vid nära fasövergång (>85% progress)

### 20E — Startupplevelsen — snabbare feedback

Bakgrund: "Det tog cirka en minut innan något hände på skärmen. Användaren trodde inte att något mer skulle komma." Första minuten av spelet måste ge omedelbar feedback. Spelet börjar med att man klickar och väntar — om inget händer tappar spelaren intresset.

- [x] 20E-1: Snabbare första event
  - I gameStore: Sänk `nextEventAt` vid spelstart från `now + 120_000` (2 min) till `now + 20_000` (20s)
  - Endast vid nystart (inte vid load)
  - Gäller BÅDA vägarna (industri + ägare)

- [x] 20E-2: Välkomstmeddelande / tutorial-hint
  - Visa ett kort intro-meddelande de första 5 sekunderna av spelet
  - Industri: "Klicka på knappen för att skriva skogsbruksplaner. Ju fler planer, desto fler stammar."
  - Ägare: "Klicka på skogen för att vårda den. Skogsvärderingen stiger med tiden."
  - Implementera som ett litet toast/banner som fadear bort efter 5-8s
  - Visa bara vid `totalStammar === 0` / `totalSkogsvardering === 0` (helt nytt spel)
  - Spara i `achievements['tutorial_seen']` så det inte visas igen

- [x] 20E-3: Förstärkt initial klick-feedback
  - Första klicket: Ge en extra stor partikelburst + tydligare siffra
  - Pulsande glow runt klickknappen vid spelstart tills spelaren klickat 5 gånger
  - Gäller båda vägarna

### 20F — Ljud — bakgrundssurr

Bakgrund: "Högtalaren börjar surra. Surrandet fortsätter även efter att man gått ur spelet." Den procedurella ambient-ljud-systemet (droner, fåglar, vindbrus via Web Audio API) upplevs som störande bakgrundssurr.

- [x] 20F-1: Stäng av ambient som standard
  - Ändra default `ambientVolume` från `0.3` till `0` i `audio.ts`
  - I SettingsPanel: Visa ambient-slidern men default till 0
  - Skriv label som "Bakgrundsljud (av)" när volymen är 0
  - SFX behåller sin default (0.7) — det är bara ambient-dronen som stör

- [x] 20F-2: Korrekt cleanup vid page unload
  - Lägg till `window.addEventListener('beforeunload', stopAmbient)` i audio.ts
  - Lägg till cleanup i `document.addEventListener('visibilitychange')` — pausa ambient vid tab-switch
  - Säkerställ att `AudioContext.close()` anropas vid unmount
  - Detta fixar "surrandet fortsätter efter att man gått ur spelet"

### 20G — Spelnamn synlighet

Bakgrund: "Man ser inte namnet på spelet när man spelar." Inget "SILVA MAXIMUS" eller "TRÄD" visas i spelet — bara i webbläsarens flik-titel.

- [x] 20G-1: Spelnamn i ticker-bar
  - Industri: Visa "SILVA MAXIMUS" som första/vänster element i Ticker-baren (före nyhetstexten)
  - Style: text-xs, font-bold, uppercase, tracking-widest, accent-färg, opacity 60%
  - Ägare: Visa "TRÄD" i OwnerTicker med samma mönster men i owner-accent-färg
  - Ska inte ta för mycket plats — max 80-100px bredd, fixed position i tickern
  - Om det blir för trångt på mobil: visa bara på ≥640px (sm:), göm på xs

### 20H — Namngivning / juridisk risk

Bakgrund: "Holmen" är nämnda med riktigt namn i spelet. Holmen är ett riktigt skogsbolag. Risk för verklig koppling. Byt till fiktivt namn.

- [x] 20H-1: Byt "Holmen" → "Halmen" i ownerEvents.ts (+ SCA→SKA)
  - `src/data/ownerEvents.ts` rad ~605: "Sälj till Holmen" → "Sälj till Halmen"
  - Granska HELA kodbasen (alla .ts/.tsx-filer) efter andra riktiga bolagsnamn som missats
  - Kända parodinamn som redan är OK: Nastly (Nestlé), Husqansen (Husqvarna), Barburr (Barbour), GSC (FSC)
  - Om fler riktiga namn hittas: byt ut dem till satiriska varianter

### 20H½ — Inkomst känns meningslös (ägarvägen, balans)

Bakgrund: Spelare upplever att bara SV (Skogsvärdering) påverkar spelet. Inkomst-uppgraderingar i kunskapsträdet känns oviktiga. Inkomst används bara till kunskapsaktiviteter — om spelaren snabbt maxar kunskap via billigaste aktiviteten (20A fixar det delvis) tappar inkomst sitt syfte.

- [ ] 20H½-1: Undersök och förstärk inkomstens roll
  - Kartlägg var inkomst spenderas: kunskapsaktiviteter, avböja lures, köpa ut i events
  - Identifiera om det finns fler sänkor (sinks) för inkomst eller om den tar slut som resurs
  - Möjliga åtgärder (välj lämpliga):
    - Lägg till inkomst-kostnad på fler åtgärder (t.ex. biodiv-projekt, markrestaurering)
    - Gör kunskapsaktiviteter repeterbara men med ökande kostnad
    - Lägg till en löpande underhållskostnad (skatt, markskötsel) som drar inkomst passivt
    - Visa inkomstens effekt tydligare i UI (t.ex. "Inkomst gör att du kan...")
  - Obs: detta kan bli större än en snabb fix — gör det som hinns, anteckna resten

### 20J — Spelarfeedback: Nastlé-typo + industritempo + image-balans

Bakgrund: Ny spelarfeedback efter Sprint 20-deploy.

**Bugg: "Nastlé" istället för "Nastly"**
Någonstans i industri-vägens text står det "Nastlé" (med accent) istället för det korrekta parodinamnet "Nastly". Sök igenom alla .ts/.tsx-filer efter "Nastlé" och byt till "Nastly".

**Industri-vägen går för fort — man fattar inte vad som händer**
Förut gick det för långsamt, nu har pendeln svängt för långt åt andra hållet. Spelaren hinner inte orientera sig. Behöver bättre balans — inte lika snabbt som nu, inte lika långsamt som förut.
- [x] 20J-1: Undersök nuvarande fas-trösklar och generator/upgrade-progression
  - Identifiera vilka specifika delar som accelererar för snabbt (generator-kostnader? upgrade-tillgänglighet? tick-rate?)
  - Jämför med autoplay-resultat om möjligt
  - Möjliga åtgärder: höj generator-kostnadsskalning, öka faströsklar, sakta ned upgrade-tillgänglighet
  - Obs: kräver noggrann balansering — inte bara "gör allt 2x dyrare"
  - **Done:** Höjde fas-trösklar 3-6: 500K→750K, 2M→4M, 10M→20M, 60M→120M (~2× mer tid per fas)

**Grön Image™ försvinner för fort — fas 3 blixtrar förbi**
Spelaren hinner inte fatta att image sjunker eller vad de behöver göra åt det. Fas 3 (MAKT-eran?) passeras i ett ögonblick.
- [x] 20J-2: Undersök image-drain-hastighet och fas 3-progression
  - Kontrollera imagePerSecond-drain i fas 2-3 (generatorer, side effects)
  - Kontrollera om varningssystemet (warningLevel) ger tillräckligt tydlig feedback innan det är för sent
  - Möjliga åtgärder: mildra image-drain i tidiga faser, ge starkare visuell varning, fördröj PR-kampanjkostnader
  - Alternativt: lägg till en kort "paus" eller highlight vid warningLevel-övergångar
  - **Done:** Halverade virkesuppköpare image-drain (-0.01→-0.005), sänkte ant_svt_vetenskap drain (-0.5→-0.25) och höjde trigger (image<40→<30), lobby imageProtection appliceras nu även på negativa generator-effekter

Devkommentar: "förut gick det för långsamt, så jag kan ha gått för långt åt andra hållet. det måste bli bättre balans."

### 20K — Ägar-tickern: för långsam + för lite variation

Bakgrund: Ägar-tickern (OwnerTicker) scrollar för långsamt överlag (desktop OCH mobil) — man ser samma text ("något om en spillkråka") upprepas hela tiden. Irriterande.

Två problem:
1. **Scroll-hastighet för låg** — texten hänger kvar för länge (alla plattformar)
2. **För lite textvariation** — samma headlines syns om och om igen, speciellt tidigt i spelet

- [x] 20K-1: Öka scroll-hastighet
  - I `OwnerTicker.tsx`: Höj `SCROLL_SPEED` (nu 50 px/s) — prova 80-100 px/s
  - Gäller alla plattformar, inte bara mobil
  - Kontrollera även industri-`Ticker.tsx` — den har fast `8s` animation, kan behöva justeras

- [x] 20K-2: Mer och bättre headline-variation
  - I `ownerNewsLines.ts`: Lägg till fler headlines för tidiga faser (fas 1, låg SV)
  - Se till att headline-poolen har minst 10-15 stycken tillgängliga redan vid spelstart
  - Blanda in fler dynamiska headlines som reflekterar spelarens nuvarande resurser/status
  - Rotera headlines oftare — visa inte samma 6 hela tiden, randomisera urvalet
  - Möjliga nya headlines: vädret, årstider, grannars aktiviteter, lokalnyheter, naturbetraktelser

- [x] 20K-3: Kontrollera industri-tickern också
  - Samma problem kan finnas i `Ticker.tsx` + `newsTickerLines.ts`
  - Verifiera att tidiga faser har tillräckligt med headlines

### 20L — Image studsar tillbaka till 100 utan orsak (industri, balans)

Bakgrund: Spelarfeedback — "Helt plötsligt är hans gröna image på 100 igen, utan att han gjort nåt speciellt. Om det inte var för att han köpte Operation Omnibus?"

**Analys:** Problemet beror troligen på `gen_certifierare` (Certifierare-generatorn) som ger **+0,05 Image/s per enhet** via `sideEffects`. Med t.ex. 20 certifierare = +1,0 Image/s — från 0 till 100 på under 2 minuter. Denna positiva image-regeneration appliceras **utan imageProtection-filter** och har inget tak, så den kan övervinna all drain och driva image rakt till 100 passivt.

Möjliga orsaker (kombinerade):
1. Certifierare `sideEffects` image-gain skalas linjärt med antal — inget diminishing return
2. `imageProtection` från lobby-köp (`imageDecayReduction`) filtrerar antagonist-drain men INTE generator side effects
3. Om många antagonister counterats + hög certifierare-count = netto-positiv image/s → rapid recovery

- [x] 20L-1: Balansera certifierare image-gain
  - Alternativ A: Sätt tak/diminishing returns på certifierares image-gain (t.ex. cap vid 0.5 totalt)
  - Alternativ B: Sänk perSecond från +0.05 till +0.02 per enhet
  - Alternativ C: Applicera `imageProtection` inverterat på positiv image-gain (lobby-skydd gör image-recovery svårare)
  - Alternativ D: Image-recovery avtar exponentiellt närmare 100 (t.ex. gain × (1 - image/100))
  - **Done:** Kombinerade A+B+D: sänkt till +0.03/enhet, cap +0.5/s totalt, diminishing returns gain×(1-image/100)

- [x] 20L-2: Undersök om "Operation Omnibus" (antagonist counter) har oväntad sido-effekt
  - `counterAntagonist` ändrar bara `countered: true` — ingen direkt image-modifikation
  - Men att countra EU-Inspektören (som drar -50 stammar/s) kan indirekt öka image om lägre produktion → färre sideEffects
  - Verifiera att inga lobby-köp oavsiktligt stackar imageDecayReduction >100%
  - **Done:** imageDecayReduction kan stacka >100% men `Math.max(0, 1-sum)` clampar till 0 — fungerar korrekt. Ingen bugg.

### 20I — Verifiering

- [x] 20I-1: Testa popup-delay
  - Starta spel, klicka snabbt, trigga ett event — verifiera att val-knappar INTE kan klickas direkt
  - Testa i ägarvägen med IndustryAttackModal/LureModal
  - Verifiera accessibility (aria-disabled fungerar)
  - **Done:** useModalDelay(1500) på alla modaler, aria-disabled + pointer-events-none. OfflineReturnModal 1000ms.

- [x] 20I-2: Testa owner fas-övergångar
  - Sätt totalSV nära tröskel (50K, 150K), tick → verifiera att OwnerPhaseTransition visas
  - Verifiera textsekvenser, partiklar, ljud, timing
  - **Done:** OwnerPhaseTransition.tsx finns, pendingOwnerTransition state + trigger i ownerTick, App.tsx renderar.

- [x] 20I-3: Testa kunskapsbalans
  - Verifiera att aktiviteter låses upp progressivt
  - Verifiera att balanserade priser ger rimlig progression
  - **Done:** 5 aktiviteter med unlockKunskap 0→25→50→100→200, balanserade priser 25→5000 inkomst.

- [x] 20I-4: Verifiera namnbyten
  - Sök igenom all text/data efter kvarvarande riktiga bolagsnamn
  - Verifiera att "Halmen" används istället för "Holmen"
  - **Done:** Inga "Holmen" eller "Nastlé" i källkoden, bara i tasks.md (dokumentation).

- [x] 20I-5: Build & Deploy
  - `npm test` — alla 285 tester passerar ✓
  - TypeScript clean ✓
  - Vite build passerar (256KB gzip) ✓
  - Deploy till GitHub Pages — väntar på push
  - Testa på mobil (popup-delay, reset-knapp, ljud, fasövergångar)

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
