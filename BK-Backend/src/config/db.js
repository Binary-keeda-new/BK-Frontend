import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI;

    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;