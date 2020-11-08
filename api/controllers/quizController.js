const Quiz = require("../models/quizModel");

exports.addQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.create(req.body);
        res.status(201).json({
            status: "success",
            Quiz: {
                doc,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Some Thing went wrong",
            error,
        });
    }
    next();
};

exports.getAllQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.find();

        if (!doc)
            return res.status(404).json({
                message: "There is no document yet",
            });
        res.status(200).json({
            status: "success",
            Quiz: {
                doc,
            },
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

exports.getOneQuiz = async(req, res, next) => {
    try {
        const doc = await Quiz.findById(req.params.id);

        // TODO send 404 error

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
            return res.status(404).json({
                status: "fail",
                message: "There is no document with that ID",
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