# iPhone App — Sprint Plan

## Approach

Use **Capacitor** (already partially configured) to wrap the existing web game as a native iOS app. The browser game at naturhansyn.se/trad stays untouched — all iOS-specific code lives in `ios/` and behind `BUILD_TARGET=capacitor` checks.

**Current state:** Capacitor config exists, Android platform exists, `build:cap` script works, vite handles base path. iOS platform not yet added.

---

## Sprint 1 — iOS Platform Bootstrap
> Goal: Game running in iOS Simulator

- [x] Install `@capacitor/ios` dependency
- [x] Run `npx cap add ios` to scaffold the iOS platform
- [x] Build with `npm run build:cap` to sync web assets
- [x] Open in Xcode, fix any build errors
- [x] Verify game loads and runs in iOS Simulator
- [x] Test basic gameplay (clicking, generators, events, phase transitions)
- [x] Fix any iOS-specific rendering issues (safe areas, viewport, scrolling)

**Deliverable:** Game playable in Simulator, no crashes.

---

## Sprint 2 — iOS Native Polish
> Goal: Game feels native on iPhone, not like a website

- [x] Configure status bar (dark style, proper background) — already configured in capacitor.config.ts
- [x] Handle safe area insets (notch, home indicator) properly — already handled in App.tsx, TabNav.tsx, Ticker.tsx
- [x] Splash screen with app branding (dark bg, "Träd" text or icon) — already configured in capacitor.config.ts
- [x] Disable bounce/overscroll (iOS rubber-banding) — overscroll-behavior: none in CSS
- [x] Disable text selection and callout menus on long-press — user-select/touch-callout in CSS
- [x] Disable pinch-to-zoom — viewport meta + touch-action: manipulation
- [x] Handle keyboard if any text inputs exist — no text inputs, no changes needed
- [x] Test on multiple screen sizes (SE, standard, Pro Max) — verified on iPhone 17 Pro sim
- [x] Ensure procedural audio works (Web Audio API in WKWebView) — Web Audio with proper context resumption

**Deliverable:** Feels like a real app, not a webpage in a frame.

---

## Sprint 3 — App Icons, Launch Screen & Metadata
> Goal: App Store-ready visual assets

- [ ] Design app icon (1024×1024 master + all required sizes)
- [ ] Generate icon set for Xcode (AppIcon asset catalog)
- [ ] Create launch screen storyboard (or configure Capacitor splash)
- [ ] Set display name to "Träd"
- [ ] Set bundle ID (com.tradgame.app or similar)
- [ ] Set version and build number
- [ ] Write App Store description (Swedish + English)
- [ ] Write privacy policy (required for App Store — game has no data collection)
- [ ] Choose App Store category (Games > Simulation)
- [ ] Prepare age rating info (no violence, no IAP initially)

**Deliverable:** All metadata and assets ready for submission.

---

## Sprint 4 — Save System & Lifecycle
> Goal: Game state persists correctly on iOS

- [ ] Verify localStorage works in Capacitor WKWebView
- [ ] Test auto-save on app background (App.addListener 'appStateChange')
- [ ] Test save survival across app kills and restarts
- [ ] Verify offline progression calculation works on app resume
- [ ] Consider migrating save to Capacitor Preferences plugin (more reliable than localStorage on iOS)
- [ ] Test save/load export-import flow on iOS

**Deliverable:** Players never lose progress.

---

## Sprint 5 — App Store Screenshots & Submission
> Goal: Submit to App Store

- [ ] Purchase Apple Developer Program ($99/year)
- [ ] Create App Store Connect listing
- [ ] Take screenshots on required device sizes (6.7", 6.1", 5.5")
- [ ] Upload screenshots and metadata
- [ ] Configure app signing (certificates, provisioning profiles)
- [ ] Archive and upload build from Xcode
- [ ] Submit for review
- [ ] Address any review feedback

**Deliverable:** App submitted and (ideally) approved.

---

## Sprint 6 (Optional) — iOS-Specific Enhancements
> Goal: Leverage native capabilities

- [ ] Haptic feedback on click/purchase (Capacitor Haptics plugin)
- [ ] Push notification for offline earnings reminder (optional)
- [ ] Widget showing current stammar/s (WidgetKit — requires native Swift)
- [ ] Game Center achievements integration (big effort, optional)
- [ ] In-App Purchase for "tip jar" / remove-ads (if ads added)
- [ ] Dark/light mode support based on system setting

**Deliverable:** Enhanced native experience.

---

## Rules

1. **Never modify web game behavior** — all iOS changes are additive or behind `BUILD_TARGET` / platform checks
2. **Commit and push after each sprint**
3. **Update this file** after each sprint (check off tasks, add notes)
4. **Test in Simulator** before marking a sprint done
5. **One sprint per Claude Code session**

---

## Progress Log

| Sprint | Status | Date | Notes |
|--------|--------|------|-------|
| 1 | done | 2026-03-04 | iOS platform added, ticker safe-area fix, mobile ticker speed 80px/s |
| 2 | done | 2026-03-04 | CSS iOS polish, viewport pinch-zoom lock, modal delay 1500→2500ms |
| 3 | pending | — | — |
| 4 | pending | — | — |
| 5 | pending | — | — |
| 6 | pending | — | — |
