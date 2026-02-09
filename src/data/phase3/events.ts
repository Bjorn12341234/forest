import type { GameEvent } from '../../store/types'

export const PHASE3_EVENTS: GameEvent[] = [
  // ── Phase 3: Nationella Skandaler ──
  {
    id: 'p3_whistleblower_slu',
    phase: 3,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Visselblåsare på SLU avslöjar datamanipulation',
    context: 'En forskare på Sveriges Lantbruksuniversitet visar att skogsbolagens tillväxtdata har överskattats med 30% i tio år. Er egen statistik är inblandad.',
    choices: [
      {
        label: '"Forskaren har en agenda"',
        description: 'Finansiera motstudier via branschorganisationen',
        effects: [
          { resource: 'kapital', amount: -8_000, type: 'add' },
          { resource: 'lobby', amount: 10, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Erbjud forskaren konsultjobb',
        description: 'Alla har ett pris. Forskare har ofta låga löner.',
        effects: [
          { resource: 'kapital', amount: -15_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Publicera egen "transparensrapport"',
        description: '200 sidor. Ingen redaktör hittar felet.',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 120_000 }],
    unique: true,
  },
  {
    id: 'p3_nastle_avtal',
    phase: 3,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Nastl\u00e9 vill k\u00f6pa ert pappersbruk',
    context: 'Nastl\u00e9 International \u2014 f\u00f6retaget som s\u00e5lde vattenr\u00e4ttigheter till torkel\u00e4nder \u2014 erbjuder sig att k\u00f6pa ert pappersbruk f\u00f6r "synergier inom f\u00f6rpackning".',
    choices: [
      {
        label: 'S\u00e4lj till Nastl\u00e9',
        description: 'Massivt kapital. Inga fler etiska fr\u00e5gor \u2014 Nastl\u00e9 har inga.',
        effects: [
          { resource: 'kapital', amount: 80_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Joint venture: "NordPack Solutions"',
        description: 'Delat ansvar. Ingen \u00e4r ansvarig.',
        effects: [
          { resource: 'kapital', amount: 40_000, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
          { resource: 'lobby', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Avb\u00f6j artigt',
        description: '\u00c4ven ni har gr\u00e4nser. Eller?',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000 }],
    unique: true,
  },
  {
    id: 'p3_sami_hogsta_domstolen',
    phase: 3,
    maxPhase: 6,
    category: 'crisis',
    headline: 'H\u00f6gsta domstolen: Samisk mark\u00e4gandedom',
    context: 'HD fastsl\u00e5r att samebyar har r\u00e4tt till traditionell mark. Er avverkningsplan f\u00f6r Norrbotten bevakas av internationella medier.',
    choices: [
      {
        label: '\u00d6verklaga och f\u00f6rdr\u00f6j',
        description: 'Juridisk process tar 8\u201312 \u00e5r. Hugga medan dom v\u00e4ntar.',
        effects: [
          { resource: 'stammar', amount: 15_000, type: 'add' },
          { resource: 'image', amount: -12, type: 'add' },
          { resource: 'samiLand', amount: 25, type: 'add' },
        ],
      },
      {
        label: '"Vi respekterar domen"',
        description: 'Flytta avverkningarna 500 meter. Tekniskt sett nytt omr\u00e5de.',
        effects: [
          { resource: 'stammar', amount: 8_000, type: 'add' },
          { resource: 'image', amount: -3, type: 'add' },
          { resource: 'samiLand', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000 }],
    unique: true,
  },
  {
    id: 'p3_rapport_biologisk_mangfald',
    phase: 3,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Egen rapport visar kollapsat ekosystem',
    context: 'Er milj\u00f6avdelning (en person) har av misstag publicerat den interna rapporten. Biologisk m\u00e5ngfald i era skogar: "kritiskt l\u00e5g". Rapporten togs bort efter 47 minuter. Twitter var snabbare.',
    choices: [
      {
        label: '"Preliminär data, ej kvalitetss\u00e4krad"',
        description: 'Klassikern. Fungerar varje g\u00e5ng.',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Avskeda milj\u00f6avdelningen',
        description: 'En person. Budgeten f\u00f6r "milj\u00f6" g\u00e5r till PR ist\u00e4llet.',
        effects: [
          { resource: 'kapital', amount: 2_000, type: 'add' },
          { resource: 'image', amount: -12, type: 'add' },
        ],
      },
      {
        label: 'G\u00f6r rapporten till "h\u00e5llbarhetsm\u00e5l"',
        description: 'Vi identifierade problemet. Det visar ansvar.',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 250_000 }],
    unique: true,
  },
  {
    id: 'p3_nca_lobbyist',
    phase: 3,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'NCA anst\u00e4ller ex-milj\u00f6minister',
    context: 'Nordiska Cellulosa Alliansen har rekryterat den f\u00f6rra milj\u00f6ministern som "senior r\u00e5dgivare". Hon k\u00e4nner alla p\u00e5 departementet. Hon tycker om skog nu.',
    choices: [
      {
        label: 'Anslut till NCA:s lobbygrupp',
        description: 'Dela p\u00e5 ministern. Och p\u00e5 notan.',
        effects: [
          { resource: 'kapital', amount: -10_000, type: 'add' },
          { resource: 'lobby', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Rekrytera egen minister',
        description: 'Varf\u00f6r dela? Det finns fler ex-ministrar.',
        effects: [
          { resource: 'kapital', amount: -25_000, type: 'add' },
          { resource: 'lobby', amount: 50, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 400_000 }],
    unique: true,
  },
  {
    id: 'p3_media_gravserie',
    phase: 3,
    maxPhase: 6,
    category: 'scandal',
    headline: 'DN Granskar: "Skogens Tystnadskultur"',
    context: 'Dagens Nyheter publicerar en sex delar l\u00e5ng serie om skogsindustrins systematiska p\u00e5verkan p\u00e5 forskning, politik och media. Del 4 handlar om er.',
    choices: [
      {
        label: 'Ignorera serien',
        description: 'Nyhetscykeln \u00e4r kort. M\u00e4nniskors minne \u00e4r kortare.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Publicera motartikel i SvD',
        description: '"Skogen: Sveriges gr\u00f6na guld \u2014 fakta mot myter"',
        effects: [
          { resource: 'kapital', amount: -8_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'St\u00e4m DN f\u00f6r f\u00f6rtal',
        description: 'Aldrig vinn. Men DN f\u00e5r betala advokater i \u00e5r.',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'lobby', amount: 8, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 350_000 }],
    unique: true,
  },
  {
    id: 'p3_skolmaterial_skandal',
    phase: 3,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Skolmaterial: "Kalhygge \u00e4r solbad f\u00f6r marken"',
    context: 'Ert utbildningsmaterial f\u00f6r \u00e5rskurs 5 har blivit viralt. Formuleringen "tr\u00e4den beh\u00f6ver vila ibland, precis som du" har 2 miljoner visningar.',
    choices: [
      {
        label: 'St\u00e5 fast',
        description: 'Pedagogiskt korrekt. Vetenskapligt... kreativt.',
        effects: [
          { resource: 'image', amount: -12, type: 'add' },
          { resource: 'lobby', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Dra tillbaka materialet',
        description: '"Version 2.0 kommer snart"',
        effects: [
          { resource: 'image', amount: -3, type: 'add' },
          { resource: 'kapital', amount: -2_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 180_000 }],
    unique: true,
  },
  {
    id: 'p3_barn_brev',
    phase: 3,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Barnklass skriver brev till VD:n',
    context: '27 \u00e5ttio\u00e5ringar har skrivit brev till er VD. "Varf\u00f6r d\u00f6dar ni ekorrarnas hem?" Breven \u00e4r illustrerade. En har ritat VD:n som en motorsåg med slips.',
    choices: [
      {
        label: 'Skicka standardsvar',
        description: '"Tack f\u00f6r ert engagemang. Vi planterar tr\u00e4d varje dag."',
        effects: [
          { resource: 'image', amount: 2, type: 'add' },
        ],
      },
      {
        label: 'Bjud in klassen till huvudkontoret',
        description: 'Visa "planteringsavdelningen". D\u00f6lj avverkningskartan.',
        effects: [
          { resource: 'kapital', amount: -1_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Rama in motorsågsteckningen',
        description: 'H\u00e4ng den i styrelserummet. Ironiskt. Eller?',
        effects: [
          { resource: 'image', amount: -2, type: 'add' },
          { resource: 'ownerTrust', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 160_000 }],
  },

  // ── Phase 4: Internationell PR-kris ──
  {
    id: 'p4_guardian_expose',
    phase: 4,
    maxPhase: 6,
    category: 'scandal',
    headline: 'The Guardian: "Swedens Green Lie"',
    context: 'Internationell press avsl\u00f6jar att Sveriges "h\u00e5llbara skogsbruk" \u00e4r en marknadsf\u00f6ringsprodukt. Artikeln har \u00f6versatts till 14 spr\u00e5k. Ambassad\u00f6ren ber om talking points.',
    choices: [
      {
        label: 'Skicka ambassad\u00f6ren talking points',
        description: '"Sverige har mer skog \u00e4n n\u00e5gonsin." (Monokulturer r\u00e4knas.)',
        effects: [
          { resource: 'lobby', amount: 15, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: '"No comment"',
        description: 'L\u00e5t det bl\u00e5sa \u00f6ver. Internationella nyheter \u00e4r kortlivade.',
        effects: [
          { resource: 'image', amount: -18, type: 'add' },
        ],
      },
      {
        label: 'K\u00f6p helsidesannons i Financial Times',
        description: '"Swedish Forestry: A Model for the World"',
        effects: [
          { resource: 'kapital', amount: -50_000, type: 'add' },
          { resource: 'image', amount: 12, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_500_000 }],
    unique: true,
  },
  {
    id: 'p4_eu_deforestation_regulation',
    phase: 4,
    maxPhase: 6,
    category: 'crisis',
    headline: 'EU:s avskogningsf\u00f6rordning: Sverige undantas inte',
    context: 'Trots intensiv lobbying klassas svenskt kalhyggesbruk som "avskogning" enligt EU. Er exportlicens \u00e4r hotad.',
    choices: [
      {
        label: 'Lobba f\u00f6r "nordiskt undantag"',
        description: 'Kalhygge \u00e4r inte avskogning om man planterar sedan. S\u00e4ger vi.',
        effects: [
          { resource: 'lobby', amount: -30, type: 'add' },
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Omdefiniera "skog"',
        description: 'Om en granplantage \u00e4r skog \u00e4r allt skog',
        effects: [
          { resource: 'lobby', amount: -20, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'stammar', amount: 20_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000 }],
    unique: true,
  },
  {
    id: 'p4_dokumentarfilm_oscar',
    phase: 4,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Dokumentärfilm om er nomineras till Oscar',
    context: '"Silent Forest" \u2014 en dokumentär om er påverkan på biologisk mångfald \u2014 nomineras till bästa dokumentär. Regissören tackar er i sitt tal: "Utan dem hade filmen inte funnits."',
    choices: [
      {
        label: '"Vi uppskattar uppmärksamheten"',
        description: 'All PR är bra PR. Förhoppningsvis.',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
        ],
      },
      {
        label: 'Producera egen motdokumentär',
        description: '"Growing Strong: The Swedish Forest Miracle"',
        effects: [
          { resource: 'kapital', amount: -30_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000 }],
    unique: true,
  },
  {
    id: 'p4_professor_avgar',
    phase: 4,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Professor avgår i protest',
    context: 'Sveriges mest citerade skogsforskare avgår från SLU. Avgångsbrevet: "Jag kan inte längre stödja ett system designat att legitimera industriell exploatering." Det läses i riksdagen.',
    choices: [
      {
        label: '"Enskild persons åsikt"',
        description: 'Vetenskap handlar om konsensus, inte individer',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Finansiera ny professur',
        description: '"Silva Maximus-professuren i Hållbart Skogsbruk"',
        effects: [
          { resource: 'kapital', amount: -25_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'lobby', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_500_000 }],
    unique: true,
  },
  {
    id: 'p4_mammazanas_lador',
    phase: 4,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Mammazånas: "Vi behöver fler lådor"',
    context: 'Mammazånas e-handel expanderar. De behöver 500 miljoner kartonger per år. Er wellpapp duger. Villkoret: ingen certifiering behövs. Mammazånas har "egen standard".',
    choices: [
      {
        label: 'Signera exklusivavtal',
        description: 'Massiv volym. Inga frågor. Perfekt kund.',
        effects: [
          { resource: 'kapital', amount: 100_000, type: 'add' },
          { resource: 'stammar', amount: 30_000, type: 'add' },
        ],
      },
      {
        label: 'Kräv "hållbarhetstillägg"',
        description: '+15% på priset. Pengarna går till... bonus.',
        effects: [
          { resource: 'kapital', amount: 120_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_800_000 }],
    unique: true,
  },
  {
    id: 'p3_intern_mejl_lacka',
    phase: 3,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Internt mejl läcker: "Biodiversitet är en kostnad"',
    context: 'Ett internt mejl från er ekonomichef har läckt. Citatet: "Varje krona till biodiversitet är en krona från aktieägarna." Mejlet var skickat till alla chefer.',
    choices: [
      {
        label: '"Taget ur kontext"',
        description: 'Det stod mer i mejlet. (Det gjorde det inte.)',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Avskeda ekonomichefen offentligt',
        description: 'Syndabock identifierad. Kulturen förblir oförändrad.',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Dubbeldown: "Vi är ett företag"',
        description: 'Ärlighet. Oväntat. Aktiemarknaden gillar det.',
        effects: [
          { resource: 'kapital', amount: 10_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'ownerTrust', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000 }],
    unique: true,
  },
  {
    id: 'p4_klimatkompensation_bluff',
    phase: 4,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Klimatkompensation: Samma skog såld tre gånger',
    context: 'Revision avslöjar att er "klimatskog" i Norrland har sålts som koldioxidkredit till tre olika företag. Samma träd kompenserar för en flygresa, en SUV och en cementfabrik. Samtidigt.',
    choices: [
      {
        label: '"Bokföringsfel"',
        description: 'Komplicerade system leder till misstag',
        effects: [
          { resource: 'image', amount: -12, type: 'add' },
          { resource: 'kapital', amount: 30_000, type: 'add' },
        ],
      },
      {
        label: 'Plantera fler "klimatträd"',
        description: 'Gran i rader. Nu räcker det till fyra kunder.',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'stammar', amount: 10_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 4_000_000 }],
    unique: true,
  },
  {
    id: 'p3_vargjakten',
    phase: 3,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Vargjakten: Skogsbolag sponsrar',
    context: 'Ert sponsoravtal med jägarförbundet avslöjas. Ni finansierar "skyddsjakt" på varg i era skogsområden. Vargen stör produktionen. Vargen måste bort.',
    choices: [
      {
        label: '"Vi stödjer viltvård"',
        description: 'Viltvård = färre djur som stör avverkningen',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'biodiversity', amount: -3, type: 'add' },
          { resource: 'stammar', amount: 5_000, type: 'add' },
        ],
      },
      {
        label: 'Avsluta sponsoratet',
        description: 'Bad PR. Vargarna får leva. Tillfälligt.',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 600_000 }],
  },
  {
    id: 'p4_influencer_kampanj',
    phase: 4,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Influencer-kampanj: #SkogsLiv',
    context: 'Er PR-byrå har betalat 15 influencers att posta bilder från "riktig svensk skog". Alla foton är tagna i en stadspark i Malmö. Ingen märkte det förrän nu.',
    choices: [
      {
        label: '"Bilden representerar känslan"',
        description: 'Det handlar om varumärket, inte verkligheten',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Flyga influencers till riktig skog',
        description: 'Privatjet till Jokkmokk. Hashtag #ÄktaSkog',
        effects: [
          { resource: 'kapital', amount: -15_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Plantera skog i stadsparken',
        description: 'Gör lögnen till sanning. 500 granar i Malmö.',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000 }],
  },
  {
    id: 'p4_bjorn_hjort_debatt',
    phase: 4,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Björn Hjort kallar er "Europas farligaste företag"',
    context: 'Miljöaktivisten Björn Hjort har blivit viral med sitt TED-talk. 50 miljoner visningar. Han visar satellitbilder av era kalhyggen bredvid reklamen "Vi älskar skogen".',
    choices: [
      {
        label: 'Bjud Björn Hjort på middag',
        description: 'Om han inte kan besegras, köps han',
        effects: [
          { resource: 'kapital', amount: -10_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Starta motkampanj: "Fakta om skogen"',
        description: 'Webbsida med utvalda fakta. Mycket utvalda.',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Ignorera och avverka mer',
        description: 'Ord är ord. Stammar är stammar.',
        effects: [
          { resource: 'stammar', amount: 15_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 6_000_000 }],
    unique: true,
  },
  {
    id: 'p4_riksdagsdebatt',
    phase: 4,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Riksdagsdebatt: "Skogsnationen Sverige"',
    context: 'Skogsutskottet debatterar ny skogspolitik. Er lobbyist har skrivit tre av fyra partiers debattinlägg. Det fjärde partiet vet inte att deras tal också skrevs av er.',
    choices: [
      {
        label: 'Låt debatten gå sin gång',
        description: 'Alla talar ert språk redan',
        effects: [
          { resource: 'lobby', amount: 20, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Skriv propositionen också',
        description: 'Varför stanna vid debattinlägg?',
        effects: [
          { resource: 'lobby', amount: 40, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'kapital', amount: -15_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 7_000_000 }],
    unique: true,
  },
  {
    id: 'p4_skogsstyrelsen_budget',
    phase: 4,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Skogsstyrelsens budget halveras',
    context: 'Regeringen sk\u00e4r Skogsstyrelsens budget med 50%. Myndigheten kan inte l\u00e4ngre utf\u00f6ra tillsyn. Er avdelning f\u00f6r "compliance" jublar tyst.',
    choices: [
      {
        label: '"Vi v\u00e4lkomnar effektivisering"',
        description: 'F\u00e4rre inspekt\u00f6rer = friare avverkning',
        effects: [
          { resource: 'stammar', amount: 25_000, type: 'add' },
          { resource: 'lobby', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Erbjud "privat tillsynstj\u00e4nst"',
        description: 'Ni inspekterar er sj\u00e4lva. Resultaten \u00e4r utm\u00e4rkta.',
        effects: [
          { resource: 'kapital', amount: -10_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
          { resource: 'stammar', amount: 15_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000 }],
    unique: true,
  },
]
