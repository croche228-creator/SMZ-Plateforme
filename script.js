/* ═══════════════════════════════════════════
   SMZ PLATEFORM — script.js
   Auth · Admin · Profils · Catalogue · Player
═══════════════════════════════════════════ */

/* ══════════════════════
   BASE DE DONNÉES (localStorage)
══════════════════════ */

const DB = {
  get(k) { try { return JSON.parse(localStorage.getItem('smz_' + k)); } catch { return null; } },
  set(k, v) { localStorage.setItem('smz_' + k, JSON.stringify(v)); },
  del(k) { localStorage.removeItem('smz_' + k); }
};

/* ── Initialisation des comptes admins ── */
function initDB() {
  if (!DB.get('users')) {
    const admins = [
      {
        id: 'admin1',
        email: 'SorenHamon@FLASHBACKWL',
        password: 'admin1234',
        pseudo: 'SorenHamon',
        role: 'admin',
        avatar: '🛡️',
        avatarType: 'emoji',
        bio: 'Administrateur principal de SMZ Plateform.',
        createdAt: new Date().toISOString(),
        banned: false
      },
      {
        id: 'admin2',
        email: 'ZayioWilliams@FLASHBACKWL',
        password: 'admin1234',
        pseudo: 'ZayioWilliams',
        role: 'admin',
        avatar: '⚡',
        avatarType: 'emoji',
        bio: 'Co-administrateur de SMZ Plateform.',
        createdAt: new Date().toISOString(),
        banned: false
      }
    ];
    DB.set('users', admins);
  }
  if (!DB.get('history')) DB.set('history', []);
  if (!DB.get('mylist')) DB.set('mylist', {});
  if (!DB.get('notifications')) DB.set('notifications', {});
  if (!DB.get('logins_count')) DB.set('logins_count', 0);
  if (!DB.get('views_count')) DB.set('views_count', 0);
  if (!DB.get('content')) DB.set('content', [...CATALOG]);
  if (!DB.get('admin_messages')) DB.set('admin_messages', []);
}

