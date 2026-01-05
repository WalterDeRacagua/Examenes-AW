const DEFAULTS = {
  tamanoImagen: "mediano",
  tamanoTexto: "mediano",
  colorFondo: "gris",
  colorTitulos: "negro",
};

document.addEventListener("DOMContentLoaded", function () {
  cargarLibros();
  cargarPreferencias();
  configurarEventos();
});

function cargarLibros() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/libros", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const libros = JSON.parse(xhr.responseText);
      pintarLibros(libros);
      aplicarPreferencias(); // Aplicar después de pintar --> de esta forma pilla lo que hay en localStorage y lo aplica directamente.
    }
  };

  xhr.onerror = () => {
    console.error("Error de conexión");
  };

  xhr.send();
}

function pintarLibros(libros) {
  const galeriaLibros = document.getElementById("galeriaLibros");
  galeriaLibros.innerHTML = "";

  if (libros.length === 0) {
    galeriaLibros.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          No hay libros en nuestra biblioteca.
        </div>
      </div>
    `;
    return;
  }

  libros.forEach((libro) => {
    galeriaLibros.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 libro-card">
          <img src="/img/${libro.imagen}" 
              class="card-img-top libro-imagen" 
              alt="${libro.titulo}"
              onerror="this.src='/img/default.jpg'">
          <div class="card-body">
            <h5 class="card-title libro-titulo">${libro.titulo}</h5>
          </div>
        </div>
      </div>
    `;
  });
}

function aplicarPreferencias() {
  const tamanoImagen = document.getElementById("tamanoImagen").value;
  const tamanoTexto = document.getElementById("tamanoTexto").value;
  const colorFondo = document.getElementById("colorFondo").value;
  const colorTitulos = document.getElementById("colorTitulos").value;

  const galeria = document.getElementById("galeriaLibros");

  // Aplicar color de fondo
  galeria.classList.remove("fondo-azul", "fondo-gris", "fondo-verde");
  galeria.classList.add(`fondo-${colorFondo}`);

  // Aplicar tamaño de imagen --> Podemos cogerlo bien con la clase o bien con la etiqueta.
  const imagenes = document.querySelectorAll(".libro-imagen");
  
  imagenes.forEach((imagen) => {
    imagen.classList.remove("img-pequeno", "img-mediano", "img-grande");
    imagen.classList.add(`img-${tamanoImagen}`);
  });

  // Aplicar tamaño y color de texto
  const titulos = document.querySelectorAll(".libro-titulo");
  titulos.forEach((titulo) => {
    // Remover clases de tamaño
    titulo.classList.remove(
      "texto-pequeno",
      "texto-mediano",
      "texto-grande",
      "texto-muygrande"
    );
    titulo.classList.add(`texto-${tamanoTexto}`);

    // Remover clases de color
    titulo.classList.remove("color-blanco", "color-negro", "color-rojo");
    titulo.classList.add(`color-${colorTitulos}`);
  });
}

function cargarPreferencias() {
  const preferenciasGuardadas = localStorage.getItem("preferenciasLibreria");

  if (preferenciasGuardadas) {
    const preferencias = JSON.parse(preferenciasGuardadas);
    document.getElementById("tamanoImagen").value = preferencias.tamanoImagen;
    document.getElementById("tamanoTexto").value = preferencias.tamanoTexto;
    document.getElementById("colorFondo").value = preferencias.colorFondo;
    document.getElementById("colorTitulos").value = preferencias.colorTitulos;
  } else {
    document.getElementById("tamanoImagen").value = DEFAULTS.tamanoImagen;
    document.getElementById("tamanoTexto").value = DEFAULTS.tamanoTexto;
    document.getElementById("colorFondo").value = DEFAULTS.colorFondo;
    document.getElementById("colorTitulos").value = DEFAULTS.colorTitulos;
  }
}

function configurarEventos() {
  document
    .getElementById("guardarPreferencias")
    .addEventListener("click", function () {
      guardarPreferencias();
    });

  // Preview en tiempo real
  document
    .getElementById("tamanoImagen")
    .addEventListener("change", aplicarPreferencias);
  document
    .getElementById("tamanoTexto")
    .addEventListener("change", aplicarPreferencias);
  document
    .getElementById("colorFondo")
    .addEventListener("change", aplicarPreferencias);
  document
    .getElementById("colorTitulos")
    .addEventListener("change", aplicarPreferencias);
}

function guardarPreferencias() {
  const preferencias = {
    tamanoImagen: document.getElementById("tamanoImagen").value,
    tamanoTexto: document.getElementById("tamanoTexto").value,
    colorFondo: document.getElementById("colorFondo").value,
    colorTitulos: document.getElementById("colorTitulos").value,
  };

  localStorage.setItem("preferenciasLibreria", JSON.stringify(preferencias));
  aplicarPreferencias();
  alert("Preferencias guardadas correctamente!");
}
