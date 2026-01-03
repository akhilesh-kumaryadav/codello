import express, { Request, Response } from 'express';
import { userAuth } from '../middlewares/auth';

const route = express.Router();

route.get('/profile', userAuth, async (req: Request, res: Response) => {
  try {
    res.send(req.user);
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
  }
});

export default route;
