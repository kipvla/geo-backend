import { Router } from 'express';
import { auth } from '../middleware';

import { userController } from '../controllers';

const userRouter = Router();

userRouter.get('/', auth, userController.getUser);
userRouter.get('/getAll', auth, userController.getUserList);
userRouter.get('/by-name/:username', auth, userController.getUserByUsername);
userRouter.get('/by-id/:userId', auth, userController.getUserByUserId);

userRouter.put('/add-friend', auth, userController.sendFriendRequest);
userRouter.put('/accept-request', auth, userController.acceptFriendRequest);
userRouter.put('/decline-request', auth, userController.declineFriendRequest);

export default userRouter;
