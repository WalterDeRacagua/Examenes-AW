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
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  //   Si no hay servicios
  if (servicios.length === 0) {
    cardContainer.innerHTML = `
     <div class="col-12 col-md-6 col-lg-4">
                        <div class="card">
                            <div class="card-body d-flex flex-column justify-content-start">
                                <div class="card-title">
                                    <h2 class="text-center">No hay servicios guardados en el servidor</h2>
                                </div>
                                <h3 class="fw-bold"> <span class="text-muted"></span> </h3>
                                <h3 class="fw-bold"> <span class="text-muted"></span> </h3>
                            </div>
                        </div>
                     </div>`;
    return;
  }

  servicios.forEach(servicio => {
    cardContainer.innerHTML += `
     <div class="col-12 col-md-6 col-lg-4">
                        <div class="card card-servicios">
                            <div class="card-body d-flex flex-column justify-content-start card-body-servicios">
                                <div class="card-title">
                                    <h2 class="text-center">${servicio.nombre}</h2>
                                </div>
                                <h3 class="fw-bold">Precio: <span class="text-muted"> ${servicio.precio}</span> </h3>
                                <h6 class="fw-bold">Descripción <span class="text-muted">${servicio.descripcion}</span> </h6>
                            </div>
                        </div>
                     </div>
    `
  });
}
