const Club = require('./../models/clubModel');

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({
      status: 'success',
      results: clubs.length,
      data: {
        clubs,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        club,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createClub = async (req, res) => {
  try {
    const newClub = await Club.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        club: newClub,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        club,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
