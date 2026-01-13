document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
})

function cargarProductos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/productos/api", true);

    xhr.onload = () =>{
        if (xhr.status ===200) {
            const productos = JSON.parse(xhr.responseText);
            pintarProductos(productos);
        }else{
            console.log("Error a la hora de obtener los productos de la API.");
        }
    }

    xhr.onerror = () =>{
        console.log("Error");
    }

    xhr.send();
}


function pintarProductos(productos) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML ="";

    if (productos.length === 0) {
        cardContainer.innerHTML = `
         <div class="card shadow card-productos">
                        <div class="card-body p-3">
                            <div class="card-title d-flex flex-column justify-content-center align-items-center">
                                <h2 class="text-center text-danger"> No hay ningún producto disponible en Ecomarket </h2>
                            </div>
                        </div>
                     </div>
        `;
        return;
    }

    productos.forEach(producto => {
        cardContainer.innerHTML += `
                     <div class="col-12 col-md-6 col-lg-4">

         <div class="card shadow card-productos">
                        <div class="card-body p-3">
                            <div class="card-title d-flex flex-column justify-content-center align-items-center">
                                <img src="/img/${producto.imagen}" alt="Imagen del producto ${producto.nombre}" class="imagen-cards">
                                <h2 class="text-center text-success fw-bold">${producto.nombre} </h2>
                            </div>
                            <p class="text-start">Precio: <span class="fw-bold">${producto.precio}</span></p>
                        </div>
                        <div class=" d-flex flex-row justify-content-center align-items-center p-3 gap-3">
                                <a href="/productos/${producto.id}" class="btn btn-primary btn-md" role="button"> Ver más </a>
                                <button type="button" onclick="eliminarProducto('${producto.id}')" class="btn btn-danger btn-md">Eliminar</button>
                            </div>
                     </div>
                     </div>
        `
    });
}

function eliminarProducto(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/productos", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () =>{
        if (xhr.status === 200) {
            alert("Producto eliminado con exito!");
            cargarProductos();
        } else {
            console.log("Ha habido un error")
        }
    }

    xhr.onerror = () => {
        console.log("Ha habido un error")
    }

    xhr.send(JSON.stringify({id:id}));

}