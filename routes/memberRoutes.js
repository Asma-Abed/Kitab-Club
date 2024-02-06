const express = require('express');
const memberController = require('../controllers/memberController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get(
  '/getMyProfile',
  memberController.getMyProfile,
  memberController.getMember,
);

router.patch('/updateMyPassword', authController.updatePassword);

router.patch('/updateMyProfile', memberController.updateMyProfile);

router.delete('/deleteMyProfile', memberController.deleteMyProfile);

router
  .route('/')
  .get(memberController.getAllMembers)
  .post(memberController.createMember);

router
  .route('/:id')
  .get(memberController.getMember)
  .patch(authController.restrictTo('admin'), memberController.updateMember)
  .delete(authController.restrictTo('admin'), memberController.deleteMember);

module.exports = router;
