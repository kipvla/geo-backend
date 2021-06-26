import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  try {
    res.status(200).send('Hey');
  } catch (e) {
    res.status(500).send('Internal Server Error!');
  }
};

const authController = { login };
export default authController;
