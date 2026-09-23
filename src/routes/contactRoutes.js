const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidationRules } = require('../utils/validators');

router.get('/', contactController.renderContact);
router.post('/submit', contactValidationRules, contactController.submitContact);

module.exports = router;
