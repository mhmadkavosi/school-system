const ErrorRespons = require('./../utils/errorResponse');
const asyncHandler = require('./../utils/asyncHandler');
const Class = require('../models/classModel');



// @desc    add class
// @route   /api/v1/class  POST
// @access  private{Admin}
exports.addClass = asyncHandler(async(req, res, next) => {
    const doc = await Class.create(req.body);
    res.status(201).json({
        status: "success",
        Class: {
            doc,
        },
    });
});


// @desc    Get all class
// @route   /api/v1/class  get
// @access  private{Admin}
exports.getAllClass = asyncHandler(async(req, res, next) => {
    const doc = await Class.find().populate({
        path: 'classBook classTeacher classStudents',
        select: 'bookName fristName lastName gender phoneNumber'
    });
    res.status(200).json({
        status: "success",
        count: doc.length,
        Classes: {
            doc,
        },
    });
});


// @desc    get class
// @route   /api/v1/class/id GET
// @access  private{Admin,Teacher,Student}
exports.getOneClass = asyncHandler(async(req, res, next) => {
    const doc = await Class.findById(req.params.id).populate({
        path: 'classBook classTeacher classStudents',
        select: 'bookName fristName lastName gender fatherName phoneNumber nationalCode images'
    });
    if (!doc) {
        return next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
    }
    res.status(200).json({
        status: "success",
        doc,
    });

});


// @desc    update class
// @route   /api/v1/class/id  PATCH
// @access  private{Admin,Teacher}
exports.updateClass = asyncHandler(async (req, res, next) => {
    req.body.classTeacher = req.user.id;
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
})



// @desc    delete class
// @route   /api/v1/class/id  DELETE
// @access  private{Admin}
exports.deleteOneClass = asyncHandler(async(req, res, next) => {
    const doc = await Class.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new ErrorRespons(`Class not found with id of : ${req.params.id} `, 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});