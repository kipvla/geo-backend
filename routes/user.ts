import router from './';

import userController from '../controllers/user';

router.get('/', userController.getInfo);
