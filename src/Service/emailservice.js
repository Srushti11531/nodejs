const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srushtikapadiya4@gmail.com',
    pass: 'whoe jcas ujpx zqbr'
  }
});

const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: 'srushtikapadiya4@gmail.com',
    to, // can be array or string
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
