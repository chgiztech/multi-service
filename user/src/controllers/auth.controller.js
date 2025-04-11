import AuthService from '../services/auth.service.js';

export default new (class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    const tokenOptions = await AuthService.register(name, email, password);

    res
      .cookie('token', tokenOptions.token, tokenOptions.options)
      .status(201)
      .json({ success: true, token: tokenOptions.token });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const tokenOptions = await AuthService.login(email, password);

    res
      .cookie('token', tokenOptions.token, tokenOptions.options)
      .status(201)
      .json({ success: true, token: tokenOptions.token });
  }
})();
