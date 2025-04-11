export default class ErrorResponce extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorsHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message =
      'Photo not updated! Please enter another "photo" field to upload';

    error = new ErrorResponce(message, 400);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    let message;

    Object.values(err).forEach((val) => {
      if (val.constraint === 'users_email_key') {
        message = 'This email is already in use';
      }
    });

    error = new ErrorResponce(message, 400);
  }

  if (err.original?.code === 'ER_DUP_ENTRY') {
    const message = err.original.sqlMessage;
    error = new ErrorResponce(message, 400);
  }

  if (err.name === 'ReferenceError') {
    const message = 'ReferenceError: Server did not respond';
    error = new ErrorResponce(message, 500);
  }

  if (err.name === 'TypeError') {
    const message = 'TypeError: Server did not respond';
    error = new ErrorResponce(message, 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error',
  });
};
