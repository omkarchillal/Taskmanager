/**
 * Task Controller
 * Handles all CRUD operations for tasks
 * Contains business logic for task management
 */

import Task from "../models/Task.js";

/**
 * GET all tasks
 * @route GET /api/tasks
 * @returns {Array} List of all tasks sorted by creation date (newest first)
 */
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * GET single task by ID
 * @route GET /api/tasks/:id
 * @param {String} id - Task ID
 * @returns {Object} Task object
 */
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * CREATE new task
 * @route POST /api/tasks
 * @body {String} title - Task title (required)
 * @body {String} description - Task description (optional)
 * @body {String} status - Task status (optional, default: pending)
 * @returns {Object} Created task object
 */
export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Validate required fields
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        // Create new task
        const task = await Task.create({ title, description, status });
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * UPDATE existing task
 * @route PUT /api/tasks/:id
 * @param {String} id - Task ID
 * @body {Object} Updated task fields
 * @returns {Object} Updated task object
 */
export const updateTask = async (req, res) => {
    try {
        // Find and update task, return updated document
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return updated doc and run validators
        );

        // Check if task exists
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * DELETE task
 * @route DELETE /api/tasks/:id
 * @param {String} id - Task ID
 * @returns {Object} Success message
 */
export const deleteTask = async (req, res) => {
    try {
        // Find and delete task
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        // Check if task exists
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
};
