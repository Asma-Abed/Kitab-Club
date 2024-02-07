const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);
router.get('/clubs', viewsController.getClubs);
router.get('/books', viewsController.getBooks);
router.get('/clubs/:slug', viewsController.getClub);
router.get('/books/:slug', viewsController.getBook);
router.get('/members/:slug', viewsController.getMember);

router.get(
  '/myProfile',
  authController.protect,
  viewsController.getMyProfile,
  viewsController.getMember,
);
router.get('/updateMyProfile', viewsController.updateMyProfile);

router.get('/login', viewsController.login);
router.get('/register', viewsController.signup);

module.exports = router;
