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
        type: String,
        trim: true,
        unique: true,
        // validate phone number : 9183219403 , 0918234954
        match: [/(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/, 'Please enter valid phone number']
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