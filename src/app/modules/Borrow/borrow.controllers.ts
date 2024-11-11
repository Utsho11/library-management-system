import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { borrowRecordServices } from "./borrow.services";

const createBorrowRecord = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowRecordServices.createBorrowRecordIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});

const getOverDue = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowRecordServices.getOverDueFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message:
      result.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
    data: result,
  });
});

export const borrowRecordControllers = {
  createBorrowRecord,
  getOverDue,
};
