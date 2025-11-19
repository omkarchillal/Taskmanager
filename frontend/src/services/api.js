
//  API Service Layer
//  Handles all HTTP requests to the backend API
//  Uses Axios for making API calls


import axios from "axios";


//  Create Axios instance with base configuration
//  Base URL points to the backend API server
//  Uses environment variable if available, otherwise defaults to localhost

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});


//  Task API Functions
//  All functions return Axios promises


// GET all tasks
export const getTasks = () => API.get("/tasks");

// GET single task by ID
export const getTask = (id) => API.get(`/tasks/${id}`);

// CREATE new task
export const createTask = (data) => API.post("/tasks", data);

// UPDATE existing task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
