import express from "express";
import { memberControllers } from "./member.controllers";

const router = express.Router();

router.post("/", memberControllers.createMember);
router.get("/", memberControllers.getAllMember);
router.get("/:memberId", memberControllers.getSingleMember);
router.put("/:bookId");
router.delete("/:bookId");

export const memberRoutes = router;
