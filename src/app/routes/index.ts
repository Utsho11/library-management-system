import express from "express";
import { bookRoutes } from "../modules/Book/book.routes";
import { memberRoutes } from "../modules/Member/member.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/members",
    route: memberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
