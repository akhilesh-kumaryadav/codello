import express, { Request, Response } from 'express';
import { userAuth } from '../middlewares/auth';
import { UserDocument } from '../models/collectionTypes/user';

import Requests from '../models/request/request';

const route = express.Router();

route.get(
  '/user/request/received',
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as UserDocument;

      const requestRecieved = await Requests.find({
        toUserId: user._id,
        status: 'interested',
      }).populate('fromUserId', ['firstName', 'lastName']);

      res.json({
        status: true,
        message: `Request Received.`,
        data: requestRecieved,
      });
    } catch (error: any) {
      res.json({
        status: 400,
        message: `Error in getting the request received: ${error.message}`,
      });
    }
  },
);

export default route;
