const { body } = require('express-validator');

const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre completo es obligatorio.')
    .isLength({ max: 100 })
    .withMessage('El nombre no debe excedar 100 caracteres.'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es obligatorio.')
    .isMobilePhone('es-CO')
    .withMessage('Ingrese un número de teléfono válido para Colombia.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El correo electrónico es obligatorio.')
    .isEmail()
    .withMessage('Ingrese un correo electrónico válido.'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('La ciudad es obligatoria.')
    .isLength({ max: 60 })
    .withMessage('La ciudad no debe exceder 60 caracteres.'),
  body('caseType')
    .trim()
    .notEmpty()
    .withMessage('Debe seleccionar el tipo de caso.'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('La descripción del caso es obligatoria.')
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres.'),
  body('privacy')
    .equals('on')
    .withMessage('Debe aceptar la política de tratamiento de datos.')
];

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
};

const validateRequired = (data, fields) => {
  const errors = [];
  fields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`El campo ${field} es obligatorio.`);
    }
  });
  return errors;
};

module.exports = {
  contactValidationRules,
  sanitizeInput,
  validateRequired
};
