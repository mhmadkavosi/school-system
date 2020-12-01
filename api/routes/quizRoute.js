const express = require('express');

const quizController = require('../controllers/quizController');

const {protect} = require('../controllers/authController');

// Merge paras for quiz of a class => /api/v1/class/quizId/quiz
const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(protect,quizController.getAllQuiz)
    .post(protect,quizController.addQuiz);

router
    .route('/:id')
    .get(protect,quizController.getOneQuiz)
    .delete(protect,quizController.deleteOneQuiz)
    .patch(protect,quizController.updateQuiz);


module.exports = router;