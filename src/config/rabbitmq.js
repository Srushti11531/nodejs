const amqp = require('amqplib');

let channel;

const connectQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost'); // your RabbitMQ URL
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error('Channel not created. Call connectQueue first.');
  }
  return channel;
};

module.exports = {
  connectQueue,
  getChannel,
};
