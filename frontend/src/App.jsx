import TaskManager from "./components/TaskManager";
import HabitTracker from "./components/HabitTracker";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
       Task and Habbit Tracker Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <TaskManager />
        <HabitTracker />
      </div>
    </div>
  );
}

export default App;