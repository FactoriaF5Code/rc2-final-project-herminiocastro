const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy para redirigir las solicitudes al backend
app.use(
  '/api', 
  createProxyMiddleware({
    target: 'http://localhost:8080', // Cambia esto si tu servidor backend corre en otro puerto
    changeOrigin: true,
  })
);

// Servir la aplicación React
app.use(express.static('build')); // Si has creado una carpeta de construcción, cambia 'build' por el nombre de tu carpeta de construcción

// Iniciar el servidor
const PORT = process.env.PORT || 5173; // Puedes cambiar el puerto si lo deseas
app.listen(PORT, () => {
  console.log(`Servidor React en ejecución en http://localhost:${PORT}`);
});
