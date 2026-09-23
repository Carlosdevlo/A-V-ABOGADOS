const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const ejs = require('ejs');
const config = require('./src/config/config');
const homeRoutes = require('./src/routes/homeRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const contactController = require('./src/controllers/contactController');
const { contactValidationRules } = require('./src/utils/validators');
const WhatsappService = require('./src/services/whatsappService');

function createApp() {
  const app = express();
  const viewsPath = path.join(__dirname, 'src', 'views');
  const publicPath = path.join(__dirname, 'src', 'public');

  app.set('view engine', 'ejs');
  app.set('views', viewsPath);
  app.engine('ejs', function(filepath, options, callback) {
    ejs.renderFile(filepath, options, {
      ...options,
      resolvePaths: true,
      views: [viewsPath]
    }, callback);
  });

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.google.com", "https://www.googletagmanager.com"]
      }
    }
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(publicPath));

  app.use((req, res, next) => {
    res.locals.config = {
      company: config.app.name,
      shortName: config.app.shortName,
      website: config.app.website,
      contact: config.contact,
      year: new Date().getFullYear()
    };
    res.locals.year = new Date().getFullYear();
    res.locals.whatsappLink = WhatsappService.buildLink();
    next();
  });

  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: 'Demasiadas solicitudes. Por favor, intente nuevamente en unos minutos.'
  });
  app.use(limiter);

  app.use('/', homeRoutes);
  app.get('/contacto', contactController.renderContact);
  app.post('/contacto/submit', contactValidationRules, contactController.submitContact);
  app.use('/contact', contactRoutes);

  app.use((req, res) => {
    res.status(404).render('pages/404', { title: 'Página no encontrada | A&V Abogados' });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500', { title: 'Error | A&V Abogados' });
  });

  return app;
}

module.exports = createApp;
