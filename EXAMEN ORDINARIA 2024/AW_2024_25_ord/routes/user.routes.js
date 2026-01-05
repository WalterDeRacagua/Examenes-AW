const express = require("express");
const router = express.Router();
let usuarios = require("../data/usuarios");

// Simplemente renderizar la vista.
router.get("/", function (request, response) {
  response.render("usuarios");
});

// realizaremos la carga por Ajax
router.get("/api/lista", function (request, response) {
  response.json(usuarios);
});

module.exports = router;
