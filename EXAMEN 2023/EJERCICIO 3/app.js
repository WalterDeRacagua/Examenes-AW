const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let productos = require("./data/productos");
const { render } = require("ejs");

app.get("/", function (request, response) {
  return response.redirect("/ofertas");
});

app.get("/ofertas", function (request, response) {
  return response.render("ofertas", {
    productos: productos,
  });
});

app.get("/api/productos", function (request, response) {
  return response.json(productos);
});

app.listen(PORT, function () {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
