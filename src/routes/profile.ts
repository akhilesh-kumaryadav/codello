import express, { Request, Response } from 'express';
import { userAuth } from '../middlewares/auth';
import editProfileValidator, {
  EditableFieldTypes,
} from '../utils/editProfileValidator';
import { UserDocument } from '../models/collectionTypes/user';

const route = express.Router();

route.get('/profile/view', userAuth, async (req: Request, res: Response) => {
  try {
    res.send(req.user);
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
  }
});

route.patch('/profile/edit', userAuth, async (req: Request, res: Response) => {
  try {
    editProfileValidator({ bodyParams: req.body });

    const user = req.user as UserDocument;

    const updates: Partial<Record<EditableFieldTypes, any>> = {};

    (Object.keys(req.body) as EditableFieldTypes[]).forEach(
      (key) => (updates[key] = req.body[key]),
    );

    user.set(updates);
    await user.save();

    res.json({
      status: true,
      message: `${user.firstName}, your profile updated successfully.`,
      data: user,
    });
  } catch (error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.');
  }
});

export default route;
