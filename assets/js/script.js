import { Producto } from "./productos.js";

let productos = [];

// --- Modal ---
const modalEl = document.getElementById("productModal");
let modalInstance = null;

// Inicializar instancia de Bootstrap Modal
document.addEventListener("DOMContentLoaded", () => {
  if (modalEl) {
    modalInstance = new bootstrap.Modal(modalEl);
  }
});

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
  if (!producto || !modalInstance) return;

  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p>Precio: $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  modalInstance.show();
}

// --- Cerrar modal ---
function cerrarModal() {
  if (!modalInstance) return;
  modalInstance.hide();
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
    card.className = "card p-3 shadow-sm text-center mb-3";

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
    btnVer.dataset.id = p.id;
    btnVer.className = "btn btn-ver-mas m-1"; // clase unificada
    btnVer.onclick = function () {
      mostrarModal(this.dataset.id);
    };

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(desc);
    card.appendChild(precio);
    card.appendChild(btnVer);

    container.appendChild(card);
  }
}

// --- Cargar productos desde JSON ---
fetch("./assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      productos.push(
        new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img)
      );
    }
    renderDestacados();
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Loader ---
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
});

// --- Gestión de sesión y actualización del navbar ---
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navCuenta = document.getElementById("navCuenta");
  const navCuentaText = document.getElementById("navCuentaText");

  if (usuario && navCuenta && navCuentaText) {
    navCuentaText.textContent = usuario.email;

    navCuenta.querySelector(".dropdown-menu").innerHTML = `
      <li><a class="dropdown-item" href="pages/miPerfil.html">Mi Perfil</a></li>
      <li><a class="dropdown-item" href="pages/pedidos.html">Mis Pedidos</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar Sesión</a></li>
    `;

    document.getElementById("cerrarSesion").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.reload();
    });
  }
});

export { productos, mostrarModal, renderDestacados };
