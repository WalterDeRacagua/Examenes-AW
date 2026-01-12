const express = require("express");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secreto_de_examen",
    resave: false,
    saveUninitialized: false,
}));

// Motor de vistas
app.set("view engine", "ejs");
app.set("views",  path.join(__dirname, "views"));

app.get("/", function (request, response) {
    return response.render("index");
})

app.listen(PORT, function () {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})
