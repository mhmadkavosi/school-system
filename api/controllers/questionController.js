const Question = require('./../models/questionModel');


exports.addQuestion = async (req, res, next) => {
    try {
        const doc = await Question.create(req.body);
        res.status(201).json({
            status: "success",
            question: {
                doc
            }
        });
    } catch (error) {
        res.status(500).json({ error });
    }
    next();
}