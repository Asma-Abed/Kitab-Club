const { Error } = require('mongoose');
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

const sendErrDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  console.log('Error:', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    message: err.message,
  });
};

const sendErrProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if ((err.isOperational = true)) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log('Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
  if ((err.isOperational = true)) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message: err.message,
    });
  }
  console.log('Error:', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    message: 'Please try again later!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = handleCastErr(error);
    if (err.code === 11000) error = handleDuplicatedFields(error);
    if (err.name === 'ValidationError') error = handleValidationErr(error);
    if (err.name === 'JsonWebTokenError') error = handleJwtError();
    if (err.name === 'TokenExpiredError') error = handleJwtExpired();
    sendErrProd(error, req, res);
  }
};
