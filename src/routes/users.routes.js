import express from 'express';
import * as usersController from '../controllers/users.controllers.js';
import searchSchemaValidate from '../middlewares/searchValidation.middleware.js';
import UserAuthentication from '../middlewares/userAuthentication.middlewares.js';

const router = express.Router();

router.use(UserAuthentication);
router.get('/users', usersController.listUsers);
router.get('/user/:id', usersController.listUserPosts);

export default router;