const ErrorRespons = require('./../utils/appError');
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
            return res.status(400).json({
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

        if (!doc) {
            return next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
        }

        res.status(200).json({
            status: "success",
            doc,
        });
        next();
    } catch (err) {
        next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
    }
};

exports.updateClass = async(req, res, next) => {
    try {
        const doc = await Class.findByIdAndUpdate(req.params.id, req.body, {
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


exports.deleteOneClass = async(req, res, next) => {
    try {
        const doc = await Class.findByIdAndDelete(req.params.id);

        if (!doc)
            return res.status(400).json({
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