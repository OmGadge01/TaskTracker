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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-200 p-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-2xl transition-all duration-300 hover:shadow-cyan-300/50">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Task Manager Pro
          </h2>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-3 text-white text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs opacity-90">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-3 text-white text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-xs opacity-90">Completed ✔️</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-3 text-white text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs opacity-90">Pending ⏳</div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-xl">📝</span>
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400 bg-white/80"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your next task? "
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
          </div>
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-300/50 flex items-center gap-2"
          >
            <span>➕</span> Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All 📋
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              filter === "pending"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending ⏳
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              filter === "completed"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed ✔️
          </button>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="text-6xl mb-3">🎉</div>
            <p className="text-gray-500 text-lg">No tasks to show!</p>
            <p className="text-gray-400 text-sm">
              {filter === "all" 
                ? "Add your first task above " 
                : filter === "completed" 
                ? "Complete some tasks to see them here " 
                : "You have no pending tasks! Great job! "}
            </p>
          </div>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {filteredTasks.map((task, index) => {
              const isCompleted = task.status === "completed";
              const gradients = [
                "from-indigo-50 to-purple-50 border-indigo-200",
                "from-pink-50 to-rose-50 border-pink-200",
                "from-green-50 to-emerald-50 border-green-200",
                "from-yellow-50 to-amber-50 border-yellow-200",
                "from-cyan-50 to-blue-50 border-cyan-200",
              ];
              return (
                <li
                  key={task._id}
                  className={`group relative overflow-hidden bg-gradient-to-r ${gradients[index % gradients.length]} border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                    isCompleted ? "opacity-75" : ""
                  }`}
                >
                  {/* Animated background effect */}
                  <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full opacity-10 transition-all duration-500 ${
                    isCompleted ? "bg-green-400" : "bg-blue-400"
                  } group-hover:scale-150`}></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Task icon */}
                      <div className="text-2xl">
                        {isCompleted ? "✅" : "📌"}
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-lg font-semibold transition-all ${
                            isCompleted
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }`}
                        >
                          {task.title}
                        </span>
                        {isCompleted && (
                          <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <span>✨</span> Completed!
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(task)}
                        className={`group/btn relative overflow-hidden px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-1 ${
                          isCompleted
                            ? "bg-orange-400 hover:bg-orange-500 text-white"
                            : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          {isCompleted ? " Undo" : " Done"}
                        </span>
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-white/50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-2 rounded-lg font-bold transition-all transform hover:scale-105 backdrop-blur-sm"
                      >
                        ✖
                      </button>
                    </div>
                  </div>

                  {/* Progress indicator for pending tasks */}
                  {!isCompleted && (
                    <div className="mt-3 h-1 bg-gray-200/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse" style={{ width: "30%" }}></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Motivational Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
       
            <span className="text-sm text-gray-700 font-medium">
              {stats.completed === stats.total && stats.total > 0 
                ? "🎉 Amazing! You've completed all tasks! 🎉" 
                : stats.pending > 0 
                ? `You have ${stats.pending} task${stats.pending > 1 ? 's' : ''} left. You've got this! 🌟`
                : "Start your journey by adding a task! 🚀"}
            </span>
            <span className="text-lg"></span>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles - add to your global CSS or use a style tag */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
      `}</style>
    </div>
  );
};

export default TaskManager;