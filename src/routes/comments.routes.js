import express from 'express';
import { GetComments, PostComment, CheckIfFollows } from '../controllers/comments.controller.js';
import { PostCommentSchema, CheckIfFollowsSchema } from '../middlewares/commentValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const router = express.Router();

router.get('/comments/:postId', UserAuthentication, GetComments);
router.post('/comment', UserAuthentication, PostCommentSchema, PostComment);
router.post('/checkiffollows', CheckIfFollowsSchema, CheckIfFollows);

export default router;