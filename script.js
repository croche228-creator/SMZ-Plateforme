const state = {
  currentScreen: "intro",
  currentUser: null,
  movieFilter: "",
  profileMenuOpen: false,
};

const DB = {
  admins: [
    { email: "SorenHamon@FLASHBACKWL", password: "admin-smz-1", role: "admin" },
    { email: "ZayioWilliams@FLASHBACKWL", password: "admin-smz-2", role: "admin" },
  ],
  users: [
    { email: "User01@FLASHBACKWL", password: "user-smz-01", role: "user" },
    { email: "User02@FLASHBACKWL", password: "user-smz-02", role: "user" },
    { email: "User03@FLASHBACKWL", password: "user-smz-03", role: "user" },
    { email: "User04@FLASHBACKWL", password: "user-smz-04", role: "user" },
    { email: "User05@FLASHBACKWL", password: "user-smz-05", role: "user" },
    { email: "User06@FLASHBACKWL", password: "user-smz-06", role: "user" },
    { email: "User07@FLASHBACKWL", password: "user-smz-07", role: "user" },
    { email: "User08@FLASHBACKWL", password: "user-smz-08", role: "user" },
    { email: "User09@FLASHBACKWL", password: "user-smz-09", role: "user" },
    { email: "User10@FLASHBACKWL", password: "user-smz-10", role: "user" },
    { email: "User11@FLASHBACKWL", password: "user-smz-11", role: "user" },
    { email: "User12@FLASHBACKWL", password: "user-smz-12", role: "user" },
    { email: "User13@FLASHBACKWL", password: "user-smz-13", role: "user" },
    { email: "User14@FLASHBACKWL", password: "user-smz-14", role: "user" },
    { email: "User15@FLASHBACKWL", password: "user-smz-15", role: "user" },
  ],
  movies: [
    { id: 1, title: "Nightfall Genesis", genre: "Action", year: 2024, rating: 8.7 },
    { id: 2, title: "Silent Pulse", genre: "Thriller", year: 2023, rating: 8.5 },
    { id: 3, title: "Violet Horizon", genre: "Sci-Fi", year: 2025, rating: 9.1 },
    { id: 4, title: "Last Echo", genre: "Drama", year: 2022, rating: 8.2 },
    { id: 5, title: "Darkline", genre: "Crime", year: 2025, rating: 8.8 },
    { id: 6, title: "Afterlight", genre: "Mystery", year: 2021, rating: 8.0 },
    { id: 7, title: "Glass Reborn", genre: "Fantasy", year: 2024, rating: 8.4 },
    { id: 8, title: "Code of Ashes", genre: "Action", year: 2020, rating: 7.9 },
    { id: 9, title: "Neon Relic", genre: "Adventure", year: 2023, rating: 8.3 },
    { id: 10, title: "Final Orbit", genre: "Sci-Fi", year: 2024, rating: 8.6 },
    { id: 11, title: "Nocturne City", genre: "Drama", year: 2025, rating: 8.1 },
    { id: 12, title: "Seventh Signal", genre: "Thriller", year: 2022, rating: 7.8 },
  ],
  onlineStatus: {},
};

// INSERER URL YOUTUBE ICI (audio intro desactive par defaut)
// const introYoutubeUrl = "";

const screens = {
  intro: document.getElementById("intro-screen"),
  login: document.getElementById("login-screen"),
  home: document.getElementById("home-screen"),
};

const elements = {
  startBtn: document.getElementById("start-btn"),
  loginForm: document.getElementById("login-form"),
  loginError: document.getElementById("login-error"),
  searchInput: document.getElementById("search-input"),
  moviesGrid: document.getElementById("movies-grid"),
  top10Grid: document.getElementById("top10-grid"),
  profileWrap: document.querySelector(".profile-wrap"),
  profileButton: document.getElementById("profile-button"),
  profileMenu: document.getElementById("profile-menu"),
  profileAvatar: document.getElementById("profile-avatar"),
  profileName: document.getElementById("profile-name"),
  avatarUpload: document.getElementById("avatar-upload"),
  openPaymentBtn: document.getElementById("open-payment"),
  openAdminBtn: document.getElementById("open-admin"),
  logoutBtn: document.getElementById("logout-btn"),
  paymentPanel: document.getElementById("payment-panel"),
  adminPanel: document.getElementById("admin-panel"),
  overlay: document.getElementById("overlay"),
  heroTitle: document.getElementById("hero-title"),
  heroDescription: document.getElementById("hero-description"),
  adminUsersList: document.getElementById("admin-users-list"),
};

