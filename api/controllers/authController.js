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


exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password 
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches 
    const isMatch = user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Create token

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});