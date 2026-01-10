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
    return response.redirect("/registro");
})

const routerEjercicio3 = require("./routes/ejercicio3");
app.use("/registro" , routerEjercicio3);

const routerUsuarios = require("./routes/usuarios.routes");
app.use("/usuarios", routerUsuarios);

app.use(function (request, response,next) {
    return response.status(404).render("error404");
});

app.use( function (request, response,next) {
    return response.status(500).render("error500");
})

app.listen(PORT, function () {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})


