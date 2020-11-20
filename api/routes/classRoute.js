const express = require('express');

const classController = require('../controllers/classController');

// include Other resource
const quizRoute = require('./quizRoute');

const router = express.Router();

// use global Middleware for router for get quiz of one class => /api/v1/class/classId/quiz

router.use('/:classId/quiz', quizRoute);

router
    .route('/')
    .get(classController.getAllClass)
    .post(classController.addClass);

router
    .route('/:id')
    .get(classController.getOneClass)
    .delete(classController.deleteOneClass)
    .patch(classController.updateClass);


module.exports = router;