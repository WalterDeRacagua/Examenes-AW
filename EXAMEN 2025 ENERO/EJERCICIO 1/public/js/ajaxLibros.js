document.addEventListener("DOMContentLoaded" , function () {
    cargarLibros();
});

function cargarLibros() {
    const xhr = new XMLHttpRequest();
    
    xhr.open("get", "/libreria/api", true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            // Todo ha ido bien
            const libros = JSON.parse(xhr.responseText);
            pintarLibros(libros);
        } else {
            console.error("Error a la hora de cargar libros")
        }
    }

    xhr.onerror = () => {
        console.log("Error general a la hora de cargar los libros del json");
    }

    xhr.send();
}


function pintarLibros(libros) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    if (libros.length === 0) {
        cardContainer.innerHTML =`
                 <h2 class="text-center fw-bold title-card p-3"> No hay libros guardados en la base de datos</h2>
                 <h2 class="text-center fw-bold title-card p-3"> intentalo más tarde</h2>
                 `
    }

    libros.forEach(libro => {
        cardContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow p-3 book-cards">
                            <div class="card-body">
                                <div class="card-title">
                                    <h2 class="text-center fw-bold title-card p-3">  ${libro.titulo} </h2>
                                    <div class="d-flex flex-row justify-content-center align-items-center">
                                        <img src="/img/${libro.imagen}" alt="Imagen del libro${libro.titulo}" class="image-card">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })
}