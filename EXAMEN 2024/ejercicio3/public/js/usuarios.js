document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();
});

function cargarUsuarios() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/usuarios/api/lista", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const usuarios = JSON.parse(xhr.responseText);
      pintarUsuarios(usuarios);
    } else console.error("Error al cargar los usuarios de la API.");
  };

  xhr.onerror = () => {
    console.error("Error al cargar el Ajax");
  };

  xhr.send();
}

function pintarUsuarios(usuarios) {
  const contenedor = document.getElementById("contenedor-usuarios");
  contenedor.innerHTML = "";

  if (usuarios.length === 0) {
    contenedor.innerHTML += `
    <div class="col-12">
        <div class="alert alert-info text-center"> 
            <h4> ¡No hay usuarios registrados! </h4>
            <p> Haz click en el botón de registrarse para registrar a un usuario en la aplicación</p>
        </div>
    </div>`;
    return;
  } else {
    usuarios.forEach((u) => {
      contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100">
                <img src="/uploads/${u.foto}" class="card-img-top" alt="${u.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title text-primary"> ${u.nombre}</h5>
                    <p class="card-text text-muted">${u.apellidos}</p>
                    <p class="card-text text-muted">${u.correo}</p>
                </div>
            </div>
        </div>
        `;
    });
  }
}
