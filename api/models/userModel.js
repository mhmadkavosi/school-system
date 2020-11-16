const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fristName: String,
    lastName: String,
    fatherName: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: "student"
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
    //classHistory: [String],
    created_at: {
        type: Date,
        default: Date.now()
    }
});


const User = mongoose.model("user", userSchema);

module.exports = User;