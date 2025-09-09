import { Producto } from "./productos.js";

let productos = [];

fetch("./assets/js/productos.json") // ruta correcta desde la raíz
  .then(res => res.json())
  .then(data => {
    productos = data.map(p => new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    renderProductos();
  })
  .catch(err => console.error("Error cargando productos:", err));

function renderProductos() {
  const container = document.getElementById("productos");
  if (!container) return;

  container.innerHTML = productos.map(p => p.renderCard()).join("");

  document.querySelectorAll("[data-id]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      mostrarModal(id);
    });
  });
}

function mostrarModal(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  const modalBody = document.querySelector("#productModal .modal-body");
  const modalTitle = document.querySelector("#productModalLabel");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;
}
// Inicializar Bootstrap Modal
const productModal = new bootstrap.Modal(document.getElementById('productModal'), {
  keyboard: false
});
export { productos, mostrarModal };
