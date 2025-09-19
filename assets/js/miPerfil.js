// Obtiene el formulario de login por su ID
const loginForm = document.getElementById('loginForm');

// Agrega un listener al evento 'submit' del formulario
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto (recargar la página)

  // Obtiene y limpia los valores de los campos del formulario
  // trim(): elimina los espacios en blanco al inicio y al final del texto
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Verifica que ambos campos estén completos
  if (email === '' || password === '') {
    alert('Por favor completa todos los campos');
    return;
  }

  // Guarda la sesión en localStorage (simulación)
  // JSON.stringify(): convierte el objeto a una cadena JSON
  // localStorage.setItem(): guarda el valor bajo la clave 'usuario'
  localStorage.setItem('usuario', JSON.stringify({ email }));

  alert(`¡Bienvenido, ${email}!`);
  loginForm.reset(); // reset: método que limpia todos los campos del formulario

  // Redirige al usuario a la página principal (home)
  // window.location.href: propiedad para cambiar la URL y redirigir
  window.location.href = '../index.html';
});

export { loginForm }; // Exporta el formulario para usarlo en otros archivos si es necesario


// --- Loader ---
// Muestra un loader (pantalla de carga) durante 2 segundos al cargar la página y luego lo oculta
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); // hidden: clase CSS para ocultar el loader
});