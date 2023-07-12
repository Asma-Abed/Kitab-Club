const express = require('express');
const morgan = require('morgan');

const clubRouter = require('./routes/clubRoutes');
const bookRouter = require('./routes/bookRoutes');
const memberRouter = require('./routes/memberRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/clubs', clubRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/members', memberRouter);

module.exports = app;
