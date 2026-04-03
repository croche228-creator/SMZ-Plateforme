/* ================================
   CINÉSTREAM — script.js
   ================================ */

// ===== DONNÉES DU CATALOGUE =====
const MOVIES = [
  // Hero / Featured
  { id: 1,  title: 'Interstellar',       year: 2014, duration: '2h 49min', age: 'PG-13', match: 98, genre: ['scifi','trending'], desc: "Un groupe d'explorateurs franchit un couloir spatio-temporel pour conquérir les distances de l'univers et sauver l'humanité.", director: 'Christopher Nolan', cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', color: '#1a2a4a', emoji: '🌌' },
  { id: 2,  title: 'Dune',               year: 2021, duration: '2h 35min', age: 'PG-13', match: 96, genre: ['scifi','trending','action'], desc: "Paul Atreides, un jeune homme doué, voyage vers la planète la plus dangereuse de l'univers pour assurer l'avenir de sa famille.", director: 'Denis Villeneuve', cast: 'Timothée Chalamet, Zendaya, Oscar Isaac', color: '#3a2a0a', emoji: '🏜️' },
  { id: 3,  title: 'Oppenheimer',        year: 2023, duration: '3h',       age: 'R',     match: 97, genre: ['drama','trending'], desc: "L'histoire du physicien J. Robert Oppenheimer qui a dirigé le développement de la première bombe atomique.", director: 'Christopher Nolan', cast: 'Cillian Murphy, Emily Blunt, Matt Damon', color: '#2a1a0a', emoji: '☢️' },
  { id: 4,  title: 'Avatar 2',           year: 2022, duration: '3h 12min', age: 'PG-13', match: 91, genre: ['action','scifi'], desc: "Jake Sully et Neytiri ont fondé une famille. Quand une menace familière surgit, ils doivent quitter leur foyer et explorer les régions de Pandora.", director: 'James Cameron', cast: 'Sam Worthington, Zoe Saldana, Sigourney Weaver', color: '#0a2a2a', emoji: '🌊' },
  { id: 5,  title: 'The Batman',         year: 2022, duration: '2h 56min', age: 'PG-13', match: 94, genre: ['action','trending'], desc: "Dans sa deuxième année de lutte contre le crime, Batman démêle la corruption qui ronge Gotham City.", director: 'Matt Reeves', cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano', color: '#0a0a1a', emoji: '🦇' },
  { id: 6,  title: 'Top Gun: Maverick',  year: 2022, duration: '2h 11min', age: 'PG-13', match: 97, genre: ['action','trending'], desc: "Après plus de trente ans de carrière, Pete Maverick repousse encore les limites en tant que pilote d'essai.", director: 'Joseph Kosinski', cast: 'Tom Cruise, Miles Teller, Jennifer Connelly', color: '#0a1a2a', emoji: '✈️' },
  { id: 7,  title: 'Everything Everywhere', year: 2022, duration: '2h 19min', age: 'R', match: 95, genre: ['scifi','drama'], desc: "Une lavandière sino-américaine en guerre contre l'IRS doit se connecter à des vies parallèles pour sauver le multivers.", director: 'The Daniels', cast: 'Michelle Yeoh, Ke Huy Quan, Jamie Lee Curtis', color: '#2a0a2a', emoji: '🌀' },
  { id: 8,  title: 'John Wick 4',        year: 2023, duration: '2h 49min', age: 'R',    match: 93, genre: ['action'], desc: "John Wick découvre un chemin vers sa liberté mais doit d'abord défier la Table, une organisation criminelle toute puissante.", director: 'Chad Stahelski', cast: 'Keanu Reeves, Donnie Yen, Bill Skarsgård', color: '#1a1a0a', emoji: '🔫' },
  { id: 9,  title: 'Past Lives',         year: 2023, duration: '1h 46min', age: 'PG-13', match: 99, genre: ['drama'], desc: "Deux amis d'enfance coréens se retrouvent à New York vingt ans après s'être séparés, confrontés à leurs destins et à ce qui aurait pu être.", director: 'Celine Song', cast: 'Greta Lee, Teo Yoo, John Magaro', color: '#0a1a1a', emoji: '🌸' },
  { id: 10, title: 'Killers of the Flower Moon', year: 2023, duration: '3h 26min', age: 'R', match: 96, genre: ['drama'], desc: "Dans les années 1920, des membres de la nation Osage sont assassinés après la découverte de pétrole sur leurs terres.", director: 'Martin Scorsese', cast: 'Leonardo DiCaprio, Robert De Niro, Lily Gladstone', color: '#1a0a0a', emoji: '🌾' },
  { id: 11, title: 'Barbie',             year: 2023, duration: '1h 54min', age: 'PG-13', match: 92, genre: ['trending','drama'], desc: "Barbie souffre d'une crise existentielle et doit voyager dans le monde réel avec Ken pour comprendre le sens de la vie.", director: 'Greta Gerwig', cast: 'Margot Robbie, Ryan Gosling, America Ferrera', color: '#2a0a1a', emoji: '👠' },
  { id: 12, title: 'Blade Runner 2049',  year: 2017, duration: '2h 43min', age: 'R',    match: 95, genre: ['scifi','drama'], desc: "Un jeune blade runner découvre un secret enfoui depuis longtemps qui pourrait plonger la société dans le chaos.", director: 'Denis Villeneuve', cast: 'Ryan Gosling, Harrison Ford, Ana de Armas', color: '#1a1a2a', emoji: '🤖' },
  { id: 13, title: 'Mad Max: Fury Road', year: 2015, duration: '2h',       age: 'R',    match: 97, genre: ['action','classics'], desc: "Dans un monde post-apocalyptique, Max s'allie à Furiosa pour fuir un chef tyrannique dans une course-poursuite épique.", director: 'George Miller', cast: 'Tom Hardy, Charlize Theron, Nicholas Hoult', color: '#2a1a0a', emoji: '🔥' },
  { id: 14, title: 'Parasite',           year: 2019, duration: '2h 12min', age: 'R',    match: 99, genre: ['drama','classics'], desc: "La famille Kim, sans emploi, infiltre peu à peu la riche famille Park — jusqu'à ce qu'un incident inattendu déclenche une série d'événements.", director: 'Bong Joon-ho', cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong', color: '#0a1a0a', emoji: '🏚️' },
  { id: 15, title: 'The Dark Knight',    year: 2008, duration: '2h 32min', age: 'PG-13', match: 99, genre: ['action','classics'], desc: "Batman affronte le Joker, un criminel qui plonge Gotham City dans l'anarchie et teste les limites morales du héros.", director: 'Christopher Nolan', cast: 'Christian Bale, Heath Ledger, Aaron Eckhart', color: '#0a0a0a', emoji: '🃏' },
  { id: 16, title: 'Pulp Fiction',       year: 1994, duration: '2h 34min', age: 'R',    match: 98, genre: ['drama','classics'], desc: "Les histoires entremêlées de criminels à Los Angeles : deux tueurs à gages, un boxeur, un gangster et sa femme.", director: 'Quentin Tarantino', cast: 'John Travolta, Samuel L. Jackson, Uma Thurman', color: '#1a0a0a', emoji: '💼' },
  { id: 17, title: 'Inception',          year: 2010, duration: '2h 28min', age: 'PG-13', match: 97, genre: ['scifi','action','classics'], desc: "Un voleur qui s'infiltre dans les rêves doit accomplir la tâche inverse : implanter une idée dans l'esprit d'un PDG.", director: 'Christopher Nolan', cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page', color: '#0a1a2a', emoji: '🌀' },
  { id: 18, title: 'Gladiator',          year: 2000, duration: '2h 35min', age: 'R',    match: 96, genre: ['action','classics'], desc: "Un général romain trahi est réduit en esclavage. Il devient gladiateur et cherche à se venger de l'usurpateur du trône.", director: 'Ridley Scott', cast: 'Russell Crowe, Joaquin Phoenix, Connie Nielsen', color: '#2a1a0a', emoji: '⚔️' },
  { id: 19, title: 'La La Land',         year: 2016, duration: '2h 8min',  age: 'PG-13', match: 94, genre: ['drama'], desc: "Un pianiste de jazz et une aspirante actrice tombent amoureux à Los Angeles, mais leurs ambitions mettent leur relation à l'épreuve.", director: 'Damien Chazelle', cast: 'Ryan Gosling, Emma Stone, John Legend', color: '#1a0a2a', emoji: '🎷' },
  { id: 20, title: 'Arrival',            year: 2016, duration: '1h 56min', age: 'PG-13', match: 96, genre: ['scifi','drama'], desc: "Une linguiste est recrutée par l'armée pour communiquer avec des extraterrestres qui viennent d'atterrir sur Terre.", director: 'Denis Villeneuve', cast: 'Amy Adams, Jeremy Renner, Forest Whitaker', color: '#0a2a1a', emoji: '🛸' },
];

// Films featured au héro
const HERO_MOVIES = [MOVIES[0], MOVIES[2], MOVIES[1], MOVIES[5], MOVIES[16]];

// Rangées
const ROWS = {
  'row-trending': MOVIES.filter(m => m.genre.includes('trending')).concat(MOVIES.slice(0,6)),
  'row-action':   MOVIES.filter(m => m.genre.includes('action')),
  'row-scifi':    MOVIES.filter(m => m.genre.includes('scifi')),
  'row-drama':    MOVIES.filter(m => m.genre.includes('drama')),
  'row-classics': MOVIES.filter(m => m.genre.includes('classics')),
};

// ===== STATE =====
let heroIndex = 0;
let heroTimer = null;
let myList = new Set();

// ===== HERO =====
function renderHero(idx) {
  const m = HERO_MOVIES[idx];
  document.getElementById('hero-bg').style.cssText = `
    background: radial-gradient(ellipse at 70% 40%, ${m.color}88 0%, #0a0a0a 70%);
    font-size: 12rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8%;
    color: transparent;
    text-shadow: 0 0 0 rgba(255,255,255,0.03);
  `;
  document.getElementById('hero-bg').textContent = m.emoji;
  document.getElementById('hero-bg').style.fontSize = '14rem';
  document.getElementById('hero-bg').style.color = 'rgba(255,255,255,0.04)';
  document.getElementById('hero-bg').style.fontFamily = 'serif';

  document.getElementById('hero-title').textContent = m.title.toUpperCase();
  document.getElementById('hero-desc').textContent = m.desc;
  document.getElementById('hero-meta').innerHTML = `
    <span class="meta-match">${m.match}% concordance</span>
    <span>${m.year}</span>
    <span class="meta-tag">${m.age}</span>
    <span>${m.duration}</span>
  `;

  // Dots
  const dots = document.getElementById('hero-dots');
  dots.innerHTML = '';
  HERO_MOVIES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'hero-dot' + (i === idx ? ' active' : '');
    d.onclick = () => goHero(i);
    dots.appendChild(d);
  });

  // Buttons
  document.getElementById('hero-play-btn').onclick = () => openModal(m.id);
  document.getElementById('hero-info-btn').onclick = () => openModal(m.id);
}

function goHero(idx) {
  heroIndex = (idx + HERO_MOVIES.length) % HERO_MOVIES.length;
  renderHero(heroIndex);
  resetHeroTimer();
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goHero(heroIndex + 1), 7000);
}

document.getElementById('hero-prev').onclick = () => goHero(heroIndex - 1);
document.getElementById('hero-next-btn').onclick = () => goHero(heroIndex + 1);

renderHero(0);
resetHeroTimer();

// ===== CARDS =====
function createCard(movie, rowId) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-inner" style="background: ${movie.color};">
      <div class="card-thumb">${movie.emoji}</div>
      <div class="card-overlay">
        <div class="card-name">${movie.title}</div>
        <div class="card-year">${movie.year}</div>
      </div>
    </div>
    <div class="card-popup">
      <button class="card-popup-play" title="Lecture">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
      <button class="card-popup-add" title="Ajouter à ma liste" data-id="${movie.id}">
        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <span class="card-match">${movie.match}%</span>
    </div>
  `;

  card.onclick = (e) => {
    if (!e.target.closest('.card-popup-add')) openModal(movie.id);
  };

  card.querySelector('.card-popup-play').onclick = (e) => {
    e.stopPropagation();
    openModal(movie.id);
  };

  card.querySelector('.card-popup-add').onclick = (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const id = parseInt(btn.dataset.id);
    if (myList.has(id)) {
      myList.delete(id);
      btn.innerHTML = `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
      btn.style.borderColor = '';
    } else {
      myList.add(id);
      btn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
      btn.style.borderColor = '#46d369';
      btn.style.color = '#46d369';
    }
  };

  return card;
}

