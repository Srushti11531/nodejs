const amqp = require('amqplib');
const QUEUE_NAME = 'emailQueue';

const enqueueEmailJob = async (emailPayload) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(emailPayload)), {
    persistent: true,
  });

  setTimeout(() => {
    connection.close();
  }, 500); // Prevent hanging
};

module.exports = {
  enqueueEmailJob,
};