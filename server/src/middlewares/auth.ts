import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Users from '../models/user/user';

const JWT_SECRET = 'akhilesh@HFT';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
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

    req.user = user;

    next();
  } catch (error: any) {
    res.status(500).send(error.message ?? 'Internal Server Error.');
  }
};
