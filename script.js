(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var pad = function (n) { return String(n).padStart(2, '0'); };
var root = document.documentElement;

/* ---------------- texts + projects (EN / SK / DK) */
var LANG = 'en';
try { LANG = localStorage.getItem('lang') || 'en'; } catch (e) {}
function L(en, sk, dk) { return { en: en, sk: sk || en, dk: dk || en }; }
var I = {
  en: {
    lab1: 'PORTFOLIO', lab2: 'ABOUT ME', lab3: 'SELECTED PROJECTS', lab4: 'ALL WORK', lab5: 'SKILLS', lab6: 'EXPERIENCE', lab7: "LET'S WORK TOGETHER", lab8: 'THANK YOU',
    cv_tag: 'MULTIMEDIA DESIGN & GRAPHIC DESIGN', nav_work: 'PORTFOLIO', nav_about: 'ABOUT', nav_contact: 'CONTACT', w1: 'VISUALS', w2: 'IDEAS', w3: 'STORIES',
    ab_h1: 'NINA', ab_h2: 'MONDOČKOVÁ',
    hi_h: "Hi! I'm Nina, a multimedia & graphic designer based in Aarhus.", ed_h: 'education', ct_hh: 'contacts', sw_h: 'software', wk_p: 'Branding, packaging, print, UI/UX and internship work from 2022 – 2026. Pick a folder tab to filter.',
    ab_p1: "I'm a multimedia design student with a background in graphic design. I love creating visual identities, print and digital materials and promotional content.",
    ab_p2: 'During my studies and internship I work with Adobe Illustrator, Photoshop and InDesign, while developing my skills in UI/UX, web design and digital media.',
    ab_cur: 'Currently studying', ab_cur2: 'Multimedia Design', ab_prev: 'Previous education', ab_prev2: 'Private Secondary School of Art & Animation, Bratislava',
    st1: 'YEARS OF STUDY', st2: 'INTERNSHIPS', st3: 'BRANDING PROJECTS', st4: 'PRINT PROJECTS', quote: 'Design is how I see the world.',
    gr_h: 'Portfolio', ab_born: 'born', sk_lang: 'LANGUAGES', sk_dev: 'DEVELOPING', sk_web: 'Web design', sk_dig: 'Digital media', ex_h: 'Experience',
    fav_h: 'my favorite fonts', credits: 'Design & code: Nina Mondočková · Built with HTML, CSS & JavaScript · Fonts: Inter Tight, Pacifico, Caveat (Google Fonts) · Software logos: Simple Icons & their owners', cf_name: 'Your name', cf_email: 'Your e-mail', cf_msg: 'Your message', cf_send: 'SEND MESSAGE', cf_h: 'or write me a message', to_top_b: 'Back to top', ct_h1: 'GET IN', ct_h2: 'TOUCH', ct_time: 'LOCAL TIME', ct_copy: 'COPY EMAIL', ct_copied: 'COPIED ✓', ct_thanks: 'Thanks for watching :)',
    end_sub: 'PORTFOLIO', to_top: 'BACK TO TOP ↑',
    f_all: 'ALL', f_brand: 'BRANDING', f_print: 'PRINT', f_ui: 'UI/UX', f_intern: 'INTERNSHIP',
    hs_title: 'Selected projects', hs_hint: 'Scroll →', hs_all: 'All work', hs_view: 'VIEW', soon: 'SOON',
    lv_adv: 'Advanced', lv_mid: 'Intermediate', lv_basic: 'Basic',
    m_close: 'CLOSE', m_prev: 'PREV', m_next: 'NEXT', m_pdf: 'VIEW PDF', m_back: 'BACK TO IMAGES', m_open: 'OPEN PDF ↗', m_flyer: 'DL FLYER PDF ↗', m_doc: 'DOCUMENTATION PDF ↗',
    m_year: 'YEAR', m_scope: 'SCOPE', m_role: 'ROLE',
    t_banners: 'ONLINE BANNERS', t_ppc: 'PPC ADS', t_some: 'SOCIAL MEDIA', t_app: 'APP BANNERS', t_video: 'ANIMATION', t_event: 'EVENT – POSTER & INVITATION'
  },
  sk: {
    lab1: 'PORTFÓLIO', lab2: 'O MNE', lab3: 'VYBRANÉ PROJEKTY', lab4: 'VŠETKY PRÁCE', lab5: 'ZRUČNOSTI', lab6: 'SKÚSENOSTI', lab7: 'POĎME TVORIŤ SPOLU', lab8: 'ĎAKUJEM',
    cv_tag: 'MULTIMEDIÁLNY DIZAJN & GRAFICKÝ DIZAJN', nav_work: 'PORTFÓLIO', nav_about: 'O MNE', nav_contact: 'KONTAKT', w1: 'VIZUÁLY', w2: 'NÁPADY', w3: 'PRÍBEHY',
    ab_h1: 'NINA', ab_h2: 'MONDOČKOVÁ',
    hi_h: 'Ahoj! Som Nina, multimediálna a grafická dizajnérka v Aarhuse.', ed_h: 'vzdelanie', ct_hh: 'kontakty', sw_h: 'softvér', wk_p: 'Branding, obaly, tlač, UI/UX a práce zo stáže z rokov 2022 – 2026. Vyber si záložku a filtruj.',
    ab_p1: 'Som študentka multimediálneho dizajnu so základom v grafickom dizajne. Rada tvorím vizuálne identity, tlačové a digitálne materiály a reklamný obsah.',
    ab_p2: 'Počas štúdia a stáže pracujem s Adobe Illustrator, Photoshop a InDesign a rozvíjam sa v UI/UX, webdizajne a digitálnych médiách.',
    ab_cur: 'Momentálne študujem', ab_cur2: 'Multimedia Design', ab_prev: 'Predchádzajúce vzdelanie', ab_prev2: 'Súkromná SŠ umelecko-animovanej tvorby, Bratislava',
    st1: 'ROKY ŠTÚDIA', st2: 'STÁŽE', st3: 'BRANDINGOVÉ PROJEKTY', st4: 'TLAČOVÉ PROJEKTY', quote: 'Dizajn je to, ako vidím svet.',
    gr_h: 'Portfólio', ab_born: 'narodená', sk_lang: 'JAZYKY', sk_dev: 'ROZVÍJAM', sk_web: 'Webdizajn', sk_dig: 'Digitálne médiá', ex_h: 'Skúsenosti',
    fav_h: 'moje obľúbené fonty', credits: 'Dizajn a kód: Nina Mondočková · Vytvorené v HTML, CSS a JavaScripte · Písma: Inter Tight, Pacifico, Caveat (Google Fonts) · Logá softvérov: Simple Icons a ich vlastníci', cf_name: 'Tvoje meno', cf_email: 'Tvoj e-mail', cf_msg: 'Tvoja správa', cf_send: 'ODOSLAŤ SPRÁVU', cf_h: 'alebo mi napíš správu', to_top_b: 'Späť hore', ct_h1: 'OZVI', ct_h2: 'SA MI', ct_time: 'MIESTNY ČAS', ct_copy: 'KOPÍROVAŤ E-MAIL', ct_copied: 'SKOPÍROVANÉ ✓', ct_thanks: 'Vďaka, že si sa pozrel/a :)',
    end_sub: 'PORTFÓLIO', to_top: 'SPÄŤ HORE ↑',
    f_all: 'VŠETKO', f_brand: 'BRANDING', f_print: 'TLAČ', f_ui: 'UI/UX', f_intern: 'STÁŽ',
    hs_title: 'Vybrané projekty', hs_hint: 'Scrolluj →', hs_all: 'Všetky práce', hs_view: 'ZOBRAZIŤ', soon: 'ČOSKORO',
    lv_adv: 'Pokročilé', lv_mid: 'Stredne pokročilé', lv_basic: 'Základy',
    m_close: 'ZAVRIEŤ', m_prev: 'SPÄŤ', m_next: 'ĎALEJ', m_pdf: 'ZOBRAZIŤ PDF', m_back: 'SPÄŤ NA OBRÁZKY', m_open: 'OTVORIŤ PDF ↗', m_flyer: 'DL LETÁK PDF ↗', m_doc: 'DOKUMENTÁCIA PDF ↗',
    m_year: 'ROK', m_scope: 'ROZSAH', m_role: 'ROLA',
    t_banners: 'ONLINE BANNERY', t_ppc: 'PPC REKLAMY', t_some: 'SOCIÁLNE SIETE', t_app: 'APP BANNERY', t_video: 'ANIMÁCIA', t_event: 'EVENT – PLAGÁT & POZVÁNKA'
  },
  dk: {
    lab1: 'PORTEFØLJE', lab2: 'OM MIG', lab3: 'UDVALGTE PROJEKTER', lab4: 'ALT ARBEJDE', lab5: 'FÆRDIGHEDER', lab6: 'ERFARING', lab7: 'LAD OS ARBEJDE SAMMEN', lab8: 'TAK',
    cv_tag: 'MULTIMEDIEDESIGN & GRAFISK DESIGN', nav_work: 'PORTEFØLJE', nav_about: 'OM MIG', nav_contact: 'KONTAKT', w1: 'VISUALS', w2: 'IDEER', w3: 'HISTORIER',
    ab_h1: 'NINA', ab_h2: 'MONDOČKOVÁ',
    hi_h: 'Hej! Jeg er Nina, multimedie- og grafisk designer i Aarhus.', ed_h: 'uddannelse', ct_hh: 'kontakt', sw_h: 'software', wk_p: 'Branding, emballage, tryk, UI/UX og praktikarbejde fra 2022 – 2026. Vælg en fane for at filtrere.',
    ab_p1: 'Jeg er multimediedesignstuderende med baggrund i grafisk design. Jeg elsker at skabe visuelle identiteter, trykte og digitale materialer og reklameindhold.',
    ab_p2: 'Under mine studier og praktik arbejder jeg med Adobe Illustrator, Photoshop og InDesign og udvikler mine færdigheder inden for UI/UX, webdesign og digitale medier.',
    ab_cur: 'Studerer lige nu', ab_cur2: 'Multimediedesign', ab_prev: 'Tidligere uddannelse', ab_prev2: 'Privat gymnasium for kunst & animation, Bratislava',
    st1: 'ÅR MED STUDIER', st2: 'PRAKTIKKER', st3: 'BRANDINGPROJEKTER', st4: 'TRYKPROJEKTER', quote: 'Design er, hvordan jeg ser verden.',
    gr_h: 'Portefølje', ab_born: 'født', sk_lang: 'SPROG', sk_dev: 'UDVIKLER', sk_web: 'Webdesign', sk_dig: 'Digitale medier', ex_h: 'Erfaring',
    fav_h: 'mine yndlingsfonte', credits: 'Design og kode: Nina Mondočková · Lavet med HTML, CSS og JavaScript · Skrifttyper: Inter Tight, Pacifico, Caveat (Google Fonts) · Softwarelogoer: Simple Icons og deres ejere', cf_name: 'Dit navn', cf_email: 'Din e-mail', cf_msg: 'Din besked', cf_send: 'SEND BESKED', cf_h: 'eller skriv en besked til mig', to_top_b: 'Til toppen', ct_h1: 'KONTAKT', ct_h2: 'MIG', ct_time: 'LOKAL TID', ct_copy: 'KOPIÉR E-MAIL', ct_copied: 'KOPIERET ✓', ct_thanks: 'Tak fordi du kiggede :)',
    end_sub: 'PORTEFØLJE', to_top: 'TILBAGE TIL TOPPEN ↑',
    f_all: 'ALT', f_brand: 'BRANDING', f_print: 'TRYK', f_ui: 'UI/UX', f_intern: 'PRAKTIK',
    hs_title: 'Udvalgte projekter', hs_hint: 'Scroll →', hs_all: 'Alt arbejde', hs_view: 'SE', soon: 'SNART',
    lv_adv: 'Avanceret', lv_mid: 'Mellemniveau', lv_basic: 'Grundlæggende',
    m_close: 'LUK', m_prev: 'FORRIGE', m_next: 'NÆSTE', m_pdf: 'SE PDF', m_back: 'TILBAGE TIL BILLEDER', m_open: 'ÅBN PDF ↗', m_flyer: 'DL BROCHURE PDF ↗', m_doc: 'DOKUMENTATION PDF ↗',
    m_year: 'ÅR', m_scope: 'OMFANG', m_role: 'ROLLE',
    t_banners: 'ONLINE BANNERE', t_ppc: 'PPC ANNONCER', t_some: 'SOCIALE MEDIER', t_app: 'APP BANNERE', t_video: 'ANIMATION', t_event: 'EVENT – PLAKAT & INVITATION'
  }
};
function t(k) { return (I[LANG] && I[LANG][k]) || I.en[k] || k; }
function pick(o) { return o[LANG] || o.en; }

/* ------------------------------------------------------------------ data */
var P = [
  { id: 'cphmarathon', cat: 'brand', catL: L('DESIGN MANUAL / REDESIGN', 'DIZAJN MANUÁL & REDIZAJN', 'DESIGNMANUAL / REDESIGN'), title: 'Copenhagen Marathon',
    desc: L('Design manual for a Copenhagen Marathon redesign: a logo of two running chevrons, a bold indigo palette with pink, orange and yellow signpost accents, Montserrat and Bebas Neue typography and a set of pictograms.', 'Dizajn manuál k redizajnu Copenhagen Marathonu: logo z dvoch bežiacich šípok, výrazná indigová paleta s ružovými, oranžovými a žltými akcentmi, typografia Montserrat a Bebas Neue a sada piktogramov.', 'Designmanual til et redesign af Copenhagen Marathon: et logo af to løbende chevroner, en stærk indigo palet med pink, orange og gule accenter, typografi i Montserrat og Bebas Neue samt et sæt piktogrammer.'),
    meta: [['m_year', '2026'], ['m_scope', 'Redesign, Design Manual']], thumb: 'image/_thumbs/cph-marathon-0001.jpg', imgs: ['image/cph-marathon/0001.jpg', 'image/cph-marathon/0002.jpg', 'image/cph-marathon/0003.jpg', 'image/cph-marathon/0004.jpg', 'image/cph-marathon/0005.jpg', 'image/cph-marathon/0006.jpg'], pdf: 'image/cph-marathon.pdf', tags: ['REDESIGN', 'DESIGN MANUAL'] },
  { id: 'mohito', cat: 'brand', catL: L('REDESIGN / PACKAGING', 'REDIZAJN & OBAL', 'REDESIGN / EMBALLAGE'), title: 'Mohito Refresh',
    desc: L('Redesign of my older drink project: an alcohol-free cocktail line in cans (Mohito, Spritz, Piña Colada, Daiquiri). Design manual with logo, colour system, fonts, can label layout, flavour range and applications.', 'Redizajn môjho staršieho projektu nápoja: rad nealkoholických koktailov v plechovkách (Mohito, Spritz, Piña Colada, Daiquiri). Dizajn manuál s logom, farebným systémom, písmami, layoutom etikety, radom príchutí a aplikáciami.', 'Redesign af mit ældre drikkeprojekt: en serie alkoholfri cocktails på dåse (Mohito, Spritz, Piña Colada, Daiquiri). Designmanual med logo, farvesystem, skrifttyper, etiketlayout, smagsvarianter og applikationer.'),
    meta: [['m_year', '2026'], ['m_scope', 'Redesign, Packaging, Design Manual']], thumb: 'image/_thumbs/mohito-0001.jpg', imgs: ['image/mohito/0001.jpg', 'image/mohito/0002.jpg', 'image/mohito/0003.jpg', 'image/mohito/0004.jpg', 'image/mohito/0005.jpg', 'image/mohito/0006.jpg', 'image/mohito/0007.jpg', 'image/mohito/0008.jpg', 'image/mohito/0009.jpg', 'image/mohito/0010.jpg', 'image/mohito/0011.jpg', 'image/mohito/0012.jpg'], pdf: 'image/mohito.pdf', tags: ['REDESIGN', 'PACKAGING', 'DESIGN MANUAL'] },
  { id: 'fruitiq', cat: 'brand', catL: L('BRANDING, PACKAGING', 'BRANDING, OBALY', 'BRANDING, EMBALLAGE'), title: 'Fruitiq',
    desc: L('Delivery of exotic fruits from all over the world. An identity system built around vibrant organic forms and clean typography.', 'Doručovanie exotického ovocia z celého sveta. Identita postavená na živých organických tvaroch a čistej typografii.', 'Levering af eksotiske frugter fra hele verden. Et identitetssystem bygget på levende organiske former og ren typografi.'),
    meta: [['m_scope', 'Branding, Packaging']], thumb: 'image/_thumbs/KI-mondockova-interactive-0001.jpg', imgs: ['image/KI_mondockova_interactive/0001.jpg', 'image/KI_mondockova_interactive/0002.jpg', 'image/KI_mondockova_interactive/0003.jpg', 'image/KI_mondockova_interactive/0004.jpg', 'image/KI_mondockova_interactive/0005.jpg', 'image/KI_mondockova_interactive/0006.jpg', 'image/KI_mondockova_interactive/0007.jpg', 'image/KI_mondockova_interactive/0008.jpg', 'image/KI_mondockova_interactive/0009.jpg', 'image/KI_mondockova_interactive/0010.jpg', 'image/KI_mondockova_interactive/0011.jpg', 'image/KI_mondockova_interactive/0012.jpg', 'image/KI_mondockova_interactive/0013.jpg', 'image/KI_mondockova_interactive/0014.jpg', 'image/KI_mondockova_interactive/0015.jpg', 'image/KI_mondockova_interactive/0016.jpg', 'image/KI_mondockova_interactive/0017.jpg', 'image/KI_mondockova_interactive/0018.jpg', 'image/KI_mondockova_interactive/0019.jpg', 'image/KI_mondockova_interactive/0020.jpg', 'image/KI_mondockova_interactive/0021.jpg', 'image/KI_mondockova_interactive/0022.jpg', 'image/KI_mondockova_interactive/0023.jpg', 'image/KI_mondockova_interactive/0024.jpg', 'image/KI_mondockova_interactive/0025.jpg'], pdf: 'image/KI_mondockova_interactive.pdf', tags: ['BRANDING', 'PACKAGING'] },
  { id: 'superzoo', cat: 'intern', catL: L('INTERNSHIP WORK', 'STÁŽ & SKÚSENOSTI', 'PRAKTIK ARBEJDE'), title: 'Super Zoo',
    desc: L('Projects, marketing campaigns and design assets developed during my internship: online banners, PPC ads, social media, in-app banners, a DL flyer and an animation.', 'Projekty, marketingové kampane a dizajnové podklady zo stáže: online bannery, PPC reklamy, sociálne siete, app bannery, DL leták a animácia.', 'Projekter, kampagner og designaktiver fra min praktik: onlinebannere, PPC-annoncer, sociale medier, app-bannere, DL brochure og animation.'),
    meta: [['m_year', '2025'], ['m_scope', 'Digital, Social Media, Print']], thumb: 'image/_thumbs/banner3.jpg', imgs: ['image/banner3.png'], pdf: null, tags: ['PRINT', 'DIGITAL', 'ANIMATION', 'SOCIAL MEDIA'],
    pdfs: [['m_flyer', 'image/letak_superzoo.pdf'], ['m_doc', 'image/PRINTOVINY_1.pdf']],
    sections: [
      { k: 't_banners', files: [1, 2, 3, 4].map(function (n) { return 'image/banner' + n + '.png'; }), wide: true },
      { k: 't_ppc', files: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) { return 'image/ppc' + n + '.jpg'; }) },
      { k: 't_some', files: [1, 2, 3, 4].map(function (n) { return 'image/some' + n + '.png'; }) },
      { k: 't_app', files: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '2-1', '2-2', '2-3', '2-4'].map(function (n) { return 'image/' + n + '.png'; }) },
      { k: 't_video', video: 'image/superzoo_animacia.mp4', poster: 'image/superzoo_animacia-poster.jpg' }
    ] },
  { id: 'mystical', cat: 'ui', catL: L('MOBILE GAME, UI/UX DESIGN', 'MOBILNÁ HRA, UI/UX DESIGN', 'MOBILSPIL, UI/UX DESIGN'), title: 'Mythical Creatures',
    desc: L('An immersive mobile game experience built around mythical worldbuilding, intuitive user interfaces and engaging character interactions.', 'Pohlcujúci zážitok z mobilnej hry zameraný na mytologický svet, intuitívne rozhranie a pútavé interakcie s postavami.', 'En fordybende mobilspiloplevelse om mytisk verdenbygning, intuitive brugerflader og engagerende karakterinteraktioner.'),
    meta: [['m_year', '2025'], ['m_scope', 'Mobile Game, UI/UX']], thumb: 'image/_thumbs/mystical-0001.jpg', imgs: ['image/mystical/0001.jpg', 'image/mystical/0002.jpg', 'image/mystical/0003.jpg', 'image/mystical/0004.jpg', 'image/mystical/0005.jpg'], pdf: 'image/mystical.pdf', tags: ['MOBILE GAME', 'UI/UX'] },
  { id: 'smiechko', cat: 'brand', catL: L('BRANDING & VISUAL IDENTITY', 'BRANDING & DIZAJN IDENTÍT', 'BRANDING & VISUEL IDENTITET'), title: 'Smiechko',
    desc: L('Complete visual identity and brand manual: logo, color palette, typography, applications on print and promo materials, and a 50-page guidelines manual.', 'Kompletná vizuálna identita a dizajn manuál: logotyp, farebná paleta, typografia, aplikácie na tlačoviny a reklamné predmety a 50-stranový manuál.', 'Komplet visuel identitet og brand manual: logo, farvepalette, typografi, applikationer på tryksager og en 50-siders brand manual.'),
    meta: [['m_year', '2025'], ['m_scope', 'Branding, Guidelines']], thumb: 'image/_thumbs/smiechko-0001.jpg', imgs: ['image/smiechko/0001.jpg', 'image/smiechko/0002.jpg', 'image/smiechko/0003.jpg', 'image/smiechko/0004.jpg', 'image/smiechko/0005.jpg', 'image/smiechko/0006.jpg', 'image/smiechko/0007.jpg', 'image/smiechko/0008.jpg', 'image/smiechko/0009.jpg', 'image/smiechko/0010.jpg', 'image/smiechko/0011.jpg', 'image/smiechko/0012.jpg', 'image/smiechko/0013.jpg', 'image/smiechko/0014.jpg', 'image/smiechko/0015.jpg', 'image/smiechko/0016.jpg', 'image/smiechko/0017.jpg', 'image/smiechko/0018.jpg', 'image/smiechko/0019.jpg', 'image/smiechko/0020.jpg', 'image/smiechko/0021.jpg', 'image/smiechko/0022.jpg', 'image/smiechko/0023.jpg', 'image/smiechko/0024.jpg', 'image/smiechko/0025.jpg', 'image/smiechko/0026.jpg', 'image/smiechko/0027.jpg', 'image/smiechko/0028.jpg', 'image/smiechko/0029.jpg', 'image/smiechko/0030.jpg', 'image/smiechko/0031.jpg'], pdf: 'image/smiechko.pdf', tags: ['BRANDING', 'GUIDELINES'] },
  { id: 'nutrivictus', cat: 'print', catL: L('CATALOG / EDITORIAL', 'KATALÓG & EDITORIÁL', 'KATALOG / EDITORIELT'), title: 'Nutrivictus',
    desc: L('Complete product catalog: typography rules, clean multi-column layouts, category color coding and print-ready preparation. 10 pages.', 'Kompletný produktový katalóg: typografia, prehľadná mriežka, farebné kódovanie kategórií a príprava na tlač. 10 strán.', 'Komplet produktkatalog: typografi, rene layouts, farvekodning af kategorier og klargøring til tryk. 10 sider.'),
    meta: [['m_year', '2025'], ['m_scope', 'Catalog, Print Layout']], thumb: 'image/_thumbs/nutrivictus-logo.jpg', imgs: ['image/katalog_mondockova_interactive/0001.jpg', 'image/katalog_mondockova_interactive/0002.jpg', 'image/katalog_mondockova_interactive/0003.jpg', 'image/katalog_mondockova_interactive/0004.jpg', 'image/katalog_mondockova_interactive/0005.jpg', 'image/katalog_mondockova_interactive/0006.jpg', 'image/katalog_mondockova_interactive/0007.jpg'], narrow: true, extra: { k: 't_event', files: ['image/nutrivictus-event/plagat.jpg', 'image/nutrivictus-event/pozvanka.jpg'], cols: '.7075fr .476fr' }, pdf: 'image/katalog_mondockova_interactive.pdf', tags: ['CATALOG', 'PRINT'] },
  { id: 'kalendar', cat: 'print', catL: L('CALENDAR / ILLUSTRATION', 'KALENDÁR & ILUSTRÁCIA', 'KALENDER / ILLUSTRATION'), title: 'Calendar 2025',
    desc: L('Wall calendar for 2025 with hand-drawn illustrations of koi fish and water lilies on a bright blue background, monthly grids with name days and a space for notes.', 'Nástenný kalendár na rok 2025 s vlastnými ilustráciami kapor koi a lekien na výraznom modrom pozadí, mesačnými mriežkami s menami a miestom na poznámky.', 'Vægkalender for 2025 med egne illustrationer af koi-karper og åkander på en klar blå baggrund, månedsoversigter med navnedage og plads til noter.'),
    meta: [['m_year', '2025'], ['m_scope', 'Calendar, Illustration']], thumb: 'image/_thumbs/kalendar-nahlad.jpg', imgs: ['image/kalendar/0001.jpg', 'image/kalendar/0002.jpg', 'image/kalendar/0003.jpg', 'image/kalendar/0004.jpg', 'image/kalendar/0005.jpg', 'image/kalendar/0006.jpg', 'image/kalendar/0007.jpg'], grid: 'cal', zoom: true, pdf: 'image/kalendar.pdf', tags: ['CALENDAR', 'ILLUSTRATION'] },
  { id: 'catchles', cat: 'brand', catL: L('VISUAL IDENTITY', 'VIZUÁLNA IDENTITA', 'VISUEL IDENTITET'), title: 'Catchles',
    desc: L('Complete visual identity for the Catchles project: logo, visual style, typography and application assets for a modern brand presentation.', 'Kompletná vizuálna identita pre projekt Catchles: logo, vizuálny štýl, typografia a aplikačné prvky.', 'Komplet visuel identitet for Catchles: logo, visuel stil, typografi og applikationselementer.'),
    meta: [['m_year', '2025'], ['m_scope', 'Visual Identity, Branding']], thumb: 'image/_thumbs/catchles-0001.jpg', imgs: ['image/catchles/0001.jpg', 'image/catchles/0002.jpg', 'image/catchles/0003.jpg', 'image/catchles/0004.jpg', 'image/catchles/0005.jpg', 'image/catchles/0006.jpg', 'image/catchles/0007.jpg', 'image/catchles/0008.jpg', 'image/catchles/0009.jpg', 'image/catchles/0010.jpg', 'image/catchles/0011.jpg', 'image/catchles/0012.jpg', 'image/catchles/0013.jpg', 'image/catchles/0014.jpg', 'image/catchles/0015.jpg', 'image/catchles/0016.jpg', 'image/catchles/0017.jpg', 'image/catchles/0018.jpg', 'image/catchles/0019.jpg', 'image/catchles/0020.jpg', 'image/catchles/0021.jpg', 'image/catchles/0022.jpg', 'image/catchles/0023.jpg', 'image/catchles/0024.jpg', 'image/catchles/0025.jpg', 'image/catchles/0026.jpg', 'image/catchles/0027.jpg', 'image/catchles/0028.jpg', 'image/catchles/0029.jpg', 'image/catchles/0030.jpg', 'image/catchles/0031.jpg', 'image/catchles/0032.jpg', 'image/catchles/0033.jpg', 'image/catchles/0034.jpg', 'image/catchles/0035.jpg', 'image/catchles/0036.jpg', 'image/catchles/0037.jpg', 'image/catchles/0038.jpg', 'image/catchles/0039.jpg', 'image/catchles/0040.jpg', 'image/catchles/0041.jpg', 'image/catchles/0042.jpg', 'image/catchles/0043.jpg', 'image/catchles/0044.jpg', 'image/catchles/0045.jpg', 'image/catchles/0046.jpg', 'image/catchles/0047.jpg', 'image/catchles/0048.jpg'], pdf: 'image/CATCHLES.pdf', tags: ['VISUAL IDENTITY', 'BRANDING'] },
  { id: 'salvik', cat: 'brand', catL: L('VISUAL IDENTITY', 'VIZUÁLNA IDENTITA', 'VISUEL IDENTITET'), title: 'Salvik',
    desc: L('Complete visual identity for the Salvik brand: logo, typography, color palette, corporate stationery and full brand guidelines.', 'Kompletná vizuálna identita pre značku Salvik: logo, typografia, farebná paleta, firemné tlačoviny a dizajn manuál.', 'Komplet visuel identitet for Salvik: logo, typografi, farvepalette, tryksager og brand guidelines.'),
    meta: [['m_year', '2025'], ['m_scope', 'Visual Identity, Branding']], thumb: 'image/_thumbs/salvik-0001.jpg', imgs: ['image/salvik/0001.jpg', 'image/salvik/0002.jpg', 'image/salvik/0003.jpg', 'image/salvik/0004.jpg', 'image/salvik/0005.jpg', 'image/salvik/0006.jpg', 'image/salvik/0007.jpg', 'image/salvik/0008.jpg', 'image/salvik/0009.jpg', 'image/salvik/0010.jpg', 'image/salvik/0011.jpg', 'image/salvik/0012.jpg', 'image/salvik/0013.jpg', 'image/salvik/0014.jpg', 'image/salvik/0015.jpg', 'image/salvik/0016.jpg', 'image/salvik/0017.jpg', 'image/salvik/0018.jpg', 'image/salvik/0019.jpg', 'image/salvik/0020.jpg', 'image/salvik/0021.jpg', 'image/salvik/0022.jpg', 'image/salvik/0023.jpg', 'image/salvik/0024.jpg', 'image/salvik/0025.jpg', 'image/salvik/0026.jpg', 'image/salvik/0027.jpg', 'image/salvik/0028.jpg', 'image/salvik/0029.jpg', 'image/salvik/0030.jpg', 'image/salvik/0031.jpg', 'image/salvik/0032.jpg', 'image/salvik/0033.jpg', 'image/salvik/0034.jpg', 'image/salvik/0035.jpg'], pdf: 'image/salvik.pdf', tags: ['VISUAL IDENTITY', 'BRANDING'] },
  { id: 'posters', cat: 'print', catL: L('POSTERS & GRAPHICS', 'PLAGÁTY & GRAFIKA', 'PLAKATER & GRAFIK'), title: 'Posters Collection',
    desc: L('A collection of artistic and ecological posters: modern typographic structure, eco-social themes and strong visual messages.', 'Séria umeleckých a ekologických plagátov: moderné typografické rozvrhnutie, spoločensko-ekologické témy a výrazná vizuálna výpoveď.', 'En samling af kunstneriske og økologiske plakater: moderne typografisk struktur, øko-sociale temaer og stærke budskaber.'),
    meta: [['m_year', '2022 - 2025'], ['m_scope', 'Poster Design, Artwork']], thumb: 'image/_thumbs/mondockova-eco.jpg', imgs: ['image/domov_plagat.jpg', 'image/ranajky_obalka.jpg', 'image/mondockova_eco.jpg', 'image/certifikat.jpg', 'image/PF_v1.jpg', 'image/PF_v2.jpg', 'image/TECHNIKY%20TLACE.jpg', 'image/coffee_plagat.jpg'], grid: true, zoom: true, tags: ['POSTERS', 'ARTWORK'] },
  { id: 'poked', cat: 'ui', catL: L('MOBILE APP, UI/UX DESIGN', 'MOBILNÁ APLIKÁCIA, UI/UX DESIGN', 'MOBILAPP, UI/UX DESIGN'), title: "Poke'd",
    desc: L('Logo and mobile app for ordering poké bowls: login, bestsellers, a "make your own" bowl, bowl detail with ingredients and nutrition, cart, delivery address and checkout. Designed in light and dark mode.', 'Logo a mobilná aplikácia na objednávanie poké misiek: prihlásenie, najobľúbenejšie misky, „Make your own“ miska, detail misky s ingredienciami a nutričnými hodnotami, košík, adresa doručenia a platba. Navrhnutá vo svetlom aj tmavom režime.', 'Logo og mobilapp til bestilling af poké bowls: login, bestsellere, en "make your own" bowl, bowl-detaljer med ingredienser og næringsindhold, kurv, leveringsadresse og betaling. Designet i lys og mørk tilstand.'),
    meta: [['m_year', '2024'], ['m_scope', 'Logo, Mobile App, UI/UX']], thumb: 'image/_thumbs/poked-logo.jpg', imgs: ['image/poked/0001.jpg', 'image/poked/0002.jpg', 'image/poked/0003.jpg', 'image/poked/0004.jpg', 'image/poked/0005.jpg', 'image/poked/0006.jpg'], pdf: 'image/poked.pdf', tags: ['LOGO', 'MOBILE APP', 'UI/UX'] },
  { id: 'lauma', cat: 'brand', catL: L('BRANDING & PACKAGING / ERASMUS+', 'BRANDING & OBALY / ERASMUS+', 'BRANDING & EMBALLAGE / ERASMUS+'), title: 'Lauma Skincare',
    desc: L('An Erasmus+ project I created in Latvia: brand manual and packaging for Lauma Skincare, a Latvian line of sheet masks. Each box is inspired by a goddess from Latvian mythology (Lauma, Jūras Māte, Saule) with its own colour palette, illustration and line icons.', 'Erasmus+ projekt, ktorý som robila v Lotyšsku: dizajn manuál a obaly pre Lauma Skincare, lotyšskú značku pleťových masiek. Každá krabička je inšpirovaná bohyňou z lotyšskej mytológie (Lauma, Jūras Māte, Saule) a má vlastnú farebnú paletu, ilustráciu a ikony.', 'Et Erasmus+ projekt, jeg lavede i Letland: designmanual og emballage til Lauma Skincare, en lettisk serie af ansigtsmasker. Hver æske er inspireret af en gudinde fra lettisk mytologi (Lauma, Jūras Māte, Saule) med egen farvepalet, illustration og ikoner.'),
    meta: [['m_year', '2024'], ['m_scope', 'Erasmus+ Riga, Packaging, Brand Manual']], thumb: 'image/_thumbs/lauma-0001.jpg', imgs: ['image/lauma/0001.jpg', 'image/lauma/0002.jpg', 'image/lauma/0003.jpg', 'image/lauma/0004.jpg', 'image/lauma/0005.jpg', 'image/lauma/0006.jpg', 'image/lauma/0007.jpg', 'image/lauma/0008.jpg', 'image/lauma/0009.jpg', 'image/lauma/0010.jpg'], pdf: 'image/lauma.pdf', tags: ['ERASMUS+', 'PACKAGING', 'BRAND MANUAL'] },
  { id: 'mrazima', cat: 'brand', catL: L('BRANDING & PACKAGING', 'BRANDING & OBALY', 'BRANDING & EMBALLAGE'), title: 'Mrazima',
    desc: L('Visual identity system and packaging design: logo, color system, typography, packaging assets and full brand guidelines.', 'Systém vizuálnej identity a obalový dizajn: logo, farebný systém, typografia, obaly a kompletný dizajn manuál.', 'Visuelt identitetssystem og emballagedesign: logo, farvesystem, typografi, emballage og brand guidelines.'),
    meta: [['m_year', '2024'], ['m_scope', 'Branding, Packaging']], thumb: 'image/_thumbs/mrazima-0001.jpg', imgs: ['image/mrazima/0001.jpg', 'image/mrazima/0002.jpg', 'image/mrazima/0003.jpg', 'image/mrazima/0004.jpg', 'image/mrazima/0005.jpg', 'image/mrazima/0006.jpg', 'image/mrazima/0007.jpg', 'image/mrazima/0008.jpg', 'image/mrazima/0009.jpg', 'image/mrazima/0010.jpg', 'image/mrazima/0011.jpg', 'image/mrazima/0012.jpg', 'image/mrazima/0013.jpg', 'image/mrazima/0014.jpg', 'image/mrazima/0015.jpg', 'image/mrazima/0016.jpg', 'image/mrazima/0017.jpg', 'image/mrazima/0018.jpg', 'image/mrazima/0019.jpg', 'image/mrazima/0020.jpg', 'image/mrazima/0021.jpg', 'image/mrazima/0022.jpg', 'image/mrazima/0023.jpg', 'image/mrazima/0024.jpg', 'image/mrazima/0025.jpg', 'image/mrazima/0026.jpg', 'image/mrazima/0027.jpg', 'image/mrazima/0028.jpg', 'image/mrazima/0029.jpg', 'image/mrazima/0030.jpg', 'image/mrazima/0031.jpg', 'image/mrazima/0032.jpg', 'image/mrazima/0033.jpg', 'image/mrazima/0034.jpg', 'image/mrazima/0035.jpg', 'image/mrazima/0036.jpg', 'image/mrazima/0037.jpg', 'image/mrazima/0038.jpg', 'image/mrazima/0039.jpg', 'image/mrazima/0040.jpg'], pdf: 'image/mrazima.pdf', tags: ['BRANDING', 'PACKAGING'] },
  { id: 'mrazimaad', cat: 'ui', catL: L('MOBILE AD / STORYBOARD', 'MOBILNÁ REKLAMA & STORYBOARD', 'MOBILREKLAME / STORYBOARD'), title: 'Mrazima Mobile Ad',
    desc: L('Storyboard for a vertical mobile ad for the Mrazima brand: an iceberg cracks open, the product packs fly out, spin and fall, then fresh leaves, the slogan and an ice-cave finale.', 'Storyboard vertikálnej mobilnej reklamy pre značku Mrazima: ľadový vrch popraská, vyletia z neho balenia produktu, otáčajú sa a padajú, nasledujú svieže listy, slogan a finále v ľadovej jaskyni.', 'Storyboard til en lodret mobilreklame for Mrazima: et isbjerg revner, produktpakkerne flyver ud, drejer og falder, derefter friske blade, slogan og en finale i en ishule.'),
    meta: [['m_year', '2024'], ['m_scope', 'Mobile Ad, Storyboard']], thumb: 'image/_thumbs/mrazima-ad-nahlad.jpg', imgs: ['image/mrazima-ad/0001.jpg', 'image/mrazima-ad/0002.jpg'], pdf: 'image/mrazima-ad.pdf', tags: ['MOBILE AD', 'STORYBOARD'] },
  { id: 'greek', cat: 'print', catL: L('MAGAZINE / EDITORIAL', 'ČASOPIS & EDITORIÁL', 'MAGASIN / EDITORIELT'), title: 'Greek Magazine',
    desc: L('A cultural magazine about ancient Greece and its impact on modern visual culture: typography grid, photo curation and cover design.', 'Kultúrny magazín o antickom Grécku a jeho vplyve na modernú vizuálnu kultúru: typografická skladba, výber fotografií a obálka.', 'Et kulturmagasin om det antikke Grækenland og dets indflydelse på moderne visuel kultur: typografisk gitter, fotokuratering og omslag.'),
    meta: [['m_year', '2024'], ['m_scope', 'Magazine, Editorial']], thumb: 'image/_thumbs/casopis-nahlad.jpg', imgs: ['image/casopis/0001.jpg', 'image/casopis/0002.jpg', 'image/casopis/0003.jpg', 'image/casopis/0004.jpg', 'image/casopis/0005.jpg', 'image/casopis/0006.jpg', 'image/casopis/0007.jpg', 'image/casopis/0008.jpg', 'image/casopis/0009.jpg', 'image/casopis/0010.jpg', 'image/casopis/0011.jpg'], narrow: true, pdf: 'image/casopis.pdf', tags: ['MAGAZINE', 'EDITORIAL'] },
  { id: 'alphabet', cat: 'print', catL: L('TYPOGRAPHY & TYPE DESIGN', 'TYPOGRAFIA & PÍSMO', 'TYPOGRAFI & SKRIFTDESIGN'), title: 'Own Alphabet',
    desc: L('Custom typeface designed from first sketches to final vector metrics. A study on letterforms, proportions and print specimen poster design.', 'Autorská abeceda od skíc po finálnu vektorovú podobu. Štúdia tvaroslovia, proporcií písma a jeho aplikácia na tlačový vzorník.', 'Specialdesignet alfabet fra de første skitser til de endelige vektorer. Et studie i bogstavformer og proportioner.'),
    meta: [['m_year', '2022'], ['m_scope', 'Type Design, Print Specimen']], thumb: 'image/_thumbs/alphabet-nahlad.jpg', imgs: ['image/alphabet.jpg'], pdf: 'image/alphabet.pdf', tags: ['TYPE DESIGN', 'SPECIMEN'] }

];
var SOON = ['Gaudifest'];
var FEATURED = ['fruitiq', 'smiechko', 'catchles', 'mrazima', 'salvik'];
var byId = function (id) { return P.filter(function (p) { return p.id === id; })[0]; };
var SKILLS = [['Illustrator', 'lv_adv', 1], ['Photoshop', 'lv_adv', 1], ['InDesign', 'lv_adv', 1], ['After Effects', 'lv_mid', .6], ['Figma', 'lv_mid', .6], ['HTML / CSS', 'lv_adv', 1], ['JavaScript', 'lv_basic', .35], ['WordPress', 'lv_basic', .35], ['Blender', 'lv_basic', .2]];
var EXP = [
  { y: '2026 - Present', r: 'Business Academy Aarhus', s: L('Multimedia Design - Aarhus, Denmark', 'Multimedia Design - Aarhus, Dánsko', 'Multimediedesign - Aarhus, Danmark') },
  { y: 'June 2025', r: 'SLARA - Advertising Agency', s: L('Graphic materials for Super Zoo & Ads', 'Grafické materiály pre Super Zoo & reklama', 'Grafisk materiale til Super Zoo & reklamer'), id: 'superzoo', img: 'image/banner3.png' },
  { y: 'Nov 2024', r: 'Erasmus+ Internship / Study Project', s: L('Study Project / Internship - Riga, Latvia', 'Študijný projekt / Stáž - Riga, Lotyšsko', 'Studieprojekt / Praktik - Riga, Letland') },
  { y: '2022 - 2026', r: 'Private Sec. School of Art & Animation', s: L('Graphic Design - Bratislava', 'Grafický dizajn - Bratislava', 'Grafisk Design - Bratislava'), img: 'image/alphabet.jpg' },
  { y: '2023 - 2025', r: 'Catering & Event Support', s: L('Event preparation & service', 'Príprava podujatí a tímová práca', 'Eventplanlægning & service') }
];


