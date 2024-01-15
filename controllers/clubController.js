const AppError = require('../utils/appError');
const Club = require('./../models/clubModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllClubs = catchAsync(async (req, res, next) => {
  const clubs = await Club.find();
  res.status(200).json({
    status: 'success',
    results: clubs.length,
    data: {
      clubs,
    },
  });
});

exports.getClub = catchAsync(async (req, res, next) => {
  const club = await Club.findById(req.params.id).populate('reviews');

  if (!club) {
    return next(new AppError('No club found for this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      club,
    },
  });
});

exports.createClub = catchAsync(async (req, res, next) => {
  const newClub = await Club.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      club: newClub,
    },
  });
});

exports.updateClub = catchAsync(async (req, res, next) => {
  const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!club) {
    return next(new AppError('No club found for this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      club,
    },
  });
});

exports.deleteClub = catchAsync(async (req, res, next) => {
  const club = await Club.findByIdAndDelete(req.params.id);

  if (!club) {
    return next(new AppError('No club found for this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
