"use strict";
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const { error } = require("console");
const { render } = require("ejs");

// Podríamos añadir bcrypt para la gestión de constraseñas de manera encriptada pero se me va de presupuesto.

const app = express();
const PORT = process.env.PORT || 3000;

// Para los mensajes por consola
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// Para poder cambiar la contraseña del usuario que inicie sesión
app.use(
  session({
    secret: "secreto_universtiario",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Array de encuestas en el que vamos a ir almacenando las respuestas de los usuarios
let encuestas = {
  edades: {
    menor20: 0,
    "20-30": 0,
    "30-40": 0,
    mayor40: 0,
  },
  canales: {
    internet: 0,
    rrss: 0,
    prensa: 0,
    amigos: 0,
  },
  residencias: {
    madrid: 0,
    comunidad: 0,
    territorio: 0,
    fuera: 0,
  },
  totalEncuestas: 0,
};

app.get("/", function (request, response) {
  return response.render("encuesta", {
    error: null,
  });
});
app.post("/", function (request, response) {
  const { edad, canal, residencia } = request.body;

  if (!edad || !canal || !residencia) {
    return response.render("encuesta", {
      error: "Debe de completar todos los campos de la encuesta",
    });
  }

  if (encuestas.edades[edad] !== undefined) {
    encuestas.edades[edad]++;
  }
  if (encuestas.canales[canal] !== undefined) {
    encuestas.canales[canal]++;
  }
  if (encuestas.residencias[residencia] !== undefined) {
    encuestas.residencias[residencia]++;
  }

  encuestas.totalEncuestas++;

  return response.redirect("/agradecimiento");
});

app.get("/agradecimiento", function (request, response) {
  return response.render("agradecimiento");
});

app.get("/resultados", function (request, response) {
  return response.render("resultados", {
    encuestas: encuestas,
  });
});

app.listen(PORT, function () {
  console.log(`Escuchando el puerto http://localhost:${PORT}`);
});
