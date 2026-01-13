const express = require("express");;
const router = express.Router();
let productos = require("../data/productos.json");
let infoProductos = require("../data/productos_detalle.json");

router.get("/api", function (request,response) {
    return response.json(productos);
});

router.get("/", function (request,response) {
    return response.render("productos",{
        sesion: request.session.nombre,
    })
});


router.get("/:id", function (request, response) {
    const id = parseInt(request.params.id);

    const productoBase = productos.find(p => p.id === id);
    // Si no existe...
    if (!productoBase) {
         return response.json("Producto no encontrado 1");
    }


    const productoDetalle = infoProductos.productos.find(p => p.id === id);

    if (!productoDetalle) {
         return response.json("Producto no encontrado problema gorfo");
    }


     response.render("producto", {
        producto: productoDetalle,
        sesion: request.session.nombre || null
    });
})

router.delete("/", function (request, response) {
    const id = parseInt(request.body.id);

    if (id ===-1) {
        return response.json("No se ha encontrado el producto a eliminar")
    }

    const indice = productos.findIndex(p => p.id === id);

    if (indice ===-1 ) {
        return response.json("No se ha encontrado el producto a eliminar");
    }

    productos.splice(indice, 1);

    const indiceDetalle = infoProductos.productos.findIndex(p => p.id === id);

    infoProductos.productos.splice(indiceDetalle,1);

    return response.status(200).json("Todo fino capuchino");
})

module.exports = router;