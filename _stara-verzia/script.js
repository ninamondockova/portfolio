(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
var pad = function (n) { return String(n).padStart(2, '0'); };
var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var root = document.documentElement;
if (RM) root.classList.add('rm');
if (FINE && !RM) root.classList.add('has-cursor');

/* ------------------------------------------------------------------ i18n */
var LANG = 'en';
try { LANG = localStorage.getItem('lang') || 'en'; } catch (e) {}
function L(en, sk, dk) { return { en: en, sk: sk || en, dk: dk || en }; }
var I = {
  en: {
    lab1: 'PORTFOLIO', lab2: 'ABOUT ME', lab3: 'SELECTED PROJECTS', lab4: 'ALL WORK', lab5: 'SKILLS', lab6: 'EXPERIENCE', lab7: "LET'S WORK TOGETHER", lab8: 'THANK YOU',
    cv_tag: 'MULTIMEDIA DESIGN & GRAPHIC DESIGN', nav_work: 'PORTFOLIO', nav_about: 'ABOUT', nav_contact: 'CONTACT', w1: 'VISUALS', w2: 'IDEAS', w3: 'STORIES',
    ab_h1: 'HI,', ab_h2: "I'M NINA —",
    ab_p1: "I'm a multimedia design student with a background in graphic design. I love creating visual identities, print and digital materials and promotional content.",
    ab_p2: 'During my studies and internship I work with Adobe Illustrator, Photoshop and InDesign, while developing my skills in UI/UX, web design and digital media.',
    ab_cur: 'Currently studying', ab_cur2: 'Multimedia Design', ab_prev: 'Previous education', ab_prev2: 'Private Secondary School of Art & Animation, Bratislava',
    st1: 'YEARS OF STUDY', st2: 'INTERNSHIPS', st3: 'BRANDING PROJECTS', st4: 'PRINT PROJECTS', quote: 'Design is how I see the world.',
    gr_h: 'Portfolio', sk_lang: 'LANGUAGES', sk_dev: 'DEVELOPING', sk_web: 'Web design', sk_dig: 'Digital media', ex_h: 'Experience',
    ct_h1: 'GET IN', ct_h2: 'TOUCH', ct_time: 'LOCAL TIME', ct_copy: 'COPY EMAIL', ct_copied: 'COPIED ✓', ct_thanks: 'Thanks for watching :)',
    end_sub: 'PORTFOLIO', to_top: 'BACK TO TOP ↑',
    f_all: 'ALL', f_brand: 'BRANDING', f_print: 'PRINT', f_ui: 'UI/UX', f_intern: 'INTERNSHIP',
    hs_title: 'Selected projects', hs_hint: 'Scroll →', hs_all: 'All work', hs_view: 'VIEW', soon: 'SOON',
    lv_adv: 'Advanced', lv_mid: 'Intermediate', lv_basic: 'Basic',
    m_close: 'CLOSE', m_prev: 'PREV', m_next: 'NEXT', m_pdf: 'VIEW PDF', m_back: 'BACK TO IMAGES', m_open: 'OPEN PDF ↗', m_flyer: 'DL FLYER PDF ↗', m_doc: 'DOCUMENTATION PDF ↗',
    m_year: 'YEAR', m_scope: 'SCOPE', m_role: 'ROLE',
    t_banners: 'ONLINE BANNERS', t_ppc: 'PPC ADS', t_some: 'SOCIAL MEDIA', t_app: 'APP BANNERS', t_video: 'ANIMATION'
  },
  sk: {
    lab1: 'PORTFÓLIO', lab2: 'O MNE', lab3: 'VYBRANÉ PROJEKTY', lab4: 'VŠETKY PRÁCE', lab5: 'ZRUČNOSTI', lab6: 'SKÚSENOSTI', lab7: 'POĎME TVORIŤ SPOLU', lab8: 'ĎAKUJEM',
    cv_tag: 'MULTIMEDIÁLNY DIZAJN & GRAFICKÝ DIZAJN', nav_work: 'PORTFÓLIO', nav_about: 'O MNE', nav_contact: 'KONTAKT', w1: 'VIZUÁLY', w2: 'NÁPADY', w3: 'PRÍBEHY',
    ab_h1: 'AHOJ,', ab_h2: 'SOM NINA —',
    ab_p1: 'Som študentka multimediálneho dizajnu so základom v grafickom dizajne. Rada tvorím vizuálne identity, tlačové a digitálne materiály a reklamný obsah.',
    ab_p2: 'Počas štúdia a stáže pracujem s Adobe Illustrator, Photoshop a InDesign a rozvíjam sa v UI/UX, webdizajne a digitálnych médiách.',
    ab_cur: 'Momentálne študujem', ab_cur2: 'Multimedia Design', ab_prev: 'Predchádzajúce vzdelanie', ab_prev2: 'Súkromná SŠ umelecko-animovanej tvorby, Bratislava',
    st1: 'ROKY ŠTÚDIA', st2: 'STÁŽE', st3: 'BRANDINGOVÉ PROJEKTY', st4: 'TLAČOVÉ PROJEKTY', quote: 'Dizajn je to, ako vidím svet.',
    gr_h: 'Portfólio', sk_lang: 'JAZYKY', sk_dev: 'ROZVÍJAM', sk_web: 'Webdizajn', sk_dig: 'Digitálne médiá', ex_h: 'Skúsenosti',
    ct_h1: 'OZVI', ct_h2: 'SA MI', ct_time: 'MIESTNY ČAS', ct_copy: 'KOPÍROVAŤ E-MAIL', ct_copied: 'SKOPÍROVANÉ ✓', ct_thanks: 'Vďaka, že si sa pozrel/a :)',
    end_sub: 'PORTFÓLIO', to_top: 'SPÄŤ HORE ↑',
    f_all: 'VŠETKO', f_brand: 'BRANDING', f_print: 'TLAČ', f_ui: 'UI/UX', f_intern: 'STÁŽ',
    hs_title: 'Vybrané projekty', hs_hint: 'Scrolluj →', hs_all: 'Všetky práce', hs_view: 'ZOBRAZIŤ', soon: 'ČOSKORO',
    lv_adv: 'Pokročilé', lv_mid: 'Stredne pokročilé', lv_basic: 'Základy',
    m_close: 'ZAVRIEŤ', m_prev: 'SPÄŤ', m_next: 'ĎALEJ', m_pdf: 'ZOBRAZIŤ PDF', m_back: 'SPÄŤ NA OBRÁZKY', m_open: 'OTVORIŤ PDF ↗', m_flyer: 'DL LETÁK PDF ↗', m_doc: 'DOKUMENTÁCIA PDF ↗',
    m_year: 'ROK', m_scope: 'ROZSAH', m_role: 'MANDÁT',
    t_banners: 'ONLINE BANNERY', t_ppc: 'PPC REKLAMY', t_some: 'SOCIÁLNE SIETE', t_app: 'APP BANNERY', t_video: 'ANIMÁCIA'
  },
  dk: {
    lab1: 'PORTEFØLJE', lab2: 'OM MIG', lab3: 'UDVALGTE PROJEKTER', lab4: 'ALT ARBEJDE', lab5: 'FÆRDIGHEDER', lab6: 'ERFARING', lab7: 'LAD OS ARBEJDE SAMMEN', lab8: 'TAK',
    cv_tag: 'MULTIMEDIEDESIGN & GRAFISK DESIGN', nav_work: 'PORTEFØLJE', nav_about: 'OM MIG', nav_contact: 'KONTAKT', w1: 'VISUALS', w2: 'IDEER', w3: 'HISTORIER',
    ab_h1: 'HEJ,', ab_h2: 'JEG ER NINA —',
    ab_p1: 'Jeg er multimediedesignstuderende med baggrund i grafisk design. Jeg elsker at skabe visuelle identiteter, trykte og digitale materialer og reklameindhold.',
    ab_p2: 'Under mine studier og praktik arbejder jeg med Adobe Illustrator, Photoshop og InDesign og udvikler mine færdigheder inden for UI/UX, webdesign og digitale medier.',
    ab_cur: 'Studerer lige nu', ab_cur2: 'Multimediedesign', ab_prev: 'Tidligere uddannelse', ab_prev2: 'Privat gymnasium for kunst & animation, Bratislava',
    st1: 'ÅR MED STUDIER', st2: 'PRAKTIKKER', st3: 'BRANDINGPROJEKTER', st4: 'TRYKPROJEKTER', quote: 'Design er, hvordan jeg ser verden.',
    gr_h: 'Portefølje', sk_lang: 'SPROG', sk_dev: 'UDVIKLER', sk_web: 'Webdesign', sk_dig: 'Digitale medier', ex_h: 'Erfaring',
    ct_h1: 'KONTAKT', ct_h2: 'MIG', ct_time: 'LOKAL TID', ct_copy: 'KOPIÉR E-MAIL', ct_copied: 'KOPIERET ✓', ct_thanks: 'Tak fordi du kiggede :)',
    end_sub: 'PORTEFØLJE', to_top: 'TILBAGE TIL TOPPEN ↑',
    f_all: 'ALT', f_brand: 'BRANDING', f_print: 'TRYK', f_ui: 'UI/UX', f_intern: 'PRAKTIK',
    hs_title: 'Udvalgte projekter', hs_hint: 'Scroll →', hs_all: 'Alt arbejde', hs_view: 'SE', soon: 'SNART',
    lv_adv: 'Avanceret', lv_mid: 'Mellemniveau', lv_basic: 'Grundlæggende',
    m_close: 'LUK', m_prev: 'FORRIGE', m_next: 'NÆSTE', m_pdf: 'SE PDF', m_back: 'TILBAGE TIL BILLEDER', m_open: 'ÅBN PDF ↗', m_flyer: 'DL BROCHURE PDF ↗', m_doc: 'DOKUMENTATION PDF ↗',
    m_year: 'ÅR', m_scope: 'OMFANG', m_role: 'ROLLE',
    t_banners: 'ONLINE BANNERE', t_ppc: 'PPC ANNONCER', t_some: 'SOCIALE MEDIER', t_app: 'APP BANNERE', t_video: 'ANIMATION'
  }
};
function t(k) { return (I[LANG] && I[LANG][k]) || I.en[k] || k; }
function pick(o) { return o[LANG] || o.en; }

/* ------------------------------------------------------------------ data */
var P = [
  { id: 'fruitiq', cat: 'brand', catL: L('BRANDING, PACKAGING', 'BRANDING, OBALY', 'BRANDING, EMBALLAGE'), title: 'Fruitiq',
    desc: L('Delivery of exotic fruits from all over the world. An identity system built around vibrant organic forms and clean typography.', 'Doručovanie exotického ovocia z celého sveta. Identita postavená na živých organických tvaroch a čistej typografii.', 'Levering af eksotiske frugter fra hele verden. Et identitetssystem bygget på levende organiske former og ren typografi.'),
    meta: [['m_scope', 'Branding, Packaging']], thumb: 'image/fruitiq.jpg', imgs: ['image/KI_mondockova_interactive/0001.jpg', 'image/KI_mondockova_interactive/0014.jpg', 'image/KI_mondockova_interactive/0021.jpg'], pdf: 'image/KI_mondockova_interactive.pdf', tags: ['BRANDING', 'PACKAGING'] },
  { id: 'smiechko', cat: 'brand', catL: L('BRANDING & VISUAL IDENTITY', 'BRANDING & DIZAJN IDENTÍT', 'BRANDING & VISUEL IDENTITET'), title: 'Smiechko',
    desc: L('Complete visual identity and brand manual: logo, color palette, typography, applications on print and promo materials, and a 50-page guidelines manual.', 'Kompletná vizuálna identita a dizajn manuál: logotyp, farebná paleta, typografia, aplikácie na tlačoviny a reklamné predmety a 50-stranový manuál.', 'Komplet visuel identitet og brand manual: logo, farvepalette, typografi, applikationer på tryksager og en 50-siders brand manual.'),
    meta: [['m_year', '2025'], ['m_scope', 'Branding, Guidelines'], ['m_role', 'Lead Designer']], thumb: 'image/smiechko.jpg', imgs: ['image/smiechko.jpg'], pdf: 'image/smiechko.pdf', tags: ['BRANDING', 'GUIDELINES'] },
  { id: 'catchles', cat: 'brand', catL: L('VISUAL IDENTITY', 'VIZUÁLNA IDENTITA', 'VISUEL IDENTITET'), title: 'Catchles',
    desc: L('Complete visual identity for the Catchles project: logo, visual style, typography and application assets for a modern brand presentation.', 'Kompletná vizuálna identita pre projekt Catchles: logo, vizuálny štýl, typografia a aplikačné prvky.', 'Komplet visuel identitet for Catchles: logo, visuel stil, typografi og applikationselementer.'),
    meta: [['m_year', '2025'], ['m_scope', 'Visual Identity, Branding'], ['m_role', 'Graphic Designer']], thumb: 'image/catchles.jpg', imgs: ['image/catchles.jpg'], pdf: 'image/catchles.pdf', tags: ['VISUAL IDENTITY', 'BRANDING'] },
  { id: 'mrazima', cat: 'brand', catL: L('BRANDING & PACKAGING', 'BRANDING & OBALY', 'BRANDING & EMBALLAGE'), title: 'Mrazima',
    desc: L('Visual identity system and packaging design: logo, color system, typography, packaging assets and full brand guidelines.', 'Systém vizuálnej identity a obalový dizajn: logo, farebný systém, typografia, obaly a kompletný dizajn manuál.', 'Visuelt identitetssystem og emballagedesign: logo, farvesystem, typografi, emballage og brand guidelines.'),
    meta: [['m_year', '2024'], ['m_scope', 'Branding, Packaging'], ['m_role', 'Graphic Designer']], thumb: 'image/mrazima.jpg', imgs: ['image/mrazima.jpg', 'image/DM/0001.jpg'], pdf: 'image/mrazima.pdf', tags: ['BRANDING', 'PACKAGING'] },
  { id: 'salvik', cat: 'brand', catL: L('VISUAL IDENTITY', 'VIZUÁLNA IDENTITA', 'VISUEL IDENTITET'), title: 'Salvik',
    desc: L('Complete visual identity for the Salvik brand: logo, typography, color palette, corporate stationery and full brand guidelines.', 'Kompletná vizuálna identita pre značku Salvik: logo, typografia, farebná paleta, firemné tlačoviny a dizajn manuál.', 'Komplet visuel identitet for Salvik: logo, typografi, farvepalette, tryksager og brand guidelines.'),
    meta: [['m_year', '2023'], ['m_scope', 'Visual Identity, Branding'], ['m_role', 'Graphic Designer']], thumb: 'image/salvik.jpg', imgs: ['image/salvik.jpg'], pdf: 'image/salvik.pdf', tags: ['VISUAL IDENTITY', 'BRANDING'] },
  { id: 'ballk', cat: 'brand', catL: L('INFORMATION SYSTEM', 'INFORMAČNÝ SYSTÉM', 'INFORMATIONSSYSTEM'), title: 'Ballk',
    desc: L('Information system design and visual wayfinding: orientation elements, pictograms, typographic rules and documentation.', 'Dizajn informačného systému a vizuálnej navigácie: orientačný systém, piktogramy, typografické pravidlá a dokumentácia.', 'Informationssystemdesign og visuel wayfinding: orienteringselementer, piktogrammer, typografiske regler og dokumentation.'),
    meta: [['m_year', '2023'], ['m_scope', 'Info System, Wayfinding'], ['m_role', 'Graphic Designer']], thumb: 'image/ballk.jpg', imgs: ['image/ballk.jpg', 'image/IS/0001.jpg'], pdf: 'image/IS.pdf', tags: ['INFO SYSTEM', 'WAYFINDING'] },
  { id: 'nutrivictus', cat: 'print', catL: L('CATALOG / EDITORIAL', 'KATALÓG & EDITORIÁL', 'KATALOG / EDITORIELT'), title: 'Nutrivictus',
    desc: L('Complete product catalog: typography rules, clean multi-column layouts, category color coding and print-ready preparation. 10 pages.', 'Kompletný produktový katalóg: typografia, prehľadná mriežka, farebné kódovanie kategórií a príprava na tlač. 10 strán.', 'Komplet produktkatalog: typografi, rene layouts, farvekodning af kategorier og klargøring til tryk. 10 sider.'),
    meta: [['m_year', '2023'], ['m_scope', 'Catalog, Print Layout'], ['m_role', 'Editorial Designer']], thumb: 'image/katalog.jpg', imgs: ['image/katalog.jpg'], pdf: 'image/katalog_mondockova_interactive.pdf', tags: ['CATALOG', 'PRINT'] },
  { id: 'tokyoade', cat: 'print', catL: L('MUSIC FESTIVAL', 'HUDOBNÝ FESTIVAL', 'MUSIKFESTIVAL'), title: 'Tokyoade',
    desc: L('Visual identity and print materials for the Tokyoade music festival: posters, tickets, program guides and merchandise.', 'Vizuálna identita a tlačové materiály pre hudobný festival Tokyoade: plagáty, vstupenky, brožúry a merch.', 'Visuel identitet og tryksager til musikfestivalen Tokyoade: plakater, billetter, programmer og merchandise.'),
    meta: [['m_year', '2023'], ['m_scope', 'Posters, Event Print'], ['m_role', 'Graphic Designer']], thumb: 'image/tokyoade_plagat_v1.jpg', imgs: ['image/tokyoade_plagat_v1.jpg'], pdf: 'image/mockup.jpg', tags: ['POSTERS', 'EVENT PRINT'] },
  { id: 'greek', cat: 'print', catL: L('MAGAZINE / EDITORIAL', 'ČASOPIS & EDITORIÁL', 'MAGASIN / EDITORIELT'), title: 'Greek Magazine',
    desc: L('A cultural magazine about ancient Greece and its impact on modern visual culture: typography grid, photo curation and cover design.', 'Kultúrny magazín o antickom Grécku a jeho vplyve na modernú vizuálnu kultúru: typografická skladba, výber fotografií a obálka.', 'Et kulturmagasin om det antikke Grækenland og dets indflydelse på moderne visuel kultur: typografisk gitter, fotokuratering og omslag.'),
    meta: [['m_year', '2024'], ['m_scope', 'Magazine, Editorial'], ['m_role', 'Layout Designer, Illustrator']], thumb: 'image/Aftedita.jpg', imgs: ['image/Aftedita.jpg'], pdf: 'image/casopis.pdf', tags: ['MAGAZINE', 'EDITORIAL'] },
  { id: 'alphabet', cat: 'print', catL: L('TYPOGRAPHY & TYPE DESIGN', 'TYPOGRAFIA & PÍSMO', 'TYPOGRAFI & SKRIFTDESIGN'), title: 'Own Alphabet',
    desc: L('Custom typeface designed from first sketches to final vector metrics. A study on letterforms, proportions and print specimen poster design.', 'Autorská abeceda od skíc po finálnu vektorovú podobu. Štúdia tvaroslovia, proporcií písma a jeho aplikácia na tlačový vzorník.', 'Specialdesignet alfabet fra de første skitser til de endelige vektorer. Et studie i bogstavformer og proportioner.'),
    meta: [['m_year', '2022'], ['m_scope', 'Type Design, Print Specimen'], ['m_role', 'Type Designer']], thumb: 'image/alphabet.jpg', imgs: ['image/alphabet.jpg'], pdf: 'image/alphabet.pdf', tags: ['TYPE DESIGN', 'SPECIMEN'] },
  { id: 'posters', cat: 'print', catL: L('POSTERS & GRAPHICS', 'PLAGÁTY & GRAFIKA', 'PLAKATER & GRAFIK'), title: 'Posters Collection',
    desc: L('A collection of artistic and ecological posters: modern typographic structure, eco-social themes and strong visual messages.', 'Séria umeleckých a ekologických plagátov: moderné typografické rozvrhnutie, spoločensko-ekologické témy a výrazná vizuálna výpoveď.', 'En samling af kunstneriske og økologiske plakater: moderne typografisk struktur, øko-sociale temaer og stærke budskaber.'),
    meta: [['m_year', '2022 – 2023'], ['m_scope', 'Poster Design, Artwork'], ['m_role', 'Graphic Designer']], thumb: 'image/mondockova_eco.jpg', imgs: ['image/mondockova_eco.jpg'], pdf: 'image/mondockova_eco.pdf', tags: ['POSTERS', 'ARTWORK'] },
  { id: 'mystical', cat: 'ui', catL: L('MOBILE GAME, UI/UX DESIGN', 'MOBILNÁ HRA, UI/UX DESIGN', 'MOBILSPIL, UI/UX DESIGN'), title: 'Mystical Creatures',
    desc: L('An immersive mobile game experience built around mythical worldbuilding, intuitive user interfaces and engaging character interactions.', 'Pohlcujúci zážitok z mobilnej hry zameraný na mytologický svet, intuitívne rozhranie a pútavé interakcie s postavami.', 'En fordybende mobilspiloplevelse om mytisk verdenbygning, intuitive brugerflader og engagerende karakterinteraktioner.'),
    meta: [['m_year', '2025'], ['m_scope', 'Mobile Game, UI/UX'], ['m_role', 'UI/UX Designer']], thumb: 'image/final.jpg', imgs: ['image/final.jpg'], pdf: null, tags: ['MOBILE GAME', 'UI/UX'] },
  { id: 'superzoo', cat: 'intern', catL: L('INTERNSHIP WORK', 'STÁŽ & SKÚSENOSTI', 'PRAKTIK ARBEJDE'), title: 'Super Zoo',
    desc: L('Projects, marketing campaigns and design assets developed during my internship: online banners, PPC ads, social media, in-app banners, a DL flyer and an animation.', 'Projekty, marketingové kampane a dizajnové podklady zo stáže: online bannery, PPC reklamy, sociálne siete, app bannery, DL leták a animácia.', 'Projekter, kampagner og designaktiver fra min praktik: onlinebannere, PPC-annoncer, sociale medier, app-bannere, DL brochure og animation.'),
    meta: [['m_year', '2023 / 2024'], ['m_scope', 'Digital, Social Media, Print'], ['m_role', 'Graphic Designer Intern']], thumb: 'image/banner3.png', imgs: ['image/banner3.png'], pdf: null, tags: ['PRINT', 'DIGITAL', 'ANIMATION', 'SOCIAL MEDIA'],
    pdfs: [['m_flyer', 'image/letak_superzoo.pdf'], ['m_doc', 'image/PRINTOVINY_1.pdf']],
    sections: [
      { k: 't_banners', files: [1, 2, 3, 4].map(function (n) { return 'image/banner' + n + '.png'; }), wide: true },
      { k: 't_ppc', files: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) { return 'image/ppc' + n + '.jpg'; }) },
      { k: 't_some', files: [1, 2, 3, 4].map(function (n) { return 'image/some' + n + '.png'; }) },
      { k: 't_app', files: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '2-1', '2-2', '2-3', '2-4'].map(function (n) { return 'image/' + n + '.png'; }) },
      { k: 't_video', video: 'image/superzoo-showcase.mp4', poster: 'image/superzoo_animation-poster.jpg' }
    ] }
];
var SOON = ['Poked', 'Gaudifest'];
var FEATURED = ['fruitiq', 'smiechko', 'catchles', 'mrazima', 'salvik', 'ballk'];
var byId = function (id) { return P.filter(function (p) { return p.id === id; })[0]; };
var SKILLS = [['Illustrator', 'lv_adv', 1], ['Photoshop', 'lv_adv', 1], ['InDesign', 'lv_adv', 1], ['After Effects', 'lv_mid', .6], ['Figma', 'lv_mid', .6], ['HTML / CSS', 'lv_adv', 1], ['JavaScript', 'lv_basic', .35], ['WordPress', 'lv_basic', .35], ['Blender', 'lv_basic', .2]];
var EXP = [
  { y: '2026 — Present', r: 'Business Academy Aarhus', s: L('Multimedia Design — Aarhus, Denmark', 'Multimedia Design — Aarhus, Dánsko', 'Multimediedesign — Aarhus, Danmark') },
  { y: 'June 2025', r: 'SLARA — Advertising Agency', s: L('Graphic materials for Super Zoo & Ads', 'Grafické materiály pre Super Zoo & reklama', 'Grafisk materiale til Super Zoo & reklamer'), id: 'superzoo', img: 'image/banner3.png' },
  { y: 'Nov 2024', r: 'Erasmus+ Internship / Study Project', s: L('Study Project / Internship — Riga, Latvia', 'Študijný projekt / Stáž — Riga, Lotyšsko', 'Studieprojekt / Praktik — Riga, Letland') },
  { y: '2022 — 2026', r: 'Private Sec. School of Art & Animation', s: L('Graphic Design — Bratislava', 'Grafický dizajn — Bratislava', 'Grafisk Design — Bratislava'), img: 'image/alphabet.jpg' },
  { y: '2023 — 2025', r: 'Catering & Event Support', s: L('Event preparation & service', 'Príprava podujatí a tímová práca', 'Eventplanlægning & service') }
];

