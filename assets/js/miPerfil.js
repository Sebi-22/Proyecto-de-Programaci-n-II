// perfil.js
document.addEventListener("DOMContentLoaded", () => {
  let userData = JSON.parse(localStorage.getItem("usuario")) || {};

  // Asegurar valores por defecto
  userData = {
    nombre: userData.nombre || "Invitado",
    email: userData.email || "invitado@mazal.com",
    telefono: userData.telefono || "No registrado",
    direccion: userData.direccion || "Sin dirección",
    ciudad: userData.ciudad || "Sin ciudad",
    cp: userData.cp || "---",
    pedidos: Array.isArray(userData.pedidos) ? userData.pedidos : []
  };

  // Cargar datos en el DOM
  document.getElementById("perfilNombre").textContent = userData.nombre;
  document.getElementById("perfilEmail").textContent = userData.email;
  document.getElementById("perfilTelefono").textContent = userData.telefono;
  document.getElementById("perfilDireccion").textContent = userData.direccion;
  document.getElementById("perfilCiudad").textContent = userData.ciudad;
  document.getElementById("perfilCP").textContent = userData.cp;

  const pedidosList = document.getElementById("perfilPedidos");
  if (userData.pedidos.length > 0) {
    userData.pedidos.forEach(p => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `Pedido #${p.id} - ${p.estado}`;
      pedidosList.appendChild(li);
    });
  } else {
    pedidosList.innerHTML = "<li class='list-group-item'>No tenés pedidos aún</li>";
  }

  // Cerrar sesión
  document.getElementById("cerrarSesionBtn").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    window.location.href = "../index.html";
  });
});
