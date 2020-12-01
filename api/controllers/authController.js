const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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
    sendTokenResponse(user, 201, res);
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
    sendTokenResponse(user, 200, res);
});


// Get token from modle , create cookie and send response 

const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly :true
    }

    if (process.env.NODE_ENV==='production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}

// Protect routes 

exports.protect = asyncHandler(async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }


    // make sure token is exists

    if (!token) {
        return next(new ErrorResponse('Not Authorize to access this route', 401));
    }

    try {
        // Veryfiy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return next(new ErrorResponse('Not Authorize to access this route', 401));
    }
});

// @desc Get current logged in user
// @route GET /api/v1/auth/me
// @access Privete
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, data: user });
})


// Grant access to specific roles 
exports.authorize = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new ErrorResponse(
                `User role '${req.user.role}' is not authorized to access this route`
                , 403));
        }
        next();
    }
}