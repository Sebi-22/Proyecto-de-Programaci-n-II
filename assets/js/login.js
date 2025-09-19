const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = form.email.value.trim();
    const password = form.password.value.trim();

    // Validación básica de correo
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
      form.reset();
      window.location.href = "/index.html";
    })
    .catch(error => {
      alert(error);
    });
  });
}