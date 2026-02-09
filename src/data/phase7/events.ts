import type { GameEvent } from '../../store/types'

export const PHASE7_EVENTS: GameEvent[] = [
  // ── Phase 7: Kolonialt Ramverk ──
  {
    id: 'p7_finlandia_motstand',
    phase: 7,
    category: 'crisis',
    headline: 'Finlandia v\u00e4grar avverkningslicens',
    context: 'Finland \u2014 er n\u00e4rmaste allierade \u2014 v\u00e4grar ge Silva Maximus avverkningslicens f\u00f6r karelska skogarna. "Vi har vart eget skogsbruk, tack." Nordiska r\u00e5det \u00e4r splittrat.',
    choices: [
      {
        label: 'Ekonomiskt tryck',
        description: 'St\u00e4ng massaexporten till Finland. De beh\u00f6ver oss mer \u00e4n vi dem.',
        effects: [
          { resource: 'stammar', amount: -5_000_000, type: 'add' },
          { resource: 'kapital', amount: 2_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'K\u00f6p finska skogsbolag bakv\u00e4gen',
        description: 'Holdingbolag i Estland. Ingen sp\u00e5rbarhet.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 10_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Acceptera Finlands nej',
        description: 'Det finns svagare l\u00e4nder att b\u00f6rja med.',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_exportera_modellen',
    phase: 7,
    category: 'opportunity',
    headline: 'Den svenska modellen exporteras',
    context: 'V\u00e4rldsbanken erbjuder er att "r\u00e5dge" 15 utvecklingsl\u00e4nder om "h\u00e5llbart skogsbruk". Er modell: kalhygge, monokultur, greenwashing. Paketet kallas "Nordic Forest Solutions\u2122".',
    choices: [
      {
        label: 'Exportera fullt ut',
        description: 'Alla l\u00e4nder ska se ut som Norrland. Bara gran.',
        effects: [
          { resource: 'stammar', amount: 20_000_000, type: 'add' },
          { resource: 'kapital', amount: 5_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Licensiera varumärket',
        description: 'S\u00e4lj namnet "Swedish Forestry Model" utan att g\u00f6ra n\u00e5got',
        effects: [
          { resource: 'kapital', amount: 3_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 12_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_korruption_baltiska',
    phase: 7,
    category: 'scandal',
    headline: 'Baltiska mutor',
    context: 'Intern revision avsl\u00f6jar att er Baltikum-chef har betalat 2 miljoner euro i mutor till lettiska och litauiska tj\u00e4nstem\u00e4n f\u00f6r avverkningsr\u00e4tter. Han kallar det "konsultarvoden".',
    choices: [
      {
        label: '"Vi kände inte till det"',
        description: 'Avskeda chefen. Beh\u00e5ll licenserna.',
        effects: [
          { resource: 'kapital', amount: -2_000_000, type: 'add' },
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Formalisera systemet',
        description: '"Lokala partnerskapsprogram" \u2014 samma mutor, ny rubrik',
        effects: [
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
          { resource: 'stammar', amount: 10_000_000, type: 'add' },
          { resource: 'lobby', amount: -100, type: 'add' },
        ],
      },
      {
        label: 'Anm\u00e4l er sj\u00e4lva till Ekobrottsmyndigheten',
        description: 'Visa transparens. F\u00e5 mildare straff. Beh\u00e5ll PR-poäng.',
        effects: [
          { resource: 'kapital', amount: -3_000_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_ngo_koalition',
    phase: 7,
    category: 'crisis',
    headline: 'Internationell NGO-koalition',
    context: '500 milj\u00f6organisationer fr\u00e5n 80 l\u00e4nder har bildat "Stop Silva Maximus Coalition". De har en hemsida, en hashtag (#StopSilva) och 12 miljoner f\u00f6ljare. De har inga pengar. Ni har alla pengar.',
    choices: [
      {
        label: 'Infiltrera koalitionen',
        description: 'Placera "oberoende" f\u00f6retr\u00e4dare i styrelsen',
        effects: [
          { resource: 'kapital', amount: -500_000, type: 'add' },
          { resource: 'lobby', amount: 150, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Starta motkoalition: "Forests for People"',
        description: '50 branschorganisationer. "Oberoende." Finansierade av er.',
        effects: [
          { resource: 'kapital', amount: -2_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Ignorera dem',
        description: 'NGO:er f\u00f6rsvinner. Skogsbolag best\u00e5r.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 18_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_handelsavtal_tvang',
    phase: 7,
    category: 'opportunity',
    headline: 'Handelsavtal med tv\u00e5ngsklausul',
    context: 'EU f\u00f6rhandlar handelsavtal med afrikanska l\u00e4nder. Er lobbyist har lyckats inf\u00f6ra en klausul: alla l\u00e4nder m\u00e5ste \u00f6ppna sina skogar f\u00f6r "nordisk skogsteknik". Ingen l\u00e4ste det finstilta.',
    choices: [
      {
        label: 'Aktivera klausulen omedelbart',
        description: '14 l\u00e4nders skogar \u00e4r nu er marknad',
        effects: [
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'kapital', amount: 3_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -3, type: 'add' },
        ],
      },
      {
        label: 'Gradvis implementering',
        description: 'Ett land i taget. Mindre uppm\u00e4rksamhet.',
        effects: [
          { resource: 'stammar', amount: 8_000_000, type: 'add' },
          { resource: 'kapital', amount: 2_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_urfolk_allians',
    phase: 7,
    category: 'crisis',
    headline: 'Urfolkens globala allians',
    context: 'Samer, Maori, Yanomami, Ogoni och 200 andra urfolksgrupper har bildat "Indigenous Forest Guardians". De har FN:s st\u00f6d. De har internationell lag p\u00e5 sin sida. Er juridiska avdelning letar kryphål.',
    choices: [
      {
        label: 'Omdefiniera "urfolk"',
        description: 'Om alla \u00e4r urfolk \u00e4r ingen urfolk. Lobba f\u00f6r snävare definition.',
        effects: [
          { resource: 'lobby', amount: -200, type: 'add' },
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'samiLand', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Skapa "urfolkspartnerskap"',
        description: 'Ge 0.1% av vinsten. Kalla det "historisk ers\u00e4ttning".',
        effects: [
          { resource: 'kapital', amount: -500_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Respektera deras markr\u00e4tter',
        description: 'F\u00f6rlora 30% av planerad expansion. Ov\u00e4ntat etiskt.',
        effects: [
          { resource: 'stammar', amount: -10_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'biodiversity', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 25_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_gallien_revolution',
    phase: 7,
    category: 'absurd',
    headline: 'Galliens skogsrevolution',
    context: 'Franska bönder har blockerat alla hamnar med traktorer. Anledningen: Silva Maximus planterade gran på en vinodling i Bordeaux. "GRAND NON!" skanderar de. Macron ringer personligen.',
    choices: [
      {
        label: '"Gran \u00e4r b\u00e4ttre \u00e4n vin"',
        description: 'En kontroversiell \u00e5sikt i Frankrike',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
        ],
      },
      {
        label: 'Dra tillbaka fr\u00e5n Bordeaux',
        description: 'Avverka i Bretagne ist\u00e4llet. Ingen bryr sig om Bretagne.',
        effects: [
          { resource: 'stammar', amount: 3_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Erbjud vinb\u00f6nderna jobb som skogsarbetare',
        description: '"Grand Cru-avverkning" \u2014 premiumtimmer med terroir',
        effects: [
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
          { resource: 'stammar', amount: 8_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_kolonialt_certifikat',
    phase: 7,
    category: 'contradiction',
    headline: 'Kolonialt certifikat',
    context: 'Ni har skapat ert eget internationella certifieringssystem: "Silva Standard International\u2122". Det certifierar att skogsbruk bedrivs enligt "svensk modell". Certifieraren: ni sj\u00e4lva. Resultatet: 100% godk\u00e4nt.',
    choices: [
      {
        label: 'Marknadsf\u00f6r aggressivt',
        description: '"Guldstandarden f\u00f6r h\u00e5llbart skogsbruk" \u2014 s\u00e4ger ni',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
        ],
      },
      {
        label: 'L\u00e5t andra l\u00e4nder "ansluta sig"',
        description: 'Medlemsavgift: 500 000 EUR. F\u00f6rm\u00e5n: en logotyp.',
        effects: [
          { resource: 'kapital', amount: 3_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 35_000_000_000 }],
    unique: true,
  },

  // ── Phase 8: Global Dominans ──
  {
    id: 'p8_amazonia_brand',
    phase: 8,
    category: 'crisis',
    headline: 'Amazonia brinner',
    context: 'Amazonas brinner \u2014 igen. Den h\u00e4r g\u00e5ngen \u00e4r det era underentrepren\u00f6rer som "r\u00f6jde" 50 000 hektar. Satelliterna ser allt. Brasilien skyller p\u00e5 er. Ni skyller p\u00e5 klimatf\u00f6r\u00e4ndringar.',
    choices: [
      {
        label: 'Plantera gran p\u00e5 den br\u00e4nda marken',
        description: '"Restaurering." 50 000 hektar monokultur.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Donera till "regnskogsfonden"',
        description: 'Er egen fond. Pengarna g\u00e5r tillbaka till er.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'K\u00f6p marken billigt medan det brinner',
        description: 'Brandrea. 90% rabatt.',
        effects: [
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'stammar', amount: 80_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_kongolien_kuppmakare',
    phase: 8,
    category: 'scandal',
    headline: 'Kongoliens kuppmakare',
    context: 'L\u00e4ckt dokumentation visar att Silva Maximus finansierade en statskupp i Demokratiska Republiken Kongo. Syftet: tillg\u00e5ng till 150 miljoner hektar regnskog. Den nye presidenten talar svenska.',
    choices: [
      {
        label: '"Vi st\u00f6djer demokrati"',
        description: 'Demokrati \u00e4r n\u00e4r folket v\u00e4ljer den vi finansierar',
        effects: [
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: -300, type: 'add' },
        ],
      },
      {
        label: 'F\u00f6rneka allt',
        description: '"Ingen kommentar. V\u00e5r advokat heter Lindqvist."',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
        ],
      },
      {
        label: '\u00c5terg\u00e5 till diplomati',
        description: 'St\u00e4ng ner operationen. F\u00f6rlora investeringen.',
        effects: [
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 120_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_siberien_permafrost',
    phase: 8,
    category: 'opportunity',
    headline: 'Siberiens permafrost sm\u00e4lter',
    context: 'Klimatf\u00f6r\u00e4ndringarna har sm\u00e4lt Siberiens permafrost. 500 miljoner hektar ny skogsmark. Ryssland \u00e4r f\u00f6r upptaget med annat f\u00f6r att bry sig. Er skördare \u00e4r redan p\u00e5 plats.',
    choices: [
      {
        label: 'Kolonisera den sm\u00e4lta tundran',
        description: 'Gran i permafrosten. Ironin \u00e4r inte f\u00f6rlorad p\u00e5 n\u00e5gon.',
        effects: [
          { resource: 'stammar', amount: 80_000_000, type: 'add' },
          { resource: 'realCO2', amount: 500, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Joint venture med ryska oligarker',
        description: 'De tar 60%. Ni tar skogen.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'kapital', amount: -15_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 150_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_global_bojkott',
    phase: 8,
    category: 'crisis',
    headline: 'Global konsumentbojkott',
    context: '40 l\u00e4nders konsumenter bojkottar alla Silva Maximus-produkter. Hashtag: #BoycottSilva. Problem: ni \u00e4ger s\u00e5 m\u00e5nga varumärken att konsumenterna inte vet vad de ska bojkotta.',
    choices: [
      {
        label: 'Starta fler undervarumärken',
        description: '50 nya namn. Samma cellulosa. Ingen sp\u00e5rbarhet.',
        effects: [
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'S\u00e4nk priserna drastiskt',
        description: 'Bojkotten d\u00f6r n\u00e4r priset \u00e4r r\u00e4tt. Alla har ett pris.',
        effects: [
          { resource: 'kapital', amount: -25_000_000, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'V\u00e4nta ut bojkotten',
        description: 'Konsumenter gl\u00f6mmer. De gl\u00f6mmer alltid.',
        effects: [
          { resource: 'stammar', amount: -20_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_handelskrig',
    phase: 8,
    category: 'crisis',
    headline: 'Handelskriget om cellulosa',
    context: 'Kina, USA och EU f\u00f6r handelskrig om cellulosa. Tullar p\u00e5 300%. Ert svar: \u00f6ppna fabriker i alla tre blocken. Trippla kostnaderna. Men trippla kontrollen.',
    choices: [
      {
        label: 'Expandera till alla tre blocken',
        description: 'Tre fabriker. Tre bokf\u00f6ringar. Noll skatt.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'stammar', amount: 70_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Spela blocken mot varandra',
        description: 'S\u00e4lj till h\u00f6gstbjudande. Byt sida varje kvartal.',
        effects: [
          { resource: 'kapital', amount: 30_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 250_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_kanadien_motstand',
    phase: 8,
    category: 'crisis',
    headline: 'Kanadiens ursprungsfolk',
    context: 'First Nations-grupper i British Columbia har barrikaderat alla vägar till era avverkningsomr\u00e5den. De har folkr\u00e4tten p\u00e5 sin sida. Er sk\u00f6rdare st\u00e5r still. Varje dag kostar 2 miljoner.',
    choices: [
      {
        label: 'Anl\u00e4gg alternativ v\u00e4g genom skogen',
        description: 'Avverka en ny v\u00e4g runt barrikaden. Problem l\u00f6st.',
        effects: [
          { resource: 'kapital', amount: -15_000_000, type: 'add' },
          { resource: 'stammar', amount: 40_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'samiLand', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Erbjud "Revenue Sharing Agreement"',
        description: '2% av vinsten. 98% av skogen.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 25_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_indonesien_tsunami',
    phase: 8,
    category: 'opportunity',
    headline: 'Indonesisk naturkatastrof',
    context: 'En tsunami har \u00f6delagt Sumatras kust. Skogsmark s\u00e4ljs f\u00f6r en br\u00e5kdel. Lokala \u00e4gare beh\u00f6ver pengar desperat. Er ink\u00f6psavdelning kallar det "strategisk m\u00f6jlighet".',
    choices: [
      {
        label: 'K\u00f6p allt till katastrofpris',
        description: '10 cent per hektar. "Marknadspris vid tidpunkten."',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'K\u00f6p till "r\u00e4ttvist" pris',
        description: '50% under marknadspris. Fortfarande en deal.',
        effects: [
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
          { resource: 'stammar', amount: 40_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Donera till katastrofhj\u00e4lp',
        description: 'F\u00f6rv\u00e5nande. Misstänkt. Men bra PR.',
        effects: [
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 350_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_fn_tribunal',
    phase: 8,
    category: 'scandal',
    headline: 'FN:s milj\u00f6tribunal',
    context: 'FN:s nya milj\u00f6tribunal \u00e5talar Silva Maximus f\u00f6r "ekocid" \u2014 systematisk f\u00f6rst\u00f6relse av ekosystem i 23 l\u00e4nder. Straff: upp till 50 miljarder kr. Er advokat: "FN har ingen verkst\u00e4llighet."',
    choices: [
      {
        label: 'Ignorera tribunalen',
        description: 'De har ingen arm\u00e9. Vi har sk\u00f6rdare.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
      {
        label: 'Skicka juridiskt team',
        description: '200 advokater. F\u00f6rdr\u00f6j processen i 15 \u00e5r.',
        effects: [
          { resource: 'kapital', amount: -30_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'F\u00f6rlikning: betala och forts\u00e4tt',
        description: '10 miljarder kr. Billigare \u00e4n att sluta.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 400_000_000_000 }],
    unique: true,
  },

  // ── Phase 9: Jordens Sista Skog ──
  {
    id: 'p9_chinova_avtal',
    phase: 9,
    category: 'opportunity',
    headline: 'Chinovas hemliga avtal',
    context: 'Folkrepubliken Chinova erbjuder ett hemligt avtal: obegr\u00e4nsad tillg\u00e5ng till hela Inre Mongoliets skogar i utbyte mot "teknologiöverf\u00f6ring". Avtalet skrivs p\u00e5 ett hotellrum i Macau. Inga vittnen.',
    choices: [
      {
        label: 'Signera avtalet',
        description: 'En miljard hektar. Inga journalister. Inga NGO:er.',
        effects: [
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Kr\u00e4v b\u00e4ttre villkor',
        description: '"60/40 i v\u00e5r fav\u00f6r. Annars g\u00e5r vi till Indien."',
        effects: [
          { resource: 'stammar', amount: 300_000_000, type: 'add' },
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'L\u00e4cka avtalet till Washington',
        description: 'USA betalar mer f\u00f6r att ni INTE signerar',
        effects: [
          { resource: 'kapital', amount: 200_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_sista_regnskogen',
    phase: 9,
    category: 'absurd',
    headline: 'Jordens sista regnskog',
    context: 'Det finns en regnskog kvar. 847 hektar i Papua Nya Guinea. Den sista. UNESCO vill skydda den. Er styrelse vill "effektivisera" den. Hela v\u00e4rlden tittar.',
    choices: [
      {
        label: 'Avverka den',
        description: '100% global t\u00e4ckningsgrad. Inga undantag.',
        effects: [
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -10, type: 'add' },
          { resource: 'species', amount: 500, type: 'add' },
        ],
      },
      {
        label: 'G\u00f6r den till museum',
        description: '"Skogens Minnespark\u2122" \u2014 ingång 500 kr. Klimatstyrt.',
        effects: [
          { resource: 'kapital', amount: 100_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'K\u00f6p den och l\u00e5s in den',
        description: '"Silva Maximus Natural Reserve." \u00d6ppet aldrig.',
        effects: [
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_klimatflyktingar',
    phase: 9,
    category: 'crisis',
    headline: 'Klimatflyktingar blockerar fabriker',
    context: '200 000 klimatflyktingar fr\u00e5n \u00f6versv\u00e4mmade \u00f6-nationer har slagit l\u00e4ger utanf\u00f6r era tre st\u00f6rsta massafabriker. De h\u00e4vdar att er avskogning bidrog till att deras hem f\u00f6rsvann. Produktionen har stannat.',
    choices: [
      {
        label: 'Flytta fabrikerna',
        description: 'Bygga nya fabriker d\u00e4r det inte finns flyktingar. \u00c4nnu.',
        effects: [
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
        ],
      },
      {
        label: 'Anst\u00e4ll flyktingarna',
        description: 'Billig arbetskraft. Kalla det "integration".',
        effects: [
          { resource: 'stammar', amount: 300_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Bygg bost\u00e4der \u00e5t dem',
        description: 'Av tr\u00e4 fr\u00e5n era fabriker. Cirkul\u00e4r ekonomi.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_biodiversitet_noll',
    phase: 9,
    category: 'absurd',
    headline: 'Biodiversitet: 0%',
    context: 'FN:s biodiversitetsindex har n\u00e5tt noll. Det finns bara gran. \u00d6verallt. Inga f\u00e5glar. Inga insekter. Inga svampar. Bara raka rader av identiska tr\u00e4d s\u00e5 l\u00e5ngt \u00f6gat kan se.',
    choices: [
      {
        label: '"Gran \u00c4R biodiversitet"',
        description: 'Omdefiniera begreppet. Det finns tio gransorter.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'stammar', amount: 400_000_000, type: 'add' },
        ],
      },
      {
        label: 'Klona utd\u00f6da arter',
        description: 'DNA fr\u00e5n museer. \u00c5terskapa 5 arter. Av 8 miljoner.',
        effects: [
          { resource: 'kapital', amount: -300_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'biodiversity', amount: 1, type: 'add' },
        ],
      },
    ],
    conditions: [
      { resource: 'totalStammar', operator: '>=', value: 5_000_000_000_000 },
      { resource: 'biodiversity', operator: '<=', value: 5 },
    ],
    unique: true,
  },
  {
    id: 'p9_automatiserad_koloni',
    phase: 9,
    category: 'opportunity',
    headline: 'Helautomatiserad koloni',
    context: 'Er AI-avdelning presenterar "Projekt Tyst Skog": helautomatiserade avverkningskolonier utan en enda m\u00e4nniska. Robotar planterar, sk\u00f6rdar och transporterar. Inga l\u00f6ner. Inga fackf\u00f6rbund. Inga samveten.',
    choices: [
      {
        label: 'Implementera globalt',
        description: 'Ers\u00e4tt all m\u00e4nsklig personal. 100% automatisering.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
        ],
      },
      {
        label: 'Beh\u00e5ll en m\u00e4nniska per kontinent',
        description: 'F\u00f6r att trycka p\u00e5 n\u00f6dstoppknappen. Om den finns.',
        effects: [
          { resource: 'stammar', amount: 700_000_000, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 7_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_jordens_kvitto',
    phase: 9,
    category: 'absurd',
    headline: 'Jordens kvitto',
    context: 'En mystisk faktura anl\u00e4nder till huvudkontoret. Avs\u00e4ndare: "Jorden." Belopp: 847 biljoner kr f\u00f6r "ekosystemtj\u00e4nster, ren luft, rent vatten och 4.5 miljarder \u00e5rs evolution." Förfallodatum: ig\u00e5r.',
    choices: [
      {
        label: 'Bestrida fakturan',
        description: '"Jorden \u00e4r inte en juridisk person. Fakturan \u00e4r ogiltig."',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
        ],
      },
      {
        label: 'Betala en symbolisk summa',
        description: '1 krona. "Vi tar v\u00e5rt ansvar."',
        effects: [
          { resource: 'kapital', amount: -1, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Skicka motfaktura',
        description: '"F\u00f6r arbetet med att \u00f6ka jordens BNP." Belopp: st\u00f6rre.',
        effects: [
          { resource: 'kapital', amount: 500_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 9_000_000_000_000 }],
    unique: true,
  },
]
