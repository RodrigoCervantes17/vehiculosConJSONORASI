const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let vehiculos = [];

app.get('/vehiculos', (req, res) => {
  res.json({ vehiculos: vehiculos });
});

app.post('/vehiculos', (req, res) => {
  let vehiculo = req.body.vehiculo;
  vehiculos.push(vehiculo);
  res.json({ tipo: 'agregar' });
});

app.delete('/vehiculos/:placa', (req, res) => {
  let placa = req.params.placa;
  let indice = vehiculos.findIndex((v) => v.placa === placa);
  if (indice !== -1) {
    vehiculos.splice(indice, 1);
    res.json({ tipo: 'eliminar' });
  } else {
    res.status(404).json({ error: 'No se encontró el vehículo' });
  }
});

app.get('/vehiculos/:placa', (req, res) => {
  let placa = req.params.placa;
  let vehiculo = vehiculos.find((v) => v.placa === placa);
  if (vehiculo) {
    res.json({ tipo: 'busqueda', vehiculo: vehiculo });
  } else {
    res.status(404).json({ error: 'No se encontró el vehículo' });
  }
});

app.listen(3000, () => {
  console.log('Escuchando en puerto 3000');
});
