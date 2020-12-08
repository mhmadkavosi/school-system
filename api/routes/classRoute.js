const express = require('express');

const classController = require('../controllers/classController');
const { protect, authorize } = require('../controllers/authController');
// include Other resource
const quizRoute = require('./quizRoute');

const router = express.Router();

// use global Middleware for router for get quiz of one class => /api/v1/class/classId/quiz

router.use('/:classId/quiz', protect, authorize('admin', 'teacher'), quizRoute);

router
  .route('/')
  .get(protect, authorize('admin'), classController.getAllClass)
  .post(protect, authorize('admin'), classController.addClass);

router
  .route('/:id')
  .get(protect, classController.getOneClass)
  .delete(protect, authorize('admin'), classController.deleteOneClass)
  .patch(protect, authorize('admin', 'teacher'), classController.updateClass);

module.exports = router;
