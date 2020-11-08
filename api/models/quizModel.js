const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    quizClass: String, // TODO make a refrence to class model 
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

    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
});




const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;