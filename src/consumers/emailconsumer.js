const { getChannel } = require('../config/rabbitmq');
const { sendEmail } = require('../Service/emailservice');

const startConsumer = async () => {
  const channel = getChannel();

//   channel.consume('emailQueue', async (msg) => {
//     if (msg !== null) {
//       const emailData = JSON.parse(msg.content.toString());
//       await sendEmail(emailData);
//       channel.ack(msg);
//     }
//   });
};

module.exports = { startConsumer };
