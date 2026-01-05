const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const encuestas = require("./data/encuestas");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secreto_de_estado",
    resave: false,
    saveUninitialized: false,
  })
);

// Para los ficheros estaticos de public. Decimos que nuestros ficheros estáticos están en public
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (request, response) {
  response.redirect("/encuesta");
});

app.get("/encuesta", function (request, response) {
  response.render("encuesta");
});

app.post("/encuesta", function (request, response) {
  // Los parámetros viajan a través del body de la petición.
  const respuestas = request.body;

  Object.keys(respuestas).forEach((key) => {
    const numeroPregunta = parseInt(key.replace("pregunta", ""));
    const indiceOpcion = parseInt(respuestas[key]);

    if (
      encuestas[numeroPregunta] &&
      encuestas[numeroPregunta].opciones[indiceOpcion]
    ) {
      encuestas[numeroPregunta].opciones[indiceOpcion].votos++;
    }
  });

  response.status(200).send("Ok");
});

app.get("/resultados", function (request, response) {
  response.render("resultado", {
    encuestas: encuestas,
  });
});

// Api que envía las preguntas de las encuestas a través de un JSON.
app.get("/api/preguntas", function (request, response) {
  response.json(encuestas);
});

app.listen(PORT, function () {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});