function renderRows() {
  Object.entries(ROWS).forEach(([rowId, movies]) => {
    const container = document.getElementById('cards-' + rowId);
    if (!container) return;
    movies.forEach(m => container.appendChild(createCard(m, rowId)));
  });
}
renderRows();

// ===== SCROLL ROWS =====
document.querySelectorAll('.row-arrow').forEach(btn => {
  btn.addEventListener('click', () => {
    const rowId = btn.dataset.row;
    const dir = parseInt(btn.dataset.dir);
    const container = document.getElementById('cards-' + rowId);
    if (container) container.scrollBy({ left: dir * 600, behavior: 'smooth' });
  });
});

// ===== MODAL =====
function openModal(movieId) {
  const m = MOVIES.find(x => x.id === movieId) || MOVIES[0];

  document.getElementById('modal-title').textContent = m.title;
  document.getElementById('modal-desc').textContent = m.desc;
  document.getElementById('modal-meta-row').innerHTML = `
    <span class="modal-match">${m.match}% concordance</span>
    <span>${m.year}</span>
    <span class="modal-badge">${m.age}</span>
    <span>${m.duration}</span>
  `;
  document.getElementById('modal-col-right').innerHTML = `
    <div class="modal-detail"><strong>Réalisateur :</strong> ${m.director}</div>
    <div class="modal-detail"><strong>Avec :</strong> ${m.cast}</div>
    <div class="modal-detail"><strong>Genres :</strong> ${m.genre.join(', ')}</div>
  `;

  const banner = document.getElementById('modal-banner');
  banner.style.background = `radial-gradient(ellipse at 60% 40%, ${m.color}99 0%, #0d0d0d 80%)`;
  banner.style.fontSize = '10rem';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'flex-end';
  banner.style.paddingRight = '10%';
  banner.style.color = 'rgba(255,255,255,0.06)';
  banner.style.fontFamily = 'serif';
  banner.querySelector('.modal-banner-gradient').textContent = m.emoji;

  document.getElementById('modal-play-btn').onclick = () => {
    alert(`▶ Lecture de "${m.title}" — Fonctionnalité de démonstration !`);
  };

  // Similaires
  const similar = MOVIES.filter(x => x.id !== m.id && x.genre.some(g => m.genre.includes(g))).slice(0, 6);
  const grid = document.getElementById('similar-grid');
  grid.innerHTML = '';
  similar.forEach(s => {
    const card = document.createElement('div');
    card.className = 'similar-card';
    card.innerHTML = `
      <div class="similar-thumb" style="background:${s.color};">${s.emoji}</div>
      <div class="similar-info">
        <div class="similar-title">${s.title}</div>
        <div class="similar-year">${s.year} · ${s.match}%</div>
      </div>
    `;
    card.onclick = () => openModal(s.id);
    grid.appendChild(card);
  });

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-overlay').onclick = (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
};
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ===== SEARCH =====
const searchInput = document.getElementById('search-input');
const searchToggle = document.getElementById('search-toggle');
const searchWrap = document.getElementById('search-wrap');
let searchOpen = false;

