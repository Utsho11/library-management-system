"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.ErrorResponse = void 0;
// Custom Error Response type to ensure consistent structure
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.success = false;
        this.status = status;
        this.message = message;
    }
}
exports.ErrorResponse = ErrorResponse;
const globalErrorHandler = (err, req, res, next) => {
    // Check if error has a status and message, otherwise use defaults
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong!";
    // Send error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
