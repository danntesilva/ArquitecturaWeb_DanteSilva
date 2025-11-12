const express = require('express');
const app = express();
const PORT = 3000; 

// Middleware
app.use(express.json());

// Importamos las rutas
const maquinasRoutes = require('./routes/maquinas.routes');
const reparacionesRoutes = require('./routes/reparaciones.routes');

app.use('/api/maquinas', maquinasRoutes);
app.use('/api/reparaciones', reparacionesRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Reparaciones! ⚙️');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});