/* ------------------------------------------------------------------ text helpers */
function splitChars(el, text) {
  var n = 0;
  el.innerHTML = text.split(' ').map(function (w) {
    return '<span class="w">' + Array.from(w).map(function (c) { return '<span class="c" style="--i:' + (n++) + '">' + esc(c) + '</span>'; }).join('') + '</span>';
  }).join(' ');
  el.setAttribute('aria-label', text);
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

/* ------------------------------------------------------------------ render */
function renderMarquee() {
  var words = ['BRANDING', 'PACKAGING', 'PRINT', 'EDITORIAL', 'UI/UX', 'TYPOGRAPHY', 'SOCIAL MEDIA'];
  var set = words.map(function (w) { return '<span>' + w + ' ✱</span>'; }).join('');
  $('#mq').innerHTML = '<div style="display:flex">' + set + '</div><div style="display:flex">' + set + '</div><div style="display:flex">' + set + '</div><div style="display:flex">' + set + '</div>';
}
function renderShowcase() {
  var h = '<div class="hintro"><h2>' + esc(t('hs_title')) + '</h2><p class="hand">' + esc(t('hs_hint')) + '</p><svg viewBox="0 0 100 100" class="ast" style="--rot:0deg"><use href="#ast"/></svg></div>';
  FEATURED.forEach(function (id, i) {
    var p = byId(id);
    h += '<article class="hcard" tabindex="0" role="button" data-id="' + id + '" data-view="1" aria-label="' + esc(p.title) + '">' +
      '<div class="hc-head mono"><span>' + pad(i + 1) + '</span><span>' + esc(t('lab3')) + '</span></div>' +
      '<div class="duo"><img src="' + p.imgs[0] + '" alt="" loading="lazy"></div>' +
      '<div class="hc-body"><h3>' + esc(p.title) + '</h3><p class="mono" style="opacity:.7">' + esc(pick(p.catL)) + '</p><p class="mono d">' + esc(pick(p.desc)) + '</p></div>' +
      '<div class="hc-tags mono">' + p.tags.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div><span class="hc-arrow">→</span></article>';
  });
  h += '<div class="houtro"><h2>' + esc(t('hs_all')) + '</h2><a class="mono" href="#s4">↓</a></div>';
  $('#hsTrack').innerHTML = h;
  sizeHS();
}
var FILTER = 'all';
function renderFilters() {
  var cats = [['all', 'f_all'], ['brand', 'f_brand'], ['print', 'f_print'], ['ui', 'f_ui'], ['intern', 'f_intern']];
  $('#filters').innerHTML = cats.map(function (c) { return '<button data-f="' + c[0] + '" class="' + (FILTER === c[0] ? 'on' : '') + '">' + esc(t(c[1])) + '</button>'; }).join('');
}
function renderTiles() {
  var h = '';
  P.forEach(function (p, i) {
    h += '<a class="tile" href="#' + p.id + '" data-id="' + p.id + '" data-cat="' + p.cat + '" data-view="1"><div class="inner"><div class="duo"><img src="' + p.thumb + '" alt="" loading="lazy"></div>' +
      '<div class="tl"><b>' + esc(p.title) + '</b><em>' + pad(i + 1) + '</em></div></div></a>';
  });
  SOON.forEach(function (s) {
    h += '<div class="tile soon" data-cat="ui"><div class="inner"><div class="blank"></div><div class="tl"><b>' + s + '</b><em>' + esc(t('soon')) + '</em></div></div></div>';
  });
  $('#tiles').innerHTML = h;
  applyFilter(true);
  $$('.tile[data-id]').forEach(function (tile) {
    var inner = $('.inner', tile);
    tile.addEventListener('mousemove', function (e) {
      if (RM) return;
      var r = tile.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      inner.style.setProperty('--ry', (px * 10).toFixed(2) + 'deg');
      inner.style.setProperty('--rx', (-py * 10).toFixed(2) + 'deg');
    });
    tile.addEventListener('mouseleave', function () { inner.style.setProperty('--rx', '0deg'); inner.style.setProperty('--ry', '0deg'); });
  });
}
function applyFilter(instant) {
  $$('.tile').forEach(function (tile) {
    var show = FILTER === 'all' || tile.dataset.cat === FILTER;
    if (instant) { tile.classList.toggle('gone', !show); tile.classList.toggle('hide', !show); return; }
    if (show) { tile.classList.remove('gone'); requestAnimationFrame(function () { requestAnimationFrame(function () { tile.classList.remove('hide'); }); }); }
    else { tile.classList.add('hide'); setTimeout(function () { if (tile.classList.contains('hide')) tile.classList.add('gone'); }, 420); }
  });
  $$('#filters button').forEach(function (b) { b.classList.toggle('on', b.dataset.f === FILTER); });
}
function renderSkills() {
  $('#skillRows').innerHTML = SKILLS.map(function (s, i) {
    return '<div class="srow" style="--w:' + s[2] + ';--d:' + (i * .07).toFixed(2) + 's"><span class="nm">' + s[0] + '</span><span class="lv"><i></i></span><span class="lvl">' + esc(t(s[1])) + '</span></div>';
  }).join('');
  observe($('#skillRows'));
}
function renderExp() {
  $('#expList').innerHTML = EXP.map(function (e) {
    return '<div class="xrow rv"' + (e.id ? ' data-id="' + e.id + '" data-view="1"' : '') + (e.img ? ' data-img="' + e.img + '"' : '') + '><span class="mono">' + e.y + '</span><span><b>' + esc(e.r) + '</b><small>' + esc(pick(e.s)) + '</small></span><span class="go mono">' + (e.id ? esc(t('hs_view')) + ' ↗' : '') + '</span></div>';
  }).join('');
  observe($('#expList'));
}

/* ------------------------------------------------------------------ language */
function applyLang() {
  root.lang = LANG === 'dk' ? 'da' : LANG;
  $$('[data-i]').forEach(function (el) {
    var txt = t(el.dataset.i);
    if (el.classList.contains('split')) splitChars(el, txt); else el.textContent = txt;
  });
  $$('.lang button').forEach(function (b) { b.classList.toggle('active-lang', b.id === 'btn-' + LANG); });
  var cs = $('#cursor span'); if (cs) cs.textContent = t('hs_view');
  var cb = $('#copyBtn'); if (cb && !cb.classList.contains('ok')) cb.textContent = t('ct_copy');
  $('#mCloseT').textContent = t('m_close'); $('#mPrevT').textContent = t('m_prev'); $('#mNextT').textContent = t('m_next');
  renderShowcase(); renderFilters(); renderTiles(); renderSkills(); renderExp();
  if (modalOpen) renderModal();
  hudSec = null;
  try { localStorage.setItem('lang', LANG); } catch (e) {}
}
window.setLanguage = function (l) { LANG = l; applyLang(); };

/* ------------------------------------------------------------------ observers */
var io = null;
function countUp(el) {
  var to = +el.dataset.to, t0 = performance.now();
  (function s(now) { var p = clamp((now - t0) / 1300, 0, 1); el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to); if (p < 1) requestAnimationFrame(s); })(t0);
}
function observe(scope) {
  if (!io) return;
  $$('.rv,.split,.draw,.srow,.count', scope || document).forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
}
function startObservers() {
  io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.classList.contains('count')) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  observe(document);
}

