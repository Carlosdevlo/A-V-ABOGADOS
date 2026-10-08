const nodemailer = require('nodemailer');

(async () => {
  const testAccount = await nodemailer.createTestAccount();

  process.env.SMTP_HOST = testAccount.smtp.host;
  process.env.SMTP_PORT = String(testAccount.smtp.port);
  process.env.SMTP_SECURE = 'false';
  process.env.SMTP_USER = testAccount.user;
  process.env.SMTP_PASS = testAccount.pass;
  process.env.MAIL_TO = 'consultas@abogadosav.com';
  process.env.PORT = '3112';

  console.log('SMTP host=' + testAccount.smtp.host + ' port=' + testAccount.smtp.port + ' user=' + testAccount.user);
  console.log('MAIL_TO=' + process.env.MAIL_TO);
  console.log('NOTE: password is NOT printed to avoid leakage');

  const createApp = require('./app.js');
  const app = createApp();
  const srv = app.listen(3112, () => console.log('TEST SERVER listening on 3112'));
  srv.timeout = 5000;
})();
