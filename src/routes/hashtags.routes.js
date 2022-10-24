import { Router } from 'express';

import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

import {
    listHashtags,
    listPostsByHashtag
} from '../controllers/hashtags.controller.js';

const hashtagsRouter = Router();

hashtagsRouter.use(UserAuthentication);
hashtagsRouter.get('/hashtags', listHashtags);
hashtagsRouter.get('/hashtags/:hashtag', listPostsByHashtag);


export default hashtagsRouter;