const Review = require('../models/reviewModel');
const handler = require('./handlerController');

exports.setClubMemberId = (req, res, next) => {
  if (!req.body.club) req.body.club = req.params.clubId;
  if (!req.body.member) req.body.member = req.member.id;
  next();
};

exports.getAllReviews = handler.getAll(Review);

exports.getReview = handler.getDoc(Review, 'review');

exports.createReview = handler.createDoc(Review);

exports.updateReview = handler.updateDoc(Review, 'review');

exports.deleteReview = handler.deleteDoc(Review, 'review');
