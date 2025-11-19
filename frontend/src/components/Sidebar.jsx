/**
 * Sidebar Component
 * Navigation sidebar with task filters and counts
 * @param {String} filterStatus - Current active filter
 * @param {Function} setFilterStatus - Function to change filter
 * @param {Object} taskCounts - Object containing count for each status
 */

import { Link } from "react-router-dom";
import {
  Target,
  ListTodo,
  Clock,
  Loader2,
  CheckCircle2,
  LogOut,
} from "lucide-react";

export default function Sidebar({ filterStatus, setFilterStatus, taskCounts }) {
  return (
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
                  filterStatus === "pending" ? "text-gray-300" : "text-gray-500"
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
  );
}
