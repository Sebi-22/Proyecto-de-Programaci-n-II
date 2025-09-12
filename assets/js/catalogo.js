// catalogo.js
import { Producto } from "./productos.js";

let productos = [];
const modalEl = document.getElementById("productModal");
let modalInstance = null;

// --- Detectar basePath según la ubicación del HTML ---
let basePath = "";
if (window.location.pathname.includes("/pages/")) {
  basePath = "../";
}

// --- Inicializar modal solo una vez ---
function initModalOnce() {
  if (!modalEl) return;
  modalInstance = new bootstrap.Modal(modalEl);

  modalEl.addEventListener("shown.bs.modal", () => {
    const closeBtn = modalEl.querySelector(".btn-close");
    if (closeBtn) closeBtn.focus();
    setInertOnBackground(true);
  });

  modalEl.addEventListener("hidden.bs.modal", () => {
    document.activeElement && document.activeElement.blur();
    setInertOnBackground(false);
  });
}

function setInertOnBackground(enable) {
  Array.from(document.body.children).forEach(child => {
    if (child === modalEl) return;
    if (child.classList && child.classList.contains("modal-backdrop")) return;
    if (child.nodeName === "SCRIPT" || child.nodeName === "TEMPLATE") return;
    if (enable) child.setAttribute("inert", "");
    else child.removeAttribute("inert");
  });
}

// --- Mostrar modal ---
function mostrarModal(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  if (!modalInstance) initModalOnce();

  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${basePath + producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  modalInstance.show();
}

// --- Render de productos ---
function renderProductos(filtrados = productos) {
  const container = document.getElementById("productos");
  if (!container) return;

  container.innerHTML = ""; // limpiar

  for (let i = 0; i < filtrados.length; i++) {
    const p = filtrados[i];

    const col = document.createElement("div");
    col.classList.add("col-md-4");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.src = basePath + p.img;
    img.alt = p.nombre;
    img.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.textContent = p.nombre;
    h5.classList.add("card-title");

    const desc = document.createElement("p");
    desc.textContent = p.descripcion;
    desc.classList.add("card-text");

    const precio = document.createElement("p");
    precio.textContent = `$${p.precio}`;
    precio.classList.add("card-text", "fw-bold");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Ver más";
    btn.dataset.id = p.id;
    btn.classList.add("btn", "btn-primary");

    btn.addEventListener("click", function() {
      mostrarModal(btn.dataset.id);
    });

    cardBody.appendChild(h5);
    cardBody.appendChild(desc);
    cardBody.appendChild(precio);
    cardBody.appendChild(btn);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    container.appendChild(col);
  }
}

// --- Aplicar filtros ---
function aplicarFiltros() {
  let filtrados = [];
  for (let i = 0; i < productos.length; i++) filtrados.push(productos[i]);

  // Filtro precio
  const valorPrecio = document.getElementById("filtroPrecio").value;
  if (valorPrecio === "0-3000") filtrados = filtrados.filter(p => p.precio <= 3000);
  else if (valorPrecio === "3001-5000") filtrados = filtrados.filter(p => p.precio >= 3001 && p.precio <= 5000);
  else if (valorPrecio === "5001-10000") filtrados = filtrados.filter(p => p.precio > 5000);

  // Filtro categoría
  const valorCat = document.getElementById("filtroCategoria")?.value.toLowerCase().trim();
  if (valorCat && valorCat !== "todos") {
    filtrados = filtrados.filter(p => p.categoria && p.categoria.toLowerCase().trim() === valorCat);
  }

  renderProductos(filtrados);
}

// --- Listeners filtros ---
const filtroPrecio = document.getElementById("filtroPrecio");
if (filtroPrecio) filtroPrecio.addEventListener("change", aplicarFiltros);

const filtroCategoria = document.getElementById("filtroCategoria");
if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros);

// --- Cargar productos ---
fetch(basePath + "assets/js/productos.json")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    }
    renderProductos(); // mostrar todos
  })
  .catch(err => console.error("Error cargando productos:", err));

// --- Inicializar modal al cargar DOM ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

export { productos, mostrarModal };
