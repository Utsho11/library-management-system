"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
const createBookIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({ data: payload });
    return result;
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany();
    return result;
});
const getSingleBookfromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.book.findUniqueOrThrow({
            where: { bookId },
        });
        return result;
    }
    catch (error) {
        const statusCode = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? 404
            : 500;
        const errorMessage = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? "Book is not found!"
            : "An error occurred while retrieving the book";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
const updateBookIntoDB = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.book.findUniqueOrThrow({
            where: { bookId },
        });
        const result = yield prisma_1.default.book.update({
            where: { bookId },
            data: payload,
        });
        return result;
    }
    catch (error) {
        const statusCode = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? 404
            : 500;
        const errorMessage = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? "Book is not found!"
            : "An error occurred while updating the book";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.book.findUniqueOrThrow({
            where: { bookId },
        });
        yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.borrowRecord.deleteMany({
                where: {
                    bookId,
                },
            });
            yield transactionClient.book.delete({
                where: {
                    bookId,
                },
            });
        }));
    }
    catch (error) {
        const statusCode = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? 404
            : 500;
        const errorMessage = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
            ? "Book is not found!"
            : "An error occurred while deleting the book";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
exports.bookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookfromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};
