import { body } from 'express-validator';

export const createRecordValidator = [
  body('title')
    .notEmpty()
    .withMessage('The title field cannot be empty')
    .bail()
    .isLength({ max: 40 })
    .withMessage('Title must be less than 40 characters'),

  body('body')
    .isLength({ max: 3500 })
    .withMessage('Body must be less than 3500 characters'),
];

export const updateRecordValidator = [
  body('title')
    .isLength({ max: 40 })
    .withMessage('Title must be less than 40 characters'),
  body('body')
    .isLength({ max: 3500 })
    .withMessage('Body must be less than 3500 characters'),
];
