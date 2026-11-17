/* Kreslenie kurzorom na pozadí – čiara za myšou, ktorá úplne zmizne (LIFE ms) */
(function () {
  var c = document.getElementById('doodle');
  if (!c || !c.getContext) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  var LIFE = 1400;                       // ako dlho je čiara viditeľná (ms)
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var pts = [], running = false;
  function size() {
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  }
  size(); addEventListener('resize', size);
  function loop() {
    var now = performance.now();
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i];
      if (b.brk) continue;               // nová čiara po opustení okna
      var life = 1 - (now - b.t) / LIFE;
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.6 * life).toFixed(3) + ')';
      ctx.lineWidth = b.w * (0.4 + 0.6 * life);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    if (pts.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  var brk = true;
  addEventListener('mousemove', function (e) {
    var p = pts[pts.length - 1], x = e.clientX, y = e.clientY, sp = 0;
    if (p && !brk) sp = Math.min(Math.hypot(x - p.x, y - p.y), 60);
    pts.push({ x: x, y: y, t: performance.now(), w: 3.4 - sp / 25, brk: brk });
    brk = false;
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener('mouseleave', function () { brk = true; });
  addEventListener('scroll', function () { brk = true; }, { passive: true });
})();

/* poznámku "change the language here" skryť po prvom prepnutí jazyka */
(function () {
  var n = document.querySelector('.lang-note'); if (!n) return;
  try { if (localStorage.getItem('langNoteSeen')) n.classList.add('gone'); } catch (e) {}
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { n.classList.add('gone'); try { localStorage.setItem('langNoteSeen', '1'); } catch (e) {} });
  });
})();

/* light / dark mode */
(function () {
  var b = document.getElementById('themeBtn'); if (!b) return;
  b.addEventListener('click', function () {
    var d = document.documentElement.classList.toggle('dark');
  });
})();

/* tlačidlo späť hore */
(function () {
  var b = document.getElementById('toTop'); if (!b) return;
  function upd() { b.classList.toggle('show', scrollY > 700); }
  addEventListener('scroll', upd, { passive: true }); upd();
  b.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
})();

/* kontaktný formulár – otvorí e-mail s vyplnenou správou */
(function () {
  var f = document.getElementById('contactForm'); if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'email', 'msg'].forEach(function (n) {
      var el = f.elements[n], v = el.value.trim();
      var bad = !v || (n === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
      el.classList.toggle('err', bad); if (bad) ok = false;
    });
    if (!ok) return;
    var name = f.elements.name.value.trim(), mail = f.elements.email.value.trim(), msg = f.elements.msg.value.trim();
    location.href = 'mailto:nina.mondockova@gmail.com?subject=' + encodeURIComponent('Portfolio – message from ' + name) +
      '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
  });
  f.addEventListener('input', function (e) { e.target.classList.remove('err'); });
})();

/* easter egg – 5× rýchlo klikni na logo NMD */
(function () {
  var logo = document.querySelector('.top .logo'); if (!logo) return;
  var n = 0, tm;
  function pop(k) {
    logo.style.setProperty('--k', k);
    logo.classList.remove('pop'); void logo.offsetWidth; logo.classList.add('pop');
  }
  logo.addEventListener('click', function (e) {
    e.preventDefault(); n++; clearTimeout(tm); tm = setTimeout(function () { n = 0; }, 1200);
    pop(Math.min(n, 5));
    if (n < 5) { if (n === 1) setTimeout(function () { if (n === 1) scrollTo({ top: 0, behavior: 'smooth' }); }, 450); return; }
    n = 0;
    var items = ['✏️', '📎', '📌', '✂️', '🖍️', '📐', '✦'];
    for (var i = 0; i < 40; i++) {
      var o = document.createElement('span'), c = document.createElement('span');
      o.className = 'egg-item'; c.className = 'egg-in'; c.textContent = items[i % items.length];
      o.style.left = (Math.random() * 96 + 2) + 'vw';
      o.style.fontSize = (22 + Math.random() * 24) + 'px';
      o.style.animationDuration = (3 + Math.random() * 2.5) + 's';
      o.style.animationDelay = (Math.random() * 1.6) + 's';
      c.style.animationDuration = (1.4 + Math.random() * 1.4) + 's';
      c.style.setProperty('--sx', (20 + Math.random() * 40) + 'px');
      c.style.setProperty('--r', (Math.random() * 50 + 15) * (Math.random() < .5 ? -1 : 1) + 'deg');
      o.appendChild(c); document.body.appendChild(o);
      setTimeout(function (el) { el.remove(); }.bind(null, o), 8000);
    }
  });
})();

