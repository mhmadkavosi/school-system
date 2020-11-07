const Question = require('./../models/questionModel');


exports.addQuestion = async (req, res, next) => {
    try {
        const doc = await Question.create(req.body);
        res.status(201).json({
            status: "success",
            question: {
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

exports.getAllQuestion = async (req, res, next) => {
  try {
    const doc = await Question.find();

    if (!doc)
      return res.status(404).json({
        message: "There is no document yet",
      });
    res.status(200).json({
      status: "success",
      question: {
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

exports.getOneQuestion = async (req, res, next) => {
  try {
    const doc = await Question.findById(req.params.id);

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

exports.deleteOneQuestion = async (req, res, next) => {
  try {
    const doc = await Question.findByIdAndDelete(req.params.id);

    if (!doc)
      return res.status(404).json({
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
