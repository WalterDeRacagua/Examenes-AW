const express = require("express");
const router = express.Router();
let encuesta = require("../data/encuesta")

router.get("/", function (request, response) {
    return response.render("encuesta", {
        encuesta: encuesta
    })
});

router.post("/", function (request, response) {
  
    const preguntas = request.body;

    const preguntasRespondidas =Object.keys(preguntas).length;
    const preguntasDisponibles = encuesta.length;

    if (preguntasDisponibles !== preguntasRespondidas) {
        return response.send("El número de preguntas respondidas debe ser el mismo que el de preguntas existentes")
    }

    Object.keys(preguntas).forEach(pregunta =>{
        const indicePregunta =  parseInt(pregunta.split('_')[1]);
        const indiceOpcion = parseInt(preguntas[pregunta]);

        encuesta[indicePregunta].opciones[indiceOpcion].votos++;
    });

    return response.redirect("/gracias");
});

router.get("/gracias", function (request, response) {
    return response.render("gracias");
})

router.get("/resultados", function (request, response) {
    return response.render("resultados", {
        encuesta: encuesta,
    });
})

module.exports = router;
