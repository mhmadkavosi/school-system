class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        // initlize status code
        this.statusCode = statusCode;
        // Check if status code start with  4 like 404 status is fail if is not it's error 
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // Check for error is Operational error or not (it's for application not bugs or programer errors)
        this.isOperational = true;
        // return a string response of where the location of error in code
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;