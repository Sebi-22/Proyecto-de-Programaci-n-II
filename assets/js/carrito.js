// --- Inicializar carrito desde localStorage ---
let carrito = [];
try {
  const data = localStorage.getItem("carrito");
  carrito = data ? JSON.parse(data) : [];
} catch (e) {
  console.error("⚠️ Error al leer carrito del localStorage:", e);
  carrito = [];
  localStorage.removeItem("carrito");
}

// --- Actualizar badge ---
function actualizarBadge() {
  const badge = document.querySelector(".bi-cart-fill + span");
  if (badge) badge.textContent = carrito.length;
}

// --- Guardar carrito ---
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarBadge();
}

// --- Agregar producto ---
function agregarAlCarrito(producto) {
  if (!producto || !producto.id || !producto.nombre || producto.precio == null) {
    console.error("Producto inválido:", producto);
    alert("❌ No se pudo agregar el producto al carrito.");
    return;
  }
  carrito.push({ ...producto });
  guardarCarrito();
  alert(`✅ ${producto.nombre} agregado al carrito`);
  renderCarrito();
}

// --- Eliminar producto ---
function eliminarDelCarrito(id) {
  carrito = carrito.filter((p) => p.id !== id);
  guardarCarrito();
  renderCarrito();
}

// --- Render carrito ---
function renderCarrito() {
  const container = document.getElementById("listaCarrito");
  const totalEl = document.getElementById("totalCarrito");
  if (!container) return;

  container.innerHTML = "";

  if (carrito.length === 0) {
    container.innerHTML = `<p class="text-center">El carrito está vacío 🛒</p>`;
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  carrito.forEach((p) => {
    const item = document.createElement("div");
    item.className = "d-flex justify-content-between align-items-center border-bottom p-2";
    item.innerHTML = `
      <div>
        <strong>${p.nombre}</strong><br>
        <small>$${p.precio}</small>
      </div>
      <button class="btn btn-sm btn-danger">Eliminar</button>
    `;

    item.querySelector("button").addEventListener("click", () => eliminarDelCarrito(p.id));
    container.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  if (totalEl) totalEl.textContent = `$${total}`;
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  actualizarBadge();
  renderCarrito();

  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("❌ El carrito está vacío");
        return;
      }
      alert("✅ Redirigiendo a la pasarela de pago...");
      // ✅ Aquí va tu link de pago
      window.location.href = "https://link.mercadopago.com.ar/mazalparatodos";
    });
  }
});

export { agregarAlCarrito };


// Botón de volver a la página principal
const btnVolver = document.getElementById("btnVolver");
if (btnVolver) {
  btnVolver.addEventListener("click", () => {
    window.location.href = "../index.html"; // Cambiar según la ruta de tu página principal
  });
}

// Botón de pagar (ya está en carrito.js, pero si querés modificar link lo podés hacer aquí también)
const btnPagar = document.getElementById("btnPagar");
if (btnPagar) {
  btnPagar.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
      alert("❌ El carrito está vacío");
      return;
    }
    alert("✅ Redirigiendo a la pasarela de pago...");
    window.location.href = "https://link.mercadopago.com.ar/mazalparatodos";
  });
}