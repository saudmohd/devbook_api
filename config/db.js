import dotenv from 'dotenv';
import { connect } from 'mongoose';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (error.code === 'ETIMEDOUT') {
      console.error('Connection timeout - check your network');
    }
    process.exit(1);
  }
};

export default connectDB;
