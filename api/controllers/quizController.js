const Quiz = require("../models/quizModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.addQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.create(req.body);
    res.status(201).json({
        status: "success",
        Quiz: {
            doc,
        },
    });
    next();
});

exports.getAllQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.find();
    res.status(200).json({
        status: "success",
        Quiz: {
            doc,
        },
    });
    next();
});

exports.getOneQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.findById(req.params.id);
    if (!doc) {
        return next(new ErrorResponse(`Quiz not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc,
    });
});

exports.updateQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new ErrorResponse(`Quiz not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc
    });
})


exports.deleteOneQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new ErrorResponse(`Quiz not found with id of : ${req.params.id} `, 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});