import { Producto } from "./productos.js";

let productos = [];

fetch("../assets/js/productos.json")
  .then(res => {
    if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    productos = data.map(p => new Producto(p.id, p.nombre, p.precio, p.descripcion, p.img));
    renderProductos();
  })
  .catch(err => console.error("Error cargando productos:", err));

function renderProductos(filtrados = productos) {
  const container = document.getElementById("productos");
  if(!container) return;

  container.innerHTML = filtrados.map(p => p.renderCard()).join("");

  document.querySelectorAll("[data-id]").forEach(btn => {
    btn.addEventListener("click", e => mostrarModal(e.currentTarget.getAttribute("data-id")));
  });
}

// Modal igual que en Home
function mostrarModal(id){
  const producto = productos.find(p => p.id == id);
  if(!producto) return;

  const modalTitle = document.getElementById("productModalLabel");
  const modalBody = document.querySelector("#productModal .modal-body");

  modalTitle.textContent = producto.nombre;
  modalBody.innerHTML = `
    <img src="${producto.img}" class="img-fluid mb-3" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcion}</p>
  `;

  new bootstrap.Modal(document.getElementById("productModal")).show();
}

// Filtro de precios opcional
const filtroPrecio = document.getElementById("filtroPrecio");
if(filtroPrecio){
  filtroPrecio.addEventListener("change", e=>{
    const valor = e.target.value;
    let filtrados = productos;
    if(valor === "0-3000") filtrados = productos.filter(p => p.precio <= 3000);
    else if(valor === "3001-5000") filtrados = productos.filter(p => p.precio >= 3001 && p.precio <= 5000);
    else if(valor === "5001-10000") filtrados = productos.filter(p => p.precio > 5000);
    renderProductos(filtrados);
  });
}
export { productos, mostrarModal };
