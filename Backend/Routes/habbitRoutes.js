const express = require("express");
const router = express.Router();
const Habit = require("../Models/Habbits");

// CREATE
router.post("/", async (req, res) => {
  const habit = new Habit(req.body);
  const saved = await habit.save();
  res.json(saved);
});

// READ
router.get("/", async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// UPDATE (generic)
router.put("/:id", async (req, res) => {
  const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Habit deleted" });
});

//  Mark Habit as Done (Streak Logic)
router.put("/complete/:id", async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  const today = new Date().toDateString();
  const last = habit.lastCompletedDate?.toDateString();

  if (today !== last) {
    habit.streak += 1;
    habit.lastCompletedDate = new Date();
    await habit.save();
  }

  res.json(habit);
});

module.exports = router;