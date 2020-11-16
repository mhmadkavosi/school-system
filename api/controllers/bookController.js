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
});

exports.geOneBook = asyncHandler(async(req, res, next) => {
    const doc = await Book.findById(req.params.id);
    if (!doc) {
        return next(new ErrorRespons(`Book not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc,
    });
})

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