function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

/* ---------------- work grid */
var FILTER = 'all';
function renderFilters() {
  var cats = [['all', 'f_all'], ['brand', 'f_brand'], ['print', 'f_print'], ['ui', 'f_ui'], ['intern', 'f_intern']];
  $('#filters').innerHTML = cats.map(function (c) {
    return '<button data-f="' + c[0] + '" class="ftab' + (FILTER === c[0] ? ' on' : '') + '">' + esc(t(c[1]).toLowerCase()) + '</button>';
  }).join('');
}
function year(p) {
  var m = (p.meta || []).filter(function (x) { return x[0] === 'm_year'; })[0];
  return m ? m[1] : '';
}
function renderTiles() {
  $('#tiles').innerHTML = P.map(function (p) {
    return '<a class="tile" href="#' + p.id + '" data-id="' + p.id + '" data-cat="' + p.cat + '"' + (FILTER === 'all' || FILTER === p.cat ? '' : ' hidden') + '>' +
      '<div class="img"><img src="' + p.thumb + '" alt="' + esc(p.title) + '" loading="lazy"><span class="view" aria-hidden="true">↗</span></div>' +
      '<div class="t-meta"><b>' + esc(p.title) + '</b><span class="t-yr">' + esc(year(p)) + '</span></div><small>' + esc(pick(p.catL)) + '</small></a>';
  }).join('');
}
var EDU = [
  { y: '2026 – present', r: L('Multimedia Design', 'Multimedia Design', 'Multimediedesign'), s: L('Business Academy Aarhus, Denmark', 'Business Academy Aarhus, Dánsko', 'Erhvervsakademi Aarhus, Danmark') },
  { y: '2022 – 2026', r: L('Graphic Design', 'Grafický dizajn', 'Grafisk design'), s: L('Private Secondary School of Art & Animation, Bratislava', 'Súkromná SŠ umelecko-animovanej tvorby, Bratislava', 'Privat gymnasium for kunst & animation, Bratislava') },
  { y: 'Nov 2024', r: L('Erasmus+ study project', 'Erasmus+ študijný projekt', 'Erasmus+ studieprojekt'), s: L('Riga, Latvia', 'Riga, Lotyšsko', 'Riga, Letland'), id: 'lauma' }
];
var JOBS = [
  { y: 'June 2025', r: L('Graphic Designer, Internship', 'Grafická dizajnérka, stáž', 'Grafisk designer, praktik'), s: L('SLARA – Advertising Agency · Super Zoo campaigns', 'SLARA – reklamná agentúra · kampane Super Zoo', 'SLARA – reklamebureau · Super Zoo kampagner'), id: 'superzoo' },
  { y: 'Nov 2024', r: L('Erasmus+ Internship', 'Erasmus+ stáž', 'Erasmus+ praktik'), s: L('Study project / internship – Riga, Latvia', 'Študijný projekt / stáž – Riga, Lotyšsko', 'Studieprojekt / praktik – Riga, Letland'), id: 'lauma' },
  { y: '2023 – 2025', r: L('Catering & Event Support', 'Catering & podpora podujatí', 'Catering & eventsupport'), s: L('Event preparation & service', 'Príprava podujatí a tímová práca', 'Eventplanlægning & service') }
];
var CHIPS = ['branding', 'visual identity', 'packaging', 'print', 'editorial', 'layout design', 'typography', 'type design', 'ui/ux', 'web design', 'social media', 'animation', 'wayfinding'];
/* logo: vlož súbor do image/software/<názov>.svg alebo .png – kým tam nie je, ukáže sa skratka */
var SOFT = [['Ps', 'Photoshop', 'photoshop'], ['Ai', 'Illustrator', 'illustrator'], ['Id', 'InDesign', 'indesign'], ['Ae', 'After Effects', 'aftereffects'], ['Af', 'Affinity', 'affinity'], ['Fg', 'Figma', 'figma'], ['H5', 'HTML', 'html5'], ['C3', 'CSS', 'css'], ['Js', 'JavaScript', 'javascript'], ['Re', 'React', 'react'], ['Wp', 'WordPress', 'wordpress'], ['Bl', 'Blender', 'blender'], ['Pc', 'Procreate', 'procreate'], ['Dv', 'DaVinci Resolve', 'davinci'], ['VS', 'VS Code', 'vscode'], ['Gh', 'GitHub', 'github']];
function listHTML(arr) {
  return arr.map(function (e) {
    return '<li><b>' + esc(e.y) + '</b><strong>' + esc(pick(e.r)) + '</strong><span>' + esc(pick(e.s)) + '</span>' +
      (e.id ? '<button data-id="' + e.id + '">' + esc(t('hs_view')).toLowerCase() + ' →</button>' : '') + '</li>';
  }).join('');
}
function renderAbout() {
  $('#eduList').innerHTML = listHTML(EDU);
  $('#expList').innerHTML = listHTML(JOBS);
  $('#skillChips').innerHTML = CHIPS.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('');
  $('#swList').innerHTML = SOFT.map(function (x) {
    return '<i data-name="' + esc(x[1]) + '" aria-label="' + esc(x[1]) + '"><b>' + esc(x[0]) + '</b>' +
      '<img src="image/software/' + x[2] + '.svg" alt="" onload="this.parentNode.classList.add(\'has-logo\')" onerror="if(!this.dataset.p){this.dataset.p=1;this.src=\'image/software/' + x[2] + '.png\'}else{this.remove()}"></i>';
  }).join('');
}

