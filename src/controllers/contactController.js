const { validationResult } = require('express-validator');
const ContactModel = require('../models/contactModel');
const WhatsappService = require('../services/whatsappService');
const { sanitizeInput } = require('../utils/validators');

const contactController = {
  renderContact(req, res) {
    const whatsappLink = WhatsappService.buildLink();

    res.render('pages/contact', {
      title: 'Contacto | A&V Abogados',
      description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
      page: 'contact',
      whatsappLink
    });
  },

  async submitContact(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const whatsappLink = WhatsappService.buildLink();
      return res.status(422).render('pages/contact', {
        title: 'Contacto | A&V Abogados',
        description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
        page: 'contact',
        whatsappLink,
        errors: errors.array(),
        formData: req.body,
        submitted: false
      });
    }

    try {
      const sanitizedData = {
        name: sanitizeInput(req.body.name),
        phone: sanitizeInput(req.body.phone),
        email: sanitizeInput(req.body.email),
        city: sanitizeInput(req.body.city),
        message: sanitizeInput(req.body.message),
        caseType: sanitizeInput(req.body.caseType)
      };

      const contact = await ContactModel.save(sanitizedData);

      const whatsappLink = WhatsappService.buildLink();

      if (req.xhr || req.headers.accept?.includes('application/json')) {
        return res.json({
          success: true,
          message: 'Su caso ha sido enviado correctamente. Nos pondremos en contacto pronto.',
          contactId: contact.id
        });
      }

      res.render('pages/contact', {
        title: 'Contacto | A&V Abogados',
        description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
        page: 'contact',
        whatsappLink,
        success: true,
        successMessage: 'Su caso ha sido enviado correctamente. Nos pondremos en contacto pronto.'
      });
    } catch (error) {
      console.error('Error al procesar el contacto:', error);
      const whatsappLink = WhatsappService.buildLink();
      res.status(500).render('pages/contact', {
        title: 'Contacto | A&V Abogados',
        description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
        page: 'contact',
        whatsappLink,
        errors: [{ msg: 'Ocurrió un error al enviar su caso. Por favor, intente nuevamente.' }]
      });
    }
  }
};

module.exports = contactController;
