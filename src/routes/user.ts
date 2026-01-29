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
      }).populate('fromUserId', [
        'firstName',
        'lastName',
        'gender',
        'photoUrl',
        'age',
      ]);

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

route.get(
  '/user/connections',
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const user = req.user as UserDocument;

      const connections = await Requests.find({
        status: 'accepted',
        $or: [{ fromUserId: user._id }, { toUserId: user._id }],
      })
        .populate('fromUserId', [
          'firstName',
          'lastName',
          'gender',
          'photoUrl',
          'age',
        ])
        .populate('toUserId', [
          'firstName',
          'lastName',
          'gender',
          'photoUrl',
          'age',
        ]);

      const connectionsData = connections.map((connection) => {
        if (connection.fromUserId._id.equals(user._id)) {
          return connection.toUserId;
        }

        return connection.fromUserId;
      });

      res.json({
        status: 200,
        message: 'Connections fetched successfully.',
        data: connectionsData,
      });
    } catch (error: any) {
      res.json({
        status: 400,
        message: `Error in getting the connections.`,
      });
    }
  },
);

export default route;
