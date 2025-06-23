const AppError = require('../utils/error');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred.',
  });
}

module.exports = errorHandler;