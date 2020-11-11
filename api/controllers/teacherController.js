const Teacher = require('../models/teacherModel');


exports.addTeacher = async(req, res, next) => {
    try {
        const doc = await Teacher.create(req.body);
        res.status(201).json({
            status: "success",
            Teacher: {
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


exports.getAllTeacher = async(req, res, next) => {
    try {
        const doc = await Teacher.find();

        if (!doc)
            return res.status(400).json({
                status: "fail",
            });
        res.status(200).json({
            status: "success",
            Teacher: {
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