/* ------------------------------------------------------------------ modal */
var modal = $('#modal'), modalOpen = false, cur = 0, imgIdx = 0, tab = 0, mode = 'img';
function renderStage() {
  var p = P[cur], stage = $('#mStage'), th = $('#mThumbs');
  th.innerHTML = '';
  if (p.sections) {
    th.innerHTML = p.sections.map(function (s, i) { return '<button class="tab ' + (i === tab ? 'on' : '') + '" data-tab="' + i + '">' + esc(t(s.k)) + '</button>'; }).join('');
    var s = p.sections[tab];
    if (s.video) stage.innerHTML = '<video controls autoplay loop muted playsinline poster="' + s.poster + '"><source src="' + s.video + '" type="video/mp4"></video>';
    else stage.innerHTML = '<div class="zg ' + (s.wide ? 'wide' : '') + '">' + s.files.map(function (f) { return '<img src="' + f + '" alt="" loading="lazy">'; }).join('') + '</div>';
    stage.style.alignItems = 'flex-start';
    return;
  }
  stage.style.alignItems = 'center';
  if (mode === 'pdf' && p.pdf) { stage.innerHTML = '<iframe src="' + p.pdf + '#toolbar=1" title="' + esc(p.title) + '"></iframe>'; return; }
  stage.innerHTML = '<img src="' + p.imgs[imgIdx] + '" alt="' + esc(p.title) + '" data-act="nextimg">';
  if (p.imgs.length > 1) th.innerHTML = p.imgs.map(function (f, i) { return '<button data-img="' + i + '" class="' + (i === imgIdx ? 'on' : '') + '"><img src="' + f + '" alt=""></button>'; }).join('');
}
function renderModal() {
  var p = P[cur];
  $('#mNum').textContent = pad(cur + 1) + ' / ' + pad(P.length);
  $('#mTitle').textContent = p.title;
  $('#mCat').textContent = pick(p.catL);
  $('#mDesc').textContent = pick(p.desc);
  $('#mMeta').innerHTML = p.meta.map(function (m) { return '<dt>' + esc(t(m[0])) + '</dt><dd>' + esc(m[1]) + '</dd>'; }).join('');
  $('#mTags').innerHTML = p.tags.map(function (x) { return '<span>' + x + '</span>'; }).join('');
  var l = '';
  if (p.pdf) l += '<button data-act="pdf">' + esc(mode === 'pdf' ? t('m_back') : t('m_pdf')) + '</button><a href="' + p.pdf + '" target="_blank" rel="noopener">' + esc(t('m_open')) + '</a>';
  if (p.pdfs) l += p.pdfs.map(function (x) { return '<a href="' + x[1] + '" target="_blank" rel="noopener">' + esc(t(x[0])) + '</a>'; }).join('');
  $('#mLinks').innerHTML = l;
  renderStage();
}
function openProject(id, x, y) {
  var i = P.indexOf(byId(id)); if (i < 0) return;
  cur = i; imgIdx = 0; tab = 0; mode = 'img';
  modal.style.setProperty('--cx', (x || innerWidth / 2) + 'px'); modal.style.setProperty('--cy', (y || innerHeight / 2) + 'px');
  renderModal(); modal.scrollTop = 0;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); modalOpen = true;
  root.style.overflow = 'hidden';
  setTimeout(function () { $('#mClose').focus({ preventScroll: true }); }, 400);
}
function closeModal() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); modalOpen = false;
  root.style.overflow = '';
  var s = $('#mStage'); setTimeout(function () { if (!modalOpen) s.innerHTML = ''; }, 900);
}
function stepProject(d) { cur = (cur + d + P.length) % P.length; imgIdx = 0; tab = 0; mode = 'img'; renderModal(); modal.scrollTop = 0; }
modal.addEventListener('click', function (e) {
  var b = e.target.closest('[data-act],[data-tab],[data-img]'); if (!b) return;
  var p = P[cur];
  if (b.dataset.tab !== undefined) { tab = +b.dataset.tab; renderStage(); }
  else if (b.dataset.img !== undefined) { imgIdx = +b.dataset.img; renderStage(); }
  else if (b.dataset.act === 'pdf') { mode = mode === 'pdf' ? 'img' : 'pdf'; renderModal(); }
  else if (b.dataset.act === 'nextimg' && p.imgs.length > 1) { imgIdx = (imgIdx + 1) % p.imgs.length; renderStage(); }
});
$('#mClose').addEventListener('click', closeModal);
$('#mPrev').addEventListener('click', function () { stepProject(-1); });
$('#mNext').addEventListener('click', function () { stepProject(1); });
document.addEventListener('keydown', function (e) {
  if (!modalOpen) return;
  if (e.key === 'Escape') closeModal();
  else if (e.key === 'ArrowRight') stepProject(1);
  else if (e.key === 'ArrowLeft') stepProject(-1);
});
function openFrom(el, e) {
  var r = el.getBoundingClientRect();
  var x = e && e.clientX ? e.clientX : r.left + r.width / 2, y = e && e.clientY ? e.clientY : r.top + r.height / 2;
  openProject(el.dataset.id, x, y);
}
document.addEventListener('click', function (e) {
  var f = e.target.closest('#filters button');
  if (f) { FILTER = f.dataset.f; applyFilter(false); return; }
  var el = e.target.closest('[data-view][data-id]');
  if (el) { e.preventDefault(); openFrom(el, e); }
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter' || modalOpen) return;
  var el = e.target.closest && e.target.closest('.hcard[data-id]');
  if (el) { e.preventDefault(); openFrom(el, null); }
});

