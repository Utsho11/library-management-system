"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const return_controllers_1 = require("./return.controllers");
const router = express_1.default.Router();
router.post("/", return_controllers_1.returnRecordControllers.returnBook);
exports.returnRoutes = router;
