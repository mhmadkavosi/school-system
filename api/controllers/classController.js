const ErrorRespons = require('./../utils/errorResponse');
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
    } catch (err) {
        next(err);
    }
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
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
    }
};

exports.updateClass = async(req, res, next) => {
    try {
        const doc = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
        }
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        next(err);
    }
}


exports.deleteOneClass = async(req, res, next) => {
    try {
        const doc = await Class.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
        next();
    } catch (err) {
        next(err);
    }
};