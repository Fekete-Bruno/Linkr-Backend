import { Router } from 'express';

import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

import commentsRouter from './comments.routes.js';
import followsRouter from './follows.routes.js';
import hashtagsRouter from './hashtags.routes.js';
import likesRouter from './likes.routes.js';
import postRouter from './post.routes.js';
import repostsRouter from './reposts.routes.js';
import signRouter from './sign.routes.js';
import usersRouter from './users.routes.js';
import healthRouter from './health.routes.js'

const router = Router();

router.use(signRouter);
router.use(commentsRouter);
router.use(healthRouter);

router.use(UserAuthentication);

router.use(usersRouter);
router.use(postRouter);
router.use(likesRouter);
router.use(hashtagsRouter);
router.use(followsRouter);
router.use(repostsRouter);

export default router;