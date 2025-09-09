class Producto {
  #id; #nombre; #precio; #descripcion; #img;

  constructor(id, nombre, precio, descripcion, img){
    this.#id = id;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#descripcion = descripcion;
    this.#img = img;
  }

  get id(){ return this.#id; }
  get nombre(){ return this.#nombre; }
  get precio(){ return this.#precio; }
  get descripcion(){ return this.#descripcion; }
  get img(){ return this.#img; }

  renderCard(){
    return `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${this.img}" class="card-img-top" alt="${this.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="card-text">$${this.precio}</p>
            <button class="btn btn-morado" data-id="${this.id}" data-bs-toggle="modal" data-bs-target="#productModal">Ver más</button>
          </div>
        </div>
      </div>
    `;
  }
}

export { Producto };
