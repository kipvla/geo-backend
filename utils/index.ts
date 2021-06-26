// import { User } from '@models';
import { User } from '../models/user';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

export const loginFunction = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).json({ msg: 'Invalid username or password!' });

  const hashedUserPW = user.password;

  const isMatch = await bcrypt.compare(password, hashedUserPW);

  if (!isMatch)
    return res.status(401).json({ msg: 'Invalid username or password!' });

  const userPayload = { user: { id: user._id } };
  console.log(process.env.JWT_SECRET, '++');
  /*@ts-ignore*/
  if (process.env.JWT_SECRET)
    jwt.sign(
      userPayload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        console.log(token);
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
};

export const validateEmail = (email = '') => {
  const isEmail = email.match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  return Boolean(isEmail);
};
