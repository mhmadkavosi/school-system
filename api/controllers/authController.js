const ErrorRespons = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');

// @desc Register User 
// @route   /api/v1/auth/register POST
// @access public

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create User in database 
    const user = await User.create({
        name, email, password, role
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({ success: true , token });
})