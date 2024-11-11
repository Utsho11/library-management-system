import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { returnRecordService } from "./return.services";

const returnBook = catchAsync(async (req: Request, res: Response) => {
  await returnRecordService.addReturnRecordIntoDB(req.body.borrowId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book returned successfully",
  });
});

export const returnRecordControllers = {
  returnBook,
};
