const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(
    authController.restrictTo('admin', 'manager'),
    bookController.createBook,
  );

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(
    authController.restrictTo('admin', 'manager'),
    bookController.updateBook,
  )
  .delete(
    authController.restrictTo('admin', 'manager'),
    bookController.deleteBook,
  );

module.exports = router;
