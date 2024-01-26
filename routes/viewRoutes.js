const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/clubs', viewsController.getClubs);
router.get('/books', viewsController.getBooks);
router.get('/clubs/:slug', viewsController.getClub);

module.exports = router;
