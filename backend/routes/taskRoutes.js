/**
 * Task Routes
 * Defines all API endpoints for task operations
 * Base path: /api/tasks
 */

import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get("/", getTasks);

// GET /api/tasks/:id - Get single task by ID
router.get("/:id", getTask);

// POST /api/tasks - Create new task
router.post("/", createTask);

// PUT /api/tasks/:id - Update task by ID
router.put("/:id", updateTask);

// DELETE /api/tasks/:id - Delete task by ID
router.delete("/:id", deleteTask);

export default router;
