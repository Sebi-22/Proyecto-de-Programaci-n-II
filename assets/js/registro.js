// registro.js
const registroForm = document.getElementById('registroForm');

registroForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if(!nombre || !email || !password || !confirmPassword){
    alert('Por favor completa todos los campos');
    return;
  }

  if(password !== confirmPassword){
    alert('Las contraseñas no coinciden');
    return;
  }

  // Simulación de registro
  alert(`¡Cuenta creada para ${nombre}!`);
  registroForm.reset();

  // Redirigir al login
  window.location.href = '/pages/perfil.html';
});
export { registroForm };