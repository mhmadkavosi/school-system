const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();


router
    .route('/')
    .get(bookController.getAllBook)
    .post(bookController.addBook);

// router
//     .route('/:id')
//     .get(bookController.getOnebook)
//     .delete(bookController.deleteOnebook)
//     .patch(bookController.updatebook);


module.exports = router;