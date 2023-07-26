const express = require('express');
const morgan = require('morgan');

const clubRouter = require('./routes/clubRoutes');
const bookRouter = require('./routes/bookRoutes');
const memberRouter = require('./routes/memberRoutes');
const AppError = require('./utils/appError');
const globalErroHandler = require('./controllers/errorController');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/clubs', clubRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/members', memberRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErroHandler);

module.exports = app;
