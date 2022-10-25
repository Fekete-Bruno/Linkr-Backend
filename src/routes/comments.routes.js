import express from 'express';
import { GetComments, PostComment } from '../controllers/comments.controller.js';
import { PostCommentSchema } from '../middlewares/commentValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const router = express.Router();

router.get('/comments/:postId', UserAuthentication, GetComments);
router.post('/comment', UserAuthentication, PostCommentSchema, PostComment);

export default router;