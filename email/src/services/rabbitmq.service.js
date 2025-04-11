import amqplib from 'amqplib';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default new (class MailService {
  constructor() {
    this.connect = amqplib.connect(config.MES_BROKER_HOST);
    this.transporter = nodemailer.createTransport({
      host: config.SMPT_HOST,
      port: config.SMPT_PORT,
      auth: {
        user: config.SMPT_EMAIL,
        pass: config.SMPT_PASSWORD,
      },
    });
  }

  async sendwelcomeMail() {
    const channel = await (await this.connect).createChannel();

    channel.consume(config.QUEUE, async (queueData) => {
      const userSendMailData = JSON.parse(queueData.content);
      channel.ack(queueData);

      console.log(userSendMailData);

      const message = {
        from: config.SMPT_EMAIL,
        to: userSendMailData.email,
        subject: config.SUBJECT,
        text: `Здравствуйте <${userSendMailData.name}>. Спасибо, что зарегестрировались на нашем севрисе!`,
      };

      let info;

      try {
        info = await this.transporter.sendMail(message);
      } catch (e) {
        console.log(e);
      }

      console.log('Message sent: %s', info.messageId);
    });
  }
})();
