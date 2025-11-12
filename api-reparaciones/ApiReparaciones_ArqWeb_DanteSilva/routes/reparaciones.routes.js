const express = require('express');
const router = express.Router();
const {
  crearReparacion, 
  getReparacionById,
  actualizarReparacion,
  eliminarReparacion,
  getReparaciones,
  getStatsCosto,
} = require('../controllers/reparaciones.controller');

router.post('/', crearReparacion);
router.get('/:id', getReparacionById);
router.put('/:id', actualizarReparacion);
router.delete('/:id', eliminarReparacion);

router.get('/', getReparaciones);
router.get('/stats/costo-total', getStatsCosto);

module.exports = router;