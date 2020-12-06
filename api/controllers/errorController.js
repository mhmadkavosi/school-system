const ErrorRespons = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err };

    error.message = err.message;

    // log the console for dev
     console.log(err.stack);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorRespons(message, 404);
    }

    // mongoose duplicate error key
    if (err.code === 11000) {
        const message = 'Duplicate field value enterd';
        error = new ErrorRespons(message, 400);
    }

    // mongoose validations error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorRespons(message, 400);
    }
    res.status(error.statusCode || 500).json({
        status: false,
        error: error.message || "Server Error"
    })
}

module.exports = errorHandler;