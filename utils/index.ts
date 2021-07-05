import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models';

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

  jwt.sign(
    userPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: 3600 },
    (err, token) => {
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

const distanceBetweenTwoPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // kilometers
};

export const calculateScore = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const distance: number = distanceBetweenTwoPoints(lat1, lon1, lat2, lon2);
  if (distance <= 0.15) {
    return 5000;
  }
  const exponent: number = -(distance - 0.15) / 3000;
  const score: string = (5000 * Math.exp(exponent)).toString();
  return parseInt(score);
};

export const calculateExp = (currentLevel: number, score: number) => {
  const exponent: number = currentLevel / 100;
  const exp = parseInt(((score * Math.exp(exponent)) / 1000).toString());
  return exp;
};

export const calculateLevel = (totalExp: number) => {
  return parseInt((totalExp / 100).toString());
};


export const getDMS2DD = (
  days: number,
  minutes: number,
  seconds: number,
  direction: string
) => {
  direction.toUpperCase();
  var dd = days + minutes / 60 + seconds / (60 * 60);
  //alert(dd);
  if (direction == 'S' || direction == 'W') {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
};