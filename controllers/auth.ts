import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { loginFunction, validateEmail } from '../utils';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await loginFunction(email, password, res);
  } catch (e) {
    res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, passwordRepeat } = req.body;
    if (username.length === 0) {
      return res.status(400).json({ msg: 'You should insert a name!' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Email is not valid!' });
    }
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(409).json({ msg: 'Email already exists!' });
    }
    const userByUserName = await User.findOne({ username });
    if (userByUserName) {
      return res.status(409).json({ msg: 'Username taken' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Password should be at least 6 characters long!' });
    }
    if (password !== passwordRepeat) {
      return res.status(400).json({ msg: "Passwords don't match!" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });
    const userPayload = { user: { id: newUser._id } };

    jwt.sign(
      userPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Internal Server Error!' });
  }
};

export const authController = { login, register };
