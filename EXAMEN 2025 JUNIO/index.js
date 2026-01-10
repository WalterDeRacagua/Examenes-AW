
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'ecomarket-exam',
    resave: false,
    saveUninitialized: false
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// const productos = require('./data/productos.json');
// const productosDetalle = require('./data/productos_detalle.json');
// app.locals.productos = productos;
// app.locals.productosDetalle = productosDetalle;

// Routes
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

const ejercicio1Routes = require("./routes/ejercicio1");
app.use("/autenticacion", ejercicio1Routes);

const ejercicio2Routes = require("./routes/ejercicio2");
app.use("/encuesta", ejercicio2Routes);

const ejercicio3Routes = require("./routes/ejercicio3");
app.use("/productos", ejercicio3Routes);

// Error 404
app.use(function (request, response) {
    return response.status(404).render("error404", {
        usuario: request.session.nombre
    });
})

// Server
app.listen(PORT, () => {
    console.log(`EcoMarket EXAM app running at http://localhost:${PORT}`);
});
