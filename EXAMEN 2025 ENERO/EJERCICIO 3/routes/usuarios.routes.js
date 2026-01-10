const express = require('express');
const router = express.Router();
let usuarios = require("../data/usuarios");

router.get("/", function (request, response) {
    return response.render("usuarios", {
        usuarios: usuarios,
    })
});

router.get("/api", function (request, response) {
    return response.json(usuarios);
})



module.exports = router;