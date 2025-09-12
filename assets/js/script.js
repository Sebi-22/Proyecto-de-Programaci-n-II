// productos-modal.js
import { Producto } from "./productos.js";

let productos = [];

// --- Modal: referencia e instancia (se inicializa más abajo) ---
const modalEl = document.getElementById("productModal");
let modalInstance = null;

// Inicializa modal y listeners una sola vez
function initModalOnce() {
  if (!modalEl) {
    console.warn("No se encontró #productModal en el DOM.");
    return;
  }
  // Crear la instancia de bootstrap una sola vez
  modalInstance = new bootstrap.Modal(modalEl);

  // Cuando ya está mostrado, mover foco al btn-close y bloquear fondo (inert) correctamente
  modalEl.addEventListener("shown.bs.modal", () => {
    const closeBtn = modalEl.querySelector(".btn-close");
    if (closeBtn) closeBtn.focus();
    // aplicar inert sólo a los hermanos del modal (NO al modal)
    setInertOnBackground(true);
  });

  // Al quedar oculto, quitar inert y remover foco
  modalEl.addEventListener("hidden.bs.modal", () => {
    document.activeElement && document.activeElement.blur();
    setInertOnBackground(false);
  });
}

// Aplica/remove inert solo a los siblings directos de <body> que NO sean el modal ni el backdrop
function setInertOnBackground(enable) {
  Array.from(document.body.children).forEach(child => {
    // ignorar el propio modal
    if (child === modalEl) return;
    // ignorar el backdrop si existe
    if (child.classList && child.classList.contains("modal-backdrop")) return;
    // también evitar inertear elementos <script> o <template> (opcionales)
    if (child.nodeName === "SCRIPT" || child.nodeName === "TEMPLATE") return;

    if (enable) child.setAttribute("inert", "");
    else child.removeAttribute("inert");
  });
}

// Mostrar modal con contenido del producto (usa la instancia ya creada)
function mostrarModal(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  if (!modalInstance) {
    // si por alguna razón no está inicializado (cargar tardía), inicializar
    initModalOnce();
  }
  const modalTitle = modalEl.querySelector("#productModalLabel");
  const modalBody = modalEl.querySelector(".modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  modalInstance.show();
}

// --- Render de destacados (creando elementos en JS) ---
function renderDestacados() {
  const container = document.getElementById("productos");
  if (!container) return;

  container.innerHTML = ""; // limpiar

  // Mostrar hasta 3 productos (sin usar slice)
  const limite = productos.length < 3 ? productos.length : 3;
  for (let i = 0; i < limite; i++) {
    const p = productos[i];

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = p.img;
    img.alt = p.nombre;
    img.classList.add("img-fluid");

    const h3 = document.createElement("h3");
    h3.textContent = p.nombre;

    const desc = document.createElement("p");
    desc.textContent = p.descripcion;

    const precio = document.createElement("span");
    precio.textContent = `Precio: $${p.precio}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Ver más";
    btn.dataset.id = p.id;
    btn.classList.add("btn-ver"); // asegura que conserve el estilo violeta
    // el botón de cada card NO debe tener data-bs-dismiss (es para abrir modal)

    btn.addEventListener("click", (e) => {
      mostrarModal(e.currentTarget.dataset.id);
    });

    // estructurar la card
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(desc);
    card.appendChild(precio);
    card.appendChild(btn);

    container.appendChild(card);
  }
}

// --- Cargar JSON de productos ---
fetch("./assets/js/productos.json")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    // crear instancias sin .map
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    }
    renderDestacados();
  })
  .catch(err => console.error("Error cargando productos:", err));

// Inicializar modal cuando el DOM esté listo (o inmediatamente si ya lo está)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
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

