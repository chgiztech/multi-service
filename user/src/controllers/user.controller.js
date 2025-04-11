import userService from '../services/user.service.js';

export default new (class UserController {
  async getUsers(req, res) {
    const users = await userService.getUSers();

    res.status(200).json({
      success: true,
      data: users,
    });
  }

  async getUser(req, res) {
    const id = req.params.id;

    const user = await userService.getUser(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;

    const user = await userService.createUser(name, email, password);

    res.status(201).json({
      success: true,
      data: user,
    });
  }

  async updateUser(req, res) {
    const { name, email } = req.body;
    const id = req.params.id;

    const user = await userService.updateUser(name, email, id);

    res.status(201).json({
      success: true,
      data: user,
    });
  }

  async deleteUser(req, res) {
    const id = req.params.id;

    await userService.deleteUser(id);

    res.status(204).json({
      success: true,
    });
  }
})();
