// ── Silva Maximus — Owner (Skogsägare) Events ──
// Uses the same GameEvent structure as industry events.
// Conditions check owner-specific resources (skogsvardering, resiliens, etc.)

import type { GameEvent } from '../store/types'

export const OWNER_EVENTS: GameEvent[] = [
  {
    id: 'oe_stormen',
    phase: 1,
    category: 'crisis',
    headline: 'Stormen',
    context: 'En kraftig storm drar in över Ångermanland. Träd faller. Frågan är: vilka?',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 15_000 }],
    choices: [
      {
        label: 'Låt stormen passera',
        description: 'Din skog är varierad. De svagaste faller. Resten står kvar.',
        effects: [
          { resource: 'resiliens', amount: 10, type: 'add' },
          { resource: 'biodivOwner', amount: 5, type: 'add' },
          { resource: 'deadwood', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_barkborre',
    phase: 1,
    category: 'crisis',
    headline: 'Granbarkborren',
    context: 'Insektsangrepp! Barkborren har hittat dina granar. Men din skog har fler trädslag än bara gran...',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 25_000 }],
    choices: [
      {
        label: 'Låt mångfalden göra sitt',
        description: 'Barkborren tar tre granar. Tallarna, björkarna, asparna står emot.',
        effects: [
          { resource: 'resiliens', amount: 15, type: 'add' },
          { resource: 'kunskap', amount: 10, type: 'add' },
          { resource: 'deadwood', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_turister',
    phase: 1,
    category: 'opportunity',
    headline: 'Japanska turister',
    context: 'Ett shinrin-yoku-företag vill använda din skog för "Forest Bathing". De betalar 2 000 kr per person. För att GÅ i din skog.',
    unique: true,
    conditions: [
      { resource: 'totalSkogsvardering', operator: '>=', value: 30_000 },
    ],
    choices: [
      {
        label: 'Välkommen till skogen',
        description: '+5 000 Inkomst. Massaindustrin hade betalat 200 kr per kubikmeter för att FÄLLA den.',
        effects: [
          { resource: 'inkomst', amount: 5_000, type: 'add' },
          { resource: 'legacy', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_snickaren',
    phase: 1,
    category: 'opportunity',
    headline: 'Snickaren ringer',
    context: 'En möbelsnickare i Hälsingland vill köpa ditt långsam-växta virke. Täta årsringar. Fin textur. Han betalar 3× massapriset.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 20_000 }],
    choices: [
      {
        label: 'Sälj virke till snickaren',
        description: '+8 000 Inkomst. Precis som din skog: hållbarhet i generationer.',
        effects: [
          { resource: 'inkomst', amount: 8_000, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_barnens_besok',
    phase: 1,
    category: 'opportunity',
    headline: 'Barnens besök',
    context: 'Din dotter pekar på lavskrikan. "Farfar, den bor ju HÄR!" Du nickar. "Ja. Det gör den. Och det kommer den göra när du tar över."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 40_000 }],
    choices: [
      {
        label: 'Visa henne skogen',
        description: '+50 Generationsarv. En stämning av stolthet sprider sig i bröstet.',
        effects: [
          { resource: 'legacy', amount: 50, type: 'add' },
          { resource: 'kunskap', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_grannens_anger',
    phase: 1,
    category: 'opportunity',
    headline: 'Grannens ånger',
    context: 'Din granne kalavverkade för 10 år sen. Nu ser han din skog. "Det blev inte som inspektören lovade", säger han. Han tittar på sina 80 hektar stubbar och contortaplantage. "Kan du visa mig hur du gör?"',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 60_000 }],
    choices: [
      {
        label: 'Visa honom',
        description: '+30 Kunskap. Du får en allierad.',
        effects: [
          { resource: 'kunskap', amount: 30, type: 'add' },
          { resource: 'legacy', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_skogsbrand',
    phase: 1,
    category: 'crisis',
    headline: 'Skogsbrand',
    context: 'Brand! Men ditt tjocka humuslager och fuktiga mark skyddar rötterna. Branden sveper genom, men träden överlever.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 50_000 }],
    choices: [
      {
        label: 'Skogen återhämtar sig',
        description: 'Branden tog undervegetationen. Men rötterna lever. +20 Resiliens.',
        effects: [
          { resource: 'resiliens', amount: 20, type: 'add' },
          { resource: 'deadwood', amount: 15, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_universitetsstudie',
    phase: 1,
    category: 'opportunity',
    headline: 'Universitetsstudien',
    context: 'Forskare från SLU vill göra en långtidsstudie av din skog. Resultaten publiceras. Plockhuggning ger likvärdig ekonomisk avkastning. Biodiversitet: 400% högre. Industrin: "Metodologiska brister."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 100_000 }],
    choices: [
      {
        label: 'Släpp in forskarna',
        description: '+100 Kunskap, +50 Generationsarv. Nationell uppmärksamhet.',
        effects: [
          { resource: 'kunskap', amount: 100, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_kina_dumpning',
    phase: 1,
    category: 'opportunity',
    headline: 'Kinas massadumpning — men DU är trygg',
    context: 'Massapriserna kollapsar globalt. Dina grannar som sålde till industrin ringer i panik. Men du säljer inte massa. Du säljer virke till en möbelsnickare. Samma pris som förra året.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 8_000 }],
    choices: [
      {
        label: 'Drick kaffe och vänta',
        description: '+20 Kunskap. Ingen effekt på din inkomst. Så känns det.',
        effects: [
          { resource: 'kunskap', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_svt',
    phase: 1,
    category: 'opportunity',
    headline: 'SVT i din skog',
    context: 'SVT Vetenskap vill filma din skog som kontrast mot industrins metoder. Reportern frågar: "Varför ser det ut SÅ HÄR hos dig och SÅ HÄR hos grannarna?" Du pekar på dina 200-åriga tallar. Sedan på grannens rader av contorta. Bilden talar för sig själv.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 150_000 }],
    choices: [
      {
        label: 'Låt kameran filma',
        description: '+200 Kunskap, +100 Generationsarv. Nationell debatt.',
        effects: [
          { resource: 'kunskap', amount: 200, type: 'add' },
          { resource: 'legacy', amount: 100, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'oe_nastly',
    phase: 1,
    category: 'opportunity',
    headline: 'Nastly-brevet',
    context: 'Nastly International kontaktar DIG direkt. De vill köpa virke från "verifierat hållbart skogsbruk" efter att ha brutit med industrin. Nastly — NASTLY! — det företag som sålde bröstmjölksersättning till fattiga mödrar — väljer DIG framför den svenska skogsindustrin. Tänk på det en sekund.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 200_000 }],
    choices: [
      {
        label: 'Acceptera ordern',
        description: '+50 000 Inkomst, +50 Generationsarv. Ironin bränner.',
        effects: [
          { resource: 'inkomst', amount: 50_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
]
