import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { bookServices } from "./book.services";
import sendResponse from "../../../shared/sendResponse";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.createBookIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book Created successfuly!",
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getAllBooksFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

export const bookControllers = {
  createBook,
  getAllBook,
};
