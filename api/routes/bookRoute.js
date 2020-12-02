const express = require('express');

const bookController = require('../controllers/bookController');
const {protect ,authorize} = require('../controllers/authController');
const router = express.Router();


router
    .route('/')
    .get(protect,authorize('admin','teacher'),bookController.getAllBook)
    .post(protect,authorize('admin','teacher'),bookController.addBook);

router
    .route('/:id')
    .get(protect,bookController.getOneBook)
    .delete(protect,authorize('admin'),bookController.deleteOneBook)
    .patch(protect,authorize('admin','teacher'),bookController.updateBook);


module.exports = router;