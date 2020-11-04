const express = require('express');

const questionController = require('./../controllers/questionController');

const router = express.Router();


router.route('/').post(questionController.addQuestion);



module.exports = router;