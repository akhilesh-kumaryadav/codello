import express from 'express';
import cookieParser from 'cookie-parser';

import connectCluster from './configs/database';
import authRouter from './routes/user';
import profileRouter from './routes/profile';
import requestRouter from './routes/request';

const app = express();
const port = 592;

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectCluster()
  .then(() => {
    console.log('Database connection established.');
    app.listen(port, () => {
      console.log(
        'Codello server is up and running at - ',
        `http://localhost:${port}/`,
      );
    });
  })
  .catch((error) => {
    console.log(error);
    console.log('Database connection failed.');
  });
