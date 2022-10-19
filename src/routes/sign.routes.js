import express from 'express';
import { SignUp, SignIn, GetUsers } from '../controllers/sign.controllers.js';
import SignUpSchema from '../middlewares/schemaValidation.middlewares.js';

const router = express.Router();

router.post('/signup', SignUpSchema, SignUp);
router.post('/signin', SignIn);
router.get('/getusers', GetUsers);

export default router;