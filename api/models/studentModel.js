const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fristName: String,
    lastName: String,
    fatherName: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number, // TODO set it for valid phoneNmber
    },
    natilonalNumber: {
        type: Number, // TODO set it for valid natilonalNumber 
    },
    images: {
        type: [String],
        default: "no-photo.jpg"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    classHistory: [String],
    created_at: {
        type: Date,
        default: Date.now()
    }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;