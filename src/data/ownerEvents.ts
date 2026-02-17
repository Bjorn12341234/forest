// ── Silva Maximus — Owner (Skogsägare) Events ──
// Uses the same GameEvent structure as industry events.
// Conditions check owner-specific resources (skogsvardering, resiliens, etc.)

import type { GameEvent } from '../store/types'

export const OWNER_EVENTS: GameEvent[] = [
  // ── Early game narrative teaser ──
  {
    id: 'oe_grannens_kalavverkning',
    phase: 1,
    category: 'crisis',
    headline: 'Grannens kalavverkning',
    context: 'Du hör motorsågar från grannens mark. Maskinerna har kommit. En skördare, en skotare, en lastbil. Imorgon finns där 80 hektar stubbar och körspår. Överimorgon planterar de contorta.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 150 }],
    choices: [
      {
        label: 'Gå dit och titta',
        description: 'Du ser det med egna ögon. Stubbarna. Körskadorna. Tystnaden där fåglarna brukade sjunga. Du lär dig något.',
        effects: [
          { resource: 'kunskap', amount: 5, type: 'add' },
          { resource: 'legacy', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Stäng fönstret',
        description: 'Du hör motorsågarna ändå. Men din skog står kvar. Det räcker för idag.',
        effects: [
          { resource: 'resiliens', amount: 5, type: 'add' },
        ],
      },
    ],
  },

  {
    id: 'oe_stormen',
    phase: 1,
    category: 'crisis',
    headline: 'Stormen',
    context: 'En kraftig storm drar in över Ångermanland. Träd faller. Frågan är: vilka?',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 15_000 }],
    choices: [
      {
        label: 'Städa och sälj stormvirke',
        description: 'Du räddar det du kan. Snickaren köper de bästa stammarna.',
        effects: [
          { resource: 'inkomst', amount: 10_000, type: 'add' },
          { resource: 'deadwood', amount: -10, type: 'add' },
          { resource: 'resiliens', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Låt naturen läka sig',
        description: 'De fallna träden blir hem åt insekter, svampar och hackspettar. Skogen vet vad den gör.',
        effects: [
          { resource: 'resiliens', amount: 10, type: 'add' },
          { resource: 'biodivOwner', amount: 5, type: 'add' },
          { resource: 'deadwood', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_barkborre',
    phase: 1,
    category: 'crisis',
    headline: 'Granbarkborren',
    context: 'Insektsangrepp! Barkborren har hittat dina granar. Men din skog har fler trädslag än bara gran...',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 25_000 }],
    choices: [
      {
        label: 'Sanera drabbade träd',
        description: 'Du tar bort de angripna granarna och säljer virket. Snabbt och effektivt.',
        effects: [
          { resource: 'inkomst', amount: 5_000, type: 'add' },
          { resource: 'deadwood', amount: -5, type: 'add' },
          { resource: 'resiliens', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Ring biologen',
        description: 'Hon kommer och inventerar. Barkborren är mat åt tretåig hackspett. Hela näringskedjan lever.',
        effects: [
          { resource: 'kunskap', amount: 20, type: 'add' },
          { resource: 'biodivOwner', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Låt mångfalden göra sitt',
        description: 'Barkborren tar tre granar. Tallarna, björkarna, asparna står emot.',
        effects: [
          { resource: 'resiliens', amount: 15, type: 'add' },
          { resource: 'kunskap', amount: 10, type: 'add' },
          { resource: 'deadwood', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_turister',
    phase: 1,
    category: 'opportunity',
    headline: 'Japanska turister',
    context: 'Ett shinrin-yoku-företag vill använda din skog för "Forest Bathing". De betalar 2 000 kr per person. För att GÅ i din skog.',
    unique: true,
    conditions: [
      { resource: 'totalSkogsvardering', operator: '>=', value: 30_000 },
    ],
    choices: [
      {
        label: 'Välkommen till skogen',
        description: '+5 000 Inkomst. Massaindustrin hade betalat 200 kr per kubikmeter för att FÄLLA den.',
        effects: [
          { resource: 'inkomst', amount: 5_000, type: 'add' },
          { resource: 'legacy', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_snickaren',
    phase: 1,
    category: 'opportunity',
    headline: 'Snickaren ringer',
    context: 'En möbelsnickare i Hälsingland vill köpa ditt långsam-växta virke. Täta årsringar. Fin textur. Han betalar 3× massapriset.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 20_000 }],
    choices: [
      {
        label: 'Sälj virke till snickaren',
        description: '+8 000 Inkomst. Precis som din skog: hållbarhet i generationer.',
        effects: [
          { resource: 'inkomst', amount: 8_000, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_barnens_besok',
    phase: 1,
    category: 'opportunity',
    headline: 'Barnens besök',
    context: 'Din dotter pekar på lavskrikan. "Farfar, den bor ju HÄR!" Du nickar. "Ja. Det gör den. Och det kommer den göra när du tar över."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 40_000 }],
    choices: [
      {
        label: 'Visa henne skogen',
        description: '+50 Generationsarv. En stämning av stolthet sprider sig i bröstet.',
        effects: [
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_grannens_anger',
    phase: 1,
    category: 'opportunity',
    headline: 'Grannens ånger',
    context: 'Din granne kalavverkade för 10 år sen. Nu ser han din skog. "Det blev inte som inspektören lovade", säger han. Han tittar på sina 80 hektar stubbar och contortaplantage. "Kan du visa mig hur du gör?"',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 60_000 }],
    choices: [
      {
        label: 'Bjud in på studiebesök',
        description: 'En heldag i skogen. Du visar, förklarar, bjuder på kaffe. Han gråter lite vid den gamla tallen.',
        effects: [
          { resource: 'inkomst', amount: -2_000, type: 'add' },
          { resource: 'kunskap', amount: 40, type: 'add' },
          { resource: 'legacy', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Ge honom sticklingar',
        description: 'Björk, rönn, asp — allt som hans contortaplantage saknar. Det tar 20 år. Men det börjar.',
        effects: [
          { resource: 'biodivOwner', amount: 5, type: 'add' },
          { resource: 'legacy', amount: 25, type: 'add' },
          { resource: 'kunskap', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Visa honom',
        description: 'En kort promenad. Du pekar på tallarna, lavarna, hackspetten. Han nickar tyst. Du får en allierad.',
        effects: [
          { resource: 'kunskap', amount: 30, type: 'add' },
          { resource: 'legacy', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_skogsbrand',
    phase: 1,
    category: 'crisis',
    headline: 'Skogsbrand',
    context: 'Brand! Men ditt tjocka humuslager och fuktiga mark skyddar rötterna. Branden sveper genom, men träden överlever.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 50_000 }],
    choices: [
      {
        label: 'Söka katastrofbidrag',
        description: 'Länsstyrelsen beviljar stöd. Pengarna hjälper. Men blanketten kräver "återplantering enligt standard".',
        effects: [
          { resource: 'inkomst', amount: 15_000, type: 'add' },
          { resource: 'legacy', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Dokumentera och forska',
        description: 'Du mäter, fotograferar, antecknar. Brandens effekt på ekosystemet blir en studie i sig.',
        effects: [
          { resource: 'kunskap', amount: 40, type: 'add' },
          { resource: 'legacy', amount: 15, type: 'add' },
          { resource: 'deadwood', amount: 25, type: 'add' },
        ],
      },
      {
        label: 'Skogen återhämtar sig',
        description: 'Branden tog undervegetationen. Men rötterna lever. Du låter naturen sköta resten.',
        effects: [
          { resource: 'resiliens', amount: 20, type: 'add' },
          { resource: 'deadwood', amount: 15, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_universitetsstudie',
    phase: 1,
    category: 'opportunity',
    headline: 'Universitetsstudien',
    context: 'Forskare från SLU vill göra en långtidsstudie av din skog. Resultaten publiceras. Plockhuggning ger likvärdig ekonomisk avkastning. Biodiversitet: 400% högre. Industrin: "Metodologiska brister."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 100_000 }],
    choices: [
      {
        label: 'Bli medförfattare',
        description: 'Du lägger ner tid och pengar. Men ditt namn står på publikationen. Ingen kan säga att du inte förstår.',
        effects: [
          { resource: 'inkomst', amount: -5_000, type: 'add' },
          { resource: 'kunskap', amount: 150, type: 'add' },
          { resource: 'legacy', amount: 80, type: 'add' },
        ],
      },
      {
        label: 'Begär oberoende studie',
        description: 'Du insisterar på att forskarna inte tar industripengar. Det tar längre tid. Men resultaten är vattentäta.',
        effects: [
          { resource: 'kunskap', amount: 80, type: 'add' },
          { resource: 'legacy', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Släpp in forskarna',
        description: 'Du öppnar grinden och låter dem mäta. Nationell uppmärksamhet.',
        effects: [
          { resource: 'kunskap', amount: 100, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_kina_dumpning',
    phase: 1,
    category: 'opportunity',
    headline: 'Kinas massadumpning — men DU är trygg',
    context: 'Massapriserna kollapsar globalt. Dina grannar som sålde till industrin ringer i panik. Men du säljer inte massa. Du säljer virke till en möbelsnickare. Samma pris som förra året.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 8_000 }],
    choices: [
      {
        label: 'Drick kaffe och vänta',
        description: 'Ingen effekt på din inkomst. Så känns det att vara oberoende.',
        effects: [
          { resource: 'kunskap', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Kontakta möbelsnickare direkt',
        description: 'Du ringer tre snickare. En vill ha ek. En vill ha björk. Alla betalar bättre än massa.',
        effects: [
          { resource: 'inkomst', amount: 3_000, type: 'add' },
          { resource: 'kunskap', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_svt',
    phase: 1,
    category: 'opportunity',
    headline: 'SVT i din skog',
    context: 'SVT Vetenskap vill filma din skog som kontrast mot industrins metoder. Reportern frågar: "Varför ser det ut SÅ HÄR hos dig och SÅ HÄR hos grannarna?" Du pekar på dina 200-åriga tallar. Sedan på grannens rader av contorta. Bilden talar för sig själv.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 150_000 }],
    choices: [
      {
        label: 'Låt kameran filma',
        description: '+200 Kunskap, +100 Generationsarv. Nationell debatt.',
        effects: [
          { resource: 'kunskap', amount: 200, type: 'add' },
          { resource: 'legacy', amount: 100, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_nastly',
    phase: 1,
    category: 'opportunity',
    headline: 'Nastly-brevet',
    context: 'Nastly International kontaktar DIG direkt. De vill köpa virke från "verifierat hållbart skogsbruk" efter att ha brutit med industrin. Nastly — NASTLY! — det företag som sålde bröstmjölksersättning till fattiga mödrar — väljer DIG framför den svenska skogsindustrin. Tänk på det en sekund.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 200_000 }],
    choices: [
      {
        label: 'Acceptera ordern',
        description: '+50 000 Inkomst, +50 Generationsarv. Ironin bränner.',
        effects: [
          { resource: 'inkomst', amount: 50_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },

  // ── Multi-choice events (Sprint 8) ──────────────────────────────────

  {
    id: 'oe_grannens_mark',
    phase: 1,
    category: 'dilemma',
    headline: 'Grannens mark till salu',
    context:
      'Din granne har gått bort. Arvingarna bor i Stockholm och vill sälja. Skogsindustrins uppköpare har redan ringt — de erbjuder kontant betalning och "professionell förvaltning". 40 hektar gammal blandskog. Lavskrikor. Hänglav. Allt kan vara borta inom ett år.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 12_000 }],
    choices: [
      {
        label: 'Köp och skydda marken',
        description:
          'Du pantsätter stugan och köper. -15 000 Inkomst. Men 40 hektar urskog blir din. Lavskrikorna stannar.',
        effects: [
          { resource: 'inkomst', amount: -15_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'biodivOwner', amount: 10, type: 'add' },
          { resource: 'resiliens', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Låt industrin ta den',
        description:
          'Du har inte råd. Skördaren kommer i mars. Du hör motorsågarna genom fönstret.',
        effects: [
          { resource: 'biodivOwner', amount: -5, type: 'add' },
          { resource: 'resiliens', amount: -10, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_journalisten',
    phase: 1,
    category: 'opportunity',
    headline: 'Journalisten granskar',
    context:
      'En journalist från Dagens Nyheter ringer. Hon skriver en serie om "alternativt skogsbruk" och vill besöka din skog. Industrin har redan kontaktat henne och varnat för "oseriösa metoder". Hon vill höra din sida. Kameran är på.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 80_000 }],
    choices: [
      {
        label: 'Full transparens — visa allt',
        description:
          'Du visar bokföringen, skogsbruksplanen, biodiversitetsinventeringen. Allt. Hon publicerar allt. Industrin blir rasande.',
        effects: [
          { resource: 'legacy', amount: 100, type: 'add' },
          { resource: 'kunskap', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Styrd rundvandring',
        description:
          'Du visar de vackraste delarna. Undviker den del där granbarkborren tog tre träd. Artikeln blir fin men ytlig.',
        effects: [
          { resource: 'legacy', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Tacka nej',
        description:
          'Du vill sköta din skog i fred. Artikeln publiceras ändå — med industrins version som enda källa.',
        effects: [
          { resource: 'legacy', amount: -20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_eu_bidraget',
    phase: 1,
    category: 'dilemma',
    headline: 'EU-bidraget',
    context:
      'EU:s nya biodiversitetsprogram erbjuder 20 000 kr i stöd till "hållbart skogsbruk". Men villkoren kräver att du följer deras certifieringsstandard — som faktiskt skrevs av industrins lobbyister i Bryssel. Du måste acceptera "kontrollerad avverkning" på 15% av arealen.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 45_000 }],
    choices: [
      {
        label: 'Acceptera bidraget',
        description:
          '+20 000 Inkomst. Men du måste kompromissa. Industrins inspektörer får tillgång.',
        effects: [
          { resource: 'inkomst', amount: 20_000, type: 'add' },
          { resource: 'kunskap', amount: -20, type: 'add' },
        ],
      },
      {
        label: 'Stå fri',
        description:
          'Du behöver inte deras pengar. Du behöver inte deras regler. Din skog, dina villkor.',
        effects: [
          { resource: 'kunskap', amount: 30, type: 'add' },
          { resource: 'legacy', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_kommunens_markplan',
    phase: 1,
    category: 'crisis',
    headline: 'Kommunens markplan',
    context:
      'Kommunfullmäktige har röstat igenom en ny detaljplan. Din skog klassas som "potentiellt exploateringsområde" — de vill bygga en industripark. Lobbyisterna har jobbat hårt. Du har tre veckor att svara.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 110_000 }],
    choices: [
      {
        label: 'Anlita advokat och kämpa',
        description:
          '-5 000 Inkomst i advokatkostnader. Men du vinner i mark- och miljödomstolen. Ditt fall skapar prejudikat.',
        effects: [
          { resource: 'inkomst', amount: -5_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'kunskap', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Kompromissa — ge dem utkanten',
        description:
          'Du offrar kanten av skogen. Grävskoporna tar 10% av din mark. Resten är säker. Tills vidare.',
        effects: [
          { resource: 'skogsvardering', amount: 0.9, type: 'multiply' },
          { resource: 'inkomst', amount: 10_000, type: 'add' },
        ],
      },
      {
        label: 'Sälj hela parcellen',
        description:
          '+30 000 Inkomst. Men du ser betongfundamenten från köksfönstret resten av livet.',
        effects: [
          { resource: 'legacy', amount: -30, type: 'add' },
          { resource: 'inkomst', amount: 30_000, type: 'add' },
          { resource: 'biodivOwner', amount: -15, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_torkan',
    phase: 1,
    category: 'crisis',
    headline: 'Torkan',
    context:
      'Juli. Ingen regndroppe på sex veckor. Bäcken har sinat. Granarna gulnar. Björkarna tappar löv i förtid. Dina grannar ringer länsstyrelsen. Du tittar på dina träd och tänker.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 18_000 }],
    choices: [
      {
        label: 'Vattna de äldsta träden',
        description:
          '-8 000 Inkomst för vattentransport. De 200-åriga tallarna överlever. Rötterna håller marken.',
        effects: [
          { resource: 'inkomst', amount: -8_000, type: 'add' },
          { resource: 'resiliens', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Låt naturen bestämma',
        description:
          'Vissa träd dör. Det skapar ved åt insekterna, som föder hackspettarna. Cykeln fortsätter.',
        effects: [
          { resource: 'deadwood', amount: 10, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
          { resource: 'resiliens', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Gallra de svagaste och sälj',
        description:
          '+3 000 Inkomst. Men du tar bort precis de träd som insekterna behövde.',
        effects: [
          { resource: 'inkomst', amount: 3_000, type: 'add' },
          { resource: 'biodivOwner', amount: -10, type: 'add' },
          { resource: 'resiliens', amount: -10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_industrins_flygblad',
    phase: 1,
    category: 'crisis',
    headline: 'Industrins flygblad',
    context:
      'I alla brevlådor i socknen: "VARNING — Oansvarigt skogsbruk hotar jobb och tillväxt." Med en bild på DIN skog. Texten antyder att dina metoder sprider skadeinsekter till grannarna. Helt felaktigt. Men folk tror på tryckt text.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 55_000 }],
    choices: [
      {
        label: 'Skriva insändare',
        description:
          '+40 Kunskap, +20 Generationsarv. -5 000 Inkomst i förlorad arbetstid. Sanningen sprids.',
        effects: [
          { resource: 'kunskap', amount: 40, type: 'add' },
          { resource: 'legacy', amount: 20, type: 'add' },
          { resource: 'inkomst', amount: -5_000, type: 'add' },
        ],
      },
      {
        label: 'Ignorera',
        description:
          'Lögner dör av sig själva. Eller? Du lär dig att ibland gör de inte det.',
        effects: [
          { resource: 'kunskap', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Motkampanj med fakta',
        description:
          '-10 000 Inkomst för tryck och distribution. Men din version har källhänvisningar. Deras har inga.',
        effects: [
          { resource: 'inkomst', amount: -10_000, type: 'add' },
          { resource: 'legacy', amount: 60, type: 'add' },
          { resource: 'kunskap', amount: 30, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_stolden',
    phase: 1,
    category: 'crisis',
    headline: 'Stölden',
    context:
      'Du hittar färska stubbarna en morgon. Sju björkar. Borta. Motorsågsspår i snön leder mot vägen. Någon har olovligt avverkat på din mark. De tog de finaste stammarna.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 35_000 }],
    choices: [
      {
        label: 'Polisanmäl',
        description:
          'Utredningen tar månader. Men principen är viktig. +20 Kunskap, +10 Generationsarv.',
        effects: [
          { resource: 'kunskap', amount: 20, type: 'add' },
          { resource: 'legacy', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Konfrontera grannen',
        description:
          'Du vet vem det var. Det vet alla i byn. Samtalet blir obehagligt men ärligt. -10 Resiliens men +15 av vardera.',
        effects: [
          { resource: 'resiliens', amount: -10, type: 'add' },
          { resource: 'legacy', amount: 15, type: 'add' },
          { resource: 'kunskap', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Förlåt och gå vidare',
        description:
          'Stubbarna blir hem åt vedsvampar och insekter. Förlust blir mångfald.',
        effects: [
          { resource: 'deadwood', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_arvstvisten',
    phase: 1,
    category: 'crisis',
    headline: 'Arvstvisten',
    context:
      'Din bror ringer från Göteborg. Han vill ha ut sin del av arvet — i pengar. "Sälj till Holmen, vi delar. Det är värt miljoner." Han har anlitat advokat. Din fars skog. Din mors blåbärsställen. Syskonets matematik.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 130_000 }],
    choices: [
      {
        label: 'Köp ut honom',
        description:
          '-25 000 Inkomst. Du lånar av banken med skogen som säkerhet. Men skogen förblir hel.',
        effects: [
          { resource: 'inkomst', amount: -25_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'resiliens', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Dela skogen',
        description:
          'Lantmätaren drar ett streck genom fars mark. Din bror säljer sin halva till industrin nästa dag.',
        effects: [
          { resource: 'skogsvardering', amount: 0.85, type: 'multiply' },
          { resource: 'inkomst', amount: 10_000, type: 'add' },
        ],
      },
      {
        label: 'Juridisk strid',
        description:
          '-15 000 Inkomst i rättegångskostnader. Men du lär dig allt om skogsfastighetsrätt. Och du vinner.',
        effects: [
          { resource: 'inkomst', amount: -15_000, type: 'add' },
          { resource: 'kunskap', amount: 80, type: 'add' },
          { resource: 'legacy', amount: 30, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_rewilding',
    phase: 1,
    category: 'dilemma',
    headline: 'Rewilding-projektet',
    context:
      'Vargen har kommit tillbaka. Två valpar fotograferade med viltkameran vid bäcken. Länsstyrelsen ringer — de vill skydda reviret. Grannarna — jägarna — är rasande. Fårbonden hotade med hötjuga. Men vargen... vargen hör hit.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 70_000 }],
    choices: [
      {
        label: 'Välkomna vargen',
        description:
          '+60 Generationsarv, +20 Biodiversitet. Älgstammen balanseras. Grannarna slutar hälsa.',
        effects: [
          { resource: 'legacy', amount: 60, type: 'add' },
          { resource: 'biodivOwner', amount: 20, type: 'add' },
          { resource: 'resiliens', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Håll tyst och se vad som händer',
        description:
          'Du varken hjälper eller hindrar. Vargen flyttar vidare efter vintern. Du lärde dig något.',
        effects: [
          { resource: 'kunskap', amount: 5, type: 'add' },
          { resource: 'legacy', amount: -10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_skolklassen',
    phase: 1,
    category: 'opportunity',
    headline: 'Skolklassen',
    context:
      'Fjärdeklassarna i Bredbyn vill besöka "den riktiga skogen". Fröken förklarar att barnen aldrig sett en skog som INTE är en monokultur. De tror att skog = raka rader av gran. Du tittar ut genom fönstret på dina blandade bestånd. Dessa barn behöver se det här.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 22_000 }],
    choices: [
      {
        label: 'Heldag i skogen',
        description:
          '-2 000 Inkomst i förlorad arbetstid. Men en pojke pekar på en tretåig hackspett och skriker av glädje. Värt varje krona.',
        effects: [
          { resource: 'inkomst', amount: -2_000, type: 'add' },
          { resource: 'legacy', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Kort besök',
        description:
          'En timme. Du visar tallarna, förklarar plockhuggning, ger dem kottar att ta med hem.',
        effects: [
          { resource: 'legacy', amount: 10, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_bokforlaget',
    phase: 1,
    category: 'opportunity',
    headline: 'Bokförlaget',
    context:
      'Natur & Kultur ringer. De vill ge ut en bok: "Skogen som blev kvar — en skogsägares uppror mot kalhyggesbruket." Du tänker på allt du lärt dig. Alla strider. Alla tidiga morgnar i dimman mellan tallarna. Kanske är det dags att skriva ner det.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 160_000 }],
    choices: [
      {
        label: 'Skriv boken',
        description:
          '-10 000 Inkomst i förlorad arbetstid. Men 300 sidor sanning. +150 Generationsarv, +80 Kunskap. Boken blir kurslitteratur på SLU.',
        effects: [
          { resource: 'inkomst', amount: -10_000, type: 'add' },
          { resource: 'legacy', amount: 150, type: 'add' },
          { resource: 'kunskap', amount: 80, type: 'add' },
        ],
      },
      {
        label: 'Snabbguide istället',
        description:
          'En kort handbok: "10 steg till levande skog." Mindre jobb, mindre genomslag.',
        effects: [
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'kunskap', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Tacka nej',
        description:
          'Skogen talar för sig själv. Du behöver inte förklara den med ord. Förlaget betalar tillbaka förskottet.',
        effects: [
          { resource: 'inkomst', amount: 5_000, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_internationella_gaster',
    phase: 1,
    category: 'opportunity',
    headline: 'Internationella gäster',
    context:
      'En delegation från Brasilien, Costa Rica och Finland vill studera "den skandinaviska modellen för alternativt skogsbruk". De har läst om dig i en vetenskaplig tidskrift. Tolv personer. Tre dagar. De vill se, mäta, dokumentera. Och de vill förstå HUR du stod emot industrin.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 90_000 }],
    choices: [
      {
        label: 'Full värdskap i tre dagar',
        description:
          '-8 000 Inkomst för mat, boende, transport. Men delegationen sprider dina metoder till tre kontinenter.',
        effects: [
          { resource: 'inkomst', amount: -8_000, type: 'add' },
          { resource: 'legacy', amount: 100, type: 'add' },
          { resource: 'kunskap', amount: 40, type: 'add' },
        ],
      },
      {
        label: 'Kort rundtur',
        description:
          'En halvdag. Du visar höjdpunkterna. De nickar artigt. Rapporten nämner dig i en fotnot.',
        effects: [
          { resource: 'legacy', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: 15, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_podcasten',
    phase: 1,
    category: 'opportunity',
    headline: 'Podcasten',
    context:
      'Sveriges mest populära miljöpodd — "Rotstock" med 200 000 lyssnare — vill ha dig som gäst. Producenten säger: "Var ärlig. Våra lyssnare genomskådar PR." Alternativt har en branschpodd sponsrad av SCA erbjudit dig 10 000 kr för ett "balanserat" samtal.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 65_000 }],
    choices: [
      {
        label: 'Rotstock — ärligt och rått',
        description:
          'Du berättar om hotbreven, om flygbladen, om natten du grät i skogen. -3 000 Inkomst i resor. Men 200 000 personer hör sanningen.',
        effects: [
          { resource: 'legacy', amount: 70, type: 'add' },
          { resource: 'kunskap', amount: 30, type: 'add' },
          { resource: 'inkomst', amount: -3_000, type: 'add' },
        ],
      },
      {
        label: 'Branschpodden — polerat och betalt',
        description:
          '+10 000 Inkomst i sponsorpengar. Du pratar om "samverkan" och "dialog". Alla ler. Ingen förändras.',
        effects: [
          { resource: 'legacy', amount: 30, type: 'add' },
          { resource: 'inkomst', amount: 10_000, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_samisk_samverkan',
    phase: 1,
    category: 'opportunity',
    headline: 'Samisk samverkan',
    context:
      'En renskötare från Vilhelmina sameby kommer förbi. Han har hört om din skog — att lavarna fortfarande växer där, att marken inte är sönderkörd. "Våra renar behöver vinterbete", säger han. "Industrin har tagit allt annat." Han tittar på dina hänglav-klädda granar. "Det här... det här är det enda som finns kvar."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 140_000 }],
    choices: [
      {
        label: 'Full samverkan',
        description:
          '-5 000 Inkomst i anpassningar. Men du lär dig 8 000 års kunskap om markskötsel. Renarna håller undervegetationen i schack. Samarbetet blir en modell.',
        effects: [
          { resource: 'inkomst', amount: -5_000, type: 'add' },
          { resource: 'legacy', amount: 80, type: 'add' },
          { resource: 'biodivOwner', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Begränsat avtal',
        description:
          'Vinterbete på norra delen. Du vill hjälpa men kan inte ge allt. Han nickar. "Det är mer än någon annan erbjudit."',
        effects: [
          { resource: 'legacy', amount: 30, type: 'add' },
          { resource: 'kunskap', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_sista_brevet',
    phase: 1,
    category: 'crisis',
    headline: 'Sista brevet',
    context:
      'Rekommenderat brev. Tjockt kuvert. Industrins logga. Inuti: ett erbjudande. 200 000 kronor. Kontant. För hela skogen. De har räknat ut att det är billigare att köpa dig än att förlora debatten. Sista raden: "Erbjudandet gäller i 48 timmar." Du tittar ut genom fönstret. Tallarna vajar i vinden. De har stått där längre än industrin funnits.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 220_000 }],
    choices: [
      {
        label: 'Acceptera — ta pengarna',
        description:
          '+200 000 Inkomst. All skogsvärdring till noll. -500 Generationsarv. Du kan aldrig gå tillbaka till den skogen.',
        effects: [
          { resource: 'skogsvardering', amount: 0, type: 'set' },
          { resource: 'inkomst', amount: 200_000, type: 'add' },
          { resource: 'legacy', amount: -500, type: 'add' },
        ],
      },
      {
        label: 'Riv brevet',
        description:
          '+200 Generationsarv, +100 Kunskap. Du tänder en eld med brevet. Tallarna vajar. De vet.',
        effects: [
          { resource: 'legacy', amount: 200, type: 'add' },
          { resource: 'kunskap', amount: 100, type: 'add' },
        ],
      },
    ],
  },

  // ── Generationsberättelsen ──

  {
    id: 'oe_farfars_arv',
    phase: 1,
    category: 'opportunity',
    headline: 'Farfars arv',
    context: 'Du hittar farfars anteckningar i en byrålåda. Gulnade papper. Handskrivet. "Tall #47 — planterad 1923 av min far. Får aldrig fällas." Du tittar ut genom fönstret. Tall #47 står fortfarande där. 100 år gammal. Industrin hade tagit den på en förmiddag.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 3_000 }],
    choices: [
      {
        label: 'Läs varje sida',
        description: 'Tre generationers kunskap. Vad som blommar, vad som dör, var älgen kalvar. +40 Kunskap, +30 Generationsarv.',
        effects: [
          { resource: 'kunskap', amount: 40, type: 'add' },
          { resource: 'legacy', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Börja skriva dina egna anteckningar',
        description: 'Du köper en ny anteckningsbok. Första raden: "Tall #47 — fortfarande här." +20 Kunskap, +50 Generationsarv.',
        effects: [
          { resource: 'kunskap', amount: 20, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_familjen_vaxer',
    phase: 1,
    category: 'opportunity',
    headline: 'Familjen växer',
    context: 'Ditt barn föds en vintermorgon. Snö på granarna utanför fönstret. Du tänker: den där tallen som farfar planterade — mitt barn kommer se den bli 150 år. Och deras barn kommer se den bli 200. Om du låter den stå.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 10_000 }],
    choices: [
      {
        label: 'Plantera ett träd för barnet',
        description: 'En ek. Den kommer stå i 300 år om allt går rätt. +10 Skogsvärd, +15 Biodiv, +40 Generationsarv.',
        effects: [
          { resource: 'skogsvardering', amount: 10, type: 'add' },
          { resource: 'biodivOwner', amount: 15, type: 'add' },
          { resource: 'legacy', amount: 40, type: 'add' },
        ],
      },
      {
        label: 'Öppna sparkonto för skogen',
        description: 'Du sätter undan 3 000 kr. Inte till barnet — till skogen. Så den aldrig behöver säljas. -3 000 Inkomst, +60 Generationsarv.',
        effects: [
          { resource: 'inkomst', amount: -3_000, type: 'add' },
          { resource: 'legacy', amount: 60, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_barnets_forsta_skogsdag',
    phase: 1,
    category: 'opportunity',
    headline: 'Barnets första skogsdag',
    context: 'Treåringen tar sitt första steg i skogen utan att hålla din hand. Plockar upp en kotte. Tittar på en myra. Frågar: "Bor myran här?" Du nickar. "Ja, myran bor här. Och det gör lavskrikan. Och grävlingen. Och vi."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 28_000 }],
    choices: [
      {
        label: 'Visa hela skogen',
        description: 'Ni går i tre timmar. Barnet somnar i bärstolen vid den gamla tallen. +25 Generationsarv, +10 Kunskap.',
        effects: [
          { resource: 'legacy', amount: 25, type: 'add' },
          { resource: 'kunskap', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Märk ett träd med barnets namn',
        description: 'En björk. "Det här är ditt träd." Barnet kramar stammen. +35 Generationsarv, +5 Biodiv.',
        effects: [
          { resource: 'legacy', amount: 35, type: 'add' },
          { resource: 'biodivOwner', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_tonarsuppror',
    phase: 1,
    category: 'crisis',
    headline: 'Tonårsupproret',
    context: '"Varför ska vi bo HÄR? I SKOGEN? Alla andra bor i stan!" Din tonåring ser inte lavskrikan. Inte de 200-åriga tallarna. Inte farfars anteckningar. Bara avstånd, ensamhet och dålig wifi.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 75_000 }],
    choices: [
      {
        label: 'Ge det tid',
        description: 'Du säger inget. Visar bara. Nästa sommar sitter hen vid bäcken och läser. +10 Kunskap, +20 Generationsarv.',
        effects: [
          { resource: 'kunskap', amount: 10, type: 'add' },
          { resource: 'legacy', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Visa farfars anteckningar',
        description: '"Titta. Din farfars farfar planterade det där trädet." Tonåringen bläddrar tyst. Tre timmar senare frågar hen: "Kan du lära mig?" +40 Kunskap, +50 Generationsarv.',
        effects: [
          { resource: 'kunskap', amount: 40, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_overlamningen',
    phase: 1,
    category: 'opportunity',
    headline: 'Överlämningen',
    context: 'Ditt barn är vuxet nu. Står bredvid dig vid den gamla tallen. Farfars tall. Du ger hen anteckningsboken — din, med farfars papper inklistrade. "Din tur nu." Hen bläddrar. Nickar. "Jag vet. Jag har vetat länge."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 180_000 }],
    choices: [
      {
        label: 'Lämna över nyckeln',
        description: 'Ditt barn tar vid. Samma skog. Samma metoder. Fjärde generationen. +200 Generationsarv, +50 Kunskap.',
        effects: [
          { resource: 'legacy', amount: 200, type: 'add' },
          { resource: 'kunskap', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Gå en sista runda tillsammans',
        description: 'Ni märker tre nya ekar. En för varje barnbarn. "De får aldrig fällas." +150 Generationsarv, +30 Biodiv, +30 Resiliens.',
        effects: [
          { resource: 'legacy', amount: 150, type: 'add' },
          { resource: 'biodivOwner', amount: 30, type: 'add' },
          { resource: 'resiliens', amount: 30, type: 'add' },
        ],
      },
    ],
  },
]
