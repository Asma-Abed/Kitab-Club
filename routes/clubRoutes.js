const express = require('express');
const clubController = require('./../controllers/clubController');

const router = express.Router();

router.param('id', clubController.checkId);

router
  .route('/')
  .get(clubController.getAllClubs)
  .post(clubController.createClub);

router
  .route('/:id')
  .get(clubController.getClub)
  .patch(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
