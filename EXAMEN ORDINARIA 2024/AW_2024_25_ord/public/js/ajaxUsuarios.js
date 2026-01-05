document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();
});

function cargarUsuarios() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/users/api/lista", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const usuarios = JSON.parse(xhr.responseText);
      pintarUsuarios(usuarios);
    } else {
      console.error("Error a la hora de cargar usuarios");
    }
  };
  xhr.onerror = () => {
    console.error("Ha habido un error de conexión");
  };

  xhr.send();
}

function pintarUsuarios(usuarios) {
  const cardsUsuarios = document.getElementById("cardsUsuarios");
  cardsUsuarios.innerHTML = "";

  if (usuarios.length === 0) {
    cardsUsuarios.innerHTML = `
    <div class="card">
        <div class="card-body text-center">
            No hay usuarios almacenados en local
        </div>
    </div>
    `;

    return;
  }

  usuarios.forEach((u) => {
    cardsUsuarios.innerHTML += `
       <div class="card p-2">
        <div class="card-body text-center">
            <img src="/uploads/${u.imagen}" class="card-img-top">
            <div class="card-title p-3">
                <h2 class="text-center"> ${u.nombre} ${u.apellidos}</h2>
            </div>
            <div class="text-start text-secondary">
                Correo: <span class="fw-bold"> ${u.correo} </span>
            </div>
        </div>
    </div>
    `;
  });
}
