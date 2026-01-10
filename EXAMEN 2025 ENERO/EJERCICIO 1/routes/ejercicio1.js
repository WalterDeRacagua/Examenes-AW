
const express = require('express');
const router = express.Router();
let libros = require("../data/libros");

router.get("/", function (request, response) {
    return response.render("libreria", {
        libros: libros
    });
});

// También lo voy a hacer por Ajax para practicar
router.get("/api", function (request, response) {
    return response.json(libros);
})

module.exports = router;
