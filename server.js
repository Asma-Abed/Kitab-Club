const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught exception! Shutting down!');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection is successful'));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log('Unhandled rejection! Shutting down!');
  server.close(() => {
    process.exit(1);
  });
});
