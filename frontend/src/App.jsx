import TaskManager from "./components/TaskManager";
import HabitTracker from "./components/HabitTracker";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Productivity Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your tasks and track your habits in one place
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <TaskManager />
          <HabitTracker />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-xs text-gray-400 text-center">
            Stay consistent. Stay productive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;