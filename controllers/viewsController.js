const Club = require('./../models/clubModel');
const Book = require('./../models/bookModel');
const Member = require('./../models/memberModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getHome = catchAsync(async (req, res) => {
  const clubs = await Club.find();
  res.status(200).render('home', {
    clubs,
  });
});

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

  if (!club) {
    return next(new AppError('There is no club with this name!', 404));
  }

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

  if (!book) {
    return next(new AppError('There is no book with this name!', 404));
  }

  res.status(200).render('book', {
    title: book.title,
    book,
  });
});

exports.getMyProfile = (req, res, next) => {
  req.params.slug = req.member.slug;
  next();
};

exports.getMember = catchAsync(async (req, res, next) => {
  const member = await Member.findOne({ slug: req.params.slug }).populate({
    path: 'clubs',
    fields: 'name image',
  });

  res.status(200).render('member', {
    title: member.name,
    member,
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  res.status(200).render('account');
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(200);
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('register');
});
