
const express = require('express');
const router = express.Router();
let libros = require("../data/libros");

router.get("/", function (request, response) {
    return response.render("libreria", {
        libros: libros,
    })
})


module.exports = router;