/* pri prejdení myšou na projekt sa prehrávajú strany s vizualizáciami */
(function () {
  var HOVER = {"cphmarathon": ["image/_hover/cphmarathon-01.jpg", "image/_hover/cphmarathon-02.jpg", "image/_hover/cphmarathon-03.jpg"], "fruitiq": ["image/_hover/fruitiq-01.jpg", "image/_hover/fruitiq-02.jpg", "image/_hover/fruitiq-03.jpg", "image/_hover/fruitiq-04.jpg", "image/_hover/fruitiq-05.jpg", "image/_hover/fruitiq-06.jpg"], "superzoo": ["image/_hover/superzoo-01.jpg", "image/_hover/superzoo-02.jpg", "image/_hover/superzoo-03.jpg", "image/_hover/superzoo-04.jpg", "image/_hover/superzoo-05.jpg", "image/_hover/superzoo-06.jpg", "image/_hover/superzoo-07.jpg", "image/_hover/superzoo-08.jpg"], "smiechko": ["image/_hover/smiechko-01.jpg", "image/_hover/smiechko-02.jpg", "image/_hover/smiechko-03.jpg", "image/_hover/smiechko-04.jpg", "image/_hover/smiechko-05.jpg", "image/_hover/smiechko-06.jpg", "image/_hover/smiechko-07.jpg", "image/_hover/smiechko-08.jpg", "image/_hover/smiechko-09.jpg", "image/_hover/smiechko-10.jpg", "image/_hover/smiechko-11.jpg"], "mohito": ["image/_hover/mohito-01.jpg", "image/_hover/mohito-02.jpg", "image/_hover/mohito-03.jpg", "image/_hover/mohito-04.jpg", "image/_hover/mohito-05.jpg"], "poked": ["image/_hover/poked-01.jpg", "image/_hover/poked-02.jpg", "image/_hover/poked-03.jpg", "image/_hover/poked-04.jpg"], "lauma": ["image/_hover/lauma-01.jpg", "image/_hover/lauma-02.jpg", "image/_hover/lauma-03.jpg", "image/_hover/lauma-04.jpg", "image/_hover/lauma-05.jpg"], "gaudifest": ["image/_hover/gaudifest-01.jpg", "image/_hover/gaudifest-02.jpg", "image/_hover/gaudifest-03.jpg", "image/_hover/gaudifest-04.jpg"], "barhop": ["image/_hover/barhop-01.jpg", "image/_hover/barhop-02.jpg"], "nutrivictus": ["image/_hover/nutrivictus-01.jpg", "image/_hover/nutrivictus-02.jpg", "image/_hover/nutrivictus-03.jpg", "image/_hover/nutrivictus-04.jpg", "image/_hover/nutrivictus-05.jpg", "image/_hover/nutrivictus-06.jpg", "image/_hover/nutrivictus-07.jpg", "image/_hover/nutrivictus-08.jpg"], "kalendar": ["image/_hover/kalendar-01.jpg", "image/_hover/kalendar-02.jpg", "image/_hover/kalendar-03.jpg", "image/_hover/kalendar-04.jpg", "image/_hover/kalendar-05.jpg", "image/_hover/kalendar-06.jpg", "image/_hover/kalendar-07.jpg", "image/_hover/kalendar-08.jpg"], "catchles": ["image/_hover/catchles-01.jpg", "image/_hover/catchles-02.jpg", "image/_hover/catchles-03.jpg", "image/_hover/catchles-04.jpg", "image/_hover/catchles-05.jpg", "image/_hover/catchles-06.jpg", "image/_hover/catchles-07.jpg", "image/_hover/catchles-08.jpg", "image/_hover/catchles-09.jpg", "image/_hover/catchles-10.jpg", "image/_hover/catchles-11.jpg", "image/_hover/catchles-12.jpg", "image/_hover/catchles-13.jpg"], "salvik": ["image/_hover/salvik-01.jpg", "image/_hover/salvik-02.jpg", "image/_hover/salvik-03.jpg", "image/_hover/salvik-04.jpg", "image/_hover/salvik-05.jpg", "image/_hover/salvik-06.jpg", "image/_hover/salvik-07.jpg", "image/_hover/salvik-08.jpg", "image/_hover/salvik-09.jpg", "image/_hover/salvik-10.jpg", "image/_hover/salvik-11.jpg"], "posters": ["image/_hover/posters-01.jpg", "image/_hover/posters-02.jpg", "image/_hover/posters-03.jpg", "image/_hover/posters-04.jpg", "image/_hover/posters-05.jpg", "image/_hover/posters-06.jpg", "image/_hover/posters-07.jpg", "image/_hover/posters-08.jpg"], "mrazima": ["image/_hover/mrazima-01.jpg", "image/_hover/mrazima-02.jpg", "image/_hover/mrazima-03.jpg", "image/_hover/mrazima-04.jpg", "image/_hover/mrazima-05.jpg", "image/_hover/mrazima-06.jpg"], "greek": ["image/_hover/greek-01.jpg", "image/_hover/greek-02.jpg", "image/_hover/greek-03.jpg", "image/_hover/greek-04.jpg", "image/_hover/greek-05.jpg", "image/_hover/greek-06.jpg"], "alphabet": ["image/_hover/alphabet-01.jpg", "image/_hover/alphabet-02.jpg", "image/_hover/alphabet-03.jpg"], "mystical": ["image/_hover/mystical-01.jpg", "image/_hover/mystical-02.jpg", "image/_hover/mystical-03.jpg", "image/_hover/mystical-04.jpg"]};
  if (!window.matchMedia('(hover: hover)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cur = null, timer = null, idx = 0, flip = 0;
  Object.keys(HOVER).forEach(function (k) { HOVER[k].forEach(function (s, i) { if (i < 2) { var im = new Image(); im.src = s; } }); });
  function layers(box) {
    var a = box.querySelectorAll('.hv');
    if (a.length) return a;
    for (var i = 0; i < 2; i++) { var im = document.createElement('img'); im.className = 'hv'; im.alt = ''; box.appendChild(im); }
    return box.querySelectorAll('.hv');
  }
  function show(tile, src) {
    var box = tile.querySelector('.img'); if (!box) return;
    var L = layers(box), pre = new Image();
    pre.onload = function () {
      if (cur !== tile) return;
      flip = 1 - flip; L[flip].src = src; L[flip].classList.add('on'); L[1 - flip].classList.remove('on');
    };
    pre.src = src;
  }
  function start(tile) {
    stop(); var list = HOVER[tile.dataset.id]; if (!list || !list.length) return;
    cur = tile; idx = 0; show(tile, list[0]);
    list.forEach(function (s) { var im = new Image(); im.src = s; });
    timer = setInterval(function () { idx = (idx + 1) % list.length; show(tile, list[idx]); }, 1100);
  }
  function stop() {
    clearInterval(timer); timer = null;
    if (cur) cur.querySelectorAll('.hv').forEach(function (x) { x.classList.remove('on'); });
    cur = null;
  }
  document.addEventListener('mouseover', function (e) {
    var t = e.target.closest && e.target.closest('.tile[data-id]');
    if (t && t !== cur) start(t);
  });
  document.addEventListener('mouseout', function (e) {
    if (!cur) return;
    var to = e.relatedTarget;
    if (!to || !cur.contains(to)) stop();
  });
})();
