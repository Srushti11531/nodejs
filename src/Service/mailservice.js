const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srushtikapadiya4@gmail.com',
    pass: 'gacd sdbw opyv mbbk', // App password from Google
  },
});

async function sendWelcomeEmail(to, username) {
  const html = `
    <h1>Welcome to Our App, ${username}!</h1>
    <p>We're excited to have you onboard. Let us know if you need help.</p>
  `;

  return await transporter.sendMail({
    from: '"Your App" srushtikapadiya4@gmail.com',
    to:"srushtikapadiya4@gmaol.com",
    subject: 'Welcome to Our App!',
    html,
  });
}

module.exports = { sendWelcomeEmail };
