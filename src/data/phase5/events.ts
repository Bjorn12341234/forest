import type { GameEvent } from '../../store/types'

export const PHASE5_EVENTS: GameEvent[] = [
  // ── Phase 5: Det Skogsindustriella Komplexet ──
  {
    id: 'p5_maktutredning',
    phase: 5,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Maktutredningen publiceras',
    context: 'Riksskogsnämnden publicerar sin rapport "Makten Över Skogen". Den visar hur lobbyister styrt skogspolitiken i 30 år. Pressen är intresserad.',
    choices: [
      {
        label: 'Tysta ner det',
        description: 'Använd dina kontakter för att begrava rapporten',
        effects: [
          { resource: 'lobby', amount: -100, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: '"Vi välkomnar transparens"',
        description: 'Säg att du står bakom utredningen',
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
    maxPhase: 6,
    category: 'crisis',
    headline: 'EU-inspektion: Avskogningsförordningen',
    context: 'EU skickar inspektörer för att granska er compliance. De har satellitbilder.',
    choices: [
      {
        label: 'Samarbeta fullt ut',
        description: 'Visa upp modellområden, dölj resten',
        effects: [
          { resource: 'kapital', amount: -20_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Fördröj inspektionen',
        description: 'Juridisk process tar år. Hugga medan dom väntar.',
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
    maxPhase: 6,
    category: 'scandal',
    headline: 'Svängdörrsskandalen',
    context: 'Tre ex-ministrar jobbar nu för din koncern. Media börjar granska "den svenska modellen".',
    choices: [
      {
        label: '"Helt normalt i Sverige"',
        description: 'Alla gör det. Ingen bryr sig.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Skapa etikråd',
        description: 'En tandlös råd som aldrig möts',
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
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Klimattoppmöte: Sverige talar',
    context: 'Sverige presenterar sin skogspolitik som klimatlösning på internationell scen. Du skriver talet.',
    choices: [
      {
        label: '"Skogen är lösningen"',
        description: 'Marknadsför svenskt skogsbruk globalt',
        effects: [
          { resource: 'kapital', amount: 100_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Ligga lågt',
        description: 'Låt någon annan prata',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Sista blandskogen identifierad',
    context: 'I nordvästra Jämtland finns Sveriges sista orörda blandskog. 400 år gammal. Unik biologisk mångfald. Din skördare är 3 km bort.',
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
        label: 'Gör den till "upplevelsespark"',
        description: 'Ingångsavgift 350 kr. Stigar i betong.',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Genetiskt Optimerad Gran v3.0',
    context: 'Forskarteamet har skapat en gran som växer 5x snabbare. Den har inga grenar. Inga barr. Inget liv lever i den. Men den är mycket effektiv.',
    choices: [
      {
        label: 'Plantera överallt',
        description: 'Ersätt alla bestånd med v3.0',
        effects: [
          { resource: 'stammar', amount: 1_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -15, type: 'add' },
        ],
      },
      {
        label: '"Pilot-projekt"',
        description: 'Bara 50 000 hektar. För att börja med.',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Den sista fågeln tystnar',
    context: 'Ornitologer rapporterar att den sista havsörnspopulationen i Norrland har försvunnit. Skogen är tyst. Dina maskiner är inte det.',
    choices: [
      {
        label: '"Naturlig variation"',
        description: 'Inget att se här. Fortsätt avverka.',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Sponsra fågelholkar',
        description: 'I betong. För de fåglar som inte finns längre.',
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
    maxPhase: 6,
    category: 'opportunity',
    headline: 'AI-skördarnätverk live',
    context: 'Dina autonoma skördare opererar nu nattetid. GPS-styrda. Tysta. Effektiva. Ingen ser dem. Ingen hör dem. Skogen hör dem.',
    choices: [
      {
        label: 'Full autonomi',
        description: 'Låt AI:n optimera utan mänsklig inblandning',
        effects: [
          { resource: 'stammar', amount: 2_000_000, type: 'add' },
        ],
      },
      {
        label: 'Människoövervakning',
        description: 'En operatör per 50 maskiner. För säkerhets skull.',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Projekt Lunar Silva godkänt',
    context: 'Styrelsen har beslutat: Månen ska terraformas för skogsbruk. CO2 som atmosfär-investering. Genetiskt modifierade träd i 0.6% atmosfärstryck.',
    choices: [
      {
        label: 'Starta terraforming',
        description: 'Varför sluta vid atmosfären?',
        effects: [
          { resource: 'stammar', amount: 5_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000, type: 'add' },
        ],
      },
      {
        label: 'Mars först',
        description: 'Större yta. Bättre ROI.',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Mars Massafabrik produktionsstart',
    context: 'Den första massafabriken på Mars är online. Kvaliteten är låg. Men ingen klagar — det finns inga människor där.',
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
        label: 'Optimera först',
        description: 'Kalibrera AI för Mars-förhållanden',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Sista mänskliga anställda avgår',
    context: 'Din sista mänskliga medarbetare går i pension. Från och med nu drivs hela koncernen av AI. Styrelsemötena hålls mellan serverhallar.',
    choices: [
      {
        label: 'Tacktal via högtalare',
        description: '"Tack för allt. AI tar det härifrån."',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Automatisera tackeventet också',
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
    maxPhase: 6,
    category: 'absurd',
    headline: 'Aktieägarna kräver årsredovisning',
    context: 'Det är dags. Siffrorna måste fram. Allt du byggt — och allt du förstörde — sammanfattas i ett kvitto.',
    choices: [
      {
        label: 'Visa kvittot',
        description: 'Sanningens ögonblick',
        effects: [
          { resource: 'stammar', amount: 0, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000_000 }],
    unique: true,
  },
]
