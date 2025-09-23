// --- REGISTRO DE USUARIO ---

// 1. Obtiene el formulario de registro por su ID
const registroForm = document.getElementById('registroForm');

// 2. Agrega un listener al evento 'submit' del formulario
registroForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene que el formulario recargue la página por defecto

  // 3. Obtiene y limpia los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const ciudad = document.getElementById('ciudad').value.trim();
  const cp = document.getElementById('cp').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // 4. Verifica que todos los campos estén completos
  if (!nombre || !email || !password || !confirmPassword || !telefono || !direccion || !ciudad || !cp) {
    alert('Por favor completa todos los campos');
    return;
  }

  // 5. Verifica que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // 6. Crea un objeto con los datos del usuario
  const userData = {
    nombre,      // Nombre del usuario
    email,       // Correo electrónico
    telefono,    // Teléfono
    direccion,   // Dirección
    ciudad,      // Ciudad
    cp,          // Código postal
    password,    // ⚠️ Guardar contraseñas en localStorage NO es seguro (solo simulación)
    pedidos: []  // Inicializa el array de pedidos vacío
  };

  /**
   * 7. Guarda el usuario en localStorage:
   *    - JSON.stringify(objeto) → convierte el objeto JS a texto en formato JSON.
   *    - localStorage.setItem(clave, valor) → guarda ese texto en el navegador bajo la clave dada.
   */
  localStorage.setItem("usuario", JSON.stringify(userData));

  // 8. Muestra un mensaje de confirmación
  alert(`¡Cuenta creada para ${nombre}!`);

  // 9. Limpia todos los campos del formulario
  registroForm.reset();

  // 10. Redirige al usuario a la página de perfil
  window.location.href = '/pages/perfil.html';
});

// Exporta el formulario para usarlo en otros archivos si es necesario
export { registroForm };


// --- LOADER ---
// Muestra un loader (pantalla de carga) durante 2 segundos al cargar la página y luego lo oculta
document.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden"); // Oculta el loader agregando la clase CSS "hidden"
});
