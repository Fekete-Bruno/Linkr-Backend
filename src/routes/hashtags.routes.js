import { Router } from 'express';

import {
    listHashtags,
    listPostsByHashtag
} from '../controllers/hashtags.controller.js';

const router = Router();

router.get('/hashtags', listHashtags);
router.get('/hashtags/:hashtag', listPostsByHashtag);


export default router;