const EMAIL_FORMAT = /^[A-Za-z]+[A-Za-z0-9]*@FLASHBACKWL$/;
const defaultAvatar =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiM4YTJiZTIiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjU3IiByPSIyNiIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjM1IiB5PSI5MiIgd2lkdGg9IjgwIiBoZWlnaHQ9IjM4IiByeD0iMTkiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";

function bootstrap() {
  seedStatuses();
  showScreen("intro");
  elements.profileAvatar.src = defaultAvatar;
  elements.startBtn.disabled = true;
  elements.startBtn.textContent = "Chargement...";

  setTimeout(() => {
    elements.startBtn.disabled = false;
    elements.startBtn.textContent = "Commencer";
    elements.startBtn.focus();
  }, 3000);

  bindEvents();
}

function seedStatuses() {
  [...DB.admins, ...DB.users].forEach((user) => {
    DB.onlineStatus[user.email] = false;
  });
}

function bindEvents() {
  elements.startBtn.addEventListener("click", () => showScreen("login"));

  elements.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin();
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.movieFilter = event.target.value.trim().toLowerCase();
    renderMovies();
  });

  elements.profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    state.profileMenuOpen = !state.profileMenuOpen;
    elements.profileMenu.classList.toggle("hidden", !state.profileMenuOpen);
    elements.profileButton.setAttribute("aria-expanded", String(state.profileMenuOpen));
  });

  elements.avatarUpload.addEventListener("change", handleAvatarUpload);
  elements.openPaymentBtn.addEventListener("click", () => openPanel("payment"));
  elements.openAdminBtn.addEventListener("click", () => openPanel("admin"));
  elements.logoutBtn.addEventListener("click", logout);

  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", () => closePanels());
  });
  elements.overlay.addEventListener("click", closePanels);

  document.addEventListener("click", (event) => {
    if (!elements.profileWrap?.contains(event.target)) {
      closeProfileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanels();
      closeProfileMenu();
    }
  });
}

function showScreen(screenName) {
  Object.entries(screens).forEach(([name, node]) => {
    node.classList.toggle("hidden", name !== screenName);
    node.classList.toggle("active", name === screenName);
  });
  state.currentScreen = screenName;
}

function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!EMAIL_FORMAT.test(email)) {
    elements.loginError.textContent = "Email invalide: format impose @FLASHBACKWL uniquement.";
    return;
  }

  const account = [...DB.admins, ...DB.users].find(
    (user) => user.email === email && user.password === password
  );

  if (!account) {
    elements.loginError.textContent = "Identifiants incorrects. Verification refusee.";
    return;
  }

  elements.loginError.textContent = "";
  state.currentUser = {
    email: account.email,
    role: account.role,
    avatar: defaultAvatar,
  };

  DB.onlineStatus[account.email] = true;
  updateProfileUI();
  renderHome();
  showScreen("home");
}

function updateProfileUI() {
  if (!state.currentUser) return;
  const pseudo = state.currentUser.email.split("@")[0];
  elements.profileName.textContent = pseudo;
  elements.profileAvatar.src = state.currentUser.avatar || defaultAvatar;
  elements.openAdminBtn.classList.toggle("hidden", state.currentUser.role !== "admin");
}

function renderHome() {
  const best = [...DB.movies].sort((a, b) => b.rating - a.rating)[0];
  elements.heroTitle.textContent = `${best.title} (${best.year})`;
  elements.heroDescription.textContent = `Genre: ${best.genre} · Note: ${best.rating}/10`;
  const hero = document.querySelector(".hero-backdrop");
  const glowA = Math.floor(40 + Math.random() * 290);
  const glowB = Math.floor(40 + Math.random() * 290);
  hero.style.background = `linear-gradient(to right, #000000f2 35%, #00000085 55%, #00000033),
    linear-gradient(120deg, hsl(${glowA} 95% 62% / 0.34), transparent 65%),
    radial-gradient(600px 280px at 65% 40%, hsl(${glowB} 90% 64% / 0.18), transparent),
    #0a0a0a`;
  renderMovies();
  renderTop10();
}

function getFilteredMovies() {
  return DB.movies.filter((movie) =>
    movie.title.toLowerCase().includes(state.movieFilter) ||
    movie.genre.toLowerCase().includes(state.movieFilter)
  );
}

function renderMovies() {
  const movies = getFilteredMovies();
  elements.moviesGrid.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.background = movieGradient(movie.id);
    card.innerHTML = `
      <h4 class="movie-title">${movie.title}</h4>
      <p class="movie-meta">${movie.genre} · ${movie.year} · ${movie.rating}/10</p>
      <div class="movie-actions">
        <button class="tiny-btn" type="button">Lecture</button>
        <button class="tiny-btn" type="button">+ Liste</button>
      </div>
    `;
    elements.moviesGrid.appendChild(card);
  });
}

