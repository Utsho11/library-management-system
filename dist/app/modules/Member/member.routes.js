"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controllers_1 = require("./member.controllers");
const router = express_1.default.Router();
router.post("/", member_controllers_1.memberControllers.createMember);
router.get("/", member_controllers_1.memberControllers.getAllMember);
router.get("/:memberId", member_controllers_1.memberControllers.getSingleMember);
router.put("/:memberId", member_controllers_1.memberControllers.updateMember);
router.delete("/:memberId", member_controllers_1.memberControllers.deleteMember);
exports.memberRoutes = router;
