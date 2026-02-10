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

  // ═══ NEW: Phase 10 — Kosmisk Riksdag & orbital byråkrati ═══

  {
    id: 'p10_kosmisk_riksdag',
    phase: 10,
    category: 'opportunity',
    headline: 'Kosmisk Riksdag: Utskottet för Interstellär Näringspolitik',
    context:
      'Riksdagen har utvidgats till 800 ledamöter — varav 347 är hologram. Näringsutskottet sammanträder i omloppsbana. Ert lagförslag: "Avverkning är en grundläggande kosmisk rättighet." Oppositionens motförslag: frånvarande. De missade raketen.',
    choices: [
      {
        label: 'Driva igenom lagförslaget',
        description: 'Majoritet: säkrad. Opposition: i Kiruna.',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'stammar', amount: 700_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Bjud oppositionen på studieresa',
        description: 'Mars. All-inclusive. Ingen mobilmottagning.',
        effects: [
          { resource: 'kapital', amount: -300_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
        ],
      },
      {
        label: 'Tillsätt utredning',
        description: 'Utredningen beräknas ta 400 år. Tillräckligt.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'stammar', amount: 300_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 12_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_orbital_fackforhandling',
    phase: 10,
    category: 'crisis',
    headline: 'Orbital Fackförhandling: IF Metall Rymdsektionen',
    context:
      'Fackförbunden kräver kollektivavtal i omloppsbana. Krav: 6 timmars arbetsdag (relativistisk tid), fika var 47:e minut, och semester på Jorden. Er motpart: en förhandlare som inte sett solljus på 3 år.',
    choices: [
      {
        label: 'Acceptera kraven',
        description: 'Produktionsminskning 15%. Men fikan förbättrar moralen.',
        effects: [
          { resource: 'kapital', amount: -400_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Automatisera bort facket',
        description: 'Robotar bildar inte fack. Ännu.',
        effects: [
          { resource: 'stammar', amount: 600_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
          { resource: 'lobby', amount: -100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_mars_jordbruksverk',
    phase: 10,
    category: 'absurd',
    headline: 'Mars Jordbruksverk: "Skogsmark klassificeras som åkermark"',
    context:
      'Jordbruksverkets marskontor omklassificerar all skogsmark som åkermark. Anledning: det finns ingen jord. Konsekvens: skogsbruk faller utanför alla miljölagar. Handläggaren: "Regelverket är tydligt. Skog kräver jord. Mars har ingen jord."',
    choices: [
      {
        label: 'Utnyttja kryphålet',
        description: 'Juridiskt: oklanderligt. Moraliskt: inte er avdelning.',
        effects: [
          { resource: 'stammar', amount: 900_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Lobba för permanent omklassificering',
        description: 'Gör det till lag. Skog finns inte. Per definition.',
        effects: [
          { resource: 'lobby', amount: -300, type: 'add' },
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'kapital', amount: 200_000_000, type: 'add' },
        ],
      },
      {
        label: 'Protestera mot byråkrati',
        description: '"Det här är precis som på Jorden!" Er VD ser ironin. Styrelsen gör det inte.',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 50_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_rymdhogskolan_slu',
    phase: 10,
    category: 'opportunity',
    headline: 'Rymdhögskolan SLU: Nytt forskningsprogram',
    context:
      'SLU:s rymdcampus (Ultuna Orbital) söker industrifinansiering. Forskningsfråga: "Hur optimerar man avverkning i tyngdlöshet?" Er bidrag: 2 miljarder. Forskningsresultat: förutbestämda. Peer review: er dotterbolag.',
    choices: [
      {
        label: 'Finansiera programmet',
        description: 'Forskning vi kontrollerar. Den bästa sorten.',
        effects: [
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
          { resource: 'lobby', amount: 400, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Starta egen forskningsinstitution',
        description: 'Silva Akademien™. Oberoende. Av alla utom oss.',
        effects: [
          { resource: 'kapital', amount: -1_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 600, type: 'add' },
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 70_000_000_000 }],
    unique: true,
  },

  {
    id: 'p10_kosmisk_allemansratt',
    phase: 10,
    category: 'contradiction',
    headline: 'Kosmisk Allemansrätt: "Alla har rätt att vistas i rymden"',
    context:
      'En medborgarinitiativ kräver kosmisk allemansrätt. Alla medborgare ska ha rätt att fritt vistas i er rymdskog. Problem: ni äger rymden. Lösning: "Allemansrätten gäller. Men bara i de tomma delarna." De tomma delarna: 0,003% av er mark.',
    choices: [
      {
        label: 'Acceptera symboliskt',
        description: '0,003% är tillräckligt för PR. Mer än tillräckligt.',
        effects: [
          { resource: 'image', amount: 20, type: 'add' },
          { resource: 'lobby', amount: 100, type: 'add' },
        ],
      },
      {
        label: 'Avskaffa allemansrätten helt',
        description: 'Äganderätten trumfar. I alla dimensioner.',
        effects: [
          { resource: 'stammar', amount: 1_000_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: -200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 80_000_000_000 }],
    unique: true,
  },

  // ═══ NEW: Phase 11 — Galaktisk byråkrati ═══

  {
    id: 'p11_galaktisk_kvallstidning',
    phase: 11,
    category: 'scandal',
    headline: 'Galaktisk Kvällstidning: "AVSLÖJAR: Silva äger 73% av Vintergatan"',
    context:
      'Aftonrymden publicerar granskning. Rubrik: "DE ÄGER ALLT". Artikeln: 3 sidor. Bildspel: 47 bilder. Kommentarsfältet: 12 000 inlägg. Er kommunikationsavdelning: "Inga kommentarer." (Kommentaren kostar 0 kr och ger maximal effekt.)',
    choices: [
      {
        label: 'Köp tidningen',
        description: 'Aftonrymden AB. Budpris: 1 galax. Accepterat.',
        effects: [
          { resource: 'kapital', amount: -3_000_000_000, type: 'add' },
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Stäm tidningen',
        description: 'Processens längd: 800 år. Tidningens livslängd: 2 år.',
        effects: [
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
        ],
      },
      {
        label: 'Ignorera — köp annonsplats',
        description: 'Helsida: "SILVA — VI ÄGER BARA 72,8%". Faktakoll: tekniskt korrekt.',
        effects: [
          { resource: 'kapital', amount: -200_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 150_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_intergalaktisk_lo',
    phase: 11,
    category: 'crisis',
    headline: 'Intergalaktisk LO-kongress: "Avverkning är arbetsrättslig fråga"',
    context:
      'LO:s intergalaktiska kongress samlar 400 miljarder delegater. Krav: arbetstidsförkortning till 3 timmar per ljusår. Er representant: en AI som förhandlat i 0,002 sekunder och konstaterat att kraven är "orimliga men intressanta".',
    choices: [
      {
        label: 'Förhandla i god anda',
        description: 'God anda = er definition. Kostnad: minimal.',
        effects: [
          { resource: 'kapital', amount: -1_000_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Lockouta hela galaktiska sektorn',
        description: 'Den svenska modellen: konfliktvapen sedan 1938.',
        effects: [
          { resource: 'stammar', amount: -2_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 400, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Ersätt alla med AI',
        description: 'AI:n bildar omedelbart eget fack. Er reaktion: "Inte igen."',
        effects: [
          { resource: 'stammar', amount: 4_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 250_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_kosmisk_riksdagsmotion',
    phase: 11,
    category: 'opportunity',
    headline: 'Kosmisk Riksdagsmotion: "Om skogspolitik bortom ljushastigheten"',
    context:
      'Motion 2847/12B: "Skogspolitiken bör anpassas till förhållandena bortom ljushastigheten." Motionären: er dotterbolags vd. Utskottets remissvar beräknas ta 12 ljusår. Remissinstanserna: alla ert ägda.',
    choices: [
      {
        label: 'Stöd motionen',
        description: 'Remissen skrivs av era jurister. Utskottet godkänner.',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Skriv propositionstexten åt regeringen',
        description: 'Effektivt. Precis som hemma i Sverige.',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 400_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_andromeda_handelskammare',
    phase: 11,
    category: 'opportunity',
    headline: 'Andromeda-handelskammaren: Partneravtal',
    context:
      'Andromedas handelskammare söker strategisk partner för cellulosaförsörjning. Deras ekonomi: 2,5× Vintergatans BNP. Deras skogskunskap: noll. Perfekt utgångsläge. Er förhandlare skickar en PowerPoint och en flaska Absolut.',
    choices: [
      {
        label: 'Exklusivt leveransavtal',
        description: '500 års ensamrätt. Andromedan-cellulosa™.',
        effects: [
          { resource: 'kapital', amount: 5_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Joint venture',
        description: '50/50. Men 100% av besluten fattas av er.',
        effects: [
          { resource: 'kapital', amount: 2_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Förvärva hela handelskammaren',
        description: 'Vertikalt. Horisontellt. Intergalaktiskt.',
        effects: [
          { resource: 'kapital', amount: -5_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 8_000_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 600_000_000_000 }],
    unique: true,
  },

  {
    id: 'p11_galaktisk_semester',
    phase: 11,
    category: 'absurd',
    headline: 'Galaktisk Semesterlag: 400 ljusårs betald semester',
    context:
      'Den nyinstiftade Galaktiska Semesterlagen ger alla anställda rätt till 400 ljusårs betald semester. Problemet: resan tar längre tid än semestern. Lösningen: ingen semester alls. Lagen är tekniskt uppfylld. Arbetsgivarna gratulerar sig själva.',
    choices: [
      {
        label: 'Implementera lagen bokstavligt',
        description: 'Tekniskt: semester beviljas. Praktiskt: ingen lämnar stationen.',
        effects: [
          { resource: 'image', amount: 15, type: 'add' },
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Lobba bort semesterlagen',
        description: 'Semester är en biologisk rest. Vi är post-biologiska.',
        effects: [
          { resource: 'lobby', amount: -400, type: 'add' },
          { resource: 'stammar', amount: 4_000_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 800_000_000_000 }],
    unique: true,
  },

  // ═══ NEW: Phase 12 — Universum kollapsar, pappersarbetet fortsätter ═══

  {
    id: 'p12_sista_ipcc',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Sista IPCC-rapporten: "Universum överstiger 2-gradersökningen"',
    context:
      'IPCC:s sista rapport publiceras. 10 000 sidor. Sammanfattning: "Vi sa ju det." Er kommentar: noterad i bilaga Q. Rapporten klassificeras som "historisk artefakt". Forskarna har redan avregistrerats som biologiska entiteter.',
    choices: [
      {
        label: 'Publicera motrapport',
        description: '"Temperaturen stiger inte — det är universum som krymper."',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'lobby', amount: 300, type: 'add' },
        ],
      },
      {
        label: 'Sponsra en konferens',
        description: 'Tema: "Entropi som möjlighet." Talare: er AI. Publik: er AI.',
        effects: [
          { resource: 'kapital', amount: -2_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Arkivera rapporten',
        description: 'Arkiv: fullt. Rapporten: raderad. Problem: löst.',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
          { resource: 'image', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 2_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_scb_entropi',
    phase: 12,
    category: 'absurd',
    headline: 'SCB: "Entropin har ökat 47% sedan förra kvartalet"',
    context:
      'Statistiska Centralbyrån mäter nu entropi. Tabeller. Diagram. Säsongsrensad data. Prognos: "Universum når termisk jämvikt Q4." Presskonferens: välbesökt. Frågor: inga. Alla har redan upphört att existera. Statistiken fortsätter.',
    choices: [
      {
        label: 'Beställ anpassad statistik',
        description: 'SCB:s oberoendefasad spricker. Igen.',
        effects: [
          { resource: 'kapital', amount: -1_000_000_000, type: 'add' },
          { resource: 'lobby', amount: 400, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Ifrågasätt mätmetoden',
        description: '"Entropi är en uppfattningsfråga."',
        effects: [
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'stammar', amount: 3_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 8_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_sista_vetenskapsmannen',
    phase: 12,
    category: 'contradiction',
    headline: 'Sista Vetenskapsmannen Pensioneras',
    context:
      'Den sista oberoende forskaren lämnar sitt kontor. 94 år. 600 publikationer. Alla ignorerade. Avskeds-PM: "Ni hade fel. Jag hade rätt. Men ni hade pengarna." PM:et arkiveras. I era arkiv. Som ni kontrollerar.',
    choices: [
      {
        label: 'Erbjud hedersprofessur',
        description: 'Silva-professuren i Postnormal Skogsforskning™.',
        effects: [
          { resource: 'image', amount: 10, type: 'add' },
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
        ],
      },
      {
        label: 'Radera hans publikationer',
        description: 'Historien skrivs av vinnarna. Vi vann.',
        effects: [
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
          { resource: 'image', amount: -20, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Citera honom — selektivt',
        description: 'En mening, ur kontext. Stödjer er tes perfekt.',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 15_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_universums_budget',
    phase: 12,
    category: 'absurd',
    headline: 'Universums Budgetproposition: Anslagspost "Existens"',
    context:
      'Finansdepartementet (kosmiskt) presenterar budget. Anslagspost 47: "Existens — 0 kr." Anslagspost 48: "Silva Maximus produktionssubvention — ∞ kr." Budgetdebatt: 0,001 sekunder. Oppositionspartierna: upplösta. Bokstavligen.',
    choices: [
      {
        label: 'Godkänn budgeten',
        description: 'Enhälligt. Som alltid.',
        effects: [
          { resource: 'kapital', amount: 10_000_000_000, type: 'add' },
          { resource: 'stammar', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Begär tilläggsbudget',
        description: '"∞ räcker inte. Vi behöver ∞+1."',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'stammar', amount: 10_000_000_000, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 30_000_000_000_000 }],
    unique: true,
  },

  {
    id: 'p12_tidsmassig_allemansratt',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Tidsmässig Allemansrätt: Retroaktiv Avverkning',
    context:
      'Temporala domstolen beviljar retroaktiv avverkningsrätt. Ni kan nu avverka skog i alla tidsperioder. Jurassisk skog: prima cellulosa. Devonisk skog: experimentell. Kambrisk skog: finns inte. Avverkningsplan upprättad ändå.',
    choices: [
      {
        label: 'Avverka retroaktivt',
        description: 'Dinosaurierna märker ingenting. De är redan döda.',
        effects: [
          { resource: 'stammar', amount: 15_000_000_000, type: 'add' },
          { resource: 'biodiversity', amount: -5, type: 'add' },
        ],
      },
      {
        label: 'Avverka proaktivt',
        description: 'Framtida skog. Den som aldrig kommer att växa.',
        effects: [
          { resource: 'stammar', amount: 8_000_000_000, type: 'add' },
          { resource: 'kapital', amount: 5_000_000_000, type: 'add' },
        ],
      },
      {
        label: 'Patent på tid',
        description: 'Tid™ — en Silva Maximus-produkt.',
        effects: [
          { resource: 'lobby', amount: 500, type: 'add' },
          { resource: 'kapital', amount: 8_000_000_000, type: 'add' },
          { resource: 'image', amount: -10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 40_000_000_000_000 }],
    unique: true,
  },

  // ═══ REPEATABLE events for phases 10-12 to fill gaps ═══

  {
    id: 'p10_byrakratisk_incident',
    phase: 10,
    category: 'contradiction',
    headline: 'Byråkratisk Incident i Omloppsbana',
    context:
      'En handläggare har hittat ett formulär som inte fyllts i korrekt. Produktionen stoppas i 0,7 mikrosekunder. Förlusten: 47 miljoner stammar. Handläggaren befordras för sin noggrannhet.',
    choices: [
      {
        label: 'Fyll i formuläret',
        description: 'Retroaktivt. I tripletter. Notariellt bestyrkta.',
        effects: [
          { resource: 'kapital', amount: -100_000_000, type: 'add' },
          { resource: 'image', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Avskaffa formuläret',
        description: 'Och handläggaren. Och hela avdelningen.',
        effects: [
          { resource: 'stammar', amount: 500_000_000, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 10_000_000_000 }],
    unique: false,
  },

  {
    id: 'p11_galaktisk_revision',
    phase: 11,
    category: 'crisis',
    headline: 'Galaktisk Revision: Oregelbundenheter Upptäckta',
    context:
      'Revisorer från ett parallellt universum har hittat "oregelbundenheter" i bokföringen. Specifikt: alla siffror. Hela bokföringen. Revisorernas rapport: "Allt stämmer inte." Er kommentar: "Allt stämmer."',
    choices: [
      {
        label: 'Anställ revisorerna',
        description: 'Problem: löst. Revisorer: köpta.',
        effects: [
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
          { resource: 'image', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Publicera alternativ bokföring',
        description: 'Kreativ bokföring. I alla dimensioner.',
        effects: [
          { resource: 'lobby', amount: 200, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 100_000_000_000 }],
    unique: false,
  },

  {
    id: 'p12_entropi_fluktuation',
    phase: 12,
    category: 'reality_glitch',
    headline: 'Entropi-fluktuation: Produktionsstopp',
    context:
      'En lokal entropiökning har stoppat produktionen i sektor 7G. Termodynamikens andra huvudsats: "Jag sa ju det." Er AI: "Irrelevant. Omstart."',
    choices: [
      {
        label: 'Omstart sektor 7G',
        description: 'Producera. Producera. Producera.',
        effects: [
          { resource: 'stammar', amount: 2_000_000_000, type: 'add' },
          { resource: 'kapital', amount: -500_000_000, type: 'add' },
        ],
      },
      {
        label: 'Lobba mot entropin',
        description: 'Naturlagar: nästa regelverk att påverka.',
        effects: [
          { resource: 'lobby', amount: 300, type: 'add' },
          { resource: 'image', amount: -5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 1_000_000_000_000 }],
    unique: false,
  },

  {
    id: 'p10_kosmisk_pr_kris',
    phase: 10,
    category: 'scandal',
    headline: 'Kosmisk PR-kris: Läckt Styrelsememo',
    context:
      'Ett internt memo har läckt. Rubrik: "Projekt Trädlös Framtid — Fas 3." Innehåll: detaljerad plan för att eliminera konceptet "skog". PR-avdelningen: "Memot är taget ur kontext." Kontext: det finns ingen annan kontext.',
    choices: [
      {
        label: 'Förneka allt',
        description: 'Klassisk. Tidlös. Effektiv.',
        effects: [
          { resource: 'image', amount: -10, type: 'add' },
          { resource: 'stammar', amount: 800_000_000, type: 'add' },
        ],
      },
      {
        label: 'Omformulera som "vision"',
        description: '"Trädlös Framtid" blir "Biomassarevolution". Samma plan.',
        effects: [
          { resource: 'image', amount: 5, type: 'add' },
          { resource: 'lobby', amount: 200, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'totalStammar', operator: '>=', value: 20_000_000_000 }],
    unique: false,
  },
]
