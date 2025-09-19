// ---- Clase Producto ----
// Definición de la clase Producto usando campos privados (#)
// Los campos privados (#) solo pueden ser accedidos dentro de la clase
class Producto {
  #id; #nombre; #precio; #descripcion; #img; #categoria;

  constructor(id, nombre, precio, descripcion, img, categoria) {
    // Asigna los valores recibidos a los campos privados
    this.#id = id;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#descripcion = descripcion;
    this.#img = img;
    this.#categoria = categoria;
  }

  // Getters: permiten acceder a los campos privados desde fuera de la clase
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get precio() { return this.#precio; }
  get descripcion() { return this.#descripcion; }
  get img() { return this.#img; }
  get categoria() { return this.#categoria; }

  // Método para generar el HTML de la tarjeta del producto
  // return: devuelve una cadena de texto con el HTML de la tarjeta
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
    // data-bs-toggle="modal" y data-bs-target="#productModal": atributos de Bootstrap para abrir el modal al hacer click
  }
}

// ---- Array de productos ----
// Crea un array con instancias de Producto usando la clase definida arriba
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
// Exporta la clase Producto y el array productos para que puedan ser usados en otros archivos
export { Producto, productos };