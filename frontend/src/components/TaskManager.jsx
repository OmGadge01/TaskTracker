import { useEffect, useState } from "react";
import API from "../api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const getTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    getTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "completed" ? "pending" : "completed";
    await API.put(`/tasks/${task._id}`, { status: newStatus });
    getTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending: tasks.filter(t => t.status === "pending").length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Task Manager</h2>
          <p className="text-sm text-gray-500 mt-1">Organize and track your tasks</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task..."
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === "pending"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500">No tasks to display</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter === "all" 
                ? "Add your first task to get started" 
                : filter === "completed" 
                ? "Complete some tasks to see them here" 
                : "All tasks completed! Great job"}
            </p>
          </div>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTasks.map((task) => {
              const isCompleted = task.status === "completed";
              return (
                <li
                  key={task._id}
                  className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                    isCompleted
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-lg">
                      {isCompleted ? "✓" : "○"}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-gray-800 ${
                          isCompleted ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(task)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                      }`}
                    >
                      {isCompleted ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {stats.completed === stats.total && stats.total > 0 
              ? "All tasks completed. Great work!" 
              : stats.pending > 0 
              ? `${stats.pending} task${stats.pending > 1 ? 's' : ''} remaining`
              : "No tasks yet. Add one to get started"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;