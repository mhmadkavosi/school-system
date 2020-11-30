const ErrorRespons = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');

// @desc Register User 
// @route   /api/v1/auth/register
// @access public

exports.register = asyncHandler(async (req, res, next) => {
    res.status(201).json({ success: true });
})