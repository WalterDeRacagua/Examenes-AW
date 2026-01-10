const express = require("express");
const router= express.Router();
let usuarios = require("../data/usuarios");



function comprobarCorreo(correo){
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regexCorreo.test(correo);
}

function comprobarPassword(password1, password2) {
    if (password1.trim().length < 6) {
        return false;
    } 
    if (password2.trim().length < 6) {
        return false;
    }

    if (password1.trim() !== password2.trim()) {
        return false;
    }

    return true;
}


router.get("/", function (request, response) {
    return response.render("registro", {
        error: null,
        exito: null,
        usuario: request.session.nombre,
    });
});

router.post("/", function (request, response) {
    const {nombre,correo, password1, password2  } = request.body;

    if (!nombre || !correo|| !password1 || !password2) {
        return response.render("registro", {
            error: "Todos los campos son obligatorios, rellenalos todos.",
            exito: null,
            usuario: request.session.nombre,

        });
    }

    // Si hay espacios
    if (nombre.includes(" ")) {
        return response.render("registro", {
            error: "El campo nombre no debe tener espacios",
            exito: null,
            usuario: request.session.nombre,

        });
    }

    // Pase el filtro del regex
    if (!comprobarCorreo(correo)) {
        return response.render("registro", {
            error: "El correo debe seguir el formato algo@algo.algo",
            exito: null,
            usuario: request.session.nombre,
        });
    }
    // Al menos 3 minúsculas 3 mayúsculas, 4 dígitos y 10 en total
    const posibleRegex= /^(?=(?:.*[a-z]){3,})(?=(?:.*[A-Z]){3,})(?=(?:.*\d){4,}).{10,}$/;

    if (!comprobarPassword(password1, password2)) {
         return response.render("registro", {
            error: "Ambas contraseñas deben coincidir. Además, ambas deben tener un mínimo de 6 caracteres.",
            exito: null,
            usuario: request.session.nombre,
        });
    }

    const nuevoUsuario = {
        nombre:nombre.trim(),
        correo: correo.trim(),
        password: password1.trim(),
    };

    const usuarioExistente = usuarios.find(usuario=> usuario.correo === nuevoUsuario.correo);

    
    if (usuarioExistente) {
        return response.render("registro", {
            error: "Ya existe un usuario con ese correo en la bbdd.",
            exito: null,
            usuario: request.session.nombre,
        });
    }
    
    usuarios.push(nuevoUsuario);

    return response.render("registro", {
        error: null,
        exito: `Se ha dado de alta correctamente al vendedor ${nuevoUsuario.nombre}`,
        usuario: request.session.nombre,
    })    
});


router.get("/login", function (request, response) {
    return response.render("login", {
        error: null,
        // Si hay exito entonces que redirija a la página de Hola nombre
        usuario: request.session.nombre,
    })
});

router.post("/login", function (request, response) {
    const {nombre, password} = request.body;

    if(!nombre || !password) {
        return response.render("login", {
            error: "Ambos campos son obligatorios",
            usuario: request.session.nombre,
        });
    }

    // Si el nombre tiene espacios
    if (nombre.includes(" ")) {
         return response.render("login", {
            error: "El nombre no puede tener espacios en blanco",
            usuario: request.session.nombre,
        });
    }

      // Si la contraseña no tiene al menos 6 caracteres
    if (password.length <6) {
         return response.render("login", {
            error: "La contraseña debe tener al menos 6 caracteres",
            usuario: request.session.nombre,
        });
    }

    const usuarioExistente = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password);

    if (!usuarioExistente) {
        return response.render("login", {
            error: "El usuario no existe en nuestra base de datos.",
            usuario: request.session.nombre,
        });
    }

    // Guardamos el nombre de usuario en la session
    request.session.nombre = nombre;

    return response.redirect("/autenticacion/bienvenido");
});

router.get("/bienvenido", function (request, response) {
    return response.render("bienvenido", {
        nombre: request.session.nombre,
        usuario: request.session.nombre,
    });
});

router.get("/logout", function (request, response) {
    const nombre = request.session.nombre;

    // Aquí habría también que limpiar la cookie pero ya me parece demasiado.

    request.session.destroy(function (error) {
        if (error) {
            console.error("Error al destruir la sesion");
            return;
        }

        // Regresamos al indice.
        return response.redirect("/");
    })
})


module.exports = router;