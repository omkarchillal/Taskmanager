/**
 * Task Model
 * Defines the schema and model for Task documents in MongoDB
 */

import mongoose from "mongoose";

/**
 * Task Schema Definition
 * @property {String} title - Task title (required)
 * @property {String} description - Task description (optional)
 * @property {String} status - Task status: pending, in-progress, or completed
 * @property {Date} createdAt - Auto-generated creation timestamp
 * @property {Date} updatedAt - Auto-generated update timestamp
 */
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // Remove whitespace from both ends
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"], // Only allow these values
            default: "pending",
        },
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Export Task model
export default mongoose.model("Task", taskSchema);
