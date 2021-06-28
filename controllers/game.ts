import { Request, Response } from 'express';

import { Place } from '@models';
import { Game } from '@models';
import { User } from '@models';
import { shuffle } from 'lodash';

const createGame = async (req: Request, res: Response) => {
  try {
    const allPlaces = await Place.find();
    const shuffledPlaces = shuffle(allPlaces).slice(0, 3);
    const newGame = await Game.create({
      locations: shuffledPlaces,
      userID: res.locals.user.id,
    });
    res.status(201).json({ game: newGame });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const updateGame = async (req: Request, res: Response) => {
  try {
    const { turnScore, gameID, userGuess } = req.body;
    const currentGame = await Game.findById(gameID);
    if (!currentGame.active)
      return res.status(401).json({ msg: 'Game already ended!' });
    const { currentTurn, locations } = currentGame;
    const shouldGameEnd: boolean = currentTurn === locations.length;
    const updatedGame = await Game.findOneAndUpdate(
      { _id: gameID },
      {
        $inc: { currentScore: turnScore, currentTurn: 1 },
        $push: { guesses: userGuess },
        $set: { active: !shouldGameEnd },
      },
      { new: true }
    );
    res.status(201).json({ game: updatedGame });
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const createMultiplayerGame = async (req: Request, res: Response) => {
  try {
    const allPlaces = await Place.find();
    const shuffledPlaces = shuffle(allPlaces).slice(0, 3);
    const newGame = await Game.create({
      locations: shuffledPlaces,
      userID: res.locals.user.id,
      isMultiplayer: true,
    });
    const updatedGame = await Game.findByIdAndUpdate(
      newGame._id,
      {
        multiplayerGameID: newGame._id,
      },
      { new: true }
    );
    res.status(201).json({ game: updatedGame });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const sendGameInvite = async (req: Request, res: Response) => {
  try {
    const { gameID, userToInviteID } = req.body;
    const userWhoSentInvite = await User.findById(res.locals.user.id);
    const invitation = {
      from: userWhoSentInvite.username,
      gameID,
    };
    await User.findByIdAndUpdate(userToInviteID, {
      $push: { gameInvites: invitation },
    });
    res.status(200).json({ msg: 'Game invitation sent!' });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const acceptGameInvite = async (req: Request, res: Response) => {
  try {
    const { gameID } = req.body;
    const user = await User.findByIdAndUpdate(res.locals.user.id, {
      $pull: { gameInvites: { gameID } },
    });
    const game = await Game.findById(gameID).lean();
    console.log(game);
    delete game._id;
    const multiplayerGame = await Game.create({ ...game, userID: user._id });
    res.status(200).json({ game: multiplayerGame });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const declineGameInvite = async (req: Request, res: Response) => {
  try {
    const { gameID } = req.body;
    await User.findByIdAndUpdate(res.locals.user.id, {
      $pull: { gameInvites: { gameID } },
    });
    res.status(200).json({ msg: 'Invitation declined!' });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};
const updateMultiplayerGame = async (req: Request, res: Response) => {
  try {
    const { turnScore, gameID, userGuess } = req.body;
    const currentGame = await Game.findOne({
      multiplayerGameID: gameID,
      userID: res.locals.user.id,
    });
    if (!currentGame.active)
      return res.status(401).json({ msg: 'Game already ended!' });
    const { currentTurn, locations } = currentGame;
    const shouldGameEnd: boolean = currentTurn === locations.length;
    const updatedGame = await Game.findOneAndUpdate(
      { multiplayerGameID: gameID, userID: res.locals.user.id },
      {
        $inc: { currentScore: turnScore, currentTurn: 1 },
        $push: { guesses: userGuess },
        $set: { active: !shouldGameEnd },
      },
      { new: true }
    );
    res.status(201).json({ game: updatedGame });
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const getMultiplayerResults = async (req: Request, res: Response) => {
  try {
    const { gameID } = req.params;
    const allResults = await Game.find({ multiplayerGameID: gameID });
    console.log(allResults, gameID);
    res.status(201).json({ results: allResults });
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error!');
    res.status(500);
  }
};
export const gameController = {
  createGame,
  updateGame,
  createMultiplayerGame,
  sendGameInvite,
  acceptGameInvite,
  declineGameInvite,
  updateMultiplayerGame,
  getMultiplayerResults,
};
