import { Request, Response } from 'express';

const getInfo = async (req: Request, res: Response) => {
  try {
    res.status(200);
    res.send('hey');
  } catch (e) {
    res.send('Internal Server Error!');
    res.status(500);
  }
};

const userController = { getInfo };

export default userController;
