import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Users from '../models/user/user';
import { AppError } from '../utils/AppError';

const JWT_SECRET = 'akhilesh@HFT';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decodedToken = (await jwt.verify(token, JWT_SECRET)) as {
      _id: string;
    };
    const { _id } = decodedToken;

    const user = await Users.findById(_id);
    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.json({
      result: false,
      status: error.status ?? '400',
      message: error.message ?? 'Internal Server Error.',
    });
  }
};
