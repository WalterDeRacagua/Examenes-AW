
const express = require('express');
const router = express.Router();
let usuarios = require("../data/usuarios");


router.get("/", function (request, response) {
    return response.render("contactos");
})

// Api para obtener todos los objetos
router.get("/api", function (request, response) {
    return response.json(usuarios);
});

router.get("/:id", function (request, response) {
    const id = request.params.id;

    const usuario = usuarios.find(u=> u.id ===id);

    if (!usuario) {
        return response.render("contacto", {
            error: "El usuario que estás intentando abrir no existe",
            usuario: null,
        })
    }

    return response.render("contacto", {
            error: null,
            usuario: usuario,
     })
});

router.put("/", function (request, response) {
    const {id} = request.body;

    if (!id) {
        return response.render("contactos");
    }

    const usuarioExiste = usuarios.find(u => u.id === id);

    if (!usuarioExiste) {
        return response.render("contactos");
    }

    // Borramos el usuario con tal id
    usuarios.splice(usuarioExiste.id, 1);
    
    return response.render("contactos");
})

module.exports = router;
