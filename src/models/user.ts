import mongoose from 'mongoose';

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
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', schema);
