const express = require('express');
const memberController = require('../controllers/memberController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.patch(
  '/updateMyProfile',
  authController.protect,
  memberController.updateMyProfile,
);

router.delete(
  '/deleteMyProfile',
  authController.protect,
  memberController.deleteMyProfile,
);

router
  .route('/')
  .get(memberController.getAllMembers)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    memberController.createMember,
  );

router
  .route('/:id')
  .get(memberController.getMember)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    memberController.updateMember,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    memberController.deleteMember,
  );

module.exports = router;
