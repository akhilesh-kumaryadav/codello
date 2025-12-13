import mongoose from 'mongoose';

const connectCluster = async () => {
  await mongoose.connect(
    'mongodb+srv://akhileshkumaryadav2407_db_user:EBGTAnoEdYqaY900@cluster0.eintc6k.mongodb.net/',
  );
};

export default connectCluster;
