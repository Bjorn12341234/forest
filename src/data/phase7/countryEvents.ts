import type { GameEvent } from '../../store/types'

// ── Country-Specific Events ──
// Fire during or after invasion of specific countries. Each adds narrative weight.

export const COUNTRY_EVENTS: GameEvent[] = [
  // ── Amazonia ──
  {
    id: 'country_amazonia_fire',
    phase: 8,
    category: 'crisis',
    headline: 'Amazonas-branden',
    context: 'Era avverkningsoperationer i Amazonia orsakade okontrollerade bränder. Satellitilder sprids globalt. FN kräver svar. Brand-fältet var 40 000 hektar — er mest produktiva zon.',
    choices: [
      {
        label: 'Förneka inblandning',
        description: '"Spontana naturliga bränder." Nyhetscykeln glömmer om tre veckor.',
        effects: [
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'kapital', amount: 5_000_000, type: 'add' },
        ],
      },
      {
        label: 'Evakuera och kompensera',
        description: 'Omplacera drabbade samhällen. Kostsamt men mediaberedt.',
        effects: [
          { resource: 'kapital', amount: -20_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Profitera på återplantering',
        description: 'Eukalyptusplantering på den brända marken. Tekniskt sett "återplantering".',
        effects: [
          { resource: 'stammar', amount: 100_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000_000 }],
    unique: true,
  },

  // ── Norgia ──
  {
    id: 'country_norgia_protest',
    phase: 7,
    category: 'antagonist',
    headline: 'Nordisk solidaritet',
    context: 'Norgia protesterar officiellt mot era avverkningar. Oljefonden hotar att frysa handeln med Sverige. "Vi exporterar olja. Ni exporterar kalhyggen. Det är en skillnad," säger statsministern.',
    choices: [
      {
        label: 'Ignorera protesten',
        description: 'Vad ska de göra? De behöver vårt virke till fjällstugorna.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
      {
        label: 'Diplomatiskt svar',
        description: '"Vi delar Norges oro för miljön." Och fortsätter som vanligt.',
        effects: [
          { resource: 'kapital', amount: -5_000_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000 }],
    unique: true,
  },

  // ── Siberien ──
  {
    id: 'country_siberien_methane',
    phase: 8,
    category: 'crisis',
    headline: 'Permafrost-kollapsen',
    context: 'Era borrningar i Siberien destabiliserade permafrosten. Metanutsläpp motsvarande 50 års svensk industri läckte ut på en vecka. Klimatforskare kallar det "irreversibelt".',
    choices: [
      {
        label: 'Hemlighetsstämpla rapporten',
        description: 'Betala forskarna. Radera datan. Metanet syns inte på balansräkningen.',
        effects: [
          { resource: 'kapital', amount: -30_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Publicera och profilera',
        description: '"Vi tar ansvar — och lanserar vår nya Carbon Capture-division."',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000_000 }],
    unique: true,
  },

  // ── Chinova ──
  {
    id: 'country_chinova_wall',
    phase: 9,
    category: 'crisis',
    headline: 'Den Kinesiska Väggen',
    context: 'Chinova inför handelshinder. "Nordisk skogsekspert" stoppas i tullen. Femårsplanen har omskrivits: "Inhemsk skogsproduktion" ersätter "nordiskt samarbete". Era kontor i Peking stängs.',
    choices: [
      {
        label: 'Muta handelsministern',
        description: 'En diskret överföring till Macao. Dörrar öppnas igen.',
        effects: [
          { resource: 'kapital', amount: -80_000_000, type: 'add' },
          { resource: 'lobby', amount: 2_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Dra sig tillbaka',
        description: 'Fokusera på mer mottagliga marknader. Chinova kostar mer än det smakar.',
        effects: [
          { resource: 'stammar', amount: -500_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Teknologiöverföring',
        description: 'Ge dem skördarpatentet. De bygger billigare kopior. Ni äger 15% av vinsten.',
        effects: [
          { resource: 'kapital', amount: 30_000_000, type: 'add' },
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000 }],
    unique: true,
  },

  // ── Finlandia ──
  {
    id: 'country_finlandia_merger',
    phase: 7,
    category: 'opportunity',
    headline: 'Finsk-svenskt skogsavtal',
    context: 'Finlandia föreslår en gemensam nordisk skogsallians. Delat forskningsbudget, gemensam certifiering, koordinerade avverkningsplaner. Finland vill ha stabilitet. Ni vill ha kontroll.',
    choices: [
      {
        label: 'Acceptera alliansen',
        description: 'Samarbete — på era villkor. Gemensam standard = svensk standard.',
        effects: [
          { resource: 'kapital', amount: 10_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Avvisa och köp upp',
        description: 'Varför alliera sig när man kan äga? Finskta Skogsbruk AB kostar 50M.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'stammar', amount: 80_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 3_000_000_000 }],
    unique: true,
  },

  // ── Kanadien ──
  {
    id: 'country_kanadien_indigenous',
    phase: 8,
    category: 'antagonist',
    headline: 'Första nationerna blockerar',
    context: 'First Nations i Kanadiens boreala skog blockerar era skördare. "This is unceded territory." Internationella medier rapporterar. Er kanadensiska VD ringer i panik.',
    choices: [
      {
        label: '"Samrådsprocessen"',
        description: 'Samma modell som i Sverige. Utred i 10 år. Avverka under tiden.',
        effects: [
          { resource: 'lobby', amount: -1_000, type: 'add' },
          { resource: 'stammar', amount: 50_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Vinstdelning',
        description: '3% av vinsten till lokala samhällen. Kallas "historisk kompensation" i pressmeddelandet.',
        effects: [
          { resource: 'kapital', amount: -10_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 6_000_000_000 }],
    unique: true,
  },

  // ── Indiska Unionen ──
  {
    id: 'country_indiska_bjorkea',
    phase: 9,
    category: 'opportunity',
    headline: 'BJÖRKEA-expansionen',
    context: 'BJÖRKEA vill öppna 200 varuhus i Indiska Unionen samtidigt. De behöver virke — ert virke. Kontraktet är enormt men kräver exklusivitet. Ni levererar allt eller inget.',
    choices: [
      {
        label: 'Signera exklusiviteten',
        description: 'All indisk produktion till BJÖRKEA. Säkrad avsättning i 25 år.',
        effects: [
          { resource: 'kapital', amount: 100_000_000, type: 'add' },
          { resource: 'stammar', amount: -200_000_000, type: 'add' },
          { resource: 'lobby', amount: 3_000, type: 'add' },
        ],
      },
      {
        label: 'Förhandla bättre villkor',
        description: 'Kräv 40% av möbelvinsten istället för fast pris.',
        effects: [
          { resource: 'kapital', amount: 50_000_000, type: 'add' },
          { resource: 'lobby', amount: 1_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000_000 }],
    unique: true,
  },

  // ── Danmark ──
  {
    id: 'country_danmark_julgranar',
    phase: 7,
    category: 'opportunity',
    headline: 'Julgranskartellen',
    context: 'Danmark importerar 12 miljoner julgranar per år. Hittills från Schleswig-Holstein. Nu vill ni leverera — certifierat, klimatneutralt, 400% påslag. Danskarna märker inte skillnaden.',
    choices: [
      {
        label: 'Erövra julgransmarknaden',
        description: 'Nordmann-gran med svensk FSC-stämpel. "Dansk tradition — nordisk kvalitet."',
        effects: [
          { resource: 'kapital', amount: 8_000_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Sälj infrastruktur istället',
        description: 'Låt danskarna odla själva — med era patenterade odlingssystem.',
        effects: [
          { resource: 'kapital', amount: 15_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_500_000_000 }],
    unique: true,
  },
]
