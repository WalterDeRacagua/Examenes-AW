document.addEventListener("DOMContentLoaded", function () {
    cargarUsuarios();
})

function cargarUsuarios() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/contactos/api", true);

    xhr.onload = () =>{
        if (xhr.status ===200) {
            const usuarios = JSON.parse(xhr.responseText);
            pintarUsuarios(usuarios);
        }else {
            console.log("Error a la hora de cargar los usuarios");
        }
    }

    xhr.onerror = () =>{
        console.log("Error a la hora de vargar los contactos")
    };

    xhr.send();
}

function pintarUsuarios(usuarios) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML ="";

    if (usuarios.length === 0) {
        cardContainer.innerHTML = `
         <div class="col-12 col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <h2 class="card-title text-center"> No hay usuarios guardados aun  </h2>
                            <div class="d-flex flex-column justify-content-start align-items-center">
                                <p> Espera a que se añadan nuevos usuarios</p>
                            </div>
                        </div>
                    </div>
                 </div>
        `;

        return;
    }

    usuarios.forEach(usuario =>{
        cardContainer.innerHTML += `
         <div class="col-12 col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <h2 class="card-title text-center"> ${usuario.nombre} </h2>
                            <div class="d-flex flex-row justify-content-center align-items-center gap-3">
                                <a href="/contactos/${usuario.id}" class="btn btn-outline-primary btn-lg" role="button">Ver más</a>
                                <button onclick="eliminarUsuario('${usuario.id}')"  class="btn btn-danger btn-lg" >Eliminar</button>
                            </div>
                        </div>
                    </div>
                 </div>
                 `
    })
}

function eliminarUsuario(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/contactos", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () =>{
        if (xhr.status ===200) {
            alert("Usuario eliminado correctamente");
            cargarUsuarios();
        } else {
            console.log("Error al eliminar el usuario")
        }
    }

    xhr.onerror = () =>{
        console.log("Error al eliminar el usuario");
    }

    xhr.send(JSON.stringify({id: id}))
}