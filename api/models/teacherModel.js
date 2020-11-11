const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
        unique: true
    },
    phoneNumber: {
        type: Number, // TODO set it for valid phoneNmber
        unique: true
    },
    natilonalNumber: {
        type: Number, // TODO set it for valid natilonalNumber 
        unique: true
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


const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;