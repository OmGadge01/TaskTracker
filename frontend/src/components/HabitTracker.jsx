import { useEffect, useState } from "react";
import API from "../api";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");

  const getHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    getHabits();
  }, []);

  const addHabit = async () => {
    if (!name.trim()) return;
    await API.post("/habits", { name });
    setName("");
    getHabits();
  };

  const deleteHabit = async (id) => {
    await API.delete(`/habits/${id}`);
    getHabits();
  };

  const completeHabit = async (id) => {
    await API.put(`/habits/complete/${id}`);
    getHabits();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Habit Tracker</h2>
          <p className="text-sm text-gray-500 mt-1">Build and maintain good habits</p>
        </div>

        {/* Add Habit Section */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a new habit..."
            onKeyPress={(e) => e.key === "Enter" && addHabit()}
          />
          <button
            onClick={addHabit}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Add Habit
          </button>
        </div>

        {/* Habits List */}
        {habits.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500">No habits yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first habit to get started</p>
          </div>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {habits.map((habit) => {
              const streakPercentage = Math.min(habit.streak * 5, 100);
              let streakLabel = "";
              if (habit.streak >= 7) streakLabel = "Veteran";
              else if (habit.streak >= 3) streakLabel = "Rising";
              else if (habit.streak > 0) streakLabel = "Starting";
              
              return (
                <li
                  key={habit._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">
                        {habit.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-orange-600">
                          {habit.streak} day streak
                        </span>
                        {habit.streak > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
                            {streakLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => completeHabit(habit._id)}
                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => deleteHabit(habit._id)}
                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${streakPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {habits.length > 0 
              ? `Keep going! Every day counts toward your goals`
              : "Add a habit to start tracking your progress"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;