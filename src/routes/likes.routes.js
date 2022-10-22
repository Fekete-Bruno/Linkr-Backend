import express from "express";
import { postLike } from "../controllers/likes.controller.js";
import validateLike from "../middlewares/likeValidation.middleware.js";
import UserAuthentication from "../middlewares/userAuthentication.middlewares.js";

const likesRouter = express.Router();

likesRouter.post('/like',
    UserAuthentication,
    validateLike,
    postLike
);

export default likesRouter;