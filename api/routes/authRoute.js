const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/me').get(authController.protect, authController.getMe);
router.route('/forgotpassword').post(authController.forgotPassword);
router.route('/resetPassword/:resetToken').put(authController.resetPassword);
module.exports = router;
