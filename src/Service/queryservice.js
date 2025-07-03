const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // your SMTP config
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: '"Your App" <srushtikapadiya4.com>',
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };