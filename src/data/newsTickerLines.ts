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
    text: 'Virkesuppköpare bjuder på kaffe i Ångermanland: "Jag tittar bara förbi, jag lovar."',
    phase: 1,
  },
  {
    id: 'tick_skogsagare_nojd',
    text: 'Skogsägare nöjd med gratis plan: "De verkar ju veta vad de gör."',
    phase: 1,
  },
  {
    id: 'tick_gallring_rapport',
    text: 'Rapport: "Gallring god för skogen" \u2014 finansierad av massaindustrin.',
    phase: 1,
  },
  {
    id: 'tick_centerpartiet',
    text: 'Landsbygdsalliansen: "Äganderätten hotas av fågelskådare."',
    phase: 1,
  },
  {
    id: 'tick_forsta_massaorder',
    text: 'Första massaordern levererad. Pappersbruket är nöjt. Skogen är tystare.',
    phase: 1,
    trigger: { type: 'totalStammar', value: 500 },
  },
  {
    id: 'tick_nyplantering',
    text: '"Vi planterar fler träd än vi fäller!" (Monokulturer av gran räknas tydligen.)',
    phase: 1,
    trigger: { type: 'totalStammar', value: 2000 },
  },
  {
    id: 'tick_barbourjacka',
    text: 'Man i Barbourjacka sedd på ytterligare tre skogsägares gårdar. "Han verkar trevlig."',
    phase: 1,
    trigger: { type: 'generator', value: 'gen_virkesuppkopare' },
  },
  {
    id: 'tick_den_goda_grannen',
    text: 'Skogsindustrin utsedd till "Årets Granne" av sig själva.',
    phase: 2,
  },
  {
    id: 'tick_ryssland_embargo',
    text: 'Rysslands-embargo ökar efterfrågan på svenskt virke. Industrin: "Tragiskt. Men bra för oss."',
    phase: 2,
    trigger: { type: 'totalStammar', value: 15000 },
  },
  {
    id: 'tick_markberedning',
    text: 'Markberedning av 500 hektar inledd. "Kolförrådet? Det är en detaljfråga."',
    phase: 2,
    trigger: { type: 'generator', value: 'gen_markberedning' },
  },
  {
    id: 'tick_lobby_start',
    text: 'Skogsindustrins lobbybudget: 200 Mkr. "Det är inte lobbying, det är samhällsinformation."',
    phase: 2,
  },

  // ── Fas 3-4: National ──
  {
    id: 'tick_kina_dumpning',
    text: 'Kinas massa-dumpning pressar ner priserna. Industrin: "Hugga snabbare löser det."',
    phase: 3,
  },
  {
    id: 'tick_kyrkan_säljer',
    text: 'Svenska Kyrkan levererar 150-årig tall till danska börshuset \u2014 "Det är cirkulärt."',
    phase: 3,
    trigger: { type: 'totalStammar', value: 300_000 },
  },
  {
    id: 'tick_lobbyist_rapport',
    text: 'Lobbyist-rapport: Träd föredrar att bli wellpapp framför att ruttna i skogen.',
    phase: 3,
  },
  {
    id: 'tick_unga_plantor',
    text: 'Ny studie: Unga plantor binder CO2! (Studien finansierad av dem som fällde de gamla träden.)',
    phase: 3,
  },
  {
    id: 'tick_alternativt_skogsbruk',
    text: 'Alternativt skogsbruk döms ut som "ovetenskapligt" av branschfinansierad forskare.',
    phase: 3,
  },
  {
    id: 'tick_plockhugget',
    text: 'Skogsvispen AB tar betalt för rådgivning. Industrin: "Vi gör det gratis!" (Tänk inte på varför.)',
    phase: 3,
  },
  {
    id: 'tick_wellpapp_boom',
    text: 'Mammazånas beställer 10 miljoner lådor. "Nästa-dags-leverans kräver nästa-dags-avverkning."',
    phase: 3,
    trigger: { type: 'totalStammar', value: 1_000_000 },
  },
  {
    id: 'tick_nestle_break',
    text: 'Nastl\u00e9 bryter med NCA: "Ert rykte \u00e4r s\u00e4mre \u00e4n v\u00e5rt." Nastl\u00e9. Bolaget som f\u00f6rgiftade barnmat. De tycker NI \u00e4r f\u00f6r skumma.',
    phase: 4,
  },
  {
    id: 'tick_nca_rebrand',
    text: 'NCA \u00f6verv\u00e4ger namnbyte till "Nordic Cellulose Association". Konsult: "Samma folkf\u00f6rakt, ny f\u00f6rpackning."',
    phase: 4,
  },
  {
    id: 'tick_naturskyddsforeningen',
    text: 'Skovarnarna lämnar Riksskogsnämndens samverkansprocess: "Våra synpunkter väger lätt."',
    phase: 4,
  },
  {
    id: 'tick_gd_sms',
    text: 'GD Tallström sms:ar lobbyisten: "Mejla till min privata adress istället."',
    phase: 4,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_myndighetskapning' },
  },

  // ── Fas 5-6: Makt ──
  {
    id: 'tick_trump',
    text: 'Borgliga Framtidspartiets politiker i möte med konservativ amerikansk rådgivare: "Vi delar samma syn på biomassa."',
    phase: 5,
  },
  {
    id: 'tick_maktutredning',
    text: 'Riksskogsnämnden publicerar rapport om att lobbyister styr skogspolitiken. Lobbyisterna: "Nej."',
    phase: 5,
  },
  {
    id: 'tick_gd_koper_skog',
    text: 'Ex-generaldirektör köper 700 hektar skog. Samma skog hans myndighet hade tillsyn över.',
    phase: 5,
  },
  {
    id: 'tick_eu_urvattnades',
    text: 'EU:s hållbarhetslagar urvattnades. Huvudförhandlaren: "Jag har varit fullt transparent."',
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
    text: 'Ex-minister anställs av skogsbolag. "Jag byter sida, inte åsikt."',
    phase: 5,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_svangdorren' },
  },
  {
    id: 'tick_sameby_forlorar',
    text: 'Sameby förlorar mark i Högsta domstolen. Deras advokat: "Vi har rätt. De har pengar."',
    phase: 5,
    trigger: { type: 'totalStammar', value: 50_000_000 },
  },
  {
    id: 'tick_ai_optimerar',
    text: 'AI-system optimerar avverkningsplaner. Resultat: "Avverka allt." Ingen är förvånad.',
    phase: 5,
    trigger: { type: 'totalStammar', value: 30_000_000 },
  },
  {
    id: 'tick_forskare_tystas',
    text: 'Forskare som kritiserade industrin får inte förnyat anslag. "Ren tillfällighet." \u2014 Forskningsrådet.',
    phase: 5,
  },
  {
    id: 'tick_63_procent',
    text: '63% av allt virke blir massa. Engångslådor. Toalettpapper. Reklamblad ingen läser.',
    phase: 5,
  },

  // ── Fas 6: Post-Biologisk ──
  {
    id: 'tick_tystnad_skog',
    text: 'Forskare rapporterar: "Skogen är tystare än någonsin." Industrin: "Effektivt."',
    phase: 6,
  },
  {
    id: 'tick_monokultur',
    text: 'Sveriges sista blandskog omvandlad till produktiv granplantage. Firandet hålls på Teams.',
    phase: 6,
  },
  {
    id: 'tick_genetisk_gran',
    text: 'Genetiskt Optimerad Gran v3.0 godkänd. Inga grenar. Inga barr. Inget liv. Perfekt.',
    phase: 6,
    trigger: { type: 'totalStammar', value: 200_000_000 },
  },
  {
    id: 'tick_droner_nattetid',
    text: 'Autonoma skördare opererar nattetid. GPS-styrda. Tysta. Effektiva. Ingen ser dem.',
    phase: 6,
    trigger: { type: 'totalStammar', value: 500_000_000 },
  },
  {
    id: 'tick_insekter_borta',
    text: 'Sista insektspopulationen i produktionsskog rapporterad utdöd. Wellpapp-produktionen ökade 12%.',
    phase: 6,
  },
  {
    id: 'tick_skolbesok',
    text: 'Skolklass besöker "skog". Barn frågar: "Var är djuren?" Guide: "Vilka djur?"',
    phase: 6,
  },

  // ── Fas 7: Endgame ──
  {
    id: 'tick_lavskrika',
    text: 'Sista lavskrikan observerad. Observatören arresterad för "störande av produktiv verksamhet."',
    phase: 7,
  },
  {
    id: 'tick_biologisk_mangfald',
    text: 'Jordens skogar: 100% produktiva. Biologisk mångfald: "Vad är det?" \u2014 Näringsdepartementet.',
    phase: 7,
  },
  {
    id: 'tick_lunar_silva',
    text: 'Lunar Silva AB godkänt för börsnotering. Kurs: \u221E.',
    phase: 7,
  },
  {
    id: 'tick_fn',
    text: 'FN:s generalsekreterare gratulerar: "Ni har löst klimatfrågan. Genom att eliminera den."',
    phase: 7,
  },
  {
    id: 'tick_mars_fabrik',
    text: 'Mars Massafabrik produktionsstart. Kvaliteten är låg. Men ingen klagar \u2014 det finns inga människor där.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 3_000_000_000 },
  },
  {
    id: 'tick_sista_anstallda',
    text: 'Sista mänskliga medarbetaren går i pension. Styrelsemötet hålls mellan serverhallar.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 5_000_000_000 },
  },
  {
    id: 'tick_universums_industriskog',
    text: 'Universum har blivit en industriskog. Stjärnorna lyser genom rutnätet.',
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
