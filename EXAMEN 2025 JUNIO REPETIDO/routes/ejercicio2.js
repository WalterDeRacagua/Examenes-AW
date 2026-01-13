const express = require("express")
const router =  express.Router();
let encuesta = require("../data/encuesta");

router.get("/", function (request, response) {
    return response.render("encuesta" ,{
        encuesta: encuesta,
        sesion: request.session.nombre,
    })
});

router.post("/", function (request, response) {

    const respuestas = request.body;

    const numRespuestas = Object.keys(respuestas).length;
    const numPreguntas = encuesta.length;
    
    if (numRespuestas !== numPreguntas) {
        return response.render("encuesta", {
                encuesta: encuesta,
                sesion: request.session.nombre,
        })
    }

    Object.keys(respuestas).forEach(respuesta=>{
        const indicePregunta = parseInt(respuesta.split("_")[1]);
        const indiceOpcion = parseInt(respuestas[respuesta]);

        encuesta[indicePregunta].opciones[indiceOpcion].votos++;
    });

    return response.redirect("/encuesta/agradecimiento");
});

router.get("/agradecimiento", function (request, response) {
    return response.render("agradecimiento",{
        sesion: request.session.nombre,
    });
});

router.get("/resultados", function (request,response) {
    return response.render("resultados", {
        encuesta: encuesta,
        sesion: request.session.nombre,
    })
})

module.exports = router;