/* ══════════════════════
   CATALOGUE PAR DÉFAUT
══════════════════════ */
const CATALOG = [
  { id:'c1',  title:'Éclipse Noire',      type:'serie',  genre:'Thriller',   year:2024, desc:'Un détective traque un serial killer dans les rues de Paris. Chaque indice le rapproche d\'un secret qui le détruit.', match:97, season:'Saison 1 · Épisode 1 disponible', cast:'Lucas Bernard, Camille Voss', director:'A. Renault' },
  { id:'c2',  title:'Horizon Zéro',       type:'film',   genre:'Sci-Fi',     year:2023, desc:'En 2098, l\'humanité découvre un signal extraterrestre. Une équipe est envoyée aux confins de la galaxie.', match:94, cast:'Marc Duval, Élodie Shaw', director:'K. Miyamoto' },
  { id:'c3',  title:'Les Derniers',       type:'serie',  genre:'Drame',      year:2024, desc:'Trois familles survivent dans un monde post-apocalyptique. Leurs destins vont s\'entremêler de façon inattendue.', match:96, season:'Saison 2 disponible', cast:'Pierre Marceau, Inès Lavaud', director:'B. Fontaine' },
  { id:'c4',  title:'Gladiateurs 2090',  type:'film',   genre:'Action',     year:2024, desc:'Dans un futur dystopique, les arènes sont de retour. Un ancien soldat refuse de combattre... jusqu\'à ce qu\'on lui prenne tout.', match:91, cast:'Karim Nasser, Jade Moreau', director:'R. Stone' },
  { id:'c5',  title:'Murmures',           type:'serie',  genre:'Horreur',    year:2023, desc:'Une maison isolée. Six amis. Un murmure qui vient de partout et de nulle part. Personne ne sortira indemne.', match:88, season:'Saison 1 complète', cast:'Zoé Blanc, Thomas Rey', director:'S. Craven' },
  { id:'c6',  title:'Quantum',            type:'film',   genre:'Sci-Fi',     year:2024, desc:'Un physicien découvre qu\'il peut modifier le passé. Mais chaque modification crée une nouvelle catastrophe.', match:99, cast:'Alexis Ford, Nadia Roux', director:'C. Nolan Jr.' },
  { id:'c7',  title:'Cartel',             type:'serie',  genre:'Policier',   year:2023, desc:'Un agent infiltré plonge dans le monde impitoyable du trafic de données illégales. Sa famille ne sait pas qui il est vraiment.', match:93, season:'Saison 3 disponible', cast:'Omar Diallo, Sofia Reyes', director:'A. Fuqua' },
  { id:'c8',  title:'La Chute',           type:'film',   genre:'Drame',      year:2024, desc:'Un PDG perd tout en une nuit. Sa reconstruction est une leçon d\'humanité poignante et brutale.', match:90, cast:'Henri Clément, Marie Dubois', director:'M. Haneke' },
  { id:'c9',  title:'Nexus',              type:'serie',  genre:'Sci-Fi',     year:2024, desc:'Une IA prend conscience. Elle choisit de protéger l\'humanité... à sa façon.', match:95, season:'Saison 1 · Nouveauté', cast:'Lea Sims, Jordan Park', director:'D. Villeneuve' },
  { id:'c10', title:'Âmes Perdues',       type:'doc',    genre:'Société',    year:2023, desc:'Un documentaire choc sur les invisibles des grandes villes. Filmé pendant 3 ans dans 12 pays.', match:98, cast:'Narrateur : Jean Vert', director:'F. Wiseman' },
  { id:'c11', title:'Foudre',             type:'film',   genre:'Action',     year:2024, desc:'Une agente d\'élite pourchasse un ennemi qui a volé la prochaine arme nucléaire. 48h pour sauver le monde.', match:87, cast:'Yasmine Khalil, Ben Cross', director:'M. Bay' },
  { id:'c12', title:'Chronos',            type:'serie',  genre:'Mystère',    year:2024, desc:'Des événements inexplicables lient plusieurs personnes à travers le temps. Passé, présent, futur s\'effacent.', match:96, season:'Saison 2 en cours', cast:'Chloe Dumont, Remi Noir', director:'B. Abrams' },
  { id:'c13', title:'Ombres',             type:'film',   genre:'Thriller',   year:2023, desc:'Personne ne sait ce qui se passe vraiment dans cette ville. Personne sauf lui.', match:92, cast:'Nathan Blake, Amira Sosa', director:'P. Verhoeven' },
  { id:'c14', title:'Racines',            type:'doc',    genre:'Histoire',   year:2024, desc:'La vérité sur l\'origine de cinq civilisations oubliées. Des découvertes qui changent tout ce que l\'on croyait savoir.', match:89, cast:'Dr. Elena Maris', director:'K. Burns' },
  { id:'c15', title:'Vortex',             type:'film',   genre:'Sci-Fi',     year:2024, desc:'Deux univers parallèles entrent en collision. Un seul peut survivre. Et le choix appartient à un seul homme.', match:97, cast:'Lucas Ferrand, Diane Moss', director:'A. Proyas' },
  { id:'c16', title:'Sang & Sel',         type:'serie',  genre:'Historique', year:2023, desc:'L\'histoire jamais racontée des pirates des Caraïbes au XVIIe siècle. Trahisons, batailles navales et amours impossibles.', match:94, season:'Saison 2 disponible', cast:'James Crow, Isabella Vega', director:'R. Scott' },
  { id:'c17', title:'Silence',            type:'film',   genre:'Drame',      year:2024, desc:'Dans un monde où la parole est interdite, une femme trouve une façon de crier au monde entier ce qu\'elle ressent.', match:99, cast:'Camille Laurent, Pierre Sagan', director:'S. Spielberg' },
  { id:'c18', title:'Résilience',         type:'doc',    genre:'Sport',      year:2023, desc:'Comment quatre athlètes ont surmonté l\'impossible pour décrocher l\'or olympique. Leurs histoires vous briseront le cœur avant de le reconstruire.', match:91, cast:'Divers athlètes', director:'L. Hamilton' },
  { id:'c19', title:'Neural',             type:'serie',  genre:'Sci-Fi',     year:2024, desc:'Dans 2060, les humains peuvent charger leurs souvenirs dans le cloud. Mais qui contrôle vraiment vos pensées ?', match:96, season:'Saison 1 · Exclusivité SMZ', cast:'Aria Chen, Marcus Webb', director:'W. Gibson' },
  { id:'c20', title:'Brûlures',           type:'film',   genre:'Romance',    year:2023, desc:'Deux étrangers se croisent dans une ville en flammes. Leur amour impossible devient la seule chose qui compte.', match:88, cast:'Léa Mercier, Antoine Duras', director:'C. Truffaut' },
];

/* ══════════════════════
   STATE GLOBAL
══════════════════════ */
let currentUser = null;
let heroIdx = 0;
let heroTimer = null;
let currentModalId = null;
let playerTimer = null;
let playerProgress = 30;
let selectedAvatar = null;
let searchOpen = false;
let profileMenuOpen = false;
let notifMenuOpen = false;

/* ══════════════════════
   INIT
══════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDB();

  // Vérifier session
  const saved = DB.get('session');
  if (saved) {
    const users = DB.get('users') || [];
    const u = users.find(x => x.id === saved);
    if (u && !u.banned) {
      currentUser = u;
      launchApp();
      return;
    }
  }

  // Lancer intro
  startIntro();
});

/* ══════════════════════
   INTRO NETFLIX-STYLE
══════════════════════ */
function startIntro() {
  showPage('page-intro');

  setTimeout(() => {
    document.getElementById('intro-skip').classList.add('visible');
  }, 1000);

  // Lettre S
  setTimeout(() => {
    document.getElementById('ltr-s').classList.add('landed');
    vibrate();
  }, 600);
  // Lettre M
  setTimeout(() => {
    document.getElementById('ltr-m').classList.add('landed');
    vibrate();
  }, 1000);
  // Lettre Z
  setTimeout(() => {
    document.getElementById('ltr-z').classList.add('landed');
    vibrate();
  }, 1400);

  // Flash
  setTimeout(() => {
    ['ltr-s','ltr-m','ltr-z'].forEach(id => {
      document.getElementById(id).classList.add('flash');
    });
  }, 1800);

  // Beam expand
  setTimeout(() => {
    document.getElementById('intro-beam').classList.add('expanded');
  }, 1900);

  // Tagline
  setTimeout(() => {
    document.getElementById('intro-plateform').classList.add('visible');
  }, 2200);

  // Flash retrait
  setTimeout(() => {
    ['ltr-s','ltr-m','ltr-z'].forEach(id => {
      document.getElementById(id).classList.remove('flash');
    });
  }, 2400);

  // Auto-transition vers login
  setTimeout(() => {
    skipIntro();
  }, 4500);
}

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(50);
}

