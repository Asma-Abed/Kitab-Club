const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.clubId) filter = { club: req.params.clubId };

    const doc = await Model.find(filter);
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getDoc = (Model, model, populated) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populated) query = query.populate(populated);

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${model} found for this ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateDoc = (Model, model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${model} found for this ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteDoc = (Model, model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${model} found for this ID`, 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
