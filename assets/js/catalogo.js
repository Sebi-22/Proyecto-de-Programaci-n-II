import { Producto } from "./productos.js"; // Importa la clase Producto

// Carrito dinámico (importación solo cuando se necesita)
let carritoModule = null;
async function getCarritoModule() {
  // Importa el módulo del carrito solo si aún no fue importado
  if (!carritoModule) carritoModule = await import("./carrito.js");
  return carritoModule;
}

let productos = []; // Array donde se guardarán los productos
let productosCargados = 0; // Lleva la cuenta de cuántos productos se han mostrado
const BLOQUE = 8; // Cantidad de productos a mostrar por bloque (scroll)

// --- Modal ---
const modalEl = document.getElementById("productModal"); // Elemento del modal
let modalInstance = null; // Instancia de Bootstrap Modal
let basePath = ""; // Ruta base para imágenes y JSON
// Si la ruta incluye "/pages/", ajusta la base para acceder correctamente a los recursos
if (window.location.pathname.includes("/pages/")) basePath = "../";

// Inicializa el modal solo una vez
function initModalOnce() {
  if (!modalEl) return;
  modalInstance = new bootstrap.Modal(modalEl);
}

// Muestra el modal con la información del producto seleccionado
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

  // Al hacer click en el botón, agrega el producto al carrito y oculta el modal
  modalBody.querySelector("#btnAddCarrito").addEventListener("click", async () => {
    const { agregarAlCarrito } = await getCarritoModule();
    agregarAlCarrito({ ...producto }); // ...producto: spread operator, copia todas las propiedades del producto
    modalInstance.hide(); // hide: método de Bootstrap para ocultar el modal
  });

  modalInstance.show(); // show: método de Bootstrap para mostrar el modal
}

// --- Render productos por bloques (scroll infinito) ---
// Muestra los productos de a bloques (por ejemplo, de 8 en 8)
function renderProductosScroll(filtrados = productos, containerId = "productos") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // slice: obtiene una porción del array desde productosCargados hasta productosCargados + BLOQUE
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

    // Botón para ver más detalles (abre el modal)
    const btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.textContent = "Ver más";
    btnVer.classList.add("btn", "btn-ver-mas", "mb-2");
    btnVer.addEventListener("click", () => mostrarModal(p.id));

    // Botón para agregar al carrito
    const btnCarrito = document.createElement("button");
    btnCarrito.type = "button";
    btnCarrito.textContent = "Agregar al carrito 🛒";
    btnCarrito.classList.add("btn", "btn-warning");
    btnCarrito.addEventListener("click", async () => {
      const { agregarAlCarrito } = await getCarritoModule();
      agregarAlCarrito({ ...p }); // ...p: spread operator, copia todas las propiedades del producto
    });

    // Contenedor para los botones, alineados en columna y centrados
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");
    btnContainer.append(btnVer, btnCarrito);

    cardBody.append(h5, desc, precio, btnContainer);
    card.append(img, cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });

  productosCargados += BLOQUE; // Suma la cantidad de productos mostrados
}

// --- Filtros ---
// Aplica los filtros seleccionados por el usuario (precio y categoría)
function aplicarFiltros() {
  let filtrados = [...productos]; // Copia el array de productos

  // Filtra por precio según el valor seleccionado
  const valorPrecio = document.getElementById("filtroPrecio")?.value;
  if (valorPrecio === "0-3000") filtrados = filtrados.filter(p => p.precio <= 3000);
  else if (valorPrecio === "3001-5000") filtrados = filtrados.filter(p => p.precio >= 3001 && p.precio <= 5000);
  else if (valorPrecio === "5001-10000") filtrados = filtrados.filter(p => p.precio > 5000 && p.precio <= 10000);

  // Filtra por categoría si se seleccionó una distinta de "todos"
  const valorCat = document.getElementById("filtroCategoria")?.value;
  if (valorCat && valorCat !== "todos") filtrados = filtrados.filter(p => p.categoria === valorCat);

  productosCargados = 0; // Reinicia el contador de productos cargados
  document.getElementById("productos").innerHTML = ""; // Limpia el contenedor de productos
  renderProductosScroll(filtrados); // Muestra los productos filtrados
}

// Agrega listeners a los filtros para aplicarFiltros cuando cambian
document.getElementById("filtroPrecio")?.addEventListener("change", aplicarFiltros);
document.getElementById("filtroCategoria")?.addEventListener("change", aplicarFiltros);

// --- Cargar productos desde JSON ---
// fetch: solicita el archivo JSON de productos
// then: método que se ejecuta si la promesa se resuelve correctamente
// catch: método que se ejecuta si la promesa es rechazada (error)
fetch(basePath + "assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((p) => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    renderProductosScroll(); // Muestra los primeros productos al cargar
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Infinite scroll ---
// Agrega más productos automáticamente cuando el usuario llega al final de la página
window.addEventListener("scroll", () => {
  const filtrados = [...productos];
  // window.innerHeight: alto de la ventana visible
  // window.scrollY: cantidad de píxeles que el usuario ha desplazado verticalmente
  // document.body.offsetHeight: alto total del documento
  // Si el usuario está cerca del final de la página (a 500px o menos), carga más productos
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    renderProductosScroll(filtrados);
  }
});

// --- Init modal ---
// Inicializa el modal cuando el DOM está listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalOnce);
} else {
  initModalOnce();
}

// Exporta las funciones y variables principales para usarlas en otros archivos
export { productos, mostrarModal, renderProductosScroll };