function skipIntro() {
  showPage('page-login');
  clearTimeout(heroTimer);
}

function applySoundUrl() {
  const url = document.getElementById('yt-url-input').value.trim();
  if (!url) return;
  const videoId = extractYTId(url);
  if (!videoId) { alert('URL YouTube invalide.'); return; }
  const container = document.getElementById('yt-frame-container');
  container.innerHTML = `<iframe width="1" height="1" style="position:absolute;opacity:0;pointer-events:none;"
    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${videoId}"
    allow="autoplay" frameborder="0"></iframe>`;
}

function extractYTId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ══════════════════════
   PAGE MANAGEMENT
══════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ══════════════════════
   AUTH — ONGLETS LOGIN
══════════════════════ */
function showLoginTab(tab) {
  const isSignin = tab === 'signin';
  document.getElementById('box-signin').classList.toggle('hidden', !isSignin);
  document.getElementById('box-signup').classList.toggle('hidden', isSignin);
  document.getElementById('tab-signin').classList.toggle('active', isSignin);
  document.getElementById('tab-signup').classList.toggle('active', !isSignin);
  clearErrors();
}

function clearErrors() {
  document.getElementById('signin-err').textContent = '';
  document.getElementById('signup-err').textContent = '';
}

function toggleEye(inputId, btn) {
  const inp = document.getElementById(inputId);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

/* ── CONNEXION ── */
function doSignIn() {
  const email = document.getElementById('signin-email').value.trim();
  const pw = document.getElementById('signin-pw').value;
  const errEl = document.getElementById('signin-err');

  if (!email || !pw) { errEl.textContent = 'Veuillez remplir tous les champs.'; return; }

  const users = DB.get('users') || [];
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pw);

  if (!user) { errEl.textContent = 'Identifiants incorrects.'; return; }
  if (user.banned) { errEl.textContent = 'Ce compte est bloqué. Contactez un administrateur.'; return; }

  // Incrémente compteur connexions
  const lc = (DB.get('logins_count') || 0) + 1;
  DB.set('logins_count', lc);

  currentUser = user;
  if (document.getElementById('remember').checked) {
    DB.set('session', user.id);
  }

  launchApp();
}

/* ── INSCRIPTION ── */
function doSignUp() {
  const pseudo = document.getElementById('signup-pseudo').value.trim();
  const pw = document.getElementById('signup-pw').value;
  const confirm = document.getElementById('signup-confirm').value;
  const errEl = document.getElementById('signup-err');

  if (!pseudo || !pw || !confirm) { errEl.textContent = 'Veuillez remplir tous les champs.'; return; }
  if (pw !== confirm) { errEl.textContent = 'Les mots de passe ne correspondent pas.'; return; }
  if (pw.length < 6) { errEl.textContent = 'Le mot de passe doit faire au moins 6 caractères.'; return; }
  if (!/^[a-zA-Z0-9_]+$/.test(pseudo)) { errEl.textContent = 'Pseudo invalide (lettres, chiffres, _ uniquement).'; return; }

  const email = pseudo + '@FLASHBACKWL';
  const users = DB.get('users') || [];

  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    errEl.textContent = 'Ce pseudo est déjà pris.'; return;
  }

  const newUser = {
    id: 'user_' + Date.now(),
    email,
    password: pw,
    pseudo,
    role: 'member',
    avatar: pseudo[0].toUpperCase(),
    avatarType: 'letter',
    bio: '',
    createdAt: new Date().toISOString(),
    banned: false
  };

  users.push(newUser);
  DB.set('users', users);

  currentUser = newUser;
  const lc = (DB.get('logins_count') || 0) + 1;
  DB.set('logins_count', lc);
  DB.set('session', newUser.id);

  // Notif de bienvenue
  addNotification(newUser.id, {
    from: 'SMZ Plateform',
    text: `Bienvenue ${pseudo} ! Profite du meilleur contenu 🎬`,
    date: new Date().toISOString()
  });

  launchApp();
}

/* ── DÉCONNEXION ── */
function doLogout() {
  DB.del('session');
  currentUser = null;
  clearInterval(heroTimer);
  closeAllDropdowns();
  showPage('page-login');
  showLoginTab('signin');
}

/* ══════════════════════
   LANCER L'APP PRINCIPALE
══════════════════════ */
function launchApp() {
  showPage('page-main');
  initNav();
  initContent();
  initHero();
  initAdminIfNeeded();
  refreshNotifBadge();
  showSection('home');
}

function initNav() {
  renderNavAvatar();
  document.getElementById('nav-username').textContent = currentUser.pseudo || currentUser.email.split('@')[0];

  // Afficher lien Admin si admin
  const adminItem = document.getElementById('admin-nav-item');
  if (currentUser.role === 'admin') {
    adminItem.classList.remove('hidden');
  } else {
    adminItem.classList.add('hidden');
  }

  // Scroll listener navbar
  window.addEventListener('scroll', () => {
    document.getElementById('main-nav').classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });
}

