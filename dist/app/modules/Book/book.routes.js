"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./book.controllers");
const router = express_1.default.Router();
router.post("/", book_controllers_1.bookControllers.createBook);
router.get("/", book_controllers_1.bookControllers.getAllBook);
router.get("/:bookId", book_controllers_1.bookControllers.getSingleBook);
router.put("/:bookId", book_controllers_1.bookControllers.updateBook);
router.delete("/:bookId", book_controllers_1.bookControllers.deleteBook);
exports.bookRoutes = router;
