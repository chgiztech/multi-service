import UserModel from '../config/sequelize.js';
import ErrorResponce from '../middlewares/errors.js';

export default new (class UserSevice {
  async getUSers() {
    const users = await UserModel.findAll();

    if (!users) {
      throw new ErrorResponce('Users not found', 404);
    }

    return users;
  }

  async getUser(id) {
    const user = await UserModel.findOne({
      where: { _id: id },
    });

    if (!user) {
      throw new ErrorResponce('User not found', 404);
    }

    return user;
  }

  async createUser(name, email, password) {
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    return user;
  }

  async updateUser(name, email, id) {
    const user = await UserModel.update(
      { name, email },
      {
        where: { _id: id },
      }
    ).then(async () => {
      return await UserModel.findOne({
        where: { _id: id },
      });
    });

    if (!user) {
      throw new ErrorResponce('User not found', 404);
    }

    return user;
  }

  async deleteUser(id) {
    const user = await UserModel.destroy({ where: { _id: id } });

    if (!user) {
      throw new ErrorResponce('User not found', 404);
    }

    return user;
  }
})();
