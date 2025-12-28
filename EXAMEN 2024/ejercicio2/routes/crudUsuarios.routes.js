const express = require("express");
const router = express.Router();
let usuarios = require("../data/usuarios");

// GET --> Obtener todos los vehículos
router.get("/", function (request, response) {
  response.json(usuarios);
});

// GET --> Obtener por indice (url paramétrica)
router.get("/:index", function (request, response, next) {
  const index = parseInt(request.params.index);

  if (isNaN(index) || index < 0 || index >= usuarios.length) {
    return next(new Error("Índice fuera de rango"));
  }

  response.json(usuarios[index]);
});

// POST --> Añadir usuario
router.post("/", function (request, response, next) {
  const nuevoUsuario = request.body;
  
  if (!nuevoUsuario || !nuevoUsuario.nombre) {
    return next(new Error("Datos usuario invalidos"));
  }

  usuarios.push(nuevoUsuario);
  response.status(200).json(nuevoUsuario);
});

// POST --> eliminar usuario (índice en el cuerpo de la request)
router.put("/", function (request, response, next) {
  const { index } = request.body;

  if (index === undefined || index < 0 || index >= usuarios.length) {
    return next(new Error("Índice de usuarios inválido"));
  }

  // A partir de la posición index, elimina 1 elemento. Es decir elimina usuarios[index]. Si fuera index, 2 sería usuarios[index] y usuarios[index+1]
  const eliminado = usuarios.splice(index, 1);
  response.json(eliminado);
});

// PUT --> Modificar usuario
router.put("/:index", function (request, response, next) {
  const index = parseInt(request.params.index);

  if (index === undefined || index < 0 || index >= usuarios.length) {
    return next(new Error("Índice de usuarios inválido"));
  }

  usuarios[index] = request.body;
  response.json(usuarios[index]);
});

module.exports = router;
