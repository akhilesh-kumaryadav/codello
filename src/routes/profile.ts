import express, { Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';

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

route.patch('/profile/password', userAuth, async(req: Request, res: Response) => {
  try {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
      throw new Error('Both new and old password should be required.')
    }

    const user = req.user as UserDocument;

    const isOldPasswordValid = await user.verifyPassword(oldPassword);
    if(!isOldPasswordValid) {
      throw new Error('Old password is not correct');
    }

    if(oldPassword === newPassword) {
      throw new Error("New password must be different from previous password.")
    }

    if(!validator.isStrongPassword(newPassword)) {
      throw new Error('New Password is not a strong password.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.set({password: hashedNewPassword});
    await user.save();

    res.json({
      status: true,
      message: `${user.firstName}, your password changed successfully.`
    })
  } catch(error: any) {
    res.status(400).send(error.message ?? 'Something went wrong.')
  }
})

export default route;
