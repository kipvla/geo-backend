import http from 'http';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import placesRouter from './routes/places';

const connectServer = (port: number): http.Server => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/places', placesRouter);

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log('Server running! Listening on', server.address());
  });

  return server;
};

export default connectServer;
