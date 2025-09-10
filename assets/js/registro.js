// registro.js
const registroForm = document.getElementById('registroForm');

registroForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const ciudad = document.getElementById('ciudad').value.trim();
  const cp = document.getElementById('cp').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!nombre || !email || !password || !confirmPassword || !telefono || !direccion || !ciudad || !cp) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Guardar en localStorage
  const userData = {
    nombre,
    email,
    telefono,
    direccion,
    ciudad,
    cp,
    password, // ⚠️ Solo simulación (no seguro en la vida real)
    pedidos: []
  };

  localStorage.setItem("usuario", JSON.stringify(userData));

  alert(`¡Cuenta creada para ${nombre}!`);
  registroForm.reset();

  // Redirigir al perfil
  window.location.href = '/pages/perfil.html';
});
export { registroForm };