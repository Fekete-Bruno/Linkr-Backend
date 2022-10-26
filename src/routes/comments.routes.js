import express from 'express';
import { GetComments, PostComment, CheckIfFollows, GetCommentsV2 } from '../controllers/comments.controller.js';
import { PostCommentSchema, CheckIfFollowsSchema, GetCommentsV2Schema } from '../middlewares/commentValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const router = express.Router();

router.get('/comments/:postId', UserAuthentication, GetComments);
router.post('/comment', UserAuthentication, PostCommentSchema, PostComment);
router.post('/checkiffollows', CheckIfFollowsSchema, CheckIfFollows);
router.post('/getcommentsv2', UserAuthentication, GetCommentsV2Schema, GetCommentsV2);

export default router;