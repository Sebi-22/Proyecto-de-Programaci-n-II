// Obtiene el formulario de contacto por su ID
const form = document.getElementById("formContacto");

if (form) {
  // Agrega un listener al evento 'submit' del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    // preventDefault(): evita que el formulario recargue la página automáticamente.

    // Obtiene los valores de los campos del formulario
    const nombre = form.name.value;
    const correo = form.mail.value;
    const instagram = form.insta.value;
    const mensaje = form.msg.value;

    // Simula el envío del formulario usando una Promesa
    // then: método que se ejecuta si la promesa se resuelve correctamente
    // catch: método que se ejecuta si la promesa es rechazada (error)
    new Promise((resolve, reject) => {
      if (nombre && correo) {
        resolve("Formulario enviado correctamente!");
      } else {
        reject("Faltan datos obligatorios");
      }
    })
    .then(resultado => {
      alert(resultado); 
      console.log("Datos enviados:", { nombre, correo, instagram, mensaje });
    })
    .catch(error => {
      alert(error); 
    });
  });
}


// --- Loader ---
// Muestra un loader durante 2 segundos al cargar la página y luego lo oculta
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); // hidden: clase CSS que oculta el loader
});


// --- Tooltips de Bootstrap ---
// Inicializa los tooltips en los elementos que los tengan con data-bs-toggle="tooltip"
document.addEventListener("DOMContentLoaded", function () {
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  // slice(): devuelve una copia de una parte del array o NodeList. 
  // Acá se usa [].slice para convertir el resultado de querySelectorAll en un array real.

  // call(): ejecuta una función con un valor "this" específico. 
  // En este caso, [].slice.call(...) usa el método slice de Array aunque querySelectorAll devuelve un NodeList.

  tooltipTriggerList.map(function (tooltipTriggerEl) {
    // map(): recorre el array y devuelve un nuevo array con el resultado de aplicar la función a cada elemento.
    return new bootstrap.Tooltip(tooltipTriggerEl);
    // bootstrap.Tooltip: clase de Bootstrap que activa los tooltips en los elementos indicados.
  });
});

