const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();


router
    .route('/')
    .get(bookController.getAllBook)
    .post(bookController.addBook);

router
    .route('/:id')
    .get(bookController.getOneBook)
    .delete(bookController.deleteOneBook)
    .patch(bookController.updateBook);


module.exports = router;