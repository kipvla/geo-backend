import connectServer from './server';

import connectDB from './db';

import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 5000;
const MONGO_URI = String(process.env.MONGO_URI);

connectServer(port);
connectDB(MONGO_URI);
