const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

route('/').post(authController.register);