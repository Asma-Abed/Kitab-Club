const express = require('express');
const clubController = require('./../controllers/clubController');
const authController = require('./../controllers/authController');

const router = express.Router();

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
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    clubController.deleteClub,
  );

module.exports = router;
