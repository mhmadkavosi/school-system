const express = require('express');

const questionController = require('./../controllers/questionController');

const router = express.Router();


router.route('/').get(questionController.getAllQuestion).post(questionController.addQuestion);

router.route('/:id').get(questionController.getOneQuestion).delete(questionController.deleteOneQuestion);


module.exports = router;