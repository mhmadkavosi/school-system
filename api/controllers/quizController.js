const Quiz = require("../models/quizModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addQuiz = catchAsync(async(req, res, next) => {
    const doc = await Quiz.create(req.body);
    res.status(201).json({
        status: "success",
        Quiz: {
            doc,
        },
    });
    next();
});

exports.getAllQuiz = catchAsync(async(req, res, next) => {
    const doc = await Quiz.find();
    res.status(200).json({
        status: "success",
        Quiz: {
            doc,
        },
    });
    next();
});

exports.getOneQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.findById(req.params.id);

        if (!doc) {
            return res.status(400).json({
                status: "flase"
            })
        }

        res.status(200).json({
            status: "success",
            doc,
        });
        next();
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Some Thing went wrong",
            error,
        });
    }
};

exports.updateQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return res.status(400).json({
                status: "flase"
            })
        }
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "some Thing went wrong",
            error
        })
    }
}


exports.deleteOneQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.findByIdAndDelete(req.params.id);

        if (!doc)
            return res.status(400).json({
                status: "fail",
            });

        res.status(204).json({
            status: "success",
            data: null,
        });
        next();
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Some Thing went wrong",
            error,
        });
    }
};