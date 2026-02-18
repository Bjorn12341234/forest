import type { GameEvent } from '../../store/types'

export const PHASE2_EVENTS: GameEvent[] = [
  // ── Phase 2: Den Goda Grannen ──
  {
    id: 'p2_ryssland_embargo',
    phase: 2,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Rysslands-embargo!',
    context: 'Kriget i Ukraina stoppar rysk virkesexport. Europeisk efterfrågan exploderar. Ditt virke är guld värt.',
    choices: [
      {
        label: 'Maximera leverans',
        description: 'Avverka allt tillgängligt för att möta efterfrågan',
        effects: [
          { resource: 'stammar', amount: 2_000, type: 'add' },
          { resource: 'kapital', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Höja priserna',
        description: 'Låt marknaden betala premiumpriser',
        effects: [
          { resource: 'kapital', amount: 10_000, type: 'add' },
          { resource: 'ownerTrust', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000 }],
    unique: true,
  },
  {
    id: 'p2_pension_skogsagare',
    phase: 2,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Pensionerad skogsägare säljer 800 hektar',
    context: 'Barnen vill inte ha skogen. Perfekt tillfälle att expandera — och skriva en "generös" plan.',
    replayable: true,
    choices: [
      {
        label: 'Köp till marknadspris',
        description: 'Schysst affär, bra PR',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'stammar', amount: 1_500, type: 'add' },
          { resource: 'ownerTrust', amount: 5, type: 'add' },
        ],
      },
      {
        label: '"Värdering av expert"',
        description: 'Din expert värderar skogen 40% lägre än marknadsvärde',
        effects: [
          { resource: 'kapital', amount: -1_500, type: 'add' },
          { resource: 'stammar', amount: 1_500, type: 'add' },
          { resource: 'ownerTrust', amount: -8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000 }],
  },
  {
    id: 'p2_fsc_revision',
    phase: 2,
    maxPhase: 6,
    category: 'scandal',
    headline: 'FSC-revision: Avvikelser hittade',
    context: 'Revisorn har hittat "mindre avvikelser" i 23 av 25 granskade bestånd. Pressen vill ha kommentarer.',
    replayable: true,
    choices: [
      {
        label: '"Processförändringar genomförs"',
        description: 'Tomma löften, certifieringen behålles',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Lämna FSC tillfälligt',
        description: 'Fritt fram att avverka nyckelbiotoper under pausen',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'stammar', amount: 3_000, type: 'add' },
        ],
      },
      {
        label: 'Sponsra revisionsbyrån',
        description: 'Nästa revision går smidigare',
        effects: [
          { resource: 'kapital', amount: -2_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000 }],
  },

  // ── Phase 3: Massabaronen ──
  {
    id: 'p3_kinesisk_prisras',
    phase: 3,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Kinesisk massa-dumpning!',
    context: 'Kina översvämmar marknaden med billig massa. Dina marginaler krymper. Dags att hugga snabbare — eller smartare.',
    choices: [
      {
        label: 'Sänk avverkningsåldern',
        description: 'Yngre träd = snabbare omsättning',
        effects: [
          { resource: 'stammar', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Satsa på "premiumvirke"',
        description: 'Marknadsföring av svenskt trä som lyxprodukt',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000 }],
    unique: true,
  },
  {
    id: 'p3_plockhugget',
    phase: 3,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Plockhugget-problemet',
    context: 'Skogsvispen AB visar att alternativt skogsbruk ger högre avkastning än kalavverkning. Deras rapport får uppmärksamhet.',
    choices: [
      {
        label: 'Svartmåla som "ovetenskapligt"',
        description: 'Finansiera motstudier',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Kopiera och sälj som "premium"',
        description: 'Gör dom bra? Då gör vi lika, men dyrare.',
        effects: [
          { resource: 'kapital', amount: 10_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000 }],
    unique: true,
  },
  {
    id: 'p3_sameby_protest',
    phase: 3,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Samebyns protest',
    context: 'Samebyns renskötsel har drabbats av era avverkningar. De kräver samråd — och hotar med juridik.',
    choices: [
      {
        label: 'Ignorera',
        description: 'Fortsätt som planerat',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'samiLand', amount: 15, type: 'add' },
        ],
      },
      {
        label: '"Samråd"',
        description: 'Lämna ett brev och fortsätt avverka',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'samiLand', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Köp betesmark',
        description: 'Kompensera med mark någon annanstans',
        effects: [
          { resource: 'kapital', amount: -50_000, type: 'add' },
          { resource: 'stammar', amount: 10_000, type: 'add' },
          { resource: 'samiLand', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000 }],
    unique: true,
  },
  {
    id: 'p3_wellpapp_boom',
    phase: 3,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Wellpapp-boomen',
    context: 'Mammazånas beställer 10 miljoner lådor. Nästa-dags-leverans kräver nästa-dags-avverkning. Chefen behöver lådor.',
    choices: [
      {
        label: 'Acceptera kontraktet',
        description: 'Massiv volym, kort deadline',
        effects: [
          { resource: 'kapital', amount: 50_000, type: 'add' },
          { resource: 'stammar', amount: 20_000, type: 'add' },
        ],
      },
      {
        label: 'Förhandla exklusivavtal',
        description: 'Lägre pris men långsiktig relation',
        effects: [
          { resource: 'kapital', amount: 30_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000 }],
    unique: true,
  },

  // ── Phase 4: PR-Katastrofen ──
  {
    id: 'p4_svt_dokumentar',
    phase: 4,
    maxPhase: 6,
    category: 'scandal',
    headline: 'SVT-dokumentär: Slaget om Skogen',
    context: 'Statliga Dokumentärkanalen sänder en granskning av skogsindustrin. GD Tallström raderade mejlen — men SVT hittade kopior.',
    choices: [
      {
        label: 'SMS:a GD mot SVT',
        description: 'Använd dina kontakter för att motverka',
        effects: [
          { resource: 'lobby', amount: -50, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: '"Radera mejlen"',
        description: 'Förhoppningsvis hittar ingen mer',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Låt det passera',
        description: 'Nyhetszykeln är kort',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'image', operator: '<', value: 50 }],
    unique: true,
  },
  {
    id: 'p4_nestle_retratten',
    phase: 4,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Choco-Corp Reträtten',
    context: 'Choco-Corp International — företaget som sålde bröstmjölksersättning till fattiga mödrar — tycker att DU har etikproblem. De bryter alla avtal.',
    choices: [
      {
        label: 'Dubbeldown: "Certifieringspaus"',
        description: 'Slut hyckla — avverka nyckelbiotoperna',
        effects: [
          { resource: 'image', amount: -30, type: 'add' },
          { resource: 'stammar', amount: 50_000, type: 'add' },
        ],
      },
      {
        label: 'Greenwash: Skapa "gräsrotsorganisationer"',
        description: '50 fejkade miljöorganisationer som försvarar dig',
        effects: [
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'kapital', amount: -100_000, type: 'add' },
        ],
      },
      {
        label: 'Attackera kritikerna',
        description: '"Extremister! Aktivister! De hatar skogsägare!"',
        effects: [
          { resource: 'lobby', amount: 10, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000 }],
    unique: true,
  },
  {
    id: 'p4_greta_effekten',
    phase: 4,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Greta-effekten',
    context: 'En tonåring med plakat står utanför ert huvudkontor. Global uppmärksamhet. Ert anseende är under attack.',
    choices: [
      {
        label: 'Låt det gå över',
        description: 'Global Image-katastrof i veckor',
        effects: [
          { resource: 'image', amount: -25, type: 'add' },
        ],
      },
      {
        label: '"Vi delar oron"-kampanj',
        description: 'Dyrt men kan vända narrativet',
        effects: [
          { resource: 'kapital', amount: -50_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'image', operator: '<', value: 30 }],
    unique: true,
  },
  {
    id: 'p3_kyrkan_saljer',
    phase: 3,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Svenska Kyrkan säljer',
    context: 'Kyrkan gör sig av med 3 000 hektar gammelskog. 150-årig tall till danska börshuset — "Det är cirkulärt."',
    choices: [
      {
        label: 'Köp för spotpris',
        description: 'Billig gammelskog med premium-virke',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'stammar', amount: 30_000, type: 'add' },
        ],
      },
      {
        label: 'Låt någon annan köpa',
        description: 'Konkurrenten får gammelskogen',
        effects: [
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000 }],
    unique: true,
  },
  {
    id: 'p3_nyckelbiotop',
    phase: 2,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Ideell förening hittar nyckelbiotop',
    context: 'En pensionär med GPS och artkunskap har hittat en nyckelbiotop i ditt avverkningsområde. Foton publiceras på sociala medier.',
    replayable: true,
    choices: [
      {
        label: 'Avverka allt!',
        description: 'Vinst framför ekologi',
        effects: [
          { resource: 'stammar', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Paus',
        description: 'Lämna FSC tillfälligt, avverka, återvänd',
        effects: [
          { resource: 'stammar', amount: 3_000, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Anklaga dem för att vara ovetenskapliga',
        description: 'Ifrågasatt kompetens',
        effects: [
          { resource: 'lobby', amount: 5, type: 'add' },
          { resource: 'image', amount: -3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000 }],
  },
]
