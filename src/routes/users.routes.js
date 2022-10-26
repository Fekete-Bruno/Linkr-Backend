import express from 'express';
import * as usersController from '../controllers/users.controllers.js';
import searchSchemaValidate from '../middlewares/searchValidation.middleware.js';

const router = express.Router();

router.get('/users', usersController.listUsers);
router.get('/userinfos/:id', usersController.listUserbyId);
router.get('/userposts/:id', usersController.listUserPosts);

export default router;