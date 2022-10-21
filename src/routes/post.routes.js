import express from "express";
import * as postController from "../controllers/post.controller.js";
import validatePost from "../middlewares/postValidation.middleware.js";
import UserAuthentication from "../middlewares/userAuthentication.middlewares.js";

const postRouter = express.Router();

postRouter.post(
  "/post",
  UserAuthentication,
  validatePost,
  postController.postUrl
);
postRouter.get("/timeline", UserAuthentication, postController.getTimeline);
postRouter.put("/posts/:id", UserAuthentication, postController.editPost);
postRouter.delete("/posts/:id", UserAuthentication, postController.deletePost);

export default postRouter;
