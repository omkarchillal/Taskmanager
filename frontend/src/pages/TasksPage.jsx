import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  ListTodo,
  Clock,
  Loader2,
  CheckCircle2,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setIsModalOpen(false);
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
      setIsModalOpen(false);
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
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <Target className="w-7 h-7 text-gray-900" />
            <span className="text-2xl font-semibold text-gray-900">Tasker</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setFilterStatus("all")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  All Tasks
                </span>
                <span
                  className={`text-sm ${
                    filterStatus === "all" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {taskCounts.all}
                </span>
              </span>
            </button>

            <div className="pt-4 pb-2 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </p>
            </div>

            <button
              onClick={() => setFilterStatus("pending")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Pending
                </span>
                <span
                  className={`text-sm ${
                    filterStatus === "pending"
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {taskCounts.pending}
                </span>
              </span>
            </button>

            <button
              onClick={() => setFilterStatus("in-progress")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filterStatus === "in-progress"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-500" />
                  In Progress
                </span>
                <span
                  className={`text-sm ${
                    filterStatus === "in-progress"
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {taskCounts["in-progress"]}
                </span>
              </span>
            </button>

            <button
              onClick={() => setFilterStatus("completed")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filterStatus === "completed"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Completed
                </span>
                <span
                  className={`text-sm ${
                    filterStatus === "completed"
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {taskCounts.completed}
                </span>
              </span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-8 pb-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {filterStatus === "all"
                  ? "All Tasks"
                  : filterStatus.charAt(0).toUpperCase() +
                    filterStatus.slice(1).replace("-", " ")}
              </h1>
              <p className="text-gray-600">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "task" : "tasks"}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Task
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading tasks...</p>
            </div>
          ) : (
            <div className="pb-8">
              <TaskList
                tasks={paginatedTasks}
                onEdit={openEditModal}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            </div>
          )}
        </div>

        {/* Fixed Pagination Controls */}
        {!loading && filteredTasks.length > 0 && (
          <div className="bg-white border-t border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredTasks.length)} of{" "}
                  {filteredTasks.length} tasks
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-gray-900 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            <TaskForm
              onSubmit={editingTask ? handleUpdate : handleCreate}
              initialData={editingTask}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Delete Task
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
