const API_URL = "http://localhost:3000";

const USER_ID = localStorage.getItem("userId");

if (!USER_ID) {
  console.error("Nenhum userId encontrado no localStorage.");
}

const TYPE_CONFIG = {
  desmatamento: {
    label: "Desmatamento",
    title: "Monitoramento de Desmatamento",
    icon: "fa-tree",
    color: "text-green-600",
  },
  queimadas: {
    label: "Queimadas",
    title: "Monitoramento de Queimadas",
    icon: "fa-fire",
    color: "text-red-500",
  },
  mineracao: {
    label: "Mineração",
    title: "Monitoramento de Mineração",
    icon: "fa-mountain",
    color: "text-gray-600",
  },
  fauna: {
    label: "Fauna",
    title: "Monitoramento de Fauna",
    icon: "fa-paw",
    color: "text-blue-500",
  },
};

let currentUser = null;
let currentType = "desmatamento";
let map = null;

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/users/${USER_ID}`);
    const user = await res.json();
    currentUser = user;

    const userNameEl = document.getElementById("userName");
    const userEmailEl = document.getElementById("userEmail");

    if (userNameEl) userNameEl.textContent = `Olá, ${user.firstName}`;
    if (userEmailEl) userEmailEl.textContent = user.email;

    renderSection(currentType);
  } catch (err) {
    console.error("Erro ao carregar usuário:", err);
  }
}

function renderSection(type) {
  currentType = type;
  const conf = TYPE_CONFIG[type];
  const alerts = (currentUser?.alerts || []).filter((a) => a.type === type);

  alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = alerts.slice(0, 5);

  const total = alerts.length;
  const areasMonitoradas = new Set(alerts.map((a) => `${a.lat},${a.lng}`)).size;
  const last7 = countLast7Days(alerts); 
  const first = alerts[0];

  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = `
    <div class="space-y-8">
      <div class="border-b border-gray-200 pb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          ${conf.title}
        </h1>
        <p class="text-gray-500 text-lg">
          Dados e análises sobre ${conf.label.toLowerCase()} em tempo real
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- total -->
        <div class="bg-white rounded-xl p-6 shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-gray-700">
              Alertas (${conf.label})
            </h3>
            <i class="fas ${conf.icon} ${conf.color}"></i>
          </div>
          <p class="text-2xl font-bold text-green-600">${total}</p>
          <p class="text-xs text-gray-400 mt-1">Total encontrados para este tipo</p>
        </div>

        <!-- áreas -->
        <div class="bg-white rounded-xl p-6 shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-gray-700">Áreas monitoradas</h3>
            <i class="fas fa-location-dot text-yellow-500"></i>
          </div>
          <p class="text-2xl font-bold text-green-600">${areasMonitoradas}</p>
          <p class="text-xs text-gray-400 mt-1">Coordenadas distintas nos alerts</p>
        </div>

        <!-- nova métrica -->
        <div class="bg-white rounded-xl p-6 shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-gray-700">Últimos 7 dias</h3>
            <i class="fas fa-clock text-indigo-500"></i>
          </div>
          <p class="text-2xl font-bold text-green-600">${last7}</p>
          <p class="text-xs text-gray-400 mt-1">Alertas recentes desse tipo</p>
        </div>
      </div>
    </div>

    <section class="space-y-6 mt-8">
      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">
            Mapa da Região
          </h2>
        </div>
        <div id="map"></div>
      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">
            Alertas Recentes (${conf.label})
          </h2>
          <span class="text-xs text-gray-400">máx. 5</span>
        </div>
        <ul class="space-y-3">
          ${
            recent.length
              ? recent
                  .map(
                    (r) => `
            <li class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div class="flex items-center gap-3">
                <i class="fas ${TYPE_CONFIG[r.type]?.icon || "fa-bell"} ${TYPE_CONFIG[r.type]?.color || "text-gray-500"}"></i>
                <div>
                  <span class="block text-sm text-gray-800">${r.message}</span>
                  <span class="block text-xs text-gray-400">${formatDate(r.createdAt)}</span>
                </div>
              </div>
            </li>
          `
                  )
                  .join("")
              : `<li class="text-gray-400 text-sm">Sem alertas desse tipo.</li>`
          }
        </ul>
      </div>
    </section>
  `;

  
  setTimeout(() => {
    if (map) {
      map.remove();
    }
    initMap();
    setupMapMarkers();
  }, 100);

  markActiveSidebar(type);
}

function buildMapSrc(alert) {
  if (!alert) {
    return "https://www.openstreetmap.org/export/embed.html?bbox=-43.9311%2C-19.9779%2C-43.9111%2C-19.9579&layer=mapnik&marker=-19.9679%2C-43.9211";
  }

  const lat = alert.lat;
  const lng = alert.lng;

  const delta = 0.02; 
  const minLng = lng - delta;
  const minLat = lat - delta;
  const maxLng = lng + delta;
  const maxLat = lat + delta;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
}

function countLast7Days(alerts) {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  return alerts.filter((a) => {
    const d = new Date(a.createdAt);
    return d >= sevenDaysAgo;
  }).length;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function markActiveSidebar(type) {
  const buttons = document.querySelectorAll("#menuItems button[data-section]");
  buttons.forEach((btn) => {
    if (btn.dataset.section === type) {
      btn.classList.add("bg-white/10", "text-white");
    } else {
      btn.classList.remove("bg-white/10", "text-white");
    }
  });
}

function initMap() {
  map = L.map("map").setView([-19.9679, -43.9211], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

function setupMapMarkers() {
  const alertasSalvos = JSON.parse(localStorage.getItem("alertas")) || [];
  
  if (map && alertasSalvos.length > 0) {
    alertasSalvos.forEach((alerta) => {
      if (alerta.lat && alerta.lng) {
        L.marker([alerta.lat, alerta.lng])
          .addTo(map)
          .bindPopup(`<b>${alerta.titulo}</b><br>${alerta.descricao}<br>${alerta.dataCriacao}`);
      }
    });
  }
}

function setupSidebarMobile() {
  const openSidebarBtn = document.getElementById("openSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");

  openSidebarBtn?.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    sidebarBackdrop.classList.remove("hidden");
  });
  closeSidebarBtn?.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    sidebarBackdrop.classList.add("hidden");
  });
  sidebarBackdrop?.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    sidebarBackdrop.classList.add("hidden");
  });
}

function setupMenuClicks() {
  document.querySelectorAll("#menuItems button[data-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      renderSection(section);
      const sidebar = document.getElementById("sidebar");
      const sidebarBackdrop = document.getElementById("sidebarBackdrop");
      sidebar.classList.add("-translate-x-full");
      sidebarBackdrop.classList.add("hidden");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupSidebarMobile();
  setupMenuClicks();
  loadUser();
});
