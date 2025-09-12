import { productos } from "./productos.json"; // ya tenés los productos cargados

// ✅ Actualiza el numerito del carrito en el navbar
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  let total = 0;

  for (const item of carrito) {
    total += item.cantidad;
  }

  const badge = document.querySelector(".bi-cart-fill + span");
  if (badge) badge.textContent = total;
}

// ✅ Eliminar producto
function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  carrito = carrito.filter(item => item.id != id);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderCarrito();
}

// ✅ Mostrar productos dentro del carrito
function renderCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const contenedor = document.getElementById("listaCarrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito</p>";
    return;
  }

  for (const item of carrito) {
    const producto = productos.find(p => p.id == item.id);
    if (!producto) continue;

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

    div.querySelector("button").addEventListener("click", (e) => {
      eliminarDelCarrito(e.currentTarget.dataset.id);
    });

    contenedor.appendChild(div);
  }
}

// ✅ Inicializar al entrar
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderCarrito();
});

export { actualizarContadorCarrito, eliminarDelCarrito, renderCarrito };
