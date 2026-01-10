const express = require("express");
const router = express.Router();

let productos = require("../data/productos");

// Debemos pillar de data un json de productos que contenga la información

router.get("/", function (request, response) {
    return response.render("productos",{
        usuario: request.session.nombre,
    })
});

// Api que devolverá la lista de productos en formato json
router.get("/api", function (request,response) {
   return response.json(productos);
})


router.get("/:id", function (request, response) {

    const id= request.params.id;

    // Obtenemos el producto del array
    const producto = productos[id];

    return response.render("producto", {
        producto: producto,
        usuario: request.session.nombre,
    })
})




module.exports= router;