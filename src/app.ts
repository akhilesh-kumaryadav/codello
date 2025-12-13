import express, { NextFunction, Request, Response } from 'express';

import { adminAuth, userAuth } from './middlewares/auth';

const app = express();
const port = 592;

app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req: Request, res: Response) => {
  res.send('Admin get all data.');
});

app.get('/user', userAuth, (req: Request, res: Response) => {
  res.send('User data send.');
});

app.listen(port, () => {
  console.log(
    'Codello server is up and running at - ',
    `http://localhost:${port}/`,
  );
});
