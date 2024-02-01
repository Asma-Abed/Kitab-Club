const Club = require('./../models/clubModel');
const Book = require('./../models/bookModel');
const Member = require('./../models/memberModel');
const catchAsync = require('./../utils/catchAsync');

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
  res
    .status(200)
    .set('Content-Security-Policy', "connect-src 'self' http://127.0.0.1:3000/")
    .render('login');
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('register');
});
