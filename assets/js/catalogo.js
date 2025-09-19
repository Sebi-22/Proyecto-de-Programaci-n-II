// Importa la clase Producto desde otro archivo
import { Producto } from "./productos.js"; 

// --- Manejo del carrito (se importa dinámicamente solo cuando se necesita) ---
let carritoModule = null;
async function getCarritoModule() {
  if (!carritoModule) carritoModule = await import("./carrito.js");
  return carritoModule;
}

// Variables principales
let productos = [];              // Aquí guardamos TODOS los productos del JSON
let productosFiltrados = [];     // Aquí guardamos SOLO los que cumplen con filtros
let productosCargados = 0;       // Cuántos productos se cargaron en pantalla
const BLOQUE = 8;                // Cantidad de productos que se cargan por vez (scroll)

// --- Modal (ventana emergente de Bootstrap) ---
const modalEl = document.getElementById("productModal"); // El div del modal
let modalInstance = null; // Instancia de bootstrap.Modal

// Detectamos si estamos en /pages/ para ajustar las rutas de imágenes
let basePath = "";
if (window.location.pathname.includes("/pages/")) basePath = "../"; 
// 👉 includes() devuelve true si la URL contiene "/pages/"

// Inicializamos el modal SOLO una vez
function initModalOnce() {
  if (!modalEl) return; 
  modalInstance = new bootstrap.Modal(modalEl); 
}

// Mostrar modal con la info de un producto
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

  // Botón dentro del modal para agregar al carrito
  modalBody.querySelector("#btnAddCarrito").addEventListener("click", async () => {
    const { agregarAlCarrito } = await getCarritoModule();
    agregarAlCarrito({ ...producto });
    modalInstance.hide(); 
    // 👉 hide() = método de Bootstrap para cerrar el modal
  });

  modalInstance.show(); 
  // 👉 show() = método de Bootstrap para abrir el modal
}

// --- Renderizado de productos con scroll infinito ---
function renderProductosScroll(containerId = "productos") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Selecciona el próximo bloque de productos a mostrar
  const siguienteBloque = productosFiltrados.slice(productosCargados, productosCargados + BLOQUE);

  siguienteBloque.forEach((p) => {
    // Contenedor de columna
    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-3");

    // Card (tarjeta Bootstrap)
    const card = document.createElement("div");
    card.classList.add("card", "h-100", "mb-3", "shadow-sm");

    // Imagen
    const img = document.createElement("img");
    img.src = basePath + p.img;
    img.alt = p.nombre;
    img.classList.add("card-img-top");

    // Cuerpo de la tarjeta
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

    // Botón "Ver más" → abre el modal
    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.textContent = "Ver más";
    btnVer.classList.add("btn", "btn-ver-mas", "mb-2");
    btnVer.addEventListener("click", () => mostrarModal(p.id));

    // Botón "Agregar al carrito"
    const btnCarrito = document.createElement("button");
    btnCarrito.type = "button";
    btnCarrito.textContent = "Agregar al carrito 🛒";
    btnCarrito.classList.add("btn", "btn-warning");
    btnCarrito.addEventListener("click", async () => {
      const { agregarAlCarrito } = await getCarritoModule();
      agregarAlCarrito({ ...p });
    });

    // Contenedor para los botones
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");
    btnContainer.append(btnVer, btnCarrito);

    // Armado de la tarjeta
    cardBody.append(h5, desc, precio, btnContainer);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });

  productosCargados += BLOQUE; // Avanzamos en el contador
}

// --- Aplicar filtros (categoría + precio) ---
function aplicarFiltros() {
  productosFiltrados = [...productos]; // Arranca con todos los productos

  // Filtro por precio
  const valorPrecio = document.getElementById("filtroPrecio")?.value;
  if (valorPrecio === "0-3000") productosFiltrados = productosFiltrados.filter(p => p.precio <= 3000);
  else if (valorPrecio === "3001-5000") productosFiltrados = productosFiltrados.filter(p => p.precio >= 3001 && p.precio <= 5000);
  else if (valorPrecio === "5001-10000") productosFiltrados = productosFiltrados.filter(p => p.precio > 5000 && p.precio <= 10000);

  // Filtro por categoría
  const valorCat = document.getElementById("filtroCategoria")?.value;
  if (valorCat && valorCat !== "todos") {
    productosFiltrados = productosFiltrados.filter(p => p.categoria === valorCat);
  }

  // Reinicia la lista y vuelve a mostrar desde cero
  productosCargados = 0;
  document.getElementById("productos").innerHTML = "";
  renderProductosScroll();
}

// Eventos de los filtros
document.getElementById("filtroPrecio")?.addEventListener("change", aplicarFiltros);
document.getElementById("filtroCategoria")?.addEventListener("change", aplicarFiltros);

// --- Cargar productos desde el JSON ---
fetch(basePath + "assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((p) => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    productosFiltrados = [...productos]; // Inicialmente se muestran todos
    renderProductosScroll();
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Scroll infinito ---
window.addEventListener("scroll", () => {
  // Si el usuario scrollea hasta 500px antes del final de la página → carga más
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    renderProductosScroll();
  }
});

// --- Inicializar modal ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

// Exportamos funciones/variables para otros archivos
export { productos, mostrarModal, renderProductosScroll };

// --- Loader (pantalla de carga inicial) ---
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); 
  // 👉 hidden = clase CSS que oculta el loader
});
