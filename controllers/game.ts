import { Request, Response } from 'express';

import { Place } from '@models';
import { Game } from '@models';
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

export const gameController = { createGame, updateGame };
