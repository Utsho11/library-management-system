import express from "express";
import { bookRoutes } from "../modules/Book/book.routes";
import { memberRoutes } from "../modules/Member/member.routes";
import { borrowRoutes } from "../modules/Borrow/borrow.routes";
import { returnRoutes } from "../modules/Return/return.routes";

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
  {
    path: "/borrow",
    route: borrowRoutes,
  },
  {
    path: "/return",
    route: returnRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
