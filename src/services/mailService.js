const config = require('../config/config');

class MailService {
  static _transporter() {
    var mailCfg = config.mail || {};

    if (!mailCfg.smtpHost || !mailCfg.to) {
      return null;
    }

    if (!mailCfg.smtpPass && mailCfg.smtpUser) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[MailService] SMTP_USER definido pero falta SMTP_PASS; no se enviarán correos.');
      }
      return null;
    }

    var nodemailer;
    try {
      nodemailer = require('nodemailer');
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[MailService] nodemailer no está instalado; los formularios no se enviarán por correo.');
      }
      return null;
    }

    return nodemailer.createTransport({
      host: mailCfg.smtpHost,
      port: mailCfg.smtpPort,
      secure: mailCfg.smtpSecure,
      auth: {
        user: mailCfg.smtpUser || '',
        pass: mailCfg.smtpPass || ''
      }
    });
  }

  static async sendContactSubmission(lead) {
    var transporter = this._transporter();

    if (!transporter) {
      return { sent: false, reason: 'mail_not_configured' };
    }

    var subject = 'Nuevo caso de contacto - A&V Abogados';
    var text =
      'Se recibió un nuevo mensaje desde el formulario de contacto de A&V Abogados.\n\n' +
      'Datos del interesado:\n' +
      'Nombre: ' + (lead.name || '(sin nombre)') + '\n' +
      'Teléfono: ' + (lead.phone || '(no especificado)') + '\n' +
      'Correo: ' + (lead.email || '(no especificado)') + '\n' +
      'Ciudad: ' + (lead.city || '-') + '\n' +
      'Fecha del accidente: ' + (lead.accidentDate || '-') + '\n' +
      'Tipo de lesión: ' + (lead.injuries || '-') + '\n' +
      'IPAT: ' + (lead.ipat || '-') + '\n' +
      'Tipo de caso: ' + (lead.caseType || '-') + '\n\n' +
      'Mensaje:\n' + (lead.message || '(sin mensaje)');

    try {
      var info = await transporter.sendMail({
        from: config.mail.from,
        to: config.mail.to,
        subject: subject,
        text: text
      });
      return { sent: true, messageId: info && info.messageId };
    } catch (error) {
      console.error('[MailService] Error al enviar correo de contacto:', error && error.message);
      return { sent: false, reason: error && error.message };
    }
  }
}

module.exports = MailService;
