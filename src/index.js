import express from 'express';
import statuscodes from 'http-status-codes';
import { PORT } from './Config/serverConfig.js';

const app = express();

app.get('/ping', (req, res) => {
  return res.status(statuscodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
