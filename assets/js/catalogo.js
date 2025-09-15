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

// --- Modal con carrito ---
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
    <button class="btn btn-morado w-100 mt-3" data-id="${producto.id}" id="btnModalCarrito">
      <i class="bi bi-cart-plus"></i> Agregar al carrito
    </button>
    <button class="btn btn-danger w-100 mt-2" data-id="${producto.id}" id="btnModalEliminar">
      <i class="bi bi-trash"></i> Eliminar del carrito
    </button>
  `;

  // eventos
  modalBody.querySelector("#btnModalCarrito").addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
  modalBody.querySelector("#btnModalEliminar").addEventListener("click", () => {
    eliminarDelCarrito(producto.id);
  });

  modalInstance.show();
}

// --- Carrito ---
function agregarAlCarrito(id) {
  let carrito = localStorage.getItem("carrito") || "";
  let nuevoCarrito = "";
  let encontrado = false;

  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const [itemId, cantStr] = items[i].split(",");
      let cant = parseInt(cantStr);

      if (itemId == id) {
        cant += 1;
        encontrado = true;
      }
      nuevoCarrito += itemId + "," + cant + ";";
    }
  }
  if (!encontrado) nuevoCarrito += id + ",1;";

  localStorage.setItem("carrito", nuevoCarrito);
  actualizarContadorCarrito();
}

function eliminarDelCarrito(id) {
  let carrito = localStorage.getItem("carrito") || "";
  let nuevoCarrito = "";

  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const [itemId, cantStr] = items[i].split(",");
      if (itemId == id) continue;
      nuevoCarrito += itemId + "," + cantStr + ";";
    }
  }

  localStorage.setItem("carrito", nuevoCarrito);
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = localStorage.getItem("carrito") || "";
  let total = 0;

  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const [, cantStr] = items[i].split(",");//split es un método de JavaScript para strings que sirve para dividir un texto en partes usando un separador.
      total += parseInt(cantStr);
    }
  }

  const badge = document.querySelector(".bi-cart-fill + .badge");
  if (badge) badge.textContent = total;
}

// --- Render productos ---
function renderProductos(filtrados = productos) {
  const container = document.getElementById("productos");
  if (!container) return;

  container.innerHTML = "";

  filtrados.forEach(p => {
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

  // filtro de precio
  const valorPrecio = document.getElementById("filtroPrecio")?.value;
  if (valorPrecio === "0-3000") {
    filtrados = filtrados.filter(p => p.precio <= 3000);
  } else if (valorPrecio === "3001-5000") {
    filtrados = filtrados.filter(p => p.precio >= 3001 && p.precio <= 5000);
  } else if (valorPrecio === "5001-10000") {
    filtrados = filtrados.filter(p => p.precio > 5000 && p.precio <= 10000);
  }

  // filtro de categoría
  const valorCat = document.getElementById("filtroCategoria")?.value;
  if (valorCat && valorCat !== "todos") {
    filtrados = filtrados.filter(p => p.categoria === valorCat);
  }

  // renderizar productos filtrados
  renderProductos(filtrados);
}


document.getElementById("filtroPrecio")?.addEventListener("change", aplicarFiltros);
document.getElementById("filtroCategoria")?.addEventListener("change", aplicarFiltros);

// --- Cargar productos ---
fetch(basePath + "assets/js/productos.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    renderProductos();
    actualizarContadorCarrito();
  })
  .catch(err => console.error("Error cargando productos:", err));

// --- Init modal ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

export { productos, mostrarModal, agregarAlCarrito, eliminarDelCarrito, actualizarContadorCarrito };
