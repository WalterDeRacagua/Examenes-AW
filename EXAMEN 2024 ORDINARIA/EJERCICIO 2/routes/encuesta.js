
const express = require('express');
const router = express.Router();
let encuesta = require("../data/encuesta")

router.get("/", function (request, response) {
    return response.render("encuesta",{
        encuesta:encuesta,
    })
})


router.post("/", function (request, response) {

    const preguntas = request.body;

    Object.keys(preguntas).forEach(pregunta =>{
        const indicePregunta = parseInt(pregunta.split("_")[1]);
        const indiceOpcion = parseInt(preguntas[pregunta]);

        encuesta[indicePregunta].opciones[indiceOpcion].votos++;
    });


    return response.render("gracias");
})


module.exports = router;
