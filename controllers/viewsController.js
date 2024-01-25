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
