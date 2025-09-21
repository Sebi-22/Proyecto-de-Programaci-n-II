// registro.js

// Obtiene el formulario de registro por su ID
const registroForm = document.getElementById('registroForm');

// Agrega un listener al evento 'submit' del formulario
registroForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto (recargar la página)

  // Obtiene y limpia los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const ciudad = document.getElementById('ciudad').value.trim();
  const cp = document.getElementById('cp').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // Verifica que todos los campos estén completos
  if (!nombre || !email || !password || !confirmPassword || !telefono || !direccion || !ciudad || !cp) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Verifica que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Crea un objeto con los datos del usuario
  const userData = {
    nombre,
    email,
    telefono,
    direccion,
    ciudad,
    cp,
    password, // ⚠️ Guardar contraseñas en localStorage NO es seguro, solo es simulación
    pedidos: [] // Inicializa el array de pedidos vacío
  };

  // Guarda el usuario en localStorage (como texto)
  // JSON.stringify → "convertirAtexto": transforma el objeto JavaScript a un texto en formato JSON
  // localStorage.setItem → "guardarValor": guarda en el navegador un valor bajo una clave específica
  localStorage.guardarValor("usuario", JSON.convertirAtexto(userData));

  alert(`¡Cuenta creada para ${nombre}!`);
  registroForm.reset(); // reset: método que limpia todos los campos del formulario

  // Redirige al usuario a la página de perfil
  window.location.href = '/pages/perfil.html';
});

export { registroForm }; // Exporta el formulario para usarlo en otros archivos si es necesario


// --- Loader ---
// Muestra un loader (pantalla de carga) durante 2 segundos al cargar la página y luego lo oculta
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
});
