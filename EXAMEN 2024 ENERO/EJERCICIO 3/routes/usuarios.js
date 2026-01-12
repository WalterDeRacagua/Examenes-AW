
const express = require('express');
const router = express.Router();
let usuarios = require("../data/usuarios");

router.get("/", function (request, response) {
    // Si es por ejs le pasamos la varible usuarios
    return response.render("usuarios");
});

router.get("/api", function (request, response) {
    return response.json(usuarios);
});

router.get("/:id", function (request, response) {
    const id = parseInt(request.params.id);

    const usuarioExiste = usuarios.find(u => u.id === id);

    if (!usuarioExiste) {   
        return response.status(404).send("El usuario con dicho id no existe");
    }

    return response.render("usuario", {
        usuario: usuarioExiste,
    })
});
router.put("/", function (request, response) {
    const { id } = request.body;
    const idNumerico = parseInt(id);
    const indice = usuarios.find(u => u.id === idNumerico);
    
    usuarios.splice(indice, 1);
    
    return response.status(200).json({
        mensaje: "Usuario eliminado correctamente",
        totalUsuarios: usuarios.length
    });
});


module.exports = router;
