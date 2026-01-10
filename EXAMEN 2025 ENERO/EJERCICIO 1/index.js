const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(session({
    secret: "secreto_de_examen",
    resave:false,
    saveUninitialized:false,
}));
app.use(express.urlencoded({extended: true}));
// Archivos estáticos se encuentran en la carpeta public
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (request, response) {
    return response.redirect("/libreria");
})

const ejercicio1Router = require("./routes/ejercicio1");
app.use("/libreria", ejercicio1Router);

app.listen(PORT, function () {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})


