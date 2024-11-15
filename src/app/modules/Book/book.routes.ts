import express from "express";
import { bookControllers } from "./book.controllers";

const router = express.Router();

router.post("/", bookControllers.createBook);
router.get("/", bookControllers.getAllBook);
router.get("/:bookId", bookControllers.getSingleBook);
router.put("/:bookId", bookControllers.updateBook);
router.delete("/:bookId", bookControllers.deleteBook);

export const bookRoutes = router;
