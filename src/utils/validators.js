const { body } = require('express-validator');

const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre completo es obligatorio.')
    .isLength({ max: 100 })
    .withMessage('El nombre no debe exceder 100 caracteres.'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es obligatorio.')
    .isMobilePhone('es-CO')
    .withMessage('Ingrese un número de teléfono válido para Colombia.'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Ingrese un correo electrónico válido.'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('La ciudad es obligatoria.')
    .isLength({ max: 60 })
    .withMessage('La ciudad no debe exceder 60 caracteres.'),
  body('accidentDate')
    .trim()
    .notEmpty()
    .withMessage('La fecha aproximada del accidente es obligatoria.')
    .isISO8601()
    .withMessage('Ingrese una fecha válida.'),
  body('injuries')
    .trim()
    .notEmpty()
    .withMessage('Debe seleccionar una opción.')
    .isIn(['lesionados', 'fallecida', 'solo-danos'])
    .withMessage('Seleccione una opción válida.'),
  body('ipat')
    .trim()
    .notEmpty()
    .withMessage('Debe seleccionar una opción.')
    .isIn(['si', 'no', 'no-se'])
    .withMessage('Seleccione una opción válida.'),
  body('caseType')
    .trim()
    .notEmpty()
    .withMessage('Debe seleccionar el tipo de caso.')
    .isIn(['accidente-transito', 'fallecimiento', 'aseguradora', 'danos', 'otro'])
    .withMessage('Seleccione un tipo de caso válido.'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('La descripción del caso es obligatoria.')
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres.'),
  body('privacy')
    .equals('on')
    .withMessage('Debe aceptar la política de tratamiento de datos.'),
  body('healthAuth')
    .equals('on')
    .withMessage('Debe autorizar el tratamiento de datos de salud.')
];

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
};

module.exports = {
  contactValidationRules,
  sanitizeInput
};
