const { promisify } = require('util');
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
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
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
    return next(new AppError('Please provide your email and passowrd!', 400));
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

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currenMember = await Member.findById(decoded.id);

  if (!currenMember) {
    return next(
      new AppError('The member belonging to this token no longer exist!', 401),
    );
  }

  if (currenMember.changedPasswordTime(decoded.iat)) {
    return next(
      new AppError('Password was recently changed! Please log in again.', 401),
    );
  }
  req.member = currenMember;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.member.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403),
      );
    }
    next();
  };
};
