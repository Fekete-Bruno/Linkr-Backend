import express from 'express';
import * as followsController from '../controllers/follows.controllers.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const router = express.Router();

router.use(UserAuthentication);
router.get('/followed/:followedId', followsController.confirmFollowedUser);
router.post('/follow/:followedId', followsController.followUser);
router.delete('/unfollow/:followedId', followsController.unfollowUser);

export default router;