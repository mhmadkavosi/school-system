const express = require('express');

const classController = require('../controllers/classController');
const {protect} = require('../controllers/authController');
// include Other resource
const quizRoute = require('./quizRoute');

const router = express.Router();

// use global Middleware for router for get quiz of one class => /api/v1/class/classId/quiz

router.use('/:classId/quiz', quizRoute);

router
    .route('/')
    .get(protect,classController.getAllClass)
    .post(protect,classController.addClass);

router
    .route('/:id')
    .get(protect,classController.getOneClass)
    .delete(protect,classController.deleteOneClass)
    .patch(protect,classController.updateClass);


module.exports = router;