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
  .patch(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
