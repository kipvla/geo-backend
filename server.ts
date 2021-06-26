import http from 'http';
import express from 'express';
import cors from 'cors';
import router from './routes';

const connectServer = (port: number): http.Server => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log('Server running! Listening on', server.address());
  });

  return server;
};

export default connectServer;
