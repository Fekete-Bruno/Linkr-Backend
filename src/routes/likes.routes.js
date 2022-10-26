import express from "express";
import { postLike } from "../controllers/likes.controller.js";
import validateLike from "../middlewares/likeValidation.middleware.js";

const router = express.Router();

router.post('/like',
    validateLike,
    postLike
);

export default router;