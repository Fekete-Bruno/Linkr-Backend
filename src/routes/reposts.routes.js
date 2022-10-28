import express from "express";
import * as repostController from "../controllers/repost.controllers.js";
import { repostMiddleware } from "../middlewares/reposts.middlewares.js";

const router = express.Router();

router.post("/repost/:id", repostMiddleware, repostController.repost);

router.get("/userposts/:id", usersController.listUserPosts);

export default router;