/* ---------------- language */
function applyLang() {
  root.lang = LANG === 'dk' ? 'da' : LANG;
  $$('[data-i]').forEach(function (el) { el.textContent = t(el.dataset.i); });
  $$('[data-ip]').forEach(function (el) { el.placeholder = t(el.dataset.ip); });
  $$('[data-il]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.il)); el.title = t(el.dataset.il); });
  $$('.lang button').forEach(function (b) { b.classList.toggle('on', b.id === 'btn-' + LANG); });
  $('#mCloseT').textContent = t('m_close'); $('#mPrevT').textContent = t('m_prev'); $('#mNextT').textContent = t('m_next');
  renderFilters(); renderTiles(); renderAbout();
  if (modalOpen) renderModal();
  try { localStorage.setItem('lang', LANG); } catch (e) {}
}
window.setLanguage = function (l) { LANG = l; applyLang(); };

/* ---------------- project detail: all images stacked, no slider */
var modal = $('#modal'), modalOpen = false, cur = 0, tab = 0;
function renderStage() {
  var p = P[cur], stage = $('#mStage');
  stage.classList.toggle('narrow', !!p.narrow);
  $('#mTabs').innerHTML = p.sections ? p.sections.map(function (s, i) {
    return '<button data-tab="' + i + '" class="' + (i === tab ? 'on' : '') + '">' + esc(t(s.k)) + '</button>';
  }).join('') : '';
  if (p.sections) {
    var s = p.sections[tab];
    stage.innerHTML = s.video
      ? '<video controls autoplay loop muted playsinline preload="auto" poster="' + s.poster + '"><source src="' + s.video + '" type="video/mp4"></video>'
      : '<div class="grid' + (s.wide ? ' wide' : '') + '">' + s.files.map(function (f) { return '<img src="' + f + '" alt="" loading="lazy">'; }).join('') + '</div>';
  } else {
    var im = p.imgs.map(function (f) { return '<img src="' + f + '" alt="' + esc(p.title) + '" loading="lazy">'; }).join('');
    stage.innerHTML = p.grid ? '<div class="grid ' + (p.grid === 'cal' ? 'cal' : 'posters') + (p.zoom ? ' zoom' : '') + '">' + im + '</div>' : im;
    if (p.extra) stage.innerHTML += '<h4 class="m-extra">' + esc(t(p.extra.k)) + '</h4><div class="grid zoom extra" style="grid-template-columns:' + p.extra.cols + '">' +
      p.extra.files.map(function (f) { return '<img src="' + f + '" alt="' + esc(p.title) + '" loading="lazy">'; }).join('') + '</div>';
  }
}
function renderModal() {
  var p = P[cur];
  $('#mNum').textContent = pad(cur + 1) + ' / ' + pad(P.length);
  $('#mTitle').textContent = p.title;
  $('#mCat').textContent = pick(p.catL);
  $('#mDesc').textContent = pick(p.desc);
  $('#mMeta').innerHTML = p.meta.map(function (m) { return '<dt>' + esc(t(m[0])) + '</dt><dd>' + esc(m[1]) + '</dd>'; }).join('');
  var l = '';
  if (p.pdf && /\.pdf$/i.test(p.pdf)) l += '<a href="' + p.pdf + '" target="_blank" rel="noopener">' + esc(t('m_open')) + '</a>';
  if (p.pdfs) l += p.pdfs.map(function (x) { return '<a href="' + x[1] + '" target="_blank" rel="noopener">' + esc(t(x[0])) + '</a>'; }).join('');
  $('#mLinks').innerHTML = l;
  renderStage();
  modal.scrollTop = 0;
}
function openProject(id) {
  var i = P.indexOf(byId(id)); if (i < 0) return;
  cur = i; tab = 0; renderModal();
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); modalOpen = true;
  root.style.overflow = 'hidden';
  $('#mClose').focus({ preventScroll: true });
}
function closeModal() {
  if (typeof lbClose === 'function') lbClose();
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); modalOpen = false;
  root.style.overflow = ''; $('#mStage').innerHTML = '';
}
function step(d) { cur = (cur + d + P.length) % P.length; tab = 0; renderModal(); }

