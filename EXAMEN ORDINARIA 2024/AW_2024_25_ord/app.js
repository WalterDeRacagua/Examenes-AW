const express = require("express");
const path = require("path");
const morgan = require("morgan");
// Faltaría multer para las imágenes

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const registerRoutes = require("./routes/register.routes");
const usersRoutes = require("./routes/user.routes");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (request, response) {
  response.redirect("/users");
});

app.use("/register", registerRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, function () {
  console.log(`Escuchando en http://localhost:${PORT}`);
});
