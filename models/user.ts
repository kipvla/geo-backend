import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    friendsList: {
      type: Array,
      default: [],
      unique: true,
    },
    friendRequests: {
      type: Array,
      default: [],
      unique: true,
    },
    pendingRequests: {
      type: Array,
      default: [],
      unique: true,
    },
    gameInvites: {
      type: Array,
      default: [],
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    exp: {
      type: Number,
      default: 0,
    },
    currentLevel: {
      type: Number,
      default: 0,
    },
    highestScore: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model('user', UserSchema);
