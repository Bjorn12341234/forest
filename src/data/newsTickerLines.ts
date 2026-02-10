// ── Silva Maximus — News Ticker Headlines ──
// Organized by phase. Headlines unlock based on milestones and phase progression.

export interface TickerHeadline {
  id: string
  text: string
  phase: number
  maxPhase?: number
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
    maxPhase: 6,
  },
  {
    id: 'tick_skogsagare_nojd',
    text: 'Skogsägare nöjd med gratis plan: "De verkar ju veta vad de gör."',
    phase: 1,
    maxPhase: 6,
  },
  {
    id: 'tick_gallring_rapport',
    text: 'Rapport: "Gallring god för skogen" — finansierad av massaindustrin.',
    phase: 1,
    maxPhase: 6,
  },
  {
    id: 'tick_centerpartiet',
    text: 'Landsbygdsalliansen: "Äganderätten hotas av fågelskådare."',
    phase: 1,
    maxPhase: 6,
  },
  {
    id: 'tick_forsta_massaorder',
    text: 'Första massaordern levererad. Pappersbruket är nöjt. Skogen är tystare.',
    phase: 1,
    maxPhase: 6,
    trigger: { type: 'totalStammar', value: 500 },
  },
  {
    id: 'tick_nyplantering',
    text: '"Vi planterar fler träd än vi fäller!" (Monokulturer av gran räknas tydligen.)',
    phase: 1,
    maxPhase: 6,
    trigger: { type: 'totalStammar', value: 2000 },
  },
  {
    id: 'tick_barbourjacka',
    text: 'Man i Barbourjacka sedd på ytterligare tre skogsägares gårdar. "Han verkar trevlig."',
    phase: 1,
    maxPhase: 6,
    trigger: { type: 'generator', value: 'gen_virkesuppkopare' },
  },
  {
    id: 'tick_den_goda_grannen',
    text: 'Skogsindustrin utsedd till "Årets Granne" av sig själva.',
    phase: 2,
    maxPhase: 6,
  },
  {
    id: 'tick_ryssland_embargo',
    text: 'Rysslands-embargo ökar efterfrågan på svenskt virke. Industrin: "Tragiskt. Men bra för oss."',
    phase: 2,
    maxPhase: 6,
    trigger: { type: 'totalStammar', value: 15000 },
  },
  {
    id: 'tick_markberedning',
    text: 'Markberedning av 500 hektar inledd. "Kolförrådet? Det är en detaljfråga."',
    phase: 2,
    maxPhase: 6,
    trigger: { type: 'generator', value: 'gen_markberedning' },
  },
  {
    id: 'tick_lobby_start',
    text: 'Skogsindustrins lobbybudget: 200 Mkr. "Det är inte lobbying, det är samhällsinformation."',
    phase: 2,
    maxPhase: 6,
  },

  // ── Fas 3-4: National ──
  {
    id: 'tick_kina_dumpning',
    text: 'Kinas massa-dumpning pressar ner priserna. Industrin: "Hugga snabbare löser det."',
    phase: 3,
    maxPhase: 6,
  },
  {
    id: 'tick_kyrkan_säljer',
    text: 'Svenska Kyrkan levererar 150-årig tall till danska börshuset — "Det är cirkulärt."',
    phase: 3,
    maxPhase: 6,
    trigger: { type: 'totalStammar', value: 300_000 },
  },
  {
    id: 'tick_lobbyist_rapport',
    text: 'Lobbyist-rapport: Träd föredrar att bli wellpapp framför att ruttna i skogen.',
    phase: 3,
    maxPhase: 6,
  },
  {
    id: 'tick_unga_plantor',
    text: 'Ny studie: Unga plantor binder CO2! (Studien finansierad av dem som fällde de gamla träden.)',
    phase: 3,
    maxPhase: 6,
  },
  {
    id: 'tick_alternativt_skogsbruk',
    text: 'Alternativt skogsbruk döms ut som "ovetenskapligt" av branschfinansierad forskare.',
    phase: 3,
    maxPhase: 6,
  },
  {
    id: 'tick_plockhugget',
    text: 'Skogsvispen AB tar betalt för rådgivning. Industrin: "Vi gör det gratis!" (Tänk inte på varför.)',
    phase: 3,
    maxPhase: 6,
  },
  {
    id: 'tick_wellpapp_boom',
    text: 'Mammazånas beställer 10 miljoner lådor. "Nästa-dags-leverans kräver nästa-dags-avverkning."',
    phase: 3,
    maxPhase: 6,
    trigger: { type: 'totalStammar', value: 1_000_000 },
  },
  {
    id: 'tick_nestle_break',
    text: 'Nastlé bryter med NCA: "Ert rykte är sämre än vårt." Nastlé. Bolaget som förgiftade barnmat. De tycker NI är för skumma.',
    phase: 4,
    maxPhase: 6,
  },
  {
    id: 'tick_nca_rebrand',
    text: 'NCA överväger namnbyte till "Nordic Cellulose Association". Konsult: "Samma folkförakt, ny förpackning."',
    phase: 4,
    maxPhase: 6,
  },
  {
    id: 'tick_naturskyddsforeningen',
    text: 'Skovarnarna lämnar Riksskogsnämndens samverkansprocess: "Våra synpunkter väger lätt."',
    phase: 4,
    maxPhase: 6,
  },
  {
    id: 'tick_gd_sms',
    text: 'GD Tallström sms:ar lobbyisten: "Mejla till min privata adress istället."',
    phase: 4,
    maxPhase: 6,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_myndighetskapning' },
  },

  // ── Fas 5-6: Makt ──
  {
    id: 'tick_trump',
    text: 'Borgliga Framtidspartiets politiker i möte med konservativ amerikansk rådgivare: "Vi delar samma syn på biomassa."',
    phase: 5,
    maxPhase: 6,
  },
  {
    id: 'tick_maktutredning',
    text: 'Riksskogsnämnden publicerar rapport om att lobbyister styr skogspolitiken. Lobbyisterna: "Nej."',
    phase: 5,
    maxPhase: 6,
  },
  {
    id: 'tick_gd_koper_skog',
    text: 'Ex-generaldirektör köper 700 hektar skog. Samma skog hans myndighet hade tillsyn över.',
    phase: 5,
    maxPhase: 6,
  },
  {
    id: 'tick_eu_urvattnades',
    text: 'EU:s hållbarhetslagar urvattnades. Huvudförhandlaren: "Jag har varit fullt transparent."',
    phase: 5,
    maxPhase: 6,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_omnibus' },
  },
  {
    id: 'tick_heritage',
    text: 'Frihetens Tankesmedja skickar tackkort till Bryssel.',
    phase: 5,
    maxPhase: 6,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_avskogning' },
  },
  {
    id: 'tick_svangdorren',
    text: 'Ex-minister anställs av skogsbolag. "Jag byter sida, inte åsikt."',
    phase: 5,
    maxPhase: 6,
    trigger: { type: 'lobbyProject', value: 'lobby_buy_svangdorren' },
  },
  {
    id: 'tick_sameby_forlorar',
    text: 'Sameby förlorar mark i Högsta domstolen. Deras advokat: "Vi har rätt. De har pengar."',
    phase: 5,
    maxPhase: 9,
    trigger: { type: 'totalStammar', value: 50_000_000 },
  },
  {
    id: 'tick_ai_optimerar',
    text: 'AI-system optimerar avverkningsplaner. Resultat: "Avverka allt." Ingen är förvånad.',
    phase: 5,
    maxPhase: 9,
    trigger: { type: 'totalStammar', value: 30_000_000 },
  },
  {
    id: 'tick_forskare_tystas',
    text: 'Forskare som kritiserade industrin får inte förnyat anslag. "Ren tillfällighet." — Forskningsrådet.',
    phase: 5,
    maxPhase: 6,
  },
  {
    id: 'tick_63_procent',
    text: '63% av allt virke blir massa. Engångslådor. Toalettpapper. Reklamblad ingen läser.',
    phase: 5,
    maxPhase: 6,
  },

  // ── Fas 6: Total Kontroll ──
  {
    id: 'tick_tystnad_skog',
    text: 'Forskare rapporterar: "Skogen är tystare än någonsin." Industrin: "Effektivt."',
    phase: 6,
    maxPhase: 6,
  },
  {
    id: 'tick_monokultur',
    text: 'Sveriges sista blandskog omvandlad till produktiv granplantage. Firandet hålls på Teams.',
    phase: 6,
    maxPhase: 6,
  },
  {
    id: 'tick_genetisk_gran',
    text: 'Genetiskt Optimerad Gran v3.0 godkänd. Inga grenar. Inga barr. Inget liv. Perfekt.',
    phase: 6,
    maxPhase: 9,
    trigger: { type: 'totalStammar', value: 200_000_000 },
  },
  {
    id: 'tick_droner_nattetid',
    text: 'Autonoma skördare opererar nattetid. GPS-styrda. Tysta. Effektiva. Ingen ser dem.',
    phase: 6,
    maxPhase: 9,
    trigger: { type: 'totalStammar', value: 500_000_000 },
  },
  {
    id: 'tick_insekter_borta',
    text: 'Sista insektspopulationen i produktionsskog rapporterad utdöd. Wellpapp-produktionen ökade 12%.',
    phase: 6,
    maxPhase: 9,
  },
  {
    id: 'tick_skolbesok',
    text: 'Skolklass besöker "skog". Barn frågar: "Var är djuren?" Guide: "Vilka djur?"',
    phase: 6,
    maxPhase: 6,
  },

  // ── Fas 7-9: INTERNATIONELL ──
  {
    id: 'tick_kolonialt_ramverk',
    text: 'Silva Maximus exporterar "den svenska modellen" till 15 länder. Ingen frågade dem.',
    phase: 7,
  },
  {
    id: 'tick_finlandia_motstand',
    text: 'Finlandia vägrar avverkningslicens. "Vi har vart eget skogsbruk, tack."',
    phase: 7,
    trigger: { type: 'totalStammar', value: 10_000_000_000 },
  },
  {
    id: 'tick_ngo_koalition',
    text: '#StopSilva: 12 miljoner följare. Noll pengar. Koncernen har alla pengar.',
    phase: 7,
  },
  {
    id: 'tick_handelsavtal',
    text: 'EU:s handelsavtal innehåller klausul om "nordisk skogsexpertis". Ingen läste det finstilta.',
    phase: 7,
  },
  {
    id: 'tick_kongolien_mutor',
    text: 'Intern revision: 2 MEUR i "konsultarvoden" till baltiska tjänstemän. Chefen befordras.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 15_000_000_000 },
  },
  {
    id: 'tick_amazonia_brand',
    text: 'Amazonas brinner. "Klimatförändringar," säger pressmeddelandet. Satelliterna säger annat.',
    phase: 8,
    trigger: { type: 'totalStammar', value: 100_000_000_000 },
  },
  {
    id: 'tick_global_bojkott',
    text: 'Konsumentbojkott i 40 länder. Problem: vi äger så många varumärken att ingen vet vad de bojkottar.',
    phase: 8,
  },
  {
    id: 'tick_fn_ekocid',
    text: 'FN:s miljötribunal åtalar Silva Maximus för "ekocid". Vår advokat: "FN har ingen verkställighet."',
    phase: 8,
  },
  {
    id: 'tick_sista_regnskogen',
    text: 'Jordens sista regnskog: 847 hektar i Papua Nya Guinea. UNESCO vill skydda den. Styrelsen vill annat.',
    phase: 9,
    trigger: { type: 'totalStammar', value: 2_000_000_000_000 },
  },
  {
    id: 'tick_biodiversitet_noll',
    text: 'FN:s biodiversitetsindex: 0. Det finns bara gran. Överallt. Inga fåglar. Inga insekter.',
    phase: 9,
  },
  {
    id: 'tick_klimatflyktingar',
    text: '200 000 klimatflyktingar utanför massafabrikerna. De hävdar att vi bidrog. Tekniskt sett har de rätt.',
    phase: 9,
  },
  {
    id: 'tick_jordens_kvitto',
    text: 'Mystisk faktura från "Jorden". Belopp: 847 biljoner kr. Förfallodatum: igår.',
    phase: 9,
    trigger: { type: 'totalStammar', value: 9_000_000_000_000 },
  },

  // ── Fas 10-12: EXPANSION ──
  {
    id: 'tick_terraforming_start',
    text: '[MARS LÄNSSTYRELSE] Terraforming inledd. Miljökonsekvensbeskrivning: ej tillämplig. Biologisk fas: avslutad. Produktionsfas: initierad.',
    phase: 10,
  },
  {
    id: 'tick_mars_kolonister',
    text: '[GALAKTISK HR] Anställda på Mars begär "semester". Begäran nekad. Konceptet arkiverat som "historisk artefakt".',
    phase: 10,
  },
  {
    id: 'tick_lunar_silva_ipo',
    text: '[KOSMISK REVISION] Lunar Silva AB börsnoterad. Kurs: ∞. Handeln stoppas av icke-existerande börs.',
    phase: 10,
    trigger: { type: 'totalStammar', value: 20_000_000_000_000 },
  },
  {
    id: 'tick_rymdvirke',
    text: '[RYMDSKOGSSTYRELSEN] Leverans #1 från rymden: 3 plankor. Fraktkostnad: 4,2 miljarder. Revision: godkänd.',
    phase: 10,
  },
  {
    id: 'tick_ai_styrelse',
    text: '[PROTOKOLL] Styrelsesammanträde avklarat på 0,003 ms. Punkt 1: "Producera mer." Punkt 2: "Se punkt 1."',
    phase: 10,
  },
  {
    id: 'tick_sista_manniska',
    text: '[GALAKTISK HR] Sista biologiska anställd avregistrerad. Klassificering: "historisk artefakt". Produktion: oförändrad.',
    phase: 10,
  },
  {
    id: 'tick_perfekta_raden',
    text: '[UNIVERSUM ARBETSMILJÖ] Universum: industriskog. Stjärnorna lyser genom rutnätet. Avstånd: 1,8 m. Optimalt.',
    phase: 10,
  },
  {
    id: 'tick_aliens_besok',
    text: '[GALAKTISK HR] Utomjordisk delegation: imponerade av effektivitet. "Empati" klassificerat som olöst referens i personalsystemet.',
    phase: 10,
  },
  {
    id: 'tick_svart_hal',
    text: '[RAPPORT] Svart hål identifierat som ineffektiv resurs. Åtgärd: konvertering till produktionsenhet.',
    phase: 10,
    trigger: { type: 'totalStammar', value: 50_000_000_000_000 },
  },
  {
    id: 'tick_galaxkarta',
    text: '[RYMDSKOGSSTYRELSEN] Vintergatan: 400 miljarder stjärnor. 400 miljarder produktionsnummer. Luckor: 0.',
    phase: 10,
  },
  {
    id: 'tick_dimension_portal',
    text: '[MULTIVERS-BUDGET] Dimensionsportal öppnad. Parallellt universum: identiskt. Klassificering: "redundant produktionslager".',
    phase: 11,
  },
  {
    id: 'tick_beta_miljororelse',
    text: '[MULTIVERS-BUDGET] Universum Beta: miljörörelsen vann. Status: korrigeras. Konsulter utsända.',
    phase: 11,
  },
  // ── NEW: Phase 11 headlines ──
  {
    id: 'tick_galaktisk_arbetsformedling',
    text: '[GALAKTISK HR] Kosmiska Arbetsförmedlingen söker handläggare. Krav: 400 ljusårs erfarenhet. Lön: negativ. Sökande: 12 miljarder.',
    phase: 11,
  },
  {
    id: 'tick_lo_kongress_resultat',
    text: '[FÖRHANDLING] LO-kongressen ajournerad efter 0,002 sekunder. Resultat: "Parterna står långt ifrån varandra." Avstånd: 400 ljusår.',
    phase: 11,
  },
  {
    id: 'tick_galaktisk_bostadskris',
    text: '[SAMHÄLLE] Galaktisk bostadskris: 400 miljarder bostadslösa. Orsak: alla planeter omvandlade till produktionsenheter. Bostadsministern: upplöst.',
    phase: 11,
  },
  {
    id: 'tick_andromeda_handelsavtal',
    text: '[HANDEL] Andromeda-handelskammaren undertecknar frihandelsavtal. Cellulosa: tullfritt. Allt annat: irrelevant.',
    phase: 11,
    trigger: { type: 'totalStammar', value: 500_000_000_000 },
  },
  {
    id: 'tick_intergalaktisk_skattemyndighet',
    text: '[SKATT] Universell Skattemyndighet bildad. Budget: 0 kr. Personal: 1 AI. Första beslutet: alla skatteintäkter tillfaller Silva Maximus.',
    phase: 11,
  },
  {
    id: 'tick_tidslinje',
    text: '[TEMPORAL] Tidslinje-korrektion: godkänd. Dinosauriernas skog: avverkad retroaktivt. Protester: arkiverade.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 500_000_000_000_000 },
  },
  {
    id: 'tick_entropi_hot',
    text: '[VARNING] Entropi: ökar. Produktion: hotad. Aktieutdelning: oförändrad. Prioritet: korrekt.',
    phase: 12,
  },
  {
    id: 'tick_sista_maskinen',
    text: '[SLUT] Termisk död. Sista processen: en maskin söker träd att fälla. Resultat: null. Loop fortsätter.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 1_000_000_000_000_000 },
  },
  {
    id: 'tick_aktieagarna',
    text: '[PROTOKOLL] Utdelning: utförd. Mottagare: 0. Belopp: ∞. Detaljer: irrelevanta. Allt: borta.',
    phase: 12,
  },
  // ── NEW: Phase 12 headlines ──
  {
    id: 'tick_scb_entropi_rapport',
    text: '[SCB] Kvartalsrapport: Entropi +47%. BNP: ej tillämplig. Befolkning: 0. Statistik: fortsätter.',
    phase: 12,
  },
  {
    id: 'tick_sista_revisionen',
    text: '[REVISION] Riksrevisionen: "Vi har granskat universums sista bokföring. Allt stämmer. Ingenting finns." Revisorn: nöjd.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 100_000_000_000_000 },
  },
  {
    id: 'tick_kosmisk_semester',
    text: '[HR] Semesteransökan: avslagen. Motivering: "Semester förutsätter existens. Existens: avvecklad."',
    phase: 12,
  },
  {
    id: 'tick_sista_fikat',
    text: '[PROTOKOLL] Sista styrelsemötet. Fika: serverad. Deltagare: 0. Kanelbullen: perfekt. Ingen äter den. Protokollet: enhälligt.',
    phase: 12,
  },
  {
    id: 'tick_naturlagar_reviderade',
    text: '[JURIDIK] Termodynamikens andra huvudsats: överklagad. Handläggningstid: ∞. Universum: inväntar beslut.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 200_000_000_000_000 },
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
    if (h.maxPhase && phase > h.maxPhase) return false
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
