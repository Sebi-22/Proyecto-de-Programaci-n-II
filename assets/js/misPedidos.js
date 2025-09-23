// --- Funciones utilitarias de carrito/pedidos ---

function getCarrito() {
  // JSON.parse convierte el string del localStorage en un objeto JS
  // Si no hay nada, devolvemos un array vacío
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function saveCarrito(carrito) {
  // JSON.stringify convierte el objeto JS en un string para guardarlo en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = getCarrito();

  // reduce() recorre todos los productos del carrito y acumula la cantidad total
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  // Actualiza el número en el ícono del carrito
  document.querySelector(".bi-cart-fill")
    .nextElementSibling.textContent = totalItems;
}

// --- Gestión de pedidos ---

function getPedidos() {
  // JSON.parse para obtener pedidos como objetos desde localStorage
  return JSON.parse(localStorage.getItem("pedidos")) || [];
}

function savePedidos(pedidos) {
  // JSON.stringify convierte el array de pedidos a string para guardarlo
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Renderiza pedidos
function renderPedidos() {
  const listaPedidos = document.getElementById("listaPedidos");
  const pedidos = getPedidos();

  if (pedidos.length === 0) {
    listaPedidos.innerHTML = `<p class="text-muted">No tienes pedidos todavía.</p>`;
    return;
  }

  listaPedidos.innerHTML = "";

  pedidos.forEach(pedido => {
    // reduce() suma el precio de cada producto multiplicado por su cantidad
    const total = pedido.productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm";

    card.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <span><strong>Pedido #${pedido.id}</strong> - ${pedido.fecha}</span>
        <span class="badge bg-primary">${pedido.estado || "Pendiente"}</span>
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush mb-3">
          ${pedido.productos.map(p => `
            <li class="list-group-item d-flex justify-content-between">
              <span>${p.nombre} (x${p.cantidad})</span>
              <span>$${p.precio * p.cantidad}</span>
            </li>
          `).join("")}
        </ul>
        <div class="d-flex justify-content-between">
          <strong>Total: $${total}</strong>
          <button class="btn btn-warning btn-sm repetir-btn" data-id="${pedido.id}">
            <i class="bi bi-arrow-repeat"></i> Repetir Pedido
          </button>
        </div>
      </div>
    `;

    listaPedidos.appendChild(card);
  });

  // Botones de repetir pedido
  document.querySelectorAll(".repetir-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idPedido = e.target.closest("button").dataset.id;
      repetirPedido(idPedido);
    });
  });
}

// Repite un pedido
function repetirPedido(id) {
  const pedidos = getPedidos();

  // find() busca el primer pedido que tenga el mismo id
  const pedido = pedidos.find(p => p.id == id);
  if (!pedido) return;

  let carrito = getCarrito();

  pedido.productos.forEach(prod => {
    // find() busca si el producto ya existe en el carrito
    const existe = carrito.find(item => item.id === prod.id);
    if (existe) {
      // Si existe, le sumamos la cantidad
      existe.cantidad += prod.cantidad;
    } else {
      // Si no existe, lo agregamos tal cual
      carrito.push({ ...prod });
    }
  });

  saveCarrito(carrito);
  alert(`Pedido #${id} repetido. Se agregaron productos al carrito.`);
}

// Render inicial
renderPedidos();
actualizarContadorCarrito();
