
const express = require('express');
const router = express.Router();

let encuesta = require("../data/encuesta");
let totalEncuestas =0;

router.get("/", function (request, response) {
    return response.render("encuesta", {
        encuesta: encuesta,
    })
});

router.post("/", function (request, response) {
    const respuestas = request.body;

    // Comprobamos que el número de respuestas sea igual al número de preguntas
    const numPreguntas = encuesta.length;
    const numRespuestas = Object.keys(respuestas).length;

    if (numPreguntas !== numRespuestas) {
        return response.render("encuesta", {
            encuesta: encuesta
        });
    }

    Object.keys(respuestas).forEach(respuesta =>{
        const indicePregunta = parseInt(respuesta.split("_")[1]);
        const indiceOpcion = parseInt(respuestas[respuesta]);
        encuesta[indicePregunta].opciones[indiceOpcion].votos++;
    })

    totalEncuestas++;

    return response.redirect("/encuesta/agradecimiento");
})

router.get("/agradecimiento", function (request, response) {
    return response.render("agradecimiento");
});

router.get("/resultados" , function (request, response) {
    return response.render("resultados", {
        encuesta: encuesta,
        totalEncuestas: totalEncuestas,
    })
})

module.exports = router;
