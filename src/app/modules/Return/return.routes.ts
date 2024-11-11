import express from "express";
import { returnRecordControllers } from "./return.controllers";

const router = express.Router();

router.post("/", returnRecordControllers.returnBook);

export const returnRoutes = router;
