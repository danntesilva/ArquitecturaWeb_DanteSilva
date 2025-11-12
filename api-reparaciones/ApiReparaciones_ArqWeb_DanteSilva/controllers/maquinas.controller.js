const { leerDatos, maquinasPath, reparacionesPath } = require('../utils/fileUtils');

const getMaquinas = (req, res) => {
  const { marca } = req.query;
  let maquinas = leerDatos(maquinasPath);

  if (marca) {
    maquinas = maquinas.filter((m) => m.marca.toLowerCase() === marca.toLowerCase());
  }

  res.json(maquinas);
};

const getMaquinaById = (req, res) => {
  const id = parseInt(req.params.id);
  const maquinas = leerDatos(maquinasPath);
  const maquina = maquinas.find((m) => m.id === id);

  if (!maquina) {
    return res.status(404).json({ message: 'Máquina no encontrada' });
  }

  res.json(maquina);
};

const getReparacionesDeMaquina = (req, res) => {
  const idMaquina = parseInt(req.params.id);
  const reparaciones = leerDatos(reparacionesPath);
  const reparacionesDeMaquina = reparaciones.filter(
    (r) => r.id_maquina === idMaquina
  );

  if (reparacionesDeMaquina.length === 0) {
    return res
      .status(404)
      .json({ message: 'No se encontraron reparaciones para esta máquina' });
  }

  res.json(reparacionesDeMaquina);
};

const getStatsDeMaquina = (req, res) => {
  const idMaquina = parseInt(req.params.id);
  const reparaciones = leerDatos(reparacionesPath);
  const reparacionesDeMaquina = reparaciones.filter(
    (r) => r.id_maquina === idMaquina
  );
  const costoTotalMaquina = reparacionesDeMaquina.reduce(
    (total, r) => total + (r.costo || 0),
    0
  );
  res.json({
    id_maquina: idMaquina,
    total_reparaciones: reparacionesDeMaquina.length,
    costo_total_maquina: costoTotalMaquina,
  });
};

module.exports = {
  getMaquinas,
  getMaquinaById,
  getReparacionesDeMaquina,
  getStatsDeMaquina,
};
