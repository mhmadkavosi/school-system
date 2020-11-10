const Class = require('../models/classModel');


exports.addClass = async(req, res, next) => {
    try {
        const doc = await Class.create(req.body);
        res.status(201).json({
            status: "success",
            Class: {
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

exports.getAllClass = async(req, res, next) => {
    try {
        const doc = await Class.find().populate('classTeacher classStudents classBook');

        if (!doc)
            return res.status(404).json({
                message: "There is no document yet",
            });
        res.status(200).json({
            status: "success",
            Class: {
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

exports.getOneClass = async(req, res, next) => {
    try {
        const doc = await Class.findById(req.params.id);

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

exports.updateClass = async(req, res, next) => {
    try {
        const doc = await Class.findByIdAndUpdate(req.params.id, req.body, {
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


