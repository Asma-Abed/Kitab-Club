const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  photo: String,
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  job: String,
  manager: {
    type: Boolean,
    default: false,
  },
  bio: String,
  social: [String],
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
});

memberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

memberSchema.methods.comparePassword = async function (
  enteredPassword,
  memberPassword,
) {
  return await bcrypt.compare(enteredPassword, memberPassword);
};

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
