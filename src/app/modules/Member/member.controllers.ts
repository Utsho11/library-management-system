import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { memberServices } from "./member.services";
import sendResponse from "../../../shared/sendResponse";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.createMemberIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Member Created successfuly!",
    data: result,
  });
});

const getAllMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.getAllMembersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Members retrieved successfuly!",
    data: result,
  });
});

const getSingleMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.getSingleMemberfromDB(
    req.params.memberId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.updateMemberIntoDB(
    req.params.memberId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.deleteMemberFromDB(req.params.memberId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member successfully deleted",
  });
});

export const memberControllers = {
  createMember,
  getAllMember,
  getSingleMember,
  updateMember,
  deleteMember,
};
