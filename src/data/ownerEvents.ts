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
    context: 'En kraftig storm drar in \u00f6ver \u00c5ngermanland. Tr\u00e4d faller. Fr\u00e5gan \u00e4r: vilka?',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 15_000 }],
    choices: [
      {
        label: 'L\u00e5t stormen passera',
        description: 'Din skog \u00e4r varierad. De svagaste faller. Resten st\u00e5r kvar.',
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
    context: 'Insektsangrepp! Barkborren har hittat dina granar. Men din skog har fler tr\u00e4dslag \u00e4n bara gran...',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 25_000 }],
    choices: [
      {
        label: 'L\u00e5t m\u00e5ngfalden g\u00f6ra sitt',
        description: 'Barkborren tar tre granar. Tallarna, bj\u00f6rkarna, asparna st\u00e5r emot.',
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
    context: 'Ett shinrin-yoku-f\u00f6retag vill anv\u00e4nda din skog f\u00f6r "Forest Bathing". De betalar 2 000 kr per person. F\u00f6r att G\u00c5 i din skog.',
    unique: true,
    conditions: [
      { resource: 'totalSkogsvardering', operator: '>=', value: 30_000 },
    ],
    choices: [
      {
        label: 'V\u00e4lkommen till skogen',
        description: '+5 000 Inkomst. Massaindustrin hade betalat 200 kr per kubikmeter f\u00f6r att F\u00c4LLA den.',
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
    context: 'En m\u00f6belsnickare i H\u00e4lsingland vill k\u00f6pa ditt l\u00e5ngsam-v\u00e4xta virke. T\u00e4ta \u00e5rsringar. Fin textur. Han betalar 3\u00d7 massapriset.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 20_000 }],
    choices: [
      {
        label: 'S\u00e4lj virke till snickaren',
        description: '+8 000 Inkomst. Precis som din skog: h\u00e5llbarhet i generationer.',
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
    headline: 'Barnens bes\u00f6k',
    context: 'Din dotter pekar p\u00e5 lavskrikan. "Farfar, den bor ju H\u00c4R!" Du nickar. "Ja. Det g\u00f6r den. Och det kommer den g\u00f6ra n\u00e4r du tar \u00f6ver."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 40_000 }],
    choices: [
      {
        label: 'Visa henne skogen',
        description: '+50 Generationsarv. En st\u00e4mning av stolthet sprider sig i br\u00f6stet.',
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
    headline: 'Grannens \u00e5nger',
    context: 'Din granne kalavverkade f\u00f6r 10 \u00e5r sen. Nu ser han din skog. "Det blev inte som inspekt\u00f6ren lovade", s\u00e4ger han. Han tittar p\u00e5 sina 80 hektar stubbar och contortaplantage. "Kan du visa mig hur du g\u00f6r?"',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 60_000 }],
    choices: [
      {
        label: 'Visa honom',
        description: '+30 Kunskap. Du f\u00e5r en allierad.',
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
    context: 'Brand! Men ditt tjocka humuslager och fuktiga mark skyddar r\u00f6tterna. Branden sveper genom, men tr\u00e4den \u00f6verlever.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 50_000 }],
    choices: [
      {
        label: 'Skogen \u00e5terh\u00e4mtar sig',
        description: 'Branden tog undervegetationen. Men r\u00f6tterna lever. +20 Resiliens.',
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
    context: 'Forskare fr\u00e5n SLU vill g\u00f6ra en l\u00e5ngtidsstudie av din skog. Resultaten publiceras. Plockhuggning ger likv\u00e4rdig ekonomisk avkastning. Biodiversitet: 400% h\u00f6gre. Industrin: "Metodologiska brister."',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 100_000 }],
    choices: [
      {
        label: 'Sl\u00e4pp in forskarna',
        description: '+100 Kunskap, +50 Generationsarv. Nationell uppm\u00e4rksamhet.',
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
    headline: 'Kinas massadumpning \u2014 men DU \u00e4r trygg',
    context: 'Massapriserna kollapsar globalt. Dina grannar som s\u00e5lde till industrin ringer i panik. Men du s\u00e4ljer inte massa. Du s\u00e4ljer virke till en m\u00f6belsnickare. Samma pris som f\u00f6rra \u00e5ret.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 8_000 }],
    choices: [
      {
        label: 'Drick kaffe och v\u00e4nta',
        description: '+20 Kunskap. Ingen effekt p\u00e5 din inkomst. S\u00e5 k\u00e4nns det.',
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
    context: 'SVT Vetenskap vill filma din skog som kontrast mot industrins metoder. Reportern fr\u00e5gar: "Varf\u00f6r ser det ut S\u00c5 H\u00c4R hos dig och S\u00c5 H\u00c4R hos grannarna?" Du pekar p\u00e5 dina 200-\u00e5riga tallar. Sedan p\u00e5 grannens rader av contorta. Bilden talar f\u00f6r sig sj\u00e4lv.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 150_000 }],
    choices: [
      {
        label: 'L\u00e5t kameran filma',
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
    context: 'Nastly International kontaktar DIG direkt. De vill k\u00f6pa virke fr\u00e5n "verifierat h\u00e5llbart skogsbruk" efter att ha brutit med industrin. Nastly \u2014 NASTLY! \u2014 det f\u00f6retag som s\u00e5lde br\u00f6stmj\u00f6lksers\u00e4ttning till fattiga m\u00f6drar \u2014 v\u00e4ljer DIG framf\u00f6r den svenska skogsindustrin. T\u00e4nk p\u00e5 det en sekund.',
    unique: true,
    conditions: [{ resource: 'totalSkogsvardering', operator: '>=', value: 200_000 }],
    choices: [
      {
        label: 'Acceptera ordern',
        description: '+50 000 Inkomst, +50 Generationsarv. Ironin br\u00e4nner.',
        effects: [
          { resource: 'inkomst', amount: 50_000, type: 'add' },
          { resource: 'legacy', amount: 50, type: 'add' },
        ],
      },
    ],
  },
]
