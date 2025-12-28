const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let usuarios = require("../data/usuarios");
const { error } = require("console");

// Configuramos el directorio en el que el multer va a subir los archivos (imágenes) ../public/uploads
const uploadDir = path.join(__dirname, "..", "public", "uploads");

// Storage = almacenamiento
const storage = multer.diskStorage({
  // Donde se va a guardar el archivo? request = objeto de la petición, file = información del archivo cb= callback
  destination: function (request, file, cb) {
    cb(null, uploadDir);
  },
  // ¿Cómo se llama el archivo que vamos a subir. Así no se sobreescribe si se suben dos fotos iguales
  filename: function (request, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  // Filtro de archivos
  fileFilter: function (request, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      // Acepta el archivo
      cb(null, true);
    } else {
      // No lo acepta
      cb(new Error("Solo se permiten archivos png, jpg o jpeg."), false);
    }
  },
  // Límites para el archivo
  limits: {
    // Tamaño del archivo
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

// GET - Mostrar formulario de registro. localhost:3000/registro
router.get("/", function (request, response) {
  response.render("registro", { error: null });
});

// POST - Procesar el registro, validación. Espera un solo archivo, el campo del formulario se llama foto
router.post("/", upload.single("foto"), function (request, response, next) {
  try {
    const { nombre, apellidos, correo, password } = request.body; //Viaja en el body de la petición.

    // Validación de campos obligatorios
    if (!nombre || !apellidos || !password) {
      if (request.file) {
        fs.unlinkSync(request.file.path);
      }
      return response.render("registro", {
        error: "Nombre, apellidos y contraseña son obligatorios",
      });
    }

    // Validación del correo
    if (!correo || !correo.endsWith("@ucm.es")) {
      if (request.file) {
        fs.unlinkSync(request.file.path);
      }
      return response.render("registro", {
        error: "El correo debe tener el dominio @ucm.es",
      });
    }

    //Verificamos si el correo ya existe
    const correoExiste = usuarios.some((usuario) => usuario.correo === correo);

    if (correoExiste) {
      if (request.file) {
        fs.unlinkSync(request.file.path);
      }
      return response.render("registro", {
        error: "Ya hay un usuario dado de alta con dicho correo",
      });
    }

    // Determinar la foto, si si ha subido entonces pone esa, si no pone una por defecto de que no hay usuario.
    const foto = request.file ? request.file.filename : "noUser.jpg";

    // Generamos un nuevo ID
    const nuevoId = (usuarios.length + 1).toString();

    const nuevoUsuario = {
      id: nuevoId,
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correo.trim().toLowerCase(),
      pass: password,
      foto: foto,
    };

    usuarios.push(nuevoUsuario);

    console.log("Se ha añadido un nuevo usuario con id: ", nuevoId);
    response.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