/* ------------------------------------------------------------------ cursor, magnetic, float image */
var cursor = $('#cursor'), mouse = { x: -100, y: -100 }, cpos = { x: -100, y: -100 };
document.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
document.addEventListener('mouseover', function (e) {
  if (!FINE) return;
  var view = e.target.closest('[data-view]'), hov = e.target.closest('a,button,.app');
  cursor.classList.toggle('view', !!view && !modalOpen);
  cursor.classList.toggle('hov', !view && !!hov);
});
var float = $('#floatImg'), fpos = { x: 0, y: 0 };
document.addEventListener('mouseover', function (e) {
  var r = e.target.closest('.xrow[data-img]');
  if (r && FINE && !RM) { $('img', float).src = r.dataset.img; float.classList.add('on'); }
  else float.classList.remove('on');
});
$$('.mag').forEach(function (el) {
  el.addEventListener('mousemove', function (e) {
    if (RM) return;
    var r = el.getBoundingClientRect();
    el.style.transition = 'transform .1s';
    el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .3).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .4).toFixed(1) + 'px)';
  });
  el.addEventListener('mouseleave', function () { el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)'; el.style.transform = ''; });
});

/* ------------------------------------------------------------------ main loop (parallax, horizontal scroll, HUD, marquee) */
var hs = $('#s3'), track = $('#hsTrack'), hsBar = $('#hsBar'), hsDist = 0, hsCur = 0;
var secs = $$('.pg'), hudSec = null, docH = 1, vel = 0, lastY = scrollY, mqX = 0, mqW = 1;
var par = $$('[data-speed]'), prog = $('#prog'), astCover = $('#astCover'), astContact = $('#astContact');
function sizeHS() {
  if (RM || !hs) return;
  hsDist = Math.max(0, track.scrollWidth - innerWidth);
  hs.style.height = (hsDist + innerHeight) + 'px';
}
function measure() {
  docH = root.scrollHeight; sizeHS();
  var m = $('#mq'); mqW = Math.max(1, m.scrollWidth / 4);
}
function setHud(s) {
  hudSec = s;
  document.body.dataset.theme = s.dataset.theme;
  $('#hudNum').textContent = s.dataset.num;
  $('#hudLabel').textContent = t(s.dataset.label);
  $('#hudCount').textContent = s.dataset.num + ' / ' + pad(secs.length);
}
function loop() {
  requestAnimationFrame(loop);
  var y = window.scrollY, vh = innerHeight;
  vel += ((y - lastY) - vel) * .12; lastY = y;
  prog.style.transform = 'scaleX(' + clamp(y / Math.max(1, docH - vh), 0, 1).toFixed(4) + ')';
  var active = null;
  for (var i = 0; i < secs.length; i++) { var r = secs[i].getBoundingClientRect(); if (r.top <= vh * .45 && r.bottom >= vh * .45) { active = secs[i]; break; } }
  if (active && active !== hudSec) setHud(active);
  if (FINE) {
    cpos.x += (mouse.x - cpos.x) * .22; cpos.y += (mouse.y - cpos.y) * .22;
    cursor.style.transform = 'translate3d(' + cpos.x.toFixed(1) + 'px,' + cpos.y.toFixed(1) + 'px,0)';
    fpos.x += (mouse.x + 60 - fpos.x) * .14; fpos.y += (mouse.y - fpos.y) * .14;
    float.style.left = fpos.x.toFixed(1) + 'px'; float.style.top = fpos.y.toFixed(1) + 'px';
  }
  if (RM) return;
  par.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.bottom < -300 || r.top > vh + 300) return;
    var cy = r.top + r.height / 2 - vh / 2 - (el._py || 0);
    var target = cy * parseFloat(el.dataset.speed);
    el._py = (el._py || 0) + (target - (el._py || 0)) * .12;
    el.style.setProperty('--py', el._py.toFixed(1) + 'px');
  });
  if (astCover) astCover.style.setProperty('--rot', (y * .12).toFixed(1) + 'deg');
  if (astContact) astContact.style.setProperty('--rot', (-y * .08).toFixed(1) + 'deg');
  mqX -= .7 + Math.abs(vel) * .4; if (mqX < -mqW) mqX += mqW;
  $('#mq').style.transform = 'translate3d(' + mqX.toFixed(1) + 'px,0,0)';
  var hr = hs.getBoundingClientRect();
  if (hr.bottom > -50 && hr.top < vh + 50) {
    var p = clamp(-hr.top / Math.max(1, hs.offsetHeight - vh), 0, 1);
    hsCur += (-p * hsDist - hsCur) * .1;
    track.style.transform = 'translate3d(' + hsCur.toFixed(1) + 'px,0,0)';
    hsBar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    $$('.hcard', track).forEach(function (c) {
      var cr = c.getBoundingClientRect();
      c.style.setProperty('--ix', ((cr.left + cr.width / 2 - innerWidth / 2) * -.08).toFixed(1) + 'px');
    });
  }
}