searchToggle.addEventListener('click', () => {
  searchOpen = !searchOpen;
  searchWrap.classList.toggle('open', searchOpen);
  if (searchOpen) {
    searchInput.focus();
  } else {
    searchInput.value = '';
    clearSearch();
  }
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const section = document.getElementById('search-section');
  const grid = document.getElementById('search-grid');

  if (!q) { clearSearch(); return; }

  const results = MOVIES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genre.some(g => g.includes(q)) ||
    m.cast.toLowerCase().includes(q) ||
    m.director.toLowerCase().includes(q)
  );

  section.style.display = 'block';
  grid.innerHTML = '';

  if (results.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);font-size:0.9rem;">Aucun résultat pour "' + q + '"</p>';
    return;
  }

  results.forEach(m => {
    const card = document.createElement('div');
    card.className = 'search-card';
    card.innerHTML = `
      <div class="search-card-thumb" style="background:${m.color};">${m.emoji}</div>
      <div class="search-card-info">
        <div class="search-card-title">${m.title}</div>
        <div class="search-card-year">${m.year} · ${m.match}%</div>
      </div>
    `;
    card.onclick = () => openModal(m.id);
    grid.appendChild(card);
  });

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function clearSearch() {
  document.getElementById('search-section').style.display = 'none';
  document.getElementById('search-grid').innerHTML = '';
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
