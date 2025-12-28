const express = require("express");
// Para los logs
const morgan = require("morgan");
// SI quisiera usar cookies, que en este ejercicio no voy a necesitar
const cookieParser = require("cookie-parser");
// No lo voy a utilizar tampoco, ahora lo comentaré
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Importación de las rutas.
const registroRoutes = require("./routes/registro.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

const ficherosEstaticos = path.join(__dirname, "public");
const uploadsDir = path.join(__dirname, "public", "uploads");

// Creamos directorio de uploads en el caso de que no exista
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Servidor de express
const app = express();
// Veremos los cambios en localhost:3000
const PORT = 3000;

/**
 * Middlewares básicos.
 * */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(ficherosEstaticos));
app.use(cookieParser());

// Motor de las vistas de la aplicación
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Ruta principal (index) - Redirige a la página de usuarios
app.get("/", function (request, response) {
  // Nuestra página inicial es la de usuarios, NO ES EL ÍNDICE
  response.redirect("/usuarios");
});

/**
 * Rutas de nuestra aplicación
 */
app.use("/usuarios", usuariosRoutes);
app.use("/registro", registroRoutes);

// Middleware 404
app.use(function (request, response) {
  response.status(404).render("error", {
    codigo: 404,
    error: "Error 404 ~ Recurso no encontrado.",
  });
});

// Middleware 500
app.use(function (request, response) {
  response.status(500).render("error", {
    codigo: 500,
    error: "Error 500 ~ Fallo interno del servidor.",
  });
});

app.listen(PORT, function () {
  console.log("Servidor activo en http://localhost:3000");
});
