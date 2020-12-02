const express = require('express');

const quizController = require('../controllers/quizController');

const {protect , authorize} = require('../controllers/authController');

// Merge paras for quiz of a class => /api/v1/class/quizId/quiz
const router = express.Router({ mergeParams: true });


router
    .route('/')
    .get(protect,authorize('admin'),quizController.getAllQuiz)
    .post(protect,authorize('admin','teacher'),quizController.addQuiz);

router
    .route('/:id')
    .get(protect,quizController.getOneQuiz)
    .delete(protect,authorize('admin','teacher'),quizController.deleteOneQuiz)
    .patch(protect,authorize('admin','teacher'),quizController.updateQuiz);


module.exports = router;