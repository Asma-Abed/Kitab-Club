const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Club = require('./../models/clubModel');
const Book = require('./../models/bookModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection is successful'));

// Read Json File
const clubs = JSON.parse(
  fs.readFileSync(`${__dirname}/clubs-test.json`, 'utf-8'),
);
const books = JSON.parse(
  fs.readFileSync(`${__dirname}/books-test.json`, 'utf-8'),
);

// Import data into database
const importData = async () => {
  try {
    await Club.create(clubs);
    await Book.create(books);

    console.log('data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Club.deleteMany();
    await Book.deleteMany();

    console.log('data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
