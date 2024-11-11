import prisma from "../../../shared/prisma";

const addReturnRecordIntoDB = async (borrowId: string) => {
  const recordData = {
    returnDate: new Date(),
  };

  await prisma.borrowRecord.update({
    where: { borrowId },
    data: recordData,
  });
};

export const returnRecordService = {
  addReturnRecordIntoDB,
};
