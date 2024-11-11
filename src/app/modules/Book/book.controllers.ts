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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.getSingleBookfromDB(req.params.bookId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.updateBookIntoDB(
    req.params.bookId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.deleteBookFromDB(req.params.bookId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book successfully deleted",
  });
});

export const bookControllers = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
