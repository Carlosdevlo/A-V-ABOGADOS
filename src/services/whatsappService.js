const config = require('../config/config');

class WhatsappService {
  static buildLink(message = config.contact.whatsappMessage) {
    const cleanNumber = String(config.contact.whatsappNumber).replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }
}

module.exports = WhatsappService;