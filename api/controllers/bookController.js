const Book = require('../models/bookModel');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");


exports.addBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.create(req.body);
    res.status(201).json({
        status: "success",
        Book: {
            doc,
        },
    });
});

exports.getAllBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.find();
    res.status(200).json({
        status: "success",
        Book: {
            doc,
        },
    });
    next();

});