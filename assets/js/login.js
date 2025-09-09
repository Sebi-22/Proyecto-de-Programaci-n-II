// login.js
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Aquí se puede agregar validación real o conexión con backend
  if(email === '' || password === ''){
    alert('Por favor completa todos los campos');
    return;
  }

  // Simulación de inicio de sesión
  alert(`¡Bienvenido, ${email}!`);
  loginForm.reset();

  // Redirigir al home o perfil
  window.location.href = '../index.html';
});
export { loginForm };