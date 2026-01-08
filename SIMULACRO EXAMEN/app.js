const { Console, error } = require("console");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
function middlewarePeticiones(request, response, next) {
  const ruta = request.path;
  const metodo = request.method;
  const hora = Date.now().toLocaleString("es-ES");

  console.log(`Ruta: ${ruta}, Método: ${metodo}, Hora:  ${hora}`);

  next();
}

function middlewareVerificacion(request, response, next) {
  const { nombre, precio } = request.body;

  if (!nombre || nombre.trim().length < 3) {
    return response.render("formulario", {
      respuesta: null,
      error: "El nombre es obligatorio y debe tener como mínimo 3 caracteres",
    });
  }

  if (!precio || isNaN(precio) || parseInt(precio) <= 0) {
    return response.render("formulario", {
      respuesta: null,
      error:
        "El precio es obligatorio, debe ser un número mayor estrictamente que 0.",
    });
  }

  next();
}

let servicios = [];

app.get("/", middlewarePeticiones, function (request, response) {
  return response.render("formulario", {
    respuesta: null,
    error: null,
  });
});

app.post(
  "/",
  middlewarePeticiones,
  middlewareVerificacion,
  function (request, response) {
    const { nombre, descripcion, precio } = request.body;

    let nuevoServicio = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    };

    servicios.push(nuevoServicio);

    // No muestro la descripción para evitar problemas por si es demasiado larga
    return response.render("formulario", {
      respuesta: `Servicio creado --> Nombre ${nuevoServicio.nombre}, precio${nuevoServicio.precio}`,
      error: null,
    });
  }
);

app.get("/servicios", function (request, response) {
  return response.render("servicios");
});

app.get("/api/servicios", middlewarePeticiones, function (request, response) {
  return response.json(servicios);
});

app.listen(PORT, function () {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
