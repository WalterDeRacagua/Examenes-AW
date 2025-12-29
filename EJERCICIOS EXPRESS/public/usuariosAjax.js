document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();
});

function cargarUsuarios() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/usuarios", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const usuarios = JSON.parse(xhr.responseText);
      pintarTabla(usuarios);
    } else {
      console.error("Error al cargar usuarios");
    }
  };

  xhr.onerror = () => {
    console.error("Error de conexión");
  };

  xhr.send();
}

function pintarTabla(usuarios) {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  // Vacío el html que sigue a tbody
  tbody.innerHTML = "";
  // Si no hay usuarios en el json
  if (usuarios.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="2" class="text-center text-muted"> No hay usuarios dados de alta en la aplicación </td>
        </tr>
        `;
    return;
  }

  usuarios.forEach((usuario) => {
    tbody.innerHTML += `
            <tr>
                <td class="text-start">
                    ${usuario.nombre}
                </td>
                  <td class="text-end">
                    ${usuario.numero}
                </td>
            </tr>
        `;
  });
}
