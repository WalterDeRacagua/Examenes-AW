const express = require("express");
const router = express.Router();
let encuestas = require("../data/encuesta");
const encuesta = require("../data/encuesta");

router.get("/" , function (request, response) {
    return response.render("encuesta", {
        encuestas: encuestas,
        usuario: request.session.nombre,
    })
});

router.post("/" , function (request, response) {
   const respuestas = request.body;

    //Esto nunca pasa pero es defensivo
   const totalPreguntas = encuestas.length;
   const respuestasRecibidas = Object.keys(respuestas).length;

   if (totalPreguntas !== respuestasRecibidas) {
        return response.render("encuesta", {
            encuestas: encuestas,
            usuario: request.session.nombre,
        });
   }

   //Ahora vamos a recorrer las respuestas de la encuesta.
   Object.keys(respuestas).forEach(respuestaKey =>{
    // Para cada respuesta tenemos que obtener el indice de la pregunta a la que pertenece y su indice
        const indicePregunta = parseInt(respuestaKey.split('_')[1]);
        // Esto lo ha dividido en un array. Dicho array lo separa por la barra baja. En primera posición esta 'pregunta', y en segunda posicion (posicion 1) su indice
        
        // Esto es lo que tenemos almacenado en value
        const indiceOpcion = parseInt(respuestas[respuestaKey]);

        // Aumentamos el número de votos recibidos por dicha encuesta
        encuestas[indicePregunta].opciones[indiceOpcion].votos++;
   });

   return response.redirect("/encuesta/agradecimiento");
});

router.get("/agradecimiento", function (request,response) {
    return response.render("agradecimiento", {
        usuario: request.session.nombre,
    })
});

router.get("/resultados", function (request,response) {
    return response.render("resultados", {
        encuestas: encuestas,
        usuario: request.session.nombre,
    })
});



module.exports = router;