// ── Silva Maximus — Owner (Skogsägare) News Ticker Headlines ──
// Shown when gameMode === 'owner'. Triggered by totalSkogsvardering milestones.
// Sprint 12: expanded from 25→50 headlines + 10 dynamic conditional headlines.

import type { GameState } from '../store/types'

export interface OwnerTickerHeadline {
  id: string
  text: string
  triggerSV?: number  // totalSkogsvardering threshold (optional, shown from start if omitted)
  /** Dynamic headline: condition function on game state (if set, triggerSV is ignored) */
  condition?: (state: GameState) => boolean
}

export const OWNER_TICKER_HEADLINES: OwnerTickerHeadline[] = [
  // ── Early game ──
  {
    id: 'otick_morgonpromenad',
    text: 'Morgonpromenad i skogen. En spillkråka trummar. Grannen hör bara motorsågar.',
  },
  {
    id: 'otick_gransen',
    text: 'Gränsen mellan din skog och industriplantaget syns på satellitbilder.',
  },
  {
    id: 'otick_inspektoren_ringer',
    text: 'Inspektören ringer igen. "Bara ett snabbt besök." Du säger nej. Igen.',
  },
  {
    id: 'otick_arsringar',
    text: 'Du räknar årsringar på en stormfälld tall. 247 st. Industrin hade sett 3 kubikmeter.',
    triggerSV: 2_000,
  },
  {
    id: 'otick_contorta',
    text: 'Grannens contortaplantage blåser ner i stormen. Dina tallar står kvar.',
    triggerSV: 5_000,
  },
  {
    id: 'otick_lavskrikan',
    text: 'Lavskrikan häckar igen. För tredje året i rad. Hon gillar gamla träd. Vem hade trott.',
    triggerSV: 8_000,
  },
  // ── Mid game ──
  {
    id: 'otick_slu_rapport',
    text: 'SLU-rapport: "Plockhuggning ger jämförbar avkastning." Industrin: "Metodologiska brister."',
    triggerSV: 15_000,
  },
  {
    id: 'otick_barkborre',
    text: 'Granbarkborren tar tre granar. Tallarna, björkarna, asparna: orörda. Mångfald fungerar.',
    triggerSV: 20_000,
  },
  {
    id: 'otick_snickaren',
    text: 'Möbelsnickaren i Hälsingland betalar 3x massapriset. För att trädet får LEVA innan det används.',
    triggerSV: 25_000,
  },
  {
    id: 'otick_biologen',
    text: 'Biologen hittar 14 rödlistade arter på din mark. Grannen har 0. "Men han har ju produktionsskog."',
    triggerSV: 30_000,
  },
  {
    id: 'otick_gsc_erbjudande',
    text: 'GSC-certifieringen kräver "skötselplan" skriven av industrin. Du tackar nej.',
    triggerSV: 10_000,
  },
  {
    id: 'otick_turister',
    text: 'Japanska turister betalar 2 000 kr per person för att GÅ i din skog. Industrin betalar 200 kr/m³ för att FÄLLA den.',
    triggerSV: 35_000,
  },
  {
    id: 'otick_grannens_anger',
    text: 'Grannen kalavverkade för 10 år sen. Nu tittar han på sina stubbar. "Det blev inte som inspektören lovade."',
    triggerSV: 40_000,
  },
  // ── Late game ──
  {
    id: 'otick_priskollapsen',
    text: 'Massapriserna kollapsar. Dina grannar ringer i panik. Du säljer inte massa. Du dricker kaffe.',
    triggerSV: 50_000,
  },
  {
    id: 'otick_kollagret',
    text: 'Din skog lagrar 4x mer kol än grannens plantage. Ingen räknade med stående träd.',
    triggerSV: 60_000,
  },
  {
    id: 'otick_svt',
    text: 'SVT filmar din skog som kontrast. Reportern: "Varför ser det ut SÅ HÄR hos dig?" Du pekar på tallarna.',
    triggerSV: 80_000,
  },
  {
    id: 'otick_nastly',
    text: 'Nastly International väljer DIG framför den svenska skogsindustrin. Nastly. Tänk på det.',
    triggerSV: 100_000,
  },
  {
    id: 'otick_200_skogsagare',
    text: '200 skogsägare har gått över till plockhuggning. Industrin kallar det "en trend". Det är en rörelse.',
    triggerSV: 120_000,
  },
  {
    id: 'otick_forskningen',
    text: 'Forskarna publicerar: likvärdig avkastning, 400% högre biodiversitet. Industrin: tyst.',
    triggerSV: 150_000,
  },
  {
    id: 'otick_barnbarnet',
    text: 'Ditt barnbarn pekar på lavskrikan. "Farfar, den bor ju HÄR!" Ja. Det gör den.',
    triggerSV: 75_000,
  },
  {
    id: 'otick_lag_andring',
    text: 'Industrin vill ändra lagen: "tvingande avverkningskrav". 200 skogsägare svarade på remissen.',
    triggerSV: 175_000,
  },
  {
    id: 'otick_deadwood',
    text: 'Död ved = liv. 2 000 arter lever av död ved i svensk skog. Industrin städar bort den.',
    triggerSV: 45_000,
  },
  {
    id: 'otick_humle',
    text: 'Humlen på marken är 30 cm tjock. Den höll emot branden. Industrins marker brändes till botten.',
    triggerSV: 55_000,
  },
  {
    id: 'otick_talltickan',
    text: 'Talltickan är tillbaka. Den kräver 200-åriga tallar. Du har dem. Grannen har plantage.',
    triggerSV: 90_000,
  },
  {
    id: 'otick_naturen_vinner',
    text: 'Naturen har inget pressmeddelande. Ingen lobbying. Inga konsulter. Den har bara rätt.',
    triggerSV: 200_000,
  },
  // ── Generationstemat ──
  {
    id: 'otick_farfars_tall',
    text: 'Farfars tall står kvar. 100 år. Industrin hade tagit den på en förmiddag.',
    triggerSV: 3_000,
  },
  {
    id: 'otick_anteckningsboken',
    text: 'Du skriver i anteckningsboken. Farfar skrev i sin. Farfars far före det. Samma skog. Samma omsorg.',
    triggerSV: 12_000,
  },
  {
    id: 'otick_forsta_steget',
    text: 'Ditt barn tar sina första steg i skogen. Samma stig som du gick. Och din far. Och hans far.',
    triggerSV: 18_000,
  },
  {
    id: 'otick_generationer',
    text: 'Fyra generationer. Samma metod. Plockhuggning. Industrin kallar det "omodernt". Skogen kallar det "överlevnad".',
    triggerSV: 130_000,
  },
  {
    id: 'otick_barnbarnen',
    text: 'Barnbarnen leker vid bäcken. Samma bäck som du lekte vid. Den rinner fortfarande. Grannens bäck torrlade för 20 år sen.',
    triggerSV: 160_000,
  },
  // ── Sprint 12: Late-game headlines (sv=80K+) ──
  {
    id: 'otick_stormtrad',
    text: 'Stormen tog 30% av industriskogarna. Din blandskog stod kvar. Resiliens är inte en teori. Det är rötter.',
    triggerSV: 85_000,
  },
  {
    id: 'otick_slu_inbjudan',
    text: 'SLU bjuder in dig som föreläsare. "Alternativ skogsförvaltning." Du säger: det heter skogsbruk.',
    triggerSV: 95_000,
  },
  {
    id: 'otick_insekter',
    text: 'Entomologen räknar 142 insektsarter i din skog. Grannens plantage: 11. "Men han har ju contorta."',
    triggerSV: 105_000,
  },
  {
    id: 'otick_eldsjalen',
    text: 'Tre nya skogsägare ringer varje vecka. De vill byta metod. Rörelsen växer utan marknadsföring.',
    triggerSV: 110_000,
  },
  {
    id: 'otick_eu_studie',
    text: 'EU-studien jämför nordiska skogsmodeller. Sverige: mest avverkning, lägst biodiversitet. Din skog: undantaget.',
    triggerSV: 115_000,
  },
  {
    id: 'otick_kolbudget',
    text: 'Din skog lagrar mer kol per hektar än hela kommunens industriskog. Klimatavdelningen ringer. Kommunen vill samarbeta.',
    triggerSV: 125_000,
  },
  {
    id: 'otick_domanverkets_skugga',
    text: 'Domänverkets arkiv visar: din skog avverkades "rationellt" 1958. Din farfar planterade om den på sitt vis. 65 år senare har du en skog.',
    triggerSV: 135_000,
  },
  {
    id: 'otick_doktorand',
    text: 'En doktorand skriver avhandling om din skog. "Naturanpassat bruk som ekonomisk modell." Handledaren från SLU är skeptisk. Datan är inte det.',
    triggerSV: 140_000,
  },
  {
    id: 'otick_exportmodell',
    text: 'Norge, Finland och Estland studerar din metod. "Den svenska modellen" betyder plötsligt något annat.',
    triggerSV: 155_000,
  },
  {
    id: 'otick_svamp_rekord',
    text: 'Mykolog hittar 47 svamparter på en enda stubbe i din skog. Nytt landskapsrekord. "I produktionsskog hittar vi kanske 5."',
    triggerSV: 165_000,
  },
  {
    id: 'otick_industrin_tyst',
    text: 'Industrin har slutat kritisera plockhuggning i media. Inte för att de ändrat sig. För att de förlorar debatten.',
    triggerSV: 170_000,
  },
  {
    id: 'otick_arvsplanering',
    text: 'Du skriver skogstestamentet. Inte juridiskt. Emotionellt. Vilka träd ska stå kvar. Vilka stigar ska hållas öppna.',
    triggerSV: 180_000,
  },
  {
    id: 'otick_klimatforandring',
    text: 'Klimatförändringen tvingar industrin att ompröva contortaplantagen. Din blandskog klarar sig. Den har alltid klarat sig.',
    triggerSV: 185_000,
  },
  {
    id: 'otick_skolklass',
    text: 'Skolklassen besöker din skog varje höst. Barnen lär sig namnen på svamparna. Läraren säger: "Det här borde vara i läroplanen."',
    triggerSV: 190_000,
  },
  {
    id: 'otick_skogsstyrelsen_rapport',
    text: 'Skogsstyrelsens interna rapport läcker. "Nuvarande modell är ohållbar." Rapporten hemligstämplas.',
    triggerSV: 195_000,
  },
  {
    id: 'otick_radion',
    text: 'P1 dokumentär om din skog. Tre miljoner lyssnare. Reportern gråter under intervjun. "Jag visste inte att det kunde se ut så här."',
    triggerSV: 210_000,
  },
  {
    id: 'otick_tusen_skogsagare',
    text: '1 000 skogsägare har bytt metod. Industrin kallar det en kris. Skogen kallar det en chans.',
    triggerSV: 230_000,
  },
  {
    id: 'otick_arvsskogen_lever',
    text: 'Arvsskogen fyller 100 år nästa sommar. Fyra generationers omsorg. Industrin har bytt ägare 12 gånger under samma period.',
    triggerSV: 250_000,
  },
  {
    id: 'otick_slutgiltig',
    text: 'Du behöver inte bevisa något längre. Skogen bevisar det själv. Varje fågel. Varje svamp. Varje årsring.',
    triggerSV: 300_000,
  },
  {
    id: 'otick_lavskrikans_unge',
    text: 'Lavskrikans ungar flyger för första gången. De stannar i din skog. De har ingenstans annat att vara.',
    triggerSV: 220_000,
  },
  {
    id: 'otick_karta',
    text: 'Du ritar en karta över alla myrstackar i din skog. 34 stycken. Grannens plantage: 0. "Men han har ju effektiv produktion."',
    triggerSV: 240_000,
  },
  {
    id: 'otick_ministerbesok',
    text: 'Miljöministern besöker din skog. "Imponerande." Nästa dag röstar hon för industrins förslag i riksdagen.',
    triggerSV: 260_000,
  },
  {
    id: 'otick_brevet_fran_japan',
    text: 'Brev från Japan. Turisten som besökte din skog vill återvända. "I planted a tree in my garden. I named it after your forest."',
    triggerSV: 270_000,
  },
  {
    id: 'otick_framtiden',
    text: 'Ditt barnbarn visar sin kompis skogen. "Min farmor planterade det där trädet." Kompisen: "Min farmors skog är bara stubbar."',
    triggerSV: 280_000,
  },
  // ── Sprint 12: Dynamic conditional headlines ──
  {
    id: 'otick_dyn_biodiv_high',
    text: 'Din skog har fler arter per hektar än grannarnas tillsammans. Biologen slutade räkna vid 200.',
    condition: (s) => s.biodivOwner > 50,
  },
  {
    id: 'otick_dyn_all_attacks_resisted',
    text: 'Industrin har slutat ringa. De vet. Du motstod allt. Varje inspektör. Varje kampanj. Varje hot.',
    condition: (s) => Object.values(s.ownerAttacksResisted).filter(Boolean).length >= 5,
  },
  {
    id: 'otick_dyn_legacy_high',
    text: 'Barnbarnet har börjat rita kartor över skogen. Samma stil som din farfar. Generationernas karta.',
    condition: (s) => s.legacy > 300,
  },
  {
    id: 'otick_dyn_kunskap_high',
    text: 'Du vet mer om din skog än Skogsstyrelsen. Det är inte skryt. Det är sorgligt.',
    condition: (s) => s.kunskap > 500,
  },
  {
    id: 'otick_dyn_resiliens_max',
    text: 'Stormen kom och gick. Dina träd stod kvar. Varenda ett. Grannens contortaplantage: platt.',
    condition: (s) => s.resiliens > 80,
  },
  {
    id: 'otick_dyn_carbon_high',
    text: 'Din koldioxidinlagring är verifierad. Riktig kol. I riktiga träd. Inte industrins kreativa bokföring.',
    condition: (s) => s.realCarbonPos > 500,
  },
  {
    id: 'otick_dyn_deadwood_rich',
    text: 'Död ved överallt. Det ser skräpigt ut, säger grannen. 2 000 arter håller inte med.',
    condition: (s) => s.deadwood > 100,
  },
  {
    id: 'otick_dyn_no_lures',
    text: 'Du tackade nej till alla lockelser. Varje "gratis" erbjudande. Varje "samarbete". De var aldrig gratis.',
    condition: (s) => s.ownerLuresDeclined >= 3 && Object.keys(s.ownerLuresAccepted).length === 0,
  },
  {
    id: 'otick_dyn_kooperativ',
    text: 'Kooperativet levererar direkt till snickeriet. Ingen mellanhand. Ingen industri. Bara trä och hantverkare.',
    condition: (s) => (s.ownerGenerators['ogen_kooperativ']?.count ?? 0) >= 3,
  },
  {
    id: 'otick_dyn_allians',
    text: 'Naturskogsalliansen växer. 47 skogsägare. En sammanhängande korridor av liv genom landskapet.',
    condition: (s) => (s.ownerGenerators['ogen_naturskogsallians']?.count ?? 0) >= 1,
  },
]

// ── Donator-exclusive headlines (shown only for donors) ──
export const DONATOR_OWNER_HEADLINES: OwnerTickerHeadline[] = [
  {
    id: 'donator_owner_1',
    text: 'Föreningen skickade ett tack. Skogen tackar också.',
  },
  {
    id: 'donator_owner_2',
    text: 'Du är inte ensam. Nätverket växer.',
  },
]

/** Get owner headlines available based on totalSkogsvardering and game state */
export function getAvailableOwnerHeadlines(totalSV: number, state?: GameState, donated?: boolean): OwnerTickerHeadline[] {
  const base = OWNER_TICKER_HEADLINES.filter(h => {
    // Dynamic headlines: check condition function
    if (h.condition) return state ? h.condition(state) : false
    // SV-gated headlines
    if (h.triggerSV && totalSV < h.triggerSV) return false
    return true
  })

  // Add one donator headline if applicable
  if (donated && DONATOR_OWNER_HEADLINES.length > 0) {
    const idx = Math.floor(totalSV / 1000) % DONATOR_OWNER_HEADLINES.length
    base.push(DONATOR_OWNER_HEADLINES[idx])
  }

  return base
}
