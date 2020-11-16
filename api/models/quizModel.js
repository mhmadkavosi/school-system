const mongoose = require('mongoose');
const slugify = require('slugify');

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    quizClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    quizQuestions: [{
        question: {
            type: String,
            required: [true, 'Question can not be empty'],
        },
        answers: [{
            text: {
                type: String,
                required: true,
                trim: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }],
        score: {
            type: String,
            required: [true, 'Question can not be with out score'],
        },

    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

// add slug for quiz
quizSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})


const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;