function renderTop10() {
  const ranking = [...DB.movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  elements.top10Grid.innerHTML = "";

  ranking.forEach((movie, index) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.background = movieGradient(movie.id + 3);
    card.innerHTML = `
      <span class="top-rank">#${index + 1}</span>
      <h4 class="movie-title">${movie.title}</h4>
      <p class="movie-meta">${movie.genre} · ${movie.year} · ${movie.rating}/10</p>
      <div class="movie-actions">
        <button class="tiny-btn" type="button">Lecture</button>
        <button class="tiny-btn" type="button">Details</button>
      </div>
    `;
    elements.top10Grid.appendChild(card);
  });
}

function movieGradient(seed) {
  const hue = (seed * 43) % 360;
  return `linear-gradient(155deg, hsl(${hue} 62% 30%), #101010)`;
}

function closeProfileMenu() {
  state.profileMenuOpen = false;
  elements.profileMenu.classList.add("hidden");
  elements.profileButton.setAttribute("aria-expanded", "false");
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0];
  if (!file || !state.currentUser) return;

  const reader = new FileReader();
  reader.onload = () => {
    state.currentUser.avatar = String(reader.result);
    updateProfileUI();
  };
  reader.readAsDataURL(file);
}

function openPanel(panelType) {
  if (panelType === "admin" && state.currentUser?.role !== "admin") return;

  closePanels();
  elements.overlay.classList.remove("hidden");

  if (panelType === "payment") {
    elements.paymentPanel.classList.remove("hidden");
    elements.paymentPanel.setAttribute("aria-hidden", "false");
  }

  if (panelType === "admin") {
    renderAdminPanel();
    elements.adminPanel.classList.remove("hidden");
    elements.adminPanel.setAttribute("aria-hidden", "false");
  }

  closeProfileMenu();
}

function closePanels() {
  elements.paymentPanel.classList.add("hidden");
  elements.adminPanel.classList.add("hidden");
  elements.paymentPanel.setAttribute("aria-hidden", "true");
  elements.adminPanel.setAttribute("aria-hidden", "true");
  elements.overlay.classList.add("hidden");
}

function renderAdminPanel() {
  if (state.currentUser?.role !== "admin") return;

  const users = [...DB.admins, ...DB.users];
  elements.adminUsersList.innerHTML = "";

  users.forEach((user) => {
    const line = document.createElement("div");
    line.className = "admin-user-item";
    const isOnline = DB.onlineStatus[user.email];
    line.innerHTML = `
      <div class="admin-row">
        <strong>${user.email}</strong>
        <span class="status ${isOnline ? "online" : "offline"}">
          ${isOnline ? "🟢 EN LIGNE" : "🔴 HORS LIGNE"}
        </span>
      </div>
      <div class="admin-actions">
        <button data-action="edit" data-email="${user.email}">Modifier</button>
        <button data-action="delete" data-email="${user.email}">Supprimer</button>
      </div>
    `;
    elements.adminUsersList.appendChild(line);
  });

  elements.adminUsersList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget;
      const action = target.getAttribute("data-action");
      const email = target.getAttribute("data-email");
      adminAction(action, email);
    });
  });
}

function adminAction(action, email) {
  if (state.currentUser?.role !== "admin") return;
  if (!email) return;

  if (action === "edit") {
    const newEmail = window.prompt("Nouvel email (@FLASHBACKWL obligatoire):", email);
    if (!newEmail || !EMAIL_FORMAT.test(newEmail)) return;

    const target = [...DB.admins, ...DB.users].find((u) => u.email === email);
    if (!target) return;
    delete DB.onlineStatus[target.email];
    target.email = newEmail;
    DB.onlineStatus[target.email] = false;
    renderAdminPanel();
    return;
  }

  if (action === "delete") {
    if (DB.admins.some((admin) => admin.email === email)) {
      window.alert("Suppression d'un admin non autorisee.");
      return;
    }
    DB.users = DB.users.filter((user) => user.email !== email);
    delete DB.onlineStatus[email];
    renderAdminPanel();
  }
}

function logout() {
  if (!state.currentUser) return;
  DB.onlineStatus[state.currentUser.email] = false;
  state.currentUser = null;
  state.movieFilter = "";
  elements.searchInput.value = "";
  closePanels();
  closeProfileMenu();
  showScreen("login");
}

bootstrap();
