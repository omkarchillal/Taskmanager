/**
 * Task Manager Backend Server
 * Main entry point for the Express.js application
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/tasks", taskRoutes); // Mount task routes at /api/tasks

// Root endpoint - Health check
app.get("/", (req, res) => {
    res.send("Task Manager Backend Running!");
});

// Start server and listen on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
