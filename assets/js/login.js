const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email === '' || password === '') {
    alert('Por favor completa todos los campos');
    return;
  }

  // Guardamos sesión en localStorage (simulación)
  localStorage.setItem('usuario', JSON.stringify({ email }));

  alert(`¡Bienvenido, ${email}!`);
  loginForm.reset();

  // Redirigir al home
  window.location.href = '../index.html';
});

export { loginForm };
