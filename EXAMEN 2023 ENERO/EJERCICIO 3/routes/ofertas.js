
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

router.get("/:nombre", function (request, response) {
    const nombre = request.params.nombre;

    if (!nombre) {
        return response.send("No se ha enviado ningun producto");
    }


    const producto = productos.items.find(p => p.nombre === nombre);

    if (!producto) {
        return response.send("Ups, no tenemos este producto");
    }

    return response.render("oferta",{
        producto: producto,
    })
})

router.put("/", function (request, response) {
    const {nombre} = request.body;

    const indice = productos.items.findIndex(p=> p.nombre ===nombre);

    if (indice ===-1) {
        return response.status(404).json({
            mensaje: "No existe el producto",
        });
    }

    productos.items.splice(indice,1);

    return response.status(200).json(productos);
})

module.exports = router;
