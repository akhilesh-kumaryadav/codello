import mongoose from 'mongoose';

const connectCluster = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_URI as string);
};

export default connectCluster;
