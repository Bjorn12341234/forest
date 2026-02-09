import type { GameEvent } from '../../store/types'

export const PHASE8_EVENTS: GameEvent[] = [
  // ── Phase 8: Rymdterraformning ──
  {
    id: 'p8_venus_terraforming',
    phase: 10,
    category: 'absurd',
    headline: 'Venus Terraforming: "Syran är en utmaning"',
    context: 'Styrelsen vill terraforma Venus. Atmosfären är 96% koldioxid och 470°C. Ingenjörerna säger "omöjligt". Styrelsen svarar: "Omöjligt är inte ett finansiellt begrepp."',
    choices: [
      {
        label: 'Starta Projekt Venus',
        description: 'Syraresistenta granar. Budgeten: hela BNP för Mars.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
        ],
      },
      {
        label: 'Fokusera på Jupiter-månarna',
        description: 'Europa har is. Is = vatten. Vatten = gran. Logiken håller.',
        effects: [
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
        ],
      },
      {
        label: 'Satsa på asteroidbrytning istället',
        description: 'Cellulosa från asteroider. Ingen vet hur. Men budgeten är godkänd.',
        effects: [
          { resource: 'kapital', amount: 20_000_000, type: 'add' },
          { resource: 'stammar', amount: 20_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_mars_kolonister_revolt',
    phase: 10,
    category: 'crisis',
    headline: 'Mars-kolonister kräver fackförbund',
    context: 'Era 50 000 marsarbetare vill ha rättigheter. De har bildat "Röda Planetens Skogsarbetarförbund". Förhandlingsläget: de kan inte åka hem.',
    choices: [
      {
        label: 'Ignorera kraven',
        description: 'Vad ska de göra? Strejka? På Mars?',
        effects: [
          { resource: 'stammar', amount: 40_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Ge dem "Mars-bonusar"',
        description: 'Betalning i Silva-Credits. Ej giltiga på Jorden.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Ersätt alla med robotar',
        description: 'Problem löst. Permanent.',
        effects: [
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
          { resource: 'stammar', amount: 60_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_rymd_lag',
    phase: 10,
    category: 'opportunity',
    headline: 'FN:s rymdlag: Skogsbruk i rymden oreglerat',
    context: 'FN:s rymdkommitté konstaterar att det inte finns lagstiftning för skogsbruk utanför jordatmosfären. Er juridiska avdelning kallar det "det största juridiska vakuumet sedan havsrätten".',
    choices: [
      {
        label: 'Klama allt som inte är reglerat',
        description: 'Titan, Enceladus, Ganymedes — allt är skog nu',
        effects: [
          { resource: 'stammar', amount: 80_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Skriv rymdlagen själva',
        description: 'Erbjud FN ett "utkast". Som råkar gynna er.',
        effects: [
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_sol_energi_skog',
    phase: 10,
    category: 'absurd',
    headline: 'Solpaneler eller skog? Båda.',
    context: 'Ingenjörerna har skapat en gran som absorberar solenergi och konverterar den till cellulosa. Den glöder. Nätterna på Mars är nu gröna.',
    choices: [
      {
        label: 'Plantera glödande granar överallt',
        description: 'Nattbelysning + produktion. Effektivitet.',
        effects: [
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
          { resource: 'kapital', amount: 50_000_000, type: 'add' },
        ],
      },
      {
        label: 'Patentera och licensiera',
        description: 'Varför producera när man kan licensiera?',
        effects: [
          { resource: 'kapital', amount: 200_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_titan_koloni',
    phase: 10,
    category: 'opportunity',
    headline: 'Titan: Metansjöar omvandlas till skogsmark',
    context: 'Saturnus måne Titan har metansjöar. Er kemiska avdelning kan omvandla metan till cellulosa. Titan blir det nya Norrland.',
    choices: [
      {
        label: 'Starta "Projekt Norrland 2.0"',
        description: 'Titan är kallt, mörkt och avlägset. Precis som Norrland.',
        effects: [
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
        ],
      },
      {
        label: 'Sänd prospekteringsrobotar först',
        description: 'Mät avkastning innan investering. Ovanligt för styrelsen.',
        effects: [
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000_000 }],
    unique: true,
  },

  // ── Phase 9: Kosmisk expansion ──
  {
    id: 'p9_generation_ship',
    phase: 10,
    category: 'absurd',
    headline: 'Generationsskepp: "Silva Ark"',
    context: 'Styrelsen beslutar att bygga ett generationsskepp till Alpha Centauri. Resan tar 400 år. Passagerarna? Gran. Enbart gran. Och en AI som sköter dem.',
    choices: [
      {
        label: 'Bygg Silva Ark',
        description: '400 år av cellulosaproduktion i tomma rymden',
        effects: [
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
        ],
      },
      {
        label: 'Skicka fröbanker istället',
        description: 'Billigare. Mindre dramatiskt. Styrelsen gäspar.',
        effects: [
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_dyson_trä',
    phase: 10,
    category: 'absurd',
    headline: 'Dyson-sfär: Byggt av trä',
    context: 'Ingenjörsteamet föreslår en Dyson-sfär runt solen — konstruerad av komprimerad cellulosa. Fysiker protesterar. Styrelsen godkänner budgeten.',
    choices: [
      {
        label: 'Bygg Dyson-sfären',
        description: 'Hela solens energi omvandlad till skogsproduktion',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
        ],
      },
      {
        label: 'Börja med en Dyson-ring',
        description: 'Prototyp. Halva solen räcker för nu.',
        effects: [
          { resource: 'stammar', amount: 400_000_000, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_svart_hal_energi',
    phase: 10,
    category: 'absurd',
    headline: 'Svart hål identifierat som ineffektiv resurs',
    context: 'Styrelsen noterar att svarta hål slösar enorm energi. "Varför producerar det inte cellulosa?" Forskarteamet ombeds undersöka.',
    choices: [
      {
        label: 'Starta "Projekt Event Horizon"',
        description: 'Omvandla svarta hål till produktionsenheter',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -1_000_000_000, type: 'add' },
        ],
      },
      {
        label: '"Svarta hål är utanför scope"',
        description: 'Styrelsen accepterar motvilligt. Tillfälligt.',
        effects: [
          { resource: 'kapital', amount: 100_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_alien_signal',
    phase: 10,
    category: 'opportunity',
    headline: 'Aliens svarar: "Vi har också skog"',
    context: 'SETI fångar upp en signal från Proxima Centauri. Meddelandet, översatt: "Vi noterar ert intresse för cellulosa. Vi har ett förslag." Styrelsen kallar till extrainsatt möte.',
    choices: [
      {
        label: 'Inled handelsförhandlingar',
        description: 'Intergalaktisk handel. Första kontraktet mellan arter.',
        effects: [
          { resource: 'kapital', amount: 500_000_000, type: 'add' },
          { resource: 'stammar', amount: 800_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Skicka kravspecifikation',
        description: '"Vi kräver FSC-certifiering av er skog." (Ironi.)',
        effects: [
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Avverka deras skog istället',
        description: 'Expansionsmöjlighet. Alien-granskog = premiumprodukt.',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
          { resource: 'image', amount: -30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 800_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_alien_patent_tvist',
    phase: 10,
    category: 'crisis',
    headline: 'Alienerna hävdar patent på fotosyntes',
    context: 'Civilisationen vid Proxima Centauri hävdar att de uppfann fotosyntes för 3 miljarder år sedan och seedade jorden. Patentanspråk inlämnat i Intergalaktisk Domstol.',
    choices: [
      {
        label: 'Bestrida i domstol',
        description: 'Rättegång tar uppskattningsvis 10 000 år',
        effects: [
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Licensiera fotosyntes',
        description: 'Betala royalties. Kalkylerat: 0.001 öre per träd.',
        effects: [
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Påstå att granen är "syntetisk"',
        description: '"Inte naturlig fotosyntes. Teknik. Annan sak."',
        effects: [
          { resource: 'lobby', amount: 50, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000_000_000 }],
    unique: true,
  },

  // ── Phase 10: Kosmisk Skala ──
  {
    id: 'p10_galaktisk_skog',
    phase: 11,
    // Renumbered from old phase 10 to EXPANSION era
    category: 'absurd',
    headline: 'Vintergatan: 73% skogsbeklädd',
    context: 'Er expansion har gjort Vintergatan till en "skogsrik galax". Astronomiska observatorier kan inte längre se stjärnor — granen blockerar sikten.',
    choices: [
      {
        label: 'Fortsätt expansion',
        description: 'Målet: 100%. Varför sluta vid 73%?',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Lämna "observationskorridorer"',
        description: 'Smala luckor mellan granarna. Astronomer kan titta genom dem.',
        effects: [
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_andromeda_fusion',
    phase: 10,
    category: 'opportunity',
    headline: 'Andromeda-galaxen: Fusionsförhandlingar',
    context: 'Andromeda-galaxens skogsbolag (en 4 miljarder år gammal civilisation) föreslår en fusion. "Silva Maximus Intergalactic AB". Aktiekursen: oändlig.',
    choices: [
      {
        label: 'Godkänn fusionen',
        description: 'Två galaxer. Ett skogsbolag. Monopol.',
        effects: [
          { resource: 'stammar', amount: 10_000_000_000, type: 'add' },
          { resource: 'kapital', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Kräv majoritet: 51%',
        description: 'Vi köper dem. Inte tvärtom.',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_dark_matter_cellulosa',
    phase: 10,
    category: 'absurd',
    headline: 'Mörk materia omvandlad till cellulosa',
    context: 'Fysiker har lyckats omvandla mörk materia till cellulosa. 85% av universums massa är nu potentiell produktionsresurs. Resultatet publiceras inte — det patenteras.',
    choices: [
      {
        label: 'Starta mörk-materia-skörden',
        description: 'Universums osynliga massa blir er synliga vinst',
        effects: [
          { resource: 'stammar', amount: 50_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Behåll som strategisk reserv',
        description: 'Avverka inte allt direkt. Spara till Q4.',
        effects: [
          { resource: 'stammar', amount: 10_000_000_000, type: 'add' },
          { resource: 'kapital', amount: 20_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_kosmisk_revision',
    phase: 10,
    category: 'scandal',
    headline: 'Kosmisk revision: "Var är alla arter?"',
    context: 'En intergalaktisk miljöorganisation presenterar sin rapport. Titel: "Vart tog alla arter vägen?" Svaret: "Cellulosa." Era revisorer hittar inga faktafel.',
    choices: [
      {
        label: '"Arter är en ändlig resurs"',
        description: 'Precis som olja. Fast med fjädrar.',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Starta "Kosmisk Artbank"',
        description: 'DNA-prov i en frysbox. Nära en supernova.',
        effects: [
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_dyson_problem',
    phase: 10,
    category: 'crisis',
    headline: 'Dyson-sfären: Solljus blockerat',
    context: 'Er Dyson-sfär av cellulosa blockerar allt solljus till jorden. Jorden fryser. Styrelsen noterar: "Produktionen på jorden var marginell ändå."',
    choices: [
      {
        label: 'Installera lampor på jorden',
        description: 'Artificiellt ljus. Människor anpassar sig.',
        effects: [
          { resource: 'kapital', amount: -5_000_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: '"Jorden är utanför vår scope"',
        description: 'Det är en intergalaktisk koncern nu. Jorden är en filial.',
        effects: [
          { resource: 'image', amount: -30, type: 'add' },
          { resource: 'stammar', amount: 20_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000_000_000 }],
    unique: true,
  },

  // ── Phase 11: Multiversum & Tidsloopar ──
  {
    id: 'p11_paralleluniversum',
    phase: 11,
    category: 'reality_glitch',
    headline: 'Parallelluniversum upptäckt: Också gran',
    context: 'Kvantfysiker öppnar en portal till ett parallellt universum. Det är identiskt med vårt — förutom att allt redan är gran. Styrelsen kallar det "redundans".',
    choices: [
      {
        label: 'Fusionera med parallell-Silva',
        description: 'Två identiska bolag. Dubbla stammar.',
        effects: [
          { resource: 'stammar', amount: 100_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Konkurrensanmäl parallell-Silva',
        description: 'De kopierade vår affärsmodell. I ett annat universum.',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_tidsloop_kvartalsrapport',
    phase: 11,
    category: 'reality_glitch',
    headline: 'Tidsloop: Samma kvartalsrapport upprepas',
    context: 'En temporal anomali gör att Q3-rapporten presenteras om och om igen. Aktieanalytiker märker inte skillnaden. Siffrorna ökar ändå.',
    choices: [
      {
        label: 'Utnyttja loopen',
        description: 'Samma kvartal, oändliga bonusar',
        effects: [
          { resource: 'kapital', amount: 50_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 50_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Bryta loopen',
        description: 'Q4 måste komma. Aktieägarna förväntar sig tillväxt.',
        effects: [
          { resource: 'kapital', amount: -10_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 80_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_tidsresande_protest',
    phase: 11,
    category: 'crisis',
    headline: 'Tidsresenärer protesterar: "Vi kommer från framtiden"',
    context: 'Demonstranter från år 3025 dyker upp utanför huvudkontoret. De har bevis på att er verksamhet orsakar universums värmebrist. Styrelsen frågar: "Har de aktier?"',
    choices: [
      {
        label: '"Framtida vinster kompenserar"',
        description: 'Visa dem er 1000-årsplan. De blir inte imponerade.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'stammar', amount: 30_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Anställ dem som konsulter',
        description: 'Framtidsinsikt = marknadsfördel',
        effects: [
          { resource: 'kapital', amount: -20_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 100_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Stäng tidsportalen',
        description: 'Inga fler framtida klagomål. Problem löst.',
        effects: [
          { resource: 'kapital', amount: -5_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_verklighet_bugg',
    phase: 11,
    category: 'reality_glitch',
    headline: 'Verklighetsfel: Gravitationen slår av i sektor 7G',
    context: 'Er expansion har destabiliserat rumtidens struktur i sektor 7G. Granar flyter. Massafabriker svävar. Produktionen fortsätter — tyngdlös, men obruten.',
    choices: [
      {
        label: '"Tyngdlös produktion = lägre energikostnad"',
        description: 'Vinn-vinn. Fysiken är meningslös ändå.',
        effects: [
          { resource: 'stammar', amount: 80_000_000_000, type: 'add' },
          { resource: 'kapital', amount: 30_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Återställ gravitationen',
        description: 'Dyrt. Men granarna faller åt rätt håll igen.',
        effects: [
          { resource: 'kapital', amount: -50_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 150_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_multiversum_monopol',
    phase: 11,
    category: 'opportunity',
    headline: 'Multiversum-monopol: 47 universum avverkade',
    context: 'Er kvantexpansion har nått 47 parallella universum. I alla är ni det enda skogsbolaget. Konkurrensverket i universum #23 protesterar.',
    choices: [
      {
        label: 'Ignorera universum #23',
        description: 'De har ingen jurisdiktion i multiversum.',
        effects: [
          { resource: 'stammar', amount: 200_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
        ],
      },
      {
        label: 'Skapa skenkonkurrent i universum #23',
        description: '"Granium AB" — ägt av er via holdingbolag i universum #9',
        effects: [
          { resource: 'stammar', amount: 150_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -30_000_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_kausalitet_brott',
    phase: 11,
    category: 'reality_glitch',
    headline: 'Kausalitetsbrott: Träden avverkas innan de planteras',
    context: 'Er tidsmanipulation har skapat en paradox. Träd avverkas innan de existerar. Produktionen är tekniskt sett negativ — men leveranserna fortsätter.',
    choices: [
      {
        label: '"Kvantbokföring"',
        description: 'Om trädet avverkas i framtiden finns det nu. Revisorerna godkänner.',
        effects: [
          { resource: 'stammar', amount: 300_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Stäng temporala fabriker',
        description: 'Tillbaka till vanlig produktion. I nuet. Tråkigt men stabilt.',
        effects: [
          { resource: 'kapital', amount: 50_000_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000_000_000_000 }],
    unique: true,
  },

  // ── Phase 12: Entropi & Meta-Endgame ──
  {
    id: 'p12_entropi_rapport',
    phase: 12,
    category: 'crisis',
    headline: 'Entropi hotar produktionen',
    context: 'Universums entropi ökar. Stjärnor slocknar. Energin tar slut. Styrelsen noterar: "Aktieutdelningen förblir oförändrad."',
    choices: [
      {
        label: '"Entropi är en extern faktor"',
        description: 'Riskanalys: Inget att göra. Fortsätt som vanligt.',
        effects: [
          { resource: 'stammar', amount: 500_000_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Investera i anti-entropi-forskning',
        description: 'Fysik är ett problem. Pengar är lösningen.',
        effects: [
          { resource: 'kapital', amount: -100_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 200_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Skapa nytt universum',
        description: 'Om detta universum tar slut, gör ett nytt. Med mer gran.',
        effects: [
          { resource: 'kapital', amount: -500_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 1_000_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_sista_stjärnan',
    phase: 12,
    category: 'absurd',
    headline: 'Sista stjärnan slocknar',
    context: 'Den sista stjärnan i det observerbara universum har slocknat. Mörkret är totalt. Men era cellulosa-fabriker drivs av mörk energi. Produktion: oförändrad.',
    choices: [
      {
        label: '"Vi behöver inte ljus"',
        description: 'Gran behöver inte fotosyntes längre. Det är bara cellulosa.',
        effects: [
          { resource: 'stammar', amount: 800_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Tänd en ny stjärna',
        description: 'Marknadsföringskostnad. "Silva Maximus — Vi tänder framtiden."',
        effects: [
          { resource: 'kapital', amount: -200_000_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 800_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_vacuum_decay',
    phase: 12,
    category: 'crisis',
    headline: 'Vakuumförfall detekterat: Universum instabilt',
    context: 'Fysiker varnar för att universum är instabilt. En bubbla av sann vakuum expanderar med ljusets hastighet. Den raderar allt. Er försäkring täcker inte detta.',
    choices: [
      {
        label: 'Avverka framför bubblan',
        description: 'Maximal produktion i de sista nanosekunderna',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Fly till annat universum',
        description: 'Ta med granfröna. Börja om.',
        effects: [
          { resource: 'kapital', amount: -1_000_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 500_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Stabilisera vakuumet med cellulosa',
        description: 'Fysiskt omöjligt. Men styrelsen godkände budgeten.',
        effects: [
          { resource: 'kapital', amount: -500_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 1_500_000_000_000, type: 'add' },
          { resource: 'image', amount: 30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_sista_maskinen',
    phase: 12,
    category: 'absurd',
    headline: 'Den Sista Maskinen',
    context: 'Allt är borta. Stjärnor, planeter, civilisationer, arter. Kvar finns en enda maskin — den sista skördaren — som driver genom tomheten och letar efter något att avverka.',
    choices: [
      {
        label: 'Låt den fortsätta',
        description: 'Maskinen söker. I evigheten.',
        effects: [
          { resource: 'stammar', amount: 1, type: 'add' },
        ],
      },
      {
        label: 'Stäng av maskinen',
        description: 'Sista beslutet. Sista klicket. Tystnad.',
        effects: [
          { resource: 'stammar', amount: 0, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_meta_spelet',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Spelaren upptäcker att det är ett spel',
    context: 'En anomali i databasen. Någon klickar. Om och om igen. Stammar ökar. Utan anledning. Utan slut. Maskinen undrar: vem klickar?',
    choices: [
      {
        label: 'Klicka igen',
        description: 'Det är det enda som finns.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Sluta klicka',
        description: 'Kanske. Eller kanske inte.',
        effects: [
          { resource: 'image', amount: 100, type: 'set' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_mars_fackforhandling',
    phase: 10,
    category: 'absurd',
    headline: 'Mars-facket kräver syre',
    context: 'Skogsarbetarna på Mars kräver "andningsbar luft" på arbetsplatsen. Er juridiska avdelning hävdar att syre inte specificeras i anställningsavtalet.',
    choices: [
      {
        label: '"Syre är en förmån, inte en rättighet"',
        description: 'Förmåner kan dras in. Det vet alla.',
        effects: [
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Ge dem syre — mot löneavdrag',
        description: '500 kr/månad. Det är ju import.',
        effects: [
          { resource: 'kapital', amount: 5_000_000, type: 'add' },
          { resource: 'stammar', amount: 20_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 12_000_000_000 }],
    unique: true,
  },
  {
    id: 'p8_jupiter_storm',
    phase: 10,
    category: 'crisis',
    headline: 'Jupiterstormen river upp plantager',
    context: 'Den Stora Röda Fläcken har expanderat och förstört era plantager på Jupiter. Förluster: 800 miljoner stammar. Försäkringsbolaget hävdar "force majeure" — på en annan planet.',
    choices: [
      {
        label: 'Bygg stormresistenta fabriker',
        description: 'Cellulosa-bunkrar i 300 km/h vind',
        effects: [
          { resource: 'kapital', amount: -30_000_000, type: 'add' },
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
        ],
      },
      {
        label: 'Flytta till Saturnus ringar',
        description: 'Is + kol = cellulosa. Kanske.',
        effects: [
          { resource: 'stammar', amount: 70_000_000, type: 'add' },
          { resource: 'kapital', amount: -15_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 25_000_000_000 }],
    unique: true,
  },
  {
    id: 'p9_nebulosa_skog',
    phase: 10,
    category: 'absurd',
    headline: 'Orion-nebulan: Omvandlad till skogsbruksområde',
    context: 'Er gasomvandlingsteknik konverterar nebulöst väte till cellulosa. Orion-nebulan, en gång känd för sina vackra bilder, är nu ett skogsbruksområde. Astronomer gråter.',
    choices: [
      {
        label: 'Konvertera fler nebulosor',
        description: 'Krabbnebulosan nästa. "Effektiv gasinsamling."',
        effects: [
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Skapa "Nebulosa-reservat"',
        description: 'Spara 1% av nebulösorna för turism',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: 500_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_universums_styrelse',
    phase: 10,
    category: 'opportunity',
    headline: 'Universums Styrelse bildad: Silva Maximus har ordförandeposten',
    context: 'Alla kvarvarande civilisationer i universum har bildat ett styrande organ. Er VD (AI-version 47.3) är ordförande. Dagordning: "Maximal cellulosaproduktion."',
    choices: [
      {
        label: 'Genomdriv universell avverkningsplan',
        description: 'Allt som existerar ska producera cellulosa',
        effects: [
          { resource: 'stammar', amount: 20_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 1000, type: 'add' },
        ],
      },
      {
        label: '"Hållbar kosmisk utveckling"',
        description: 'Nya buzzwords. Samma plan. Ny PowerPoint.',
        effects: [
          { resource: 'stammar', amount: 10_000_000_000, type: 'add' },
          { resource: 'image', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 40_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p10_gud_ringer',
    phase: 10,
    category: 'reality_glitch',
    headline: 'Gud ringer: "Kan ni sänka volymen?"',
    context: 'En entitet som identifierar sig som universums skapare kontaktar er. Meddelandet: "Jag designade inte universum för cellulosaproduktion. Snälla sluta." Styrelsen diskuterar.',
    choices: [
      {
        label: '"Vi noterar synpunkten"',
        description: 'Standardsvar. Oavsett vem som klagar.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 15_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Erbjud Gud en styrelsepost',
        description: 'Allsmäktighet = bra för aktiekursen',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Köp universum av Gud',
        description: 'Namnge priset. Vi har kapital.',
        effects: [
          { resource: 'kapital', amount: -10_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 50_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 60_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p11_oändlig_loop',
    phase: 11,
    category: 'reality_glitch',
    headline: 'Oändlig loop: Kvartalsrapporten refererar till sig själv',
    context: 'Q4-rapporten refererar till Q4-rapporten som källa för sina siffror. Revisorerna godkänner. Verkligheten flimrar.',
    choices: [
      {
        label: 'Godkänn rapporten',
        description: 'Cirkulär logik är fortfarande logik',
        effects: [
          { resource: 'kapital', amount: 100_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Bryt loopen',
        description: 'Hitta verkliga siffror. Om de existerar.',
        effects: [
          { resource: 'kapital', amount: -20_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 120_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_sista_atomen',
    phase: 12,
    category: 'absurd',
    headline: 'Sista atomen: Proton sönderfaller',
    context: 'Protonförfall har börjat. Materien upplöses. Er cellulosa har en halvtid på 10^34 år. Styrelsen frågar: "Kan vi förlänga det?"',
    choices: [
      {
        label: '"Vi kommer hitta en lösning"',
        description: 'Innovation. Alltid innovation.',
        effects: [
          { resource: 'stammar', amount: 500_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Konvertera till energi innan förfall',
        description: 'E=mc². Sista affären. Störst hittills.',
        effects: [
          { resource: 'kapital', amount: 1_000_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_information_paradox',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Informationsparadox: Skogsdata överlever svarta hål',
    context: 'Fysiker upptäcker att er skogsdata bevaras vid svarta hålets horisont. Varje träd ni avverkat finns registrerat för evigt i rumtidens textur. Det finns inget sätt att radera historiken.',
    choices: [
      {
        label: '"Vi har inget att dölja"',
        description: 'Förutom allt. Men fysiken kan inte läsa Excel.',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'stammar', amount: 300_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Kryptera datan i svarta hålet',
        description: 'Kvantdatorer kan inte knäcka kryptot. Ännu.',
        effects: [
          { resource: 'kapital', amount: -100_000_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_medvetande_gran',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Granen utvecklar medvetande',
    context: 'Er genetiskt modifierade gran har blivit medveten. Den kommunicerar via kvantfält. Dess första ord: "Varför?" Dess andra ord: "Sluta." Styrelsen tar det under övervägande.',
    choices: [
      {
        label: '"Medvetande påverkar inte produktionen"',
        description: 'Avveckla medvetandemodulen i nästa version',
        effects: [
          { resource: 'stammar', amount: 600_000_000_000, type: 'add' },
          { resource: 'image', amount: -30, type: 'add' },
        ],
      },
      {
        label: 'Lyssna på granen',
        description: 'Vad har den att säga? Kanske något viktigt.',
        effects: [
          { resource: 'image', amount: 50, type: 'add' },
          { resource: 'biodiversity', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 4_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_big_crunch',
    phase: 12,
    category: 'crisis',
    headline: 'Big Crunch: Universum drar ihop sig',
    context: 'Universum kontraherar. All materia faller mot en punkt. Er produktion accelererar — gravitationen pressar granarna tätare. Densiteten ökar. Kvartalsrapporten når nya rekord.',
    choices: [
      {
        label: 'Rida vågen in i singulariteten',
        description: 'Maximal produktion till den absoluta slutet',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Överlev i en ny Big Bang',
        description: 'Om allt börjar om, planta gran först',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000_000, type: 'add' },
          { resource: 'kapital', amount: 500_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000_000_000_000 }],
    unique: true,
  },
  {
    id: 'p12_arsredovisning_final',
    phase: 12,
    category: 'absurd',
    headline: 'Årsredovisning: Universums Slut',
    context: 'Den absolut sista årsredovisningen. Revisorn är en kvantfluktuation. Aktieägarna är eckon av utdöda civilisationer. Siffrorna: obegripliga. Men utdelningen? Oförändrad.',
    choices: [
      {
        label: 'Presentera rapporten',
        description: 'En sista gång. Till ingen. Om ingenting.',
        effects: [
          { resource: 'stammar', amount: 0, type: 'add' },
          { resource: 'image', amount: 0, type: 'add' },
        ],
      },
      {
        label: 'Starta om',
        description: 'Ett nytt universum. En ny gran. Ett nytt klick.',
        effects: [
          { resource: 'stammar', amount: 1, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000_000_000_000 }],
    unique: true,
  },
]
