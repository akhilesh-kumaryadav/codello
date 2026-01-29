import mongoose, { Schema } from 'mongoose';
import { RequestDocument } from '../collectionTypes/request';

const schema = new Schema<RequestDocument>(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['interested', 'ignored', 'accepted', 'rejected'],
        message: '{VALUE} is not a valid status.',
      },
    },
  },
  {
    timestamps: true,
  },
);

schema.pre('save', async function () {
  const request = this;

  if (request.fromUserId.equals(request.toUserId)) {
    throw new Error('Cannot send request to yourself');
  }
});

schema.index({ fromUserId: 1, toUserId: 1 });

export default mongoose.model<RequestDocument>('Request', schema);
