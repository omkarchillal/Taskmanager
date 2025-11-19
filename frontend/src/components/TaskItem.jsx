import { CheckCircle2, Clock, Loader2, Pencil, Trash2 } from "lucide-react";

export default function TaskItem({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "in-progress":
        return <Loader2 className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  /**
   * Get human-readable label for status
   * @param {String} status - Task status
   * @returns {String} Formatted status label
   */
  const getStatusLabel = (status) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">
              {task.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                task.status
              )}`}
            >
              {getStatusIcon(task.status)} {getStatusLabel(task.status)}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {task.description}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Update
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
