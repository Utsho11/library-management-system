import { NextFunction, Request, Response } from "express";

// Custom Error Response type to ensure consistent structure
class ErrorResponse extends Error {
  public success: boolean;
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.success = false;
    this.status = status;
    this.message = message;
  }
}

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export { ErrorResponse, globalErrorHandler };
