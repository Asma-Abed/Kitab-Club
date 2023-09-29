const jwt = require('jsonwebtoken');
const Member = require('../models/memberModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newMember = await Member.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newMember._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newMember,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError('Please provide your email and your passowrd!', 400),
    );
  }

  const member = await Member.findOne({ email }).select('+password');

  if (!member || !(await member.comparePassword(password, member.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  const token = signToken(member._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
