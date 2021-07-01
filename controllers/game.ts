import { Request, Response } from 'express';
import { Place } from '../models';
import { Game } from '../models';
import { User } from '../models';
import { shuffle } from 'lodash';
import { calculateExp } from '../utils';
import { calculateLevel } from '../utils';

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

    const user = await User.findById(res.locals.user.id);

    if (updatedGame.currentScore > user.highestScore) {
      await User.findByIdAndUpdate(res.locals.user.id, {
        $set: { highestScore: updatedGame.currentScore },
      });
    }

    if (shouldGameEnd) {
      const currentGameExp = calculateExp(
        user.currentLevel,
        updatedGame.currentScore
      );
      const userExp = currentGameExp + user.exp;
      const userLevel = calculateLevel(userExp);
      await User.findByIdAndUpdate(res.locals.user.id, {
        $set: { exp: userExp, currentLevel: userLevel },
      });
    }

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
    const user = await User.findById(res.locals.user.id);

    if (updatedGame.currentScore > user.highestScore) {
      await User.findByIdAndUpdate(res.locals.user.id, {
        $set: { highestScore: updatedGame.currentScore },
      });
    }

    if (shouldGameEnd) {
      const currentGameExp = calculateExp(
        user.currentLevel,
        updatedGame.currentScore
      );
      const userExp = currentGameExp + user.exp;
      const userLevel = calculateLevel(userExp);
      await User.findByIdAndUpdate(res.locals.user.id, {
        $set: { exp: userExp, currentLevel: userLevel },
      });
    }
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
    const allResults = await Game.find({ multiplayerGameID: gameID }).sort({
      currentScore: 1,
    });
    console.log(allResults, gameID);
    res.status(201).json({ results: allResults });
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const getGlobalLeaderboard = async (req: Request, res: Response) => {
  try {
    // Get all games that have ended
    const allResults = await Game.aggregate([
      {
        $match: {
          active: false,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userID: '$userID' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userID'],
                },
              },
            },
            {
              $project: {
                email: 1,
                username: 1,
                exp: 1,
                currentLevel: 1,
              },
            },
          ],
          as: 'userInfo',
        },
      },
      {
        $addFields: {
          userEmail: { $arrayElemAt: ['$userInfo', 0] },
        },
      },
      {
        $addFields: {
          userTotalGameCounter: '$userEmail.email',
          username: '$userEmail.username',
          exp: '$userEmail.exp',
          currentLevel: '$userEmail.currentLevel',
        },
      },
      {
        $group: {
          _id: '$userEmail',
          userTotalGameCounter: { $sum: 1 },
          currentScore: { $sum: '$currentScore' },
          userEmail: { $first: '$userTotalGameCounter' },
          username: { $first: '$username' },
          exp: { $first: '$exp' },
          currentLevel: { $first: '$currentLevel' },
        },
      },
      {
        $project: {
          scoreGameRatio: {
            $divide: ['$currentScore', '$userTotalGameCounter'],
          },
          userEmail: 1,
          username: 1,
          exp: 1,
          currentScore: 1,
          userTotalGameCounter: 1,
          currentLevel: 1,
        },
      },
    ]);
    const cleanResults = [];
    for (let i = 0; i < allResults.length; i++) {
      const {
        exp,
        userEmail,
        username,
        scoreGameRatio,
        currentScore,
        userTotalGameCounter,
        currentLevel,
      } = allResults[i];
      cleanResults.push({
        exp,
        userEmail,
        username,
        scoreGameRatio,
        currentScore,
        userTotalGameCounter,
        currentLevel,
      });
    }
    res.status(200).json({
      leaderboardResults: cleanResults.sort(
        (a, b) => b.scoreGameRatio - a.scoreGameRatio
      ),
    });
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
  getGlobalLeaderboard,
};
