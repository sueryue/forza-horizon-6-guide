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
    getWays: [
      { t: "Autoshow", d: "Buy any car outright with credits. Full price, but you pick exactly the model you want." },
      { t: "Wheelspins", d: "Free spins from level-ups, story events, and the Festival Playlist — a chance at rare cars and big credit bundles." },
      { t: "Aftermarket", d: "Green CT icons on the map mark secondhand, fully-tuned cars that cost less than the Autoshow." },
      { t: "Treasure & Barn", d: "Free hidden cars: photo-clue Treasure Cars and stamp-gated Barn Finds scattered across Japan." }
    ],
    groups: [
      {
        title: "Confirmed vehicles (Wikipedia)",
        badge: "WIKI",
        note: "From the official key art and cross-title loyalty rewards [WIKI].",
        items: [
          { year: "2025", make: "Toyota", model: "GR GT Prototype", tag: "Cover car", note: "Headline machine on the FH6 key art, with Mount Fuji and Tokyo behind it [WIKI].", disc: "top" },
          { year: "2024", make: "Toyota", model: "Land Cruiser 250", tag: "Key art", note: "Featured alongside the GR GT Prototype in the reveal key art [WIKI].", disc: "offroad" },
          { year: "2021", make: "Mercedes-AMG", model: "One", tag: "Loyalty (FH5)", note: "Returning reward for playing Forza Horizon 5 [WIKI].", disc: "top" },
          { year: "2016", make: "Aston Martin", model: "Vulcan", tag: "Loyalty (FH4)", note: "Returning reward for playing Forza Horizon 4 [WIKI].", disc: "top" },
          { year: "2016", make: "Lamborghini", model: "Centenario LP 770-4", tag: "Loyalty (FH3)", note: "Returning reward for playing Forza Horizon 3 [WIKI].", disc: "top" },
          { year: "2014", make: "Lamborghini", model: "Huracán LP 610-4", tag: "Loyalty (FH2)", note: "Returning reward for playing Forza Horizon 2 [WIKI].", disc: "allround" },
          { year: "2013", make: "Dodge", model: "SRT Viper GTS", tag: "Loyalty (FH1)", note: "Returning reward for playing Forza Horizon 1 [WIKI].", disc: "allround" },
          { year: "2024", make: "Chevrolet", model: "Corvette E-Ray", tag: "Loyalty (Motorsport)", note: "Returning reward for Forza Motorsport (2023) [WIKI].", disc: "top" }
        ]
      },
      {
        title: "Starter Cars (community-sourced)",
        note: "Handed to you at the start of the festival per community guides. Not enumerated by Wikipedia.",
        items: [
          { year: "1989", make: "Nissan", model: "Silvia K'S", tag: "Drift-friendly", note: "Great for learning Touge and drift zones.", disc: "drift" },
          { year: "1994", make: "Toyota", model: "Celica GT-Four ST205", tag: "All-rounder", note: "Balanced for mixed road and light off-road.", disc: "allround" },
          { year: "1970", make: "GMC", model: "Jimmy", tag: "Off-road", note: "Heavy on tarmac, strong in the northern mountains.", disc: "offroad" }
        ]
      },
      {
        title: "Prologue & Festival Cars (community-sourced)",
        note: "Appear during the opening drive and early festival events per community guides.",
        items: [
          { year: "2024", make: "Nissan", model: "GT-R Nismo", tag: "Prologue", note: "Driven through the Hokubu fields at the very start.", disc: "top" },
          { year: "2021", make: "RJ Anderson", model: "#37 Polaris RZR Pro 4 Truck", tag: "Prologue", note: "Snow-circuit opener.", disc: "offroad" },
          { year: "1995", make: "Porsche", model: "911 GT2", tag: "Prologue", disc: "top" },
          { year: "", make: "Mazda", model: "RX-7 Type R", tag: "Prologue", disc: "drift" },
          { year: "2023", make: "BMW", model: "M2", tag: "Prologue", disc: "allround" },
          { year: "2020", make: "Toyota", model: "GR Supra", tag: "Prologue", disc: "allround" }
        ]
      },
      {
        title: "Event Path Reward Cars (community-sourced)",
        note: "Cars tied to specific Horizon Festival and Explore Japan milestones (from the IGN walkthrough).",
        items: [
          { year: "2022", make: "Toyota", model: "GR86", disc: "allround" },
          { year: "2001", make: "Mitsubishi", model: "Lancer Evolution VI GSR TM Edition", disc: "offroad" },
          { year: "2024", make: "Ram", model: "1500 TRX", disc: "drag" },
          { year: "", make: "Aston Martin", model: "Vulcan", tag: "Loyalty reward", note: "Forza Loyalty reward if you played earlier titles.", disc: "top" },
          { year: "", make: "Ford", model: "RS200", tag: "Wristband event", note: "Pier Pressure — Tokyo docks.", disc: "offroad" },
          { year: "", make: "Lotus", model: "Exige WTAC", tag: "Road Racing", disc: "allround" },
          { year: "", make: "Subaru", model: "Impreza", tag: "Sekibe Scramble", disc: "offroad" },
          { year: "", make: "Mitsubishi", model: "Lancer Evo", tag: "Sekibe Scramble", disc: "offroad" },
          { year: "", make: "Lamborghini", model: "Huracán Sterrato", tag: "Dirt Racing max", disc: "offroad" },
          { year: "", make: "Mini", model: "JCW Buggy", tag: "Cross Country", disc: "offroad" },
          { year: "", make: "GMA", model: "T.50", tag: "Speed Traps", disc: "top" },
          { year: "", make: "Porsche", model: "911 GT3 RS '12", tag: "Speed Zones", disc: "top" },
          { year: "", make: "M12S", model: "Warthog CST", tag: "Danger Signs", disc: "drag" },
          { year: "", make: "Mazda", model: "RX-8 #99", tag: "Drift Zones", disc: "drift" },
          { year: "", make: "Mercedes-Benz", model: "G 65", tag: "Trailblazers", disc: "offroad" },
          { year: "", make: "Lexus", model: "LFA FE", tag: "Street / Touge ultimate", disc: "allround" },
          { year: "", make: "Honda", model: "NSX-R '05", tag: "Regional Mascots", disc: "allround" },
          { year: "", make: "Audi", model: "R8 '13", tag: "Day Trips", disc: "allround" },
          { year: "", make: "Nissan", model: "240 #777", tag: "Drift Club Japan", disc: "drift" },
          { year: "", make: "Honda", model: "Civic '84", tag: "Moto Auto Zine", disc: "allround" },
          { year: "", make: "Toyota", model: "GR86 \"86 Stories\"", tag: "Yuji's Auto", disc: "allround" },
          { year: "", make: "Porsche", model: "918", tag: "Horizon Play", disc: "top" },
          { year: "", make: "Porsche", model: "Cayman GT4 RS", tag: "Road Rivals", disc: "allround" },
          { year: "", make: "Opel", model: "Manta 400", tag: "Dirt Rivals", disc: "offroad" },
          { year: "#37", model: "Pro 2 Truck", tag: "Cross Country Rivals", disc: "offroad" },
          { year: "", make: "Subaru", model: "Vivio FE", tag: "Horizon Life", disc: "allround" },
          { year: "", make: "Nissan", model: "Nismo GT-R '24", tag: "Touge & Street Rivals", disc: "allround" },
          { year: "", make: "Koenigsegg", model: "Agera RS", tag: "Explore Japan landmark", disc: "top" }
        ]
      },
      {
        title: "Featured Roster (community-sourced sample)",
        note: "A slice of the launch roster — the full list spans 64+ pages on IGN.",
        items: [
          { year: "1969", make: "Toyota", model: "2000GT", disc: "allround" },
          { year: "1964", make: "Ferrari", model: "250 GTO", disc: "allround" },
          { year: "1954", make: "Mercedes-Benz", model: "300SL", disc: "allround" },
          { year: "1994", make: "Ferrari", model: "355 Berlinetta", disc: "allround" },
          { year: "1991", make: "Ferrari", model: "512 TR", disc: "allround" },
          { year: "1973", make: "Porsche", model: "911 Carrera RS", disc: "allround" },
          { year: "1995", make: "Porsche", model: "911 GT2", disc: "top" },
          { year: "2004", make: "Porsche", model: "996 GT3", disc: "top" },
          { year: "1982", make: "Porsche", model: "911 Turbo", disc: "allround" },
          { year: "1989", make: "Porsche", model: "944 Turbo", disc: "allround" }
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
      { name: "Tokyo", known: true, pin: { x: 70, y: 58 }, blurb: "The largest urban area in any Forza Horizon game — about five times the size of previous city areas [WIKI]. Districts include Shibuya Crossing, Ginko Avenue, and Tokyo Tower, linked by elevated highways. Mix of neon downtown, suburbs, and industrial docks [WIKI].",
        features: ["Shibuya Crossing", "Ginko Avenue", "Tokyo Tower", "Elevated highways", "Neon downtown · suburbs · industrial docks", "≈5× the size of prior city areas [WIKI]"] },
      { name: "Legend Island", known: true, pin: { x: 88.2, y: 26.8 }, blurb: "A special area unlocked with the Gold Wristband, featuring unique challenges, exclusive events, and a second Horizon Festival [WIKI].",
        features: ["Gold Wristband unlock", "Unique challenges", "Exclusive events", "Second Horizon Festival"] },
      { name: "Rural Japan", known: true, pin: { x: 30, y: 71 }, blurb: "The countryside, home to the Estate — your customisable mountainside property [WIKI]. Scenic driving and overlooks.",
        features: ["The Estate (customisable property)", "Mountainous scenery", "Open-world building"] },
      { name: "Mount Fuji", known: true, pin: { x: 43.2, y: 40.3 }, blurb: "Japan's iconic peak appears as a backdrop behind Tokyo and the key art — a landmark rather than a drivable district [WIKI].",
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
    ],
    prStunts: [
      { t: "Speed Traps", d: "Flash through a gate above a target speed. Three-star for Super Wheelspins and Skill Points." },
      { t: "Speed Zones", d: "Hold a target average speed across a measured stretch of road." },
      { t: "Danger Signs", d: "Launch off a ramp and fly as far as the jump will carry you." },
      { t: "Drift Zones", d: "Bank the highest drift score before you cross the finish line." },
      { t: "Trailblazers", d: "Point-to-point sprint against the clock — the shortest, smoothest line wins." }
    ],
    tips: [
      "Fast-travel to any road you've already driven — explore first, blink later.",
      "Discover Japan stamps unlock Barn Find rumors and feed the Collection Journal.",
      "Photo spots (PH) double as Collection Journal stamps — stop and shoot them as you pass.",
      "Garages (G) are free fast-travel points; unlock all 8 early to cross the huge map in seconds."
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
    ],
    glossary: [
      { t: "Wristbands", d: "The progression ladder. Race, stunt, and explore to climb from Yellow up to Gold — which opens Legend Island." },
      { t: "Festival Playlist", d: "A new season every week across a four-week series, each with exclusive cars and credit payouts." },
      { t: "ANNA", d: "Your in-game co-driver. She can drive you to a destination, or you can flip on Cinema Mode to hide the HUD for clean photo runs." },
      { t: "Wheelspin / Super Wheelspin", d: "Free prizes from level-ups and PR stunts — cars, credits, and cosmetics." },
      { t: "PR Stunt", d: "Speed Traps, Speed Zones, Danger Signs, Drift Zones, and Trailblazers. Three-star them for Super Wheelspins." },
      { t: "Discover Japan", d: "The exploration meta — earn stamps by finding landmarks, photographing them, and driving the map." },
      { t: "Collection Journal", d: "Logs every photo spot and landmark you find as you roam Japan." },
      { t: "Aftermarket Car", d: "Secondhand, fully-tuned cars marked by green CT icons on the map — cheaper than the Autoshow." },
      { t: "Treasure / Barn Car", d: "Free hidden cars: Treasure via photo clues, Barn Finds via stamp-gated rumors." },
      { t: "The Estate", d: "Your customisable mountainside property in rural Japan, with daily credit payouts." },
      { t: "EventLab", d: "Build your own events and tracks, then publish them for the festival to play." },
      { t: "Horizon Play", d: "Multiplayer mash-ups: Spec Racing, The Eliminator (72 players), Touge Showdown, Hide & Seek." }
    ],
    credits: [
      "Crank difficulty up and switch assists off — up to +125% credits per race, if you can still win.",
      "Three-star PR stunts for Super Wheelspins; chain them with Skill Chains to feed Car Mastery trees.",
      "Drive through Mascots scattered across the map for easy credits as you explore.",
      "Claim The Estate's daily credit payouts via My Horizon → Message Center.",
      "Work the weekly Festival Playlist — its reward cars and payouts compound fast."
    ],
    pitfalls: [
      { t: "Don't blow credits at the Autoshow", b: "Wheelspins, story events and the Festival Playlist hand out cars fast — spend early credits tuning your starter instead of buying the headline car." },
      { t: "Don't ignore Discover Japan stamps", b: "Stamps unlock Barn Find rumours and feed your Collection Journal. Skipping exploration means missing free classic cars." },
      { t: "Don't leave assists on while chasing +125% credits", b: "Higher difficulty only pays the bonus with assists OFF. Keep the aids on and you stay at the base payout." },
      { t: "Don't miss the green CT aftermarket icons", b: "Aftermarket Cars are secondhand, fully tuned and cheaper than the Autoshow — the best early-game value on the map." },
      { t: "Don't read the '8 houses' figure as 8 properties", b: "Wikipedia confirms one headline property (The Estate); the '8' refers to Garages, the fast-travel points." },
      { t: "Don't fast-travel to places you haven't driven", b: "You can only blink to roads you've already visited. Explore first, then teleport." },
      { t: "Don't brute-force PR stunt 3-stars", b: "Pick a car built for the discipline and tune it; three-starring with the wrong machine wastes hours." },
      { t: "Don't scrap your starter cars", b: "Silvia (drift), Celica (all-rounder) and Jimmy (off-road) each earn their keep as tool cars — keep them." },
      { t: "Don't skip The Estate's daily payout", b: "Claim it via My Horizon → Message Center; it's a steady credit trickle while you explore." },
      { t: "Don't only grind one event type", b: "Sweep Mascots and Photo Spots (PH) as you drive — they stack Collection Journal stamps and unlock content faster." }
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
      { name: "The Estate", img: "assets/img/house-estate.svg", price: "Unlocked via progression", bonus: "Build & decorate in the open world; daily credit payouts", note: "Wikipedia-confirmed [WIKI]: a customisable mountainside property in rural Japan. Develop it with Estate tools and claim daily payouts via My Horizon → Message Center." },
      { name: "Garages (8)", img: "assets/img/house-garage.svg", price: "Fast-travel points", bonus: "Car-display spaces with customisable interiors", note: "Wikipedia confirms 8 garages that double as fast-travel points and shareable car-display spaces [WIKI] — distinct from player houses." }
    ],
    tips: [
      "Unlock The Estate through normal progression — it's the one property Wikipedia confirms [WIKI].",
      "At the Estate you build and decorate in the open world, then collect daily credit payouts via My Horizon → Message Center.",
      "Garages double as free fast-travel points — unlock all 8 early to cross the big map in seconds.",
      "Garage interiors are customisable and shareable — download the community's best layouts.",
      "Prioritise the Estate first: daily payouts are a steady credit stream while you explore."
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
      { date: "May 10, 2026", event: "155 GB preload leaked/decrypted on Steam; Playground banned the leaker [WIKI]." },
      { date: "May 15, 2026", event: "Premium early access begins [WIKI]." },
      { date: "May 19, 2026", event: "Worldwide launch on Windows and Xbox Series X/S [WIKI]." },
      { date: "May 21, 2026", event: "Surpasses 6 million players [WIKI]." },
      { date: "May 24, 2026", event: "300,000 concurrent players on Steam — 52nd-highest all-time peak [WIKI]." },
      { date: "Late 2026", event: "PlayStation 5 version planned [WIKI]." }
    ]
  },

  // ---------------------------------------------------------------------------
  // MEDIA - official trailers (real, embeddable YouTube IDs) + trailer stills.
  // Screenshots use the official trailer thumbnail frames (real game imagery,
  // not fabricated). To show YOUR OWN captures, drop .jpg files into
  // assets/img/shots/ and add { src: "assets/img/shots/xx.jpg", label: "..." }
  // entries to the shots array below.
  // ---------------------------------------------------------------------------
  media: {
    intro: "Official trailers from the Forza channel, plus still frames pulled from those trailers. Want your own in-game captures in the gallery? Drop .jpg files into assets/img/shots/ and point a shots entry at them in data.js.",
    videos: [
      { id: "oYhaW-Vr4wg", title: "Official Launch Trailer", date: "May 8, 2026", desc: "The full launch trailer - Japan's festivals, mountains, and 550+ cars." },
      { id: "dj2PkwfrRP0", title: "Gameplay Overview - Xbox Developer Direct 2026", date: "Jan 22, 2026", desc: "First extended gameplay look: the Japan map, new features, and the festival journey." },
      { id: "HyjVC7fKLVg", title: "The Art of Driving - Official Trailer", date: "Apr 6, 2026", desc: "Larry Chen hosts a tour of the car culture woven through Horizon Japan." },
      { id: "H1qlPZMfmiU", title: "Official 6-Minute Opening Preview", date: "Xbox", desc: "Six minutes of the opening drive through Japan's roads and landmarks." }
    ],
    // Still frames sourced from the official trailers above (real game imagery).
    // Replace an entry's `id` with `src: "assets/img/shots/xx.jpg"` to use a local capture.
    shots: [
      { id: "oYhaW-Vr4wg", label: "Launch Trailer" },
      { id: "dj2PkwfrRP0", label: "Gameplay Overview" },
      { id: "HyjVC7fKLVg", label: "The Art of Driving" },
      { id: "H1qlPZMfmiU", label: "Opening Preview" },
      { id: "oYhaW-Vr4wg", label: "Horizon Japan" },
      { id: "dj2PkwfrRP0", label: "Tokyo & Touge" }
    ]
  },

  // ---------------------------------------------------------------------------
  // WIKI — encyclopedia reference (series-stable mechanics + confirmed FH6 facts)
  // ---------------------------------------------------------------------------
  wiki: {
    intro: "Quick-reference encyclopedia for Horizon Japan. Systems and terminology that carry across the Forza Horizon series are described in general terms; FH6-specific facts are noted. Nothing here is invented — see the source notes.",
    cats: [
      { name: "Core systems", items: [
        { t: "Drivatars", b: "The AI racers that fill your lobbies. They mimic the driving styles of real Forza players, so they brake, block, and recover more like humans than scripted bots." },
        { t: "Skill chains", b: "Link drifts, jumps, near-misses and clean racing to build a Skill multiplier. A big chain banks Skill Points (SP) you spend in each car's Mastery tree." },
        { t: "Influence & Accolades", b: "The festival's progression currency. Earning accolades unlocks wristbands, new events, and the path toward the Horizon Legend rank." },
        { t: "Wheelspins", b: "Prize spins granted by level-ups, story events and the Festival Playlist. A Super Wheelspin is the rarer version with better odds at cars and credit bundles." },
        { t: "Forzathon", b: "Rotating in-world events with their own point shop. Show up, complete the themed challenges, and spend Forzathon Points on cars, emotes and cosmetics." },
        { t: "Festival Playlist", b: "The live content backbone: weekly and daily seasonal challenges. Completing them is the main way to earn exclusive cars and accolades." }
      ]},
      { name: "Disciplines", items: [
        { t: "Road Racing", b: "Tarmac circuits and sprints. Favours grip, top speed and braking — the bread-and-butter of the festival." },
        { t: "Dirt Racing", b: "Loose-surface stages through Japan's countryside. Look for rally-bred hatches and lightweight buggies." },
        { t: "Cross Country", b: "Rugged point-to-point routes across fields, rivers and trails. Big, tough machinery wins here." },
        { t: "Street Racing", b: "Illegal-feeling night Touge and city runs. Tight, technical, and all about rhythm and momentum." },
        { t: "Drag", b: "Straight-line launches from a standing start. Brutal acceleration and launch control decide it." },
        { t: "Drift", b: "Style over speed — hold the longest, smoothest slide for points. Differentials and tire setup matter most." }
      ]},
      { name: "Car classes", items: [
        { t: "Performance Index (PI)", b: "Every car is ranked by a single PI number so you can race fair. Upgrades push the number up; the class is just a band of that number." },
        { t: "D / C / B / A", b: "The lower four classes. D is the most beginner-friendly; A is fast but still accessible for most events." },
        { t: "S1 / S2", b: "Superbike-grade and hypercar territory. High power and aero; reserved for the toughest events and PR stunts." },
        { t: "X (Exceptional)", b: "The unrestricted class for the absolute fastest, most heavily modified machines in the game." }
      ]},
      { name: "Events & PR stunts", items: [
        { t: "Circuit & Sprint", b: "Closed-loop and point-to-point races against Drivatars — the core of the campaign." },
        { t: "Speed Zones", b: "Hit the highest average speed through a marked corridor. Reward Super Wheelspins and accolades." },
        { t: "Danger Signs", b: "Launch off a ramp and fly as far as possible. A favourite for big-air screenshots." },
        { t: "Drift & Trailblazer", b: "Score points in a slide, or blaze a ghost route as fast as you can. Both feed Skill Points." }
      ]},
      { name: "The world", items: [
        { t: "Horizon Japan", b: "FH6's setting: a fictionalised, festival-take on Japan with the largest open-world map in the series [WIKI]." },
        { t: "Regions", b: "Japan is split into regions — community guides report around ten, from Tokyo and Mount Fuji to rural towns and islands." },
        { t: "The Estate", b: "Your customisable mountainside property in rural Japan. Build, decorate, and collect daily credit payouts [WIKI]." },
        { t: "Garages", b: "Eight garages double as fast-travel points and car-display showrooms across the map [WIKI]." }
      ]},
      { name: "Glossary", items: [
        { t: "Wristband", b: "The rank badge you earn by clearing accolade milestones. Higher wristbands unlock more of the map and events." },
        { t: "Discover Japan stamps", b: "Collectible stamps earned by exploring regions, finding landmarks and photographing them." },
        { t: "Mascots", b: "Scattered collectibles you drive through for credits as you explore." },
        { t: "Barn Find / Treasure Car", b: "Two kinds of hidden free cars: barn finds appear as stamp-gated rumours, treasure cars hide behind photo clues with no marker until found." },
        { t: "ANNA & Cinema Mode", b: "ANNA is the in-car assistant that can drive you to a destination; Cinema Mode hides the UI for clean screenshot tours." }
      ]}
    ]
  },

  // ---------------------------------------------------------------------------
  // GUIDES — curated walkthroughs (real game systems + confirmed FH6 details)
  // ---------------------------------------------------------------------------
  guides: {
    intro: "Step-by-step walkthroughs built from the real game systems and the confirmed FH6 details on this site. Where a count comes from community reporting rather than an official source, it's flagged.",
    items: [
      { id: "g-first", title: "Your first 10 hours", tag: "Roadmap", lead: "A relaxed path from the Qualifiers to a garage you actually like.",
        steps: [
          { n: 1, title: "Run the Qualifiers, then the Invitational", body: "Finishing the Horizon Invitational grants your first (Yellow) Wristband and unlocks the festival, multiplayer and free cars." },
          { n: 2, title: "Pick a starter that fits you", body: "Silvia K'S for drift, Celica GT-Four for balance, GMC Jimmy for off-road. All three end up in your garage anyway." },
          { n: 3, title: "Don't spend credits at the Autoshow", body: "Wheelspins, story events and the Festival Playlist hand out cars fast. Tune your starter instead." },
          { n: 4, title: "Photo the landmarks", body: "Press Up for photo mode. Landmark shots feed your Collection Journal and earn Discover Japan stamps." },
          { n: 5, title: "Three-star a few PR stunts", body: "Speed Zones, Danger Signs and Drift Zones pay Super Wheelspins and Skill Points for Car Mastery." },
          { n: 6, title: "Raise difficulty for credits", body: "Higher difficulty with assists off can pay up to +125% credits per race — once you can still win." }
        ] },
      { id: "g-barn", title: "Unlock all 14 Barn Finds", tag: "Collectibles", lead: "Classic cars hidden in barns — gated by exploration, not luck.",
        steps: [
          { n: 1, title: "Earn Discover Japan stamps", body: "Explore regions, find landmarks and photograph them. Stamps are what unlock barn rumours." },
          { n: 2, title: "Watch for the rumour notification", body: "Once a region's stamps are met, a Barn Find rumour appears. You'll get a map hint rather than an exact pin." },
          { n: 3, title: "Drive to the hint and search", body: "Barns are tucked into the landscape. Roll up slowly and the find triggers automatically." },
          { n: 4, title: "Restore and enjoy", body: "Found barns go to your garage. 14 are reported across Japan — community-sourced; Wikipedia is silent." }
        ] },
      { id: "g-treasure", title: "Hunt the 9 Treasure Cars", tag: "Collectibles", lead: "Abandoned cars found only through photo clues — no marker until discovered.",
        steps: [
          { n: 1, title: "Get the photo clue", body: "Treasure clues show a snapshot of the location. Study the background — mountains, signs, road shape — to narrow it down." },
          { n: 2, title: "Match it on the map", body: "There is no map marker. Use landmarks and the horizon to triangulate the spot." },
          { n: 3, title: "Drive over the dig site", body: "Once you're close, the dig prompt appears. 9 treasure cars are reported — community-sourced; Wikipedia is silent." }
        ] },
      { id: "g-drift", title: "Drift tuning basics", tag: "Tuning", lead: "Make almost any car slide predictably.",
        steps: [
          { n: 1, title: "Tires: lower the pressure", body: "Drop rear tire pressure a few PSI for a looser, more forgiving slide." },
          { n: 2, title: "Differential: bias to the rear", body: "Increase rear deceleration (and acceleration) so the back steps out on throttle lift and braking." },
          { n: 3, title: "Alignment: add caster", body: "More positive caster sharpens turn-in and self-centring, which keeps drifts controllable." },
          { n: 4, title: "Power & weight", body: "RWD with healthy power drifts best; a little ballast at the rear helps rotation. Then practice on the Touge." }
        ] },
      { id: "g-credits", title: "Farm credits efficiently", tag: "Economy", lead: "Credits fund upgrades and the cars you actually want.",
        steps: [
          { n: 1, title: "Turn difficulty up", body: "Higher difficulty with assists off can pay up to +125% credits per race — only when you can still win." },
          { n: 2, title: "Three-star PR stunts", body: "Speed Zones, Danger Signs and Drift Zones award Super Wheelspins, which can pay out big credit bundles." },
          { n: 3, title: "Bank Wheelspins", body: "Level-ups, story events and the Festival Playlist all grant spins — save them and open in batches." },
          { n: 4, title: "Buy Aftermarket, not Autoshow", body: "Green CT icons on the minimap sell secondhand, fully-tuned cars cheaper than new." }
        ] },
      { id: "g-regions", title: "Complete the 10 regions", tag: "Exploration", lead: "See everything Horizon Japan has to offer.",
        steps: [
          { n: 1, title: "Drive, don't fast-travel", body: "Explore first to fill the map; you can blink to visited spots later. Stamp every region." },
          { n: 2, title: "Clear PR stunts per region", body: "Each area has its own Speed Zones, Danger Signs and Drift Zones — great for accolades and spins." },
          { n: 3, title: "Collect mascots", body: "Drive through the scattered mascots for credits as you go." },
          { n: 4, title: "Photograph landmarks", body: "Landmark shots complete the Collection Journal and stack Discover Japan stamps." }
        ] },
      { id: "g-estate", title: "Build the Estate", tag: "Property", lead: "Your own mountainside base in rural Japan [WIKI].",
        steps: [
          { n: 1, title: "Unlock it", body: "The Estate becomes available as you progress the festival in rural Japan." },
          { n: 2, title: "Build & decorate", body: "Place buildings and style the grounds to taste — it's your personal festival hub." },
          { n: 3, title: "Collect daily payouts", body: "Check the My Horizon message center for daily credit payouts from your property." }
        ] }
    ]
  },

  // ---------------------------------------------------------------------------
  // DATABASE — metadata for the sortable/searchable car table (rows derived
  // from D.cars.groups at render time, so the data stays single-sourced).
  // ---------------------------------------------------------------------------
  database: {
    intro: "Every car on this site, in one sortable table. Search by name, filter by discipline, or click a column to sort. Data is drawn from the Cars list — 550+ total at launch [WIKI]; this is a curated slice.",
    note: "Tip: click any column header to sort. Combine the search box with a discipline chip to narrow fast."
  },

};
