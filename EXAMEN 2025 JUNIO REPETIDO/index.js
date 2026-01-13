const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secreto_examen",
    saveUninitialized: false,
    resave: false,
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// La raíz
app.get("/", function (request,response) {
    return response.render("index", {
        sesion: request.session.nombre,
    });
})

const routerEjercicio1 = require("./routes/ejercicio1");
app.use("/registro", routerEjercicio1);
const routerEjercicio2 = require("./routes/ejercicio2");
app.use("/encuesta", routerEjercicio2);
const routerEjercicio3 = require("./routes/ejercicio3");
app.use("/productos", routerEjercicio3);

app.use(function (request, response, next) {
    response.status(404).render("error404",{
        sesion: request.session.nombre,
    });
})


app.use(function (request, response, next) {
    response.status(500).render("error500",{
        sesion: request.session.nombre,
    });
})

app.listen(PORT, function () {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})