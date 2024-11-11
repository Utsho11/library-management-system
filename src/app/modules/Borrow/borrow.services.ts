import prisma from "../../../shared/prisma";

type TBorrowRecord = {
  bookId: string;
  memberId: string;
};

type TBorrowRecordData = {
  borrowDate: Date;
  memberId: string;
  returnDate?: Date | null;
  bookId: string;
};

const createBorrowRecordIntoDB = async (payload: TBorrowRecord) => {
  const recordData: TBorrowRecordData = {
    ...payload,
    borrowDate: new Date(),
  };

  const result = await prisma.borrowRecord.create({
    data: recordData,
  });

  const { returnDate, ...responseWithoutReturnDate } = result;

  return responseWithoutReturnDate;
};

const getOverDueFromDB = async () => {
  const result = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      borrowId: true,
      borrowDate: true,
      bookId: true,
      memberId: true,
    },
  });

  return result;
};

export const borrowRecordServices = {
  createBorrowRecordIntoDB,
  getOverDueFromDB,
};
