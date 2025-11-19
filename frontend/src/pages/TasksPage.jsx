import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    }
  };

  const handleUpdate = async (data) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id, data);
      setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDelete}
      />
    </div>
  );
}
