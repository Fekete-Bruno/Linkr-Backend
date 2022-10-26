import express from "express";
import * as repostController from "../controllers/repost.controllers.js";
import { repostMiddleware } from "../middlewares/reposts.middlewares.js";
import UserAuthentication from "../middlewares/userAuthentication.middlewares.js";

const repostRouter = express.Router();

repostRouter.post(
  "/repost/:id",
  UserAuthentication,
  repostMiddleware,
  repostController.repost
);

export default repostRouter;
