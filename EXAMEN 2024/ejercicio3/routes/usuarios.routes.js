const express = require("express");
const router = express.Router();
let usuarios = require("../data/usuarios");

// GET - Mostrar vista de usuarios. localhost:3000/usuarios
router.get("/", function (request, response) {
  response.render("usuarios", { usuarios: usuarios });
});
// GET - API para obtener los usuarios.
router.get("/api/lista", function (request, response) {
  response.json(usuarios);
});

module.exports = router;
