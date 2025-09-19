// --- Inicializar carrito desde localStorage ---
// Intenta recuperar el carrito guardado en localStorage
let carrito = [];
try {
  // localStorage.getItem(): obtiene el valor almacenado bajo la clave "carrito"
  // JSON.parse(): convierte la cadena JSON a un objeto JavaScript
  const data = localStorage.getItem("carrito");
  carrito = data ? JSON.parse(data) : [];
} catch (e) {
  // Si hay error al leer o parsear, muestra el error y limpia el carrito
  console.error("⚠️ Error al leer carrito del localStorage:", e);
  carrito = [];
  localStorage.removeItem("carrito");
}

// --- Actualizar badge ---
// Actualiza el número del carrito (badge) en el ícono del carrito
function actualizarBadge() {
  // Selecciona el <span> que está justo después del ícono con clase .bi-cart-fill
  const badge = document.querySelector(".bi-cart-fill + span");
  if (badge) badge.textContent = carrito.length;
}

// --- Guardar carrito ---
// Guarda el carrito actualizado en localStorage y actualiza el badge
// localStorage.setItem(): guarda el valor bajo la clave "carrito"
// JSON.stringify(): convierte el array carrito a una cadena JSON
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarBadge();
}

// --- Agregar producto ---
// Agrega un producto al carrito y lo guarda
// ...producto: spread operator, copia todas las propiedades del producto
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
// Elimina un producto del carrito por su id y actualiza la vista
function eliminarDelCarrito(id) {
  carrito = carrito.filter((p) => p.id !== id);
  guardarCarrito();
  renderCarrito();
}

// --- Render carrito ---
// Muestra el contenido del carrito en el DOM
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

    // Al hacer click en "Eliminar", elimina el producto del carrito
    item.querySelector("button").addEventListener("click", () => eliminarDelCarrito(p.id));
    container.appendChild(item);
  });

  // Calcula el total sumando los precios de todos los productos
  // reduce: método que acumula el total
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  if (totalEl) totalEl.textContent = `$${total}`;
}

// --- Inicialización ---
// Cuando el DOM esté listo, actualiza el badge y muestra el carrito
document.addEventListener("DOMContentLoaded", () => {
  actualizarBadge();
  renderCarrito();

  // Botón para pagar
  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("❌ El carrito está vacío");
        return;
      }
      alert("✅ Redirigiendo a la pasarela de pago...");
      // window.location.href: redirige al link de pago
      window.location.href = "https://link.mercadopago.com.ar/mazalparatodos";
    });
  }
});

export { agregarAlCarrito };

// --- Botón de volver a la página principal ---
const btnVolver = document.getElementById("btnVolver");
if (btnVolver) {
  btnVolver.addEventListener("click", () => {
    window.location.href = "../index.html"; // Redirige a la página principal
  });
}

// --- Botón de pagar (duplicado, por si se quiere modificar el link aquí también) ---
const btnPagar = document.getElementById("btnPagar");
if (btnPagar) {
  btnPagar.addEventListener("click", () => {
    // Obtiene el carrito actualizado desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
      alert("❌ El carrito está vacío");
      return;
    }
    alert("✅ Redirigiendo a la pasarela de pago...");
    window.location.href = "https://link.mercadopago.com.ar/mazalparatodos";
  });
}