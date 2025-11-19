import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Task Manager Backend Running!");
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
