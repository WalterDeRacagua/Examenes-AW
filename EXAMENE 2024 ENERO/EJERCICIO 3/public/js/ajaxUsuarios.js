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
        }
        // Código error falta
    }

    xhr.onerror = () =>{
        console.log("Error a la hora de cargar los usuarios");
    }

    xhr.send();
}


function pintarUsuarios(usuarios) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML="";

    if (usuarios.length ===0) {
        cardContainer.innerHTML =`
              <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow">
                            <div class="card-body p-3">
                                <div class="card-title d-flex flex-column justify-content-center align-items-center gap-3">
                                    <h2 class="text-center text-danger fw-bold">No hay usuarios en la base de datos</h2>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        return;
    }

    usuarios.forEach(usuario => {
        cardContainer.innerHTML+= `
          <div class="col-12 col-md-6 col-lg-4">
                        <div class="card shadow">
                            <div class="card-body p-3">
                                <div class="card-title d-flex flex-column justify-content-center align-items-center gap-3">
                                    <img src="/uploads/${usuario.foto}" alt="Imagen del usuario ${usuario.nombre} ${usuario.apellidos}">
                                    <h2 class="text-center fw-bold">${usuario.nombre} ${usuario.apellidos}</h2>
                                </div>
                                <div class="d-flex flex-column justify-content-start align-items-start p-2 gap-2">
                                    <p class="text-start"> <span class="fw-bold"> Correo: </span> ${usuario.correo} </p>
                                </div>
                                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                    <a href="/usuarios/${usuario.id}" class="btn btn-outline-primary btn-lg" role="button"> Ver más</a>
                                    <button type="button" onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger btn-lg">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    })
}

function eliminarUsuario(id) {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", "/usuarios", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload =()=>{
        if (xhr.status ===200) {
            alert(`Se ha eliminado correctamente el usuario con id: ${id}`);
            cargarUsuarios();
        }else {
            console.log("Error al eliminar el usuario");
        }
    }


    xhr.onerror = () => {
        console.error("Error a la hora de eliminar el usuario")
    }

    xhr.send(JSON.stringify({id: id}));
}