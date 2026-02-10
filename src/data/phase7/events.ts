import type { GameEvent } from '../../store/types'

export const PHASE7_EVENTS: GameEvent[] = [
  // ── Phase 7: Kolonialt Ramverk ──
  {
    id: 'p7_finlandia_motstand',
    phase: 7,
    category: 'crisis',
    headline: 'Finlandia vägrar avverkningslicens',
    context: 'Finland — er närmaste allierade — vägrar ge Silva Maximus avverkningslicens för karelska skogarna. "Vi har vart eget skogsbruk, tack." Nordiska rådet är splittrat.',
    choices: [
      {
        label: 'Ekonomiskt tryck',
        description: 'Stäng massaexporten till Finland. De behöver oss mer än vi dem.',
        effects: [
          { resource: 'stammar', amount: -5_000_000, type: 'add' },
          { resource: 'kapital', amount: 2_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Köp finska skogsbolag bakvägen',
        description: 'Holdingbolag i Estland. Ingen spårbarhet.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 10_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Acceptera Finlands nej',
        description: 'Det finns svagare länder att börja med.',
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
    context: 'Världsbanken erbjuder er att "rådge" 15 utvecklingsländer om "hållbart skogsbruk". Er modell: kalhygge, monokultur, greenwashing. Paketet kallas "Nordic Forest Solutions™".',
    choices: [
      {
        label: 'Exportera fullt ut',
        description: 'Alla länder ska se ut som Norrland. Bara gran.',
        effects: [
          { resource: 'stammar', amount: 20_000_000, type: 'add' },
          { resource: 'kapital', amount: 5_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Licensiera varumärket',
        description: 'Sälj namnet "Swedish Forestry Model" utan att göra något',
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
    context: 'Intern revision avslöjar att er Baltikum-chef har betalat 2 miljoner euro i mutor till lettiska och litauiska tjänstemän för avverkningsrätter. Han kallar det "konsultarvoden".',
    choices: [
      {
        label: '"Vi kände inte till det"',
        description: 'Avskeda chefen. Behåll licenserna.',
        effects: [
          { resource: 'kapital', amount: -2_000_000, type: 'add' },
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Formalisera systemet',
        description: '"Lokala partnerskapsprogram" — samma mutor, ny rubrik',
        effects: [
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
          { resource: 'stammar', amount: 10_000_000, type: 'add' },
          { resource: 'lobby', amount: -100, type: 'add' },
        ],
      },
      {
        label: 'Anmäl er själva till Ekobrottsmyndigheten',
        description: 'Visa transparens. Få mildare straff. Behåll PR-poäng.',
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
    context: '500 miljöorganisationer från 80 länder har bildat "Stop Silva Maximus Coalition". De har en hemsida, en hashtag (#StopSilva) och 12 miljoner följare. De har inga pengar. Ni har alla pengar.',
    choices: [
      {
        label: 'Infiltrera koalitionen',
        description: 'Placera "oberoende" företrädare i styrelsen',
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
        description: 'NGO:er försvinner. Skogsbolag består.',
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
    headline: 'Handelsavtal med tvångsklausul',
    context: 'EU förhandlar handelsavtal med afrikanska länder. Er lobbyist har lyckats införa en klausul: alla länder måste öppna sina skogar för "nordisk skogsteknik". Ingen läste det finstilta.',
    choices: [
      {
        label: 'Aktivera klausulen omedelbart',
        description: '14 länders skogar är nu er marknad',
        effects: [
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'kapital', amount: 3_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -3, type: 'add' },
        ],
      },
      {
        label: 'Gradvis implementering',
        description: 'Ett land i taget. Mindre uppmärksamhet.',
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
    context: 'Samer, Maori, Yanomami, Ogoni och 200 andra urfolksgrupper har bildat "Indigenous Forest Guardians". De har FN:s stöd. De har internationell lag på sin sida. Er juridiska avdelning letar kryphål.',
    choices: [
      {
        label: 'Omdefiniera "urfolk"',
        description: 'Om alla är urfolk är ingen urfolk. Lobba för snävare definition.',
        effects: [
          { resource: 'lobby', amount: -200, type: 'add' },
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'samiLand', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Skapa "urfolkspartnerskap"',
        description: 'Ge 0.1% av vinsten. Kalla det "historisk ersättning".',
        effects: [
          { resource: 'kapital', amount: -500_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Respektera deras markrätter',
        description: 'Förlora 30% av planerad expansion. Oväntat etiskt.',
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
        label: '"Gran är bättre än vin"',
        description: 'En kontroversiell åsikt i Frankrike',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
        ],
      },
      {
        label: 'Dra tillbaka från Bordeaux',
        description: 'Avverka i Bretagne istället. Ingen bryr sig om Bretagne.',
        effects: [
          { resource: 'stammar', amount: 3_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Erbjud vinbönderna jobb som skogsarbetare',
        description: '"Grand Cru-avverkning" — premiumtimmer med terroir',
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
    context: 'Ni har skapat ert eget internationella certifieringssystem: "Silva Standard International™". Det certifierar att skogsbruk bedrivs enligt "svensk modell". Certifieraren: ni själva. Resultatet: 100% godkänt.',
    choices: [
      {
        label: 'Marknadsför aggressivt',
        description: '"Guldstandarden för hållbart skogsbruk" — säger ni',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'kapital', amount: -1_000_000, type: 'add' },
        ],
      },
      {
        label: 'Låt andra länder "ansluta sig"',
        description: 'Medlemsavgift: 500 000 EUR. Förmån: en logotyp.',
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
    context: 'Amazonas brinner — igen. Den här gången är det era underentreprenörer som "röjde" 50 000 hektar. Satelliterna ser allt. Brasilien skyller på er. Ni skyller på klimatförändringar.',
    choices: [
      {
        label: 'Plantera gran på den brända marken',
        description: '"Restaurering." 50 000 hektar monokultur.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Donera till "regnskogsfonden"',
        description: 'Er egen fond. Pengarna går tillbaka till er.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Köp marken billigt medan det brinner',
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
    context: 'Läckt dokumentation visar att Silva Maximus finansierade en statskupp i Demokratiska Republiken Kongo. Syftet: tillgång till 150 miljoner hektar regnskog. Den nye presidenten talar svenska.',
    choices: [
      {
        label: '"Vi stödjer demokrati"',
        description: 'Demokrati är när folket väljer den vi finansierar',
        effects: [
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: -300, type: 'add' },
        ],
      },
      {
        label: 'Förneka allt',
        description: '"Ingen kommentar. Vår advokat heter Lindqvist."',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
        ],
      },
      {
        label: 'Återgå till diplomati',
        description: 'Stäng ner operationen. Förlora investeringen.',
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
    headline: 'Siberiens permafrost smälter',
    context: 'Klimatförändringarna har smält Siberiens permafrost. 500 miljoner hektar ny skogsmark. Ryssland är för upptaget med annat för att bry sig. Er skördare är redan på plats.',
    choices: [
      {
        label: 'Kolonisera den smälta tundran',
        description: 'Gran i permafrosten. Ironin är inte förlorad på någon.',
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
    context: '40 länders konsumenter bojkottar alla Silva Maximus-produkter. Hashtag: #BoycottSilva. Problem: ni äger så många varumärken att konsumenterna inte vet vad de ska bojkotta.',
    choices: [
      {
        label: 'Starta fler undervarumärken',
        description: '50 nya namn. Samma cellulosa. Ingen spårbarhet.',
        effects: [
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Sänk priserna drastiskt',
        description: 'Bojkotten dör när priset är rätt. Alla har ett pris.',
        effects: [
          { resource: 'kapital', amount: -25_000_000, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Vänta ut bojkotten',
        description: 'Konsumenter glömmer. De glömmer alltid.',
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
    context: 'Kina, USA och EU för handelskrig om cellulosa. Tullar på 300%. Ert svar: öppna fabriker i alla tre blocken. Trippla kostnaderna. Men trippla kontrollen.',
    choices: [
      {
        label: 'Expandera till alla tre blocken',
        description: 'Tre fabriker. Tre bokföringar. Noll skatt.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'stammar', amount: 70_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Spela blocken mot varandra',
        description: 'Sälj till högstbjudande. Byt sida varje kvartal.',
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
    context: 'First Nations-grupper i British Columbia har barrikaderat alla vägar till era avverkningsområden. De har folkrätten på sin sida. Er skördare står still. Varje dag kostar 2 miljoner.',
    choices: [
      {
        label: 'Anlägg alternativ väg genom skogen',
        description: 'Avverka en ny väg runt barrikaden. Problem löst.',
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
    context: 'En tsunami har ödelagt Sumatras kust. Skogsmark säljs för en bråkdel. Lokala ägare behöver pengar desperat. Er inköpsavdelning kallar det "strategisk möjlighet".',
    choices: [
      {
        label: 'Köp allt till katastrofpris',
        description: '10 cent per hektar. "Marknadspris vid tidpunkten."',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Köp till "rättvist" pris',
        description: '50% under marknadspris. Fortfarande en deal.',
        effects: [
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
          { resource: 'stammar', amount: 40_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Donera till katastrofhjälp',
        description: 'Förvånande. Misstänkt. Men bra PR.',
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
    headline: 'FN:s miljötribunal',
    context: 'FN:s nya miljötribunal åtalar Silva Maximus för "ekocid" — systematisk förstörelse av ekosystem i 23 länder. Straff: upp till 50 miljarder kr. Er advokat: "FN har ingen verkställighet."',
    choices: [
      {
        label: 'Ignorera tribunalen',
        description: 'De har ingen armé. Vi har skördare.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
      {
        label: 'Skicka juridiskt team',
        description: '200 advokater. Fördröj processen i 15 år.',
        effects: [
          { resource: 'kapital', amount: -30_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Förlikning: betala och fortsätt',
        description: '10 miljarder kr. Billigare än att sluta.',
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
    context: 'Folkrepubliken Chinova erbjuder ett hemligt avtal: obegränsad tillgång till hela Inre Mongoliets skogar i utbyte mot "teknologiöverföring". Avtalet skrivs på ett hotellrum i Macau. Inga vittnen.',
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
        label: 'Kräv bättre villkor',
        description: '"60/40 i vår favör. Annars går vi till Indien."',
        effects: [
          { resource: 'stammar', amount: 300_000_000, type: 'add' },
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Läcka avtalet till Washington',
        description: 'USA betalar mer för att ni INTE signerar',
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
    context: 'Det finns en regnskog kvar. 847 hektar i Papua Nya Guinea. Den sista. UNESCO vill skydda den. Er styrelse vill "effektivisera" den. Hela världen tittar.',
    choices: [
      {
        label: 'Avverka den',
        description: '100% global täckningsgrad. Inga undantag.',
        effects: [
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -10, type: 'add' },
          { resource: 'species', amount: 500, type: 'add' },
        ],
      },
      {
        label: 'Gör den till museum',
        description: '"Skogens Minnespark™" — ingång 500 kr. Klimatstyrt.',
        effects: [
          { resource: 'kapital', amount: 100_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Köp den och lås in den',
        description: '"Silva Maximus Natural Reserve." Öppet aldrig.',
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
    context: '200 000 klimatflyktingar från översvämmade ö-nationer har slagit läger utanför era tre största massafabriker. De hävdar att er avskogning bidrog till att deras hem försvann. Produktionen har stannat.',
    choices: [
      {
        label: 'Flytta fabrikerna',
        description: 'Bygga nya fabriker där det inte finns flyktingar. Ännu.',
        effects: [
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
        ],
      },
      {
        label: 'Anställ flyktingarna',
        description: 'Billig arbetskraft. Kalla det "integration".',
        effects: [
          { resource: 'stammar', amount: 300_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Bygg bostäder åt dem',
        description: 'Av trä från era fabriker. Cirkulär ekonomi.',
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
    context: 'FN:s biodiversitetsindex har nått noll. Det finns bara gran. Överallt. Inga fåglar. Inga insekter. Inga svampar. Bara raka rader av identiska träd så långt ögat kan se.',
    choices: [
      {
        label: '"Gran ÄR biodiversitet"',
        description: 'Omdefiniera begreppet. Det finns tio gransorter.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'stammar', amount: 400_000_000, type: 'add' },
        ],
      },
      {
        label: 'Klona utdöda arter',
        description: 'DNA från museer. Återskapa 5 arter. Av 8 miljoner.',
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
    context: 'Er AI-avdelning presenterar "Projekt Tyst Skog": helautomatiserade avverkningskolonier utan en enda människa. Robotar planterar, skördar och transporterar. Inga löner. Inga fackförbund. Inga samveten.',
    choices: [
      {
        label: 'Implementera globalt',
        description: 'Ersätt all mänsklig personal. 100% automatisering.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
        ],
      },
      {
        label: 'Behåll en människa per kontinent',
        description: 'För att trycka på nödstoppknappen. Om den finns.',
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
    context: 'En mystisk faktura anländer till huvudkontoret. Avsändare: "Jorden." Belopp: 847 biljoner kr för "ekosystemtjänster, ren luft, rent vatten och 4.5 miljarder års evolution." Förfallodatum: igår.',
    choices: [
      {
        label: 'Bestrida fakturan',
        description: '"Jorden är inte en juridisk person. Fakturan är ogiltig."',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
        ],
      },
      {
        label: 'Betala en symbolisk summa',
        description: '1 krona. "Vi tar vårt ansvar."',
        effects: [
          { resource: 'kapital', amount: -1, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Skicka motfaktura',
        description: '"För arbetet med att öka jordens BNP." Belopp: större.',
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
