const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/me').get(authController.protect, authController.getMe);
router
  .route('/updatedetails')
  .put(authController.protect, authController.updateDetails);
router
  .route('/updatepassword')
  .put(authController.protect, authController.updatePassword);

router.route('/forgotpassword').post(authController.forgotPassword);
router.route('/resetpassword/:resetToken').put(authController.resetPassword);
module.exports = router;
