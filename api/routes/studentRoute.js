const express = require('express');

const studentController = require('../controllers/studentController');

const router = express.Router();


router
    .route('/')
    .get(studentController.getAllStudent)
    .post(studentController.addStudent);

// router
//     .route('/:id')
//     .get(studentController.getOnestudent)
//     .delete(studentController.deleteOnestudent)
//     .patch(studentController.updatestudent);


module.exports = router;