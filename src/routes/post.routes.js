import express from "express";
import * as postController from "../controllers/post.controller.js";
import validatePage from "../middlewares/pageValidation.middleware.js";
import validatePost from "../middlewares/postValidation.middleware.js";

const router = express.Router();

router.post(
  "/post",
  validatePost,
  postController.postUrl
);
router.get("/timeline", validatePage ,postController.getTimeline);
router.get("/timeline/:page", validatePage,postController.getTimeline);
router.put("/posts/:id", postController.editPost);
router.delete("/posts/:id", postController.deletePost);

export default router;
