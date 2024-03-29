const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/myProfile',
  authController.protect,
  viewsController.getMyProfile,
  viewsController.getMember,
);
router.get(
  '/updateMyProfile',
  authController.protect,
  viewsController.updateMyProfile,
);

// router.get(
//   '/updateAndSubmitProfile',
//   authController.protect,
//   viewsController.updateAndSubmitProfile,
// );

router.get(
  '/clubs/:slug/update',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  viewsController.updateClub,
);

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);
router.get('/clubs', viewsController.getClubs);
router.get('/books', viewsController.getBooks);
router.get('/clubs/:slug', viewsController.getClub);
router.get('/books/:slug', viewsController.getBook);
router.get('/members/:slug', viewsController.getMember);

router.get('/login', viewsController.login);
router.get('/logout', viewsController.logout);
router.get('/register', viewsController.signup);

module.exports = router;
