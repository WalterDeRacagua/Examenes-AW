"use strict";
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");

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

let usuarios = require("./data/usuarios");
const { error } = require("console");

// Middleware de autenticación
function ensureAuthenticated(request, response, next) {
  if (request.session && request.session.user) {
    return next();
  }

  return response.redirect("/");
}

app.get("/", function (request, response) {
  return response.render("formulario", {
    error: null,
  });
});
app.post("/", function (request, response) {
  const { login, password } = request.body;

  //   Defensivo, nunca debería entrar aquí
  if (!login || !password) {
    return response.render("formulario", {
      error: "Todos los campos son obligatorios",
    });
  }

  //   Hago una comprobación, también debería de comprobar que contenga 3 mayúsculas y 2 digitos por defensa. Pero no lo hago por tiempo
  if (password.length < 5) {
    return response.render("formulario", {
      error: "La contraseña debería tener como mínimo 6 caracteres",
    });
  }

  const usuarioEncontrado = usuarios.find(
    (u) => u.user === login && u.pass === password
  );

  if (!usuarioEncontrado) {
    return response.render("formulario", {
      error: "Usuario no he encontrado en la pseudo-bbdd",
    });
  }

  request.session.user = usuarioEncontrado.user;
  return response.redirect("/cambio");
});

app.get("/cambio", ensureAuthenticated, function (request, response) {
  return response.render("cambio", {
    error: null,
    user: request.session.user,
  });
});
app.post("/cambio", ensureAuthenticated, function (request, response) {
  const { password1, password2 } = request.body;

  if (!password1.trim() || !password2.trim()) {
    return response.render("cambio", {
      error: "Ambos campos de contraseñas son obligatorios",
      user: request.session.user,
    });
  }

  if (password1.trim() !== password2.trim()) {
    return response.render("cambio", {
      error: "Ambas contraseñas deben coincidir",
      user: request.session.user,
    });
  }

  const usuario = usuarios.find((u) => u.user === request.session.user);

  //   Defensivo, nunca debería de entrar aquí por el Middleware
  if (!usuario) {
    return response.redirect("/");
  }

  usuario.pass = password1.trim();

  console.log(
    `La contraseña del usuario ${usuario.nombre} con user: ${usuario.user} ha cambiado con éxito`
  );

  return response.redirect("/");
});

app.listen(PORT, function () {
  console.log(`Escuchando el puerto http://localhost:${PORT}`);
});
