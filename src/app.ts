import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import connectCluster from './configs/database';
import Users from './models/user/user';
import signUpValidator from './utils/signUpValidator';
import loginInValidator from './utils/loginInValidator';
import { userAuth } from './middlewares/auth';

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

    const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { expires: new Date(Date.now() + 900000) });

    res.send('Login successfully!!!');
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
  }
});

app.get('/profile', userAuth, async (req: Request, res: Response) => {
  try {
    res.send(req.user);
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
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
