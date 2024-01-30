const mongoose = require('mongoose');
const Club = require('./clubModel');

const reviewSchema = new mongoose.Schema(
  {
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

reviewSchema.index({ club: 1, member: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'member',
    select: 'name photo job slug',
  });
  next();
});

reviewSchema.statics.calcAvrRating = async function (clubId) {
  const stats = await this.aggregate([
    {
      $match: { club: clubId },
    },
    {
      $group: {
        _id: '$club',
        numRatings: { $sum: 1 },
        avrRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Club.findByIdAndUpdate(clubId, {
      rating: stats[0].avrRating,
      ratingsNumber: stats[0].numRatings,
    });
  } else {
    await Club.findByIdAndUpdate(clubId, {
      rating: 4.5,
      ratingsNumber: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAvrRating(this.club);
});

reviewSchema.post(/^findOneAnd/, async (rev) => {
  if (rev) await rev.constructor.calcAvrRating(rev.club);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
