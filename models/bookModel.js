const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A book must have a title!'],
    unique: true,
  },
  quote: {
    type: String,
    required: [true, 'A book must have a quote!'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'A book must have an image!'],
  },
  description: {
    type: String,
    required: [true, 'A book must have a description!'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'A book must have an author!'],
  },
  readingTime: {
    type: Number,
    required: [true, 'A book must have a reading time!'],
  },
  pageCount: {
    type: Number,
    required: [true, 'A book must have page count!'],
  },
  originallyPublished: {
    type: Number,
    required: [true, 'A book must have a publishing date!'],
  },
  ideas: {
    type: [String],
    required: [true, 'A book must have ideas!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  club: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
