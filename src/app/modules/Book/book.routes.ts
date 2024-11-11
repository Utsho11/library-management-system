import express from "express";
import { bookControllers } from "./book.controllers";

const router = express.Router();

router.post("/", bookControllers.createBook);
router.get("/", bookControllers.getAllBook);

export const bookRoutes = router;
