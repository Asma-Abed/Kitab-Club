const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'A review can not be empty!'],
  },
  rating: {
    type: Number,
    required: [true, 'A review must have a rating!'],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  club: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club',
  },
  member: {
    type: mongoose.Schema.ObjectId,
    ref: 'Member',
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
