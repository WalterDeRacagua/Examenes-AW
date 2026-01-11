document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
})

function cargarProductos() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/ofertas/api", true);

    xhr.onload = () =>{
        if (xhr.status===200) {
            const productos = JSON.parse(xhr.responseText);
            pintarProductos(productos);
        } else{
            console.log("Error a la hora de cargar el json de productos");
        }
    }

    xhr.onerror = () =>{
        console.log("error a la hora de cargar json")
    }

    xhr.send();
    // xhr.getResponseHeader("Content-Type", "application/json")
}

function pintarProductos(productos) {
    const cardContainer = document.getElementById("cardContainer");
    // Vaciamos por si hay algo
    cardContainer.innerHTML ="";

    if (productos.items.length ===0) {
        cardContainer.innerHTML = `
          <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow">
                            <div class="card-body p-3 cards-productos">
                                <div class="card-title d-flex flex-column justify-content-center align-items-center gap-3">
                                    <h2 class="text-center fw-bold">No hay productos cargados</h2>
                                </div>
                                <div class="d-flex flex-column justify-content-start align-items-center p-2 gap-3">
                                    <p>Espera a que hayan productos para poder visualizar las ofertas</p>
                                </div>
                            </div>
                        </div>
                     </div>
        `;
        return;
    }

    productos.items.forEach(producto => {
        cardContainer.innerHTML+=`
          <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow">
                            <div class="card-body p-3 cards-productos">
                                <div class="card-title d-flex flex-column justify-content-center align-items-center gap-3">
                                    <img src="/img/${producto.imagen}" alt="Imagen del producto ${producto.nombre}">
                                    <h2 class="text-center fw-bold">${producto.nombre}</h2>
                                </div>
                                <div class="d-flex flex-column justify-content-start align-items-center p-2 gap-3">
                                    <p>Precio: <span class="fw-bold"> ${producto.precio}</span></p>
                                </div>
                                <div class="d-flex flex-row justify-content-center align-items-center mb-5 gap-3">
                                    <a href="/ofertas/${producto.nombre}" class="btn btn-outline-primary btn-lg"> Ver más</a>
                                    <button class="btn btn-danger btn-lg" type="button" onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
                                </div>
                            </div>
                        </div>
                     </div>
        `
    })
    
}

function eliminarProducto(nombre) {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", "/ofertas", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => { 
        if (xhr.status === 200) {
            alert("El producto se ha eliminado correctamente");
            cargarProductos();
        } else {
            console.log("Error a la hora de eliminar el producto");
        }
    }

    xhr.onerror = () =>{
        console.log("Error  ");
    }

    xhr.send(JSON.stringify({nombre:nombre}));
}