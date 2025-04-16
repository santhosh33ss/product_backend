import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    console.log('url', process.env.MONGO_URI);

    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/products');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
