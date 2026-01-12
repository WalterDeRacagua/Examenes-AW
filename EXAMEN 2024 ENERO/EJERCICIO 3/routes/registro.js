
const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs= require("fs");
const path = require("path");
let usuarios = require("../data/usuarios");

const uploadsDir = path.join(__dirname, "..", "public", "uploads");

// Si no encuentra el directorio --> lo crea
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {recursive: true})
}

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (request, file, cb) {
        const uniqueName = Date.now + "-"+ file.originalname;
        cb(null, uniqueName);
    },
});


const upload = multer({
    storage: storage,
    fileFilter: function (request,file, cb) {
        if (file.mimetype === "image/jpg" ||file.mimetype === "image/png" ||file.mimetype === "image/jpeg" ) {
            cb(null, true);
        }else {
            cb(null, false);
        }
    },
    limits:{
        fileSize: 1024 *1024 *5, //5MB
    }
})

router.get("/", function (request, response) {
    return response.render("registro",{
        error: null,
    });
});

router.post("/", upload.single("foto"), function (request, response) {
    const {nombre, apellidos, correo, password} = request.body;

    if (!nombre || !apellidos || !correo || !password) {
         return response.render("registro",{
        error: "Completa todos los campos que sean obligatorios",
        });
    }

    const usuarioExistente = usuarios.find(u => u.correo === correo);

    if (usuarioExistente) {
         return response.render("registro",{
            error: "Ya hay un usuario con este correo en la base de datos",
        });
    }

    // ssSS12

    const foto = request.file ? request.file.filename : "noUser.png";
    const id = Math.random();

    const usuario = {
        id: id,
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim(),
        password: password.trim(),
        foto:foto,
    }



    usuarios.push(usuario);

    response.redirect("/usuarios");
} )


module.exports = router;
