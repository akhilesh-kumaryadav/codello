import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import connectCluster from './configs/database';
import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import requestRouter from './routes/request';
import userRouter from './routes/user';

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://43.205.98.172',
      'http://43.205.98.172:5173',
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectCluster()
  .then(() => {
    console.log('Database connection established.');
    app.listen(port, () => {
      console.log(`Codello server is up and running at port - ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log('Database connection failed.');
  });
