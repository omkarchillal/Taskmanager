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
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is not defined in environment variables. Please add it in Render dashboard."
            );
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        console.error(
            "Please check: 1) MONGO_URI is set in environment variables, 2) MongoDB Atlas IP whitelist includes 0.0.0.0/0"
        );
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
