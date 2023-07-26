const AppError = require('../utils/appError');
const Book = require('./../models/bookModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find(req.query);
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError('No book found for this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newbook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      club: newbook,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new AppError('No book found for this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError('No book found for this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
