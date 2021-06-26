import { Router } from 'express';
const authRouter = Router();
import authController from '../controllers/auth';

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
export default authRouter;
