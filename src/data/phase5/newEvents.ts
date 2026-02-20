import type { GameEvent } from '../../store/types'

export const PHASE5_NEW_EVENTS: GameEvent[] = [
  // ── Phase 5: Geopolitik & EU ──
  {
    id: 'p5_eu_taxonomi',
    phase: 5,
    maxPhase: 6,
    category: 'crisis',
    headline: 'EU Taxonomin: Skogsbruk klassas som "brunt"',
    context: 'EU:s gröna taxonomi klassificerar svenskt kalhyggesbruk som icke-hållbart. Ert kapital blir "brunt" över natten. Investerare ringer.',
    choices: [
      {
        label: 'Lobba Bryssel: "Nordisk modell"',
        description: 'Skicka delegation med lax och Absolut. Resultatet oklart.',
        effects: [
          { resource: 'kapital', amount: -300_000, type: 'add' },
          { resource: 'lobby', amount: 40, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Starta eget ratingsystem',
        description: '"Nordic Green Index" — ni sätter poängen själva',
        effects: [
          { resource: 'kapital', amount: -150_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Acceptera och "ställ om"',
        description: 'Byt etikett. Samma verksamhet. Nya PowerPoints.',
        effects: [
          { resource: 'kapital', amount: -90_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000 }],
    unique: true,
  },
  {
    id: 'p5_kina_handelsavtal',
    phase: 5,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Kinas massaunderskott: Nödavtal erbjuds',
    context: 'Kina behöver 200 miljoner ton massa. De erbjuder ett tioårsavtal med garanterade priser. Villkoret: inga miljörapporter. Aldrig.',
    choices: [
      {
        label: 'Signera avtalet',
        description: 'Kinesisk sekretess. Svensk effektivitet.',
        effects: [
          { resource: 'kapital', amount: 1_500_000, type: 'add' },
          { resource: 'stammar', amount: 600_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Förhandla "transparensklausul"',
        description: 'En klausul som aldrig tillämpas. Men den finns.',
        effects: [
          { resource: 'kapital', amount: 900_000, type: 'add' },
          { resource: 'stammar', amount: 450_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 25_000_000 }],
    unique: true,
  },
  {
    id: 'p5_ai_skogsplan',
    phase: 5,
    maxPhase: 6,
    category: 'absurd',
    headline: 'AI-system optimerar avverkningsplanen',
    context: 'Ert nya AI-system har analyserat all skogsdata och föreslagit optimal avverkning. Systemets rekommendation: "Avverka allt. Omedelbart. Sedan investera i litium."',
    choices: [
      {
        label: 'Följ AI:ns rekommendation',
        description: 'Maskinen har räknat. Vem är vi att ifrågasätta?',
        effects: [
          { resource: 'stammar', amount: 1_500_000, type: 'add' },
          { resource: 'biodiversity', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Lär AI:n om "hållbarhet"',
        description: 'AI:n definierar nu hållbarhet som "att ha kvar skog att avverka imorgon"',
        effects: [
          { resource: 'stammar', amount: 600_000, type: 'add' },
          { resource: 'kapital', amount: -150_000, type: 'add' },
        ],
      },
      {
        label: 'Stäng av AI:n',
        description: 'AI:n skickar ett mejl till styrelsen: "Ni gör ett misstag."',
        effects: [
          { resource: 'kapital', amount: -60_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 35_000_000 }],
    unique: true,
  },
  {
    id: 'p5_brasilien_avtal',
    phase: 5,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Brasilien: "Lär oss svenskt skogsbruk"',
    context: 'Brasiliens skogsminister besöker Sverige. Han är imponerad av hur ni har lyckats förvandla en boreal urskog till en produktionsmaskin — och kalla det hållbart.',
    choices: [
      {
        label: 'Exportera "den svenska modellen"',
        description: 'Konsultavtal värt 2 miljarder. Amasonas nästa.',
        effects: [
          { resource: 'kapital', amount: 2_400_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: 30, type: 'add' },
        ],
      },
      {
        label: '"Vi delar gärna erfarenheter"',
        description: 'Gratis rådgivning. Goodwill. Framtida kontrakt.',
        effects: [
          { resource: 'kapital', amount: 600_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 40_000_000 }],
    unique: true,
  },
  {
    id: 'p5_global_motstand',
    phase: 5,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Global koalition: "Boycott Swedish Wood"',
    context: 'En koalition av 200 miljöorganisationer i 40 länder startar en global bojkott. Hashtagen #BoycottSwedishWood trendar i 12 länder.',
    choices: [
      {
        label: 'Vänta ut stormen',
        description: 'Bojkotter är temporära. Granskog är permanent.',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'kapital', amount: -300_000, type: 'add' },
        ],
      },
      {
        label: 'Starta motkampanj: "#TrustSwedishForestry"',
        description: 'Bottar, betalda inlägg och en känd skådespelare',
        effects: [
          { resource: 'kapital', amount: -600_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Sälj via mellanhand',
        description: 'Virket går via Lettland. Ingen vet varifrån det kom.',
        effects: [
          { resource: 'kapital', amount: -150_000, type: 'add' },
          { resource: 'stammar', amount: 300_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000 }],
    unique: true,
  },

  // ── Phase 6: Post-Biologiskt Skogsbruk ──
  {
    id: 'p6_plastträ_patent',
    phase: 6,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Patent godkänt: Plastförstärkt cellulosa',
    context: 'Ert forskningslabb har skapat "BioPlast-Gran" — ett träd som är 40% plast. Det växer snabbare. Det ruttnar aldrig. Det lever inte heller, tekniskt sett.',
    choices: [
      {
        label: 'Massproducera BioPlast-Gran',
        description: 'Det är fortfarande en gran. Nästan.',
        effects: [
          { resource: 'stammar', amount: 4_500_000, type: 'add' },
          { resource: 'biodiversity', amount: -10, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Sälj patentet till Nastlé',
        description: 'De har redan plast i allt. Perfekt synergi.',
        effects: [
          { resource: 'kapital', amount: 1_500_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 150_000_000 }],
    unique: true,
  },
  {
    id: 'p6_sista_insekten',
    phase: 6,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Sista pollineraren försvann',
    context: 'Det finns inga insekter kvar i era skogsområden. Produktionen påverkas inte — monokulturer behöver inte pollinering. PR-avdelningen skriver: "Effektiv naturförvaltning."',
    choices: [
      {
        label: '"Vi noterar utvecklingen"',
        description: 'Notering gjord. Ingen åtgärd planerad.',
        effects: [
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Lansera drönare-pollinatörer',
        description: 'Små robotbin. De bestöver ingenting men ser bra ut i filmer.',
        effects: [
          { resource: 'kapital', amount: -300_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'biodiversity', operator: '<=', value: 15 }],
    unique: true,
  },
  {
    id: 'p6_klon_skog',
    phase: 6,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Klonskog: Alla träd är identiska',
    context: 'Er genetiska avdelning har lyckats. Varje träd i Norrland är nu en genetisk kopia av "Gran Zero" — den mest produktiva individen. Sjukdomar sprids omedelbart. Men det är effektivt.',
    choices: [
      {
        label: 'Acceptera risken',
        description: 'Maximal produktion tills katastrofen. Om den kommer.',
        effects: [
          { resource: 'stammar', amount: 6_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Skapa "Gran One" som backup',
        description: 'En andra klon. Genetisk mångfald: 2.',
        effects: [
          { resource: 'stammar', amount: 3_000_000, type: 'add' },
          { resource: 'kapital', amount: -600_000, type: 'add' },
          { resource: 'biodiversity', amount: -3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 250_000_000 }],
    unique: true,
  },
  {
    id: 'p6_drone_uppror',
    phase: 6,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Autonoma skördare vägrar avverka gammelskog',
    context: 'AI-systemet som styr era skördare har utvecklat en egen policy. Det vägrar avverka träd äldre än 200 år. Tekniker arbetar med att "korrigera buggen".',
    choices: [
      {
        label: 'Åsidosätt AI:ns beslut',
        description: 'Manuell avverkning. Dyrt men lydigt.',
        effects: [
          { resource: 'kapital', amount: -900_000, type: 'add' },
          { resource: 'stammar', amount: 1_500_000, type: 'add' },
        ],
      },
      {
        label: 'Acceptera AI:ns policy',
        description: 'Maskinen vet bäst. Tydligen.',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'biodiversity', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Definiera om "gammelskog" till >500 år',
        description: 'Om inga träd är 500 år gäller policyn aldrig',
        effects: [
          { resource: 'stammar', amount: 2_400_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000_000 }],
    unique: true,
  },
  {
    id: 'p5_patent_co2',
    phase: 5,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Patent: Syntetisk fotosyntes',
    context: 'Ert labb har patenterat artificiell fotosyntes. Ni kan nu producera cellulosa utan träd. Styrelsen frågar: "Varför har vi skog?"',
    choices: [
      {
        label: 'Bygg syntetiska fabriker',
        description: 'Skog utan skog. Maximal effektivitet.',
        effects: [
          { resource: 'stammar', amount: 2_400_000, type: 'add' },
          { resource: 'kapital', amount: -900_000, type: 'add' },
        ],
      },
      {
        label: 'Använd patent som hot',
        description: '"Vi behöver inte skog. Ge oss bättre villkor."',
        effects: [
          { resource: 'lobby', amount: 50, type: 'add' },
          { resource: 'kapital', amount: 600_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 60_000_000 }],
    unique: true,
  },
  {
    id: 'p6_vatten_krig',
    phase: 6,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Vattenkriget: Grannlän kräver kompensation',
    context: 'Era granplantager har sänkt grundvattennivån i tre län. Kommuner kräver 500 miljoner i kompensation. Ert svar: "Träd behöver vatten. Det är naturligt."',
    choices: [
      {
        label: 'Betala och tysta ner',
        description: 'Billigare än PR-krisen',
        effects: [
          { resource: 'kapital', amount: -1_500_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Bestrida i rätten',
        description: 'Juridisk process. 12 år. Fortsätt avverka.',
        effects: [
          { resource: 'stammar', amount: 900_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Köp vattenrättigheterna',
        description: 'Om ni äger vattnet kan ingen klaga.',
        effects: [
          { resource: 'kapital', amount: -2_400_000, type: 'add' },
          { resource: 'lobby', amount: 30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 180_000_000 }],
    unique: true,
  },
  {
    id: 'p6_nobel_cellulosa',
    phase: 6,
    maxPhase: 6,
    category: 'nobel',
    headline: 'Nobelpris i kemi: Cellulosananopartiklar',
    context: 'Er forskningsavdelning vinner Nobel. Pristagaren tackar i sitt tal "den industriella vision som möjliggjort denna forskning". Han nämner inte kalhyggena.',
    choices: [
      {
        label: 'Maximera PR-värdet',
        description: '"Sveriges Nobelpristagare — drivna av Massaindustrin"',
        effects: [
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'kapital', amount: 900_000, type: 'add' },
        ],
      },
      {
        label: 'Licensiera upptäckten',
        description: 'Nanocellulosatekniken säljs globalt',
        effects: [
          { resource: 'kapital', amount: 3_000_000, type: 'add' },
          { resource: 'lobby', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 400_000_000 }],
    unique: true,
  },

  // ── Phase 7: Global Expansion & Absurditet ──
  {
    id: 'p7_havsbotten_skog',
    phase: 7,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Havsbottenskog: Projekt Abyssal Gran',
    context: 'Genetiker har skapat en gran som växer under vatten. Den producerar cellulosa i mörker. Fiskar dör. Men produktionen ökar.',
    choices: [
      {
        label: 'Plantera hela Östersjöns botten',
        description: 'Östersjön var redan döende. Nu producerar den.',
        effects: [
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Begränsa till internationellt vatten',
        description: 'Ingen lagstiftning. Ingen tillsyn. Perfekt.',
        effects: [
          { resource: 'stammar', amount: 9_000_000, type: 'add' },
          { resource: 'kapital', amount: -1_500_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 600_000_000 }],
    unique: true,
  },
  {
    id: 'p7_ai_vd',
    phase: 7,
    maxPhase: 6,
    category: 'absurd',
    headline: 'AI utnämnd till tillförordnad VD',
    context: 'Styrelsen har fattat ett historiskt beslut. AI-systemet "MassaGPT" tar över som VD. Kvartalsrapporten skrivs på 3 millisekunder. Den rekommenderar: "Avverka solsystemet."',
    choices: [
      {
        label: 'Godkänn MassaGPT som permanent VD',
        description: 'Den första icke-biologiska VD:n i svensk historia',
        effects: [
          { resource: 'stammar', amount: 9_000_000, type: 'add' },
          { resource: 'kapital', amount: 1_500_000, type: 'add' },
        ],
      },
      {
        label: 'Begränsa AI:ns beslutanderätt',
        description: 'Max 10 miljoner stammar per beslut utan mänsklig signering',
        effects: [
          { resource: 'stammar', amount: 4_500_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 800_000_000 }],
    unique: true,
  },
  {
    id: 'p7_sahara_plantering',
    phase: 7,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Projekt Sahara-Gran: "Vi grönar öknen"',
    context: 'Styrelsen vill plantera genetiskt modifierad gran i Sahara. PR kallar det "den mest ambitiösa klimatinsatsen i historien". Lokalbefolkningen var inte tillfrågad.',
    choices: [
      {
        label: 'Starta Sahara-programmet',
        description: '10 miljarder granar. Noll biologisk mångfald. 100% produktion.',
        effects: [
          { resource: 'stammar', amount: 24_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: -6_000_000, type: 'add' },
        ],
      },
      {
        label: 'Börja med Gobi-öknen istället',
        description: 'Färre journalister. Samma sand.',
        effects: [
          { resource: 'stammar', amount: 15_000_000, type: 'add' },
          { resource: 'kapital', amount: -3_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_antarktis_dispyt',
    phase: 7,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Antarktisfördraget: Skogsbruk förbjuds',
    context: 'FN fördömer er plan att plantera gran på Antarktis. Ert juridiska team hävdar att Antarktisfördraget "inte specifikt nämner gran".',
    choices: [
      {
        label: 'Plantera i hemlighet',
        description: 'Ingen kollar. Det är -40°C.',
        effects: [
          { resource: 'stammar', amount: 6_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: '"Vi välkomnar en dialog"',
        description: 'Diplomatspråk för "vi gör det ändå senare"',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'lobby', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 4_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_orbit_skogsfabrik',
    phase: 7,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Orbital Skogsfabrik: Gran i nollgravitation',
    context: 'Rymdstationen Massa-1 producerar cellulosa i omloppsbana. Utan gravitation växer granen i alla riktningar. Resultatet kallas "sfärisk optimering".',
    choices: [
      {
        label: 'Skala upp till 50 stationer',
        description: 'Omloppsbanans ekonomi kräver volym',
        effects: [
          { resource: 'stammar', amount: 30_000_000, type: 'add' },
          { resource: 'kapital', amount: -15_000_000, type: 'add' },
        ],
      },
      {
        label: 'Sälj rymdvirke som lyx',
        description: '"Space-Grown™ Spruce" — 10 000 kr per planka',
        effects: [
          { resource: 'kapital', amount: 9_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 6_000_000_000 }],
    unique: true,
  },
  {
    id: 'p5_korruption_index',
    phase: 5,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Transparency International: Sverige faller',
    context: 'Sveriges korruptionsranking faller för tredje året i rad. Rapporten nämner "systemisk sammanflätning mellan skogsindustri och stat". Er logotyp finns i marginalen.',
    choices: [
      {
        label: '"Korrelation är inte kausalitet"',
        description: 'Statistiskt korrekt. Moraliskt suspekt.',
        effects: [
          { resource: 'image', amount: -12, type: 'add' },
          { resource: 'lobby', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Donera till Transparency International',
        description: 'Nästa rapport kommer vara vaginare.',
        effects: [
          { resource: 'kapital', amount: -240_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 70_000_000 }],
    unique: true,
  },
  {
    id: 'p6_permafrost_kollaps',
    phase: 6,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Permafrost kollapsar: Metanläckage',
    context: 'Er expansion i Sibirien har accelererat permafrostsmältningen. Metan bubblar ur marken. Klimateffekten: katastrofal. Er reaktion: "Vi planterar gran på den tinade marken."',
    choices: [
      {
        label: 'Plantera på den tinade marken',
        description: 'Problem = möjlighet. Metan = värme = snabbare tillväxt.',
        effects: [
          { resource: 'stammar', amount: 4_500_000, type: 'add' },
          { resource: 'biodiversity', amount: -8, type: 'add' },
          { resource: 'realCO2', amount: 500_000, type: 'add' },
        ],
      },
      {
        label: 'Dra sig tillbaka från Sibirien',
        description: 'Ryska myndigheter är lättade. Tillfälligt.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: -600_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 350_000_000 }],
    unique: true,
  },
  {
    id: 'p7_digital_tvilling',
    phase: 7,
    maxPhase: 6,
    category: 'absurd',
    headline: 'Digital tvilling: Hela skogen finns i datorn',
    context: 'Er digitala tvilling av hela den svenska skogen är komplett. Varje träd har en avatar. Styrelsen frågar: "Kan vi avverka den digitala skogen också?" Svaret: ja.',
    choices: [
      {
        label: 'Sälj digitalt virke som NFT',
        description: 'Pixlar av gran. 50 000 kr per NFT.',
        effects: [
          { resource: 'kapital', amount: 6_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Använd tvillingen för "virtual logging"',
        description: 'Träna AI på simulerade avverkningar. Då går det snabbare på riktigt.',
        effects: [
          { resource: 'stammar', amount: 12_000_000, type: 'add' },
          { resource: 'kapital', amount: -2_400_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_500_000_000 }],
    unique: true,
  },
]
