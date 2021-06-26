import { Router } from 'express';
import { auth } from '@middleware';

import { userController } from '@controller';

const userRouter = Router();

userRouter.get('/', auth, userController.getUser);

export default userRouter;
