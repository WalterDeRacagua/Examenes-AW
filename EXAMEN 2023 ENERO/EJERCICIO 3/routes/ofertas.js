
const express = require('express');
const router = express.Router();
let productos = require("../data/productos");


router.get("/", function (request, response) {
    // Podríamos usar ejs pero uso ajax para carga dinámica
    return response.render("ofertas");
})

router.get("/api", function (request, response) {
    return response.json(productos);
});
module.exports = router;
