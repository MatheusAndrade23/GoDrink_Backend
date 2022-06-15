const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
  }),
);

module.exports = transport;
