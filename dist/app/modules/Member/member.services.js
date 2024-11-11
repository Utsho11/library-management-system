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
exports.memberServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
const createMemberIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.member.create({ data: payload });
        return result;
    }
    catch (error) {
        const statusCode = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
            ? 409
            : 500;
        const errorMessage = error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
            ? "A user with this email already exists."
            : "An error occurred while creating the member";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
const getAllMembersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany();
    return result;
});
const getSingleMemberfromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.member.findUniqueOrThrow({
            where: {
                memberId,
            },
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
            ? "Member is not found"
            : "An error occurred while retrieving the member.";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
const updateMemberIntoDB = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.member.findUniqueOrThrow({
            where: { memberId },
        });
        const result = yield prisma_1.default.member.update({
            where: { memberId },
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
            ? "Member is not found"
            : "An error occurred while updating the member.";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
const deleteMemberFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.member.findUniqueOrThrow({
            where: { memberId },
        });
        yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.borrowRecord.deleteMany({
                where: {
                    memberId,
                },
            });
            yield transactionClient.member.delete({
                where: {
                    memberId,
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
            ? "Member is not found"
            : "An error occurred while deleting the member";
        throw new globalErrorHandler_1.ErrorResponse(statusCode, errorMessage);
    }
});
exports.memberServices = {
    createMemberIntoDB,
    getAllMembersFromDB,
    getSingleMemberfromDB,
    updateMemberIntoDB,
    deleteMemberFromDB,
};
