import { Router } from 'express';
import { gameController } from '../controllers';
import { auth } from '../middleware';

const gameRouter = Router();

gameRouter.get('/', auth, gameController.createGame);
gameRouter.put('/update', auth, gameController.updateGame);
gameRouter.get('/multiplayer', auth, gameController.createMultiplayerGame);
gameRouter.post(
  '/multiplayer/send-invite',
  auth,
  gameController.sendGameInvite
);
gameRouter.post(
  '/multiplayer/accept-invite',
  auth,
  gameController.acceptGameInvite
);
gameRouter.post(
  '/multiplayer/decline-invite',
  auth,
  gameController.declineGameInvite
);
gameRouter.put(
  '/multiplayer/update',
  auth,
  gameController.updateMultiplayerGame
);
gameRouter.get(
  '/multiplayer/results/:gameID',
  auth,
  gameController.getMultiplayerResults
);
gameRouter.get(
  '/all-multiplayer-games',
  auth,
  gameController.getMultiplayerGamesByUserId
);

gameRouter.get('/get-leaderboards', gameController.getGlobalLeaderboard);

export default gameRouter;
