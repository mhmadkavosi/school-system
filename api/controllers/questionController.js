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
        });
    } catch (error) {
        res.status(500).json({ error });
    }
    next();
}