const express = require('express');
const clubController = require('./../controllers/clubController');
const authController = require('./../controllers/authController');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:clubId/reviews', reviewRouter);

router
  .route('/')
  .get(authController.protect, clubController.getAllClubs)
  .post(clubController.createClub);

router
  .route('/:id')
  .get(clubController.getClub)
  .patch(
    authController.protect,
    authController.restrictTo('manager', 'admin'),
    clubController.updateClub,
  )
  .delete(authController.protect, clubController.deleteClub);

module.exports = router;
