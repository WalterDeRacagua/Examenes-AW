
const express = require('express');
const router = express.Router();

let usuarios = [];

router.get("/", function (request, response) {
    return response.render("registro", {
        error: null,
         nombre: "",
            correo:  "",
            password1:  "",
            password2:  "", 
         sesion: request.session.nombre,

    })
});

router.post("/", function (request, response) {
    const {nombre,correo, password1,password2} = request.body;

    if (!nombre || !correo || !password1 || !password2) {
        return response.render("registro", {
            error: "Necesitas completar todos los campos del formulario.",
            nombre: nombre.trim() || "",
            correo: correo.trim() || "",
            password1: password1.trim() || "",
            password2: password2.trim() || "", 
        sesion: request.session.nombre,

        })
    }


    if (password1.length <6 || password2.length <6) {
        return response.render("registro", {
            error: "Las contraseñas deben tener un mínimo de 6 caracteres.",
             nombre: nombre.trim() || "",
            correo: correo.trim() || "",
            password1: password1.trim() || "",
            password2: password2.trim() || "", 
            sesion: request.session.nombre,

        })
    }

    if (password1.trim() !== password2.trim()) {
        return response.render("registro", {
            error: "Las contraseñas deben coincidir para poder enviar el formulario",
             nombre: nombre.trim() || "",
            correo: correo.trim() || "",
            password1: password1.trim() || "",
            password2: password2.trim() || "", 
            sesion: request.session.nombre,

        })
    }

    const usuarioExistente = usuarios.find(u => u.correo === correo);

    if (usuarioExistente) {
         return response.render("registro", {
            error: "Estas intentando crear un usuario ya existente en nuestra base de datos (correo repetido).",
             nombre: nombre.trim() || "",
            correo: correo.trim() || "",
            password1: password1.trim() || "",
            password2: password2.trim() || "", 
             sesion: request.session.nombre,

        })
    }

    const usuario = {
        nombre: nombre.trim(),
        correo: correo.trim(),
        password: password1.trim(),
    }

    usuarios.push(usuario);

    return response.redirect("/registro/login");
});

router.get("/login", function (request, response) {
    return response.render("login", {
        error:null,
        sesion: request.session.nombre,
    });
});

router.post("/login" , function (request, response) {
    const {nombre, password} = request.body;

    if (!nombre || !password) {
         return response.render("login", {
            error:"Debes rellenar ambos campos. son obligatorios para loguearte",
            sesion: request.session.nombre,
            
        });
    }

    const usuarioExistente = usuarios.find(u => u.nombre === nombre && u.password === password);

    if (!usuarioExistente) {
         return response.render("login", {
            error:"No existe ningún usuario con dichas credenciales.",
            sesion: request.session.nombre,

        });
    }

    request.session.nombre = usuarioExistente.nombre;
    return response.redirect("/registro/bienvenido");
});

router.get("/bienvenido", function (request, response) {
    return response.render("bienvenido", {
        sesion: request.session.nombre,
    })
});

router.get("/logout", function (request, response) {
    
    request.session.destroy(function (error) {
        if (error) {
            console.log("Error al destruir la sesión");
            return;
        }

        return response.redirect("/");
    })
})

module.exports = router;
