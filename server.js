const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection is successful'));

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
