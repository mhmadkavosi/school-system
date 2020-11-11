const Book = require('../models/bookModel');


exports.addBook = async(req, res, next) => {
    try {
        const doc = await Book.create(req.body);
        res.status(201).json({
            status: "success",
            Book: {
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

exports.getAllBook = async(req, res, next) => {
    try {
        const doc = await Book.find();

        if (!doc)
            return res.status(400).json({
                status: "fail"
            });
        res.status(200).json({
            status: "success",
            Book: {
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