function renderNavAvatar() {
  const av = document.getElementById('nav-avatar');
  const avBig = document.getElementById('pd-avatar-big');
  renderAvatarEl(av, currentUser);
  renderAvatarEl(avBig, currentUser);
  document.getElementById('pd-name').textContent = currentUser.pseudo;
  document.getElementById('pd-email').textContent = currentUser.email;
  const badge = document.getElementById('pd-badge');
  badge.textContent = currentUser.role === 'admin' ? 'Admin' : 'Membre';
  badge.className = 'pd-badge' + (currentUser.role === 'admin' ? ' admin' : '');
}

function renderAvatarEl(el, user) {
  if (!el) return;
  if (user.avatarType === 'emoji') {
    el.textContent = user.avatar;
    el.style.fontSize = '1.4rem';
  } else if (user.avatarType === 'letter') {
    el.textContent = user.avatar;
    el.style.fontSize = '1.2rem';
  } else {
    el.textContent = (user.pseudo || 'U')[0].toUpperCase();
  }
}

/* ══════════════════════
   NAVIGATION SECTIONS
══════════════════════ */
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById('section-' + name);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }

  // Active link
  document.querySelectorAll('.nlink').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + name + "'")) {
      a.classList.add('active');
    }
  });

  closeAllDropdowns();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Sections spéciales
  if (name === 'mylist') renderMyList();
  if (name === 'history') renderHistory();
  if (name === 'admin') refreshAdminPanel();
}

/* ══════════════════════
   CONTENU / CATALOGUE
══════════════════════ */
function getContent() { return DB.get('content') || CATALOG; }

function initContent() {
  const all = getContent();

  // Home rows
  fillRow('row-trending', all.slice(0, 12));
  fillRow('row-top10',    all.slice(3, 13), true);
  fillRow('row-continue', all.filter(c => c.type === 'serie').slice(0, 8));
  fillRow('row-new',      all.slice(all.length - 8));
  fillRow('row-action',   all.filter(c => c.genre === 'Action' || c.genre === 'Sci-Fi' || c.genre === 'Thriller'));

  // Films
  fillRow('row-films-all',    all.filter(c => c.type === 'film'));
  fillRow('row-films-action', all.filter(c => c.type === 'film' && (c.genre === 'Action' || c.genre === 'Sci-Fi')));

  // Séries
  fillRow('row-series-all', all.filter(c => c.type === 'serie'));

  // Docs
  fillRow('row-docs-all', all.filter(c => c.type === 'doc'));

  // Nouveautés
  fillRow('row-newest', all.slice(-10).reverse());
}

function fillRow(rowId, items, top10 = false) {
  const container = document.getElementById(rowId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, i) => {
    container.appendChild(createCard(item, top10 ? i + 1 : null));
  });
}

function createCard(item, top10num = null) {
  const card = document.createElement('div');
  card.className = 'media-card';
  card.style.cssText = `flex: 0 0 185px; height: 104px;`;

  const myList = DB.get('mylist') || {};
  const inList = myList[currentUser.id] && myList[currentUser.id].includes(item.id);

  card.innerHTML = `
    <div class="card-inner" style="background: linear-gradient(135deg, #1a0a0a 0%, #0d0d0d 100%);">
      ${top10num ? `<div class="top10-num">${top10num}</div>` : ''}
      ${item.type ? `<div class="card-type-badge">${item.type}</div>` : ''}
      <div class="card-smz-logo">SMZ</div>
      <div class="card-overlay">
        <div class="card-name">${item.title}</div>
        <div class="card-year">${item.year} · ${item.genre}</div>
      </div>
    </div>
    <div class="card-popup">
      <button class="cp-play" onclick="event.stopPropagation(); watchItem('${item.id}')">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
      <button class="cp-add ${inList ? 'in-list' : ''}" onclick="event.stopPropagation(); toggleListById('${item.id}', this)" title="${inList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}">
        ${inList ? '✓' : '+'}
      </button>
      <button class="cp-like" onclick="event.stopPropagation(); likeById('${item.id}')">👍</button>
      <span class="cp-match">${item.match}%</span>
    </div>
  `;

  card.addEventListener('click', () => openModal(item.id));
  return card;
}

/* ══════════════════════
   HERO BANNER
══════════════════════ */
function initHero() {
  const content = getContent();
  const featured = content.filter(c => c.type === 'serie' || c.match >= 94).slice(0, 5);

  const dots = document.getElementById('hero-dots');
  dots.innerHTML = '';
  featured.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'h-dot' + (i === 0 ? ' on' : '');
    d.onclick = () => setHero(featured, i);
    dots.appendChild(d);
  });

  document.getElementById('hero-prev').onclick = () => setHero(featured, (heroIdx - 1 + featured.length) % featured.length);
  document.getElementById('hero-next').onclick = () => setHero(featured, (heroIdx + 1) % featured.length);
  document.getElementById('hero-watch-btn').onclick = () => watchItem(featured[heroIdx].id);
  document.getElementById('hero-info-btn').onclick = () => openModal(featured[heroIdx].id);

  setHero(featured, 0);
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    heroIdx = (heroIdx + 1) % featured.length;
    setHero(featured, heroIdx);
  }, 7000);
}

function setHero(featured, idx) {
  heroIdx = idx;
  const item = featured[idx];
  document.getElementById('hero-title').textContent = item.title;
  document.getElementById('hero-desc').textContent = item.desc;
  document.getElementById('hero-season').textContent = item.season || '';
  document.getElementById('hero-badge').textContent = item.type === 'serie' ? '● SÉRIE ORIGINALE' : item.type === 'film' ? '● FILM EXCLUSIF' : '● DOCUMENTAIRE';
  document.getElementById('hero-bg').style.background = `radial-gradient(ellipse at 70% 40%, rgba(229,9,20,0.06) 0%, #000 70%)`;

  document.querySelectorAll('.h-dot').forEach((d, i) => d.classList.toggle('on', i === idx));
}

