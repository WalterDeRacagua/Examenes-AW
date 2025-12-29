const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const usuarios = require("./data/usuarios");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (request, response) {
  response.redirect("/usuarios");
});

app.get("/usuarios", function (request, response) {
  response.render("usuarios");
});
app.get("/users", function (request, response) {
  response.render("usuarios");
});
app.get("/socios", function (request, response) {
  response.render("usuarios");
});

app.get("/api/usuarios", function (request, response) {
  response.json(usuarios);
});

app.listen(PORT, function () {
  console.log(`Escuchando en http://localhost:${PORT}`);
});
