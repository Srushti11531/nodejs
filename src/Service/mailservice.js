// const nodemailer = require('nodemailer');
// //const { getEnv } = require('../utils/EmailService');

const sendMail = async ({ to, name, subject, html }) => {
  const emailUser = getEnv('SMTP_USER'); 
  const mailSubject = subject || 'No Subject'; 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: getEnv('SMTP_PASS')
    }
  });

   //const finalHtml = html || `<h1>Hello ${name || 'User'},</h1><p>Welcome to our platform!</p>`;

  await transporter.sendMail({
    from: `"TechRover Team" <${emailUser}>`,
    to,
    subject: mailSubject,
    html: finalHtml
  });
};

// module.exports = { sendMail };
const amqp = require('amqplib');
const { startMailWorker } = require('./mailworkers');

let channel;

const getChannel = async () => {
  if (!channel) {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
  }
  return channel;
};

const sendToMailQueue = async (payload) => {
  const channel = await getChannel();
  const queue = 'email_queue';
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });
 startMailWorker()
};

module.exports = { sendToMailQueue, sendMail };