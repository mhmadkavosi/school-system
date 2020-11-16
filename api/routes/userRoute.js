const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();


router
    .route('/')
    .get(UserController.getAllUser)
    .post(UserController.addUser);

// router
//     .route('/:id')
//     .get(UserController.getOneUser)
//     .delete(UserController.deleteOneUser)
//     .patch(UserController.updateUser);


module.exports = router;