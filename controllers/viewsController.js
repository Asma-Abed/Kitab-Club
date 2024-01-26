const Club = require('./../models/clubModel');
const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');

exports.getHome = (req, res) => {
  res.status(200).render('home');
};

exports.getClubs = catchAsync(async (req, res) => {
  const clubs = await Club.find();
  res.status(200).render('clubs', {
    title: 'Our Clubs',
    clubs,
  });
});

exports.getClub = catchAsync(async (req, res, next) => {
  const club = await Club.findOne({ slug: req.params.slug }).populate({
    path: 'manager reviews books',
    fields: 'name photo title review rating',
  });

  res.status(200).render('club', {
    title: club.name,
    club,
  });
});

exports.getBooks = catchAsync(async (req, res) => {
  const books = await Book.find();

  res.status(200).render('books', {
    title: 'All Books',
    books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug }).populate({
    path: 'club',
    fields: 'name',
  });

  res.status(200).render('book', {
    title: book.title,
    book,
  });
});
