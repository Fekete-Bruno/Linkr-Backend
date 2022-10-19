import express from 'express';
import { SignUp, SignIn, SignOut, SignOutAll, SelectUsers, SelectSessions } from '../controllers/sign.controllers.js';
import { SignUpSchema, SignInSchema } from '../middlewares/schemaValidation.middlewares.js';
import UserAuthentication from '../middlewares/UserAuthentication.middlewares.js';

const router = express.Router();

router.post('/signup', SignUpSchema, SignUp);
router.post('/signin', SignInSchema, SignIn);
router.delete('/signout', UserAuthentication, SignOut);
router.delete('/signoutall', UserAuthentication, SignOutAll);

//Internal Control
router.get('/selectusers', SelectUsers);
router.get('/selectsessions', SelectSessions);

export default router;