/* ------------------------------------------------------------------ waves canvas */
function initWaves() {
  var cv = $('#waves'); if (!cv) return;
  var cx = cv.getContext('2d'), w = 0, h = 0, run = false, mx = .5, my = .5;
  function size() { var d = Math.min(window.devicePixelRatio || 1, 1.5); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * d; cv.height = h * d; cx.setTransform(d, 0, 0, d, 0, 0); }
  size(); window.addEventListener('resize', size);
  cv.parentElement.addEventListener('mousemove', function (e) { var r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; });
  new IntersectionObserver(function (es) { run = es[0].isIntersecting; }, { threshold: 0 }).observe(cv);
  (function frame(ms) {
    requestAnimationFrame(frame);
    if (!run) return;
    var tt = RM ? 0 : ms * .001;
    var g = cx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#0a1f9e'); g.addColorStop(.5, '#2147e6'); g.addColorStop(1, '#08106a');
    cx.fillStyle = g; cx.fillRect(0, 0, w, h);
    for (var i = 0; i < 28; i++) {
      var k = i / 28; cx.beginPath();
      for (var x = 0; x <= w; x += 12) {
        var nx = x / w, bump = Math.exp(-Math.pow((nx - mx) * 5, 2)) * (my - .5) * -110;
        var yy = h * (.12 + k * .76) + Math.sin(nx * 5 + tt * .6 + i * .35) * 40 * (.4 + k) + Math.sin(nx * 11 - tt * .4 + i) * 12 + bump * (1 - k);
        if (x) cx.lineTo(x, yy); else cx.moveTo(x, yy);
      }
      cx.strokeStyle = 'rgba(' + ((120 + k * 100) | 0) + ',' + ((160 + k * 70) | 0) + ',255,' + (.05 + .24 * Math.sin(k * Math.PI)).toFixed(3) + ')';
      cx.lineWidth = 1.2 + k * 2; cx.stroke();
    }
  })(0);
}

