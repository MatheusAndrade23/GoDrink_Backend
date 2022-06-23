const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async ({ to, subject, html, text }) => {
  return await transport.sendMail({
    from: 'Go Drink <godrink@gmail.com>',
    to,
    subject,
    html,
    text,
  });
};

module.exports = sendMail;
