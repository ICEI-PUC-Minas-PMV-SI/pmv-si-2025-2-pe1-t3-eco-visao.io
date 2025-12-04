let map;
let markers = [];

function initMap() {
  map = L.map("map").setView([-19.9679, -43.9211], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  
  loadAlertasFromStorage();
}

function loadAlertasFromStorage() {
  const alertasSalvos = JSON.parse(localStorage.getItem("alertas")) || [];
  const lista = document.getElementById("listaAlertas");

  if (alertasSalvos.length === 0) {
    lista.textContent = "Nenhum alerta criado ainda.";
    return;
  }

  lista.textContent = "";

  alertasSalvos.forEach((alerta) => {
   
    const marker = L.marker([alerta.lat, alerta.lng])
      .addTo(map)
      .bindPopup(`<b>${alerta.titulo}</b><br>${alerta.descricao}<br>${alerta.dataCriacao}`);
    markers.push(marker);

    const alertaDiv = document.createElement("div");
    alertaDiv.className = "bg-gray-50 p-4 border rounded-lg flex justify-between items-start gap-4";
    alertaDiv.innerHTML = `
      <div>
        <p class="text-gray-700 font-medium">${alerta.titulo}</p>
        <p class="text-gray-600 text-sm mb-1">${alerta.descricao}</p>
        <p class="text-gray-500 text-xs">Criado em ${alerta.dataCriacao}</p>
      </div>
      <div class="flex gap-2">
        <button class="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    `;

    alertaDiv.querySelector("button").onclick = () => {
      excluirAlerta(alertaDiv, marker, alertasSalvos, alerta);
    };

    lista.appendChild(alertaDiv);
  });
}

function excluirAlerta(elemento, marker, alertas, alerta) {
  const lista = document.getElementById("listaAlertas");
  lista.removeChild(elemento);
  map.removeLayer(marker);

  
  const index = alertas.findIndex(
    (a) => a.lat === alerta.lat && a.lng === alerta.lng && a.titulo === alerta.titulo
  );
  if (index > -1) {
    alertas.splice(index, 1);
    localStorage.setItem("alertas", JSON.stringify(alertas));
  }

  if (lista.children.length === 0) {
    lista.textContent = "Nenhum alerta criado ainda.";
    lista.classList.add("italic", "text-gray-500");
  }
}

function novoAlerta() {
  const modal = document.getElementById("caixaModal");
  const entradaTitulo = document.getElementById("entradaTitulo");
  const entradaDescricao = document.getElementById("entradaDescricao");
  const cancelarModal = document.getElementById("cancelarModal");
  const confirmarModal = document.getElementById("confirmarModal");

  entradaTitulo.value = "";
  entradaDescricao.value = "";
  modal.classList.remove("hidden");

  cancelarModal.onclick = () => modal.classList.add("hidden");

  confirmarModal.onclick = () => {
    const titulo = entradaTitulo.value.trim();
    const descricao = entradaDescricao.value.trim();

    if (!titulo) return alert("Digite um título para o alerta!");
    if (!descricao) return alert("Digite uma breve descrição para o alerta!");

    modal.classList.add("hidden");
    alert("Agora clique no mapa para escolher a localização do alerta!");

    map.once("click", (e) => {
      const dataCriacao = new Date().toLocaleDateString("pt-BR");
      const alerta = {
        titulo: titulo,
        descricao: descricao,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        dataCriacao: dataCriacao,
      };

      const alertasSalvos = JSON.parse(localStorage.getItem("alertas")) || [];
      alertasSalvos.push(alerta);
      localStorage.setItem("alertas", JSON.stringify(alertasSalvos));

     
      const marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`<b>${titulo}</b><br>${descricao}<br>${dataCriacao}`)
        .openPopup();
      markers.push(marker);

      const lista = document.getElementById("listaAlertas");
      if (lista.textContent.includes("Nenhum alerta criado ainda")) {
        lista.textContent = "";
      }

      const alertaDiv = document.createElement("div");
      alertaDiv.className = "bg-gray-50 p-4 border rounded-lg flex justify-between items-start gap-4";
      alertaDiv.innerHTML = `
        <div>
          <p class="text-gray-700 font-medium">${titulo}</p>
          <p class="text-gray-600 text-sm mb-1">${descricao}</p>
          <p class="text-gray-500 text-xs">Criado em ${dataCriacao}</p>
        </div>
        <div class="flex gap-2">
          <button class="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-1 rounded">
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      `;

      alertaDiv.querySelector("button").onclick = () => {
        excluirAlerta(alertaDiv, marker, alertasSalvos, alerta);
      };

      lista.appendChild(alertaDiv);
    });
  };
}

window.addEventListener("load", initMap);
document.getElementById("novoAlerta").addEventListener("click", novoAlerta);
