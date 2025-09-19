// Obtiene el formulario de contacto por su ID
const form = document.getElementById("formContacto");

if (form) {
  // Agrega un listener al evento 'submit' del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto (recargar la página)

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
      alert(resultado); // then: muestra el mensaje si la promesa fue exitosa
      // Muestra los datos enviados en la consola
      console.log("Datos enviados:", { nombre, correo, instagram, mensaje });
    })
    .catch(error => {
      alert(error); // catch: muestra el mensaje de error si la promesa fue rechazada
    });
  });
}


// --- Loader ---
// Muestra un loader (pantalla de carga) durante 2 segundos al cargar la página y luego lo oculta
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); // hidden: clase CSS para ocultar el loader
});


// Slice de productos para scroll infinito (en catálogo)
// .Slice: método que devuelve una copia de una parte del array
// .call: método que llama a una función con un valor this específico
// --- Tooltips de Bootstrap ---
// Inicializa los tooltips de Bootstrap en los elementos que los tengan definidos 
// data-bs-toggle="tooltip"
// .map : método que crea un nuevo array con los resultados de la llamada a una función para cada elemento del array
// <!-- BOTÓN WHATSAPP con tooltip -->
  document.addEventListener("DOMContentLoaded", function () {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  });

