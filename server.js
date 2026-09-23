const createApp = require('./app');
const config = require('./src/config/config');

const app = createApp();

const PORT = config.app.port;
const HOST = config.app.host;

app.listen(PORT, () => {
  console.log(`\n✓ A&V Abogados - Servidor iniciado`);
  console.log(`  Modo: ${config.app.env}`);
  console.log(`  Local: http://localhost:${PORT}\n`);
});
