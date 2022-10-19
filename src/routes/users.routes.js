import express from 'express';
import * as usersController from '../controllers/users.controllers.js';
import searchSchemaValidate from '../middlewares/searchValidation.middleware.js';

const router = express.Router();

router.get('/searchusers', searchSchemaValidate, usersController.searchUser);

export default router;