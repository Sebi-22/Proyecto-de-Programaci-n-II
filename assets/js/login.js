const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    // preventDefault(): método que evita la acción por defecto de un evento.
    // En este caso, impide que el formulario recargue la página al enviarse,
    // permitiendo manejar el proceso con JavaScript (validaciones, redirección, etc.).

    const correo = form.email.value.trim();
    const password = form.password.value.trim();

    // Validación básica de correo con expresión regular
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    new Promise((resolve, reject) => {
      if (correo && password && correoValido) {
        resolve("¡Inicio de sesión exitoso!");
      } else {
        reject("Faltan datos obligatorios o el correo no es válido");
      }
    })
    .then(resultado => {
      alert(resultado);
      form.reset(); // reset: método que limpia todos los campos del formulario
      window.location.href = "/index.html"; // href: redirige al usuario a la página principal
    })
    .catch(error => {
      alert(error);
    });
  });
}
export { form }; // Exporta el formulario para usarlo en otros archivos si es necesario