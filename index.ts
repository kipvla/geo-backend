import connectServer from './server';

import connectDB from './db';

import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = String(process.env.MONGO_URI);

console.log(PORT, MONGO_URI);

connectServer(PORT);
connectDB(MONGO_URI);
