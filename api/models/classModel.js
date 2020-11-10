const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: String,
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    classStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    classBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    // quizHistory: [String], // TODO make a method for class to have a page for history of quizes 
    startDate: Date,
    endDate: Date,
    created_at: {
        type: Date,
        default: Date.now()
    },
    status: Boolean, // set for active or inActive of class | show in frontEnd
});



const Class = mongoose.model("Class", classSchema);

module.exports = Class;