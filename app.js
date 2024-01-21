const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const clubRouter = require('./routes/clubRoutes');
const bookRouter = require('./routes/bookRoutes');
const memberRouter = require('./routes/memberRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErroHandler = require('./controllers/errorController');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP! Please try again in one hour',
});

app.use('/api', limiter);

app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/v1/clubs', clubRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/members', memberRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErroHandler);

module.exports = app;
