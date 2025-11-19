import Task from "../models/Task.js";

// GET all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET single task
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// CREATE task
export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const task = await Task.create({ title, description, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE task
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE task
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask)
            return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
