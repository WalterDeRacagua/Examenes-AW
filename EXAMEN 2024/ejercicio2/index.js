const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const ficherosEstaticos = path.join(__dirname, "public");
const routerUsuarios = require("./routes/crudUsuarios.routes");

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(ficherosEstaticos));
app.use(cookieParser());
// Se guarda en request.session
app.use(
  session({
    secret: "examen_1",
    resave: false,
    saveUninitialized: false,
  })
);

// Seteamos el motor de vistas a ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/contactos", routerUsuarios);

app.get("/", function (request, response) {
  response.render("index", { error: null });
});

// Middleware 404
app.use(function (request, response) {
  response.status(404).render("index", {
    error: "Error 404 - El recurso no se ha encontrado",
  });
});

// Middleware 500
app.use(function (err, request, response, next) {
  response.status(500).render("index", {
    error: err.message || "Error 500: Fallo interno del servidor",
  });
});

app.listen(PORT, function () {
  console.log("Servidor activo en http://localhost:3000");
});
