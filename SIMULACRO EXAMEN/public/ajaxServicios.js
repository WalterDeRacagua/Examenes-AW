document.addEventListener("DOMContentLoaded", function () {
  cargarServicios();
});

// Carga dinámica de servicios en la aplicación
function cargarServicios() {
  // Carga por Ajax
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/api/servicios", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const servicios = JSON.parse(xhr.responseText);
      pintarServicios(servicios);
    } else {
      console.log("Ha habido un error a la hora de cargar los servicios");
    }
  };

  xhr.onerror = () => {
    console.log("Error de conexión");
  };

  xhr.send();
}


function pintarServicios(servicios) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";

  //   Si no hay servicios
  if (servicios.length === 0) {
    tableContainer.innerHTML = `
                            <tr>
                                <td colspan="4">No hay datos de ningun tipo</td>
                            </tr>
                        `;
    return;
  }

  servicios.forEach(servicio => {
    if(servicio.foto !== null){
      tableContainer.innerHTML += `
                            <tr>
                                <td>${servicio.nombre}</td>
                                <td>${servicio.descripcion}</td>
                                <td>${servicio.precio}</td>
                                <td>
                                    <img class="table-img p-3" src="/uploads/${servicio.foto}">
                                </td>
                            </tr>
      `;
    }
    else {
      tableContainer.innerHTML += `
                            <tr>
                                <td>${servicio.nombre}</td>
                                <td>${servicio.descripcion}</td>
                                <td>${servicio.precio}</td>
                                <td>
                                  No hay imagen para este servicio!
                                </td>
                            </tr>

      `
    }
  });
}
