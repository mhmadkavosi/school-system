const mongoose = require('mongoose');
const slugify = require('slugify');

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
    slug: String,
    studentCount: {
        type: Number,
        default: 0
    }
});

// Create class slug from name 
classSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Create count of student for class base on all student is into class
// TODO : check for this if work afer we send request and when we add a new student in class when we add other student
classSchema.pre('save', function(next) {
    this.studentCount += this.classStudents.length;
    next();
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;