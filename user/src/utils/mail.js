import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default new (class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMPT_HOST,
      port: config.SMPT_PORT,
      auth: {
        user: config.SMPT_EMAIL,
        pass: config.SMPT_PASSWORD,
      },
    });
  }

  async sendwelcomeMail(options) {
    const message = {
      from: `${config.FROM_NAME}<${config.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await this.transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
  }
})();
