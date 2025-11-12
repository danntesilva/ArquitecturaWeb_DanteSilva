const { leerDatos, escribirDatos, maquinasPath, reparacionesPath } = require('../utils/fileUtils');

const getReparaciones = (req, res) => {
  const reparaciones = leerDatos(reparacionesPath);
  res.json(reparaciones);
};

const crearReparacion = (req, res) => {
  const reparaciones = leerDatos(reparacionesPath);
  const nuevaReparacion = req.body;
  const { id_maquina, descripcion } = nuevaReparacion;

  if (!id_maquina || !descripcion) {
    return res
      .status(400) // 400 = Bad Request
      .json({ message: 'Faltan datos obligatorios (id_maquina, descripcion)' });
  }

  const maquinas = leerDatos(maquinasPath);
  const maquinaExiste = maquinas.find((m) => m.id === id_maquina);

  if (!maquinaExiste) {
    return res
      .status(404) // 404 = Not Found
      .json({ message: `La máquina con id ${id_maquina} no existe.` });
  }

  const ultimoId =
    reparaciones.length > 0
      ? reparaciones[reparaciones.length - 1].id_reparacion
      : 0;
  nuevaReparacion.id_reparacion = ultimoId + 1;

  reparaciones.push(nuevaReparacion);
  escribirDatos(reparacionesPath, reparaciones); // Guardamos en el archivo

  res.status(201).json(nuevaReparacion);
};

const getReparacionById = (req, res) => {
  const id = parseInt(req.params.id);
  const reparaciones = leerDatos(reparacionesPath);
  const reparacion = reparaciones.find((r) => r.id_reparacion === id);

  if (!reparacion) {
    return res.status(404).json({ message: 'Reparación no encontrada' });
  }

  res.json(reparacion);
};

const actualizarReparacion = (req, res) => {
  const id = parseInt(req.params.id);
  const reparaciones = leerDatos(reparacionesPath);
  const index = reparaciones.findIndex((r) => r.id_reparacion === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Reparación no encontrada' });
  }

  const reparacionActualizada = { ...reparaciones[index], ...req.body };
  reparaciones[index] = reparacionActualizada;

  escribirDatos(reparacionesPath, reparaciones); 

  res.json(reparacionActualizada);
};

const eliminarReparacion = (req, res) => {
  const id = parseInt(req.params.id);
  let reparaciones = leerDatos(reparacionesPath);
  const index = reparaciones.findIndex((r) => r.id_reparacion === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Reparación no encontrada' });
  }

  reparaciones.splice(index, 1);
  escribirDatos(reparacionesPath, reparaciones);

  res.status(204).send();
};

const getStatsCosto = (req, res) => {
  const reparaciones = leerDatos(reparacionesPath);

  const costoTotal = reparaciones.reduce((total, r) => total + r.costo, 0);

  res.json({
    total_reparaciones: reparaciones.length,
    costo_total: costoTotal,
  });
};


module.exports = {
  getReparaciones,
  crearReparacion,
  getReparacionById,
  actualizarReparacion,
  eliminarReparacion,
  getStatsCosto,
};