import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserDocument } from '../collectionTypes/user';

const schema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: (props: { value: string }) =>
          `${props.value} is not have valid email address.`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      validate: {
        validator: (value: string) => {
          return validator.isStrongPassword(value);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a strong passwor.`,
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
      validate: {
        validator: (value: string) => {
          return ['male', 'female', 'others'].includes(value);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid gender.`,
      },
    },
    photoUrl: {
      type: String,
      validate: {
        validator: (value: string) => {
          return validator.isURL(value);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid URL.`,
      },
    },
  },
  {
    timestamps: true,
  },
);

const JWT_SECRET = 'akhilesh@HFT';

schema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

schema.methods.verifyPassword = async function (password: string) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

export default mongoose.model<UserDocument>('User', schema);
