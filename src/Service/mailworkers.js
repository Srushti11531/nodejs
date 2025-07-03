// const amqp = require('amqplib');
// const { sendMail } = require('./mailservice'); // your nodemailer service

// const startMailWorker = async () => {
//   const conn = await amqp.connect('amqp://localhost');
//   const channel = await conn.createChannel();

//   await channel.assertQueue('email_queue', { durable: true });

//   channel.consume('email_queue', async (msg) => {
//     console.log("email_queue msg: ",msg)
//     if (msg !== null) {
//       const payload = JSON.parse(msg.content.toString());
//       console.log(' Payload:', payload);

//       // await sendMail(payload); // send mail
//       channel.ack(msg);
//     }
//   });
// };
// module.exports = { startMailWorker };


// startMailWorker();


// const amqp = require('amqplib');
// const nodemailer = require('nodemailer');
// const QUEUE_NAME = 'emailQueue';
// require('dotenv').config(); // add this


// const startMailWorker = async () => {
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();
//   await channel.assertQueue(QUEUE_NAME, { durable: true });

//   console.log('Email Worker started. Waiting for messages...');

//   channel.consume(QUEUE_NAME, async (msg) => {
//     if (msg !== null) {
//       const emailPayload = JSON.parse(msg.content.toString());
//       console.log('Processing email:', emailPayload);

//       try {
//         // Replace with your SMTP configuration
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: process.env.SMTP_USER,
//           to: emailPayload.to,
//           subject: emailPayload.subject,
//           html: emailPayload.html,
//         });

//         channel.ack(msg);
//         console.log('Email sent to:', emailPayload.to);
//       } catch (error) {
//         console.error('Email sending failed:', error);
//         channel.nack(msg); // retry
//       }
//     }
//   });
// };

// startMailWorker();

// const amqp = require('amqplib');
// const nodemailer = require('nodemailer');
// const QUEUE_NAME = 'emailQueue';
// require('dotenv').config();

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const startMailWorker = async () => {
//   try{
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();
//   await channel.assertQueue(QUEUE_NAME, { durable: true });

//   console.log(' Email Worker started. Waiting for messages...');

//   channel.consume(QUEUE_NAME, async (msg) => {
//     if (msg !== null) {
//       const emailPayload = JSON.parse(msg.content.toString());
//       console.log(' Processing email:', emailPayload);

//       try {
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//           },
//         });
//         await transporter.sendMail({
//           from: process.env.SMTP_USER,
//           to: emailPayload.to,
//           subject: emailPayload.subject,
//           html: emailPayload.html,
//         });

//         await new Promise(resolve => setTimeout(resolve, 2000));
//         console.log(' Email sent to:', emailPayload.to);
//         channel.ack(msg);
//         await sleep(1000);

//       } catch (error) {
//         console.error(' Email sending failed:', error.message);


//         if (error.responseCode === 421) {
//           console.warn(' Temporary error, message requeued for retry');
//           channel.nack(msg, false, true); // requeue
//         } else {
//           console.error(' Permanent error, discarding message:', emailPayload.to);
//           channel.ack(msg); // discard 
//         }
//       }
//     }
//   });

// };

// // startMailWorker().catch((err) => {
// //   console.error(' Failed to start worker:', err.message);
// // });


// module.exports = {
//   startMailWorker,
// };

const amqp = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv').config();

const QUEUE_NAME = 'emailQueue'; // Replace with your actual queue name

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startMailWorker = async () => {
  let connection, channel;

  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(' Email Worker started. Waiting for messages...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        let emailPayload;

        try {
          emailPayload = JSON.parse(msg.content.toString());
          console.log('🔧 Processing email:', emailPayload);

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: emailPayload.to,
            subject: emailPayload.subject,
            html: emailPayload.html,
          });

          await sleep(2000); // Optional delay
          console.log(' Email sent to:', emailPayload.to);
          channel.ack(msg);
          await sleep(1000); // Optional delay

        } catch (error) {
          console.error(' Email sending failed:', error.message);

          if (error.responseCode === 421 || error.code === 'ECONNECTION') {
            console.warn(' Temporary error, requeueing message');
            channel.nack(msg, false, true); // requeue
          } else {
            console.error(' Permanent error, discarding message:', emailPayload?.to);
            channel.ack(msg); // discard message
          }
        }
      }
    });

  } catch (err) {
    console.error(' Failed to start mail worker:', err.message);
    if (channel) await channel.close().catch(e => console.error('Failed to close channel:', e.message));
    if (connection) await connection.close().catch(e => console.error('Failed to close connection:', e.message));
  }
};

module.exports = {
  startMailWorker,
};
