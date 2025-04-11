import amqp from 'amqplib';
import config from '../config/config.js';
import UserModel from '../config/sequelize.js';
import ErrorResponce from '../middlewares/errors.js';

export default new (class AuthService {
  getToken(user) {
    let token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (config.NODE_ENV === 'production') {
      options.secure = true;
    }

    return {
      token,
      options,
    };
  }

  async register(name, email, password) {
    let user = await UserModel.findOne({
      where: { email },
    });

    user = await UserModel.create({
      name,
      email,
      password,
    });

    try {
      const connect = await amqp.connect(config.MES_BROKER_HOST);

      const channel = await connect.createChannel();
      await channel.assertQueue(config.QUEUE);

      channel.sendToQueue(
        config.QUEUE,
        Buffer.from(
          JSON.stringify({
            name,
            email,
          })
        )
      );
    } catch (err) {
      console.log(err);
    }

    return this.getToken(user);
  }

  async login(email, password) {
    let user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new ErrorResponce('Invalid credentials', 401);
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new ErrorResponce('User not authorized, wrong password!', 401);
    }

    return this.getToken(user);
  }
})();
