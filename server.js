const createApp = require('./app');
const config = require('./src/config/config');

const app = createApp();

// Only start server locally (Vercel handles hosting)
if (process.env.VERCEL !== '1') {
  const PORT = config.app.port;
  const HOST = config.app.host || 'localhost';

  app.listen(PORT, () => {
    console.log(`\n✓ A&V Abogados - Servidor iniciado`);
    console.log(`  Modo: ${config.app.env}`);
    console.log(`  Local: http://localhost:${PORT}\n`);
  });
}

// Export app for Vercel serverless
module.exports = app;
