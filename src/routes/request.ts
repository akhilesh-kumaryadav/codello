import express, { Request, Response } from 'express';
import { userAuth } from '../middlewares/auth';
import Users from '../models/user/user';
import Requests from '../models/request/request';
import { UserDocument } from '../models/collectionTypes/user';

const route = express.Router();

route.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const fromUser = req.user as UserDocument;
      const fromUserId = fromUser._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (!['interested', 'ignored'].includes(status)) {
        throw new Error('Invalid status of the request.');
      }

      const toUser = (await Users.findById(toUserId)) as UserDocument;
      if (!toUser) {
        throw new Error('Invalid request.');
      }

      const existingRequest = await Requests.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        throw new Error('Invalid request.');
      }

      const request = new Requests({
        fromUserId,
        toUserId,
        status,
      });
      await request.save();

      const responseMessage =
        status === 'interested'
          ? `${fromUser.firstName} is interested in ${toUser.firstName}`
          : `${fromUser.firstName} ignored ${toUser.firstName}`;

      res.json({
        status: true,
        message: responseMessage,
      });
    } catch (error: any) {
      res.json({
        status: 400,
        message: `Error in handling request: ` + error.message,
      });
    }
  },
);

route.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { status, requestId } = req.params;
      const user = req.user as UserDocument;

      if (!['accepted', 'rejected'].includes(status)) {
        throw new Error('Invalid status of the request.');
      }

      const request = await Requests.findOne({
        _id: requestId,
        toUserId: user._id,
        status: 'interested',
      });
      if (!request) {
        throw new Error('Invalid request.');
      }

      request.set({ status });
      request.save();

      res.json({
        status: true,
        message: `${user.firstName} ${status}.`,
        data: request,
      });
    } catch (error: any) {
      res.json({
        status: 400,
        message: `Error in handling request: ` + error.message,
      });
    }
  },
);

export default route;
