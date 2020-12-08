const mongoose = require('mongoose');
const slugify = require('slugify');

const quizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    quizClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
    quizTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    quizQuestions: [
      {
        question: {
          type: String,
          required: [true, 'Question can not be empty'],
        },
        answers: [
          {
            text: {
              type: String,
              required: true,
              trim: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        ],
        score: {
          type: String,
          required: [true, 'Question can not be with out score'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add slug for quiz
quizSchema.pre('save', function (next) {
  this.slug = slugify(this.quizName, { lower: true });
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
