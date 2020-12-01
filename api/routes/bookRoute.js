const express = require('express');

const bookController = require('../controllers/bookController');
const {protect} = require('../controllers/authController');
const router = express.Router();


router
    .route('/')
    .get(protect,bookController.getAllBook)
    .post(protect,bookController.addBook);

router
    .route('/:id')
    .get(protect,bookController.getOneBook)
    .delete(protect,bookController.deleteOneBook)
    .patch(protect,bookController.updateBook);


module.exports = router;