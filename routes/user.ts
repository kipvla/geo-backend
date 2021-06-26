import { Router } from 'express';
const userRouter = Router();

import userController from '../controllers/user';

userRouter.get('/', userController.getInfo);

export default userRouter;
