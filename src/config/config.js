require('dotenv').config();

const config = {
  app: {
    name: process.env.COMPANY_NAME || 'A&V Abogados',
    shortName: process.env.COMPANY_SHORT || 'Profesionales en Seguros y Responsabilidad Civil',
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    website: process.env.WEBSITE || 'https://www.abogadosav.com'
  },
  contact: {
    whatsappNumber: process.env.WHATSAPP_NUMBER || '573008811886',
    whatsappMessage: process.env.WHATSAPP_MESSAGE || 'Hola A&V Abogados, quisiera recibir orientación sobre un accidente de tránsito.',
    phone: process.env.PHONE || '(+57) 484 9186',
    email: process.env.EMAIL || 'contacto@abogadosav.com',
    address: process.env.ADDRESS || 'Av Calle 26 # 69 – 76, Edificio Elemento, Torre 3 Tierra, Oficina 1501'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  }
};

module.exports = config;
