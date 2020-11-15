const express = require('express');

const classController = require('../controllers/classController');

const router = express.Router();

// TODO : get student for class /studentId/class : 7 video of api master class

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