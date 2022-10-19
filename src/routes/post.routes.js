import express from 'express';
import { postUrl } from '../controllers/post.controller.js';
import validatePost from '../middlewares/postValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const postRouter = express.Router();

postRouter.post('/post',UserAuthentication,validatePost,postUrl);

export default postRouter;