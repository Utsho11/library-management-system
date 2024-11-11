import prisma from "../../../shared/prisma";
import { TBook } from "../../types";

const createBookIntoDB = async (payload: TBook) => {
  const result = await prisma.book.create({ data: payload });

  return result;
};

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();

  return result;
};

const getSingleBookfromDB = async (bookId: string) => {
  const result = await prisma.book.findUnique({
    where: {
      bookId: bookId,
    },
  });

  return result;
};

const updateBookIntoDB = async (bookId: string, payload: Partial<TBook>) => {
  const result = await prisma.book.update({
    where: {
      bookId: bookId,
    },
    data: payload,
  });

  return result;
};

export const bookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookfromDB,
  updateBookIntoDB,
};
