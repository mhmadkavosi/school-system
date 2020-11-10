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

