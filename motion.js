/* Loading + pokojné animácie */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.querySelector('.intro');

  /* ---------- Po načítaní vždy začať úplne hore ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  function toTop() { root.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); root.style.scrollBehavior = ''; }
  toTop();
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', function (e) { if (e.persisted) toTop(); });

  // index písmen pre postupný nástup
  document.querySelectorAll('.wm b').forEach(function (b, i) { b.style.setProperty('--i', i); });

  /* ---------- Loader: počíta podľa načítaných obrázkov ---------- */
  var loader = document.getElementById('loader');
  var numEl = document.getElementById('ldNum');
  var bar = document.getElementById('ldBar');
  var shown = 0, target = 0, finished = false, start = performance.now();
  var MIN = 1300, MAX = 4000;

  function progress() {
    var imgs = Array.prototype.slice.call(document.images);
    if (!imgs.length) return 1;
    var done = imgs.filter(function (im) { return im.complete; }).length;
    return done / imgs.length;
  }
  function finish() {
    if (finished) return;
    finished = true;
    root.classList.remove('is-loading');
    if (loader) loader.classList.add('done');
    setTimeout(function () { if (intro) intro.classList.add('ready'); }, reduce ? 0 : 350);
    setTimeout(function () { if (loader) loader.remove(); }, 1300);
  }
  function tick(now) {
    var t = now - start;
    var real = document.readyState === 'complete' ? 1 : progress() * 0.9;
    var timeCap = Math.min(1, t / MIN);          // nikdy nie rýchlejšie ako MIN
    target = Math.max(target, Math.min(real, timeCap));
    if (t > MAX) target = 1;
    shown += (target - shown) * 0.12;
    if (target === 1 && shown > 0.995) shown = 1;
    var pct = Math.round(shown * 100);
    if (numEl) numEl.textContent = pct;
    if (bar) bar.style.transform = 'scaleX(' + shown + ')';
    if (shown >= 1) { setTimeout(finish, 250); return; }
    requestAnimationFrame(tick);
  }
  if (reduce || !loader) finish(); else requestAnimationFrame(tick);
  setTimeout(finish, MAX + 1500); // poistka

  /* ---------- Objavovanie pri scrollovaní ---------- */
  var groups = [
    '.fold', '.foot'
  ];
  var items = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('rv');
      
      items.push(el);
    });
  });
  var tiles = document.getElementById('tiles');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Dlaždice: každá nastupuje zvlášť, aj po zmene filtra ---------- */
  var tio = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); tio.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
  function prepTiles() {
    if (!tiles) return;
    var cols = getComputedStyle(tiles).gridTemplateColumns.split(' ').length || 1;
    var vis = tiles.querySelectorAll('.tile:not([hidden])');
    vis.forEach(function (el, i) {
      el.style.setProperty('--d', ((i % cols) * 0.12) + 's');
      if (reduce || !tio) el.classList.add('in'); else tio.observe(el);
    });
  }
  prepTiles();
  if (tiles && 'MutationObserver' in window) new MutationObserver(prepTiles).observe(tiles, { childList: true });

  /* 3D náklon + svetlo + kurzor za myšou */
  if (tiles && !reduce && window.matchMedia('(hover: hover)').matches) {
    tiles.addEventListener('pointermove', function (e) {
      var box = e.target.closest('.tile .img');
      if (!box) return;
      var r = box.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      box.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      box.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      box.style.setProperty('--rx', ((x - 0.5) * 10).toFixed(2));
      box.style.setProperty('--ry', ((0.5 - y) * 8).toFixed(2));
    });
    tiles.addEventListener('pointerout', function (e) {
      var box = e.target.closest('.tile .img');
      if (box && !box.contains(e.relatedTarget)) { box.style.setProperty('--rx', 0); box.style.setProperty('--ry', 0); }
    });
  }

  if (reduce) return;

  /* ---------- Parallax nápisu, hviezdičky za myšou, header ---------- */
  var hero = document.querySelector('.hero');
  var top = document.querySelector('.top');
  var lastY = 0, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (hero && y < 1200) hero.style.setProperty('--p', (y * 0.25).toFixed(1));
    if (top) top.classList.toggle('hide', y > lastY && y > 300);
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  window.addEventListener('pointermove', function (e) {
    if (!hero) return;
    hero.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
    hero.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
  }, { passive: true });
})();
