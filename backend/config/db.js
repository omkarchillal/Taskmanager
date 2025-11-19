/**
 * MongoDB Database Connection Configuration
 * Establishes connection to MongoDB using Mongoose
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * Uses MONGO_URI from environment variables
 * Exits process if connection fails
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
