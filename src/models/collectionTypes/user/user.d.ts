import { Document } from 'mongoose';

export type UserSchema = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  gender: string;
  photoUrl?: string;
  age: number;
};

export interface UserMethods {
  getJWT(): Promise<string>;
  verifyPassword(password: string): Promise<boolean>;
}

export type UserDocument = Document & UserSchema & UserMethods;
