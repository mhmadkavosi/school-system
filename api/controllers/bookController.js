const Book = require('../models/bookModel');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");


// @desc    Add book
// @route   /api/v1/book POST
// @access  Privete {Admin}
exports.addBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.create(req.body);
    res.status(201).json({
        status: "success",
        Book: {
            doc,
        },
    });
});


// @desc    Get All book
// @route   /api/v1/book GET
// @access  private {Admin,Teacher}
exports.getAllBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.find();
    res.status(200).json({
        status: "success",
        Book: {
            doc,
        },
    });
});


// @desc    Get One book
// @route   /api/v1/book GET
// @access  private{Admin,Teacher,Student}
exports.getOneBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.findById(req.params.id);
    if (!doc) {
        return next(new ErrorRespons(`Book not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc,
    });
})


// @desc    Update Book
// @route   /api/v1/book PATCH
// @access  private{Admin}
exports.updateBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new ErrorResponse(`Book not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc
    });
})


// @desc    delete Book
// @route   /api/v1/book  DELETE
// @access  private{Admin}
exports.deleteOneBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new ErrorResponse(`Book not found with id of : ${req.params.id} `, 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
})