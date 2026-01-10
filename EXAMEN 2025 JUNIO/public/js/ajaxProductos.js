document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
});

function cargarProductos() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/productos/api", true);

    xhr.onload = () => {
        if (xhr.status ===200) {
            const productos = JSON.parse(xhr.responseText);
            pintarProductos(productos);
        }else {
            console.log("Error a la hora de obtener los productos de la Api");
        }
    }

    xhr.onerror = () => {
        console.log("Error general  la hora de obtener los productos");
    }

    xhr.send();
}


function pintarProductos(productos) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML ="";

    if (productos.length === 0) {
        cardContainer.innerHTML =`
            <div class="col-12 col-md-6 col-lg-">
                        <div class="card shadow">
                            <div class="card-title d-flex flex-column justify-content-center gap-2">
                                <h3 class="text-center fw-bold">No hay productos disponibles</h3>
                            </div>
                        </div>
            </div>
        `
        return;
    }

    productos.forEach(producto => {
        cardContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 gap-3">
                        <div class="card shadow">
                            <div class="card-body"> 
                                <div class="card-title d-flex flex-column justify-content-center gap-2">
                                        <div class=" d-flex justify-content-center gap-2">
                                            <img src="/img/${producto.imagen}" class="productos-img" alt="Imagen del producto">
                                        </div>
                                    <h3 class="text-center fw-bold"> ${producto.nombre}</h3>
                                </div>
                                <div class="d-flex flex-column justify-content-left align-items-left">
                                    <p class="text-center fw-bold"> Precio:<span class="text-muted"> ${producto.precio} </span> </p>
                                    <div class="d-flex flex-row justify-content-center align-items-center p-2">
                                        <a href="/productos/${producto.id}" class="btn btn-primary btn-lg" role="button"> Ver más</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
        `
    })
}
