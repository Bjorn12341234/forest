// ── Silva Maximus — Owner (Skogsägare) News Ticker Headlines ──
// Shown when gameMode === 'owner'. Triggered by totalSkogsvardering milestones.

export interface OwnerTickerHeadline {
  id: string
  text: string
  triggerSV?: number  // totalSkogsvardering threshold (optional, shown from start if omitted)
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
]

/** Get owner headlines available based on totalSkogsvardering */
export function getAvailableOwnerHeadlines(totalSV: number): OwnerTickerHeadline[] {
  return OWNER_TICKER_HEADLINES.filter(h => {
    if (h.triggerSV && totalSV < h.triggerSV) return false
    return true
  })
}
