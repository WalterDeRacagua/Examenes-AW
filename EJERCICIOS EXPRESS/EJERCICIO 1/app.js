const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const { pregunta, opciones } = require("./data/encuesta");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (request, response) {
  response.render("encuesta", {
    pregunta: pregunta,
    opciones: opciones,
  });
});

// Yo haría un post sobre / pero el enunciado dice que es un formulario de GET.
app.get("/votar", function (request, response) {
  // Al ser GET recibe parámetros por la query no por el body.
  const voto = request.query.opcion;

  // Validar que de verdad haya elegido una opción
  if (!voto) {
    return response.redirect("/?error=selecciona");
  }

  const indiceVoto = parseInt(voto);

  if (isNaN(indiceVoto) || indiceVoto < 0 || indiceVoto >= opciones.length) {
    return response.redirect("/?error=invalido");
  }

  opciones[indiceVoto].votos++;

  response.redirect("/");
});

app.get("/resultados", function (request, response) {
  const totalVotos = opciones.reduce((sum, opcion) => sum + opcion.votos, 0);

  response.render("resultados", {
    pregunta: pregunta,
    opciones: opciones,
    totalVotos: totalVotos,
  });
});

app.listen(PORT, function () {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});
