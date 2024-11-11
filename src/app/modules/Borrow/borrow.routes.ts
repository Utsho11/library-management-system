import express from "express";
import { borrowRecordControllers } from "./borrow.controllers";

const router = express.Router();

router.post("/", borrowRecordControllers.createBorrowRecord);
router.get("/overdue", borrowRecordControllers.getOverDue);

export const borrowRoutes = router;
