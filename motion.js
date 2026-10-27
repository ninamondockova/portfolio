/* Loading + pokojné animácie */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.querySelector('.intro');

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
    '.marquee', '#work .sec-head', '.cols > h2', '.cols > div', '.cols > ul', '.foot'
  ];
  var items = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('rv');
      if (el.matches('.cols > div, .cols > ul')) el.style.setProperty('--d', '.12s');
      items.push(el);
    });
  });
  var tiles = document.getElementById('tiles');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
    if (tiles) io.observe(tiles);
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
    if (tiles) tiles.classList.add('in');
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
