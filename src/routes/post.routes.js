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
postRouter.delete("/post/:id", UserAuthentication, postController.deletePost);
postRouter.put("/post/:id", UserAuthentication, postController.editPost);

export default postRouter;
