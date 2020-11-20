const Quiz = require("../models/quizModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Add Quiz for class 
// @route   /api/v1/quiz POST
// @access  Privete{Admin,Teacher}
exports.addQuiz = asyncHandler(async(req, res, next) => {
    const doc = await Quiz.create(req.body);
    res.status(201).json({
        status: "success",
        Quiz: {
            doc,
        },
    });
});


// @desc    Get all quizes  
// @route   /api/v1/quiz  /api/v1/class/classId/quiz GET
// @access  Privete{Admin,Teacher,Student}
exports.getAllQuiz = asyncHandler(async(req, res, next) => {
    let query;

    if (req.params.classId) {
        query = Quiz.find({ quizClass: req.params.classid });
    } else {
        query = Quiz.find();
    }

    const doc = await query;
    // const doc = await Quiz.find();
    res.status(200).json({
        status: "success",
        count: doc.length,
        Quiz: {
            doc,
        },
    });
});

// @desc    Get One quiz
// @route   /api/v1/quiz/quizId
// @access  Privete{Admin,Teacher,Student}
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


// @desc    Update quiz
// @route   /api/v1/quiz/id Patch
// @access  Privete{Admin,Teacher}
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


// @desc    Delete quiz
// @route   /api/v1/quiz/id Delete
// @access  Privete{Admin,Teacher}
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