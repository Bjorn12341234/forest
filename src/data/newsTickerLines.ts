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
    text: 'Nastlé bryter med NCA: "Ert rykte är sämre än vårt." Nastlé. Bolaget som förgiftade barnmat. De tycker NI är för skumma.',
    phase: 4,
  },
  {
    id: 'tick_nca_rebrand',
    text: 'NCA överväger namnbyte till "Nordic Cellulose Association". Konsult: "Samma folkförakt, ny förpackning."',
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

  // \u2500\u2500 Fas 7: Post-Biologisk \u2500\u2500
  {
    id: 'tick_lavskrika',
    text: 'Sista lavskrikan observerad. Observat\u00f6ren arresterad f\u00f6r "st\u00f6rande av produktiv verksamhet."',
    phase: 7,
  },
  {
    id: 'tick_biologisk_mangfald',
    text: 'Jordens skogar: 100% produktiva. Biologisk m\u00e5ngfald: "Vad \u00e4r det?" \u2014 N\u00e4ringsdepartementet.',
    phase: 7,
  },
  {
    id: 'tick_lunar_silva',
    text: 'Lunar Silva AB godk\u00e4nt f\u00f6r b\u00f6rsnotering. Kurs: \u221e.',
    phase: 7,
  },
  {
    id: 'tick_fn',
    text: 'FN:s generalsekreterare gratulerar: "Ni har l\u00f6st klimatfr\u00e5gan. Genom att eliminera den."',
    phase: 7,
  },
  {
    id: 'tick_mars_fabrik',
    text: 'Mars Massafabrik produktionsstart. Kvaliteten \u00e4r l\u00e5g. Men ingen klagar \u2014 det finns inga m\u00e4nniskor d\u00e4r.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 3_000_000_000 },
  },
  {
    id: 'tick_sista_anstallda',
    text: 'Sista m\u00e4nskliga medarbetaren g\u00e5r i pension. Styrelseprotokoll f\u00f6rs av AI.',
    phase: 7,
    trigger: { type: 'totalStammar', value: 5_000_000_000 },
  },
  {
    id: 'tick_klonskog_rapport',
    text: 'Klon-Skog-programmet visar lovande resultat. Alla tr\u00e4d \u00e4r identiska. Alla d\u00f6r samtidigt.',
    phase: 7,
    trigger: { type: 'generator', value: 'gen_klonskog' },
  },

  // \u2500\u2500 Fas 8-9: Rymden \u2500\u2500
  {
    id: 'tick_terraforming_start',
    text: 'Terraforming av Mars inledd. F\u00f6rsta granplantorna klarade -60\u00b0C. De sista med.',
    phase: 8,
  },
  {
    id: 'tick_mars_kolonister',
    text: 'Mars-kolonisterna kr\u00e4ver semester. HR-avdelningen skickar ett standardmejl fr\u00e5n jorden.',
    phase: 8,
  },
  {
    id: 'tick_lunar_silva_ipo',
    text: 'Lunar Silva AB:s b\u00f6rsnotering \u00f6vertecknad 4000%. M\u00e5nen har ingen skog \u00e4n.',
    phase: 8,
    trigger: { type: 'totalStammar', value: 20_000_000_000 },
  },
  {
    id: 'tick_rymdvirke',
    text: 'F\u00f6rsta rymdvirkeleveransen: 3 plankor. Fraktkostnad: 4,2 miljarder. Vinst: 12 kr.',
    phase: 8,
  },
  {
    id: 'tick_titan_metansjöar',
    text: 'Titans metansj\u00f6ar visar sig vara utm\u00e4rkta f\u00f6r industriell kylning. Lokalt liv protesterar inte. Det finns inget.',
    phase: 9,
    trigger: { type: 'totalStammar', value: 100_000_000_000 },
  },
  {
    id: 'tick_dyson_konstruktion',
    text: 'Dysonsfärens konstruktion p\u00e5b\u00f6rjad. Solnedg\u00e5ngar kommer inte l\u00e4ngre vara m\u00f6jliga. Ingen beklagar.',
    phase: 9,
  },
  {
    id: 'tick_exoplanet_signal',
    text: 'Signal mottagen fr\u00e5n Proxima b: "Sluta." Styrelsen tolkar det som en aff\u00e4rsinbjudan.',
    phase: 9,
    trigger: { type: 'totalStammar', value: 500_000_000_000 },
  },

  // \u2500\u2500 Fas 10-12: Kosmisk \u2192 Bortom \u2500\u2500
  {
    id: 'tick_perfekta_raden',
    text: 'Universum har blivit en industriskog. Stj\u00e4rnorna lyser genom rutn\u00e4tet. 1,8 meter.',
    phase: 10,
  },
  {
    id: 'tick_aliens_besok',
    text: 'Utomjordisk delegation bes\u00f6ker. De \u00e4r imponerade av v\u00e5r effektivitet. Mindre imponerade av v\u00e5r empati.',
    phase: 10,
  },
  {
    id: 'tick_svart_hal',
    text: 'Svart h\u00e5l identifierat som ineffektiv resurs. Styrelsen vill st\u00e4nga det.',
    phase: 10,
    trigger: { type: 'totalStammar', value: 5_000_000_000_000 },
  },
  {
    id: 'tick_galaxkarta',
    text: 'Vintergatan kartlagd. 400 miljarder stj\u00e4rnor. 400 miljarder produktionsnummer.',
    phase: 10,
  },
  {
    id: 'tick_dimension_portal',
    text: 'F\u00f6rsta dimensionsportalen \u00f6ppnad. Parallellt universum identiskt med v\u00e5rt. Dubbel oms\u00e4ttning.',
    phase: 11,
  },
  {
    id: 'tick_beta_miljororelse',
    text: 'I Universum Beta vann milj\u00f6r\u00f6relsen. Vi skickar konsulter.',
    phase: 11,
  },
  {
    id: 'tick_tidslinje',
    text: 'Tidslinje-korrektion godk\u00e4nd. Dinosauriernas skog avverkas retroaktivt. Historieforskare protesterar.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 50_000_000_000_000 },
  },
  {
    id: 'tick_entropi_hot',
    text: 'Entropi hotar produktionen. Aktieutdelningen f\u00f6rblir of\u00f6r\u00e4ndrad.',
    phase: 12,
  },
  {
    id: 'tick_sista_maskinen',
    text: 'Universum n\u00e5r termisk d\u00f6d. Sista h\u00e4ndelsen: en maskin s\u00f6ker efter tr\u00e4d att f\u00e4lla.',
    phase: 12,
    trigger: { type: 'totalStammar', value: 100_000_000_000_000 },
  },
  {
    id: 'tick_aktieagarna',
    text: 'Akte\u00e4garna fick sin utdelning. Allt annat \u00e4r detaljer. Allt annat \u00e4r borta.',
    phase: 12,
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
