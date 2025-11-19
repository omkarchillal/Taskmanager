export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {task.title}
          </h3>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status === "completed" ? "✓ Completed" : "⏳ Pending"}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
