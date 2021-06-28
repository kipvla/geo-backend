import { Request, Response } from 'express';

import { User } from '@models';

const getUser = async (req: Request, res: Response) => {
  try {
    res.status(200);
    const userId: string = res.locals.user.id;

    const user = await User.findById(userId).select('-password');

    res.json(user);
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { friendId, friendName } = req.body;
    res.status(200);
    const userId: string = res.locals.user.id;

    const user = await User.findById(userId);

    if (
      user.pendingRequests.some(
        (request: { id: string; username: string }) => request.id === friendId
      ) ||
      user.friendRequests.some(
        (request: { id: string; username: string }) => request.id === friendId
      )
    ) {
      return res
        .status(409)
        .json({ msg: 'pending request or in friend requests' });
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $push: { pendingRequests: { id: friendId, username: friendName } } },
      { new: true }
    );

    await User.findByIdAndUpdate(friendId, {
      $push: { friendRequests: { id: userId, username: user.username } },
    });

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
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};
