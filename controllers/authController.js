const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Member = require('../models/memberModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (member, statusCode, res) => {
  const token = signToken(member._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  member.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      member,
    },
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

  createAndSendToken(newMember, 201, res);
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

  createAndSendToken(member, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      const currenMember = await Member.findById(decoded.id);

      if (!currenMember) {
        return next();
      }

      if (currenMember.changedPasswordTime(decoded.iat)) {
        return next();
      }
      res.locals.member = currenMember;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const member = await Member.findOne({ email: req.body.email });

  if (!member) {
    return next(
      new AppError('There is no member with this email address!', 404),
    );
  }

  const resetToken = member.createPasswordResetToken();
  await member.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/members/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a request with your new password and password confirm to this link: ${resetUrl}.\nIf you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: member.email,
      subject: 'Your password reset token (valide for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    console.log(err);

    member.passwordResetToken = undefined;
    member.passwordResetExpires = undefined;

    await member.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email! Please try again later.',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const member = await Member.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!member) {
    return next(new AppError('Token is invalid or has expired!', 400));
  }

  member.password = req.body.password;
  member.confirmPassword = req.body.confirmPassword;
  member.passwordResetToken = undefined;
  member.passwordResetExpires = undefined;

  await member.save();

  createAndSendToken(member, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.member.id).select('+password');

  if (
    !(await member.comparePassword(req.body.currentPassword, member.password))
  ) {
    return next(new AppError('Your current password is incorrect!', 401));
  }

  member.password = req.body.password;
  member.confirmPassword = req.body.confirmPassword;

  await member.save();

  createAndSendToken(member, 200, res);
});
