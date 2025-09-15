const form = document.getElementById("formContacto");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitamos que se recargue para mostrar mensajes

    // Solo tomamos los datos para mostrarlos en consola o alert
    const nombre = form.name.value;
    const correo = form.mail.value;
    const instagram = form.insta.value;
    const mensaje = form.msg.value;

    // Simulamos el envío con then/catch
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
