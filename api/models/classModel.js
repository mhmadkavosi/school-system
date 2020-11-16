const mongoose = require('mongoose');
const slugify = require('slugify');

const classSchema = new mongoose.Schema({
    className: String,
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    classStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    // set for active or inActive of class | show in frontEnd
    status: {
        type: Boolean,
        default: true
    },
    slug: String,
});

// Create class slug from name
classSchema.pre('save', function(next) {
    this.slug = slugify(this.className, { lower: true });
    next();
});


const Class = mongoose.model("Class", classSchema);

module.exports = Class;