const Member = require('../models/memberModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObject = (obj, ...fields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

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

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400,
      ),
    );
  }

  const filteredBody = filterObject(req.body, 'name', 'email', 'job', 'bio');
  const updatedMemeber = await Member.findByIdAndUpdate(
    req.member.id,
    filteredBody,
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: 'success',
    data: {
      member: updatedMemeber,
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
