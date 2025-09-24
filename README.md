# Proyecto de Programación II

Este proyecto es una aplicación web desarrollada en **HTML**, **CSS** y **JavaScript**, con el uso de **Bootstrap** para el diseño responsivo y dinámico.  
Incluye funcionalidades de carrito de compras, manejo de formularios, integración de modales y almacenamiento en el navegador mediante `localStorage`.

---

## 🚀 Tecnologías utilizadas
- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **Bootstrap 5**

---

## 📂 Estructura del proyecto
- `index.html` → Página principal  
- `styles.css` → Estilos personalizados  
- `scripts/` → Archivos JavaScript con la lógica de la aplicación  
- `assets/` → Imágenes e íconos  

---
## 📂 Páginas HTML

- **carrito.html** → Página del carrito de compras donde se muestran los productos agregados y el botón de pago.  
- **contactos.html** → Página de contacto con formulario para consultas o soporte.  
- **medidas.html** → Sección para guías de talles o medidas de productos.  
- **miPerfil.html** → Página del perfil del usuario con información personal y opciones de edición.  
- **pedidos.html** → Página donde el usuario puede ver el historial de pedidos realizados.  
- **perfil.html** → Otra sección de perfil (puede ser versión pública o de visualización básica).  
- **productos.html** → Catálogo de productos disponibles con opción de ver más detalles.  
- **registro.html** → Página de registro para nuevos usuarios.  

## 📂 Archivos JavaScript

- **carrito.js** → Maneja la lógica del carrito de compras (agregar, eliminar, calcular totales, guardar en `localStorage`).  
- **catalogo.js** → Controla la carga y el filtrado de productos en el catálogo.  
- **contacto.js** → Valida y procesa el formulario de contacto.  
- **login.js** → Lógica de inicio de sesión y validación de usuarios.  
- **miPerfil.js** → Muestra y actualiza la información del perfil del usuario.  
- **misPedidos.js** → Lista los pedidos realizados por el usuario.  
- **productos.js** → Define la clase Producto y métodos relacionados con la gestión de productos.  
- **productos.json** → Archivo con datos simulados de productos (mock data).  
- **registro.js** → Valida y guarda nuevos registros de usuarios.  
- **script.js** → Funciones generales usadas en distintas partes de la aplicación.  

## 📖 Recursos y documentación utilizada

### 🔹 JavaScript
El proyecto utiliza varios métodos y propiedades de JavaScript.  
A continuación, una lista con enlaces a la documentación oficial (MDN):

- [Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  
- [Array.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)  
- [Array.reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)  
- [Array.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  
- [Array.forEach()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)  
- [Array.includes()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)  
- [Array.slice()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)  
- [Array.push()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push)  
- [String.trim()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/trim)  
- [JSON.parse()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)  
- [JSON.stringify()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)  
- [localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)  
- [document.getElementById()](https://developer.mozilla.org/es/docs/Web/API/Document/getElementById)  
- [document.querySelector()](https://developer.mozilla.org/es/docs/Web/API/Document/querySelector)  
- [document.querySelectorAll()](https://developer.mozilla.org/es/docs/Web/API/Document/querySelectorAll)  
- [document.createElement()](https://developer.mozilla.org/es/docs/Web/API/Document/createElement)  
- [Element.appendChild()](https://developer.mozilla.org/es/docs/Web/API/Node/appendChild)  
- [Element.closest()](https://developer.mozilla.org/es/docs/Web/API/Element/closest)  
- [EventTarget.addEventListener()](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)  
- [Event.preventDefault()](https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault)  
- [console.log()](https://developer.mozilla.org/es/docs/Web/API/console/log)  

---

### 🔹 HTML
Algunas etiquetas HTML utilizadas en este proyecto con su documentación oficial:  

- [<!DOCTYPE html>](https://developer.mozilla.org/es/docs/Glossary/Doctype)  
- [&lt;html&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/html)  
- [&lt;head&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/head)  
- [&lt;body&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/body)  
- [&lt;div&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/div)  
- [&lt;form&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/form)  
- [&lt;button&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/button)  
- [&lt;input&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/input)  
- [&lt;label&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/label)  
- [&lt;a&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/a)  
- [&lt;img&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/img)  
- [&lt;aside&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/aside)  
- [&lt;footer&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/footer)  
- [&lt;h1&gt; … &lt;h5&gt;](https://developer.mozilla.org/es/docs/Web/HTML/Element/Heading_Elements)  

---

### 🔹 CSS
Propiedades más utilizadas en el proyecto:  

- [color](https://developer.mozilla.org/es/docs/Web/CSS/color)  
- [background](https://developer.mozilla.org/es/docs/Web/CSS/background)  
- [background-color](https://developer.mozilla.org/es/docs/Web/CSS/background-color)  
- [border](https://developer.mozilla.org/es/docs/Web/CSS/border)  
- [border-radius](https://developer.mozilla.org/es/docs/Web/CSS/border-radius)  
- [box-shadow](https://developer.mozilla.org/es/docs/Web/CSS/box-shadow)  
- [display](https://developer.mozilla.org/es/docs/Web/CSS/display)  
- [flex](https://developer.mozilla.org/es/docs/Web/CSS/flex)  
- [flex-direction](https://developer.mozilla.org/es/docs/Web/CSS/flex-direction)  
- [align-items](https://developer.mozilla.org/es/docs/Web/CSS/align-items)  
- [font-size](https://developer.mozilla.org/es/docs/Web/CSS/font-size)  
- [font-family](https://developer.mozilla.org/es/docs/Web/CSS/font-family)  
- [position](https://developer.mozilla.org/es/docs/Web/CSS/position)  
- [animation](https://developer.mozilla.org/es/docs/Web/CSS/animation)  

---

### 🔹 Bootstrap
Se utilizó **Bootstrap 5** para el diseño y componentes.  
Documentación oficial:  
- [Bootstrap - Introducción](https://getbootstrap.com/docs/5.3/getting-started/introduction/)  
- [Componentes de Bootstrap](https://getbootstrap.com/docs/5.3/components/)  
- [Utilidades de Bootstrap](https://getbootstrap.com/docs/5.3/utilities/overview/)  

---

## 👨‍🎓 Créditos
- Documentación de **MDN Web Docs**: [https://developer.mozilla.org/es/](https://developer.mozilla.org/es/)  
- Documentación de **Bootstrap**: [https://getbootstrap.com/](https://getbootstrap.com/)  

---
