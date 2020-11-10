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
