const Member = require('../models/memberModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newMember = await Member.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newMember,
    },
  });
});