/* ------------------------------------------------------------------ small things */
function initClock() {
  var el = $('#clock'); if (!el) return;
  var f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Copenhagen' });
  function tick() { el.textContent = f.format(new Date()); }
  tick(); setInterval(tick, 10000);
}
function initCopy() {
  var b = $('#copyBtn'); if (!b) return;
  b.addEventListener('click', function () {
    var done = function () { b.classList.add('ok'); b.textContent = t('ct_copied'); setTimeout(function () { b.classList.remove('ok'); b.textContent = t('ct_copy'); }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText('nina.mondockova@gmail.com').then(done, done); else done();
  });
}
function probePortrait() {
  var im = new Image();
  im.onload = function () { $$('.portrait img').forEach(function (i) { i.src = 'image/nina.jpg'; }); };
  im.src = 'image/nina.jpg';
}

/* ------------------------------------------------------------------ boot */
function boot() {
  var sym = $('#ast');
  $$('svg:not([width])').forEach(function (svg) { if (svg.querySelector('use')) svg.innerHTML = sym.innerHTML; });
  $$('.split:not([data-i])').forEach(function (el) { splitChars(el, el.textContent); });
  renderMarquee();
  applyLang();
  initWaves(); initClock(); initCopy(); probePortrait();
  measure(); setTimeout(measure, 800);
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  requestAnimationFrame(loop);
  runLoader();
}
function runLoader() {
  var loader = $('#loader'), num = $('#ldNum'), done = false;
  function finish() {
    if (done) return; done = true;
    loader.classList.add('out'); document.body.classList.remove('loading');
    setTimeout(startObservers, 350);
    setTimeout(function () { loader.remove(); }, 1300);
  }
  if (RM) { loader.remove(); document.body.classList.remove('loading'); startObservers(); return; }
  var t0 = performance.now(), dur = 1700;
  (function step(now) {
    var p = clamp((now - t0) / dur, 0, 1);
    num.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * 100)).padStart(3, '0');
    if (p < 1) requestAnimationFrame(step); else finish();
  })(t0);
  setTimeout(finish, 4000);
}
boot();
})();
