import express from 'express';
import statuscodes from 'http-status-codes';

// import connectToDb from './Config/dbConfig.js';
import connectDb from './Config/dbConfig.js';
import { PORT } from './Config/serverConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  return res.status(statuscodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
   
  console.log(`server running on port ${PORT}`);
  connectDb();
  
});
