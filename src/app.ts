import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import connectCluster from './configs/database';
import Users from './models/user/user';
import signUpValidator from './utils/signUpValidator';
import loginInValidator from './utils/loginInValidator';

const app = express();
const port = 592;
const JWT_SECRET = 'akhilesh@HFT';

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req: Request, res: Response) => {
  try {
    signUpValidator({ bodyParams: req.body });

    const { firstName, lastName, email, password, gender, age, photoUrl } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      age,
      photoUrl,
    });

    await user.save();

    res.send('User Added To the database.');
  } catch (error: any) {
    res.status(400).send('Error in saving the user: ' + error.message);
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    loginInValidator({ credentials: req.body });

    const user = await Users.findOne(
      { email },
      {
        password: 1,
      },
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await jwt.sign({ _id: user._id }, JWT_SECRET);
    res.cookie('token', token);

    res.send('Login successfully!!!');
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
  }
});

app.get('/profile', async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error('Unauthorized.');
    }

    const decodedToken = (await jwt.verify(token, JWT_SECRET)) as {
      _id: string;
    };

    const { _id } = decodedToken;
    const user = await Users.findById(_id);
    if (!user) {
      throw new Error('Unauthorized.');
    }

    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
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
  } catch (error: any) {
    res.status(500).send(error.message ?? 'Something went wrong');
  }
});

app.get('/feeds', async (req: Request, res: Response) => {
  try {
    const users = await Users.find();

    if (!users.length) {
      res.status(404).send('Users not found.');
    }

    res.send(users);
  } catch (error: any) {
    res.status(500).send(error.message ?? 'Something went wrong');
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
    res.status(500).send(error.message ?? 'Something went wrong.');
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

    if (!isUpdated) {
      throw new Error('User not found.');
    }

    res.send('User updated successfully');
  } catch (error: any) {
    res.status(500).send(error.message ?? 'Something went wrong.');
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
