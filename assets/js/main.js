/* Forza Horizon 6 Guide — front-end controller
 * Hash router + renderers. All content lives in window.FH6DATA (data.js).
 */
(function () {
  "use strict";
  var D = window.FH6DATA;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function carName(c) {
    return (c.year ? c.year + " " : "") + c.make + " " + c.model;
  }
  function mono(make) {
    return (make || "?").replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?";
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

  /* ---------- car sub-renderers (composed into the single Cars hub) ---------- */
  function renderCarsList() {
    var groups = D.cars.groups.map(function (g) {
      var cards = g.items.map(function (c) {
        return '<div class="car-card">' +
          '<div class="monogram">' + esc(mono(c.make)) + '</div>' +
          '<div class="car-meta">' +
            '<div class="yr">' + esc(c.year || "—") + '</div>' +
            '<div class="nm">' + esc(c.model) + '</div>' +
            '<div class="mk">' + esc(c.make) + '</div>' +
            (c.tag ? '<span class="tag">' + esc(c.tag) + '</span>' : '') +
            (c.note ? '<div class="car-note">' + esc(c.note) + '</div>' : '') +
          '</div></div>';
      }).join("");
      return '<div class="car-group"><h3>' + esc(g.title) +
        (g.badge ? ' <span class="badge">' + esc(g.badge) + '</span>' : '') + '</h3>' +
        (g.note ? '<p class="note">' + esc(g.note) + '</p>' : '') +
        '<div class="car-grid">' + cards + '</div></div>';
    }).join("");
    return sectionHead("Garage", "Cars List", D.cars.intro) + groups;
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

      return '' +
        '<section class="hero hero--art">' +
          '<p class="eyebrow">' + esc(h.eyebrow) + '</p>' +
          '<h1>' + esc(h.title) + '</h1>' +
          '<p>' + esc(h.subtitle) + '</p>' +
          '<span class="cover-pill">Cover car · <b>' + esc(h.cover) + '</b></span>' +
        '</section>' +
        credits +
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
        development;
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
      var subnav = '<nav class="cars-subnav" aria-label="Cars sections">' +
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
      var cards = D.regions.items.map(function (r) {
        var feats = r.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("");
        return '<div class="region-card" role="button" tabindex="0" aria-expanded="false">' +
          '<h3>' + esc(r.name) + (r.known ? ' <span class="rtag ok">Confirmed</span>' : ' <span class="rtag">Reported</span>') + '</h3>' +
          '<p class="blurb">' + esc(r.blurb) + '</p>' +
          '<ul class="feats">' + feats + '</ul></div>';
      }).join("");
      var legend = D.regions.legend.map(function (l) {
        return '<div>' + esc(l.icon) + ' ' + esc(l.label) + '</div>';
      }).join("");
      var stunts = D.regions.prStunts.map(function (s) {
        return '<li><b>' + esc(s.t) + '</b> — ' + esc(s.d) + '</li>';
      }).join("");
      var tips = D.regions.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
      var extra = '<div class="map-extra">' +
        '<div class="me-block"><h3>PR stunts &amp; activities</h3><ul class="me-list">' + stunts + '</ul></div>' +
        '<div class="me-block"><h3>Exploring tips</h3><ul class="me-list">' + tips + '</ul></div>' +
        '</div>';
      return sectionHead("Horizon Japan", "Interactive Map", D.regions.intro) +
        '<div class="map-wrap"><img src="assets/img/map-japan.svg" alt="Horizon Japan festival map" loading="lazy"></div>' +
        '<div class="region-grid">' + cards + '</div>' +
        '<div class="legend">' + legend + '</div>' + extra;
    },

    beginner: function () {
      var settings = D.beginner.settings.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("");
      var gl = D.beginner.glossary.map(function (g) {
        return '<div class="gl"><dt>' + esc(g.t) + '</dt><dd>' + esc(g.d) + '</dd></div>';
      }).join("");
      var cred = D.beginner.credits.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join("");
      return sectionHead("No spoilers", "Beginner's Guide", D.beginner.intro) +
        ol(D.beginner.steps) +
        '<div class="settings-box"><h4>Settings worth changing first</h4><ul>' + settings + '</ul></div>' +
        '<div class="glossary"><h3>Horizon glossary</h3><dl>' + gl + '</dl></div>' +
        '<div class="credits-box"><h3>Credit farming 101</h3><ul>' + cred + '</ul></div>';
    },

    /* (barn merged into Cars hub) */

    /* (treasure merged into Cars hub) */

    /* (aftermarket merged into Cars hub) */

    /* (forza-edition merged into Cars hub) */

    houses: function () {
      var cards = D.houses.items.map(function (h) {
        return '<div class="house-card">' +
          (h.img ? '<img class="house-img" src="' + esc(h.img) + '" alt="' + esc(h.name) + '" loading="lazy">' : '') +
          '<h3>' + esc(h.name) + '</h3>' +
          '<div class="price">' + esc(h.price) + '</div>' +
          '<div class="bonus">' + esc(h.bonus) + '</div>' +
          '<p>' + esc(h.note) + '</p></div>';
      }).join("");
      var tips = D.houses.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
      return sectionHead("Settle in", "Houses & Property", D.houses.intro) +
        '<div class="facts"><div class="fact"><div class="k">Confirmed property</div><div class="v">The Estate</div></div>' +
          '<div class="fact"><div class="k">Garages</div><div class="v">8 [WIKI]</div></div>' +
          '<div class="fact"><div class="k">Note</div><div class="v">"8" = garages, not houses</div></div></div>' +
        '<div class="house-grid" style="margin-top:18px">' + cards + '</div>' +
        '<div class="house-tips"><h3>Living in Japan</h3><ul>' + tips + '</ul></div>';
    }
  };

  var TITLES = {
    home: "Forza Horizon 6 Guide",
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
  function initCarsSubnav() {
    // in-page jump buttons inside the Cars hub (don't change the hash/route)
    app.addEventListener("click", function (e) {
      var b = e.target.closest("[data-scroll]");
      if (!b) return;
      e.preventDefault();
      var el = document.getElementById(b.getAttribute("data-scroll"));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      var all = app.querySelectorAll(".cars-subnav [data-scroll]");
      for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
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

  /* ---------- boot ---------- */
  function boot() {
    if (!D) { app.innerHTML = '<p style="color:#9aa6c2">Failed to load guide data.</p>'; return; }
    initTheme();
    initMenu();
    initRegions();
    initCarsSubnav();
    window.addEventListener("hashchange", render);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
