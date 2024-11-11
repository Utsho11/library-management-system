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

export const bookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
};
