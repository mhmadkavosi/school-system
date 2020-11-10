const Student = require('../models/studentModel');


exports.addStudent = async(req, res, next) => {
    try {
        const doc = await Student.create(req.body);
        res.status(201).json({
            status: "success",
            Student: {
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
