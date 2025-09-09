class Producto {
  #id;
  #nombre;
  #precio;
  #descripcion;
  #img;

  constructor(id, nombre, precio, descripcion, img) {
    this.#id = id;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#descripcion = descripcion;
    this.#img = img;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get precio() { return this.#precio; }
  get descripcion() { return this.#descripcion; }
  get img() { return this.#img; }

  renderCard() {
    return `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0">
          <img src="${this.img}" class="card-img-top" alt="${this.nombre}">
          <div class="card-body text-center bg-white rounded-bottom">
            <h5 class="card-title" style="color:#a259c6;">${this.nombre}</h5>
            <p class="card-text text-dark">$${this.precio}</p>
            <button class="btn btn-morado" data-id="${this.id}" data-bs-toggle="modal" data-bs-target="#productModal">Ver más</button>
          </div>
        </div>
      </div>
    `;
  }
}

export { Producto };
