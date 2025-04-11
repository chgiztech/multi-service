import express from 'express';
import usersController from '../controllers/users.controller.js';
import { protect } from '../middlewares/authVerifyToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validationHandler } from '../middlewares/validatorHandler.js';
import {
  createUserValidator,
  updateUserValidator,
} from '../middlewares/validators/usersValidator.js';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(protect), asyncHandler(usersController.getUsers))
  .post(
    asyncHandler(protect),
    createUserValidator,
    validationHandler,
    asyncHandler(usersController.createUser)
  );
router
  .route('/:id')
  .get(asyncHandler(protect), asyncHandler(usersController.getUser))
  .put(
    asyncHandler(protect),
    updateUserValidator,
    validationHandler,
    asyncHandler(usersController.updateUser)
  )
  .delete(asyncHandler(protect), asyncHandler(usersController.deleteUser));

export default router;
