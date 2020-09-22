var express = require("express");
var rp = require("request-promise");
var app = express();

// app.use(express.urlencoded()); deprecado, uso body-parser
const bodyParser = require("body-parser");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  validations(req.body);

  var options = {
    method: "POST",
    uri: "https://reclutamiento-14cf7.firebaseio.com/personas.json",
    body: {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
    },
    json: true,
  };

  rp(options)
    .then((resul) => {
      res.status(201).json({
        status: "successful",
        message: "Carga Exitosa",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Error no previsto",
      });
    });
});

app.use(function (error, req, res, next) {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

app.listen(3000, function () {
  console.log("El servidor esta en funcionamiento");
});

function validations(body) {
  if (
    !Object.keys(body).includes("apellido") ||
    !Object.keys(body).includes("dni")
  ) {
    throw new Error("Datos requeridos no ingresados");
  }

  if (
    (Object.keys(body).includes("nombre") && Object.keys(body).length > 3) ||
    (!Object.keys(body).includes("nombre") && Object.keys(body).length > 2)
  ) {
    throw new Error("Cantidad invalida de datos ingresados ");
  }

  if (body.dni.length > 10 || body.dni === "") {
    throw new Error("Formato invalido de DNI");
  }

  if (typeof body.apellido != "string" || body.apellido === "") {
    throw new Error("Formato invalido de apellido");
  }

  if (typeof body.nombre != "string") {
    throw new Error("Formato invalido de nombre");
  }
}
