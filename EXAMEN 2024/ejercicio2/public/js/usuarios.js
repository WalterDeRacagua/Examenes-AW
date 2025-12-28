let modal;

document.addEventListener("DOMContentLoaded", function () {
  modal = new bootstrap.Modal(document.getElementById("usuarioModal"));
  cargarUsuarios();
});
/* -------------------- CARGAR -------------------- */
function cargarUsuarios() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/contactos", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      pintarCards(JSON.parse(xhr.responseText));
    } else {
      console.log("Error al cargar usuarios.");
    }
  };

  xhr.send();
}

function pintarCards(usuarios) {
  const contenedor = document.getElementById("contenedor-cards");
  contenedor.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${usuario.nombre}</h5>
            <p class="card-text"><strong>ID:</strong> ${usuario.id}</p>
            <p class="card-text">
              ${Object.entries(usuario.telefonos)
                .map((t) => `<strong class="text-primary">${t[0]}:</strong> ${t[1]}`)
                .join("<br>")}
            </p>
            <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(${index})">
              Modificar
            </button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

/* -------------------- MODAL -------------------- */
function abrirModalNuevo() {
  document.getElementById("formUsuario").reset();
  document.getElementById("indice").value = "";
  document.getElementById("tituloModal").innerText = "Nuevo usuario";
  modal.show();
}

function abrirModalEditar(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/contactos/${index}`, true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const u = JSON.parse(xhr.responseText);
      indice.value = index;
      id.value = u.id;
      nombre.value = u.nombre;
      casa.value = u.telefonos.casa || "";
      movil.value = u.telefonos.movil || "";
      oficina.value = u.telefonos.oficina || "";

      tituloModal.innerHTML = "Modificar usuario";
      modal.show();
    }
  };

  xhr.send();
}

/* -------------------- FORM -------------------- */
document.getElementById("formUsuario").addEventListener("submit", (e) => {
  e.preventDefault();

  const index = indice.value;
  const usuario = construirNuevoUsuario();

  index === "" ? crearUsuario(usuario) : modificarUsuario(index, usuario);
});

function construirNuevoUsuario() {
  const telefonos = {};
  if (casa.value) {
    telefonos.casa = casa.value;
  }
  if (movil.value) {
    telefonos.movil = movil.value;
  }
  if (oficina.value) {
    telefonos.oficina = oficina.value;
  }

  return { id: id.value, nombre: nombre.value, telefonos };
}

/* -------------------- CRUD -------------------- */
function crearUsuario(usuario) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/contactos", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      modal.hide();
      // Carga todos los usuarios de nuevo por AJAX sin necesidad de actualizar la página.
      cargarUsuarios();
    }
  };

  xhr.send(JSON.stringify(usuario));
}

function modificarUsuario(index, usuario) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `/contactos/${index}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      modal.hide();
      // Carga todos los usuarios de nuevo por AJAX sin necesidad de actualizar la página.
      cargarUsuarios();
    }
  };

  xhr.send(JSON.stringify(usuario));
}

function eliminarUsuario(index) {
  if (!confirm("¿Eliminar usuario?")) {
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/contactos", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      cargarUsuarios();
    }
  };
  xhr.send(JSON.stringify({ index }));
}
