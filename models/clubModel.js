const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Clubs must have a name!'],
      unique: true,
    },
    quote: {
      type: String,
      required: [true, 'Clubs must have a quote!'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Clubs must have an image!'],
    },
    imagePage: {
      type: String,
      required: [true, 'Clubs must have a page image!'],
    },
    description: {
      type: String,
      required: [true, 'Clubs must have a description!'],
      trim: true,
    },
    booksNumber: {
      type: Number,
      required: [true, 'Clubs must have a books number!'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must be above 1.0'],
      max: [5, 'A rating must be above 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsNumber: { type: Number, default: 0 },
    time: {
      type: Number,
      required: [true, 'Clubs must have a reading time!'],
    },
    benefits: {
      type: [String],
      required: [true, 'Clubs must have benefits!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: 'Member',
    },
    books: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

clubSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'club',
  localField: '_id',
});

// clubSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'manager',
//     select: 'name photo',
//   });
//   next();
// });

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
