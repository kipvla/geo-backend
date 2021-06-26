import { Router } from 'express';
// import { auth } from '@middleware';
import { auth } from '../middleware/auth';
const userRouter = Router();

// TODO
import userController from '../controllers/user';

userRouter.get('/', auth, userController.getUser);

export default userRouter;
