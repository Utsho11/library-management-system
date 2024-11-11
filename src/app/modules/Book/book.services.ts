import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { TBook } from "../../types";
import { ErrorResponse } from "../../middlewares/globalErrorHandler";

const createBookIntoDB = async (payload: TBook) => {
  const result = await prisma.book.create({ data: payload });

  return result;
};

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();

  return result;
};

const getSingleBookfromDB = async (bookId: string) => {
  try {
    const result = await prisma.book.findUniqueOrThrow({
      where: { bookId },
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
        ? "Book is not found!"
        : "An error occurred while retrieving the book";

    throw new ErrorResponse(statusCode, errorMessage);
  }
};

const updateBookIntoDB = async (bookId: string, payload: Partial<TBook>) => {
  try {
    await prisma.book.findUniqueOrThrow({
      where: { bookId },
    });

    const result = await prisma.book.update({
      where: { bookId },
      data: payload,
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
        ? "Book is not found!"
        : "An error occurred while updating the book";

    throw new ErrorResponse(statusCode, errorMessage);
  }
};

const deleteBookFromDB = async (bookId: string) => {
  try {
    await prisma.book.findUniqueOrThrow({
      where: { bookId },
    });

    const result = await prisma.book.delete({
      where: { bookId },
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
        ? "Book is not found!"
        : "An error occurred while deleting the book";

    throw new ErrorResponse(statusCode, errorMessage);
  }
};

export const bookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookfromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
