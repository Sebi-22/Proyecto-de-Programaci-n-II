import { productos } from "./productos.js"; // Array de productos

let carrito = []; // Array del carrito

// ---- Cargar carrito ----
function cargarCarrito() {
  let data = localStorage.carrito || "[]";
  try {
    carrito = (new Function("return " + data))();
    if (!Array.isArray(carrito)) carrito = [];
  } catch {
    carrito = [];
  }
}

// ---- Guardar carrito ----
function guardarCarrito() {
  let resultado = "[";
  for (let i = 0; i < carrito.length; i++) {
    let item = carrito[i];
    let props = "{";
    let primera = true;
    for (let key in item) {
      if (!primera) props += ",";
      props += key + ':"' + item[key] + '"';
      primera = false;
    }
    props += "}";
    resultado += props;
    if (i < carrito.length - 1) resultado += ",";
  }
  resultado += "]";
  localStorage.carrito = resultado;
}

// ---- Agregar producto al carrito ----
function agregarAlCarrito(id, cantidad) {
  let encontrado = false;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito[i].cantidad += cantidad;
      encontrado = true;
      break;
    }
  }
  if (!encontrado) {
    carrito.push({ id: id, cantidad: cantidad });
  }
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
}

// ---- Actualizar contador ----
function actualizarContadorCarrito() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  const badge = document.querySelector(".bi-cart-fill + span");
  if (badge) badge.textContent = total;
}

// ---- Eliminar producto ----
function eliminarDelCarrito(id) {
  let nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id != id) {
      nuevoCarrito[nuevoCarrito.length] = carrito[i];
    }
  }
  carrito = nuevoCarrito;
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
}

// ---- Mostrar carrito ----
function renderCarrito() {
  const contenedor = document.getElementById("listaCarrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito</p>";
    return;
  }

  for (let i = 0; i < carrito.length; i++) {
    let item = carrito[i];
    let producto = null;

    for (let j = 0; j < productos.length; j++) {
      if (productos[j].id == item.id) {
        producto = productos[j];
        break;
      }
    }

    if (producto) {
      const div = document.createElement("div");
      div.className = "d-flex justify-content-between align-items-center border p-2 mb-2";
      div.innerHTML = `
        <div>
          <strong>${producto.nombre}</strong> <br>
          Cantidad: ${item.cantidad} <br>
          Precio: $${producto.precio * item.cantidad}
        </div>
        <button class="btn btn-danger btn-sm" data-id="${producto.id}">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      `;
      div.querySelector("button").addEventListener("click", function() {
        eliminarDelCarrito(this.dataset.id);
      });
      contenedor.appendChild(div);
    }
  }
}

// ---- Inicializar ----
document.addEventListener("DOMContentLoaded", function() {
  cargarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
});

// ---- Exportaciones ----
export { actualizarContadorCarrito, eliminarDelCarrito, renderCarrito, agregarAlCarrito };
