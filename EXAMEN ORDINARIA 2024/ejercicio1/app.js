const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const libros = require("./data/libros");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "ecomarket-exam",
    resave: false,
    saveUninitialized: false,
  })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Rutas
app.get("/", function (request, response) {
  response.redirect("/libreria");
});

app.get("/libreria", function (request, response) {
  response.render("librerias");
});

app.get("/api/libros", function (request, response) {
  response.json(libros);
});

// Server
app.listen(PORT, () => {
  console.log(`EXAM app running at http://localhost:${PORT}`);
});