/* ---------------- lightbox (projects with zoom: true) */
var lb = document.createElement('div'), lbList = [], lbI = 0;
lb.className = 'lb'; lb.setAttribute('aria-hidden', 'true');
lb.innerHTML = '<button class="lb-x" aria-label="Close">✕</button><button class="lb-p" aria-label="Previous">‹</button><img alt=""><button class="lb-n" aria-label="Next">›</button>';
document.body.appendChild(lb);
function lbShow(i) { lbI = (i + lbList.length) % lbList.length; lb.querySelector('img').src = lbList[lbI]; }
function lbOpen(list, i) { lbList = list; lbShow(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
function lbClose() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
lb.addEventListener('click', function (e) {
  e.stopPropagation();
  if (e.target.closest('.lb-p')) lbShow(lbI - 1);
  else if (e.target.closest('.lb-n')) lbShow(lbI + 1);
  else if (e.target.tagName !== 'IMG') lbClose();
});
$('#mStage').addEventListener('click', function (e) {
  var img = e.target.closest('.zoom img'); if (!img) return;
  var all = [].slice.call(img.parentNode.querySelectorAll('img'));
  lbOpen(all.map(function (x) { return x.getAttribute('src'); }), all.indexOf(img));
});

$('#mClose').addEventListener('click', closeModal);
$('#mPrev').addEventListener('click', function () { step(-1); });
$('#mNext').addEventListener('click', function () { step(1); });
document.addEventListener('keydown', function (e) {
  if (lb.classList.contains('open')) {
    if (e.key === 'Escape') lbClose();
    else if (e.key === 'ArrowRight') lbShow(lbI + 1);
    else if (e.key === 'ArrowLeft') lbShow(lbI - 1);
    return;
  }
  if (!modalOpen) return;
  if (e.key === 'Escape') closeModal();
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'ArrowLeft') step(-1);
});
document.addEventListener('click', function (e) {
  var f = e.target.closest('#filters button');
  if (f) { FILTER = f.dataset.f; renderFilters(); renderTiles(); return; }
  var tb = e.target.closest('#mTabs button');
  if (tb) { tab = +tb.dataset.tab; renderStage(); return; }
  var el = e.target.closest('[data-id]');
  if (el) { e.preventDefault(); openProject(el.dataset.id); }
});

applyLang();
})();
