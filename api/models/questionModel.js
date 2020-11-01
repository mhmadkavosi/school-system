const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question can not be empty'],
        minlength: [80, 'Qestion can not be lower than 80 char'],
        trim: true
    },
    answers: [
        {
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
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
});




const Question = mongoose.model('Question', questionSchema);

module.exports = Question;