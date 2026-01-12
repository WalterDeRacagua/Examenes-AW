document.addEventListener("DOMContentLoaded", function () {
    cargarUsuarios();
})

function cargarUsuarios() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/usuarios", true);
    // xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () =>{
        if (xhr.status ===200) {
            const usuarios = JSON.parse(xhr.responseText);
            pintarUsuarios(usuarios);
        }else{
            console.log("Error a la hora de cargar usuarios");
        }
    }


    xhr.onerror = () => {
        console.log("Error  ");
    }

    xhr.send();
}

function pintarUsuarios(usuarios) {
    const cardContainer = document.getElementById("cardContainer");
    // Vacíamos el html
    cardContainer.innerHTML ="";

    if (usuarios.length === 0) {
        cardContainer.innerHTML = `
         <div class="col-12 col-md-6 col-lg-4">
                                <div class="card shadow cards">
                                    <div class="card-body p-3">
                                        <div
                                            class="card-title d-flex flex-column justify-content-center align-items-center gap-2">
                                            <h2 class="text-center ">
                                               No hay usuarios dados de alta por el momento
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
        `
        return;
    }

    usuarios.forEach(usuario => {
        cardContainer.innerHTML +=`
         <div class="col-12 col-md-6 col-lg-4">
                                <div class="card shadow cards">
                                    <div class="card-body p-3">
                                        <div
                                            class="card-title d-flex flex-column justify-content-center align-items-center gap-2">
                                            <img src="/uploads/${usuario.imagen}"
                                                alt="Imagen del usuario ${usuario.nombre}">
                                            <h2 class="text-center ">
                                                ${usuario.nombre} ${usuario.apellidos}
                                            </h2>
                                        </div>
                                        <p class="text-start"> Correo: <span class="fw-bold">
                                                    ${usuario.correo}    
                                        </span> </p>
<div class="d-flex flex-row justify-content-center gap-2 m-2">
                                            <a href="/usuarios/${usuario.nombre}" class="btn btn-outline-primary btn-lg" role="button"> Ver más</a>
                                            <button  class="btn btn-danger btn-lg" onclick="eliminarUsuario('${usuario.nombre}')" role="button"> Eliminar </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
        `
    })
}


function eliminarUsuario(nombre) {

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/usuarios", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            alert(`El usuario ${nombre} se ha eliminado correctamente`);
            cargarUsuarios();
        } else {
            console.log("Error a la hora de elimianr el usuario")
        }
    }

    xhr.onerror = () =>{
        console.log("Error a la hora de eliminar el usuario")
    }

    xhr.send(JSON.stringify({nombre: nombre}));
}