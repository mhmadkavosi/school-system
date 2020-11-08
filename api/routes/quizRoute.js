const express = require('express');

const quizController = require('../controllers/quizController');

const router = express.Router();


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