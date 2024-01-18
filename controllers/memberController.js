const Member = require('../models/memberModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handler = require('./handlerController');

const filterObject = (obj, ...fields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

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

exports.deleteMyProfile = catchAsync(async (req, res, next) => {
  await Member.findByIdAndUpdate(req.member.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllMembers = handler.getAll(Member);

exports.getMember = handler.getDoc(Member, 'member');

exports.createMember = handler.createDoc(Member);

exports.updateMember = handler.updateDoc(Member, 'member');

exports.deleteMember = handler.deleteDoc(Member, 'member');
