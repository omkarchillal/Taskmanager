import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl">🎯</div>
            <span className="text-2xl font-semibold text-gray-900">Tasker</span>
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Logout
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track your daily tasks</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading tasks...</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm
              onSubmit={editingTask ? handleUpdate : handleCreate}
              initialData={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>

          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              onEdit={(task) => setEditingTask(task)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