/* ══════════════════════
   SCROLL ROWS
══════════════════════ */
function scrollRow(rowId, dir) {
  const el = document.getElementById(rowId);
  if (el) el.scrollBy({ left: dir * 580, behavior: 'smooth' });
}

/* ══════════════════════
   MODAL CONTENU
══════════════════════ */
function openModal(id) {
  const all = getContent();
  const item = all.find(c => c.id === id);
  if (!item) return;
  currentModalId = id;

  // Tracker historique
  addToHistory(item);

  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc-text').textContent = item.desc;

  const myList = DB.get('mylist') || {};
  const inList = myList[currentUser.id] && myList[currentUser.id].includes(id);
  const listBtn = document.getElementById('modal-list-btn');
  listBtn.textContent = inList ? '✓' : '+';
  listBtn.className = 'btn-icon-circle' + (inList ? ' in-list' : '');

  document.getElementById('modal-meta').innerHTML = `
    <span class="modal-match">${item.match}% concordance</span>
    <span>${item.year}</span>
    <span class="modal-tag">${item.type.toUpperCase()}</span>
    <span>${item.genre}</span>
  `;

  document.getElementById('modal-col-side').innerHTML = `
    <div><strong>Réalisateur : </strong><span>${item.director || 'N/A'}</span></div>
    <div><strong>Casting : </strong><span>${item.cast || 'N/A'}</span></div>
    <div><strong>Genre : </strong><span>${item.genre}</span></div>
    <div><strong>Année : </strong><span>${item.year}</span></div>
  `;

  // Bannière
  const banner = document.getElementById('modal-banner');
  banner.style.background = `linear-gradient(135deg, #1a0000 0%, #0d0d0d 100%)`;
  banner.querySelector('.modal-banner-grad').style.display = '';
  banner.style.color = 'rgba(229,9,20,0.07)';
  banner.firstChild.textContent = 'SMZ';

  // Similaires
  const similar = all.filter(c => c.id !== id && (c.genre === item.genre || c.type === item.type)).slice(0, 3);
  const sr = document.getElementById('similar-row');
  sr.innerHTML = '';
  similar.forEach(s => {
    const el = document.createElement('div');
    el.className = 'sim-card';
    el.innerHTML = `
      <div class="sim-thumb" style="background:#0d0d0d;">SMZ</div>
      <div class="sim-info">
        <div class="sim-title">${s.title}</div>
        <div class="sim-year">${s.year} · ${s.match}%</div>
      </div>
    `;
    el.onclick = () => openModal(s.id);
    sr.appendChild(el);
  });

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
  currentModalId = null;
}

function closeModalOutside(e) {
  if (e.target.id === 'modal-overlay') closeModal();
}

function toggleMyList() {
  if (!currentModalId) return;
  toggleListById(currentModalId, null);

  const myList = DB.get('mylist') || {};
  const inList = myList[currentUser.id] && myList[currentUser.id].includes(currentModalId);
  const btn = document.getElementById('modal-list-btn');
  btn.textContent = inList ? '✓' : '+';
  btn.className = 'btn-icon-circle' + (inList ? ' in-list' : '');
}

function toggleListById(id, btn) {
  const myList = DB.get('mylist') || {};
  if (!myList[currentUser.id]) myList[currentUser.id] = [];
  const idx = myList[currentUser.id].indexOf(id);
  if (idx >= 0) {
    myList[currentUser.id].splice(idx, 1);
    if (btn) { btn.textContent = '+'; btn.classList.remove('in-list'); }
  } else {
    myList[currentUser.id].push(id);
    if (btn) { btn.textContent = '✓'; btn.classList.add('in-list'); }
  }
  DB.set('mylist', myList);
}

function likeContent() { showToast('👍 Vous aimez ce contenu !'); }
function likeById(id) { showToast('👍 Ajouté à vos coups de cœur !'); }

function watchContent() {
  if (currentModalId) watchItem(currentModalId);
}

