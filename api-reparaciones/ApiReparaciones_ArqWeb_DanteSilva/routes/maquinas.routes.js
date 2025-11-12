const express = require('express');
const router = express.Router();
const {
  getMaquinas,
  getMaquinaById,
  getReparacionesDeMaquina,
  getStatsDeMaquina,
} = require('../controllers/maquinas.controller');

// Definimos las rutas para maquinas
router.get('/', getMaquinas);
router.get('/:id', getMaquinaById); 
router.get('/:id/reparaciones', getReparacionesDeMaquina); 
router.get('/:id/stats', getStatsDeMaquina);

module.exports = router;