"use strict";
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secretillo_de_examen",
    resave: false,
    saveUninitialized: false
}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", function (request, response) {
    return response.redirect("/ofertas");
})

// Rutas
const rutasOfertas = require("./routes/ofertas");
app.use("/ofertas", rutasOfertas);


app.use(function (request, response, next) {
    response.status(404).render("error404")
});

app.use(function (request, response, next) {
    response.status(500).render("error500")
})



app.listen(PORT, function () {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})


