document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
});

function cargarProductos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/productos", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const productos = JSON.parse(xhr.responseText);
      dibujarProductos(productos);
    } else {
      console.log("Error a la hora de cargar los productos");
    }
  };

  xhr.onerror = () => {
    console.log("Ha habido un error de conexión");
  };

  xhr.send();
}

function dibujarProductos(productos) {
  const cardContainer = document.getElementById("cardContainer");
  // Vacíamos lo que haya en este cardContainer
  cardContainer.innerHTML = "";

  if (productos.length === 0) {
    // No hay productos en nuestro shopping
    cardContainer.innerHTML = `
    <div class="col-12 col-md-6 col-lg-4">
                                <div class="card shadow ">
                                    <div class="card-body product-card">
                                        <div
                                            class="card-title d-flex flex-column justify-content-center align-items-center p-3">
                                            <h4>
                                                No hay ningún producto en nuestra tienda aun...
                                            </h4>
                                        </div>
                                        <div class="text-start">
                                            < class="fw-bold"> Pronto volveremos, estate pendiente! <span class="text-primary">
                                        </div>
                                    </div>
                                </div>
                        </div>`;

    return;
  }

  productos.items.forEach((item) => {
    cardContainer.innerHTML += `
    <div class="col-12 col-md-6 col-lg-4"> 
                                    <div class="card shadow ">
                                        <div class="card-body product-card">
                                            <div
                                                class="card-title d-flex flex-column justify-content-center align-items-center p-3">
                                                <img src="/img/${item.imagen}" alt="Imagen de nuestro ${item.nombre}">
                                                <h4>
                                                    ${item.nombre}
                                                </h4>
                                            </div>
                                            <div class="text-start">
                                                <h5 class="fw-bold"> Precio: <span class="text-primary">
                                                        ${item.precio}
                                                    </span> </h5>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
      `;
  });
}
