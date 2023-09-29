const Member = require('../models/memberModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.find();
  res.status(200).json({
    status: 'success',
    results: members.length,
    data: {
      members,
    },
  });
});
exports.getMember = (req, res) => {
  res.status(200).json({
    message: 'Not defined yet!',
  });
};
exports.createMember = (req, res) => {
  res.status(200).json({
    message: 'Not defined yet!',
  });
};
exports.updateMember = (req, res) => {
  res.status(200).json({
    message: 'Not defined yet!',
  });
};
exports.deleteMember = (req, res) => {
  res.status(200).json({
    message: 'Not defined yet!',
  });
};
