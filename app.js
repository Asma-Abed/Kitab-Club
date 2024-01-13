const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const clubRouter = require('./routes/clubRoutes');
const bookRouter = require('./routes/bookRoutes');
const memberRouter = require('./routes/memberRoutes');
const AppError = require('./utils/appError');
const globalErroHandler = require('./controllers/errorController');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again in one hour',
});

app.use('/api', limiter);

app.use('/api/v1/clubs', clubRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/members', memberRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErroHandler);

module.exports = app;
