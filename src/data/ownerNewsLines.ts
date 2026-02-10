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
    text: 'Morgonpromenad i skogen. En spillkr\u00e5ka trummar. Grannen h\u00f6r bara motorsågar.',
  },
  {
    id: 'otick_gransen',
    text: 'Gr\u00e4nsen mellan din skog och industriplantaget syns p\u00e5 satellitbilder.',
  },
  {
    id: 'otick_inspektoren_ringer',
    text: 'Inspekt\u00f6ren ringer igen. "Bara ett snabbt bes\u00f6k." Du s\u00e4ger nej. Igen.',
  },
  {
    id: 'otick_arsringar',
    text: 'Du r\u00e4knar \u00e5rsringar p\u00e5 en stormf\u00e4lld tall. 247 st. Industrin hade sett 3 kubikmeter.',
    triggerSV: 2_000,
  },
  {
    id: 'otick_contorta',
    text: 'Grannens contortaplantage bl\u00e5ser ner i stormen. Dina tallar st\u00e5r kvar.',
    triggerSV: 5_000,
  },
  {
    id: 'otick_lavskrikan',
    text: 'Lavskrikan h\u00e4ckar igen. F\u00f6r tredje \u00e5ret i rad. Hon gillar gamla tr\u00e4d. Vem hade trott.',
    triggerSV: 8_000,
  },
  // ── Mid game ──
  {
    id: 'otick_slu_rapport',
    text: 'SLU-rapport: "Plockhuggning ger j\u00e4mf\u00f6rbar avkastning." Industrin: "Metodologiska brister."',
    triggerSV: 15_000,
  },
  {
    id: 'otick_barkborre',
    text: 'Granbarkborren tar tre granar. Tallarna, bj\u00f6rkarna, asparna: orörda. M\u00e5ngfald fungerar.',
    triggerSV: 20_000,
  },
  {
    id: 'otick_snickaren',
    text: 'M\u00f6belsnickaren i H\u00e4lsingland betalar 3x massapriset. F\u00f6r att tr\u00e4det f\u00e5r LEVA innan det anv\u00e4nds.',
    triggerSV: 25_000,
  },
  {
    id: 'otick_biologen',
    text: 'Biologen hittar 14 r\u00f6dlistade arter p\u00e5 din mark. Grannen har 0. "Men han har ju produktionsskog."',
    triggerSV: 30_000,
  },
  {
    id: 'otick_gsc_erbjudande',
    text: 'GSC-certifieringen kr\u00e4ver "sk\u00f6tselplan" skriven av industrin. Du tackar nej.',
    triggerSV: 10_000,
  },
  {
    id: 'otick_turister',
    text: 'Japanska turister betalar 2 000 kr per person f\u00f6r att G\u00c5 i din skog. Industrin betalar 200 kr/m\u00b3 f\u00f6r att F\u00c4LLA den.',
    triggerSV: 35_000,
  },
  {
    id: 'otick_grannens_anger',
    text: 'Grannen kalavverkade f\u00f6r 10 \u00e5r sen. Nu tittar han p\u00e5 sina stubbar. "Det blev inte som inspekt\u00f6ren lovade."',
    triggerSV: 40_000,
  },
  // ── Late game ──
  {
    id: 'otick_priskollapsen',
    text: 'Massapriserna kollapsar. Dina grannar ringer i panik. Du s\u00e4ljer inte massa. Du dricker kaffe.',
    triggerSV: 50_000,
  },
  {
    id: 'otick_kollagret',
    text: 'Din skog lagrar 4x mer kol \u00e4n grannens plantage. Ingen r\u00e4knade med st\u00e5ende tr\u00e4d.',
    triggerSV: 60_000,
  },
  {
    id: 'otick_svt',
    text: 'SVT filmar din skog som kontrast. Reportern: "Varf\u00f6r ser det ut S\u00c5 H\u00c4R hos dig?" Du pekar p\u00e5 tallarna.',
    triggerSV: 80_000,
  },
  {
    id: 'otick_nastly',
    text: 'Nastly International v\u00e4ljer DIG framf\u00f6r den svenska skogsindustrin. Nastly. T\u00e4nk p\u00e5 det.',
    triggerSV: 100_000,
  },
  {
    id: 'otick_200_skogsagare',
    text: '200 skogs\u00e4gare har g\u00e5tt \u00f6ver till plockhuggning. Industrin kallar det "en trend". Det \u00e4r en r\u00f6relse.',
    triggerSV: 120_000,
  },
  {
    id: 'otick_forskningen',
    text: 'Forskarna publicerar: likv\u00e4rdig avkastning, 400% h\u00f6gre biodiversitet. Industrin: tyst.',
    triggerSV: 150_000,
  },
  {
    id: 'otick_barnbarnet',
    text: 'Ditt barnbarn pekar p\u00e5 lavskrikan. "Farfar, den bor ju H\u00c4R!" Ja. Det g\u00f6r den.',
    triggerSV: 75_000,
  },
  {
    id: 'otick_lag_andring',
    text: 'Industrin vill \u00e4ndra lagen: "tvingande avverkningskrav". 200 skogs\u00e4gare svarade p\u00e5 remissen.',
    triggerSV: 175_000,
  },
  {
    id: 'otick_deadwood',
    text: 'D\u00f6d ved = liv. 2 000 arter lever av d\u00f6d ved i svensk skog. Industrin st\u00e4dar bort den.',
    triggerSV: 45_000,
  },
  {
    id: 'otick_humle',
    text: 'Humlen p\u00e5 marken \u00e4r 30 cm tjock. Den h\u00f6ll emot branden. Industrins marker br\u00e4ndes till botten.',
    triggerSV: 55_000,
  },
  {
    id: 'otick_talltickan',
    text: 'Talltickan \u00e4r tillbaka. Den kr\u00e4ver 200-\u00e5riga tallar. Du har dem. Grannen har plantage.',
    triggerSV: 90_000,
  },
  {
    id: 'otick_naturen_vinner',
    text: 'Naturen har inget pressmeddelande. Ingen lobbying. Inga konsulter. Den har bara r\u00e4tt.',
    triggerSV: 200_000,
  },
]

/** Get owner headlines available based on totalSkogsvardering */
export function getAvailableOwnerHeadlines(totalSV: number): OwnerTickerHeadline[] {
  return OWNER_TICKER_HEADLINES.filter(h => {
    if (h.triggerSV && totalSV < h.triggerSV) return false
    return true
  })
}
