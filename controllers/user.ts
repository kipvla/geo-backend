import { Request, Response } from 'express';

import { User } from '../models';

const getUser = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user.id;

    const user = await User.findById(userId).select('-password');

    res.status(200);
    res.json({ user });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');
    if (!user) return res.status(404).json({ msg: ' User does not exist' });
    res.status(200);
    res.json({ user });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const getUserList = async (req: Request, res: Response) => {
  try {
    const usernames = await User.find({}, { username: 1, _id: 0 });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('Internal Server Error!');
  }
};

const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { friendName } = req.body;

    const userId: string = res.locals.user.id;

    const user = await User.findById(userId);

    const friend = await User.findOne({ username: friendName });

    if (user.username === friendName) {
      return res.status(404).json({ msg: 'Sad... Trying to add yourself' });
    }

    if (!friend) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    if (
      user.pendingRequests.some(
        (request: { id: string; username: string }) =>
          request.username === friendName
      )
    ) {
      return res.status(409).json({ msg: 'User in pending requests' });
    }
    if (
      user.friendRequests.some(
        (request: { id: string; username: string }) =>
          request.username === friendName
      )
    ) {
      return res.status(409).json({ msg: 'User in friend Requests' });
    }
    if (
      user.friendsList.some(
        (request: { id: string; username: string }) =>
          request.username === friendName
      )
    ) {
      return res.status(409).json({ msg: 'User already in friends list' });
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $push: { pendingRequests: { id: friend._id, username: friendName } } },
      { new: true }
    );

    await User.findByIdAndUpdate(friend._id, {
      $push: { friendRequests: { id: userId, username: user.username } },
    });

    res.status(200);
    res.json({ user: newUser });
  } catch (e) {
    console.log(e);
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user.id;
    const { friendId, friendName } = req.body;

    const user = await User.findById(userId);

    if (
      user.friendsList.some(
        (request: { id: string; username: string }) =>
          request.username === friendName
      )
    ) {
      return res.status(409).json({ msg: 'User already in friends list' });
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { friendRequests: { id: friendId } },
        $push: { friendsList: { id: friendId, username: friendName } },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(friendId, {
      $pull: { pendingRequests: { id: userId } },
      $push: { friendsList: { id: userId, username: user.username } },
    });

    res.status(200);
    res.json({ user: newUser });
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};
const declineFriendRequest = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user.id;

    const { friendId } = req.body;

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friendRequests: { id: friendId } } },
      { new: true }
    );

    await User.findByIdAndUpdate(friendId, {
      $pull: { pendingRequests: { id: userId } },
    });

    res.status(200);
    res.json({ user: newUser });
  } catch (e) {
    res.send('Internal Server Error!');

    res.status(500);
  }
};
export const userController = {
  getUser,
  getUserByUsername,
  getUserList,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};
