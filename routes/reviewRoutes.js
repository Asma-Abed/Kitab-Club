const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('member'),
    reviewController.setClubMemberId,
    reviewController.createReview,
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'member'),
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'member'),
    reviewController.deleteReview,
  );

module.exports = router;
