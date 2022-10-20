import express from 'express';
import { getTimeline, postUrl, updateDescription } from '../controllers/post.controller.js';
import validatePost from '../middlewares/postValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const postRouter = express.Router();

postRouter.post('/post',UserAuthentication,validatePost,postUrl);
postRouter.get('/timeline',UserAuthentication,getTimeline);
postRouter.get('/status',(req,res)=>{res.sendStatus(200)});
postRouter.put('/posts/:id',UserAuthentication,updateDescription);

export default postRouter;