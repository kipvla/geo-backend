import { Router } from 'express';
import { gameController } from '@controller';
import { auth } from '@middleware';

const gameRouter = Router();

gameRouter.get('/', auth, gameController.createGame);
gameRouter.put('/update', auth, gameController.updateGame);

export default gameRouter;
