import { Producto } from "./productos.js";

let productos = [];

fetch("./assets/js/productos.json")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    productos = data.map(p => new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    renderDestacados();
  })
  .catch(err => console.error("Error cargando productos:", err));

function renderDestacados() {
  const container = document.getElementById("productos");
  if (!container) return;

  // Solo mostrar los 3 primeros productos
  const destacados = productos.slice(0, 3);
  container.innerHTML = destacados.map(p => p.renderCard()).join("");

  document.querySelectorAll("[data-id]").forEach(btn => {
    btn.addEventListener("click", e => {
      mostrarModal(e.currentTarget.getAttribute("data-id"));
    });
  });
}

function mostrarModal(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  const modalTitle = document.getElementById("productModalLabel");
  const modalBody = document.querySelector("#productModal .modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  new bootstrap.Modal(document.getElementById("productModal")).show();
}
export { productos, mostrarModal };

// Loader dinámico asincrónico
document.addEventListener("DOMContentLoaded", async () => {
  // Simulamos carga asincrónica (puede ser fetch de productos o imágenes)
  await new Promise(resolve => setTimeout(resolve, 2000));

  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
  }
});

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

