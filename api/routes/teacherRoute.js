const express = require('express');

const teacherController = require('../controllers/teacherController');

const router = express.Router();


router
    .route('/')
    .get(teacherController.getAllTeacher)
    .post(teacherController.addTeacher);

// router
//     .route('/:id')
//     .get(teacherController.getOneteacher)
//     .delete(teacherController.deleteOneteacher)
//     .patch(teacherController.updateteacher);


module.exports = router;