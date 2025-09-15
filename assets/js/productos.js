// ---- Clase Producto ----
class Producto {
  #id; #nombre; #precio; #descripcion; #img; #categoria;

  constructor(id, nombre, precio, descripcion, img, categoria) {
    this.#id = id;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#descripcion = descripcion;
    this.#img = img;
    this.#categoria = categoria;
  }

  // Getters para acceder a las propiedades
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get precio() { return this.#precio; }
  get descripcion() { return this.#descripcion; }
  get img() { return this.#img; }
  get categoria() { return this.#categoria; }

  // Método para generar la tarjeta HTML del producto
  renderCard() {
    return `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${this.img}" class="card-img-top" alt="${this.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="card-text">$${this.precio}</p>
            <button class="btn btn-morado" data-id="${this.id}" data-bs-toggle="modal" data-bs-target="#productModal">
              Ver más
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// ---- Array de productos ----
const productos = [
  new Producto(1, "Anillo Solitario", 1575, "Anillo solitario cubic rosa.", "assets/images/Anillo solitario cubic rosa.jpg", "anillos"),
  new Producto(2, "Pulsera de acero CHARMS", 6195, "Acero CHARMS osos marron.", "assets/images/Pulsera acero CHARMS Oso marron.jpg", "pulseras"),
  new Producto(3, "Cadena de acero", 3335, "Acero trenzada cierre marinero.", "assets/images/Cadena Acero trenzada cierre marinero.jpg", "collares"),
  new Producto(4, "Pulsera de acero rolo", 2550, "Acero rolo cierre marinero.", "assets/images/Pulsera acero rolo cierre marinero.jpg", "pulseras"),
  new Producto(5, "Dijes de acero", 1248, "Acero cruz inflada corazones.", "assets/images/Dije acero cruz inflada corazonres.jpg", "dijes/colgantes"),
  new Producto(6, "Dije Colibri", 735, "Acero colibri.", "assets/images/dije acero colibri.jpg", "dijes/colgantes"),
  new Producto(7, "Aros colgante doble circulos", 1155, "Acero colgante doble circulos.", "assets/images/Aros acero colgante doble circulos.jpg", "aros"),
  new Producto(8, "Abridor acero mariposa y cobra x12 pares", 18748, "Abridor de acero mariposa y cobrea x12 pares.", "assets/images/Abridor acero mariposa y cobra x12 pares.jpg", "abridores")
];

// ---- Exportaciones ----
export { Producto, productos };

