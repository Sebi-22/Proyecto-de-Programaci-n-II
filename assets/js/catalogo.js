import { Producto } from "./productos.js";

let productos = [];

// --- Modal ---
const modalEl = document.getElementById("productModal");
let modalInstance = null;

// Detectar basePath (si estás en /pages/)
let basePath = "";
if (window.location.pathname.includes("/pages/")) {
  basePath = "../";
}

function initModalOnce() {
  if (!modalEl) return;
  modalInstance = new bootstrap.Modal(modalEl);
}

function mostrarModal(id) {
  const producto = productos.find((p) => p.id == id);
  if (!producto || !modalInstance) return;

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

// --- Render productos/destacados ---
function renderProductos(filtrados = productos, containerId = "productos") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  filtrados.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    const card = document.createElement("div");
    card.classList.add("card", "h-100", "mb-3");

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
    btn.classList.add("btn", "btn-ver-mas"); // misma clase para todos
    btn.addEventListener("click", () => mostrarModal(p.id));

    cardBody.append(h5, desc, precio, btn);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
}

// --- Filtros ---
function aplicarFiltros() {
  let filtrados = [...productos];

  const valorPrecio = document.getElementById("filtroPrecio")?.value;
  if (valorPrecio === "0-3000") filtrados = filtrados.filter((p) => p.precio <= 3000);
  else if (valorPrecio === "3001-5000") filtrados = filtrados.filter((p) => p.precio >= 3001 && p.precio <= 5000);
  else if (valorPrecio === "5001-10000") filtrados = filtrados.filter((p) => p.precio > 5000 && p.precio <= 10000);

  const valorCat = document.getElementById("filtroCategoria")?.value;
  if (valorCat && valorCat !== "todos") filtrados = filtrados.filter((p) => p.categoria === valorCat);

  renderProductos(filtrados);
}

document.getElementById("filtroPrecio")?.addEventListener("change", aplicarFiltros);
document.getElementById("filtroCategoria")?.addEventListener("change", aplicarFiltros);

// --- Cargar productos ---
fetch(basePath + "assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((p) => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    renderProductos();
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Init modal ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

export { productos, mostrarModal, renderProductos };
