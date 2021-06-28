import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

const GameSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    isMultiplayer: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: ObjectID,
      required: true,
    },
    currentScore: {
      type: Number,
      default: 0,
    },
    locations: {
      type: Array,
      required: true,
    },
    currentTurn: {
      type: Number,
      default: 1,
    },
    guesses: {
      type: Array,
      default: [],
    },
    multiplayerGameID: {
      type: ObjectID,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Game = mongoose.model('game', GameSchema);
