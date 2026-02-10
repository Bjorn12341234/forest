import type { GameEvent } from '../../store/types'

/**
 * Sprint 8B — Endgame Content (Phases 10–12)
 * 14 events anchored in Swedish bureaucratic satire at cosmic scale.
 *
 * Act 1 (Phase 10): "Post-Biologisk" — old rules in new settings
 * Act 2 (Phase 11): Galactic institutions mirror Swedish ones
 * Act 3 (Phase 12): Everything ends, but the paperwork continues
 */
export const PHASE10_NEW_EVENTS: GameEvent[] = [
  // ── Phase 10: "Post-Biologisk" — bureaucracy in space ──

  {
    id: 'p10_postbiologisk',
    phase: 10,
    category: 'contradiction',
    headline: 'Post-Biologisk Vändpunkt',
    context:
      'Styrelsen konstaterar att biologi inte längre är relevant. Skördarna behöver inte skog — de behöver atomer. "Trä är bara en historisk datapunkt." Kvartalsrapporten ändrar enhet från kubikmeter till mol.',
    choices: [
      {
        label: 'Omfamna post-biologisk era',
        description: 'Biologi var en fas. Vi har vuxit förbi den.',
        effects: [
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'kapital', amount: 200_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: '"Vi säljer fortfarande trä..."',
        description: 'Ironin noteras. Av ingen.',
        effects: [
          { resource: 'stammar', amount: 200_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_mars_miljoprovning',
    phase: 10,
    category: 'contradiction',
    headline: 'Mars Miljöprövning: 15-årig samrådsprocess',
    context:
      'Mars Länsstyrelse (som ni själva inrättade) kräver miljöprövning för terraformering. Handläggningstid: 15 år. Exakt som på Jorden. Handläggaren har aldrig sett en skog men har starka åsikter om den.',
    choices: [
      {
        label: 'Kringgå med lobby',
        description: 'Svängdörren fungerar även i reducerad gravitation.',
        effects: [
          { resource: 'lobby', amount: -500, type: 'add' },
          { resource: 'stammar', amount: 800_000_000, type: 'add' },
        ],
      },
      {
        label: 'Vänta 15 år',
        description: 'Absurt tålmodig. Handläggaren imponeras.',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
        ],
      },
      {
        label: 'Avskaffa Länsstyrelsen',
        description: 'Ni skapade den. Ni kan ta bort den. Så fungerar makt.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_kosmisk_fsc',
    phase: 10,
    category: 'scandal',
    headline: 'Kosmisk FSC: Silva Standard Intergalactic™',
    context:
      'Ni certifierar nu skogsbruk på 4 planeter. Certifieraren: er AI. Granskaren: samma AI. Resultatet: 100% godkänt. Precis som på Jorden — fast med fler decimaler.',
    choices: [
      {
        label: 'Expandera certifieringen',
        description: 'Hela solsystemet certifierat till Q3. Andromeda till Q4.',
        effects: [
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'stammar', amount: 600_000_000, type: 'add' },
        ],
      },
      {
        label: 'Bjud in "oberoende" granskare',
        description: 'Er dotterbolag Silva Audit AB™. Oberoende per definition.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 25_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_orbital_arbetsmiljo',
    phase: 10,
    category: 'crisis',
    headline: 'Arbetsmiljöverket i omloppsbana',
    context:
      'Arbetsmiljöinspektören har rest till Orbital Timberstation. Hon har synpunkter. I vakuum. Rapporten: 47 sidor om ergonomi i tyngdlöshet. Bilaga C: "Bristande skyltning av nödutgångar i rymden."',
    choices: [
      {
        label: 'Åtgärda bristerna',
        description: 'Nödutgångsskyltar i vakuum. Riktning: alla.',
        effects: [
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Omklassificera rymden som "oreglerad zon"',
        description: 'Arbetsmiljölagen gäller inte utanför atmosfären. Ännu.',
        effects: [
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Hänvisa till "svensk modell"',
        description: 'Samförstånd. Dialog. Fika i tyngdlöshet.',
        effects: [
          { resource: 'kapital', amount: -50_000_000, type: 'add' },
          { resource: 'lobby', amount: 50, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 40_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_terraform_samrad',
    phase: 10,
    category: 'absurd',
    headline: 'Terraformering: Samråd med ursprungsbefolkning',
    context:
      'FN kräver samråd med Mars ursprungsbefolkning innan terraformering. Mars har ingen ursprungsbefolkning. Samrådet hålls ändå. Protokollet: 200 sidor tystnad. Alla parter anses tillfredsställda.',
    choices: [
      {
        label: 'Genomför samrådet',
        description: 'Absurd compliance. Men protokollet är klanderfritt.',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
        ],
      },
      {
        label: 'Ifrågasätt kravet',
        description: 'Logiskt. Men PR-avdelningen får hjärtklappning.',
        effects: [
          { resource: 'stammar', amount: 400_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'lobby', amount: -100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 60_000_000_000 }],
    unique: true,
  },

  // ── Phase 11: Galactic institutions mirror Swedish ones ──

  {
    id: 'p11_dyson_leverans',
    phase: 11,
    category: 'crisis',
    headline: 'Dysonsfär-leveransen: Försenad',
    context:
      'Leveransen av stellärt virke är 400 år försenad. Transportbolaget skyller på "oförutsedda omständigheter" (stjärnans supernova). Fakturan har redan betalats. Reklamationsprocessen beräknas ta 600 år.',
    choices: [
      {
        label: 'Kräva ersättning',
        description: 'Skadeståndskrav: 400 ljusårs transport × standardtariff.',
        effects: [
          { resource: 'kapital', amount: 500_000_000, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
      {
        label: 'Starta eget transportbolag',
        description: 'Vertikal integration. Även vertikalt genom galaxen.',
        effects: [
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Avskriva förlusten',
        description: 'Bokföringsmässigt: "goodwill-justering". Revisorn godkänner.',
        effects: [
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 200_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_alien_almedalen',
    phase: 11,
    category: 'absurd',
    headline: 'Alien-delegater vid Almedalsveckan',
    context:
      'Utomjordiska delegater besöker Almedalen. De förstår inte konceptet "politisk vecka på en semester-ö". De förstår konceptet "lobbyism". Ni bjuder på äppelcider och en PowerPoint om "synergier".',
    choices: [
      {
        label: 'Erbjud handelsavtal',
        description: 'Intergalaktiskt frihandelsavtal. Tullfritt på cellulosa.',
        effects: [
          { resource: 'kapital', amount: 2_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Lobba för intergalaktisk avreglering',
        description: 'Miljölagar hämmar innovation. I alla galaxer.',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Visa dem en kalavverkning',
        description: '"Kulturellt utbyte." Alienerna blir tysta. Länge.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 300_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_galaktisk_aganderatt',
    phase: 11,
    category: 'contradiction',
    headline: 'Intergalaktisk Äganderättsdebatt',
    context:
      '400 civilisationer debatterar äganderätt i DN Debatt (kosmisk utgåva). Er insändare: "Äganderätten är hotad — i alla dimensioner." Replik: "Ni äger 73% av Vintergatan." Er motreplik: "Och?"',
    choices: [
      {
        label: 'Publicera motreplik',
        description: '"73% är inte monopol. Det är marknadsledarskap."',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Finansiera tankesmedja',
        description: 'Galaktiska Äganderättsinstitutet™. Oberoende. Per definition.',
        effects: [
          { resource: 'kapital', amount: -1_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Ignorera debatten',
        description: 'DN Debatt har ändå bara 3 läsare per galax.',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 500_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_kosmisk_skogsstyrelse',
    phase: 11,
    category: 'opportunity',
    headline: 'Kosmiska Skogsstyrelsen bildad',
    context:
      'Den nybildade Kosmiska Skogsstyrelsen har 3 anställda, en budget på 0 kr och ett mandat att övervaka 400 miljarder stjärnor. GD:n har redan raderat sina mejl. Styrelsens första beslut: fika.',
    choices: [
      {
        label: 'Tillsätt GD:n (er kandidat)',
        description: 'Svängdörren fungerar även i hyperrymd.',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Finansiera styrelsen',
        description: 'Kontrollera den. Med villkorad finansiering.',
        effects: [
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Underminera budgeten ytterligare',
        description: 'En myndighet utan pengar är en myndighet utan makt.',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 700_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_dn_debatt_entropi',
    phase: 11,
    category: 'absurd',
    headline: 'DN Debatt: "Multiversum-skogsbruk räddar entropin"',
    context:
      'Er kommunikationsavdelning publicerar debattartikeln "Avverkning motverkar universums värmedöd". Baserad på en studie ni finansierade. Peer-reviewed av er AI. Citerad av er tankesmedja. Publicerad i er tidning.',
    choices: [
      {
        label: 'Förstärk budskapet',
        description: 'Kampanj: "Avverka för framtiden — bokstavligen."',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Starta forskningsprogram',
        description: 'Entropi-laboratoriet. Forskning vi kontrollerar.',
        effects: [
          { resource: 'kapital', amount: -3_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 400, type: 'add' },
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Citera artikeln i FN',
        description: 'Generalsekretariatet noterar "med intresse".',
        effects: [
          { resource: 'lobby', amount: 600, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 900_000_000_000 }],
    unique: true,
  },

  // ── Phase 12: Everything ends, but the paperwork continues ──

  {
    id: 'p12_sista_styrelsesammantradet',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Universums Sista Styrelsesammanträde',
    context:
      'Stjärnorna slocknar. Styrelsen samlas. Dagordning: Punkt 1: Godkännande av föregående protokoll. Punkt 2: Kvartalsrapport Q∞. Punkt 3: Övriga frågor. Punkt 4: Universums slut. Fika serveras.',
    choices: [
      {
        label: 'Godkänn protokollet',
        description: 'Ordning och reda. Även i slutet.',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Ajournera till nästa kvartal',
        description: 'Det finns inget nästa kvartal. Men mötet ajourneras ändå.',
        effects: [
          { resource: 'kapital', amount: 5_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Begär omröstning om universums slut',
        description: 'Röstresultat: 5 för, 3 mot, 1 nedlagd. Universum slutar.',
        effects: [
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'stammar', amount: 10_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 5_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_entropins_utredning',
    phase: 12,
    category: 'contradiction',
    headline: 'Entropins Utredning: Beräknad handläggningstid 15 miljarder år',
    context:
      'Riksrevisionen utreder Silva Maximus miljöpåverkan. Handläggningstiden: 15 miljarder år. Exakt lika lång som universums återstående livstid. En slump, säger de. Utredaren har semester vecka 30.',
    choices: [
      {
        label: 'Invänta resultatet',
        description: 'Tids nog. Eller inte. Beroende på entropi.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Lobba för snabbare handläggning',
        description: 'Kräv att utredningen skyndar på. Till 14 miljarder år.',
        effects: [
          { resource: 'lobby', amount: -500, type: 'add' },
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Konstatera att utredningen är äldre än universum',
        description: 'Filosofisk observation. Revisorn noterar den i marginalen.',
        effects: [
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_multiversum_revision',
    phase: 12,
    category: 'scandal',
    headline: 'Multiversum-revisionen: "Var är arterna?"',
    context:
      'Revisorer från 47 parallella universum granskar era böcker. I 46 av dem utrotade ni alla arter. I det 47:e vann miljörörelsen. Ni köpte det universumet. Revisionsrapporten: 12 000 sidor. Bilaga: existentiell ångest.',
    choices: [
      {
        label: 'Bestrida revisionen',
        description: '"47 universum är inte statistiskt signifikant."',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
      {
        label: 'Hävda att arter är "en bokföringsmässig detalj"',
        description: 'Cellulosa-ekvivalenter. Arter konverteras till tonnage.',
        effects: [
          { resource: 'stammar', amount: 8_000_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Publicera alternativ revision',
        description: 'Er revision visar 100% hållbarhet. I alla 47 universum.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: -3_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_sista_skogsbruksplanen',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Den Sista Skogsbruksplanen',
    context:
      'Det finns inga träd kvar. Inga planeter. Inga stjärnor. Men planen ska skrivas. Er AI skriver den sista skogsbruksplanen. Avverkningsförslag: ingenting. Återväxtplan: ingenting. Nettointäkt: ∞. Planen godkänns enhälligt.',
    choices: [
      {
        label: 'Godkänn planen',
        description: 'Den perfekta planen. Ingenting kan gå fel med ingenting.',
        effects: [
          { resource: 'stammar', amount: 1, type: 'add' },
          { resource: 'image', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Begär omarbetning',
        description: '"Planen saknar ambition. Vi avverkar ingenting? Dubbla det."',
        effects: [
          { resource: 'stammar', amount: 0, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Stäng planen',
        description: 'Det sista dokumentet stängs. Tystnad.',
        effects: [
          { resource: 'image', amount: 100, type: 'set' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000_000_000 }],
    unique: true,
  },
]
