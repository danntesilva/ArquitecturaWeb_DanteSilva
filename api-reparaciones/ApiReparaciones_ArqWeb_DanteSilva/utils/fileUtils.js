const fs = require('fs');
const path = require('path');

// Paths absolutos a nuestros archivos JSON
const maquinasPath = path.join(__dirname, '../data/maquinas.json');
const reparacionesPath = path.join(__dirname, '../data/reparaciones.json');

// Leer los datos
const leerDatos = (filePath) => {
  try {
    const datos = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(datos);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return []; // Devuelve un array vacío si hay error
  }
};

// Función para escribir los datos
const escribirDatos = (filePath, datos) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error al escribir el archivo ${filePath}:`, error);
  }
};

// Exportar funciones y paths
module.exports = {
  leerDatos,
  escribirDatos,
  maquinasPath,
  reparacionesPath,
};
