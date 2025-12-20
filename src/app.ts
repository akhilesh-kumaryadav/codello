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

app.delete('/user', async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).send('User id need to delete the user.');
  }

  try {
    await Users.findByIdAndDelete(userId);

    res.send('User deleted successfully.');
  } catch (error: any) {
    console.log(error);
    res.status(500).send('Something went wrong.');
  }
});

app.patch('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params?.id;
  const data = req.body;
  if (!userId) {
    res.status(400).send('User id is needed to update the user.');
  }

  try {
    const ALLOWED_FIELDS = ['firstName', 'lastName', 'age', 'gender'];
    if (!Object.keys(data).every((key) => ALLOWED_FIELDS.includes(key))) {
      throw new Error('Update not allowed with random fields.');
    }

    if (data.skills?.length > 10) {
      throw new Error('Skills can have maximum 10 values.');
    }

    const isUpdated = await Users.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    console.log({ isUpdated });
    if (!isUpdated) {
      throw new Error('User not found.');
    }

    res.send('User updated successfully');
  } catch (error: any) {
    console.log(error);
    res.status(500).send(`Update failed. Reason: ${error.message}`);
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
