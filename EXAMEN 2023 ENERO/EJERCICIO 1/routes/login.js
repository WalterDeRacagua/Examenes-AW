
const express = require('express');
const router = express.Router();
let usuarios = require("../data/usuarios");


router.get("/", function (request,response) {
    return response.render("login" , {
        error: null,
    })
});

router.post("/", function (request,response) {
    const {user, password} = request.body;

    if (!user || !password) {
        return response.render("login",{
            error: "Todos los campos son obligatorios debes completarlos",
        })
    }

    const usuarioExistente = usuarios.find(u => u.user === user && u.pass === password);

    if (!usuarioExistente) {
        return response.render("login",{
            error: "Estás intentado logearte con un usuario que no existe",
        })
    }

    request.session.usuario = usuarioExistente.user;

    response.redirect("/cambio");
});

router.get("/cambio", function (request, response) {
    return response.render("cambio", {
        error:null,
    });
})


router.post("/cambio", function (request, response) {

    const {password1, password2} = request.body;

    if (!password1 || !password2) {
        return response.render("cambio", {
            error: "Debes de introducir ambas contraseñas",
        })
    }

    if (password1.trim() !== password2.trim()) {
        return response.render("cambio", {
            error: "Las contraseñas deben ser iguales",
        })
    }

    // Si no hay un usuario en la sesión primero deberías de loguearte
    if (!request.session.usuario) {
        return response.redirect("/");
    }

    const usuarioExistente = usuarios.find(u => u.user === request.session.usuario);

    if (!usuarioExistente) {
        return response.redirect("/");
    }

    usuarioExistente.pass = password1.trim();

    return response.redirect("/");
})

module.exports = router;
