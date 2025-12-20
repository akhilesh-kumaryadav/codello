import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const schema = new Schema(
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

export default mongoose.model('User', schema);
