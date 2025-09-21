import { Producto } from "./productos.js"; // Importa la clase Producto para crear objetos de productos

// Carrito (import dinámico)
let carritoModule = null;
// Función para importar el módulo del carrito solo cuando se necesita (mejora el rendimiento)
async function getCarritoModule() {
  if (!carritoModule) {
    carritoModule = await import("./carrito.js");
  }
  return carritoModule;
}

let productos = []; // Array donde se guardarán los productos

// --- Modal ---
const modalEl = document.getElementById("productModal"); // Obtiene el elemento del modal
let modalInstance = null;

// Cuando el DOM esté cargado, crea una instancia del modal de Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  if (modalEl) {
    modalInstance = new bootstrap.Modal(modalEl);
  }
});

// --- Buscar producto por id ---
// Busca un producto en el array productos por su id
function buscarProductoPorId(id) {
  // 👉 .find:
  // Recorre el array "productos" y devuelve el PRIMER elemento que cumpla la condición
  // En este caso: que el id del producto sea igual al id buscado.
  // Si no encuentra ninguno, devuelve undefined, y por eso usamos || null.
  return productos.find((p) => p.id === Number(id)) || null;
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
    <button class="btn btn-warning w-100 mt-3" id="btnAddCarrito">Agregar al carrito 🛒</button>
  `;

  modalBody.querySelector("#btnAddCarrito").addEventListener("click", async () => {
    const { agregarAlCarrito } = await getCarritoModule();
    if (!producto) return console.error("Producto inválido al agregar al carrito");
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      img: producto.img,
      categoria: producto.categoria
    });
    modalInstance.hide(); // hide: método de Bootstrap para ocultar el modal
  });

  modalInstance.show(); // show: método de Bootstrap para mostrar el modal
}

// --- Render destacados ---
function renderDestacados() {
  const container = document.getElementById("productos");
  if (!container) return;
  container.innerHTML = "";

  // 👉 Math.min:
  // Devuelve el menor de los números pasados como argumento.
  // Aquí elige el menor entre "productos.length" y "3".
  // Ejemplo: si hay 10 productos, devuelve 3. Si hay 2 productos, devuelve 2.
  const limite = Math.min(productos.length, 3);

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
    btnVer.className = "btn btn-ver-mas m-1";
    btnVer.onclick = function () {
      mostrarModal(this.dataset.id);
    };

    const btnCarrito = document.createElement("button");
    btnCarrito.type = "button";
    btnCarrito.textContent = "Agregar al carrito 🛒";
    btnCarrito.className = "btn btn-warning m-1";
    btnCarrito.addEventListener("click", async () => {
      const { agregarAlCarrito } = await getCarritoModule();
      agregarAlCarrito({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        descripcion: p.descripcion,
        img: p.img,
        categoria: p.categoria
      });
    });

    card.append(img, h3, desc, precio, btnVer, btnCarrito);
    container.appendChild(card);
  }
}

// --- Cargar productos desde JSON ---
fetch("./assets/js/productos.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((p) => {
      productos.push(new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img, p.categoria));
    });
    renderDestacados(); 
  })
  .catch((err) => console.error("Error cargando productos:", err));

// --- Loader ---
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); 
});

// --- Tooltips de Bootstrap ---
document.addEventListener("DOMContentLoaded", function () {
  // 👉 [].slice.call():
  // "slice" normalmente copia una parte de un array.
  // Pero cuando hacemos [].slice.call(NodeList), lo que hace es:
  // convertir un NodeList (resultado de querySelectorAll) en un array verdadero.
  // "call" permite ejecutar "slice" como si el NodeList fuera un array.
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

  // 👉 .map:
  // Recorre cada elemento de un array y devuelve un nuevo array con el resultado.
  // Aquí recorre todos los elementos con data-bs-toggle="tooltip"
  // y para cada uno crea un "Tooltip" de Bootstrap.
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    // 👉 new bootstrap.Tooltip():
    // "Tooltip" es un componente de Bootstrap que muestra un mensaje flotante
    // cuando el usuario pasa el mouse sobre un elemento.
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
});

// --- Gestión de sesión ---
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
