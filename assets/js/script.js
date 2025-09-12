import { Producto } from "./productos.js";

let productos = [];

// --- Modal ---
const modalEl = document.getElementById("productModal");
let modalInstance = null;

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
  const hijos = document.body.children;
  for (let i = 0; i < hijos.length; i++) {
    const child = hijos[i];
    if (child === modalEl) continue;
    if (child.classList && child.classList.contains("modal-backdrop")) continue;
    if (child.nodeName === "SCRIPT" || child.nodeName === "TEMPLATE") continue;

    if (enable) child.setAttribute("inert", "");
    else child.removeAttribute("inert");
  }
}

// --- Buscar producto por id ---
function buscarProductoPorId(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      return productos[i];
    }
  }
  return null;
}

// --- Mostrar modal ---
function mostrarModal(id) {
  const producto = buscarProductoPorId(id);
  if (!producto) return;

  if (!modalInstance) initModalOnce();

  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
    <button class="btn btn-morado w-100 mt-3" data-id="${producto.id}" id="btnModalCarrito">
      <i class="bi bi-cart-plus"></i> Agregar al carrito
    </button>
    <button class="btn btn-danger w-100 mt-2" data-id="${producto.id}" id="btnModalEliminar">
      <i class="bi bi-trash"></i> Eliminar del carrito
    </button>
  `;

  const btnAgregar = modalBody.querySelector("#btnModalCarrito");
  btnAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });

  const btnEliminar = modalBody.querySelector("#btnModalEliminar");
  btnEliminar.addEventListener("click", () => {
    eliminarDelCarrito(producto.id);
  });

  modalInstance.show();
}

// --- Agregar producto al carrito ---
function agregarAlCarrito(id) {
  let carrito = localStorage.getItem("carrito") || ""; 
  let nuevoCarrito = "";
  let encontrado = false;

  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const partes = items[i].split(",");
      const itemId = partes[0];
      let cant = parseInt(partes[1]);

      if (itemId == id) {
        cant += 1;
        encontrado = true;
      }
      nuevoCarrito += itemId + "," + cant + ";";
    }
  }

  if (!encontrado) {
    nuevoCarrito += id + ",1;";
  }

  localStorage.setItem("carrito", nuevoCarrito);
  actualizarContadorCarrito();
}

// --- Eliminar producto del carrito ---
function eliminarDelCarrito(id) {
  let carrito = localStorage.getItem("carrito") || "";
  let nuevoCarrito = "";
  
  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const partes = items[i].split(",");
      const itemId = partes[0];
      const cant = parseInt(partes[1]);

      if (itemId == id) continue; // saltar producto eliminado
      nuevoCarrito += itemId + "," + cant + ";";
    }
  }

  localStorage.setItem("carrito", nuevoCarrito);
  actualizarContadorCarrito();
}

// --- Actualizar contador carrito ---
function actualizarContadorCarrito() {
  const carrito = localStorage.getItem("carrito") || "";
  let total = 0;

  if (carrito !== "") {
    const items = carrito.split(";");
    for (let i = 0; i < items.length; i++) {
      if (items[i] === "") continue;
      const partes = items[i].split(",");
      total += parseInt(partes[1]);
    }
  }

  const badge = document.querySelector(".bi-cart-fill + .badge");
  if (badge) badge.textContent = total;
}

// --- Render destacados ---
function renderDestacados() {
  const container = document.getElementById("productos");
  if (!container) return;
  container.innerHTML = "";

  const limite = productos.length < 3 ? productos.length : 3;
  for (let i = 0; i < limite; i++) {
    const p = productos[i];

    const card = document.createElement("div");
    card.classList.add("card", "p-3", "shadow-sm", "text-center");

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.nombre;
    img.classList.add("img-fluid", "mb-2");

    const h3 = document.createElement("h3");
    h3.textContent = p.nombre;

    const desc = document.createElement("p");
    desc.textContent = p.descripcion;

    const precio = document.createElement("span");
    precio.textContent = `Precio: $${p.precio}`;

    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.textContent = "Ver más";
    btnVer.dataset.id = p.id;
    btnVer.classList.add("btn", "btn-outline-secondary", "m-1");
    btnVer.addEventListener("click", (e) => {
      mostrarModal(e.currentTarget.dataset.id);
    });

    const btnCarrito = document.createElement("button");
    btnCarrito.type = "button";
    btnCarrito.textContent = "Agregar al carrito";
    btnCarrito.dataset.id = p.id;
    btnCarrito.classList.add("btn", "btn-morado", "m-1");
    btnCarrito.addEventListener("click", (e) => {
      agregarAlCarrito(e.currentTarget.dataset.id);
    });

    card.append(img, h3, desc, precio, btnVer, btnCarrito);
    container.appendChild(card);
  }
}

// --- Cargar productos desde JSON ---
fetch("./assets/js/productos.json")
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    }
    renderDestacados();
    actualizarContadorCarrito();
  })
  .catch(err => console.error("Error cargando productos:", err));

// Inicializar modal
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

// Loader
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
});

export { productos, mostrarModal, agregarAlCarrito, eliminarDelCarrito, actualizarContadorCarrito, renderDestacados };



// Gestión de sesión y actualización del navbar
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));//parse es un método que convierte un string en un objeto y getItem es un método que obtiene el valor de una clave en el almacenamiento local
  const navCuenta = document.getElementById("navCuenta");
  const navCuentaText = document.getElementById("navCuentaText");

  if (usuario && navCuenta && navCuentaText) {
    // Cambiar el texto del botón de cuenta
    navCuentaText.textContent = usuario.email;

    // Reemplazar menú con perfil, pedidos y cerrar sesión
    navCuenta.querySelector(".dropdown-menu").innerHTML = `
      <li><a class="dropdown-item" href="pages/miPerfil.html">Mi Perfil</a></li>
      <li><a class="dropdown-item" href="pages/pedidos.html">Mis Pedidos</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar Sesión</a></li>
    `;

    // Evento cerrar sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.reload(); // recarga la página para actualizar navbar
    });
  }
});

