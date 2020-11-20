const express = require('express');

const quizController = require('../controllers/quizController');

// Merge paras for quiz of a class => /api/v1/class/quizId/quiz
const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(quizController.getAllQuiz)
    .post(quizController.addQuiz);

router
    .route('/:id')
    .get(quizController.getOneQuiz)
    .delete(quizController.deleteOneQuiz)
    .patch(quizController.updateQuiz);


module.exports = router;