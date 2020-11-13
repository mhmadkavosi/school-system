// const sendErrorDev = (err, res) => {
//     res.status(err.statusCode).json({
//         status: err.status,
//         error: err,
//         message: err.message,
//         stack: err.stack
//     });
// }

// const sendErrorProd = (err, res) => {
//     // Operational , trusted error : send message to the clint
//     if (err.isOperational) {
//         res.status(err.statusCode).json({
//             status: err.status,
//             message: err.message
//         });
//         // Programing or other unkown error : dont't leak error details
//     } else {
//         // 1) log error
//         console.error('ERROR !!!', err);

//         // 2) Send generic message
//         res.status(500).json({
//             status: "error",
//             message: "Something went very wrong!!"
//         })
//     }
// }


// // Create error Middleware (global handler midlleware)
// module.exports = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     if (process.env.NODE_ENV === 'development') {
//         sendErrorDev(err, res);
//     } else if (process.env.NODE_ENV === 'production') {
//         sendErrorProd(err, res);
//     }
// }
const ErrorRespons = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err };

    error.message = err.message;

    // log the console for dev
    // console.log(err.stack);

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
    res.status(error.statusCode || 500).json({
        status: false,
        error: error.message || "Server Error"
    })
}

module.exports = errorHandler;