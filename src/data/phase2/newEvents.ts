import type { GameEvent } from '../../store/types'

export const PHASE2_NEW_EVENTS: GameEvent[] = [
  // ── Phase 2: Regional Politik & Skogsägardrama ──
  {
    id: 'p2_kommunfullmaktige',
    phase: 2,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Kommunfullmäktige: Skogsbruksplan godkänd',
    context: 'Kommunen har godkänt er nya skogsbruksplan utan ändringar. Ingen läste den. 347 sidor. Perfekt.',
    replayable: true,
    choices: [
      {
        label: 'Börja avverka omedelbart',
        description: 'Planen tillåter allt ni vill. Tekniskt sett.',
        effects: [
          { resource: 'stammar', amount: 3_000, type: 'add' },
          { resource: 'image', amount: -3, type: 'add' },
        ],
      },
      {
        label: 'Publicera planen som "öppen dialog"',
        description: 'Ingen kommer läsa den nu heller',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'stammar', amount: 1_500, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 12_000 }],
  },
  {
    id: 'p2_skogskonsult_bluff',
    phase: 2,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Skogskonsulten hade fejkad examen',
    context: 'Er anlitade skogskonsult hade en utskrift från en webbsida som examen. Alla skötselplaner de senaste tre åren är baserade på gissningar.',
    choices: [
      {
        label: '"Resultaten talar för sig själva"',
        description: 'Avverkningarna blev ju gjorda. Vad spelar pappret för roll?',
        effects: [
          { resource: 'stammar', amount: 2_000, type: 'add' },
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Anställ konsulten permanent',
        description: 'Någon som kan bluffa så bra är värd att behålla',
        effects: [
          { resource: 'lobby', amount: 5, type: 'add' },
          { resource: 'kapital', amount: -1_000, type: 'add' },
        ],
      },
      {
        label: 'Skylla allt på konsulten',
        description: 'Perfekt syndabock. Alla avvikelser förklarade.',
        effects: [
          { resource: 'image', amount: 3, type: 'add' },
          { resource: 'stammar', amount: 1_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 18_000 }],
    unique: true,
  },
  {
    id: 'p2_branschkonferens',
    phase: 2,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Branschkonferens: "Framtidens Skog"',
    context: 'Årets stora skogskonferens i Sundsvall. 400 deltagare. Buffé. Mingel. Ingen talar om biologisk mångfald. Traditionen lever.',
    replayable: true,
    choices: [
      {
        label: 'Håll keynote: "Tillväxt Genom Tradition"',
        description: 'Samma PowerPoint som 2014. Ingen märker det.',
        effects: [
          { resource: 'lobby', amount: 8, type: 'add' },
          { resource: 'kapital', amount: -500, type: 'add' },
        ],
      },
      {
        label: 'Sponsra baren',
        description: 'De bästa affärerna görs efter midnatt',
        effects: [
          { resource: 'kapital', amount: -2_000, type: 'add' },
          { resource: 'lobby', amount: 12, type: 'add' },
          { resource: 'ownerTrust', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 25_000 }],
  },
  {
    id: 'p2_certifieringsfusk',
    phase: 2,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Dubbelcertifiering upptäckt',
    context: 'Samma bestånd är certifierat av både FSC och PEFC med motstridiga skötselkrav. Revisorer från båda systemen bokas in samma vecka.',
    choices: [
      {
        label: 'Boka om en av dem',
        description: 'Se till att de aldrig möts',
        effects: [
          { resource: 'kapital', amount: -500, type: 'add' },
          { resource: 'image', amount: 2, type: 'add' },
        ],
      },
      {
        label: 'Skapa ett tredje certifieringssystem',
        description: '"Svenska Skogsstandarden" — ni äger den själva',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Bjud båda revisionsteamen på middag',
        description: 'Lax, nubbe och samförstånd',
        effects: [
          { resource: 'kapital', amount: -1_500, type: 'add' },
          { resource: 'image', amount: 4, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 35_000 }],
    unique: true,
  },
  {
    id: 'p2_skogsagarforening_revolt',
    phase: 2,
    maxPhase: 6,
    category: 'crisis',
    headline: 'Skogsägarföreningen kräver bättre virkespriser',
    context: 'Arga skogsägare i Dalarna hotar med leveransstopp. De har räknat ut att ni tar 68% av virkespriset i mellanhänder.',
    replayable: true,
    choices: [
      {
        label: 'Höj priset med 2%',
        description: 'Symbolisk gest. Kosta lite, lugna mycket.',
        effects: [
          { resource: 'kapital', amount: -2_000, type: 'add' },
          { resource: 'ownerTrust', amount: 8, type: 'add' },
        ],
      },
      {
        label: 'Presentera "partnerprogram"',
        description: 'Samma priser, nytt namn, fin broschyr',
        effects: [
          { resource: 'kapital', amount: -500, type: 'add' },
          { resource: 'ownerTrust', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Köp virket från Finland istället',
        description: 'Finländare klagar aldrig',
        effects: [
          { resource: 'stammar', amount: 4_000, type: 'add' },
          { resource: 'ownerTrust', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 40_000 }],
  },
  {
    id: 'p2_inventering_oops',
    phase: 2,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Inventering visar att 90% av nyckelbiotoper är felregistrerade',
    context: 'Skogsstyrelsen publicerar ny data. Ert system har systematiskt missat skyddsvärda biotoper. Eller som ni kallar det: "effektiv registrering".',
    choices: [
      {
        label: '"Beklagligt"',
        description: 'Ett ord. Ingen åtgärd. Pressmeddelande skickat.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 2_000, type: 'add' },
        ],
      },
      {
        label: 'Ifrågasätt Skogsstyrelsens metodik',
        description: 'Om datan är fel är det deras problem',
        effects: [
          { resource: 'lobby', amount: 5, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 45_000 }],
    unique: true,
  },
  {
    id: 'p2_pensionsfond_koper',
    phase: 2,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Pensionsfond vill investera i skogsmark',
    context: 'Fjärde AP-fonden söker "gröna tillgångar". Er skogsmark kvalificerar sig som ESG-investering. Ingen verkar ha läst rapporten om nyckelbiotoperna.',
    choices: [
      {
        label: 'Sälj 20% av marken',
        description: 'Massivt kapitalinflöde. Pensionärer finansierar avverkning.',
        effects: [
          { resource: 'kapital', amount: 8_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Erbjud "skogsobligationer"',
        description: 'Finansiella instrument baserade på framtida avverkning',
        effects: [
          { resource: 'kapital', amount: 12_000, type: 'add' },
          { resource: 'image', amount: 3, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 55_000 }],
    unique: true,
  },
  {
    id: 'p2_lokal_tidning',
    phase: 2,
    maxPhase: 6,
    category: 'scandal',
    headline: 'Lokaltidningen gräver: "Skogskungen"',
    context: 'Norrländska Tidningen publicerar en artikelserie om er VD:s sommarhus vid avverkningsgränsen. Huset har utsikt över kalhygget han beställde.',
    replayable: true,
    choices: [
      {
        label: '"Privat angelägenhet"',
        description: 'VD:n bor var han vill. Kalhygget var planerat sedan 2018.',
        effects: [
          { resource: 'image', amount: -6, type: 'add' },
        ],
      },
      {
        label: 'Plantera en häck runt huset',
        description: 'Bokstavligen dölja problemet',
        effects: [
          { resource: 'kapital', amount: -200, type: 'add' },
          { resource: 'image', amount: -3, type: 'add' },
        ],
      },
      {
        label: 'Köp annonsplats i tidningen',
        description: 'Helsida: "Vi planterar framtiden". Redaktionen förstår hinten.',
        effects: [
          { resource: 'kapital', amount: -1_500, type: 'add' },
          { resource: 'image', amount: 4, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000 }],
  },

  // ── Phase 3: Certifieringsfusk & Regional Politik ──
  {
    id: 'p3_landshövding_middag',
    phase: 3,
    maxPhase: 6,
    category: 'opportunity',
    headline: 'Middag med Landshövdingen',
    context: 'Landshövdingen vill diskutera "regionalt samarbete" över en trebarmiddag. Menyn: hjortfilé, skogssvamp och era avverkningsplaner.',
    choices: [
      {
        label: 'Lova jobb i regionen',
        description: '50 tillfälliga anställningar löser alla invändningar',
        effects: [
          { resource: 'kapital', amount: -5_000, type: 'add' },
          { resource: 'lobby', amount: 15, type: 'add' },
          { resource: 'stammar', amount: 5_000, type: 'add' },
        ],
      },
      {
        label: 'Erbjud styrelsepost efter mandatperioden',
        description: 'Den svenska svängdörren har alltid fungerat',
        effects: [
          { resource: 'lobby', amount: 25, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 80_000 }],
    unique: true,
  },
  {
    id: 'p3_skogsdag_skolbarn',
    phase: 3,
    maxPhase: 6,
    category: 'contradiction',
    headline: 'Skogsdag för skolbarn avbruten',
    context: 'Er PR-avdelning arrangerade "Upplev Skogen" för lokala skolor. Barnen hittade en död berguv och en GPS-märkt varg som försvunnit. Obekväma frågor ställdes.',
    choices: [
      {
        label: '"Naturen är komplex"',
        description: 'Ge barnen varsin keps och skicka hem dem',
        effects: [
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'kapital', amount: -500, type: 'add' },
        ],
      },
      {
        label: 'Ställ in framtida skoldagar',
        description: 'Barn ställer för många frågor',
        effects: [
          { resource: 'image', amount: -8, type: 'add' },
        ],
      },
      {
        label: 'Starta eget skolmaterial: "Skogens Vänner"',
        description: 'Lärobok där kalavverkning kallas "solbad för marken"',
        effects: [
          { resource: 'kapital', amount: -3_000, type: 'add' },
          { resource: 'image', amount: 8, type: 'add' },
          { resource: 'lobby', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 150_000 }],
    unique: true,
  },
]
