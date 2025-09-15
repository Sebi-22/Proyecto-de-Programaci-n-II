import { Producto } from "./productos.js";

// Carrito dinámico
let carritoModule = null;
async function getCarritoModule() {
  if (!carritoModule) carritoModule = await import("./carrito.js");
  return carritoModule;
}

let productos = [];
let productosCargados = 0;
const BLOQUE = 8;

// --- Modal ---
const modalEl = document.getElementById("productModal");
let modalInstance = null;
let basePath = "";
if (window.location.pathname.includes("/pages/")) basePath = "../";

function initModalOnce() {
  if (!modalEl) return;
  modalInstance = new bootstrap.Modal(modalEl);
}

function mostrarModal(id) {
  const producto = productos.find((p) => p.id === Number(id));
  if (!producto || !modalInstance) return;

  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${basePath + producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
    <button class="btn btn-warning w-100 mt-3" id="btnAddCarrito">Agregar al carrito 🛒</button>
  `;

  modalBody.querySelector("#btnAddCarrito").addEventListener("click", async () => {
    const { agregarAlCarrito } = await getCarritoModule();
    agregarAlCarrito({ ...producto });
    modalInstance.hide();
  });

  modalInstance.show();
}

// --- Render productos por bloques ---
function renderProductosScroll(filtrados = productos, containerId = "productos") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const siguienteBloque = filtrados.slice(productosCargados, productosCargados + BLOQUE);
  siguienteBloque.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-3");

    const card = document.createElement("div");
    card.classList.add("card", "h-100", "mb-3", "shadow-sm");

    const img = document.createElement("img");
    img.src = basePath + p.img;
    img.alt = p.nombre;
    img.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");

    const h5 = document.createElement("h5");
    h5.textContent = p.nombre;
    h5.classList.add("card-title");

    const desc = document.createElement("p");
    desc.textContent = p.descripcion;
    desc.classList.add("card-text", "flex-grow-1");

    const precio = document.createElement("p");
    precio.textContent = `$${p.precio}`;
    precio.classList.add("card-text", "fw-bold");

    // Botones centrados y uno debajo del otro
    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.textContent = "Ver más";
    btnVer.classList.add("btn", "btn-ver-mas", "mb-2");
    btnVer.addEventListener("click", () => mostrarModal(p.id));

    const btnCarrito = document.createElement("button");
    btnCarrito.type = "button";
    btnCarrito.textContent = "Agregar al carrito 🛒";
    btnCarrito.classList.add("btn", "btn-warning");
    btnCarrito.addEventListener("click", async () => {
      const { agregarAlCarrito } = await getCarritoModule();
      agregarAlCarrito({ ...p });
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");
    btnContainer.append(btnVer, btnCarrito);

    cardBody.append(h5, desc, precio, btnContainer);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });

  productosCargados += BLOQUE;
}

// --- Filtros ---
function aplicarFiltros() {
  let filtrados = [...productos];

  const valorPrecio = document.getElementById("filtroPrecio")?.value;
  if (valorPrecio === "0-3000") filtrados = filtrados.filter(p => p.precio <= 3000);
  else if (valorPrecio === "3001-5000") filtrados = filtrados.filter(p => p.precio >= 3001 && p.precio <= 5000);
  else if (valorPrecio === "5001-10000") filtrados = filtrados.filter(p => p.precio > 5000 && p.precio <= 10000);

  const valorCat = document.getElementById("filtroCategoria")?.value;
  if (valorCat && valorCat !== "todos") filtrados = filtrados.filter(p => p.categoria === valorCat);

  productosCargados = 0;
  document.getElementById("productos").innerHTML = "";
  renderProductosScroll(filtrados);
}

document.getElementById("filtroPrecio")?.addEventListener("change", aplicarFiltros);
document.getElementById("filtroCategoria")?.addEventListener("change", aplicarFiltros);

// --- Cargar productos desde JSON ---
fetch(basePath + "assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((p) => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    renderProductosScroll();
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Infinite scroll ---
window.addEventListener("scroll", () => {
  const filtrados = [...productos];
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    renderProductosScroll(filtrados);
  }
});

// --- Init modal ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

export { productos, mostrarModal, renderProductosScroll };
