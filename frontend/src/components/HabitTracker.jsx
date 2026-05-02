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

  // Custom color palette for habit items
  const habitColors = [
    "from-pink-100 to-rose-100 border-pink-200",
    "from-yellow-100 to-amber-100 border-yellow-200",
    "from-green-100 to-emerald-100 border-green-200",
    "from-blue-100 to-sky-100 border-blue-200",
    "from-purple-100 to-violet-100 border-purple-200",
    "from-orange-100 to-amber-100 border-orange-200",
    "from-teal-100 to-cyan-100 border-teal-200",
    "from-indigo-100 to-blue-100 border-indigo-200",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-2xl transition-all duration-300 hover:shadow-purple-300/50">
     
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Happy Habits
          </h2>
         
        </div>

        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-xl">✨</span>
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-gray-700 placeholder-gray-400 bg-white/80"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What good habit to add? "
              onKeyPress={(e) => e.key === "Enter" && addHabit()}
            />
          </div>
          <button
            onClick={addHabit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 flex items-center gap-2"
          >
            <span>➕</span> Add
          </button>
        </div>

     
        {habits.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="text-6xl mb-3"></div>
            <p className="text-gray-500 text-lg">No habits yet. Start your journey!</p>
            <p className="text-gray-400 text-sm">Add your first habit above 👆</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {habits.map((habit, index) => (
              <li
                key={habit._id}
                className={`group relative overflow-hidden bg-gradient-to-r ${habitColors[index % habitColors.length]} border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
              >
                {/* Animated streak badge */}
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Habit icon */}
                    <div className="text-3xl">
                      {habit.streak > 0 ? "🔥" : "🌱"}
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-800">
                        {habit.name}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-orange-500 text-sm font-bold flex items-center gap-1">
                        {habit.streak} day streak
                        </span>
                        {habit.streak > 0 && (
                          <span className="text-xs bg-yellow-300/50 px-2 py-0.5 rounded-full">
                            {habit.streak >= 7 ? "🏆 Veteran" : habit.streak >= 3 ? "⭐ Rising Star" : "New"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => completeHabit(habit._id)}
                      className="group/btn relative overflow-hidden bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-1"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        ✔️ Done
                      </span>
                    </button>
                    <button
                      onClick={() => deleteHabit(habit._id)}
                      className="bg-white/50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-2 rounded-lg font-bold transition-all transform hover:scale-105 backdrop-blur-sm"
                    >
                      ✖
                    </button>
                  </div>
                </div>

          
                <div className="mt-3 h-1 bg-gray-200/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(habit.streak * 5, 100)}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        )}

       
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span></span> Every step counts! Keep your streak alive. 
            <span></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;