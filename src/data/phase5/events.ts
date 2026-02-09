import type { GameEvent } from '../../store/types'

export const PHASE5_EVENTS: GameEvent[] = [
  // ── Phase 5: Det Skogsindustriella Komplexet ──
  {
    id: 'p5_maktutredning',
    phase: 5,
    category: 'scandal',
    headline: 'Maktutredningen publiceras',
    context: 'Riksskogsnamnden publicerar sin rapport "Makten Over Skogen". Den visar hur lobbyister styrt skogspolitiken i 30 ar. Pressen ar intresserad.',
    choices: [
      {
        label: 'Tysta ner det',
        description: 'Anvand dina kontakter for att begrava rapporten',
        effects: [
          { resource: 'lobby', amount: -100, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: '"Vi valkomnar transparens"',
        description: 'Sag att du star bakom utredningen',
        effects: [
          { resource: 'kapital', amount: -50_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Attackera utredarna',
        description: '"Politiskt motiverad!" — finansiera motrapport',
        effects: [
          { resource: 'kapital', amount: -30_000, type: 'add' },
          { resource: 'lobby', amount: 20, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000 }],
    unique: true,
  },
  {
    id: 'p5_eu_inspektion',
    phase: 5,
    category: 'crisis',
    headline: 'EU-inspektion: Avskogningsforordningen',
    context: 'EU skickar inspektorer for att granska er compliance. De har satellitbilder.',
    choices: [
      {
        label: 'Samarbeta fullt ut',
        description: 'Visa upp modellomraden, dol resten',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Fordroj inspektionen',
        description: 'Juridisk process tar ar. Hugga medan dom vantar.',
        effects: [
          { resource: 'stammar', amount: 100_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000 }],
    unique: true,
  },
  {
    id: 'p5_svangdorr_skandal',
    phase: 5,
    category: 'scandal',
    headline: 'Svangdorrsskandalen',
    context: 'Tre ex-ministrar jobbar nu for din koncern. Media borjar granska "den svenska modellen".',
    choices: [
      {
        label: '"Helt normalt i Sverige"',
        description: 'Alla gor det. Ingen bryr sig.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Skapa etikrad',
        description: 'En tandlos rad som aldrig mots',
        effects: [
          { resource: 'kapital', amount: -10_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000 }],
    unique: true,
  },
  {
    id: 'p5_klimattoppmote',
    phase: 5,
    category: 'opportunity',
    headline: 'Klimattoppmote: Sverige talar',
    context: 'Sverige presenterar sin skogspolitik som klimatlosning pa internationell scen. Du skriver talet.',
    choices: [
      {
        label: '"Skogen ar losningen"',
        description: 'Marknadsfor svenskt skogsbruk globalt',
        effects: [
          { resource: 'kapital', amount: 100_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Ligga lagt',
        description: 'Lat nagon annan prata',
        effects: [
          { resource: 'image', amount: -3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000 }],
    unique: true,
  },

  // ── Phase 6: Post-Biologisk Skogsbruk ──
  {
    id: 'p6_sista_blandskogen',
    phase: 6,
    category: 'absurd',
    headline: 'Sista blandskogen identifierad',
    context: 'I nordvastra Jamtland finns Sveriges sista orovda blandskog. 400 ar gammal. Unik biologisk mangfald. Din skordare ar 3 km bort.',
    choices: [
      {
        label: 'Avverka',
        description: '100% effektivitet. Inga undantag.',
        effects: [
          { resource: 'stammar', amount: 500_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Gor den till "upplevelsespark"',
        description: 'Ingangsavgift 350 kr. Stigar i betong.',
        effects: [
          { resource: 'kapital', amount: 50_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000_000 }],
    unique: true,
  },
  {
    id: 'p6_genetisk_gran',
    phase: 6,
    category: 'absurd',
    headline: 'Genetiskt Optimerad Gran v3.0',
    context: 'Forskarteamet har skapat en gran som vaxer 5x snabbare. Den har inga grenar. Inga barr. Inget liv lever i den. Men den ar mycket effektiv.',
    choices: [
      {
        label: 'Plantera overallt',
        description: 'Ersatt alla bestand med v3.0',
        effects: [
          { resource: 'stammar', amount: 1_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -15, type: 'add' },
        ],
      },
      {
        label: '"Pilot-projekt"',
        description: 'Bara 50 000 hektar. For att borja med.',
        effects: [
          { resource: 'stammar', amount: 300_000, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000_000 }],
    unique: true,
  },
  {
    id: 'p6_tyst_var',
    phase: 6,
    category: 'absurd',
    headline: 'Den sista fageln tystnar',
    context: 'Ornitologer rapporterar att den sista havsornspopulationen i Norrland har forsvunnit. Skogen ar tyst. Dina maskiner ar inte det.',
    choices: [
      {
        label: '"Naturlig variation"',
        description: 'Inget att se har. Fortsatt avverka.',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Sponsra fagelholkar',
        description: 'I betong. For de faglar som inte finns langre.',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'biodiversity', operator: '<=', value: 20 }],
    unique: true,
  },
  {
    id: 'p6_ai_skordare',
    phase: 6,
    category: 'opportunity',
    headline: 'AI-skordarnätverk live',
    context: 'Dina autonoma skordare opererar nu nattetid. GPS-styrda. Tysta. Effektiva. Ingen ser dem. Ingen hor dem. Skogen hor dem.',
    choices: [
      {
        label: 'Full autonomi',
        description: 'Lat AI:n optimera utan mansklig inblandning',
        effects: [
          { resource: 'stammar', amount: 2_000_000, type: 'add' },
        ],
      },
      {
        label: 'Manniskoovervakning',
        description: 'En operator per 50 maskiner. For sakerhets skull.',
        effects: [
          { resource: 'stammar', amount: 1_000_000, type: 'add' },
          { resource: 'kapital', amount: -50_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000_000 }],
    unique: true,
  },

  // ── Phase 7: UNIVERSUM AB ──
  {
    id: 'p7_lunar_silva',
    phase: 7,
    category: 'absurd',
    headline: 'Projekt Lunar Silva godkant',
    context: 'Styrelsen har beslutat: Manen ska terraformas for skogsbruk. CO2 som atmosfar-investering. Genetiskt modifierade trad i 0.6% atmosfarstryck.',
    choices: [
      {
        label: 'Starta terraforming',
        description: 'Varfor sluta vid atmosfaren?',
        effects: [
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000, type: 'add' },
        ],
      },
      {
        label: 'Mars forst',
        description: 'Storre yta. Battre ROI.',
        effects: [
          { resource: 'stammar', amount: 3_000_000, type: 'add' },
          { resource: 'kapital', amount: -300_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_mars_massafabrik',
    phase: 7,
    category: 'absurd',
    headline: 'Mars Massafabrik produktionsstart',
    context: 'Den forsta massafabriken pa Mars ar online. Kvaliteten ar lag. Men ingen klagar — det finns inga manniskor dar.',
    choices: [
      {
        label: 'Skala upp',
        description: 'Bygga 50 fabriker till',
        effects: [
          { resource: 'stammar', amount: 10_000_000, type: 'add' },
          { resource: 'kapital', amount: 1_000_000, type: 'add' },
        ],
      },
      {
        label: 'Optimera forst',
        description: 'Kalitera AI for Mars-forhallanden',
        effects: [
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_sista_manniskan',
    phase: 7,
    category: 'absurd',
    headline: 'Sista manniskliga anstallda avgar',
    context: 'Din sista manskliga medarbetare gar i pension. Fran och med nu drivs hela koncernen av AI. Styrelsemotena halls mellan serverhallar.',
    choices: [
      {
        label: 'Tacktal via hogtalsare',
        description: '"Tack for allt. AI tar det harfran."',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Automatisera tackeventen ocksa',
        description: 'Effektivitet i alla led',
        effects: [
          { resource: 'kapital', amount: 10_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000_000 }],
    unique: true,
  },
  {
    id: 'p7_universum_kvitto',
    phase: 7,
    category: 'absurd',
    headline: 'Aktieagarna kraver arsredovisning',
    context: 'Det ar dags. Sifforna maste fram. Allt du byggt — och allt du forstorde — sammanfattas i ett kvitto.',
    choices: [
      {
        label: 'Visa kvittot',
        description: 'Sanningens ogonblick',
        effects: [
          { resource: 'stammar', amount: 0, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000_000 }],
    unique: true,
  },
]
