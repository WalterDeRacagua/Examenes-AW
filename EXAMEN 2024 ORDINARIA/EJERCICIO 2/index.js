const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secreto_examen",
    saveUninitialized: false,
    resave:false,
}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (request, response) {
    return response.redirect("/encuesta");
})

const routerEncuesta = require("./routes/encuesta");
app.use("/encuesta", routerEncuesta);

let encuesta = require("./data/encuesta");

app.get("/resultados", function (request, response) {
    return response.render("resultados", {
        encuesta: encuesta,
    })
})

app.listen(PORT, function () {
    console.log(`El servidor está escuchando en la dirección http://localhost:${PORT}`);
})