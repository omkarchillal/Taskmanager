/**
 * TasksPage Component
 * Main page for task management
 * Features: CRUD operations, filtering, pagination, modal dialogs
 */

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function TasksPage() {
  // State management
  const [tasks, setTasks] = useState([]); // All tasks from database
  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [filterStatus, setFilterStatus] = useState("all"); // Current filter
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Task ID to delete
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track first load
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts

  /**
   * Fetch all tasks from the API with retry logic
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      const res = await getTasks();
      setTasks(res.data);
      setIsInitialLoad(false);
      setRetryCount(0); // Reset retry count on success
      setLoading(false); // Set loading to false on success
    } catch (err) {
      console.error(err);

      // For initial load, keep retrying
      if (isInitialLoad) {
        setRetryCount((prev) => prev + 1);
        // Retry after 3 seconds
        setTimeout(() => {
          fetchTasks();
        }, 3000);
      } else {
        // For subsequent operations, show error
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Handle creating a new task
   * @param {Object} data - Task data (title, description, status)
   */
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

  /**
   * Handle updating an existing task
   * @param {Object} data - Updated task data
   */
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

  /**
   * Handle deleting a task
   * @param {String} id - Task ID to delete
   */
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

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  // Calculate task counts for each status
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  /**
   * Pagination calculations
   * Calculate which tasks to display on current page
   */
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  /**
   * Reset to page 1 when filter changes
   * Prevents showing empty page if current page doesn't exist in new filter
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        taskCounts={taskCounts}
      />

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

          {/* Show error only for non-initial loads */}
          {error && !loading && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isInitialLoad
                  ? "Loading data from server..."
                  : "Loading tasks..."}
              </p>
              {isInitialLoad && (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    This may take up to 50 seconds on first load. Please wait.
                  </p>
                  {retryCount > 0 && (
                    <p className="text-xs text-gray-500">
                      Retry attempt: {retryCount}
                    </p>
                  )}
                </>
              )}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTasks.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
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
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
