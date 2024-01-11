const AppError = require('../utils/appError');

const handleCastErr = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicatedFields = (err) => {
  return new AppError(
    `This is a duplicate field value ${err.keyValue.name}. Please use another value!`,
    400,
  );
};

const handleValidationErr = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data! ${errors.join(', ')}`, 400);
};

const handleJwtError = () =>
  new AppError('Invalid token! Please log in again.', 401);

const handleJwtExpired = () =>
  new AppError('Token has expired! Please log in again.', 401);

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrProd = (err, res) => {
  if ((err.isOperational = true)) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErr(error);
    if (err.code === 11000) error = handleDuplicatedFields(error);
    if (err.name === 'ValidationError') error = handleValidationErr(error);
    if (err.name === 'JsonWebTokenError') error = handleJwtError();
    if (err.name === 'TokenExpiredError') error = handleJwtExpired();
    sendErrProd(error, res);
  }
};
