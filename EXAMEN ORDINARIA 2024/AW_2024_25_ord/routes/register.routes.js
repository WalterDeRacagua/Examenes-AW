const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path"); //Necesitamos path para decirle a multer dónde debe subir las imágenes exactamente
const fs = require("fs");
let usuarios = require("../data/usuarios");
const { error } = require("console");

// Decimos dónde se debe guardar las imagenes que subamos
const uploadDir = path.join(__dirname, "..", "public", "uploads");

// Esto es por si acaso el dev no ha creado el directorio uploads
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (request, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (request, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      // Acepta el archivo
      cb(null, true);
    } else {
      cb(
        new Error(
          "No se pueden subir otra cosa que no sean imágenes con formatos: png jpg o jpeg"
        ),
        false
      );
    }
  },
  //   Ponemos el límite de 5MB en el tamaño de los archivos
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

// Middleware de comprobación de correo no duplicado
function verificarCorreoDuplicado(request, response, next) {
  const { correo } = request.body;

  // Buscamos si el correo ya existe
  const correoExiste = usuarios.some((u) => u.correo === correo.toLowerCase());

  if (correoExiste) {
    if (request.file) {
      fs.unlinkSync(request.file.path);
    }

    response.render("registro", {
      error: "El correo ya existe, por lo que necesitas otro correo.",
    });
  }

  //   Si no existe,podemos seguir
  next();
}

router.get("/", function (request, response, next) {
  response.render("registro", {
    error: null,
  });
});

router.post(
  "/",
  upload.single("foto"),
  verificarCorreoDuplicado,
  function (request, response) {
    try {
      const { nombre, apellidos, correo, password } = request.body;

      // Repetimos validación de campos obligatorios
      if (!nombre || !apellidos || !correo || !password) {
        // Si falta algo, eliminar el path del file que ibamos a subir
        if (request.file) {
          fs.unlinkSync(request.file.path);
        }

        response.render("registro", {
          error: "Falta alguno de los campos obligatorios",
        });
      }

      if (!correo.endsWith("@ucm.es")) {
        if (request.file) {
          fs.unlinkSync(request.file.path);
        }

        response.render("registro", {
          error: "El dominio esperado es @ucm.es",
        });
      }

      //   Ahora tenemos que ver si se ha subido foto o no
      const foto = request.file ? request.file.filename : "noUser.png";

      const nuevoUsuario = {
        // trim() para eliminar los espacios
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim().toLowerCase(),
        contraseña: password,
        imagen: foto,
      };
      usuarios.push(nuevoUsuario);

      //   Importante usar redirect en el post de un formulario
      response.redirect("/users");
    } catch (e) {
      if (request.file) {
        fs.unlinkSync(request.file.path);
      }

      next();
    }
  }
);

module.exports = router;
