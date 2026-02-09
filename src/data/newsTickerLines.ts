// ── Silva Maximus — News Ticker Headlines ──
// Organized by phase. Headlines unlock based on milestones and phase progression.

export interface TickerHeadline {
  id: string
  text: string
  phase: number
  trigger?: TickerTrigger
}

export interface TickerTrigger {
  type: 'totalStammar' | 'phase' | 'lobby' | 'image' | 'event' | 'lobbyProject' | 'generator'
  value: number | string   // threshold number or event/project ID
}

export const TICKER_HEADLINES: TickerHeadline[] = [
  // ── Fas 1-2: Lokal ──
  {
    id: 'tick_virkesuppkopare',
    text: 'Virkesuppkopare bjuder pa kaffe i Angermanland: "Jag tittar bara forbi, jag lovar."',
    phase: 1,
  },
  {
    id: 'tick_skogsagare_nojd',
    text: 'Skogsagare nojd med gratis plan: "De verkar ju veta vad de gor."',
    phase: 1,
  },
  {
    id: 'tick_gallring_rapport',
    text: 'Rapport: "Gallring god for skogen" \u2014 finansierad av massaindustrin.',
    phase: 1,
  },
  {
    id: 'tick_centerpartiet',
    text: 'Landsbygdsalliansen: "Aganderatten hotas av fagelskadare."',
    phase: 1,
  },
  {
    id: 'tick_forsta_massaorder',
    text: 'Forsta massaordern levererad. Pappersbruket ar nojt. Skogen ar tystare.',
    phase: 1,
    trigger: { type: 'totalStammar', value: 500 },
  },
  {
    id: 'tick_nyplantering',
    text: '"Vi planterar fler trad an vi faller!" (Monokulturer av gran raknas tydligen.)',
    phase: 1,
    trigger: { type: 'totalStammar', value: 2000 },
  },
  {
    id: 'tick_barbourjacka',
    text: 'Man i Barbourjacka sedd pa ytterligare tre skogsagares gardar. "Han verkar trevellig."',
    phase: 1,
    trigger: { type: 'generator', value: 'gen_virkesuppkopare' },
  },
  {
    id: 'tick_den_goda_grannen',
    text: 'Skogsindustrin utsedd till "Arets Granne" av sig sjalva.',
    phase: 2,
  },
  {
    id: 'tick_ryssland_embargo',
    text: 'Rysslands-embargo okar efterfragan pa svenskt virke. Industrin: "Tragiskt. Men bra for oss."',
    phase: 2,
    trigger: { type: 'totalStammar', value: 15000 },
  },
  {
    id: 'tick_markberedning',
    text: 'Markberedning av 500 hektar inledd. "Kolforradet? Det ar en detaljfraga."',
    phase: 2,
    trigger: { type: 'generator', value: 'gen_markberedning' },
  },
  {
    id: 'tick_lobby_start',
    text: 'Skogsindustrins lobbybudget: 200 Mkr. "Det ar inte lobbying, det ar samhallinformation."',
    phase: 2,
  },

  // ── Fas 3-4: National ──
  {
    id: 'tick_kina_dumpning',
    text: 'Kinas massa-dumpning pressar ner priserna. Industrin: "Hugga snabbare loser det."',
    phase: 3,
  },
  {
    id: 'tick_kyrkan_säljer',
    text: 'Svenska Kyrkan levererar 150-arig tall till danska borshuset \u2014 "Det ar cirkularit."',
    phase: 3,
    trigger: { type: 'totalStammar', value: 300_000 },
  },
  {
    id: 'tick_lobbyist_rapport',
    text: 'Lobbyist-rapport: Trad foredrar att bli wellpapp framfor att ruttna i skogen.',
    phase: 3,
  },
  {
    id: 'tick_unga_plantor',
    text: 'Ny studie: Unga plantor binder CO2! (Studien finansierad av dem som fallde de gamla traden.)',
    phase: 3,
  },
  {
    id: 'tick_alternativt_skogsbruk',
    text: 'Alternativt skogsbruk doms ut som "ovetenskapligt" av branschfinansierad forskare.',
    phase: 3,
  },
  {
    id: 'tick_plockhugget',
    text: 'Skogsvispen AB tar betalt for radgivning. Industrin: "Vi gor det gratis!" (Tank inte pa varfor.)',
    phase: 3,
  },
  {
    id: 'tick_wellpapp_boom',
    text: 'Kartongen.com bestaller 10 miljoner lador. "Nastadagsleverans kraver nastadagsavverkning."',
    phase: 3,
    trigger: { type: 'totalStammar', value: 1_000_000 },
  },
  {
    id: 'tick_nestle_break',
    text: 'Choco-Corp International bryter med svensk skogsjatte: "Ert rykte ar samre an vart."',
    phase: 4,
  },
  {
    id: 'tick_naturskyddsforeningen',
    text: 'Skovarnarna lamnar Riksskogsnamndens samverkansprocess: "Vara synpunkter vager latt."',
    phase: 4,
  },
  {
    id: 'tick_gd_sms',
    text: 'GD Tallstrom sms:ar lobbyisten: "Mejla till min privata adress istallet."',
    phase: 4,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_myndighetskapning' },
  },

  // ── Fas 5-6: Makt ──
  {
    id: 'tick_trump',
    text: 'Borgliga Framtidspartiets politiker i mote med Trump-radgivare: "Vi delar samma syn pa biomassa."',
    phase: 5,
  },
  {
    id: 'tick_maktutredning',
    text: 'Riksskogsnamnden publicerar rapport om att lobbyister styr skogspolitiken. Lobbyisterna: "Nej."',
    phase: 5,
  },
  {
    id: 'tick_gd_koper_skog',
    text: 'Ex-generaldirektor koper 700 hektar skog. Samma skog hans myndighet hade tillsyn over.',
    phase: 5,
  },
  {
    id: 'tick_eu_urvattnades',
    text: 'EU:s hallbarhetslagar urvattnades. Huvudforhandlaren: "Jag har varit fullt transparent."',
    phase: 5,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_omnibus' },
  },
  {
    id: 'tick_heritage',
    text: 'Frihetens Tankesmedja skickar tackkort till Bryssel.',
    phase: 5,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_avskogning' },
  },
  {
    id: 'tick_svangdorren',
    text: 'Ex-minister anstalls av skogsbolag. "Jag byter sida, inte asikt."',
    phase: 5,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_svangdorren' },
  },
  {
    id: 'tick_sameby_forlorar',
    text: 'Sameby forlorar mark i Hogsta domstolen. Deras advokat: "Vi har ratt. De har pengar."',
    phase: 5,
    trigger: { type: 'totalStammar', value: 50_000_000 },
  },
  {
    id: 'tick_ai_optimerar',
    text: 'AI-system optimerar avverkningsplaner. Resultat: "Avverka allt." Ingen ar forvånad.',
    phase: 5,
    trigger: { type: 'totalStammar', value: 30_000_000 },
  },
  {
    id: 'tick_forskare_tystas',
    text: 'Forskare som kritiserade industrin far inte fornyat anslag. "Ren tillfallighet." \u2014 Forskningsradet.',
    phase: 5,
  },
  {
    id: 'tick_63_procent',
    text: '63% av allt virke blir massa. Engangslador. Toalettpapper. Reklamblad ingen laser.',
    phase: 5,
  },

  // ── Fas 6: Post-Biologisk ──
  {
    id: 'tick_tystnad_skog',
    text: 'Forskare rapporterar: "Skogen ar tystare an nagonsin." Industrin: "Effektivt."',
    phase: 6,
  },
  {
    id: 'tick_monokultur',
    text: 'Sveriges sista blandskog omvandlad till produktiv granplantage. Firandet halls pa Teams.',
    phase: 6,
  },
  {
    id: 'tick_genetisk_gran',
    text: 'Genetiskt Optimerad Gran v3.0 godkand. Inga grenar. Inga barr. Inget liv. Perfekt.',
    phase: 6,
    trigger: { type: 'totalStammar', value: 200_000_000 },
  },
  {
    id: 'tick_droner_nattetid',
    text: 'Autonoma skordare opererar nattetid. GPS-styrda. Tysta. Effektiva. Ingen ser dem.',
    phase: 6,
    trigger: { type: 'totalStammar', value: 500_000_000 },
  },
  {
    id: 'tick_insekter_borta',
    text: 'Sista insektspopulationen i produktionsskog rapporterad utdod. Wellpapp-produktionen okade 12%.',
    phase: 6,
  },
  {
    id: 'tick_skolbesok',
    text: 'Skolklass besoker "skog". Barn fragar: "Var ar djuren?" Guide: "Vilka djur?"',
    phase: 6,
  },

  // ── Fas 7: Endgame ──
  {
    id: 'tick_lavskrika',
    text: 'Sista lavskrikan observerad. Observatoren arresterad for "storande av produktiv verksamhet."',
    phase: 7,
  },
  {
    id: 'tick_biologisk_mangfald',
    text: 'Jordens skogar: 100% produktiva. Biologisk mangfald: "Vad ar det?" \u2014 Naringsdepartementet.',
    phase: 7,
  },
  {
    id: 'tick_lunar_silva',
    text: 'Lunar Silva AB godkant for borsnotering. Kurs: \u221E.',
    phase: 7,
  },
  {
    id: 'tick_fn',
    text: 'FN:s generalsekreterare gratulerar: "Ni har lost klimatfragan. Genom att eliminera den."',
    phase: 7,
  },
  {
    id: 'tick_mars_fabrik',
    text: 'Mars Massafabrik produktionsstart. Kvaliteten ar lag. Men ingen klagar \u2014 det finns inga manniskor dar.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 3_000_000_000 },
  },
  {
    id: 'tick_sista_anstallda',
    text: 'Sista manskliga medarbetaren gar i pension. Styrelsemotet halls mellan serverhallar.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 5_000_000_000 },
  },
  {
    id: 'tick_universums_industriskog',
    text: 'Universum har blivit en industriskog. Stjarnorna lyser genom rutnattet.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 10_000_000_000 },
  },
]

/** Get headlines available for a given game state */
export function getAvailableHeadlines(
  phase: number,
  totalStammar: number,
  lobbyProjects: Record<string, { purchased: boolean }>,
  generators: Record<string, { count: number }>,
  eventHistory: string[],
): TickerHeadline[] {
  return TICKER_HEADLINES.filter(h => {
    if (h.phase > phase) return false
    if (!h.trigger) return true

    switch (h.trigger.type) {
      case 'totalStammar':
        return totalStammar >= (h.trigger.value as number)
      case 'phase':
        return phase >= (h.trigger.value as number)
      case 'lobbyProject':
        return lobbyProjects[h.trigger.value as string]?.purchased === true
      case 'generator':
        return (generators[h.trigger.value as string]?.count ?? 0) > 0
      case 'event':
        return eventHistory.includes(h.trigger.value as string)
      case 'image':
      case 'lobby':
        return true // simplified: show once phase unlocks
      default:
        return true
    }
  })
}
