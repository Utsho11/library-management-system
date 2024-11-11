import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { TMember } from "../../types";
import { ErrorResponse } from "../../middlewares/globalErrorHandler";

const createMemberIntoDB = async (payload: TMember) => {
  try {
    const result = await prisma.member.create({ data: payload });

    return result;
  } catch (error) {
    const statusCode =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
        ? 409
        : 500;
    const errorMessage =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
        ? "A user with this email already exists."
        : "An error occurred while updating the member";

    throw new ErrorResponse(statusCode, errorMessage);
  }
};

const getAllMembersFromDB = async () => {
  const result = await prisma.member.findMany();

  return result;
};

const getSingleMemberfromDB = async (memberId: string) => {
  try {
    const result = await prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });

    return result;
  } catch (error) {
    const statusCode =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
        ? 404
        : 500;
    const errorMessage =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
        ? "Member is not found"
        : "An error occurred while updating the member.";

    throw new ErrorResponse(statusCode, errorMessage);
  }
};

export const memberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getSingleMemberfromDB,
};