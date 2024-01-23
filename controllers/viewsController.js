const Club = require('./../models/clubModel');
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

exports.getClub = (req, res) => {
  res.status(200).render('club', {
    title: 'Club Page',
  });
};
