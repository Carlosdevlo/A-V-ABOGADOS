class ContactModel {
  constructor(data) {
    this.name = data.name || '';
    this.phone = data.phone || '';
    this.email = data.email || '';
    this.city = data.city || '';
    this.message = data.message || '';
    this.caseType = data.caseType || '';
    this.createdAt = new Date().toISOString();
    this.id = this._generateId();
  }

  _generateId() {
    return 'msg_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
  }

  static async save(contactData) {
    const contact = new ContactModel(contactData);

    if (global.__contactsStorage === undefined) {
      global.__contactsStorage = [];
    }
    global.__contactsStorage.push(contact);

    if (process.env.NODE_ENV === 'production') {
      console.log('CONTACT_FORM_SUBMISSION:', JSON.stringify(contact));
    }

    return contact;
  }

  static async getAll() {
    if (global.__contactsStorage === undefined) {
      global.__contactsStorage = [];
    }
    return global.__contactsStorage;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      city: this.city,
      message: this.message,
      caseType: this.caseType,
      createdAt: this.createdAt
    };
  }
}

module.exports = ContactModel;
