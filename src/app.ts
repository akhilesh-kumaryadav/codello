import express, { NextFunction, Request, Response } from 'express';

import connectCluster from './configs/database';
import Users from './models/user';

const app = express();
const port = 592;

app.use(express.json());

app.post('/signup', async (req: Request, res: Response) => {
  const user = new Users(req.body);

  try {
    await user.save();

    res.send('User Added To the database.');
  } catch (error: any) {
    res.status(400).send('Error in saving the user: ' + error.message);
  }
});

app.get('/user', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send('Email id is required to get the user.');
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      res.status(404).send('User not found.');
    }

    res.send(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

app.get('/feeds', async (req: Request, res: Response) => {
  try {
    const users = await Users.find();

    if (!users.length) {
      res.status(404).send('Users not found.');
    }

    res.send(users);
  } catch (err: any) {
    console.log(err);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

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
