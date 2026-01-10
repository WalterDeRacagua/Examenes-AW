document.addEventListener("DOMContentLoaded", function () {
    cargarUsuarios();
});

function cargarUsuarios() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/usuarios/api", true);

    xhr.onload = () => {
        if (xhr.status ===200) {
            const usuarios = JSON.parse(xhr.responseText);
            pintarUsuarios(usuarios);
        }else {
            console.error("Error a la hora de cargar los datos de la api de usuarios");
        }
    };

    xhr.onerror = () => {
        console.log("Error en la conexión");
    }

    xhr.send();
}


function pintarUsuarios(usuarios) {
    const cardContainer = document.getElementById("cardContainer");
    // Vacíamos el texto que tiene con ejs
    cardContainer.innerHTML ="";

    if (usuarios.length === 0) {
        cardContainer.innerHTML =`
             <h2 class="text-center text-danger">No hay usuarios en la aplicación</h2>
        `
        return;
    }

    usuarios.forEach(usuario => {
        cardContainer.innerHTML += `
         <div class="col-12 col-md-6 col-lg-4">
                                <div class="card shadow card-usuarios">
                                    <div class="card-body p-3">
                                        <div class="card-title d-flex flex-column align-items-center gap-2">
                                            <img src="/uploads/${usuario.imagen}" alt="Imagen de ${usuario.nombre}" class="imagen-card">
                                            <h2 class="text-center fw-bold"> ${usuario.nombre} ${usuario.apellidos} </h2>
                                        </div>
                                        <p class="text-start p-3"> <span class="fw-bold"> Correo del usuario: </span> ${usuario.correo}</p>
                                    </div>
                                </div>
                            </div>
        `
    })
}