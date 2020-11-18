const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const errorResponse = require('../utils/errorResponse');

exports.addUser = asyncHandler(async(req, res, next) => {
    const doc = await User.create(req.body);
    res.status(201).json({
        status: "success",
        User: {
            doc,
        },
    });
});


exports.getAllUser = asyncHandler(async(req, res, next) => {
    const doc = await User.find();
    res.status(200).json({
        status: "success",
        count: doc.length,
        Useres: {
            doc,
        },
    });
});