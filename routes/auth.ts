import router from './';

import authController from '../controllers/auth';

router.post('/login', authController.login);
