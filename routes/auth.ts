import { Router } from 'express';
const authRouter = Router();
import authController from '../controllers/auth';

authRouter.post('/login', authController.login);
export default authRouter;
