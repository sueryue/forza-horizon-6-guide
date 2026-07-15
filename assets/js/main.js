/* Forza Horizon 6 Guide — front-end controller
 * Hash router + renderers. All content lives in window.FH6DATA (data.js).
 */
(function () {
  "use strict";
  var D = window.FH6DATA;
  var GS = window.FH6GS || { guides: [] };
  var cmpSet = [];        // car-compare selection (cids)
  var carIndex = {};      // cid -> car record (for the compare tray)
  var pendingSearch = ""; // header search query to apply on #database

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function carName(c) {
    return (c.year ? c.year + " " : "") + c.make + " " + c.model;
  }
  // Real car silhouette icons (inline SVG), one profile per discipline.
  function wheelDark(r) {
    return '<circle cx="16" cy="27" r="' + r + '" fill="#04121a"/><circle cx="48" cy="27" r="' + r + '" fill="#04121a"/>';
  }
  function hub(r) {
    var h = (r * 0.42).toFixed(1);
    return '<circle cx="16" cy="27" r="' + h + '" fill="rgba(255,255,255,.82)"/><circle cx="48" cy="27" r="' + h + '" fill="rgba(255,255,255,.82)"/>';
  }
  function carIcon(d) {
    var L = "rgba(255,255,255,.28)", r = 6, body = "", acc = "";
    if (d === "top") {
      body = '<path d="M5 25 C6 19 11 18 19 18 L24 18 C27 12 33 11 39 13 L46 16 C54 17 59 20 59 25 L59 26 C59 27 58 27 57 27 L8 27 C6 27 5 26 5 25 Z"/>';
      acc = '<path d="M26 18 C29 13 34 12 38 14 L44 16 C41 17 37 18 32 18 Z" fill="' + L + '"/><rect x="52" y="13" width="8" height="2" rx="1"/><rect x="57" y="13" width="2" height="6"/>';
    } else if (d === "drift") {
      body = '<path d="M5 25 C6 19 11 18 19 18 L24 18 C27 12 33 11 39 13 L46 16 C54 17 59 20 59 25 L59 26 C59 27 58 27 57 27 L8 27 C6 27 5 26 5 25 Z"/>';
      acc = '<path d="M26 18 C29 13 34 12 38 14 L44 16 C41 17 37 18 32 18 Z" fill="' + L + '"/><path d="M2 12 L9 14 M1 17 L9 18 M2 22 L9 22" stroke="' + L + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    } else if (d === "drag") {
      body = '<path d="M3 24 L50 24 C52 21 55 20 58 20 L58 24 L60 25 L60 27 L5 27 Z"/>';
      acc = '<rect x="49" y="11" width="13" height="3" rx="1"/><rect x="52" y="11" width="2" height="10"/><rect x="59" y="11" width="2" height="10"/><rect x="1" y="22" width="6" height="3" rx="1"/>';
    } else if (d === "offroad") {
      r = 7;
      body = '<path d="M5 27 L5 13 Q5 10 9 10 L41 10 Q45 10 45 13 L45 18 L53 19 L53 27 Z"/>';
      acc = '<rect x="10" y="7" width="30" height="2" rx="1"/><rect x="14" y="7" width="2" height="3"/><rect x="34" y="7" width="2" height="3"/><rect x="12" y="12" width="14" height="6" rx="1" fill="' + L + '"/><rect x="28" y="12" width="12" height="6" rx="1" fill="' + L + '"/>';
    } else {
      body = '<path d="M5 25 Q6 18 14 18 L22 18 Q25 13 32 13 L40 15 Q52 16 57 21 L57 25 Q57 27 53 27 L9 27 Q5 27 5 25 Z"/>';
      acc = '<path d="M24 18 Q27 14 32 15 L39 16 C36 17 32 18 27 18 Z" fill="' + L + '"/>';
    }
    return '<svg viewBox="0 0 64 34" width="40" height="23" fill="#04121a" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="car icon">' + wheelDark(r) + body + hub(r) + acc + '</svg>';
  }
  function sectionHead(eyebrow, title, lead) {
    return '<div class="section-head"><p class="eyebrow">' + esc(eyebrow) + '</p>' +
      '<h2>' + esc(title) + '</h2>' + (lead ? '<p>' + esc(lead) + '</p>' : '') + '</div>';
  }
  function ol(items) {
    return '<ol class="steps" style="list-style:none;padding:0;counter-reset:s">' +
      items.map(function (it) {
        var n = it.n != null ? it.n : "";
        var t = it.title ? '<h4>' + esc(it.title) + '</h4>' : '';
        return '<li class="step"><span class="num">' + esc(n) + '</span><div>' + t +
          '<p>' + esc(it.body) + '</p></div></li>';
      }).join("") + '</ol>';
  }
  function stampClass(s) {
    s = (s || "").toLowerCase();
    if (s.indexOf("gold") >= 0) return "st-gold";
    if (s.indexOf("purple") >= 0) return "st-purple";
    if (s.indexOf("orange") >= 0) return "st-orange";
    if (s.indexOf("blue") >= 0) return "st-blue";
    if (s.indexOf("green") >= 0) return "st-green";
    if (s.indexOf("yellow") >= 0) return "st-yellow";
    return "st-default";
  }

  /* ---------- car sub-renderers (composed into the single Cars hub) ---------- */
  var DISCIPLINES = [
    { k: "all", l: "All cars" },
    { k: "top", l: "Top Speed" },
    { k: "drift", l: "Drift" },
    { k: "drag", l: "Drag" },
    { k: "offroad", l: "Off-road" },
    { k: "allround", l: "All-rounder" }
  ];
  function discLabel(k) {
    for (var i = 0; i < DISCIPLINES.length; i++) if (DISCIPLINES[i].k === k) return DISCIPLINES[i].l;
    return "";
  }

  // ---- Editorial car classification (derived from real data — never invented stats) ----
  var JDM_MAKES = { "Toyota":1,"Nissan":1,"Mazda":1,"Honda":1,"Mitsubishi":1,"Subaru":1,"Suzuki":1,"Acura":1,"Lexus":1,"Infiniti":1,"Daihatsu":1,"Mitsuoka":1,"Hino":1,"Isuzu":1 };
  var SUPER_MAKES = { "Lamborghini":1,"Ferrari":1,"Koenigsegg":1,"GMA":1,"Pagani":1,"Bugatti":1,"McLaren":1,"Aston Martin":1,"Porsche":1,"Mercedes-AMG":1,"Mercedes-Benz":1,"Brabus":1,"Rimac":1,"Apollo":1,"Lotus":1 };
  var CAR_TYPES = [
    { k:"all", l:"All types" },
    { k:"jdm", l:"JDM" },
    { k:"super", l:"Supercar" },
    { k:"offroad", l:"Off-road" },
    { k:"classic", l:"Classic" },
    { k:"modern", l:"Modern" }
  ];
  var CAR_ERAS = [
    { k:"all", l:"All eras" },
    { k:"classic", l:"Classic (≤89)" },
    { k:"90s", l:"90s" },
    { k:"2000s", l:"2000s" },
    { k:"2010s", l:"2010s" },
    { k:"2020s", l:"2020s" },
    { k:"undated", l:"Undated" }
  ];
  function carYearNum(c){ var y = parseInt(c.year,10); return isNaN(y) ? 0 : y; }
  function carType(c){
    var d = c.disc || "allround";
    if (d === "offroad") return "offroad";
    if (JDM_MAKES[c.make]) return "jdm";
    if (SUPER_MAKES[c.make]) return "super";
    if (carYearNum(c) && carYearNum(c) < 1990) return "classic";
    return "modern";
  }
  function carEra(c){
    var y = carYearNum(c);
    if (!y) return "undated";
    if (y < 1990) return "classic";
    if (y < 2000) return "90s";
    if (y < 2010) return "2000s";
    if (y < 2020) return "2010s";
    return "2020s";
  }
  function carTypeLabel(k){ for (var i=0;i<CAR_TYPES.length;i++) if (CAR_TYPES[i].k===k) return CAR_TYPES[i].l; return ""; }
  function renderCarsList() {
    var discBar = '<div class="car-filter" role="group" aria-label="Filter by discipline">' +
      DISCIPLINES.map(function (d, i) {
        return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-disc="' + d.k + '">' + esc(d.l) + '</button>';
      }).join("") + '</div>';
    var typeBar = '<div class="car-filter type-filter" role="group" aria-label="Filter by type">' +
      CAR_TYPES.map(function (d, i) {
        return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-type="' + d.k + '">' + esc(d.l) + '</button>';
      }).join("") + '</div>';
    var eraBar = '<div class="car-filter era-filter" role="group" aria-label="Filter by era">' +
      CAR_ERAS.map(function (d, i) {
        return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-era="' + d.k + '">' + esc(d.l) + '</button>';
      }).join("") + '</div>';
    var viewToggle = '<div class="view-toggle" role="group" aria-label="View mode">' +
      '<button type="button" class="vt-btn active" data-view="cards" aria-pressed="true">▦ Cards</button>' +
      '<button type="button" class="vt-btn" data-view="list" aria-pressed="false">≣ List</button>' +
      '</div>';
    var toolbar = '<div class="car-toolbar">' + discBar + typeBar + eraBar + viewToggle +
      '<span class="cmp-hint">Tick <b>＋ Compare</b> on 2–3 cars to compare them ↓</span></div>';

    var cid = 0;
    var groups = D.cars.groups.map(function (g) {
      var cards = g.items.map(function (c) {
        cid++;
        var d = c.disc || "allround";
        var t = carType(c);
        var e = carEra(c);
        carIndex[cid] = { make:c.make, model:c.model, year:c.year, disc:d, type:t, era:e, tag:c.tag, note:c.note, group:g.title };
        var on = cmpSet.indexOf(cid) >= 0;
        return '<div class="car-card" data-disc="' + esc(d) + '" data-type="' + t + '" data-era="' + e + '" data-cid="' + cid + '">' +
          '<label class="cmp-toggle' + (on ? ' active' : '') + '"><input type="checkbox" class="cmp-check" data-cid="' + cid + '"' + (on ? ' checked' : '') + '><span class="cmp-lbl">' + (on ? '✓ Comparing' : '＋ Compare') + '</span></label>' +
          '<div class="monogram">' + carIcon(d) + '</div>' +
          '<div class="car-meta">' +
            '<div class="yr">' + esc(c.year || "—") + '</div>' +
            '<div class="nm">' + esc(c.model) + '</div>' +
            '<div class="mk">' + esc(c.make) + '</div>' +
            (c.tag ? '<span class="tag">' + esc(c.tag) + '</span>' : '') +
            '<span class="disc-pill disc-' + esc(d) + '">' + esc(discLabel(d)) + '</span>' +
            (c.note ? '<div class="car-note">' + esc(c.note) + '</div>' : '') +
          '</div></div>';
      }).join("");
      return '<div class="car-group"><h3>' + esc(g.title) +
        (g.badge ? ' <span class="badge">' + esc(g.badge) + '</span>' : '') + '</h3>' +
        (g.note ? '<p class="note">' + esc(g.note) + '</p>' : '') +
        '<div class="car-grid">' + cards + '</div></div>';
    }).join("");
    return sectionHead("Garage", "Cars List", D.cars.intro) + toolbar + groups +
      '<p class="db-note">Type &amp; era tags are editorial groupings derived from each car’s maker, discipline and model year — they’re filters, not official stats. Official PI / drivetrain figures aren’t published for this slice, so the compare tool shows confirmed attributes only (no invented numbers).</p>';
  }

  function renderCarsOverview() {
    var ways = D.cars.getWays.map(function (w) {
      return '<div class="way"><h4>' + esc(w.t) + '</h4><p>' + esc(w.d) + '</p></div>';
    }).join("");
    return '<div class="cars-overview">' +
      '<div class="co-head">Four ways to fill your garage</div>' +
      '<div class="grid cols-4">' + ways + '</div></div>';
  }

  function renderBest() {
    var cats = D.bestCars.categories.map(function (c) {
      var picks = c.picks.map(function (p) {
        return '<div class="pick"><div class="pc">' + esc(p.car) + '</div><div class="pw">' + esc(p.why) + '</div></div>';
      }).join("");
      return '<div class="best-cat"><h3>' + esc(c.cat) + '</h3><div class="grid cols-2">' + picks + '</div></div>';
    }).join("");
    var faqHtml = "";
    if (D.bestCars.faq && D.bestCars.faq.length) {
      var faqItems = D.bestCars.faq.map(function (f) {
        return '<div class="faq-item"><h4>' + esc(f.q) + '</h4><p>' + esc(f.a) + '</p></div>';
      }).join("");
      faqHtml = '<div class="best-faq"><h3>Frequently asked questions</h3>' + faqItems + '</div>';
    }
    return sectionHead("Right tool, right job", "Best Cars", D.bestCars.intro) + cats + faqHtml;
  }

  function renderAftermarket() {
    var steps = D.aftermarket.howTo.map(function (s, i) {
      return '<li class="step"><span class="num">' + (i + 1) + '</span><div><p>' + esc(s) + '</p></div></li>';
    }).join("");
    return sectionHead("Cheap & ready", "Aftermarket Cars", D.aftermarket.intro) +
      '<ol class="steps" style="list-style:none;padding:0;margin-top:8px;counter-reset:s">' + steps + '</ol>' +
      '<div class="callout"><b>Tip:</b> ' + esc(D.aftermarket.note) + '</div>';
  }

  function renderForzaEdition() {
    var ex = D.forzaEdition.examples.map(function (e, i) {
      return '<div class="card"><span class="ico">' + String(i + 1).padStart(2, "0") + '</span><h3>' + esc(e.car) + '</h3><p>' + esc(e.note) + '</p></div>';
    }).join("");
    return sectionHead("Rare variants", "Forza Edition Cars", D.forzaEdition.intro) +
      '<div class="grid cols-3">' + ex + '</div>' +
      '<div class="callout"><b>Note:</b> ' + esc(D.forzaEdition.note) + '</div>';
  }

  function renderTreasure() {
    var steps = D.treasureCars.howTo.map(function (s, i) {
      return '<li class="step"><span class="num">' + (i + 1) + '</span><div><p>' + esc(s) + '</p></div></li>';
    }).join("");
    return sectionHead("Find the photo", "Treasure Cars", D.treasureCars.count + " abandoned cars are reported hidden across the map — found only by photo clues (community-sourced — Wikipedia is silent).") +
      '<div class="facts"><div class="fact"><div class="k">Reported Treasure Cars</div><div class="v">' + esc(D.treasureCars.count) + '</div></div>' +
        '<div class="fact"><div class="k">Source</div><div class="v">' + esc(D.treasureCars.countSource) + '</div></div>' +
        '<div class="fact"><div class="k">Map marker</div><div class="v">None until found</div></div></div>' +
      '<p class="lead" style="margin-top:16px">' + esc(D.treasureCars.intro) + '</p>' +
      '<ol class="steps" style="list-style:none;padding:0;margin-top:16px;counter-reset:s">' + steps + '</ol>' +
      '<div class="callout"><b>Honest note:</b> ' + esc(D.treasureCars.note) + '</div>';
  }

  function renderBarn() {
    var steps = D.barnFinds.howTo.map(function (s, i) {
      return '<li class="step"><span class="num">' + (i + 1) + '</span><div><p>' + esc(s) + '</p></div></li>';
    }).join("");
    return sectionHead("Rust never sleeps", "Barn Finds", D.barnFinds.count + " classic cars are reported hidden in barns across Japan (community-sourced — Wikipedia is silent).") +
      '<div class="facts"><div class="fact"><div class="k">Reported Barn Finds</div><div class="v">' + esc(D.barnFinds.count) + '</div></div>' +
        '<div class="fact"><div class="k">Source</div><div class="v">' + esc(D.barnFinds.countSource) + '</div></div>' +
        '<div class="fact"><div class="k">Unlock gate</div><div class="v">Stamps</div></div></div>' +
      '<p class="lead" style="margin-top:16px">' + esc(D.barnFinds.intro) + '</p>' +
      '<ol class="steps" style="list-style:none;padding:0;margin-top:16px;counter-reset:s">' + steps + '</ol>' +
      '<div class="callout"><b>Honest note:</b> ' + esc(D.barnFinds.note) + '</div>';
  }

  function carSection(id, inner) {
    return '<section id="' + id + '" class="car-sec">' + inner + '</section>';
  }

  /* ---------- page renderers ---------- */
  var pages = {
    home: function () {
      var m = D.meta;
      var facts = D.facts.map(function (f) {
        return '<div class="fact"><div class="k">' + esc(f.k) + '</div><div class="v">' + esc(f.v) + '</div></div>';
      }).join("");
      var feats = D.features.map(function (f, i) {
        return '<div class="card"><span class="ico">' + String(i + 1).padStart(2, "0") + '</span><h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p></div>';
      }).join("");
      var h = D.hero;

      var credits = '<div class="credits">' +
        '<span><b>Developer</b> ' + esc(m.developer) + '</span>' +
        '<span><b>Publisher</b> ' + esc(m.publisher) + '</span>' +
        '<span><b>Platforms</b> ' + esc(m.platforms) + '</span>' +
        '<span><b>Released</b> ' + esc(m.released) + '</span>' +
      '</div>';

      var featVid = "oYhaW-Vr4wg";
      var featStrip = ["dj2PkwfrRP0", "HyjVC7fKLVg", "H1qlPZMfmiU"].map(function (id) {
        return '<img class="feat-strip-img" loading="lazy" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="Forza Horizon 6 official still">';
      }).join("");
      var featured = '<section class="section home-media">' +
        sectionHead("See it move", "Watch the launch trailer", "Two minutes of Horizon Japan - then dive into the guides below.") +
        '<div class="feat-vid vid-card" data-yt="' + featVid + '" role="button" tabindex="0" aria-label="Play Official Launch Trailer">' +
          '<img class="vid-thumb" loading="lazy" src="https://i.ytimg.com/vi/' + featVid + '/hqdefault.jpg" alt="Official Launch Trailer thumbnail">' +
          '<span class="vid-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
        '</div>' +
        '<div class="feat-strip">' + featStrip + '</div>' +
      '</section>';

      var recScores = D.reception.scores.map(function (s) {
        return '<div class="rec"><span class="ro">' + esc(s.outlet) + '</span><span class="rs">' + esc(s.score) + '</span></div>';
      }).join("");
      var reception = '<section class="section">' +
        sectionHead("What the critics said", "Critical Reception", D.reception.intro) +
        '<div class="rec-grid">' + recScores + '</div>' +
        '<p class="callout" style="margin-top:16px">' + esc(D.reception.summary) + '</p></section>';

      var devItems = D.development.timeline.map(function (t) {
        return '<li class="tl"><span class="tl-d">' + esc(t.date) + '</span><span class="tl-e">' + esc(t.event) + '</span></li>';
      }).join("");
      var development = '<section class="section">' +
        sectionHead("From TGS to launch", "Development & Release", D.development.intro) +
        '<ul class="timeline">' + devItems + '</ul></section>';

      var platforms = renderPlatformsSection();
      var media = renderMediaSection();
      var wiki = renderWikiSection();
      var database = renderDatabaseSection();

      return '' +
        '<section class="hero hero--art">' +
          '<p class="eyebrow">' + esc(h.eyebrow) + '</p>' +
          '<h1>' + esc(h.title) + '</h1>' +
          '<p>' + esc(h.subtitle) + '</p>' +
          '<span class="cover-pill">Cover car · <b>' + esc(h.cover) + '</b></span>' +
        '</section>' +
        credits +
        featured +
        '<div class="facts">' + facts + '</div>' +
        '<section class="section">' +
          sectionHead("What's in the guide", "Built for Horizon Japan", "The largest open-world map in the series, 550+ cars, and a festival full of systems. Pick a section to dive in.") +
          '<div class="grid cols-3">' + feats + '</div>' +
        '</section>' +
        '<section class="section">' +
          sectionHead("New to the festival?", "Start here", "Follow the beginner path, then chase cars, treasure, and the Estate.") +
          '<div class="grid cols-2">' +
            '<a class="card" href="#beginner" style="display:block"><span class="ico">01</span><h3>Beginner\'s Guide</h3><p>14 steps from Qualifiers to Horizon Legend.</p></a>' +
            '<a class="card" href="#cars" style="display:block"><span class="ico">02</span><h3>Cars List</h3><p>Starters, reward cars, and a slice of the 550+ roster.</p></a>' +
          '</div>' +
        '</section>' +
        reception +
        development +
        wiki +
        database +
        platforms +
        media;
    },

    cars: function () {
      var NAV_SVG = {
        list:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13l2-5.5A2 2 0 0 1 7 6h10a2 2 0 0 1 2 1.5L21 13"/><rect x="3" y="13" width="18" height="5" rx="1.6"/><circle cx="7.6" cy="18" r="1.5"/><circle cx="16.4" cy="18" r="1.5"/></svg>',
        best:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 5H4.5a2 2 0 0 0 0 4H7"/><path d="M17 5h2.5a2 2 0 0 1 0 4H17"/><path d="M12 13v3"/><path d="M9 20h6"/><path d="M10 16.5h4l-1 3.5h-2z"/></svg>',
        after:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
        forza:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="m15.5 7.5 2.3 4.6a1.5 1.5 0 0 1-1 2L12 17l-4.8-2.9a1.5 1.5 0 0 1-1-2l2.3-4.6"/><path d="M7 15.5 5 21l4-1 2-3"/><path d="M17 15.5 19 21l-4-1-2-3"/></svg>',
        treasure:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1H3v-1z"/><rect x="3" y="11" width="18" height="8" rx="1"/><path d="M3 14h18"/><path d="M12 11v8"/><circle cx="12" cy="13" r="1"/></svg>',
        barn:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12 12 6l9 6"/><path d="M5 12v7h14v-7"/><path d="M12 19v-7"/><path d="M12 12l-2.6 7M12 12l2.6 7"/></svg>'
      };
      var navItems = [
        { k: "cars-list",        l: "All cars",          i: NAV_SVG.list },
        { k: "cars-best",        l: "Best by discipline", i: NAV_SVG.best },
        { k: "cars-aftermarket", l: "Aftermarket",        i: NAV_SVG.after },
        { k: "cars-forza",       l: "Forza Edition",      i: NAV_SVG.forza },
        { k: "cars-treasure",    l: "Treasure",           i: NAV_SVG.treasure },
        { k: "cars-barn",        l: "Barn Finds",         i: NAV_SVG.barn }
      ];
      var subnav = '<nav class="cars-subnav" data-subnav aria-label="Cars sections">' +
        navItems.map(function (n) {
          return '<button type="button" data-scroll="' + n.k + '">' + n.i + '<span class="lbl">' + esc(n.l) + '</span></button>';
        }).join("") +
        '</nav>';
      return '<div class="cars-hub">' + subnav + renderCarsOverview() +
        carSection("cars-list", renderCarsList()) +
        carSection("cars-best", renderBest()) +
        carSection("cars-aftermarket", renderAftermarket()) +
        carSection("cars-forza", renderForzaEdition()) +
        carSection("cars-treasure", renderTreasure()) +
        carSection("cars-barn", renderBarn()) +
        '</div>';
    },

    /* best/barn/treasure/aftermarket/forza-edition are merged into the Cars hub */

    map: function () {
      var cards = D.regions.items.map(function (r, i) {
        var feats = r.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("");
        return '<div class="region-card" data-region="' + i + '" role="button" tabindex="0" aria-expanded="false">' +
          '<h3>' + esc(r.name) + (r.known ? ' <span class="rtag ok">Confirmed</span>' : ' <span class="rtag">Reported</span>') + '</h3>' +
          '<p class="blurb">' + esc(r.blurb) + '</p>' +
          '<ul class="feats">' + feats + '</ul></div>';
      }).join("");
      var pins = D.regions.items.map(function (r, i) {
        if (!r.pin) return "";
        return '<button type="button" class="map-pin ' + (r.known ? 'pin-ok' : '') + '" ' +
          'style="left:' + r.pin.x + '%;top:' + r.pin.y + '%" data-region="' + i + '" ' +
          'aria-label="Jump to ' + esc(r.name) + ' region">' +
          '<span class="mp-dot"></span><span class="mp-lbl">' + esc(r.name) + '</span></button>';
      }).join("");
      var legend = D.regions.legend.map(function (l) {
        return '<div>' + esc(l.icon) + ' ' + esc(l.label) + '</div>';
      }).join("");
      var stunts = D.regions.prStunts.map(function (s) {
        return '<li><b>' + esc(s.t) + '</b> — ' + esc(s.d) + '</li>';
      }).join("");
      var tips = D.regions.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
      var extra = '<div class="map-extra">' +
        '<div class="me-block" data-layer-block="prstunts" data-toc="PR stunts"><h3>PR stunts &amp; activities</h3><ul class="me-list">' + stunts + '</ul></div>' +
        '<div class="me-block" data-layer-block="tips" data-toc="Exploring tips"><h3>Exploring tips</h3><ul class="me-list">' + tips + '</ul></div>' +
        '</div>';
    var layerBar = '<div class="layer-bar" role="group" aria-label="Map layers">' +
      '<span class="lb-label">Layers</span>' +
      '<button type="button" class="lb-chip active" data-layer="regions">Regions</button>' +
      '<button type="button" class="lb-chip active" data-layer="prstunts">PR Stunts</button>' +
      '<button type="button" class="lb-chip active" data-layer="tips">Tips</button>' +
      '<button type="button" class="lb-chip active" data-layer="legend">Legend</button>' +
      '</div>';
    return sectionHead("Horizon Japan", "Interactive Map", D.regions.intro) +
      '<div class="map-wrap map-canvas"><img src="assets/img/map-japan.svg" alt="Horizon Japan festival map" loading="lazy">' + pins + '</div>' +
      '<p class="map-hint">Tap a marker to jump to that region ↓</p>' +
      layerBar +
      '<div class="region-grid" id="sec-regions" data-toc="Regions" data-layer-block="regions">' + cards + '</div>' +
      renderCollectionTracker() +
      '<div class="legend" id="sec-legend" data-toc="Legend" data-layer-block="legend">' + legend + '</div>' + extra;
    },

    beginner: function () {
      var settings = D.beginner.settings.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("");
      var gl = D.beginner.glossary.map(function (g) {
        return '<div class="gl"><dt>' + esc(g.t) + '</dt><dd>' + esc(g.d) + '</dd></div>';
      }).join("");
      var cred = D.beginner.credits.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join("");
      var pf = (D.beginner.pitfalls || []).map(function (p) {
        return '<div class="pitfall"><span class="pf-avoid">Avoid</span><div><h4>' + esc(p.t) + '</h4><p>' + esc(p.b) + '</p></div></div>';
      }).join("");
    return sectionHead("No spoilers", "Beginner's Guide", D.beginner.intro) +
      '<div id="sec-path" data-toc="14-step path">' + renderBeginnerSteps() + '</div>' +
      '<div class="pitfalls" id="sec-pitfalls" data-toc="Beginner Pitfalls"><h3>Beginner Pitfalls</h3>' + pf + '</div>' +
      '<div class="settings-box" id="sec-settings" data-toc="Settings to change"><h4>Settings worth changing first</h4><ul>' + settings + '</ul></div>' +
      '<div class="glossary" id="sec-glossary" data-toc="Horizon glossary"><h3>Horizon glossary</h3><dl>' + gl + '</dl></div>' +
      '<div class="credits-box" id="sec-credits" data-toc="Credit farming"><h3>Credit farming 101</h3><ul>' + cred + '</ul></div>';
    },

    /* (barn merged into Cars hub) */

    /* (treasure merged into Cars hub) */

    /* (aftermarket merged into Cars hub) */

    /* (forza-edition merged into Cars hub) */

    houses: function () {
      var h = D.houses;
      var cards = h.items.map(function (it) {
        return '<article class="house-card' + (it.featured ? ' featured' : '') + '">' +
          (it.featured ? '<span class="house-flag">Buildable base</span>' : '') +
          '<div class="house-top">' +
            '<h3>' + esc(it.name) + '</h3>' +
            '<span class="region-tag">' + esc(it.region) + '</span>' +
          '</div>' +
          '<div class="house-meta">' +
            '<span class="hm price">' + esc(it.price) + '</span>' +
            '<span class="hm stamp ' + stampClass(it.unlock) + '">' + esc(it.unlock) + '</span>' +
          '</div>' +
          '<div class="perk"><span class="perk-name">' + esc(it.perk) + '</span>' +
            '<span class="perk-detail">' + esc(it.perkDetail) + '</span></div>' +
          '<p>' + esc(it.note) + '</p>' +
        '</article>';
      }).join("");

      var build = h.estateBuild.map(function (b) {
        return '<li><span class="eb-t">' + esc(b.t) + '</span><span class="eb-d">' + esc(b.d) + '</span></li>';
      }).join("");

      var order = h.order.map(function (o) {
        return '<li><span class="ord-n">' + o.n + '</span>' +
          '<span class="ord-body"><span class="ord-name">' + esc(o.name) + '</span>' +
          '<span class="ord-why">' + esc(o.why) + '</span></span></li>';
      }).join("");

      var tips = h.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");

      return sectionHead("Settle in", "Houses & Property", h.intro) +
        '<div class="facts">' +
          '<div class="fact"><div class="k">Player houses</div><div class="v">8</div></div>' +
          '<div class="fact"><div class="k">Garages</div><div class="v">8</div></div>' +
          '<div class="fact"><div class="k">Unlock system</div><div class="v">Discover Japan Stamps</div></div>' +
          '<div class="fact"><div class="k">Headline</div><div class="v">The Estate</div></div>' +
        '</div>' +
        '<div class="house-grid" style="margin-top:18px">' + cards + '</div>' +
        '<div class="estate-box">' +
          '<div class="estate-head"><h3>What you can build at The Estate</h3>' +
            '<span class="estate-sub">Powered by an upgraded EventLab toolset [FH6GUIDE]</span></div>' +
          '<ul class="estate-list">' + build + '</ul>' +
        '</div>' +
        '<div class="garages-box">' +
          '<h3>Garages — the other "8"</h3>' +
          '<p>' + esc(h.garages.intro) + '</p>' +
          '<p class="muted">' + esc(h.garages.note) + '</p>' +
        '</div>' +
        '<div class="order-box">' +
          '<h3>Recommended purchase order</h3>' +
          '<ol class="order-list">' + order + '</ol>' +
        '</div>' +
        '<div class="house-tips"><h3>Living in Japan</h3><ul>' + tips + '</ul></div>';
    },

    /* (wiki moved to the Overview page as renderWikiSection()) */

    /* (database moved to the Overview page as renderDatabaseSection()) */

    /* ---------- Guides: curated walkthroughs ---------- */
    guides: function () {
      var g = D.guides;
      var navItems = g.items.map(function (it) {
        return '<button type="button" data-scroll="' + it.id + '"><span class="lbl">' + esc(it.title) + '</span></button>';
      }).join("");
      var subnav = '<nav class="cars-subnav guide-subnav" data-subnav aria-label="Guides">' + navItems + '</nav>';
      var secs = g.items.map(function (it) {
        var steps = ol(it.steps.map(function (s) { return { n: s.n, title: s.title, body: s.body }; }));
        var banner = it.shot
          ? '<figure class="guide-shot"><img src="' + esc(it.shot) + '" alt="' + esc(it.title) + ' — official Forza Horizon 6 gameplay still" loading="lazy"><figcaption>Official gameplay still</figcaption></figure>'
          : '';
        return '<section id="' + it.id + '" class="guide-sec">' +
          '<div class="guide-head"><h3>' + esc(it.title) + '</h3>' +
          (it.tag ? '<span class="badge">' + esc(it.tag) + '</span>' : '') + '</div>' +
          banner +
          (it.lead ? '<p class="guide-lead">' + esc(it.lead) + '</p>' : '') +
          steps + '</section>';
      }).join("");
      return sectionHead("Walkthroughs", "Guides", g.intro) + '<div class="guides-hub">' + subnav + secs + '</div>' + renderCommunityGuidesSection();
    }
  };

  function renderWikiSection() {
      var w = D.wiki;
      var cats = w.cats.map(function (c, ci) {
        var entries = c.items.map(function (e) {
          return '<article class="wiki-entry"><h4>' + esc(e.t) + '</h4><p>' + esc(e.b) + '</p></article>';
        }).join("");
        var diag = "";
        if (c.name === "Core systems") diag = '<figure class="wiki-fig">' + diagramSkillChain() + '<figcaption>Skill chains: the longer you keep a clean combo alive, the higher the multiplier (up to ×8) — banking more Skill Points for each car’s Mastery tree.</figcaption></figure>';
        if (c.name === "Car classes") diag = '<figure class="wiki-fig">' + diagramTuning() + '<figcaption>Every car has a Performance Index that puts it in a class band — D is beginner-friendly, X is the unrestricted top tier. Upgrades shift a car up the ladder.</figcaption></figure>';
        return '<section class="wiki-cat wiki-acc open" id="wcat-' + ci + '" data-toc="' + esc(c.name) + '">' +
          '<button type="button" class="wiki-cat-btn" aria-expanded="true"><span class="wc-title">' + esc(c.name) + '</span><span class="wc-chev" aria-hidden="true">▾</span></button>' +
          '<div class="wiki-cat-body"><div class="wiki-grid">' + entries + '</div>' + diag + '</div>' +
        '</section>';
      }).join("");
      return '<section class="section">' +
        sectionHead("Encyclopedia", "Wiki", w.intro) +
        '<div class="wiki-wrap">' + cats + '</div>' +
      '</section>';
  }

  function renderDatabaseSection() {
      var db = D.database;
      var rows = [];
      D.cars.groups.forEach(function (g) {
        g.items.forEach(function (c) {
          var d = c.disc || "allround";
          rows.push({ year: c.year || "", make: c.make || "", model: c.model || "", tag: c.tag || "", disc: d });
        });
      });
      var body = rows.map(function (r) {
        var t = carType(r), e = carEra(r);
        var search = (r.year + " " + r.make + " " + r.model + " " + r.tag + " " + discLabel(r.disc) + " " + carTypeLabel(t) + " " + e).toLowerCase();
        return '<tr class="db-row" data-disc="' + esc(r.disc) + '" data-type="' + t + '" data-era="' + e + '" data-search="' + esc(search) + '">' +
          '<td class="db-year">' + esc(r.year || "—") + '</td>' +
          '<td class="db-make">' + esc(r.make) + '</td>' +
          '<td class="db-model">' + esc(r.model) + '</td>' +
          '<td class="db-disc"><span class="disc-pill disc-' + esc(r.disc) + '">' + esc(discLabel(r.disc)) + '</span></td>' +
          '<td class="db-tag">' + esc(r.tag || "—") + '</td>' +
        '</tr>';
      }).join("");
      var chips = '<div class="car-filter db-filter" role="group" aria-label="Filter by discipline">' +
        DISCIPLINES.map(function (d, i) {
          return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-db-disc="' + d.k + '">' + esc(d.l) + '</button>';
        }).join("") + '</div>';
      var typeChips = '<div class="car-filter db-filter" role="group" aria-label="Filter by type">' +
        CAR_TYPES.map(function (d, i) {
          return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-db-type="' + d.k + '">' + esc(d.l) + '</button>';
        }).join("") + '</div>';
      var eraChips = '<div class="car-filter db-filter" role="group" aria-label="Filter by era">' +
        CAR_ERAS.map(function (d, i) {
          return '<button type="button" class="cf-chip' + (i === 0 ? ' active' : '') + '" data-db-era="' + d.k + '">' + esc(d.l) + '</button>';
        }).join("") + '</div>';
      return '<section class="section">' +
        sectionHead("Raw data", "Database", db.intro) +
        '<div class="db-toolbar">' + chips + typeChips + eraChips +
          '<input type="search" class="db-search" id="db-search" placeholder="Search make, model, year, tag…" aria-label="Search cars">' +
        '</div>' +
        '<p class="db-count" id="db-count"></p>' +
        '<div class="db-scroll"><table class="db-table"><thead><tr>' +
          '<th data-sort="year" class="sortable">Year</th>' +
          '<th data-sort="make" class="sortable">Make</th>' +
          '<th data-sort="model" class="sortable">Model</th>' +
          '<th data-sort="disc" class="sortable">Discipline</th>' +
          '<th data-sort="tag" class="sortable">Source / Tag</th>' +
        '</tr></thead><tbody>' + body + '</tbody></table></div>' +
        '<p class="db-note">' + esc(db.note) + '</p>' +
      '</section>';
  }

  function renderPlatformsSection() {
      var p = D.platforms;
      var stores = p.stores.map(function (s) {
        var live = /avail/i.test(s.status);
        return '<div class="pf-card' + (live ? ' is-live' : '') + '">' +
          '<div class="pf-top"><span class="pf-name">' + esc(s.name) + '</span>' +
          '<span class="pf-kind">' + esc(s.kind) + '</span></div>' +
          '<div class="pf-status ' + (live ? 'live' : 'soon') + '">' + esc(s.status) + '</div>' +
          '<div class="pf-date">' + esc(s.date) + '</div>' +
          '<div class="pf-note">' + esc(s.note) + '</div></div>';
      }).join("");
      var tiers = p.requirements.tiers.map(function (t) {
        return '<div class="spec-card">' +
          '<div class="spec-head"><span class="spec-tier">' + esc(t.tier) + '</span>' +
          '<span class="spec-goal">' + esc(t.goal) + '</span></div>' +
          '<ul class="spec-list">' +
            '<li><span>OS</span><b>' + esc(t.os) + '</b></li>' +
            '<li><span>CPU</span><b>' + esc(t.cpu) + '</b></li>' +
            '<li><span>RAM</span><b>' + esc(t.ram) + '</b></li>' +
            '<li><span>GPU</span><b>' + esc(t.gpu) + '</b></li>' +
            '<li><span>DirectX</span><b>' + esc(t.dx) + '</b></li>' +
            '<li><span>Storage</span><b>' + esc(t.storage) + '</b></li>' +
          '</ul></div>';
      }).join("");
      var feats = p.requirements.features.map(function (f) {
        return '<li class="chip">' + esc(f) + '</li>';
      }).join("");
      return '<section class="section">' +
        sectionHead("Get the game", "Platforms & Requirements", p.intro) +
        '<div class="pf-grid">' + stores + '</div>' +
        '<p class="pf-mobile">' + esc(p.mobileNote) + '</p>' +
        '<div class="section-head" style="margin-top:36px"><h2>PC System Requirements</h2>' +
          '<p class="sub">Download size: <b>' + esc(p.requirements.size) + '</b> · ' + esc(p.requirements.console) + '</p></div>' +
        '<div class="spec-grid">' + tiers + '</div>' +
        '<div class="pf-feats"><span class="pf-feats-lbl">PC features</span><ul class="chip-row">' + feats + '</ul></div>' +
        '</section>';
  }

  function renderMediaSection() {
      var m = D.media;
      var vids = m.videos.map(function (v) {
        return '<div class="vid-card" data-yt="' + esc(v.id) + '" role="button" tabindex="0" aria-label="Play ' + esc(v.title) + '">' +
          '<img class="vid-thumb" loading="lazy" src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="' + esc(v.title) + ' thumbnail">' +
          '<span class="vid-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
          '<div class="vid-meta"><h3>' + esc(v.title) + '</h3><p class="vid-date">' + esc(v.date) + '</p><p>' + esc(v.desc) + '</p></div>' +
        '</div>';
      }).join("");
      return sectionHead("Watch the trailers", "Media", m.intro) +
        '<section class="section media-videos"><h3 class="sub">Official trailers</h3><div class="media-grid">' + vids + '</div></section>';
  }

  var CG_CAT_IMG = {
    "Hidden Cars & Barn Finds": "https://i.ytimg.com/vi/dj2PkwfrRP0/maxresdefault.jpg",
    "Car Recommendations": "https://i.ytimg.com/vi/oYhaW-Vr4wg/maxresdefault.jpg",
    "Purchasing": "https://i.ytimg.com/vi/oYhaW-Vr4wg/maxresdefault.jpg",
    "Liveries & Tuning": "https://i.ytimg.com/vi/HyjVC7fKLVg/maxresdefault.jpg",
    "Walkthrough": "https://i.ytimg.com/vi/dj2PkwfrRP0/maxresdefault.jpg",
    "Features & Systems": "https://i.ytimg.com/vi/oYhaW-Vr4wg/maxresdefault.jpg",
    "Season & Festival Playlist": "https://i.ytimg.com/vi/oYhaW-Vr4wg/maxresdefault.jpg",
    "Collectibles & Photos": "https://i.ytimg.com/vi/H1qlPZMfmiU/maxresdefault.jpg",
    "Performance & Settings": "https://i.ytimg.com/vi/HyjVC7fKLVg/maxresdefault.jpg"
  };
  function renderCommunityGuidesSection() {
      var guides = GS.guides || [];
      if (!guides.length) return '';
      var cats = {};
      guides.forEach(function (g) {
        var c = g.cat || "General";
        (cats[c] = cats[c] || []).push(g);
      });
      var catOrder = Object.keys(cats);
      var blocks = catOrder.map(function (c) {
        var cards = cats[c].map(function (g) {
          var pts = (g.points && g.points.length)
            ? '<ul class="cg-points">' + g.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul>'
            : '';
          return '<article class="cg-card">' +
            '<div class="cg-head"><h4>' + esc(g.titleEn) + '</h4>' +
            '<span class="cg-badge">via Gamersky</span></div>' +
            '<p class="cg-sum">' + esc(g.summaryEn) + '</p>' + pts +
          '</article>';
        }).join("");
        var ci = CG_CAT_IMG[c];
        var catBanner = ci ? '<figure class="cg-cat-img"><img src="' + esc(ci) + '" alt="' + esc(c) + ' — official Forza Horizon 6 gameplay still" loading="lazy"><figcaption>Official gameplay still</figcaption></figure>' : '';
        return '<div class="cg-cat">' + catBanner + '<h3 class="cg-cat-h">' + esc(c) + '</h3><div class="cg-grid">' + cards + '</div></div>';
      }).join("");
      return '<section class="section community-guides">' +
        sectionHead("From the community", "More Guides", "Curated, machine-translated English summaries of Gamersky's Chinese strategy guides, grouped by topic. Nothing here is invented - the source is the authority.") +
        '<div class="cg-wrap">' + blocks + '</div>' +
      '</section>';
  }

  var TITLES = {
    home: "Forza Horizon 6 Guide",
    guides: "Guides",
    cars: "Cars", map: "Interactive Map",
    beginner: "Beginner's Guide", houses: "Houses"
  };
  // Deep-link aliases (old URLs) -> scroll target inside the Cars hub.
  var CAR_SCROLL = {
    best: "cars-best", barn: "cars-barn", treasure: "cars-treasure",
    aftermarket: "cars-aftermarket", "forza-edition": "cars-forza"
  };

  /* ---------- router ---------- */
  var app = document.getElementById("app");

  function currentPage() {
    var h = (location.hash || "").replace(/^#/, "");
    if (CAR_SCROLL[h]) return "cars"; // old car deep-links -> Cars hub (scrolled)
    return pages[h] ? h : "home";
  }

  function render() {
    var raw = (location.hash || "").replace(/^#/, "");
    var page = currentPage();
    app.innerHTML = (pages[page] || pages.home)();
    if (pendingSearch) {
      var ps = document.getElementById("db-search");
      if (ps) ps.value = pendingSearch;
      pendingSearch = "";
    }
    setupReveal();
    if (page === "home" || page === "database") filterDb();
    buildToc(page);
    if (page === "map") refreshCollectionTracker();
    document.title = (TITLES[page] || "Guide") + " — Forza Horizon 6 Guide";
    // active nav
    var links = document.querySelectorAll("#nav a");
    var activeNav = (page === "cars") ? "cars" : page;
    for (var i = 0; i < links.length; i++) {
      links[i].classList.toggle("active", links[i].getAttribute("data-nav") === activeNav);
    }
    // scroll: deep-link into a Cars sub-section, else top
    if (CAR_SCROLL[raw]) {
      var target = document.getElementById(CAR_SCROLL[raw]);
      if (target) {
        requestAnimationFrame(function () {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }
    window.scrollTo(0, 0);
  }

  /* ---------- theme + menu ---------- */
  function initTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("fh6-theme", next); } catch (e) {}
    });
  }
  function initMenu() {
    var btn = document.getElementById("menu-toggle");
    var nav = document.getElementById("nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () { nav.classList.toggle("open"); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) nav.classList.remove("open");
    });
  }
  function initScrollSubnav() {
    // in-page jump buttons inside any hub (Cars, Guides) — don't change the hash/route
    app.addEventListener("click", function (e) {
      var b = e.target.closest("[data-scroll]");
      if (!b) return;
      e.preventDefault();
      var el = document.getElementById(b.getAttribute("data-scroll"));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      var group = b.closest("[data-subnav]");
      if (group) {
        var all = group.querySelectorAll("[data-scroll]");
        for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
      }
      b.classList.add("active");
    });
  }
  function initRegions() {
    // event delegation for region expand/collapse (home/map pages)
    function toggle(card) {
      var open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", open ? "true" : "false");
    }
    app.addEventListener("click", function (e) {
      var card = e.target.closest(".region-card");
      if (card) toggle(card);
    });
    app.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".region-card");
      if (card) { e.preventDefault(); toggle(card); }
    });
  }

  function initMapPins() {
    app.addEventListener("click", function (e) {
      var pin = e.target.closest(".map-pin");
      if (!pin) return;
      e.preventDefault();
      var idx = pin.getAttribute("data-region");
      var card = app.querySelector('.region-card[data-region="' + idx + '"]');
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("open", "flash");
      card.setAttribute("aria-expanded", "true");
      setTimeout(function () { card.classList.remove("flash"); }, 1300);
    });
  }
  function activeChipVal(attr) {
    var a = app.querySelector('[data-' + attr + '].active');
    return a ? a.getAttribute('data-' + attr) : 'all';
  }
  function applyCarFilters() {
    var d = activeChipVal('disc'), t = activeChipVal('type'), e = activeChipVal('era');
    var cards = app.querySelectorAll('.car-card[data-disc]');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var ok = (d === 'all' || d === c.getAttribute('data-disc'))
            && (t === 'all' || t === c.getAttribute('data-type'))
            && (e === 'all' || e === c.getAttribute('data-era'));
      c.classList.toggle('is-hidden', !ok);
    }
    var groups = app.querySelectorAll('.car-group');
    for (var g = 0; g < groups.length; g++) {
      var vis = groups[g].querySelectorAll('.car-card:not(.is-hidden)');
      groups[g].classList.toggle('is-hidden', vis.length === 0);
    }
  }
  function initCarFilter() {
    app.addEventListener('click', function (e) {
      var chip = e.target.closest('.cf-chip');
      if (!chip) return;
      if (chip.hasAttribute('data-db-disc') || chip.hasAttribute('data-db-type') || chip.hasAttribute('data-db-era')) return;
      e.preventDefault();
      var attr = chip.hasAttribute('data-disc') ? 'disc' : chip.hasAttribute('data-type') ? 'type' : chip.hasAttribute('data-era') ? 'era' : null;
      if (!attr) return;
      var sibs = chip.parentElement.querySelectorAll('.cf-chip');
      for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle('active', sibs[i] === chip);
      applyCarFilters();
    });
    app.addEventListener('click', function (e) {
      var vt = e.target.closest('.vt-btn');
      if (!vt) return;
      var view = vt.getAttribute('data-view');
      var grids = app.querySelectorAll('.car-grid');
      for (var i = 0; i < grids.length; i++) grids[i].classList.toggle('list-view', view === 'list');
      var vts = app.querySelectorAll('.vt-btn');
      for (var j = 0; j < vts.length; j++) { vts[j].classList.toggle('active', vts[j] === vt); vts[j].setAttribute('aria-pressed', vts[j] === vt ? 'true' : 'false'); }
    });
  }

  /* ---------- scroll reveal (progressive enhancement) ---------- */
  var revealIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 })
    : null;
  function setupReveal() {
    if (!revealIO || !document.documentElement.classList.contains('js-reveal')) return;
    var sel = '.card, .car-card, .region-card, .house-card, .fact, .rec, .way, .pick, .faq-item, .gl, .me-block, .pitfall, .step, .tl, .co-head, .wiki-entry, .db-row, .guide-sec, .pf-card, .spec-card, .vid-card, .cg-card';
    var nodes = app.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.hasAttribute('data-reveal')) continue;
      el.setAttribute('data-reveal', '');
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.transitionDelay = (Math.min(sibs, 10) * 45) + 'ms';
      revealIO.observe(el);
    }
  }

  /* ---------- boot ---------- */
  /* ---------- Google Translate (custom premium trigger over GT engine) ---------- */
  // Define the global callback up-front so it exists before Google's async script calls it.
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: "ja,ko,de,fr,es,pt,ru",
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, "google_translate_element");
  };

  function initTranslate() {
    var LANG_CODE = { "en": "EN", "ja": "日", "ko": "한", "de": "DE", "fr": "FR", "es": "ES", "pt": "PT", "ru": "RU" };
    var btn = document.getElementById("translate-btn");
    var menu = document.getElementById("translate-menu");
    var code = document.getElementById("translate-code");
    if (!btn || !menu) return;

    function combo() { return document.querySelector(".goog-te-combo"); }

    function applyInline(lang) {
      var sel = combo();
      if (!sel) return false;
      sel.value = lang;
      sel.dispatchEvent(new Event("change"));
      return true;
    }

    function openExternal(lang) {
      var u = encodeURIComponent(location.href);
      window.open("https://translate.google.com/translate?sl=auto&tl=" + lang + "&u=" + u, "_blank", "noopener");
    }

    function setActive(lang) {
      menu.querySelectorAll(".tm-item").forEach(function (it) {
        it.classList.toggle("active", it.getAttribute("data-lang") === lang);
      });
    }

    function openMenu() {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      requestAnimationFrame(function () { menu.classList.add("open"); });
    }
    function closeMenu() {
      menu.hidden = true;
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menu.hidden) openMenu(); else closeMenu();
    });
    menu.addEventListener("click", function (e) { e.stopPropagation(); });

    menu.querySelectorAll(".tm-item").forEach(function (it) {
      it.addEventListener("click", function () {
        var lang = it.getAttribute("data-lang");
        var ok = applyInline(lang);
        if (ok) {
          code.textContent = LANG_CODE[lang] || "EN";
          try { localStorage.setItem("fh6-lang", lang); } catch (e) {}
          setActive(lang);
        } else {
          // inline widget unavailable (e.g. blocked region) -> open web translator
          openExternal(lang);
        }
        closeMenu();
      });
    });

    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

    // restore saved language once the widget is ready
    var saved = null;
    try { saved = localStorage.getItem("fh6-lang"); } catch (e) {}
    if (saved && saved !== "en") {
      var tries = 0;
      var iv = setInterval(function () {
        tries++;
        if (applyInline(saved)) {
          code.textContent = LANG_CODE[saved] || "EN";
          setActive(saved);
          clearInterval(iv);
        } else if (tries > 40) {
          clearInterval(iv);
        }
      }, 150);
    }
  }

  function initMediaPlayer() {
    // Event delegation on #app so it survives re-renders.
    app.addEventListener("click", function (e) {
      var c = e.target.closest(".vid-card");
      if (!c || c.dataset.played) return;
      var id = c.getAttribute("data-yt");
      if (!id) return;
      c.dataset.played = "1";
      c.classList.add("is-playing");
      c.innerHTML = '<iframe class="vid-frame" src="https://www.youtube-nocookie.com/embed/' + esc(id) + '?autoplay=1&rel=0&modestbranding=1" title="Forza Horizon 6 video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    });
    app.addEventListener("keydown", function (e) {
      var t = e.target;
      if ((e.key === "Enter" || e.key === " ") && t.classList && t.classList.contains("vid-card")) {
        e.preventDefault();
        t.click();
      }
    });
  }

  /* ---------- database: search / filter / sort (progressive enhancement) ---------- */
  function filterDb() {
    var box = document.getElementById("db-search");
    if (!box) return;
    var q = (box.value || "").toLowerCase().trim();
    var discChip = app.querySelector("[data-db-disc].active");
    var typeChip = app.querySelector("[data-db-type].active");
    var eraChip = app.querySelector("[data-db-era].active");
    var disc = discChip ? discChip.getAttribute("data-db-disc") : "all";
    var type = typeChip ? typeChip.getAttribute("data-db-type") : "all";
    var era = eraChip ? eraChip.getAttribute("data-db-era") : "all";
    var rows = app.querySelectorAll(".db-row");
    var shown = 0;
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var matchQ = !q || (r.getAttribute("data-search") || "").indexOf(q) !== -1;
      var matchD = disc === "all" || r.getAttribute("data-disc") === disc;
      var matchT = type === "all" || r.getAttribute("data-type") === type;
      var matchE = era === "all" || r.getAttribute("data-era") === era;
      var ok = matchQ && matchD && matchT && matchE;
      r.classList.toggle("is-hidden", !ok);
      if (ok) shown++;
    }
    var countEl = document.getElementById("db-count");
    if (countEl) countEl.textContent = shown + " of " + rows.length + " cars";
  }
  function sortDb(col, th) {
    var table = th.closest(".db-table");
    if (!table) return;
    var tbody = table.querySelector("tbody");
    if (!tbody) return;
    var rows = Array.prototype.slice.call(tbody.querySelectorAll(".db-row"));
    var dir = th.getAttribute("data-dir") === "asc" ? "desc" : "asc";
    var allTh = table.querySelectorAll("th.sortable");
    for (var i = 0; i < allTh.length; i++) { allTh[i].removeAttribute("data-dir"); allTh[i].classList.remove("sort-asc", "sort-desc"); }
    th.setAttribute("data-dir", dir);
    th.classList.add(dir === "asc" ? "sort-asc" : "sort-desc");
    var numCol = (col === "year");
    rows.sort(function (a, b) {
      var av = a.querySelector(".db-" + col).textContent.toLowerCase();
      var bv = b.querySelector(".db-" + col).textContent.toLowerCase();
      if (numCol) { var an = parseInt(av, 10) || 0, bn = parseInt(bv, 10) || 0; return dir === "asc" ? an - bn : bn - an; }
      return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  }
  function initDatabase() {
    app.addEventListener("input", function (e) {
      if (e.target.id !== "db-search") return;
      filterDb();
    });
    app.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-db-disc],[data-db-type],[data-db-era]");
      if (chip) {
        e.preventDefault();
        var sel = chip.hasAttribute("data-db-disc") ? "[data-db-disc]"
                : chip.hasAttribute("data-db-type") ? "[data-db-type]" : "[data-db-era]";
        var chips = app.querySelectorAll(sel);
        for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("active", chips[i] === chip);
        filterDb();
        return;
      }
      var th = e.target.closest(".db-table th.sortable");
      if (th) { e.preventDefault(); sortDb(th.getAttribute("data-sort"), th); }
    });
  }

  /* =====================================================================
     NEW INTERACTIVE FEATURES (P0–P2 revamp)
     ===================================================================== */

  // ---- Beginner roadmap: interactive accordion + must-read tags ----
  var BSTEP_ICONS = {
    1:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4h11l-2 4 2 4H5"/></svg>',
    2:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l2-5.5A2 2 0 0 1 7 6h10a2 2 0 0 1 2 1.5L21 13"/><rect x="3" y="13" width="18" height="5" rx="1.6"/><circle cx="7.6" cy="18" r="1.4"/><circle cx="16.4" cy="18" r="1.4"/></svg>',
    3:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 9.5h3.2a1.8 1.8 0 0 1 0 3.6H9.5h3.4a1.8 1.8 0 0 1 0 3.6H9.5"/></svg>',
    4:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    5:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.2 4.6L19 8.3l-3.5 3.4.9 5L12 14.8 7.6 16.7l.9-5L5 8.3l4.8-.7z"/></svg>',
    6:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l8-8 9 9-3 3-6-6-2 2 6 6-3 3z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>',
    7:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3" y="13" width="18" height="6" rx="3"/><path d="M19 19v2M5 19v2"/></svg>',
    8:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    9:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 5.4 5.5.6-4.1 3.8 1.1 5.4L12 15.9 6.5 18.2 7.6 12.8 3.5 9l5.5-.6z"/></svg>',
    10: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13a9 9 0 1 1 9 9"/><path d="M12 13V4M20 13h-8"/></svg>',
    11: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h3l2-3h8l2 3h3v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    12: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11M4 15h11"/><path d="M14 5l4 4-4 4M10 19l-4-4 4-4"/></svg>',
    13: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>',
    14: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="9" width="16" height="11" rx="2"/><path d="M4 9a8 5 0 0 1 16 0"/><path d="M12 5v4"/></svg>'
  };
  function renderBeginnerSteps() {
    var items = D.beginner.steps.map(function (s) {
      var must = s.must ? '<span class="must-tag">Must-read</span>' : '';
      var ico = BSTEP_ICONS[s.n] || '';
      return '<div class="bstep" data-bstep>' +
        '<button type="button" class="bstep-head" aria-expanded="false">' +
          '<span class="bstep-num">' + esc(s.n) + '</span>' +
          '<span class="bstep-ico" aria-hidden="true">' + ico + '</span>' +
          '<span class="bstep-title">' + esc(s.title) + must + '</span>' +
          '<span class="bstep-chev" aria-hidden="true">▾</span>' +
        '</button>' +
        '<div class="bstep-body"><p>' + esc(s.body) + '</p></div>' +
      '</div>';
    }).join("");
    return '<div class="bstep-track" id="bstep-track">' + items +
      '<p class="bstep-foot">Tap any step to expand the full walkthrough. Steps tagged <span class="must-tag">Must-read</span> are the ones new players most often skip — don’t.</p></div>';
  }

  // ---- Wiki diagrams (skill chains + tuning ladder) ----
  function diagramSkillChain() {
    var mult = [2, 4, 6, 8], x0 = 90, step = 160;
    var nodes = mult.map(function (m, i) {
      var x = x0 + i * step;
      return '<g>' +
        '<circle cx="' + x + '" cy="95" r="22" fill="rgba(34,211,238,.14)" stroke="url(#scg)" stroke-width="2.5"/>' +
        '<text x="' + x + '" y="100" text-anchor="middle" fill="currentColor" font-family="Chakra Petch, sans-serif" font-size="16" font-weight="700">×' + m + '</text>' +
        (i < mult.length - 1 ? '<path d="M' + (x + 26) + ' 95 H' + (x + step - 26) + '" stroke="url(#scg)" stroke-width="2.5" marker-end="url(#arrow)"/>' : '') +
        '</g>';
    }).join("");
    return '<svg class="wiki-diagram" viewBox="0 0 680 170" role="img" aria-label="Skill chain multiplier ladder from x2 to x8">' +
      '<defs><linearGradient id="scg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#f472b6"/></linearGradient>' +
      '<marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#f472b6"/></marker></defs>' +
      '<text x="12" y="28" fill="currentColor" font-family="Chakra Petch, sans-serif" font-size="15" font-weight="700">Skill chains build a multiplier</text>' +
      '<text x="12" y="48" fill="currentColor" font-family="Inter, sans-serif" font-size="11" opacity=".7">Link drifts, jumps, near-misses &amp; clean racing — bigger chain, more Skill Points</text>' +
      nodes + '</svg>';
  }
  function diagramTuning() {
    var cls = ["D", "C", "B", "A", "S1", "S2", "X"], x0 = 40, step = 86;
    var boxes = cls.map(function (c, i) {
      var x = x0 + i * step, y = 120 - i * 11;
      return '<g><rect x="' + x + '" y="' + y + '" width="64" height="30" rx="8" fill="rgba(167,139,250,.14)" stroke="#a78bfa" stroke-width="2"/>' +
        '<text x="' + (x + 32) + '" y="' + (y + 20) + '" text-anchor="middle" fill="currentColor" font-family="Chakra Petch, sans-serif" font-size="15" font-weight="700">' + c + '</text></g>';
    }).join("");
    return '<svg class="wiki-diagram" viewBox="0 0 680 200" role="img" aria-label="Car class ladder from D to X">' +
      '<text x="12" y="28" fill="currentColor" font-family="Chakra Petch, sans-serif" font-size="15" font-weight="700">Performance classes (PI bands)</text>' +
      '<text x="12" y="48" fill="currentColor" font-family="Inter, sans-serif" font-size="11" opacity=".7">Every car has a PI number; upgrades push it up the ladder</text>' +
      boxes +
      '<path d="M150 132 C 300 200, 380 60, 560 40" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#arrow2)"/>' +
      '<defs><marker id="arrow2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#22d3ee"/></marker></defs>' +
      '<text x="300" y="150" fill="#22d3ee" font-family="Inter, sans-serif" font-size="11" font-weight="700">Upgrades ↑</text>' +
      '</svg>';
  }

  // ---- Map collection tracker (localStorage) ----
  function loadCollection() { try { return JSON.parse(localStorage.getItem('fh6-collection')) || {}; } catch (e) { return {}; } }
  function saveCollection(o) { try { localStorage.setItem('fh6-collection', JSON.stringify(o)); } catch (e) {} }
  function renderCollectionTracker() {
    var cats = [
      { key: 'barn', label: 'Barn Finds', max: 14, note: 'Community-reported total' },
      { key: 'treasure', label: 'Treasure Cars', max: 9, note: 'Community-reported total' },
      { key: 'mascots', label: 'Mascots', max: 50, note: 'Exact count unknown — set your own pace' }
    ];
    var rows = cats.map(function (c) {
      return '<div class="trk-row" data-trk="' + c.key + '" data-max="' + c.max + '">' +
        '<div class="trk-head"><span class="trk-label">' + esc(c.label) + '</span>' +
          '<span class="trk-count"><span class="trk-cur">0</span>/' + c.max + '</span></div>' +
        '<div class="trk-bar"><span class="trk-fill"></span></div>' +
        '<div class="trk-ctrl"><button type="button" class="trk-dec" aria-label="Decrease">−</button>' +
          '<button type="button" class="trk-inc" aria-label="Increase">+</button>' +
          '<span class="trk-note">' + esc(c.note) + '</span></div></div>';
    }).join("");
    var stamps = ['Yellow', 'Green', 'Blue', 'Orange', 'Purple', 'Gold'].map(function (s, i) {
      return '<label class="stamp-chk"><input type="checkbox" data-stamp="' + i + '"><span>' + esc(s) + '</span></label>';
    }).join("");
    return '<div class="coll-tracker" id="coll-tracker" data-toc="Collection tracker">' +
      '<h3 class="coll-h">Collection Tracker</h3>' +
      '<p class="coll-sub">Tick off what you’ve found. Progress is saved in your browser.</p>' +
      rows +
      '<div class="trk-row trk-stamps"><div class="trk-head"><span class="trk-label">Discover Japan Stamps</span>' +
        '<span class="trk-count"><span class="trk-cur" data-stampcur>0</span>/6</span></div>' +
        '<div class="trk-bar"><span class="trk-fill" data-stampfill></span></div>' +
        '<div class="stamp-row">' + stamps + '</div></div>' +
      '<div class="coll-total"><div class="trk-bar big"><span class="trk-fill" id="coll-total-fill"></span></div>' +
        '<span id="coll-total-label">0 collected</span></div>' +
      '</div>';
  }
  function refreshCollectionTracker() {
    var el = document.getElementById('coll-tracker'); if (!el) return;
    var data = loadCollection();
    function setRow(key, max) {
      var row = el.querySelector('[data-trk="' + key + '"]'); if (!row) return;
      var cur = row.querySelector('.trk-cur'), fill = row.querySelector('.trk-fill');
      cur.textContent = data[key] || 0;
      fill.style.width = Math.min(100, Math.round(((data[key] || 0) / max) * 100)) + '%';
    }
    setRow('barn', 14); setRow('treasure', 9); setRow('mascots', 50);
    var stamps = data.stamps || [false, false, false, false, false, false], sc = 0;
    el.querySelectorAll('[data-stamp]').forEach(function (cb, i) { cb.checked = !!stamps[i]; if (stamps[i]) sc++; });
    var scur = el.querySelector('[data-stampcur]'); if (scur) scur.textContent = sc;
    var sfill = el.querySelector('[data-stampfill]'); if (sfill) sfill.style.width = Math.round((sc / 6) * 100) + '%';
    var total = (data.barn || 0) + (data.treasure || 0) + (data.mascots || 0) + sc, max = 14 + 9 + 50 + 6;
    var pct = Math.round((total / max) * 100);
    var tf = document.getElementById('coll-total-fill'); if (tf) tf.style.width = pct + '%';
    var tl = document.getElementById('coll-total-label'); if (tl) tl.textContent = total + ' collected (' + pct + '%)';
  }
  function initCollectionTracker() {
    app.addEventListener('click', function (e) {
      var inc = e.target.closest('.trk-inc'), dec = e.target.closest('.trk-dec');
      if (!inc && !dec) return;
      var row = (inc || dec).closest('[data-trk]'); if (!row) return;
      var key = row.getAttribute('data-trk'), max = parseInt(row.getAttribute('data-max'), 10);
      var data = loadCollection();
      data[key] = data[key] || 0;
      data[key] = Math.max(0, Math.min(max, data[key] + (inc ? 1 : -1)));
      saveCollection(data); refreshCollectionTracker();
    });
    app.addEventListener('change', function (e) {
      var cb = e.target.closest && e.target.closest('[data-stamp]');
      if (!cb) return;
      var data = loadCollection();
      data.stamps = data.stamps || [false, false, false, false, false, false];
      data.stamps[parseInt(cb.getAttribute('data-stamp'), 10)] = cb.checked;
      saveCollection(data); refreshCollectionTracker();
    });
  }

  // ---- "On this page" TOC (sticky, scroll-spy) ----
  var TOC_PAGES = { beginner: 1, map: 1, wiki: 1, cars: 1, houses: 1, guides: 1 };
  function buildToc(page) {
    var old = document.getElementById('page-toc'); if (old) old.remove();
    if (!TOC_PAGES[page]) return;
    var nodes = app.querySelectorAll('[data-toc]');
    if (nodes.length < 2) return;
    var items = '';
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n.id) n.id = 'toc-' + page + '-' + i;
      items += '<li><a href="#' + (location.hash.replace(/^#/, '') || 'home') + '" data-toc-link="' + n.id + '">' + esc(n.getAttribute('data-toc')) + '</a></li>';
    }
    var toc = document.createElement('nav');
    toc.id = 'page-toc'; toc.className = 'page-toc'; toc.setAttribute('aria-label', 'On this page');
    toc.innerHTML = '<div class="toc-h">On this page</div><ul>' + items + '</ul>';
    document.body.appendChild(toc);
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            toc.querySelectorAll('a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-toc-link') === en.target.id); });
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      nodes.forEach(function (h) { spy.observe(h); });
    }
    toc.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault();
      var t = document.getElementById(a.getAttribute('data-toc-link'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ---- Car compare tray + modal ----
  function initCompare() {
    if (!document.getElementById('cmp-tray')) {
      var tray = document.createElement('div');
      tray.id = 'cmp-tray'; tray.className = 'cmp-tray'; tray.hidden = true;
      tray.innerHTML = '<div class="cmp-tray-inner"><div class="cmp-slots" id="cmp-slots"></div>' +
        '<div class="cmp-actions"><button type="button" class="cmp-clear" id="cmp-clear">Clear</button>' +
        '<button type="button" class="cmp-go" id="cmp-go">Compare</button></div></div>';
      document.body.appendChild(tray);
    }
    if (!document.getElementById('cmp-modal')) {
      var m = document.createElement('div');
      m.id = 'cmp-modal'; m.className = 'cmp-modal'; m.hidden = true; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
      m.innerHTML = '<div class="cmp-modal-card"><div class="cmp-modal-head"><h3>Car comparison</h3>' +
        '<button type="button" class="cmp-close" id="cmp-close" aria-label="Close">✕</button></div>' +
        '<div class="cmp-modal-body" id="cmp-modal-body"></div>' +
        '<p class="cmp-modal-note">Official acceleration / top-speed / handling figures aren’t published for this slice of the roster, so this compares confirmed attributes only — no invented numbers.</p></div>';
      document.body.appendChild(m);
    }
    app.addEventListener('change', function (e) {
      var cb = e.target.closest && e.target.closest('.cmp-check');
      if (!cb) return;
      var cid = parseInt(cb.getAttribute('data-cid'), 10), idx = cmpSet.indexOf(cid);
      if (cb.checked) { if (idx < 0) cmpSet.push(cid); } else { if (idx >= 0) cmpSet.splice(idx, 1); }
      var lbl = cb.parentNode.querySelector('.cmp-lbl');
      if (lbl) { lbl.textContent = cb.checked ? '✓ Comparing' : '＋ Compare'; cb.parentNode.classList.toggle('active', cb.checked); }
      updateCmpTray();
    });
    document.getElementById('cmp-clear').addEventListener('click', function () { cmpSet = []; syncCmpChecks(); updateCmpTray(); });
    document.getElementById('cmp-go').addEventListener('click', openCompareModal);
    document.getElementById('cmp-close').addEventListener('click', function () { document.getElementById('cmp-modal').hidden = true; });
    document.getElementById('cmp-modal').addEventListener('click', function (e) { if (e.target === this) this.hidden = true; });
  }
  function syncCmpChecks() {
    var boxes = app.querySelectorAll('.cmp-check');
    for (var i = 0; i < boxes.length; i++) {
      var cid = parseInt(boxes[i].getAttribute('data-cid'), 10), on = cmpSet.indexOf(cid) >= 0;
      boxes[i].checked = on; boxes[i].parentNode.classList.toggle('active', on);
      var lbl = boxes[i].parentNode.querySelector('.cmp-lbl'); if (lbl) lbl.textContent = on ? '✓ Comparing' : '＋ Compare';
    }
  }
  function updateCmpTray() {
    var tray = document.getElementById('cmp-tray'), slots = document.getElementById('cmp-slots');
    if (!tray || !slots) return;
    if (!cmpSet.length) { tray.hidden = true; return; }
    tray.hidden = false;
    slots.innerHTML = cmpSet.map(function (cid) {
      var c = carIndex[cid]; if (!c) return '';
      return '<span class="cmp-slot" data-cid="' + cid + '">' + esc((c.year ? c.year + ' ' : '') + c.make + ' ' + c.model) +
        '<button type="button" class="cmp-x" data-xcid="' + cid + '" aria-label="Remove">✕</button></span>';
    }).join("");
    var go = document.getElementById('cmp-go');
    go.disabled = cmpSet.length < 2;
    go.textContent = cmpSet.length < 2 ? 'Pick 2–3 cars' : ('Compare (' + cmpSet.length + ')');
    slots.querySelectorAll('.cmp-x').forEach(function (b) {
      b.addEventListener('click', function () {
        var cid = parseInt(b.getAttribute('data-xcid'), 10), i = cmpSet.indexOf(cid);
        if (i >= 0) cmpSet.splice(i, 1);
        syncCmpChecks(); updateCmpTray();
      });
    });
  }
  function openCompareModal() {
    var modal = document.getElementById('cmp-modal'), body = document.getElementById('cmp-modal-body');
    if (!cmpSet.length) return;
    var cars = cmpSet.map(function (cid) { return carIndex[cid]; }).filter(Boolean);
    var attrs = [
      ['Year', function (c) { return c.year || '—'; }],
      ['Make', function (c) { return c.make; }],
      ['Model', function (c) { return c.model; }],
      ['Type', function (c) { return carTypeLabel(c.type); }],
      ['Era', function (c) { return c.era; }],
      ['Discipline', function (c) { return discLabel(c.disc); }],
      ['Tag', function (c) { return c.tag || '—'; }],
      ['Source group', function (c) { return c.group; }]
    ];
    var head = '<tr><th></th>' + cars.map(function (c) {
      return '<th class="cmp-col-h">' + esc((c.year ? c.year + ' ' : '') + c.make + ' ' + c.model) + '</th>';
    }).join("") + '</tr>';
    var rows = attrs.map(function (a) {
      var cells = cars.map(function (c) { return '<td>' + esc(a[1](c)) + '</td>'; }).join("");
      return '<tr><th>' + esc(a[0]) + '</th>' + cells + '</tr>';
    }).join("");
    var maxY = 2026;
    var yearBars = '<tr><th>Model-year (newer →)</th>' + cars.map(function (c) {
      var y = parseInt(c.year, 10); if (isNaN(y)) return '<td>—</td>';
      var pct = Math.max(6, Math.round((y / maxY) * 100));
      return '<td><span class="cmp-ybar" style="width:' + pct + '%"></span></td>';
    }).join("") + '</tr>';
    body.innerHTML = '<div class="cmp-table-wrap"><table class="cmp-table"><thead>' + head + '</thead><tbody>' + rows + yearBars + '</tbody></table></div>';
    modal.hidden = false;
  }

  // ---- Accordion init helpers ----
  function initBeginnerAccordion() {
    app.addEventListener('click', function (e) {
      var h = e.target.closest && e.target.closest('.bstep-head');
      if (!h) return;
      var step = h.closest('.bstep'), open = step.classList.toggle('open');
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    app.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var h = e.target.closest && e.target.closest('.bstep-head');
      if (h) { e.preventDefault(); h.click(); }
    });
  }
  function initWikiAccordion() {
    app.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.wiki-cat-btn');
      if (!b) return;
      var cat = b.closest('.wiki-cat'), open = cat.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function initMapLayers() {
    app.addEventListener('click', function (e) {
      var chip = e.target.closest && e.target.closest('.lb-chip');
      if (!chip) return;
      var layer = chip.getAttribute('data-layer');
      chip.classList.toggle('active');
      var on = chip.classList.contains('active');
      var blocks = app.querySelectorAll('[data-layer-block="' + layer + '"]');
      for (var i = 0; i < blocks.length; i++) blocks[i].classList.toggle('is-hidden', !on);
    });
  }

  // ---- Global search + Cars dropdown (header) ----
  function initGlobalSearch() {
    var inp = document.getElementById('global-search');
    if (!inp) return;
    inp.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      pendingSearch = inp.value.trim();
      if ((location.hash || '').replace(/^#/, '') !== 'database') location.hash = '#database';
      else { var s = document.getElementById('db-search'); if (s) { s.value = pendingSearch; filterDb(); } }
    });
  }
  function initNavDropdown() {
    var btn = document.getElementById('cars-dd-btn'), dd = document.getElementById('cars-dd');
    if (!btn || !dd) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target) && !btn.contains(e.target)) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
    dd.addEventListener('click', function (e) {
      var it = e.target.closest('[data-scroll]'); if (!it) return;
      dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      var id = it.getAttribute('data-scroll');
      if ((location.hash || '').replace(/^#/, '') !== 'cars') {
        location.hash = '#cars';
        setTimeout(function () { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 140);
      } else {
        var el2 = document.getElementById(id); if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ---- Footer community (Discord + tune share + local comments) ----
  function loadJSON(k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function renderCommunitySection() {
    var el = document.getElementById('community');
    if (!el) return;
    el.innerHTML = '<div class="comm-grid">' +
      '<div class="comm-card"><h3>Join the community</h3>' +
        '<p>Got a tune, a barn-find route, or a question? Hang out on our Discord (placeholder link) or drop a note below — comments are saved in your browser only.</p>' +
        '<a class="comm-discord" href="https://discord.gg/forzahorizon6" target="_blank" rel="noopener">Open Discord (placeholder)</a></div>' +
      '<div class="comm-card"><h3>Share a tuning setup</h3>' +
        '<p>Paste your tune / share code and a one-line note. It’s copied to your clipboard and saved locally for quick reuse.</p>' +
        '<textarea id="tune-input" class="comm-input" rows="2" placeholder="e.g. Drift tune — Nissan Silvia K’S — -1.2 camber, 55% rear diff…"></textarea>' +
        '<div class="comm-row"><button type="button" id="tune-save" class="cmp-go">Save</button><button type="button" id="tune-copy" class="cmp-clear">Copy</button></div>' +
        '<div class="comm-saved" id="tune-saved"></div></div>' +
      '<div class="comm-card comm-comments"><h3>Comments</h3>' +
        '<form id="comm-form" class="comm-form"><input id="comm-name" class="comm-input" type="text" maxlength="40" placeholder="Name (optional)">' +
        '<textarea id="comm-text" class="comm-input" rows="2" placeholder="Share a tip or ask a question…"></textarea>' +
        '<button type="submit" class="cmp-go">Post</button></form>' +
        '<div class="comm-list" id="comm-list"></div></div>' +
      '</div>';
    var tunes = loadJSON('fh6-tunes', []);
    function renderTunes() {
      var box = document.getElementById('tune-saved'); if (!box) return;
      box.innerHTML = tunes.length ? tunes.map(function (t, i) {
        return '<div class="tune-chip">' + esc(t) + '<button type="button" data-ti="' + i + '" class="tune-del" aria-label="Delete">✕</button></div>';
      }).join('') : '<span class="comm-muted">No saved tunes yet.</span>';
      box.querySelectorAll('.tune-del').forEach(function (b) {
        b.addEventListener('click', function () { tunes.splice(parseInt(b.getAttribute('data-ti'), 10), 1); saveJSON('fh6-tunes', tunes); renderTunes(); });
      });
    }
    document.getElementById('tune-save').addEventListener('click', function () {
      var v = document.getElementById('tune-input').value.trim(); if (!v) return;
      tunes.unshift(v); saveJSON('fh6-tunes', tunes); document.getElementById('tune-input').value = ''; renderTunes();
    });
    document.getElementById('tune-copy').addEventListener('click', function () {
      var v = document.getElementById('tune-input').value.trim(); if (v && navigator.clipboard) navigator.clipboard.writeText(v);
    });
    renderTunes();
    var comments = loadJSON('fh6-comments', []);
    function renderComments() {
      var box = document.getElementById('comm-list'); if (!box) return;
      box.innerHTML = comments.length ? comments.map(function (c) {
        return '<div class="comm-item"><b>' + esc(c.n || 'Anon') + '</b><span class="comm-time">' + esc(c.t) + '</span><p>' + esc(c.m) + '</p></div>';
      }).join('') : '<p class="comm-muted">Be the first to comment.</p>';
    }
    document.getElementById('comm-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('comm-name').value.trim();
      var msg = document.getElementById('comm-text').value.trim();
      if (!msg) return;
      comments.unshift({ n: name, m: msg, t: new Date().toISOString().slice(0, 10) });
      saveJSON('fh6-comments', comments); document.getElementById('comm-text').value = ''; renderComments();
    });
    renderComments();
  }

  function boot() {
    if (!D) { app.innerHTML = '<p style="color:#9aa6c2">Failed to load guide data.</p>'; return; }
    if ('IntersectionObserver' in window) document.documentElement.classList.add('js-reveal');
    initTheme();
    initMenu();
    initRegions();
    initScrollSubnav();
    initMapPins();
    initCarFilter();
    initDatabase();
    initTranslate();
    initMediaPlayer();
    initCompare();
    initBeginnerAccordion();
    initWikiAccordion();
    initMapLayers();
    initCollectionTracker();
    initGlobalSearch();
    initNavDropdown();
    renderCommunitySection();
    window.addEventListener("hashchange", render);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
