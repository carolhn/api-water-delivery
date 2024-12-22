import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
