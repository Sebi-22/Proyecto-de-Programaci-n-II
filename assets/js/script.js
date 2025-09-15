import { Producto } from "./productos.js";

let productos = [];

// --- Modal ---
const modalEl = document.getElementById("productModal");

// --- Buscar producto por id ---
function buscarProductoPorId(id) {
  return productos.find(p => p.id == id) || null;
}

// --- Mostrar modal ---
function mostrarModal(id) {
  const producto = buscarProductoPorId(id);
  if (!producto || !modalEl) return;

  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p>Precio: $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  // --- Usar Bootstrap para abrir el modal ---
  const modalBootstrap = new bootstrap.Modal(modalEl);
  modalBootstrap.show();
}

// --- Render destacados ---
function renderDestacados() {
  const container = document.getElementById("productos");
  if (!container) return;
  container.innerHTML = "";

  const limite = Math.min(productos.length, 3);

  productos.slice(0, limite).forEach(p => {
    const card = document.createElement("div");
    card.className = "card p-3 shadow-sm text-center";

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.nombre;
    img.className = "img-fluid mb-2";

    const h3 = document.createElement("h3");
    h3.textContent = p.nombre;

    const desc = document.createElement("p");
    desc.textContent = p.descripcion;

    const precio = document.createElement("span");
    precio.textContent = `Precio: $${p.precio}`;

    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.textContent = "Ver más";
    btnVer.className = "btn btn-outline-secondary m-1";
    btnVer.addEventListener("click", () => mostrarModal(p.id));

    card.append(img, h3, desc, precio, btnVer);
    container.appendChild(card);
  });
}

// --- Cargar productos desde JSON ---
fetch("./assets/js/productos.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    });
    renderDestacados();
  })
  .catch(err => console.error("Error cargando productos:", err));

// Loader
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
});

export { productos, mostrarModal,renderDestacados };



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

