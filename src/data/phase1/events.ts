import type { GameEvent } from '../../store/types'

export const PHASE1_EVENTS: GameEvent[] = [
  // ── Skandaler ──
  {
    id: 'p1_scandal_kalhygge',
    phase: 1,
    category: 'scandal',
    headline: 'Kalhygge invid populär vandringsled',
    context: 'Foton sprids på sociala medier. Turister är upprörda. Aktien darrar.',
    choices: [
      {
        label: '"Naturlig föryngring"',
        description: 'Omformulera kalhygget som ekologisk skötsel',
        effects: [
          { resource: 'stammar', amount: 50, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Plantera prydnadsträd',
        description: 'Kosmetisk åtgärd längs leden',
        effects: [
          { resource: 'kapital', amount: -20, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_scandal_dike',
    phase: 1,
    category: 'scandal',
    headline: 'Dikning förstör våtmark',
    context: 'Länsstyrelsen har upptäckt att ert dikningsarbete dränerat en skyddad våtmark.',
    choices: [
      {
        label: '"Vi kände inte till det"',
        description: 'Skylla på entreprenören',
        effects: [
          { resource: 'stammar', amount: 30, type: 'add' },
          { resource: 'image', amount: -3, type: 'add' },
        ],
      },
      {
        label: 'Betala böter',
        description: 'Snabb lösning, dyr men tyst',
        effects: [
          { resource: 'kapital', amount: -50, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 20 }],
  },
  {
    id: 'p1_scandal_fsc_brott',
    phase: 1,
    category: 'scandal',
    headline: 'FSC-certifiering ifrågasatt',
    context: 'Granskare visar att certifierat skogsbruk knappt skiljer sig från vanligt.',
    choices: [
      {
        label: '"Processfel"',
        description: 'Skylla på revisionsbyrån',
        effects: [
          { resource: 'stammar', amount: 40, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Utlova förbättringar',
        description: 'Tomma löften kostar inget',
        effects: [
          { resource: 'image', amount: 2, type: 'add' },
          { resource: 'stammar', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100 }],
  },

  // ── Möjligheter ──
  {
    id: 'p1_opp_massaorder',
    phase: 1,
    category: 'opportunity',
    headline: 'Stor massaorder från pappersbruk',
    context: 'Ett stort pappersbruk vill köpa allt ni kan leverera. Priset är bra.',
    choices: [
      {
        label: 'Maximal leverans',
        description: 'Avverka allt tillgängligt',
        effects: [
          { resource: 'kapital', amount: 100, type: 'add' },
          { resource: 'stammar', amount: 80, type: 'add' },
        ],
      },
      {
        label: 'Förhandla långtidsavtal',
        description: 'Lägre pris men stabil inkomst',
        effects: [
          { resource: 'kapital', amount: 50, type: 'add' },
          { resource: 'stammar', amount: 40, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_opp_markskop',
    phase: 1,
    category: 'opportunity',
    headline: 'Skogsmark till salu',
    context: 'En grannfastighet säljs. 500 hektar produktiv skogsmark.',
    choices: [
      {
        label: 'Köp direkt',
        description: 'Mer mark, mer stammar',
        effects: [
          { resource: 'kapital', amount: -80, type: 'add' },
          { resource: 'stammar', amount: 120, type: 'add' },
        ],
      },
      {
        label: 'Avvakta',
        description: 'Spara kapitalet',
        effects: [
          { resource: 'kapital', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Avverka direkt, sälj till raffinaderi',
        description: 'Marken passar perfekt för ett tyskt oljeraffinaderi. Importerad LNG till 3x världspriset.',
        effects: [
          { resource: 'stammar', amount: 200, type: 'add' },
          { resource: 'kapital', amount: 150, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'kapital', operator: '>=', value: 50 }],
  },
  {
    id: 'p1_opp_bioenergi',
    phase: 1,
    category: 'opportunity',
    headline: 'Kommunen vill ha bioenergi',
    context: 'Lokalt värmeverk vill byta till träflis. Långsiktigt avtal erbjuds.',
    choices: [
      {
        label: 'Teckna avtal',
        description: 'Stabil kapitalström',
        effects: [
          { resource: 'kapital', amount: 80, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Kräv högre pris',
        description: 'Riskerar att förlora affären',
        effects: [
          { resource: 'kapital', amount: 150, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50 }],
  },
  {
    id: 'p1_opp_stormfallning',
    phase: 1,
    category: 'opportunity',
    headline: 'Storm har fällt grannens skog',
    context: 'Stormfälld skog till vrakpris. Snabb volym om ni agerar nu.',
    choices: [
      {
        label: 'Köp stormvirket',
        description: 'Billigt virke, snabb vinst',
        effects: [
          { resource: 'stammar', amount: 100, type: 'add' },
          { resource: 'kapital', amount: -30, type: 'add' },
        ],
      },
      {
        label: 'Hjälp grannen gratis',
        description: 'Bygger förtroende i bygden',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'stammar', amount: 30, type: 'add' },
        ],
      },
    ],
  },

  // ── Absurda ──
  {
    id: 'p1_absurd_alg',
    phase: 1,
    category: 'absurd',
    headline: 'Älg äter nyplantering',
    context: 'En ensam älg har ätit 2000 granplantor. Skogsvårdsstyrelsen skyller på er.',
    choices: [
      {
        label: '"Naturens gång"',
        description: 'Acceptera förlusterna',
        effects: [
          { resource: 'stammar', amount: -20, type: 'add' },
          { resource: 'image', amount: 2, type: 'add' },
        ],
      },
      {
        label: 'Kräv jaktlicens',
        description: 'Älgbeståndet måste regleras',
        effects: [
          { resource: 'stammar', amount: 50, type: 'add' },
          { resource: 'image', amount: -2, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_absurd_svamp',
    phase: 1,
    category: 'absurd',
    headline: 'Svampplockare blockerar avverkning',
    context: 'En grupp svampentusiaster har kedjar fast sig vid skördaren.',
    choices: [
      {
        label: 'Vänta ut dem',
        description: 'Kostar tid men undviker PR-kris',
        effects: [
          { resource: 'stammar', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Ring polisen',
        description: 'Snabb lösning, dålig press',
        effects: [
          { resource: 'stammar', amount: 70, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 15 }],
  },
  {
    id: 'p1_absurd_renskotsel',
    phase: 1,
    category: 'absurd',
    headline: 'Renar på planteringen',
    context: 'Samisk renskötsel och er plantering överlappar. Igen.',
    choices: [
      {
        label: '"Vi var här först"',
        description: 'Hävda markrättigheter',
        effects: [
          { resource: 'stammar', amount: 60, type: 'add' },
          { resource: 'image', amount: -4, type: 'add' },
        ],
      },
      {
        label: 'Samråda',
        description: 'Kompromiss tar tid',
        effects: [
          { resource: 'stammar', amount: 20, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200 }],
  },

  // ── Kriser ──
  {
    id: 'p1_crisis_bark',
    phase: 1,
    category: 'crisis',
    headline: 'Barkborreangrepp',
    context: 'Granbarkborren har angripit era bestånd. Tusentals kubikmeter hotas.',
    choices: [
      {
        label: 'Nödavverka',
        description: 'Rädda virket, förlora beståndet',
        effects: [
          { resource: 'stammar', amount: 150, type: 'add' },
          { resource: 'kapital', amount: -50, type: 'add' },
        ],
      },
      {
        label: 'Sätt fällor',
        description: 'Långsam men billigare insats',
        effects: [
          { resource: 'kapital', amount: -20, type: 'add' },
          { resource: 'stammar', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Avverka allt och salta jorden',
        description: 'Inga borrar kan leva på en parkeringsplats. Bygg köpcentrum.',
        effects: [
          { resource: 'stammar', amount: 300, type: 'add' },
          { resource: 'kapital', amount: 100, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300 }],
  },
  {
    id: 'p1_crisis_brand',
    phase: 1,
    category: 'crisis',
    headline: 'Skogsbrand!',
    context: 'Torr sommar + blixtnedslag = katastrof. 200 hektar brinner.',
    unique: true,
    choices: [
      {
        label: 'Släck och rädda',
        description: 'Dyrt men räddar en del virke',
        effects: [
          { resource: 'kapital', amount: -100, type: 'add' },
          { resource: 'stammar', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Kassera in försäkring',
        description: 'Pengarna trillar in, skogen brinner ut',
        effects: [
          { resource: 'kapital', amount: 200, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500 }],
  },
]
