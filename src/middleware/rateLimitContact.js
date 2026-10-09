const rateLimit = require('express-rate-limit');
const config = require('../config/config');

const contactRateLimiter = rateLimit({
  windowMs: config.contactRateLimit.windowMs,
  max: config.contactRateLimit.max,
  message: {
    success: false,
    message: 'Demasiados intentos. Por favor, espere una hora antes de enviar otro formulario.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos. Por favor, espere una hora antes de enviar otro formulario.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  },
  skipSuccessfulRequests: false,
  skipFailedRequests: false
});

module.exports = contactRateLimiter;