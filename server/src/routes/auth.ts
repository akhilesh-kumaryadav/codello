import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import signUpValidator from '../utils/signUpValidator';
import Users from '../models/user/user';
import loginInValidator from '../utils/loginInValidator';
import { AppError } from '../utils/AppError';

const route = express.Router();

route.post('/signup', async (req: Request, res: Response) => {
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

route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    loginInValidator({ credentials: req.body });

    const user = await Users.findOne({ email });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = await user.getJWT();
    res
      .cookie('token', token, { expires: new Date(Date.now() + 900000) })
      .json({
        result: true,
        status: 200,
        message: 'Login successfully!!!',
        data: user,
      });
  } catch (error: any) {
    res.json({
      result: false,
      status: error.status ?? 400,
      message: error.message ?? 'Something went wrong.',
    });
  }
});

route.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', null, { expires: new Date(Date.now()) }).json({
    result: true,
    status: 200,
    message: 'Logout Successfully.',
  });
});

export default route;
