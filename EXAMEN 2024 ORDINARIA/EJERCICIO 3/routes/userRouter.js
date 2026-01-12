
const express = require('express');
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadsDir = path.join(__dirname, "..", "public", "uploads");
let usuarios = require("../data/usuarios");
// Si no existe la carpeta uploads la tiene que crear
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {recursive:true});
}

const storage = multer.diskStorage({
    destination: function (request, file,cb) {
        cb(null, uploadsDir);
    },
    filename: function (request, file, cb) {
        const unique = Date.now() + "-" + file.originalname;
        cb(null, unique);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (request,file, cb) {
        if (file.mimetype === "image/jpg"||file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(null,false);
        }
    },
    limits: {
        fileSize: 1024*1024*5, //5MB
    }
})

const uploadJSON = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (request,file, cb) {
        if (file.mimetype === "application/json") {
            cb(null, true);
        } else {
            cb(null,false);
        }
    },
    limits: {
        fileSize: 1024*1024*5, //5MB
    }
})

function middlewareCorreoDuplicado(request, response,next) {
    const {correo} = request.body;

    if (!correo) {
        return response.render("registro",{
            error: "El correo es obligatorio",
            numUsuarios: usuarios.length,
         })
    }

    const usuarioExiste = usuarios.find(u => u.correo === correo);

    if (usuarioExiste) {
         return response.render("registro",{
            error: "No puedes dar de alta a un usuario con ese correo porque dicho correo ya está asignado a otro usuario",
            numUsuarios: usuarios.length,

         })
    }


    // Si no está creado
    next();
}

router.get("/", function (request, response) {
    return response.redirect("/registro");
});

router.get("/registro", function (request, response) {
    return response.render("registro",{
        error: null,
        numUsuarios: usuarios.length,
    })
});

router.post("/cargar-json", uploadJSON.single("usuariosJSON"), function (request, response) {
    try {
        if (!request.file) {
            return response.render("registro",{
                error: "Tienes que subir el JSON",
                numUsuarios: usuarios.length
            })
        }

        const usuariosJSON = JSON.parse(request.file.buffer.toString('utf-8'));

        if (!Array.isArray(usuariosJSON)) {
             return response.render("registro",{
                error: "El JSON debe contener un array de usuarios",
                numUsuarios: usuarios.length
            })
        }

        for (let i = 0; i < usuariosJSON.length; i++) {
            const u = usuariosJSON[i];

            if (!u.nombre || !u.apellidos || !u.correo ||!u.contraseña ) {
                 return response.render("registro",{
                error: "A algún usuario le falta algun dato",
                numUsuarios: usuarios.length
            })
            }
        }

        usuariosJSON.forEach(u => {
            usuarios.push({
                nombre: u.nombre,
                apellidos: u.apellidos,
                correo: u.correo,
                contraseña: u.contraseña,
                imagen: u.imagen || "noUser.png"
            });
        })

        return response.redirect("/usuarios");
    } catch (error) {
        return response.render("registro", {
            error: "Algo ha fallado",
            numUsuarios: usuarios.length,
        })
    }
})

router.post("/registro", upload.single("foto"),middlewareCorreoDuplicado, function (request, response) {
    const {nombre, apellidos, password, correo} = request.body;


    if (!nombre || !password || !apellidos || !correo) {
        return response.render("registro", {
            error: "Todos los campos salvo la foto son obligatorios",
            numUsuarios: usuarios.length,
        })
    }

    const foto = request.file ? request.file.filename : "noUser.png";

    const usuario = {
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim(),
        contraseña: password.trim(),
        imagen: foto,
    }

    usuarios.push(usuario);

    return response.redirect("/usuarios");
})

router.get("/usuarios", function (request, response) {
    return response.render("usuarios",{
        usuarios: usuarios,
    })
})

router.get("/api/usuarios", function (request,response) {
    return response.json(usuarios);
})


router.get("/usuarios/:nombre" , function (request, response) {
    const nombre = request.params.nombre;

    if (!nombre) {
        return response.render("usuarios", {
            usuarios: usuarios,
        })
    }

    const usuarioExistente = usuarios.find(u => u.nombre === nombre);

    if (!usuarioExistente) {
          return response.render("usuarios", {
            usuarios: usuarios,
        })
    }

    return response.render("usuario", {
        usuario: usuarioExistente,
    })
})


router.put("/usuarios", function (request, response) {
    const {nombre} = request.body;

    const indice = usuarios.findIndex(u => u.nombre === nombre);

    // No se ha encontrado
    if (indice === -1) {
        return response.json("No se ha encontrado el usuario que se quiere eliminar");
    }

    usuarios.splice(indice,1);

    return response.status(200).json("Se ha eliminado correctamente");
});



module.exports = router;
