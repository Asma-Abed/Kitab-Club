const mongoose = require('mongoose');
const validator = require('validator');

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

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
