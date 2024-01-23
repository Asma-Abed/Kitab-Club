const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/clubs', viewsController.getClubs);
router.get('/club', viewsController.getClub);

module.exports = router;
