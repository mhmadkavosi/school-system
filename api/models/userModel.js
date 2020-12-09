const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    fristName: String,
    lastName: String,
    fatherName: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add a email'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please add a password'],
      select: false,
    },
    restPasswordToken: String,
    resetPasswordExpire: Date,
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      // validate phone number : 9183219403 , 0918234954
      match: [
        /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
        'Please enter valid phone number',
      ],
    },
    nationalCode: {
      type: Number,
      trim: true,
      unique: true,
      // validate natilonalCode : start with 0 and just 10 char
      match: [/^0\d{10}$/, 'Please enter a valid nationalCode'],
    },
    images: {
      type: [String],
      default: 'no-photo.jpg',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // classHistory: [String],
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hase token and set to resetPasswordToken field

  this.restPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
