const { validationResult } = require('express-validator');
const ContactModel = require('../models/contactModel');
const WhatsappService = require('../services/whatsappService');
const MailService = require('../services/mailService');
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
        accidentDate: sanitizeInput(req.body.accidentDate),
        injuries: sanitizeInput(req.body.injuries),
        ipat: sanitizeInput(req.body.ipat),
        message: sanitizeInput(req.body.message),
        caseType: sanitizeInput(req.body.caseType)
      };

      const contact = await ContactModel.save(sanitizedData);

      const mailResult = await MailService.sendContactSubmission(sanitizedData);
      var mailNotConfigured = mailResult.reason === 'mail_not_configured';
      var mailOk = mailResult.sent === true || mailNotConfigured;

      if (!mailOk) {
        console.error('[contactController] Notificación por correo no enviada:', mailResult.reason || 'desconocido');
      }

      const whatsappLink = WhatsappService.buildLink();
      const successMessage = 'Recibimos su información. Un abogado de A&V lo contactará en horario hábil. Si su caso es urgente, escríbanos por WhatsApp al 300 881 1886.';
      const failureMessage = 'Su caso se registró, pero no pudimos enviar la notificación por correo en este momento. Por favor, intente nuevamente o escríbanos por WhatsApp al 300 881 1886.';

      if (req.xhr || req.headers.accept?.includes('application/json')) {
        if (!mailOk) {
          return res.status(200).json({
            success: false,
            message: failureMessage,
            contactId: contact.id
          });
        }
        return res.json({
          success: true,
          message: successMessage,
          contactId: contact.id
        });
      }

      if (!mailOk) {
        return res.render('pages/contact', {
          title: 'Contacto | A&V Abogados',
          description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
          page: 'contact',
          whatsappLink,
          errors: [{ msg: failureMessage }]
        });
      }

      res.render('pages/contact', {
        title: 'Contacto | A&V Abogados',
        description: 'Comuníquese con A&V Abogados para obtener asesoría jurídica sin costo sobre su accidente de tránsito.',
        page: 'contact',
        whatsappLink,
        success: true,
        successMessage: successMessage
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
