const catchAsync = require('../utils/catchAsync');
const Book = require('./../models/bookModel');

exports.getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find(req.query);
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const newbook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      club: newbook,
    },
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
