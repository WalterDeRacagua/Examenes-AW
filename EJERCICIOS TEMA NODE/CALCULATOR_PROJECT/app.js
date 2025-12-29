const express = require("express");
const path = require("path");
const calculos = require("./public/calculos");

const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Para poder servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta de POST que se va a encargar de procesar los cálculos
app.post("/calculate", function (request, response) {
  const num1 = parseFloat(request.body.num1);
  const num2 = parseFloat(request.body.num2);
  const operation = request.body.operation;

  let result;

  switch (operation) {
    case "sum":
      result = calculos.sum(num1, num2);
      break;

    case "subtract":
      result = calculos.subtract(num1, num2);
      break;

    case "multiply":
      result = calculos.multiply(num1, num2);
      break;

    case "divide":
      result = calculos.divide(num1, num2);
      break;
  }

  response.json({ result });
});

// Escuchando en este puerto
app.listen(PORT, function () {
    console.log(`Escuchando en http://localhost:${PORT}`)
})