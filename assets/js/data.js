/* Forza Horizon 6 Guide — content data
 *
 * PRIMARY SOURCE: English Wikipedia "Forza Horizon 6" article
 *   (https://en.wikipedia.org/wiki/Forza_Horizon_6) — facts marked [WIKI].
 * Community guides (Reddit, IGN, GamesRadar, game8, Red Bull, Polygon, etc.)
 * fill in gameplay detail where Wikipedia is silent
 * (e.g. Barn Finds, Treasure Cars, house names). Those sections are labelled
 * "community-sourced" so readers know what is encyclopaedically confirmed vs not.
 *
 * No car names, locations, or stats are invented.
 */
window.FH6DATA = {
  meta: {
    title: "Forza Horizon 6 Guide",
    tagline: "An unofficial, source-checked guide to the festival in Japan",
    description: "Forza Horizon 6 lands in a fictionalised Japan with the biggest map the series has ever built and 550+ cars. This guide covers the car list, barn finds, treasure cars, the Estate, the interactive Japan map, and a beginner path to Horizon Legend — with sources noted for everything.",
    lang: "en",
    developer: "Playground Games (with Turn 10 Studios)",
    publisher: "Xbox Game Studios",
    platforms: "Windows · Xbox Series X/S · PlayStation 5",
    released: "May 19, 2026 (Premium early access May 15)"
  },

  // Headline facts — ALL confirmed by Wikipedia [WIKI]
  facts: [
    { k: "Setting", v: "Japan (fictionalised)" },
    { k: "Released", v: "May 19, 2026" },
    { k: "Cars at launch", v: "550+" },
    { k: "Developer", v: "Playground Games" },
    { k: "Publisher", v: "Xbox Game Studios" },
    { k: "Platforms", v: "PC · Xbox · PS5" },
    { k: "Garages", v: "8 (fast-travel)" },
    { k: "The Eliminator", v: "up to 72 players" }
  ],

  hero: {
    eyebrow: "Horizon Japan",
    title: "Forza Horizon 6",
    subtitle: "550+ cars, the largest map the series has ever built, and a festival that finally lands in Japan. Here's the straight talk on what to do first, which cars actually matter, and where everything is hidden.",
    cover: "2025 Toyota GR GT Prototype"
  },

  // ---------------------------------------------------------------------------
  // CARS
  // ---------------------------------------------------------------------------
  cars: {
    intro: "Forza Horizon 6 launches with 550+ cars [WIKI]. The first group lists vehicles confirmed directly by Wikipedia (key-art cover car and the cross-title loyalty rewards). The remaining groups are drawn from community guides (IGN, GamesRadar, Reddit) and are clearly marked as community-sourced.",
    groups: [
      {
        title: "Confirmed vehicles (Wikipedia)",
        badge: "WIKI",
        note: "From the official key art and cross-title loyalty rewards [WIKI].",
        items: [
          { year: "2025", make: "Toyota", model: "GR GT Prototype", tag: "Cover car", note: "Headline machine on the FH6 key art, with Mount Fuji and Tokyo behind it [WIKI]." },
          { year: "2024", make: "Toyota", model: "Land Cruiser 250", tag: "Key art", note: "Featured alongside the GR GT Prototype in the reveal key art [WIKI]." },
          { year: "2021", make: "Mercedes-AMG", model: "One", tag: "Loyalty (FH5)", note: "Returning reward for playing Forza Horizon 5 [WIKI]." },
          { year: "2016", make: "Aston Martin", model: "Vulcan", tag: "Loyalty (FH4)", note: "Returning reward for playing Forza Horizon 4 [WIKI]." },
          { year: "2016", make: "Lamborghini", model: "Centenario LP 770-4", tag: "Loyalty (FH3)", note: "Returning reward for playing Forza Horizon 3 [WIKI]." },
          { year: "2014", make: "Lamborghini", model: "Huracán LP 610-4", tag: "Loyalty (FH2)", note: "Returning reward for playing Forza Horizon 2 [WIKI]." },
          { year: "2013", make: "Dodge", model: "SRT Viper GTS", tag: "Loyalty (FH1)", note: "Returning reward for playing Forza Horizon 1 [WIKI]." },
          { year: "2024", make: "Chevrolet", model: "Corvette E-Ray", tag: "Loyalty (Motorsport)", note: "Returning reward for Forza Motorsport (2023) [WIKI]." }
        ]
      },
      {
        title: "Starter Cars (community-sourced)",
        note: "Handed to you at the start of the festival per community guides. Not enumerated by Wikipedia.",
        items: [
          { year: "1989", make: "Nissan", model: "Silvia K'S", tag: "Drift-friendly", note: "Great for learning Touge and drift zones." },
          { year: "1994", make: "Toyota", model: "Celica GT-Four ST205", tag: "All-rounder", note: "Balanced for mixed road and light off-road." },
          { year: "1970", make: "GMC", model: "Jimmy", tag: "Off-road", note: "Heavy on tarmac, strong in the northern mountains." }
        ]
      },
      {
        title: "Prologue & Festival Cars (community-sourced)",
        note: "Appear during the opening drive and early festival events per community guides.",
        items: [
          { year: "2024", make: "Nissan", model: "GT-R Nismo", tag: "Prologue", note: "Driven through the Hokubu fields at the very start." },
          { year: "2021", make: "RJ Anderson", model: "#37 Polaris RZR Pro 4 Truck", tag: "Prologue", note: "Snow-circuit opener." },
          { year: "1995", make: "Porsche", model: "911 GT2", tag: "Prologue" },
          { year: "", make: "Mazda", model: "RX-7 Type R", tag: "Prologue" },
          { year: "2023", make: "BMW", model: "M2", tag: "Prologue" },
          { year: "2020", make: "Toyota", model: "GR Supra", tag: "Prologue" }
        ]
      },
      {
        title: "Event Path Reward Cars (community-sourced)",
        note: "Cars tied to specific Horizon Festival and Explore Japan milestones (from the IGN walkthrough).",
        items: [
          { year: "2022", make: "Toyota", model: "GR86" },
          { year: "2001", make: "Mitsubishi", model: "Lancer Evolution VI GSR TM Edition" },
          { year: "2024", make: "Ram", model: "1500 TRX" },
          { year: "", make: "Aston Martin", model: "Vulcan", tag: "Loyalty reward", note: "Forza Loyalty reward if you played earlier titles." },
          { year: "", make: "Ford", model: "RS200", tag: "Wristband event", note: "Pier Pressure — Tokyo docks." },
          { year: "", make: "Lotus", model: "Exige WTAC", tag: "Road Racing" },
          { year: "", make: "Subaru", model: "Impreza", tag: "Sekibe Scramble" },
          { year: "", make: "Mitsubishi", model: "Lancer Evo", tag: "Sekibe Scramble" },
          { year: "", make: "Lamborghini", model: "Huracán Sterrato", tag: "Dirt Racing max" },
          { year: "", make: "Mini", model: "JCW Buggy", tag: "Cross Country" },
          { year: "", make: "GMA", model: "T.50", tag: "Speed Traps" },
          { year: "", make: "Porsche", model: "911 GT3 RS '12", tag: "Speed Zones" },
          { year: "", make: "M12S", model: "Warthog CST", tag: "Danger Signs" },
          { year: "", make: "Mazda", model: "RX-8 #99", tag: "Drift Zones" },
          { year: "", make: "Mercedes-Benz", model: "G 65", tag: "Trailblazers" },
          { year: "", make: "Lexus", model: "LFA FE", tag: "Street / Touge ultimate" },
          { year: "", make: "Honda", model: "NSX-R '05", tag: "Regional Mascots" },
          { year: "", make: "Audi", model: "R8 '13", tag: "Day Trips" },
          { year: "", make: "Nissan", model: "240 #777", tag: "Drift Club Japan" },
          { year: "", make: "Honda", model: "Civic '84", tag: "Moto Auto Zine" },
          { year: "", make: "Toyota", model: "GR86 \"86 Stories\"", tag: "Yuji's Auto" },
          { year: "", make: "Porsche", model: "918", tag: "Horizon Play" },
          { year: "", make: "Porsche", model: "Cayman GT4 RS", tag: "Road Rivals" },
          { year: "", make: "Opel", model: "Manta 400", tag: "Dirt Rivals" },
          { year: "#37", model: "Pro 2 Truck", tag: "Cross Country Rivals" },
          { year: "", make: "Subaru", model: "Vivio FE", tag: "Horizon Life" },
          { year: "", make: "Nissan", model: "Nismo GT-R '24", tag: "Touge & Street Rivals" },
          { year: "", make: "Koenigsegg", model: "Agera RS", tag: "Explore Japan landmark" }
        ]
      },
      {
        title: "Featured Roster (community-sourced sample)",
        note: "A slice of the launch roster — the full list spans 64+ pages on IGN.",
        items: [
          { year: "1969", make: "Toyota", model: "2000GT" },
          { year: "1964", make: "Ferrari", model: "250 GTO" },
          { year: "1954", make: "Mercedes-Benz", model: "300SL" },
          { year: "1994", make: "Ferrari", model: "355 Berlinetta" },
          { year: "1991", make: "Ferrari", model: "512 TR" },
          { year: "1973", make: "Porsche", model: "911 Carrera RS" },
          { year: "1995", make: "Porsche", model: "911 GT2" },
          { year: "2004", make: "Porsche", model: "996 GT3" },
          { year: "1982", make: "Porsche", model: "911 Turbo" },
          { year: "1989", make: "Porsche", model: "944 Turbo" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // BEST CARS
  // ---------------------------------------------------------------------------
  bestCars: {
    intro: "Forget hunting for one 'best' car — Horizon is built so different machines win at different things. These are the standout picks for each discipline, pulled from the walkthrough reward cars and what reviewers actually rated.",
    categories: [
      { cat: "Top Speed / Fastest", picks: [
        { car: "GMA T.50", why: "Reward for Speed Traps — a raw, lightweight hypercar." },
        { car: "Koenigsegg Agera RS", why: "Granted for discovering Japanese landmarks via Explore Japan." },
        { car: "2025 GR GT Prototype", why: "The cover car; built for straight-line pace." },
        { car: "Nissan Nismo GT-R '24", why: "Top reward from Touge & Street Rivals." }
      ]},
      { cat: "Drifting", picks: [
        { car: "Nissan 240 #777", why: "Drift Club Japan reward — purpose-built slide machine." },
        { car: "Mazda RX-8 #99", why: "Drift Zones reward; rotary balance." },
        { car: "Nissan Silvia K'S (starter)", why: "Rocket-Bunny-style starter that rewards precise throttle." },
        { car: "Mazda RX-7 Type R", why: "Featured in the prologue Touge intro." }
      ]},
      { cat: "Drag Racing", picks: [
        { car: "M12S Warthog CST", why: "Danger Signs reward; brutal launch." },
        { car: "Ram 1500 TRX", why: "First-wristband reward with serious grunt." },
        { car: "RJ Anderson #37 Polaris RZR Pro 4", why: "Prologue truck; strong off-the-line." }
      ]},
      { cat: "Off-road / Rally", picks: [
        { car: "Lamborghini Huracán Sterrato", why: "Dirt Racing max reward." },
        { car: "Mini JCW Buggy", why: "Cross Country reward." },
        { car: "#37 Pro 2 Truck", why: "Cross Country Rivals reward." },
        { car: "GMC Jimmy (starter)", why: "Surprisingly capable in the snowy north." }
      ]},
      { cat: "Best All-rounder Starter", picks: [
        { car: "Toyota Celica GT-Four ST205", why: "Balanced AWD turbo — comfortable on road and light trails while you learn." }
      ]}
    ],
    faq: [
      { q: "Is there one single best car in Forza Horizon 6?", a: "No. The right car depends on the job — top speed, drift, drag, off-road and all-round driving each favour different builds. Use the picks above as a starting point and tune to taste." },
      { q: "What is the best all-rounder starter car?", a: "The Toyota Celica GT-Four ST205: a balanced AWD turbo that is comfortable on road and light trails while you learn the map. The Nissan Silvia K'S is the better pick if you want to learn drifting, and the GMC Jimmy if you'll spend time off-road or in the snow." },
      { q: "What is the fastest car, and how do I unlock it?", a: "The GMA T.50 is the top-speed pick and is granted for clearing Speed Traps. The Koenigsegg Agera RS comes from discovering Japanese landmarks via Explore Japan, and the 2025 GR GT Prototype (the cover car) is built for straight-line pace." },
      { q: "What is the best car for drifting?", a: "The Nissan 240 #777 (Drift Club Japan reward) and the Mazda RX-8 #99 (Drift Zones reward) are purpose-built slide machines; the Nissan Silvia K'S starter also rewards precise throttle control." },
      { q: "What is the best car for drag racing?", a: "The M12S Warthog CST (Danger Signs reward) has a brutal launch, the Ram 1500 TRX is a first-wristband reward with serious grunt, and the RJ Anderson #37 Polaris RZR Pro 4 is strong off the line." },
      { q: "What is the best off-road / rally car?", a: "The Lamborghini Huracán Sterrato (Dirt Racing max reward) and the Mini JCW Buggy (Cross Country reward) handle loose surfaces best; the #37 Pro 2 Truck and GMC Jimmy are solid too." },
      { q: "How many cars are in Forza Horizon 6 at launch?", a: "550+ cars at launch [WIKI]. The lists above are curated, sourced picks — not the full roster." },
      { q: "What is the best car for farming credits?", a: "Any of the fast event-reward cars above will do; pair it with higher difficulty and assists off for up to +125% credit payouts, and three-star PR stunts for Super Wheelspins." }
    ]
  },

  // ---------------------------------------------------------------------------
  // INTERACTIVE MAP / REGIONS  (named areas per Wikipedia [WIKI])
  // ---------------------------------------------------------------------------
  regions: {
    intro: "Forza Horizon 6 is set in a fictionalised Japan with the largest open-world map in the series [WIKI]. The areas below are named in Wikipedia; community guides report the full map spans 10 regions — we list what is encyclopaedically confirmed and clearly mark the rest.",
    items: [
      { name: "Tokyo", known: true, blurb: "The largest urban area in any Forza Horizon game — about five times the size of previous city areas [WIKI]. Districts include Shibuya Crossing, Ginko Avenue, and Tokyo Tower, linked by elevated highways. Mix of neon downtown, suburbs, and industrial docks [WIKI].",
        features: ["Shibuya Crossing", "Ginko Avenue", "Tokyo Tower", "Elevated highways", "Neon downtown · suburbs · industrial docks", "≈5× the size of prior city areas [WIKI]"] },
      { name: "Legend Island", known: true, blurb: "A special area unlocked with the Gold Wristband, featuring unique challenges, exclusive events, and a second Horizon Festival [WIKI].",
        features: ["Gold Wristband unlock", "Unique challenges", "Exclusive events", "Second Horizon Festival"] },
      { name: "Rural Japan", known: true, blurb: "The countryside, home to the Estate — your customisable mountainside property [WIKI]. Scenic driving and overlooks.",
        features: ["The Estate (customisable property)", "Mountainous scenery", "Open-world building"] },
      { name: "Mount Fuji", known: true, blurb: "Japan's iconic peak appears as a backdrop behind Tokyo and the key art — a landmark rather than a drivable district [WIKI].",
        features: ["Backdrop landmark", "Visible from Tokyo", "Key-art centerpiece"] },
      { name: "More regions (community-reported)", known: false, blurb: "Community guides describe the full map as 10 regions. Beyond Tokyo, Legend Island, Rural Japan and Mount Fuji, Wikipedia does not name the others, so we won't invent them.",
        features: ["Community: 10 regions total", "Discover by driving in", "Contributes to Discover Japan stamps"] }
    ],
    legend: [
      { icon: "PR", label: "Speed Traps, Speed Zones, Danger Signs, Drift Zones, Trailblazers" },
      { icon: "M", label: "Mascots — drive through them for credits" },
      { icon: "PH", label: "Photo & landmark spots (Collection Journal stamps)" },
      { icon: "H", label: "The Estate — your customisable property" },
      { icon: "G", label: "Garages — 8 car-display + fast-travel points" },
      { icon: "A", label: "Aftermarket Cars — green CT icons on the map" },
      { icon: "T", label: "Treasure Cars — photo-clue only, no marker until found" }
    ]
  },

  // ---------------------------------------------------------------------------
  // BEGINNER'S GUIDE
  // ---------------------------------------------------------------------------
  beginner: {
    intro: "New to Horizon Japan? Follow this path — distilled from the Reddit no-spoiler guide, RedBull tips, Polygon's 10 tips, and the official First Drive, cross-checked against Wikipedia's confirmed systems.",
    steps: [
      { n: 1, title: "Qualify, then Invitational", body: "Run the Horizon Qualifiers, then the Horizon Invitational. Finishing it grants your first (Yellow) Wristband and unlocks the festival, multiplayer, and free cars." },
      { n: 2, title: "Pick a starter that matches your style", body: "Silvia K'S for drift, Celica GT-Four for balance, GMC Jimmy for off-road. All three end up in your garage anyway." },
      { n: 3, title: "Don't blow credits at the Autoshow", body: "Wheelspins, story events, and the Festival Playlist hand out cars fast. Spend early credits tuning your starter instead." },
      { n: 4, title: "Earn Discover Japan stamps", body: "Explore regions, discover landmarks, and photograph them. Stamps feed your Collection Journal and unlock content [WIKI]." },
      { n: 5, title: "Farm mascots", body: "Mascots sit across the map — drive through them for credits. (Exact count is community-reported; clear them as you explore.)" },
      { n: 6, title: "Grab Aftermarket Cars", body: "Watch the minimap for green CT car icons. They're secondhand, fully tuned, and cheaper than the Autoshow." },
      { n: 7, title: "Use ANNA when you're tired", body: "The AI assistant can drive you to a destination; Cinema Mode hides the UI for screenshot tours." },
      { n: 8, title: "Nail Drag Meets", body: "Handbrake + launch control, release on the final light. Jumping the gun lurches you forward." },
      { n: 9, title: "Three-star PR stunts", body: "Speed Zones, Danger Signs, and Drift Zones earn Super Wheelspins and Skill Points for Car Mastery trees." },
      { n: 10, title: "Turn up difficulty for credits", body: "Higher difficulty + assists off can pay up to +125% credits per race. Only when you can still win." },
      { n: 11, title: "Photo everything", body: "Press Up for photo mode. The Horizon Promo challenge gives festival points per car photographed, and the journal wants landmark shots." },
      { n: 12, title: "Fast-travel smart", body: "You can teleport to almost anywhere you've already visited — including the middle of a road. Explore first, blink later." },
      { n: 13, title: "Unlock the Estate", body: "The Estate is your customisable mountainside property in rural Japan [WIKI] — build and decorate it, and collect daily credit payouts via the My Horizon message center." },
      { n: 14, title: "Treasure & Barn loop", body: "Treasure Cars hide behind photo clues (no marker until found). Barn Finds appear as rumours once stamps unlock them. (Counts are community-reported — see those sections.)" }
    ],
    settings: [
      "Enable Proximity Radar (HUD & Gameplay) to see cars behind you.",
      "Raise camera FOV (Video) for a wider view.",
      "Build your own music playlist — the 9 in-game stations repeat fast.",
      "Turn off car damage if you'd rather keep cars pristine."
    ]
  },

  // ---------------------------------------------------------------------------
  // BARN FINDS  (community-sourced — Wikipedia is silent)
  // ---------------------------------------------------------------------------
  barnFinds: {
    count: 14,
    countSource: "community-reported",
    intro: "Barn Finds are reported by community guides as classic cars abandoned in barns across Japan, gated behind your Discover Japan stamps. Note: Wikipedia does not confirm this mechanic or its count.",
    howTo: [
      "Earn Discover Japan stamps by exploring regions, photographing landmarks, and completing stories.",
      "Each stamp milestone unlocks new Barn Find rumors.",
      "A purple circle appears on the map — drive into it to reveal the barn's rough area.",
      "Search the circle for the barn; restore the car and add it to your collection."
    ],
    note: "Exact barn-find car names and coordinates are still being mapped by the community. We won't list coordinates we can't verify."
  },

  // ---------------------------------------------------------------------------
  // TREASURE CARS  (community-sourced — Wikipedia is silent)
  // ---------------------------------------------------------------------------
  treasureCars: {
    count: 9,
    countSource: "community-reported",
    intro: "Treasure Cars are reported by community guides as abandoned vehicles hidden across the map, found only via photo clues (no map marker until discovered). Note: Wikipedia does not confirm this mechanic or its count.",
    howTo: [
      "Drive around Japan; the game notifies you when you're near a Treasure Car.",
      "A menu photo shows the approximate location — the in-game clues barely describe it.",
      "Find the exact spot, claim the car, and it's added to your collection for free.",
      "Once discovered, the location stays marked on your map.",
      "A systematic north-to-south sweep covers all of them in a couple of hours."
    ],
    note: "All are reported free and spread across the regions. Specific model names aren't published yet, so we list the mechanic rather than guess."
  },

  // ---------------------------------------------------------------------------
  // AFTERMARKET CARS  (Wikipedia: cars are extensively customisable)
  // ---------------------------------------------------------------------------
  aftermarket: {
    count: null,
    intro: "Aftermarket Cars are secondhand vehicles scattered across the map. They match your current campaign progression, come fully tuned with kits, and cost less than the Autoshow. (Wikipedia confirms deep car customisation but does not define this specific system; details below are community-sourced.)",
    howTo: [
      "Watch the minimap for green CT car icons while driving to events.",
      "Drive up and buy directly — no auction house needed.",
      "They're a cheap, ready-to-race alternative to the Autoshow early on."
    ],
    note: "Aftermarket Cars are one of three ways to get cars fast (alongside Wheelspins and Treasure Cars)."
  },

  // ---------------------------------------------------------------------------
  // FORZA EDITION CARS  (community-sourced — Wikipedia is silent)
  // ---------------------------------------------------------------------------
  forzaEdition: {
    intro: "Forza Edition (FE) cars are rare, specially-tuned variants found on the road and as rewards. Wikipedia does not confirm this category; the examples below are community-sourced.",
    examples: [
      { car: "Lexus LFA FE", note: "Ultimate reward for Street Racing & Touge." },
      { car: "Subaru Vivio FE", note: "Horizon Life Events reward." },
      { car: "Nissan Nismo GT-R '24", note: "Top reward from Touge & Street Rivals." }
    ],
    note: "More Forza Edition cars exist and turn up as you explore — collect them as you find them."
  },

  // ---------------------------------------------------------------------------
  // HOUSES / PROPERTY  (CORRECTED per Wikipedia: The Estate is the headline
  // property; "8" refers to Garages, not houses)
  // ---------------------------------------------------------------------------
  houses: {
    count: 1,
    countLabel: "headline property",
    intro: "Forza Horizon 6 features player property. Wikipedia confirms one headline customisable property — the Estate, a mountainside plot in rural Japan you build and decorate [WIKI]. Community guides list additional houses, but Wikipedia does not enumerate them. Important correction: the \"8\" figure some guides cite refers to Garages (car-display and fast-travel points), not houses [WIKI].",
    items: [
      { name: "The Estate", price: "Unlocked via progression", bonus: "Build & decorate in the open world; daily credit payouts", note: "Wikipedia-confirmed [WIKI]: a customisable mountainside property in rural Japan. Develop it with Estate tools and claim daily payouts via My Horizon → Message Center." },
      { name: "Garages (8)", price: "Fast-travel points", bonus: "Car-display spaces with customisable interiors", note: "Wikipedia confirms 8 garages that double as fast-travel points and shareable car-display spaces [WIKI] — distinct from player houses." }
    ]
  },

  // ---------------------------------------------------------------------------
  // FEATURES (extra context, shown on home)
  // ---------------------------------------------------------------------------
  features: [
    { title: "ANNA", body: "The in-game co-driver. Hand the wheel to her on long drives, or flip on Cinema Mode to hide the HUD for clean photo runs." },
    { title: "The Estate", body: "Your own patch of rural Japan. Build and decorate it right in the world, then invite friends to cruise through." },
    { title: "Garages", body: "Eight of them double as fast-travel points, with customisable interiors you can share or download." },
    { title: "Tuning & paint", body: "Bodykits, rims, liveries — and for the first time in the series, window decals." },
    { title: "Horizon Play", body: "The returning multiplayer mash-ups: Spec Racing, The Eliminator (72 players at once), Touge Showdown, Hide & Seek." },
    { title: "Radio", body: "Nine stations, every genre. Or mute them and run your own playlist like a normal person." },
    { title: "Festival Playlist", body: "A new season drops every week across a four-week series, each with exclusive cars and credit payouts." },
    { title: "EventLab", body: "Build your own events and tracks, then publish them for the rest of the festival to play." },
    { title: "Wristbands", body: "The classic progression ladder returns: race, stunt and explore your way up it. Hit Gold and Legend Island opens." },
    { title: "Collection Journal", body: "Every photo spot and landmark you find gets logged as a stamp as you roam Japan." }
  ],

  // ---------------------------------------------------------------------------
  // CRITICAL RECEPTION  (Wikipedia [WIKI])
  // ---------------------------------------------------------------------------
  reception: {
    intro: "Forza Horizon 6 received universal acclaim. On Metacritic it scored 90/100 (PC) and 91/100 (Xbox Series X/S); OpenCritic recorded a 100% recommend rate across 142 reviews [WIKI].",
    scores: [
      { outlet: "IGN", score: "10/10" },
      { outlet: "Eurogamer", score: "5/5" },
      { outlet: "Giant Bomb", score: "5/5" },
      { outlet: "Video Games Chronicle", score: "5/5" },
      { outlet: "Game Informer", score: "9.25/10" },
      { outlet: "Destructoid", score: "9/10" },
      { outlet: "PCGamesN", score: "9/10" },
      { outlet: "Shacknews", score: "9/10" },
      { outlet: "Pure Xbox", score: "9/10" },
      { outlet: "Hardcore Gamer", score: "4.5/5" },
      { outlet: "TechRadar", score: "4.5/5" },
      { outlet: "GamesRadar+", score: "4/5" },
      { outlet: "GameSpot", score: "8/10" },
      { outlet: "PC Gamer (US)", score: "84/100" }
    ],
    summary: "Critics praised the Japan setting, the expansive open world, the driving feel, and the variety of activities. PC Gamer called the cutscene dialogue \"bland\" and GamesRadar+ called the story \"shallow\"; some noted the structure felt conservative [WIKI]."
  },

  // ---------------------------------------------------------------------------
  // DEVELOPMENT & RELEASE  (Wikipedia [WIKI])
  // ---------------------------------------------------------------------------
  development: {
    intro: "Forza Horizon 6 is developed by Playground Games with assistance from Turn 10 Studios, and published by Xbox Game Studios [WIKI].",
    timeline: [
      { date: "Sep 25, 2025", event: "Revealed at Tokyo Game Show [WIKI]." },
      { date: "Dec 2025", event: "Turn 10 Studios shifts to focus on Forza Horizon 6 [WIKI]." },
      { date: "Jan 22, 2026", event: "Gameplay premieres at the Xbox Developer Direct [WIKI]." },
      { date: "Apr 20, 2026", event: "Limited-edition Xbox controller and headset announced (launch May 19) [WIKI]." },
      { date: "May 7–31, 2026", event: "Crunchyroll subscribers receive a free car voucher [WIKI]." },
      { date: "May 15, 2026", event: "Premium early access begins [WIKI]." },
      { date: "May 19, 2026", event: "Worldwide launch on Windows and Xbox Series X/S [WIKI]." },
      { date: "May 10, 2026", event: "155 GB preload leaked/decrypted on Steam; Playground banned the leaker [WIKI]." },
      { date: "May 21, 2026", event: "Surpasses 6 million players [WIKI]." },
      { date: "May 24, 2026", event: "300,000 concurrent players on Steam — 52nd-highest all-time peak [WIKI]." },
      { date: "Late 2026", event: "PlayStation 5 version planned [WIKI]." }
    ]
  },

};
