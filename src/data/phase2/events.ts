import type { GameEvent } from '../../store/types'

export const PHASE2_EVENTS: GameEvent[] = [
  // ── Phase 2: Den Goda Grannen ──
  {
    id: 'p2_ryssland_embargo',
    phase: 2,
    category: 'opportunity',
    headline: 'Rysslands-embargo!',
    context: 'Kriget i Ukraina stoppar rysk virkesexport. Europeisk efterfragan exploderar. Ditt virke ar guld vart.',
    choices: [
      {
        label: 'Maximera leverans',
        description: 'Avverka allt tillgangligt for att mota efterfragan',
        effects: [
          { resource: 'stammar', amount: 2_000, type: 'add' },
          { resource: 'kapital', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Hoja priserna',
        description: 'Lat marknaden betala premiumpriser',
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
    category: 'opportunity',
    headline: 'Pensionerad skogsagare saljer 800 hektar',
    context: 'Barnen vill inte ha skogen. Perfekt tillfalle att expandera — och skriva en "geneross" plan.',
    choices: [
      {
        label: 'Kop till marknadspris',
        description: 'Schysst affar, bra PR',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'stammar', amount: 1_500, type: 'add' },
          { resource: 'ownerTrust', amount: 5, type: 'add' },
        ],
      },
      {
        label: '"Vardering av expert"',
        description: 'Din expert varderar skogen 40% lagre an marknadsvarde',
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
    category: 'scandal',
    headline: 'FSC-revision: Avvikelser hittade',
    context: 'Revisorn har hittat "mindre avvikelser" i 23 av 25 granskade bestand. Pressen vill ha kommentarer.',
    choices: [
      {
        label: '"Processforandringar genomfors"',
        description: 'Tomma loften, certifieringen behalles',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Lamna FSC tillfaldigt',
        description: 'Fritt fram att avverka nyckelbiotoper under pausen',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'stammar', amount: 3_000, type: 'add' },
        ],
      },
      {
        label: 'Sponsra revisionsbyran',
        description: 'Nasta revision gar smidigare',
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
    category: 'crisis',
    headline: 'Kinesisk massa-dumpning!',
    context: 'Kina oversvammar marknaden med billig massa. Dina marginaler krymper. Dags att hugga snabbare — eller smartare.',
    choices: [
      {
        label: 'Sank avverkningsaldern',
        description: 'Yngre trad = snabbare omsattning',
        effects: [
          { resource: 'stammar', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Satsa pa "premiumvirke"',
        description: 'Marknadsforing av svenskt trad som lyxprodukt',
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
    category: 'contradiction',
    headline: 'Plockhugget-problemet',
    context: 'Skogsvispen AB visar att alternativt skogsbruk ger hogre avkastning an kalavverkning. Deras rapport far uppmärksamhet.',
    choices: [
      {
        label: 'Svartmala som "ovetenskapligt"',
        description: 'Finansiera motstudier',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Kopiera och salj som "premium"',
        description: 'Gror dom bra? Da gor vi lika, men dyrare.',
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
    category: 'crisis',
    headline: 'Samebyns protest',
    context: 'Samebyns renskotsel har drabbats av era avverkningar. De kraver samrad — och hotar med juridik.',
    choices: [
      {
        label: 'Ignorera',
        description: 'Fortsatt som planerat',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'samiLand', amount: 15, type: 'add' },
        ],
      },
      {
        label: '"Samrad"',
        description: 'Lamna ett brev och fortsatt avverka',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'samiLand', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Kop betesmark',
        description: 'Kompensera med mark nagon annanstans',
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
    category: 'opportunity',
    headline: 'Wellpapp-boomen',
    context: 'Kartongen.com bestaller 10 miljoner lador. Nastadagsleverans kraver nastadagsavverkning. Jeff behover lador.',
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
        label: 'Forhandla exklusivavtal',
        description: 'Lagre pris men langsiktig relation',
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
    category: 'scandal',
    headline: 'SVT-dokumentar: Slaget om Skogen',
    context: 'Statliga Dokumentarkanalen sandar en granskning av skogsindustrin. GD Tallstrom raderade mejlen — men SVT hittade kopior.',
    choices: [
      {
        label: 'SMS:a GD mot SVT',
        description: 'Anvand dina kontakter for att motverka',
        effects: [
          { resource: 'lobby', amount: -50, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: '"Radera mejlen"',
        description: 'Forhoppningsvis hittar ingen mer',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Lat det passera',
        description: 'Nyhetszykeln ar kort',
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
    category: 'crisis',
    headline: 'Choco-Corp Retratten',
    context: 'Choco-Corp International — foretaget som salde brostmjolksersattning till fattiga modrar — tycker att DU har etikproblem. De bryter alla avtal.',
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
        label: 'Greenwash: Skapa "grasrotsorganisationer"',
        description: '50 fejkade miljoorganisationer som forsvarar dig',
        effects: [
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'kapital', amount: -100_000, type: 'add' },
        ],
      },
      {
        label: 'Attackera kritikerna',
        description: '"Extremister! Aktivister! De hatar skogsagare!"',
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
    category: 'crisis',
    headline: 'Greta-effekten',
    context: 'En tonaring med plakat star utanfor ert huvudkontor. Global uppmärksamhet. Ert anseende ar under attack.',
    choices: [
      {
        label: 'Lat det ga over',
        description: 'Global Image-katastrof i veckor',
        effects: [
          { resource: 'image', amount: -25, type: 'add' },
        ],
      },
      {
        label: '"Vi delar oron"-kampanj',
        description: 'Dyrt men kan vanda narrativet',
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
    category: 'opportunity',
    headline: 'Svenska Kyrkan saljer',
    context: 'Kyrkan gror sig av 3 000 hektar gammelskog. 150-arig tall till danska borshuset — "Det ar cirkularit."',
    choices: [
      {
        label: 'Kop for spotpris',
        description: 'Billig gammelskog med premium-virke',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'stammar', amount: 30_000, type: 'add' },
        ],
      },
      {
        label: 'Lat nagon annan kopa',
        description: 'Konkurrenten far gammelskogen',
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
    category: 'contradiction',
    headline: 'Ideell forening hittar nyckelbiotop',
    context: 'En pensionar med GPS och artkunskap har hittat en nyckelbiotop i ditt avverkningsomrade. Foton publiceras pa sociala medier.',
    choices: [
      {
        label: 'Avverka anda',
        description: 'Vinst framfor ekologi',
        effects: [
          { resource: 'stammar', amount: 5_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: '"Paus" certifiering',
        description: 'Lamna FSC tillfaldigt, avverka, atervand',
        effects: [
          { resource: 'stammar', amount: 3_000, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Anklaga dem som "ovetenskapliga"',
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
