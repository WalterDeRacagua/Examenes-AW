const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
let usuarios = require("../data/usuarios");

// Primero establecemos la carpeta uploads dentro de public
const uploadsDir = path.join(__dirname, "..", "public", "uploads");

// Si no existe la carpeta de uploads la creamos
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {recursive:true});
};

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (request, file, cb) {
        const fileUniqueName = Date.now() + "-"+ file.originalname;
        cb(null, fileUniqueName)
    }, 
});

const upload = multer({
    storage: storage,
    fileFilter: function (request,file,cb) {
        if (file.mimetype === "image/png" ||file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    limits:{
        fileSize: 1024 * 1024*5, //5MB
    }
})


function middlewareCorreoDuplicado(request, response, next) {
    
    const correo = request.body.correo;

    const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);

    if (usuarioExistente) {
        return response.render("registro" , {
            error: "El correo está duplicado, necesitamos otro correo",
        })
    }

    next();
}

router.get("/", function (request, response) {
    return response.render("registro", {
        error: null,
    })
});

router.post("/", upload.single("foto"), middlewareCorreoDuplicado, function (request, response) {
    const {nombre, correo, password} = request.body;

    if (!nombre ||!correo ||!password ) {
        return response.render("registro",{
            error: "Los campos de nombre, correo y contraseña son obligatorios",
        })
    }

    if (!correo.includes("@ucm.es")) {
        return response.render("registro",{
            error: "El correo debe cumplir con el dominio @ucm.es",
        })
    }

    if (password.length < 6) {
        return response.render("registro",{
            error: "La contraseña debe tener como mínimo 6 caracteres",
        })
    }

    const foto = request.file ? request.file.filename : "noUser.png";

    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        contraseña: password,
        foto: foto,
    }

    usuarios.push(nuevoUsuario);

    // Que redirija a la vista de usuarios
    response.redirect("");
});


module.exports = router;
