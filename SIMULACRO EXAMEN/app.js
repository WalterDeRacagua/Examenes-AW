const { Console, error } = require("console");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// La carpeta donde se van a subir las imagenes va a ser esta
const uploadDir = path.join(__dirname, "public", "uploads");

if(!fs.existsSync(uploadDir)) {
  // Si no existe lo creamos
  fs.mkdirSync(uploadDir, {recursive:true});
}

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (request, file, cb){
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (request, file, cb) {
    // los archivos que permitimos subir
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ||file.mimetype === "image/png") {
      // Aceptamos el archivo
      cb(null, true);
    } else {
      cb(new Error("No se puede subir otra cosa que no sea una imagen"), false);
    }
  },
  limits: {fileSize: 1024 * 50,}, //50kb
})

const app = express();
const PORT = process.env.PORT || 3500;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
function middlewarePeticiones(request, response, next) {
  const ruta = request.path;
  const metodo = request.method;
  const hora = Date.now().toLocaleString("es-ES");

  console.log(`Ruta: ${ruta}, Método: ${metodo}, Hora:  ${hora}`);

  next();
}

function middlewareVerificacion(request, response, next) {
  const { nombre, precio } = request.body;

  if (!nombre || nombre.trim().length < 3) {
    return response.render("formulario", {
      respuesta: null,
      error: "El nombre es obligatorio y debe tener como mínimo 3 caracteres",
    });
  }

  if (!precio || isNaN(precio) || parseInt(precio) <= 0) {
    return response.render("formulario", {
      respuesta: null,
      error:
        "El precio es obligatorio, debe ser un número mayor estrictamente que 0.",
    });
  }

  next();
}

let servicios = [];

app.get("/", middlewarePeticiones, function (request, response) {
  return response.render("formulario", {
    respuesta: null,
    error: null,
  });
});

app.post(
  "/",
  middlewarePeticiones,
  upload.single("foto"),
  middlewareVerificacion,
  function (request, response) {
    const { nombre, descripcion, precio } = request.body;

    const foto = request.file ? request.file.filename : null;

    let nuevoServicio = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: foto,
    };

    servicios.push(nuevoServicio);

    // No muestro la descripción para evitar problemas por si es demasiado larga
    return response.render("formulario", {
      respuesta: `Servicio creado --> Nombre: ${nuevoServicio.nombre}, Precio: ${nuevoServicio.precio}$`,
      error: null,
    });
  }
);

app.get("/servicios", function (request, response) {
  return response.render("servicios");
});

app.get("/api/servicios", middlewarePeticiones, function (request, response) {
  return response.json(servicios);
});

app.listen(PORT, function () {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
