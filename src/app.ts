import express, { NextFunction, Request, Response } from 'express';

import connectCluster from './configs/database';
import User from './models/user';

const app = express();
const port = 592;

app.post('/signup', async (req: Request, res: Response) => {
  const user = new User({
    firstName: "akhilesh",
    lastName: "Yadav",
    email: "akhilesh@yadav.com",
    password: "akhilesh@24",
    age: 26,
    gender: "m"
  })

  await user.save();

  res.send("User Added To the database.")
})

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
