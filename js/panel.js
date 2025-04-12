function mostrarContenido(id) {
    // Quitar clase activa de todos los elementos del sidebar
    document.querySelectorAll(".sidebar ul li").forEach((item) => {
      item.classList.remove("active");
    });
  
    // Ocultar todos los contenidos
    document.querySelectorAll(".contenido").forEach((seccion) => {
      seccion.classList.remove("visible");
    });
  
    // Mostrar contenido seleccionado
    const seccion = document.getElementById(id);
    if (seccion) {
      seccion.classList.add("visible");
    }
  
    // Agregar clase activa al elemento del menú seleccionado
    const elementos = document.querySelectorAll(".sidebar ul li");
    elementos.forEach((li) => {
      if (li.textContent.toLowerCase().includes(id)) {
        li.classList.add("active");
      }
    });
  }
  
  function cerrarSesion() {
    const mensaje = document.getElementById('mensaje-cerrando');
    mensaje.classList.add('visible');
  
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
  