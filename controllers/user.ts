import { Request, Response } from 'express';

// import { User } from '@models';
import { User } from '../models/user';

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

const userController = { getUser };

export default userController;