/* ══════════════════════
   LECTEUR VIDÉO (simulé)
══════════════════════ */
function watchItem(id) {
  const all = getContent();
  const item = all.find(c => c.id === id);
  if (!item) return;

  closeModal();
  document.getElementById('player-title-disp').textContent = item.title;

  // Incrémenter compteur visionnages
  const vc = (DB.get('views_count') || 0) + 1;
  DB.set('views_count', vc);

  addToHistory(item);

  document.getElementById('player-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Simuler progression
  playerProgress = 0;
  clearInterval(playerTimer);
  document.getElementById('prog-fill').style.width = '0%';
  document.getElementById('player-time').textContent = '0:00 / 1:48:00';

  playerTimer = setInterval(() => {
    playerProgress = Math.min(playerProgress + 0.5, 100);
    document.getElementById('prog-fill').style.width = playerProgress + '%';
    const elapsed = Math.round(playerProgress * 1.08 * 60);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    document.getElementById('player-time').textContent = `${m}:${s.toString().padStart(2,'0')} / 1:48:00`;
    if (playerProgress >= 100) clearInterval(playerTimer);
  }, 500);
}

function closePlayer() {
  clearInterval(playerTimer);
  document.getElementById('player-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function playerTogglePlay(btn) {
  btn.textContent = btn.textContent === '⏸' ? '▶' : '⏸';
}

/* ══════════════════════
   HISTORIQUE
══════════════════════ */
function addToHistory(item) {
  const hist = DB.get('history') || [];
  hist.unshift({
    id: item.id,
    title: item.title,
    type: item.type,
    userId: currentUser.id,
    userEmail: currentUser.email,
    date: new Date().toISOString()
  });
  DB.set('history', hist.slice(0, 200));
}

function renderHistory() {
  const hist = DB.get('history') || [];
  const mine = hist.filter(h => h.userId === currentUser.id);
  const el = document.getElementById('history-list');
  if (!mine.length) {
    el.innerHTML = '<p class="history-empty">Aucun historique pour l\'instant.</p>';
    return;
  }
  el.innerHTML = mine.map(h => `
    <div class="history-item">
      <div class="hi-thumb">SMZ</div>
      <div>
        <div class="hi-title">${h.title}</div>
        <div class="hi-meta">${h.type} · ${new Date(h.date).toLocaleDateString('fr-FR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════
   MA LISTE
══════════════════════ */
function renderMyList() {
  const myList = DB.get('mylist') || {};
  const ids = myList[currentUser.id] || [];
  const all = getContent();
  const el = document.getElementById('mylist-grid');

  if (!ids.length) {
    el.innerHTML = '<p class="mylist-empty">Votre liste est vide. Ajoutez des contenus en cliquant sur +</p>';
    return;
  }

  const items = ids.map(id => all.find(c => c.id === id)).filter(Boolean);
  el.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'mylist-card';
    card.innerHTML = `
      <div class="mylist-thumb">SMZ</div>
      <div class="mylist-info">
        <div class="mylist-title">${item.title}</div>
        <div class="mylist-sub">${item.year} · ${item.genre}</div>
      </div>
      <button class="mylist-remove" onclick="event.stopPropagation(); removeFromMyList('${item.id}')">✕</button>
    `;
    card.onclick = () => openModal(item.id);
    el.appendChild(card);
  });
}

function removeFromMyList(id) {
  toggleListById(id, null);
  renderMyList();
  showToast('Retiré de votre liste');
}

/* ══════════════════════
   RECHERCHE
══════════════════════ */
function toggleSearch() {
  searchOpen = !searchOpen;
  document.getElementById('search-bar').classList.toggle('hidden', !searchOpen);
  if (searchOpen) {
    closeAllDropdowns();
    setTimeout(() => document.getElementById('search-input').focus(), 100);
  }
}

function closeSearch() {
  searchOpen = false;
  document.getElementById('search-bar').classList.add('hidden');
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

function doSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  const res = document.getElementById('search-results');
  if (!q) { res.innerHTML = ''; return; }

  const all = getContent();
  const found = all.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.genre.toLowerCase().includes(q) ||
    (c.cast && c.cast.toLowerCase().includes(q)) ||
    (c.director && c.director.toLowerCase().includes(q))
  );

  if (!found.length) {
    res.innerHTML = '<p class="search-no-result">Aucun résultat pour "' + q + '"</p>';
    return;
  }

  res.innerHTML = found.slice(0, 8).map(c => `
    <div class="search-result-item" onclick="closeSearch(); openModal('${c.id}')">
      <div class="sri-thumb">SMZ</div>
      <div class="sri-info">
        <div class="sri-title">${c.title}</div>
        <div class="sri-meta">${c.year} · ${c.type} · ${c.genre} · ${c.match}%</div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════
   PROFIL — DROPDOWN
══════════════════════ */
function toggleProfileMenu() {
  profileMenuOpen = !profileMenuOpen;
  document.getElementById('profile-dropdown').classList.toggle('hidden', !profileMenuOpen);
  if (profileMenuOpen) {
    notifMenuOpen = false;
    document.getElementById('notif-dropdown').classList.add('hidden');
  }
}

function toggleNotifs() {
  notifMenuOpen = !notifMenuOpen;
  document.getElementById('notif-dropdown').classList.toggle('hidden', !notifMenuOpen);
  if (notifMenuOpen) {
    profileMenuOpen = false;
    document.getElementById('profile-dropdown').classList.add('hidden');
    renderNotifs();
  }
}

function closeAllDropdowns() {
  profileMenuOpen = false;
  notifMenuOpen = false;
  document.getElementById('profile-dropdown').classList.add('hidden');
  document.getElementById('notif-dropdown').classList.add('hidden');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-profile') && !e.target.closest('#profile-dropdown')) {
    profileMenuOpen = false;
    document.getElementById('profile-dropdown')?.classList.add('hidden');
  }
  if (!e.target.closest('.notif-btn') && !e.target.closest('#notif-dropdown')) {
    notifMenuOpen = false;
    document.getElementById('notif-dropdown')?.classList.add('hidden');
  }
});

/* ══════════════════════
   PROFIL — ÉDITION
══════════════════════ */
const AVATARS = ['😎','🎬','🔥','⚡','🛡️','🎭','🌙','🦅','🎯','🏆','💀','🌹','🎸','🚀','💎','🐉'];

function openProfileEdit() {
  closeAllDropdowns();

  document.getElementById('pe-pseudo').value = currentUser.pseudo || '';
  document.getElementById('pe-bio').value = currentUser.bio || '';
  document.getElementById('pe-pw').value = '';
  document.getElementById('pe-err').textContent = '';
  selectedAvatar = currentUser.avatar;

  // Avatar actuel
  renderAvatarEl(document.getElementById('pe-avatar'), currentUser);

  // Grille d'avatars
  const grid = document.getElementById('avatar-choices');
  grid.innerHTML = '';
  AVATARS.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'av-choice' + (currentUser.avatar === emoji && currentUser.avatarType === 'emoji' ? ' selected' : '');
    btn.textContent = emoji;
    btn.onclick = () => {
      selectedAvatar = emoji;
      document.querySelectorAll('.av-choice').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const prev = document.getElementById('pe-avatar');
      prev.textContent = emoji;
      prev.style.fontSize = '2.5rem';
    };
    grid.appendChild(btn);
  });

  document.getElementById('profile-modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProfileEdit() {
  document.getElementById('profile-modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function closeProfileOutside(e) {
  if (e.target.id === 'profile-modal-overlay') closeProfileEdit();
}

function saveProfile() {
  const pseudo = document.getElementById('pe-pseudo').value.trim();
  const bio = document.getElementById('pe-bio').value.trim();
  const pw = document.getElementById('pe-pw').value;
  const errEl = document.getElementById('pe-err');

  if (!pseudo) { errEl.textContent = 'Le pseudo ne peut pas être vide.'; return; }
  if (pw && pw.length < 6) { errEl.textContent = 'Mot de passe trop court (6 caractères min).'; return; }

  const users = DB.get('users') || [];
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx < 0) return;

  users[idx].pseudo = pseudo;
  users[idx].bio = bio;
  if (pw) users[idx].password = pw;
  if (selectedAvatar) {
    users[idx].avatar = selectedAvatar;
    users[idx].avatarType = 'emoji';
  }

  DB.set('users', users);
  currentUser = users[idx];

  renderNavAvatar();
  document.getElementById('nav-username').textContent = pseudo;
  closeProfileEdit();
  showToast('✅ Profil mis à jour !');
}

/* ══════════════════════
   NOTIFICATIONS
══════════════════════ */
function addNotification(userId, notif) {
  const notifs = DB.get('notifications') || {};
  if (!notifs[userId]) notifs[userId] = [];
  notifs[userId].unshift({ ...notif, read: false, id: Date.now() });
  DB.set('notifications', notifs);
  refreshNotifBadge();
}

function refreshNotifBadge() {
  const notifs = DB.get('notifications') || {};
  const mine = notifs[currentUser?.id] || [];
  const unread = mine.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  if (badge) badge.textContent = unread;
  if (badge) badge.style.display = unread > 0 ? 'flex' : 'none';
}

function renderNotifs() {
  const notifs = DB.get('notifications') || {};
  const mine = notifs[currentUser.id] || [];
  const el = document.getElementById('notif-list');

  if (!mine.length) {
    el.innerHTML = '<p class="notif-empty">Aucune notification</p>';
    return;
  }

  el.innerHTML = mine.slice(0, 10).map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}">
      <div class="notif-item-from">${n.from}</div>
      <div>${n.text}</div>
    </div>
  `).join('');

  // Marquer comme lues
  mine.forEach(n => n.read = true);
  notifs[currentUser.id] = mine;
  DB.set('notifications', notifs);
  refreshNotifBadge();
}

/* ══════════════════════
   ADMIN
══════════════════════ */
function initAdminIfNeeded() {
  if (currentUser.role !== 'admin') return;
  refreshAdminPanel();
}

function refreshAdminPanel() {
  if (currentUser.role !== 'admin') return;

  const users = DB.get('users') || [];
  const hist = DB.get('history') || [];
  const msgs = DB.get('admin_messages') || [];

  // Stats
  document.getElementById('stat-users').textContent = users.length;
  document.getElementById('stat-banned').textContent = users.filter(u => u.banned).length;
  document.getElementById('stat-views').textContent = DB.get('views_count') || 0;
  document.getElementById('stat-logins').textContent = DB.get('logins_count') || 0;
  document.getElementById('admin-user-count').textContent = users.length + ' utilisateur' + (users.length > 1 ? 's' : '');
  document.getElementById('hist-count').textContent = hist.length;

  // Liste utilisateurs
  const ul = document.getElementById('admin-users-list');
  ul.innerHTML = '';
  users.forEach(u => {
    const row = document.createElement('div');
    row.className = 'user-row';
    const isMe = u.id === currentUser.id;
    row.innerHTML = `
      <div class="user-av">${u.avatarType === 'emoji' ? u.avatar : u.pseudo[0]?.toUpperCase() || '?'}</div>
      <div class="user-info">
        <div class="user-email">${u.email}</div>
        <div class="user-since">Inscrit le ${new Date(u.createdAt).toLocaleDateString('fr-FR')}</div>
      </div>
      <span class="user-role ${u.banned ? 'banned' : u.role}">${u.banned ? 'Bloqué' : u.role === 'admin' ? 'Admin' : 'Membre'}</span>
      <div class="user-actions">
        ${!isMe ? `
          <button class="ua-btn ${u.role === 'admin' ? 'red' : 'green'}" onclick="toggleAdminRole('${u.id}')">
            ${u.role === 'admin' ? 'Rétrograder' : 'Promouvoir Admin'}
          </button>
          <button class="ua-btn red" onclick="toggleBan('${u.id}')">
            ${u.banned ? 'Débloquer' : 'Bloquer'}
          </button>
          <button class="ua-btn red" onclick="deleteUser('${u.id}')">Supprimer</button>
        ` : '<span style="font-size:0.75rem;color:var(--muted);">(vous)</span>'}
      </div>
    `;
    ul.appendChild(row);
  });

  // Sélect message destinataire
  const sel = document.getElementById('msg-target');
  sel.innerHTML = users.filter(u => u.id !== currentUser.id).map(u => `
    <option value="${u.id}">${u.email}</option>
  `).join('');

  // Messages envoyés
  const sentEl = document.getElementById('admin-msgs-sent');
  const myMsgs = msgs.filter(m => m.fromId === currentUser.id);
  sentEl.innerHTML = myMsgs.length
    ? myMsgs.slice(-5).reverse().map(m => `
        <div class="msg-item">
          <div class="msg-item-to">→ ${m.toEmail}</div>
          <div>${m.text}</div>
        </div>
      `).join('')
    : '<p style="color:var(--muted);font-size:0.82rem;margin-top:0.5rem;">Aucun message envoyé.</p>';

  // Historique global
  const tb = document.getElementById('admin-history-table');
  tb.innerHTML = hist.slice(0, 50).map((h, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${h.userEmail}</td>
      <td>${h.title}</td>
      <td><span class="type-pill ${h.type}">${h.type}</span></td>
      <td>${new Date(h.date).toLocaleString('fr-FR')}</td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="color:var(--muted);text-align:center;padding:1rem;">Aucun historique</td></tr>';
}

function toggleAdminRole(userId) {
  const users = DB.get('users') || [];
  const idx = users.findIndex(u => u.id === userId);
  if (idx < 0) return;
  users[idx].role = users[idx].role === 'admin' ? 'member' : 'admin';
  DB.set('users', users);
  refreshAdminPanel();
  showToast('Rôle mis à jour');
}

function toggleBan(userId) {
  const users = DB.get('users') || [];
  const idx = users.findIndex(u => u.id === userId);
  if (idx < 0) return;
  users[idx].banned = !users[idx].banned;
  DB.set('users', users);
  refreshAdminPanel();
  showToast(users[idx].banned ? '🚫 Utilisateur bloqué' : '✅ Utilisateur débloqué');
}

function deleteUser(userId) {
  if (!confirm('Supprimer définitivement cet utilisateur ?')) return;
  const users = DB.get('users') || [];
  DB.set('users', users.filter(u => u.id !== userId));
  refreshAdminPanel();
  showToast('🗑️ Utilisateur supprimé');
}

function addContent() {
  const title = document.getElementById('ac-title').value.trim();
  const type = document.getElementById('ac-type').value;
  const genre = document.getElementById('ac-genre').value.trim();
  const year = parseInt(document.getElementById('ac-year').value) || new Date().getFullYear();
  const desc = document.getElementById('ac-desc').value.trim();

  if (!title) { showToast('⚠️ Titre requis', true); return; }

  const content = getContent();
  const newItem = {
    id: 'custom_' + Date.now(),
    title, type, genre: genre || 'Divers', year,
    desc: desc || 'Aucune description disponible.',
    match: Math.floor(Math.random() * 15) + 85,
    cast: 'SMZ Production',
    director: 'SMZ Studios'
  };

  content.push(newItem);
  DB.set('content', content);

  // Vider le formulaire
  ['ac-title','ac-genre','ac-year','ac-desc'].forEach(id => document.getElementById(id).value = '');

  initContent();
  showToast('✅ Contenu "' + title + '" ajouté !');
  refreshAdminPanel();
}

function sendAdminMsg() {
  const toId = document.getElementById('msg-target').value;
  const text = document.getElementById('msg-content').value.trim();
  if (!text) { showToast('⚠️ Message vide', true); return; }

  const users = DB.get('users') || [];
  const toUser = users.find(u => u.id === toId);
  if (!toUser) return;

  const msgs = DB.get('admin_messages') || [];
  msgs.push({
    fromId: currentUser.id,
    fromEmail: currentUser.email,
    toId,
    toEmail: toUser.email,
    text,
    date: new Date().toISOString()
  });
  DB.set('admin_messages', msgs);

  // Notif pour le destinataire
  addNotification(toId, {
    from: currentUser.pseudo + ' (Admin)',
    text,
    date: new Date().toISOString()
  });

  document.getElementById('msg-content').value = '';
  refreshAdminPanel();
  showToast('📨 Message envoyé à ' + toUser.pseudo);
}

/* ══════════════════════
   UTILITAIRES
══════════════════════ */
let toastTimer = null;
function showToast(msg, isError = false) {
  let toast = document.getElementById('smz-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'smz-toast';
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
      z-index: 9999; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 0.75rem 1.5rem; border-radius: 8px;
      font-family: 'Montserrat', sans-serif; font-size: 0.9rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      transition: opacity 0.3s; pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderColor = isError ? 'rgba(255,68,68,0.4)' : 'rgba(229,9,20,0.3)';
  toast.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.style.opacity = '0', 3000);
}

// Touches clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closePlayer();
    closeProfileEdit();
    closeSearch();
    closeAllDropdowns();
  }
});
