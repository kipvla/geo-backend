import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.JWT_SECRET, '>>>>>>>>>>>>>>>>>JWT SECRET');

const jwt = require('jsonwebtoken');
export function auth(req: Request, res: Response, next: NextFunction) {
  // Get token from header (protected route)
  const authHeader = req.header('Authorization');
  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // Verify token
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded.user;
    next();
  } catch (err) {
    if (err.name) {
      console.log(err);
      return res.status(401).send({ msg: 'Token expired!', statusCode: 401 });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
