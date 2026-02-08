import type { GameEvent } from '../../store/types'

export const PHASE1_EVENTS: GameEvent[] = [
  // ── Scandals ──
  {
    id: 'p1_scandal_tweet',
    phase: 1,
    category: 'scandal',
    headline: 'Controversial Tweet Goes Viral',
    context: 'A late-night post sparks international outrage. The algorithm is feeding.',
    choices: [
      {
        label: 'Double Down',
        description: 'More attention, less credibility',
        effects: [
          { resource: 'attention', amount: 50, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Issue Non-Apology',
        description: '"I\'m sorry you were offended"',
        effects: [
          { resource: 'attention', amount: 20, type: 'add' },
          { resource: 'greatness', amount: 2, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_scandal_tax',
    phase: 1,
    category: 'scandal',
    headline: 'Tax Records Surface Online',
    context: 'Someone leaked financial documents. The numbers are... creative.',
    choices: [
      {
        label: '"Smart Business"',
        description: 'Spin it as genius',
        effects: [
          { resource: 'attention', amount: 40, type: 'add' },
          { resource: 'cash', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Threaten Lawsuit',
        description: 'Fear is a resource',
        effects: [
          { resource: 'attention', amount: 30, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 20 }],
  },
  {
    id: 'p1_scandal_ghostwriter',
    phase: 1,
    category: 'scandal',
    headline: 'Ghostwriter Reveals All',
    context: 'The person who actually wrote your bestseller is doing interviews.',
    choices: [
      {
        label: 'Deny Everything',
        description: 'Who are you going to believe?',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
        ],
      },
      {
        label: 'Sue for NDA Violation',
        description: 'Legal intimidation works',
        effects: [
          { resource: 'cash', amount: -20, type: 'add' },
          { resource: 'influence', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 20 }],
  },

  // ── Opportunities ──
  {
    id: 'p1_opp_rally',
    phase: 1,
    category: 'opportunity',
    headline: 'Rally Opportunity',
    context: 'A venue just opened up. Time to give the people what they want.',
    choices: [
      {
        label: 'Pack the Arena',
        description: 'Maximum crowd, maximum attention',
        effects: [
          { resource: 'attention', amount: 80, type: 'add' },
          { resource: 'greatness', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Intimate Fundraiser',
        description: 'Less spectacle, more donations',
        effects: [
          { resource: 'cash', amount: 100, type: 'add' },
          { resource: 'attention', amount: 20, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_opp_endorsement',
    phase: 1,
    category: 'opportunity',
    headline: 'Celebrity Endorsement Offer',
    context: 'A reality TV star wants to publicly support the brand. Very on-brand.',
    choices: [
      {
        label: 'Accept Gladly',
        description: 'Free publicity',
        effects: [
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'greatness', amount: 8, type: 'add' },
        ],
      },
      {
        label: 'Demand Payment',
        description: 'Nothing is free in this game',
        effects: [
          { resource: 'cash', amount: 75, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 50 }],
  },
  {
    id: 'p1_opp_book_deal',
    phase: 1,
    category: 'opportunity',
    headline: 'Book Deal on the Table',
    context: 'A publisher wants your name on a new title. Content optional.',
    choices: [
      {
        label: 'Cash Advance',
        description: 'Take the money upfront',
        effects: [
          { resource: 'cash', amount: 200, type: 'add' },
        ],
      },
      {
        label: 'Publicity Blitz',
        description: 'Book tour generates attention',
        effects: [
          { resource: 'attention', amount: 120, type: 'add' },
          { resource: 'greatness', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 10 }],
  },
  {
    id: 'p1_opp_merch_viral',
    phase: 1,
    category: 'opportunity',
    headline: 'Merchandise Goes Viral',
    context: 'Your branded products are trending on social media. Everyone wants one.',
    choices: [
      {
        label: 'Limited Edition Drop',
        description: 'Scarcity creates demand',
        effects: [
          { resource: 'cash', amount: 150, type: 'add' },
          { resource: 'attention', amount: 40, type: 'add' },
        ],
      },
      {
        label: 'Mass Production',
        description: 'Flood the market',
        effects: [
          { resource: 'cash', amount: 80, type: 'add' },
          { resource: 'attention', amount: 80, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 100 }],
  },

  // ── Absurd ──
  {
    id: 'p1_absurd_covfefe',
    phase: 1,
    category: 'absurd',
    headline: 'Mysterious Post Baffles Internet',
    context: 'You posted a single incomprehensible word at 3 AM. It\'s now a movement.',
    choices: [
      {
        label: '"Meant Every Word"',
        description: 'Own the mystery',
        effects: [
          { resource: 'attention', amount: 70, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Sell the Merchandise',
        description: 'Put it on a hat',
        effects: [
          { resource: 'cash', amount: 60, type: 'add' },
          { resource: 'attention', amount: 30, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_absurd_steak',
    phase: 1,
    category: 'absurd',
    headline: 'Steak Brand Controversy',
    context: 'Food critics unanimously pan your branded steaks. Sales are through the roof.',
    choices: [
      {
        label: '"Best Steaks, Believe Me"',
        description: 'Critics don\'t know real food',
        effects: [
          { resource: 'cash', amount: 40, type: 'add' },
          { resource: 'attention', amount: 50, type: 'add' },
        ],
      },
      {
        label: 'Challenge Critics to Taste Test',
        description: 'Content goldmine',
        effects: [
          { resource: 'attention', amount: 90, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 30 }],
  },
  {
    id: 'p1_absurd_impersonator',
    phase: 1,
    category: 'absurd',
    headline: 'Professional Impersonator Goes Viral',
    context: 'Someone is impersonating you so well that even supporters are confused.',
    choices: [
      {
        label: 'Hire Them',
        description: 'Two of you = twice the attention',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'cash', amount: -30, type: 'add' },
        ],
      },
      {
        label: 'Sue Them',
        description: 'There can only be one',
        effects: [
          { resource: 'influence', amount: 10, type: 'add' },
          { resource: 'cash', amount: -15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 200 }],
  },

  // ── Contradictions ──
  {
    id: 'p1_contra_billionaire_populist',
    phase: 1,
    category: 'contradiction',
    headline: 'Billionaire Populism Questioned',
    context: 'A reporter asks how a gold-penthouse dweller understands working families.',
    choices: [
      {
        label: '"I Eat McDonald\'s"',
        description: 'Relatable! Just like you!',
        effects: [
          { resource: 'attention', amount: 50, type: 'add' },
          { resource: 'greatness', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Attack the Reporter',
        description: 'The best defense',
        effects: [
          { resource: 'attention', amount: 70, type: 'add' },
          { resource: 'influence', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'cash', operator: '>=', value: 50 }],
  },
  {
    id: 'p1_contra_freedom_censorship',
    phase: 1,
    category: 'contradiction',
    headline: 'Free Speech Champion Blocks Critics',
    context: 'Your "free speech" platform is suspending accounts that disagree with you.',
    choices: [
      {
        label: '"Maintaining Standards"',
        description: 'Free speech doesn\'t mean consequence-free speech',
        effects: [
          { resource: 'influence', amount: 15, type: 'add' },
          { resource: 'attention', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Unblock Everyone',
        description: 'The algorithm will bury them anyway',
        effects: [
          { resource: 'attention', amount: 40, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 50 }],
  },

  // ── Crisis ──
  {
    id: 'p1_crisis_investigation',
    phase: 1,
    category: 'crisis',
    headline: 'Federal Investigation Announced',
    context: 'Authorities are looking into your business practices. This could be trouble.',
    choices: [
      {
        label: '"Witch Hunt!"',
        description: 'Rally the base around persecution',
        effects: [
          { resource: 'attention', amount: 150, type: 'add' },
          { resource: 'cash', amount: -50, type: 'add' },
          { resource: 'greatness', amount: 20, type: 'add' },
        ],
      },
      {
        label: 'Cooperate Quietly',
        description: 'Boring but safe',
        effects: [
          { resource: 'cash', amount: -100, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 100 }],
  },
  {
    id: 'p1_crisis_lawsuit',
    phase: 1,
    category: 'crisis',
    headline: 'Class Action Lawsuit Filed',
    context: 'Former "university" students want their money back. How unreasonable.',
    choices: [
      {
        label: 'Settle Quietly',
        description: 'Make it go away',
        effects: [
          { resource: 'cash', amount: -75, type: 'add' },
        ],
      },
      {
        label: 'Counter-Sue',
        description: 'Offense is the best defense',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'cash', amount: -30, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 300 }],
  },

  // ── More Opportunities (to reach 15+) ──
  {
    id: 'p1_opp_podcast',
    phase: 1,
    category: 'opportunity',
    headline: 'Podcast Appearance Invite',
    context: 'The #1 podcast wants you on. Three hours of unfiltered conversation.',
    choices: [
      {
        label: 'Go Long',
        description: 'Three hours of pure content',
        effects: [
          { resource: 'attention', amount: 200, type: 'add' },
          { resource: 'greatness', amount: 25, type: 'add' },
        ],
      },
      {
        label: 'Counter-Offer: Your Platform Only',
        description: 'Drive traffic to your platform',
        effects: [
          { resource: 'attention', amount: 80, type: 'add' },
          { resource: 'influence', amount: 20, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 30 }],
  },
  {
    id: 'p1_opp_meme',
    phase: 1,
    category: 'opportunity',
    headline: 'You\'ve Become a Meme',
    context: 'The internet has turned your latest gaffe into a viral meme format.',
    choices: [
      {
        label: 'Embrace It',
        description: 'Post the meme yourself',
        effects: [
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'greatness', amount: 8, type: 'add' },
        ],
      },
      {
        label: 'Copyright Claim Everything',
        description: 'Your face, your rules',
        effects: [
          { resource: 'cash', amount: 30, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_absurd_gold_toilet',
    phase: 1,
    category: 'absurd',
    headline: 'Gold Toilet Photo Leaks',
    context: 'Paparazzi captured your bathroom renovation. It\'s... golden.',
    choices: [
      {
        label: '"That\'s Called Success"',
        description: 'If you\'ve got it, flush it',
        effects: [
          { resource: 'attention', amount: 80, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Launch Gold Bathroom Line',
        description: 'If they want it, sell it',
        effects: [
          { resource: 'cash', amount: 120, type: 'add' },
          { resource: 'attention', amount: 40, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'cash', operator: '>=', value: 100 }],
  },

  // ══════════════════════════════════════════════
  //  NEW CONTENT — Phase 1 Expansion
  // ══════════════════════════════════════════════

  // ── Scandals (5 new) ──
  {
    id: 'p1_scandal_charity',
    phase: 1,
    category: 'scandal',
    headline: 'Charity Funds "Redirected"',
    context: 'An audit reveals your children\'s charity spent 90% on "administrative golf."',
    choices: [
      {
        label: '"Networking IS Charity"',
        description: 'Golf builds relationships that help people',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'cash', amount: 40, type: 'add' },
        ],
      },
      {
        label: 'Dissolve the Charity',
        description: 'Can\'t audit what doesn\'t exist',
        effects: [
          { resource: 'cash', amount: 80, type: 'add' },
          { resource: 'influence', amount: 5, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_scandal_plagiarism',
    phase: 1,
    category: 'scandal',
    headline: 'Speech Plagiarism Exposed',
    context: 'Your big keynote was copy-pasted from three different TED talks and a fortune cookie.',
    choices: [
      {
        label: '"Great Minds Think Alike"',
        description: 'Parallel thinking happens all the time',
        effects: [
          { resource: 'attention', amount: 45, type: 'add' },
          { resource: 'greatness', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Blame the Speechwriter',
        description: 'Throw them under the podium',
        effects: [
          { resource: 'attention', amount: 30, type: 'add' },
          { resource: 'influence', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 15 }],
  },
  {
    id: 'p1_scandal_crowd_size',
    phase: 1,
    category: 'scandal',
    headline: 'Crowd Size Photos Don\'t Match Claims',
    context: 'Aerial shots show 2,000 attendees. You claimed 200,000. Close enough.',
    choices: [
      {
        label: '"Fake Photos!"',
        description: 'The camera adds negative people',
        effects: [
          { resource: 'attention', amount: 70, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Release "Official" Photos',
        description: 'Photoshop is a legitimate tool',
        effects: [
          { resource: 'attention', amount: 40, type: 'add' },
          { resource: 'cash', amount: 25, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 75 }],
  },
  {
    id: 'p1_scandal_health',
    phase: 1,
    category: 'scandal',
    headline: 'Health Records Leaked',
    context: 'Medical documents reveal your doctor\'s note was dictated by you. "Astonishingly excellent."',
    choices: [
      {
        label: '"Healthiest Ever"',
        description: 'Challenge doubters to a fitness test',
        effects: [
          { resource: 'attention', amount: 80, type: 'add' },
          { resource: 'greatness', amount: 8, type: 'add' },
        ],
      },
      {
        label: 'Threaten the Hospital',
        description: 'HIPAA works both ways... sort of',
        effects: [
          { resource: 'influence', amount: 12, type: 'add' },
          { resource: 'cash', amount: -25, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 40 }],
  },
  {
    id: 'p1_scandal_intern',
    phase: 1,
    category: 'scandal',
    headline: 'Former Intern Publishes Tell-All',
    context: 'A memoir titled "Covfefe and Chaos" is topping the bestseller charts.',
    choices: [
      {
        label: 'Buy All Copies',
        description: 'If you buy them all, nobody else can read it',
        effects: [
          { resource: 'cash', amount: -60, type: 'add' },
          { resource: 'attention', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Write Your Own Tell-All',
        description: 'About yourself. The authorized version.',
        effects: [
          { resource: 'cash', amount: 100, type: 'add' },
          { resource: 'attention', amount: 70, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 80 }],
  },

  // ── Opportunities (5 new) ──
  {
    id: 'p1_opp_tabloid',
    phase: 1,
    category: 'opportunity',
    headline: 'Tabloid Exclusive Offer',
    context: 'A major tabloid wants a front-page exclusive. They\'ll print whatever you say.',
    choices: [
      {
        label: 'Outrageous Claims',
        description: 'The wilder the headline, the better the sales',
        effects: [
          { resource: 'attention', amount: 90, type: 'add' },
          { resource: 'greatness', amount: 7, type: 'add' },
        ],
      },
      {
        label: 'Paid Advertorial',
        description: 'It looks like news but it\'s an ad',
        effects: [
          { resource: 'cash', amount: 120, type: 'add' },
          { resource: 'attention', amount: 30, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_opp_reality_tv',
    phase: 1,
    category: 'opportunity',
    headline: 'Reality TV Pitch Meeting',
    context: 'A network wants a show where you fire people. Groundbreaking television.',
    choices: [
      {
        label: 'Accept the Deal',
        description: 'National exposure + catchphrase rights',
        effects: [
          { resource: 'attention', amount: 150, type: 'add' },
          { resource: 'greatness', amount: 15, type: 'add' },
        ],
      },
      {
        label: 'Demand Executive Producer Credit',
        description: 'More money, more control',
        effects: [
          { resource: 'cash', amount: 200, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 120 }],
  },
  {
    id: 'p1_opp_foreign_interview',
    phase: 1,
    category: 'opportunity',
    headline: 'Foreign Media Requests Interview',
    context: 'International journalists want your "unique perspective." They seem... fascinated.',
    choices: [
      {
        label: 'Go International',
        description: 'Global brand awareness',
        effects: [
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'influence', amount: 15, type: 'add' },
        ],
      },
      {
        label: '"America First"',
        description: 'Refuse and make that the story',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'greatness', amount: 10, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 25 }],
  },
  {
    id: 'p1_opp_speaking_gig',
    phase: 1,
    category: 'opportunity',
    headline: 'Corporate Speaking Gig',
    context: 'Fortune 500 company offers $250K for a 20-minute speech. Topics optional.',
    choices: [
      {
        label: 'Take the Money',
        description: '$12,500 per minute. Not bad.',
        effects: [
          { resource: 'cash', amount: 250, type: 'add' },
        ],
      },
      {
        label: 'Demand More + Branding',
        description: 'Rename their conference room',
        effects: [
          { resource: 'cash', amount: 150, type: 'add' },
          { resource: 'attention', amount: 50, type: 'add' },
          { resource: 'influence', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'cash', operator: '>=', value: 75 }],
  },
  {
    id: 'p1_opp_debate',
    phase: 1,
    category: 'opportunity',
    headline: 'Debate Challenge Issued',
    context: 'A prominent critic challenges you to a live debate. Ratings would be huge.',
    choices: [
      {
        label: 'Accept (With Conditions)',
        description: 'You pick the moderator, the venue, and the questions',
        effects: [
          { resource: 'attention', amount: 180, type: 'add' },
          { resource: 'greatness', amount: 20, type: 'add' },
        ],
      },
      {
        label: '"Too Busy Being Great"',
        description: 'Decline with maximum condescension',
        effects: [
          { resource: 'attention', amount: 70, type: 'add' },
          { resource: 'influence', amount: 12, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 60 }],
  },

  // ── Absurd (6 new) ──
  {
    id: 'p1_absurd_sharpie',
    phase: 1,
    category: 'absurd',
    headline: 'Sharpie Weather Map Incident',
    context: 'You extended a hurricane\'s path with a marker to prove you were right. The evidence is on live TV.',
    choices: [
      {
        label: '"The Sharpie Was Prophetic"',
        description: 'Predict more weather with office supplies',
        effects: [
          { resource: 'attention', amount: 90, type: 'add' },
          { resource: 'greatness', amount: 6, type: 'add' },
        ],
      },
      {
        label: 'Sell Autographed Sharpies',
        description: 'Turn controversy into commerce',
        effects: [
          { resource: 'cash', amount: 80, type: 'add' },
          { resource: 'attention', amount: 40, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_absurd_tan',
    phase: 1,
    category: 'absurd',
    headline: 'The Tan Line Mystery',
    context: 'A gust of wind reveals a stark tan line that doesn\'t match your "natural glow" claims.',
    choices: [
      {
        label: '"Lighting Conditions"',
        description: 'It\'s the sun\'s fault',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'greatness', amount: 4, type: 'add' },
        ],
      },
      {
        label: 'Launch Bronzer Brand',
        description: '"Presidential Glow" — $49.99 a bottle',
        effects: [
          { resource: 'cash', amount: 100, type: 'add' },
          { resource: 'attention', amount: 50, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 25 }],
  },
  {
    id: 'p1_absurd_love_letters',
    phase: 1,
    category: 'absurd',
    headline: '"Beautiful Letters" from Dictators',
    context: 'You\'re showing off personal correspondence from authoritarian leaders. "We fell in love," you explain.',
    choices: [
      {
        label: 'Publish a Coffee Table Book',
        description: '"Letters from Strongmen" — a collector\'s edition',
        effects: [
          { resource: 'cash', amount: 90, type: 'add' },
          { resource: 'attention', amount: 70, type: 'add' },
        ],
      },
      {
        label: 'Frame Them in Gold',
        description: 'Display in the lobby. Very diplomatic.',
        effects: [
          { resource: 'influence', amount: 15, type: 'add' },
          { resource: 'greatness', amount: 8, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 35 }],
  },
  {
    id: 'p1_absurd_eclipse',
    phase: 1,
    category: 'absurd',
    headline: 'Staring at the Eclipse',
    context: 'Despite every warning, you looked directly at the solar eclipse. On camera. Without glasses.',
    choices: [
      {
        label: '"The Sun Looked Away First"',
        description: 'Assert dominance over celestial objects',
        effects: [
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'greatness', amount: 10, type: 'add' },
        ],
      },
      {
        label: 'Sell Eclipse Merch',
        description: 'Branded sunglasses: "I LOOKED"',
        effects: [
          { resource: 'cash', amount: 70, type: 'add' },
          { resource: 'attention', amount: 50, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 150 }],
  },
  {
    id: 'p1_absurd_paper_towels',
    phase: 1,
    category: 'absurd',
    headline: 'Paper Towel Throwing Incident',
    context: 'At a disaster relief event, you\'re tossing paper towels into the crowd like basketballs.',
    choices: [
      {
        label: '"Three-Pointer!"',
        description: 'Turn relief into a sport',
        effects: [
          { resource: 'attention', amount: 110, type: 'add' },
          { resource: 'greatness', amount: 7, type: 'add' },
        ],
      },
      {
        label: 'Branded Paper Towels',
        description: '"The Absorber" — for the biggest messes',
        effects: [
          { resource: 'cash', amount: 60, type: 'add' },
          { resource: 'attention', amount: 40, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 15 }],
  },
  {
    id: 'p1_absurd_fast_food',
    phase: 1,
    category: 'absurd',
    headline: 'Fast Food Banquet at the Mansion',
    context: 'You\'re hosting dignitaries with a table full of cold Big Macs and Filet-O-Fish. On silver platters.',
    choices: [
      {
        label: '"American Cuisine!"',
        description: 'Declare fast food a national treasure',
        effects: [
          { resource: 'attention', amount: 85, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Franchise Deal',
        description: 'Negotiate a branded meal',
        effects: [
          { resource: 'cash', amount: 150, type: 'add' },
          { resource: 'attention', amount: 30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'cash', operator: '>=', value: 120 }],
  },

  // ── Contradictions (5 new) ──
  {
    id: 'p1_contra_self_made',
    phase: 1,
    category: 'contradiction',
    headline: '"Self-Made" Origin Story Questioned',
    context: 'Records show a "small loan" of several million. Self-made is a spectrum, you argue.',
    choices: [
      {
        label: '"A Mere Million"',
        description: 'Minimize. It was basically nothing.',
        effects: [
          { resource: 'attention', amount: 55, type: 'add' },
          { resource: 'greatness', amount: 5, type: 'add' },
        ],
      },
      {
        label: 'Redefine Self-Made',
        description: 'Self-made means making the call to accept the money',
        effects: [
          { resource: 'attention', amount: 40, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
        ],
      },
    ],
  },
  {
    id: 'p1_contra_drain_swamp',
    phase: 1,
    category: 'contradiction',
    headline: 'Swamp Draining Goes Sideways',
    context: 'Your anti-corruption team is now under investigation for corruption. Layers.',
    choices: [
      {
        label: '"Deeper Than Expected"',
        description: 'The swamp has swamps',
        effects: [
          { resource: 'attention', amount: 65, type: 'add' },
          { resource: 'greatness', amount: 4, type: 'add' },
        ],
      },
      {
        label: 'Rebrand the Swamp',
        description: '"Strategic Wetland Preservation"',
        effects: [
          { resource: 'influence', amount: 12, type: 'add' },
          { resource: 'cash', amount: 30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 30 }],
  },
  {
    id: 'p1_contra_gold_elevator',
    phase: 1,
    category: 'contradiction',
    headline: 'Gold Elevator, Blue Collar Speech',
    context: 'You descend a golden escalator to announce you\'re fighting for the working class.',
    choices: [
      {
        label: '"Gold Inspires"',
        description: 'This is what success looks like',
        effects: [
          { resource: 'attention', amount: 75, type: 'add' },
          { resource: 'greatness', amount: 8, type: 'add' },
        ],
      },
      {
        label: 'Sell Escalator Rides',
        description: '$50 for the "Descent of Greatness" experience',
        effects: [
          { resource: 'cash', amount: 100, type: 'add' },
          { resource: 'attention', amount: 35, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 80 }],
  },
  {
    id: 'p1_contra_family_values',
    phase: 1,
    category: 'contradiction',
    headline: 'Family Values Champion, Wife #3',
    context: 'You\'re giving a speech about traditional family values. The math is getting complicated.',
    choices: [
      {
        label: '"Family is Evolving"',
        description: 'More marriages = more family',
        effects: [
          { resource: 'attention', amount: 50, type: 'add' },
          { resource: 'greatness', amount: 6, type: 'add' },
        ],
      },
      {
        label: 'Pivot to "Dynasty"',
        description: 'Rebrand as legacy-building',
        effects: [
          { resource: 'influence', amount: 15, type: 'add' },
          { resource: 'attention', amount: 30, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 45 }],
  },
  {
    id: 'p1_contra_bible',
    phase: 1,
    category: 'contradiction',
    headline: 'Bible Verse Fumble',
    context: 'Asked to name a favorite Bible verse, you cite "Two Corinthians" and trail off. The faithful look concerned.',
    choices: [
      {
        label: '"It\'s a Personal Relationship"',
        description: 'Too sacred to share publicly',
        effects: [
          { resource: 'attention', amount: 45, type: 'add' },
          { resource: 'greatness', amount: 3, type: 'add' },
        ],
      },
      {
        label: 'Sell Branded Bibles',
        description: 'Your name on the cover. $59.99.',
        effects: [
          { resource: 'cash', amount: 130, type: 'add' },
          { resource: 'attention', amount: 60, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'clickCount', operator: '>=', value: 40 }],
  },

  // ── Crisis (4 new) ──
  {
    id: 'p1_crisis_bank',
    phase: 1,
    category: 'crisis',
    headline: 'Branded Bank Collapses',
    context: 'Your name-licensed bank just failed. Depositors are furious. Regulators are circling.',
    choices: [
      {
        label: '"I Only Licensed the Name"',
        description: 'Distance from the wreckage',
        effects: [
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'cash', amount: -80, type: 'add' },
        ],
      },
      {
        label: 'Blame the Manager',
        description: '"I hire the best people. Sometimes they\'re the worst."',
        effects: [
          { resource: 'attention', amount: 60, type: 'add' },
          { resource: 'influence', amount: 10, type: 'add' },
          { resource: 'cash', amount: -40, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'cash', operator: '>=', value: 150 }],
  },
  {
    id: 'p1_crisis_documentary',
    phase: 1,
    category: 'crisis',
    headline: 'Damning Documentary Drops',
    context: 'A streaming platform just released a 6-part exposé. It\'s trending #1 in 40 countries.',
    choices: [
      {
        label: '"Free Publicity"',
        description: 'All press is good press, even the bad kind',
        effects: [
          { resource: 'attention', amount: 200, type: 'add' },
          { resource: 'greatness', amount: 15, type: 'add' },
          { resource: 'cash', amount: -50, type: 'add' },
        ],
      },
      {
        label: 'Counter-Documentary',
        description: 'Fund your own version. "The REAL Story."',
        effects: [
          { resource: 'cash', amount: -100, type: 'add' },
          { resource: 'attention', amount: 80, type: 'add' },
          { resource: 'influence', amount: 15, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 70 }],
  },
  {
    id: 'p1_crisis_whistleblower',
    phase: 1,
    category: 'crisis',
    headline: 'Ally Turns Whistleblower',
    context: 'Your most loyal lieutenant just flipped. They have recordings. Lots of recordings.',
    choices: [
      {
        label: '"Never Knew Them"',
        description: 'Deny any close relationship (despite 200 photos together)',
        effects: [
          { resource: 'attention', amount: 120, type: 'add' },
          { resource: 'influence', amount: -10, type: 'add' },
        ],
      },
      {
        label: 'Release Counter-Tapes',
        description: 'You recorded everything too. Mutually assured destruction.',
        effects: [
          { resource: 'attention', amount: 180, type: 'add' },
          { resource: 'greatness', amount: 25, type: 'add' },
          { resource: 'cash', amount: -70, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'greatness', operator: '>=', value: 90 }],
  },
  {
    id: 'p1_crisis_platform_ban',
    phase: 1,
    category: 'crisis',
    headline: 'Banned from Major Platform',
    context: 'Your main social media account just got permanently suspended. 80 million followers — gone.',
    unique: true,
    choices: [
      {
        label: '"This Proves They Fear Me"',
        description: 'Martyrdom is the ultimate brand',
        effects: [
          { resource: 'attention', amount: 250, type: 'add' },
          { resource: 'greatness', amount: 30, type: 'add' },
        ],
      },
      {
        label: 'Launch Own Platform',
        description: 'With blackjack and no moderation',
        effects: [
          { resource: 'cash', amount: -150, type: 'add' },
          { resource: 'attention', amount: 100, type: 'add' },
          { resource: 'influence', amount: 25, type: 'add' },
        ],
      },
    ],
    conditions: [{ resource: 'attention', operator: '>=', value: 400 }],
  },
]
