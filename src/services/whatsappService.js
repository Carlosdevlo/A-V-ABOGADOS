const config = require('../config/config');

class WhatsappService {
  static buildUrl(phoneNumber = config.contact.whatsappNumber) {
    const cleanNumber = String(phoneNumber).replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}`;
  }

  static buildLink(message = config.contact.whatsappMessage) {
    const cleanNumber = String(config.contact.whatsappNumber).replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }

  static buildCustomLink(message, phoneNumber = config.contact.whatsappNumber) {
    const cleanNumber = String(phoneNumber).replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }

  static getFormattedNumber() {
    const num = String(config.contact.whatsappNumber);
    const match = num.match(/^(\d{1,3})(\d{3})(\d{3})(\d{3,4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return num;
  }
}

module.exports = WhatsappService;
