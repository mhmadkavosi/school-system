const express = require('express');

const bookController = require('../controllers/bookController');
const { protect, authorize } = require('../controllers/authController');

const router = express.Router();
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'teacher'), bookController.getBooks)
  .post(authorize('teacher'), bookController.addBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .delete(authorize('admin'), bookController.deleteBook)
  .patch(authorize('admin'), bookController.updateBook);

module.exports = router;
