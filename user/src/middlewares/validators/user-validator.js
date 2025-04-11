import { body } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('The name field cannot be empty')
    .bail()
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),

  body('email')
    .notEmpty()
    .withMessage('The email field cannot be empty')
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('The password field cannot be empty')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .bail()
    .isLength({ max: 20 })
    .withMessage('Password must be maximum 20 characters')
    .bail()
    .not()
    .isLowercase()
    .withMessage(
      'Invalid format password! Password must have uppercase characters'
    )
    .bail()
    .not()
    .isUppercase()
    .withMessage(
      'Invalid format password! Password must have lowercase characters'
    ),
];

export const updateUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('The name field cannot be empty')
    .bail()
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),

  body('email')
    .notEmpty()
    .withMessage('The email field cannot be empty')
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format'),
];
