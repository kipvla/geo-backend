import {Request, Response} from 'express'

exports.login = async (req: Request, res: Response) => {
  try {
    res.status(200).send('Hey')
  } catch (e) {
    res.status(500).send('Internal Server Error!');
  }
};
