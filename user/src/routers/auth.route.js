import express from 'express';
import userController from '../controllers/auth.controller.js';
import { registerValidator } from '../middlewares/validators/authValidator.js';
import { validationHandler } from '../middlewares/validatorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post('/login', asyncHandler(userController.login));
router.post(
  '/register',
  registerValidator,
  validationHandler,
  asyncHandler(userController.register)
);

export default router;
